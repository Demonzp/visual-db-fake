const path = require('path');
const { writeFile, mkdir, unlink } = require('fs/promises');
const { isFileExist, readJson } = require('../utils/fsUtils');
const { pathTables, pathDB, pathData, upDate } = require('../utils/global');

const detectPathTable = async () => {
  try {
    await isFileExist(pathTables);
  } catch (error) {
    try {
      await mkdir(pathTables);
    } catch (error) {
      console.log('detectPathTable err = ', error.message);
      throw error;
    }
    //res.status(400).json({ message: 'no any DataBases' });
  }
}

const detectPathData = async () => {
  try {
    await isFileExist(pathData);
  } catch (error) {
    try {
      await mkdir(pathData);
    } catch (error) {
      console.log('error = ', error.message);
      throw error;
    }
    //res.status(400).json({ message: 'no any DataBases' });
  }
}

const validationCreateTable = (body) => {
  if (body.hasOwnProperty('nameTable')) {
    const nameTable = body.nameTable;
    if (nameTable.length > 30) {
      throw new Error('nameTable cant be more then 30 chars');
    } else if (nameTable.length === 0) {
      throw new Error('nameTable is required');
    }

    return nameTable;
  } else {
    throw new Error('nameTable is required');
  }
}


const createTable = async (req, res) => {
  try {
    let validData;

    try {
      validData = validationCreateTable(req.body);
    } catch (error) {
      res.status(412).json({ field: 'nameTable', message: error.message });
      return;
    }

    const dbId = req.body.dbId;
    const dbFile = path.join(pathDB, dbId + '.json');
    const dbData = await readJson(dbFile);

    await detectPathTable();

    const filePath = path.join(pathTables, dbId + '_' + validData + '.json');

    try {
      await isFileExist(filePath);
      res.status(412).json({ field: 'nameTable', message: `table "${validData}" already exists` });
      return;

    } catch (error) {
      if (dbData.tables.find(name => name === validData)) {
        res.status(412).json({ field: 'nameTable', message: `table "${validData}" already exists` });
        return;
      }

    }
    console.log('dbData = ', dbData);
    const data = {
      name: validData,
      version: 1,
      createAt: Date.now(),
      changeAt: Date.now(),
      keyField: null,
      fields: [],
      rows: 0,
      index: 0,
    }

    dbData.tables.push(validData);
    upDate(dbData);

    await writeFile(filePath, JSON.stringify(data));
    await writeFile(dbFile, JSON.stringify(dbData));

    res.json({ db: dbData, table: data });

  } catch (error) {
    console.log('error = ', error.message);
    res.status(400).json({ message: error.message });
  }
};

const isUniqueFields = (fields) => {
  for (let i = 0; i <= fields.length - 1; i++) {
    const field = fields[i];
    const findFields = fields.filter(f => f.name === field.name);
    if (findFields.length > 1) {
      //throw new Error(field.id);
      return { rowId: field.id, field: 'name', message: `field "name" must be unique` }
    }
  }
  return true;
}

const isPrimeryOne = (fields) => {
  const findPrimerys = fields.filter(f => f.index === 'primery');
  if (findPrimerys.length > 1) {
    throw new Error('only one field cant be Primery')
  }
  return true;
}

const changeTable = async (req, res) => {
  try {
    const dbId = req.body.dbId;
    const table = req.body.table;

    const fields = req.body.fields;
    const isUniqueFieldsRes = isUniqueFields(fields);
    if (typeof isUniqueFieldsRes === 'object') {
      res.status(412).json({ errors: [isUniqueFieldsRes] });
      return;
    }

    isPrimeryOne(fields);

    const dbFile = path.join(pathDB, dbId + '.json');
    const prevDb = await readJson(dbFile);

    const tableFile = path.join(pathTables, dbId + '_' + table.tableName + '.json');
    const prevTable = await readJson(tableFile);

    if (prevTable.version !== table.v) {
      throw new Error(`version of table ${table.tableName} is old, please refresh your page`);
    }

    const tableRowsFile = path.join(pathData, dbId + '_' + table.tableName + '.json');
    let tableRows = [];

    if (tableFile.rows > 0) {
      tableRows = await readJson(tableRowsFile);
    }

    const tempFields = [];

    prevTable.fields.forEach(field => {
      if (fields.find(f => f.name === field.name)) {
        tempFields.push(field);
      }
    });

    prevTable.fields = tempFields;

    //console.log('fields = ', fields);
    let keyField = null;
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];

      if (field.autoIncrement && field.type !== 'int') {
        res.status(412).json({ errors: [{ rowId: field.id, field: 'type', message: `field "type" must be type of int` }] });
        return;
      }

      const idx = prevTable.fields.findIndex(f => f.name === field.name);
      const tF = { ...field };
      delete tF.id;
      if (field.index === 'primery') {
        field.allowNull = false;
        keyField = field.name;
      }

      if (field.index === 'unique' && !keyField) {
        field.allowNull = false;
        keyField = field.name;
      }
      //console.log('idx = ', idx);
      if (idx >= 0) {
        if (prevTable.fields[idx].type !== field.type && prevTable.rows > 0) {
          //throw new Error(`cant change type of field "${field.name}"`);
        }

        prevTable.fields[idx] = tF;
      } else {

        if (field.autoIncrement && prevTable.rows > 0) {
          res.status(412).json({ errors: [{ rowId: field.id, field: 'autoIncrement', message: `cant add Auto Increment because the table is not empty` }] });
          return;
        }

        prevTable.fields.push(tF);
      }
    }

    //console.log('fields = ', prevTable.fields);
    prevTable.keyField = keyField;

    upDate(prevDb);
    upDate(prevTable);

    await writeFile(tableFile, JSON.stringify(prevTable));
    await writeFile(dbFile, JSON.stringify(prevDb));

    res.json({ db: prevDb, table: prevTable });

  } catch (error) {
    console.log('error = ', error.message);
    res.status(400).json({ message: error.message });
  }
};

const getTableData = async (req, res) => {
  try {
    const dbId = req.query.dbId;
    const tableName = req.query.tableName;
    const page = req.query.page;
    const limit = 20;

    console.log('dbId = ', dbId, '||', tableName);

    const tableFileName = dbId + '_' + tableName + '.json';
    const tableFile = path.join(pathTables, tableFileName);
    const tableInfo = await readJson(tableFile);

    let data = [];
    const dataFile = path.join(pathData, tableFileName);
    if (tableInfo.rows > 0) {
      data = await readJson(dataFile);
      let start = (limit * (page - 1)) - 1;
      if (start < 0) {
        start = 0;
      }
      let end = (page * limit) - 1;
      data = data.slice(start, end);
    }

    res.json({ table: tableInfo, data });

  } catch (error) {
    console.log('error = ', error.message);
    res.status(400).json({ message: error.message });
  }
};

const validateTableData = (tableInfo, data) => {
  const tableFields = tableInfo.fields;
  //console.log('tableInfo = ', tableInfo);
  const validData = {};
  const errors = {};

  for (let i = 0; i <= tableFields.length - 1; i++) {
    const field = tableFields[i];
    if (data.hasOwnProperty(field.name)) {
      switch (field.type) {
        case 'int':
          if(field.autoIncrement){
            const index = Number(tableInfo.index) + 1;
            validData[field.name] = index;
            tableInfo.index = index;
            break;
          }
          const num = Number.parseInt(data[field.name]);
          if (Number.isNaN(num)) {
            errors[field.name] = { message: `field "${field.name}" must by number` };
            break;
          }
          validData[field.name] = num;
          break;
        case 'str':
          const str = String(data[field.name]);
          if (typeof str !== 'string') {
            errors[field.name] = { message: `field "${field.name}" must by string` };
            break;
          }

          if (str.length <= 0 && !field.allowNull) {
            if (String(field.defaultValue).length <= 0) {
              errors[field.name] = { message: `field "${field.name}" is require` };
              break;
            } else {
              validData[field.name] = field.defaultValue;
              break;
            }
          }

          if (str.length > Number(field.valueOrLenght)) {
            errors[field.name] = { message: `field "${field.name}" should be less than ${field.valueOrLenght}` };
          }

          validData[field.name] = data[field.name];
          break;
        case 'date':
          const date = new Date(data[field.name]);
          if (date == 'Invalid Date') {
            errors[field.name] = { message: `field "${field.name}" must by Date` };
            break;
          }
          validData[field.name] = Date.parse(data[field.name]);
          break;
        case 'boolean':
          const bool = data[field.name];
          if (typeof bool !== 'boolean') {
            errors[field.name] = { message: `field "${field.name}" must by Boolean` };
          }
          validData[field.name] = Boolean(data[field.name]);
          break;
        default:
          break;
      }
    } else if (!field.allowNull) {
      if (field.autoIncrement) {
        const index = Number(tableInfo.index) + 1;
        validData[field.name] = index;
        tableInfo.index = index;
      } else {
        if (String(field.defaultValue).length > 0) {
          validData[field.name] = field.defaultValue;
        } else {
          errors[field.name] = { message: `field ${field.name} is requer` };
        }
      }
    }
  }

  return { validData, errors };
};

const addRowToTable = async (req, res) => {
  try {
    const dbId = req.body.dbId;
    const tableName = req.body.tableName;
    const data = req.body.data;

    const tableFileName = dbId + '_' + tableName + '.json';
    const tableFile = path.join(pathTables, tableFileName);
    const tableInfo = await readJson(tableFile);

    if (tableInfo.rows >= 100) {
      throw new Error(`limit of rows in table "${tableName}" 100.`);
    }

    const validatedData = validateTableData(tableInfo, data);
    if (Object.entries(validatedData.errors).length > 0) {
      res.status(412).json({ errors: [validatedData.errors] });
      return;
    }

    const dataFileName = dbId + '_' + tableName + '.json';
    const dataFile = path.join(pathData, dataFileName);
    let tableData = [];
    if (tableInfo.rows > 0) {
      tableData = await readJson(dataFile);
    }
    tableData.push(validatedData.validData);

    await detectPathData();

    await writeFile(dataFile, JSON.stringify(tableData));

    tableInfo.rows = Number(tableInfo.rows) + 1;

    await writeFile(tableFile, JSON.stringify(tableInfo));

    //console.log('data = ', validatedData.validData);
    //console.log('tableInfo = ', tableInfo);
    res.json({ data: validatedData.validData, table: tableInfo });
  } catch (error) {
    console.log('error = ', error.message);
    res.status(400).json({ message: error.message });
  }
};

const validatedDataToChange = () => {

};

const changeRowTable = async (req, res) => {
  try {
    const dbId = req.body.dbId;
    const tableName = req.body.tableName;
    const data = req.body.data;

    const tableFileName = dbId + '_' + tableName + '.json';
    const tableFile = path.join(pathTables, tableFileName);
    const tableInfo = await readJson(tableFile);

    let idxField = tableInfo.fields.find(f => f.index === 'primery');

    if (!idxField) {
      idxField = tableInfo.fields.find(f => f.index === 'unique');
    }

    if (!idxField) {
      throw new Error('one of field in row must by unique')
    }

    const idxNameField = idxField.name;


  } catch (error) {
    console.log('error = ', error.message);
    res.status(400).json({ message: error.message });
  }
};

const clearTable = async (req, res) => {
  try {
    const dbId = req.query.dbId;
    const tableName = req.query.tableName;

    const tableFileName = dbId + '_' + tableName + '.json';
    const tableFile = path.join(pathTables, tableFileName);
    const tableInfo = await readJson(tableFile);

    if (tableInfo.rows <= 0) {
      throw new Error(`table "${tableInfo.name}" is no has any rows`);
    }

    const dataFileName = dbId + '_' + tableName + '.json';
    const dataFile = path.join(pathData, dataFileName);
    await unlink(dataFile);

    tableInfo.rows = 0;
    await writeFile(tableFile, JSON.stringify(tableInfo));

    res.json({ succes: `table "${tableInfo.name}" was successfully cleared.` });
  } catch (error) {
    console.log('error = ', error.message);
    res.status(400).json({ message: error.message });
  }
};

const delTableRow = async(req, res)=>{
  try {
    const dbId = req.query.dbId;
    const tableName = req.query.tableName;
    const rowId = req.query.rowId;

    const tableFileName = dbId + '_' + tableName + '.json';
    const tableFile = path.join(pathTables, tableFileName);
    const tableInfo = await readJson(tableFile);

    if (tableInfo.rows <= 0) {
      throw new Error(`table "${tableInfo.name}" is no has any rows`);
    }

    const keyField = tableInfo.keyField;
    if(!keyField){
      throw new Error(`table "${tableInfo.name}" is no has any unique field`);
    }

    const dataFileName = dbId + '_' + tableName + '.json';
    const dataFile = path.join(pathData, dataFileName);
    let data =  await readJson(dataFile);

    const idx = data.findIndex(row=>String(row[keyField])===String(rowId));

    if(idx<0){
      throw new Error(`in table "${tableInfo.name}" not found this row`);
    }

    data = [
      ...data.slice(0, idx),
      ...data.slice(idx+1)
    ];

    await writeFile(dataFile, JSON.stringify(data));

    tableInfo.rows = Number(tableInfo.rows) - 1;

    await writeFile(tableFile, JSON.stringify(tableInfo));

    res.json({ succes: `successfully delete row in table "${tableInfo.name}".` });
  } catch (error) {
    console.log('error = ', error.message);
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  createTable,
  changeTable,
  getTableData,
  addRowToTable,
  clearTable,
  delTableRow
}