const path = require('path');
const { writeFile, mkdir } = require('fs/promises');
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
      fields: [],
      rows: 0
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

const isUniqueFields = (fields)=>{
  for (let i = 0; i <= fields.length-1; i++) {
    const field = fields[i];
    const findFields = fields.filter(f=>f.name===field.name);
    if(findFields.length>1){
      throw new Error(field.id);
    }   
  }
  return true;
}

const isPrimeryOne = (fields)=>{
  const findPrimerys = fields.filter(f=>f.index==='primery');
  if(findPrimerys.length>1){
    throw new Error('only one field cant be Primery')
  }
  return true;
}

const changeTable = async (req, res) => {
  try {
    const dbId = req.body.dbId;
    const table = req.body.table;

    const fields = req.body.fields;

    try {
      isUniqueFields(fields)
    } catch (error) {
      res.status(412).json({errors:[{ field: error.message, message: `field "name" must be unique` }]});
      return;
    }

    isPrimeryOne(fields);

    const dbFile = path.join(pathDB, dbId + '.json');
    const prevDb = await readJson(dbFile);

    const tableFile = path.join(pathTables, dbId+'_'+table.tableName + '.json');
    const prevTable = await readJson(tableFile);

    if(prevTable.version!==table.v){
      throw new Error(`version of table ${table.tableName} is old, please refresh your page`);
    }
    
    const tableRowsFile = path.join(pathData, dbId+'_'+table.tableName + '.json');
    let tableRows = [];

    if(tableFile.rows>0){
      tableRows = await readJson(tableRowsFile);
    }
    
    const tempFields = [];

    prevTable.fields.forEach(field=>{
      if(fields.find(f=>f.name===field.name)){
        tempFields.push(field);
      }
    });

    prevTable.fields = tempFields;

    //console.log('fields = ', fields);

    fields.forEach(field => {
      const idx = prevTable.fields.findIndex(f=>f.name===field.name);
      const tF = {...field};
      delete tF.id;
      //console.log('idx = ', idx);
      if(idx>=0){
        if(prevTable.fields[idx].type!==field.type && prevTable.rows>0){
          //throw new Error(`cant change type of field "${field.name}"`);
        }

        prevTable.fields[idx] = tF;
      }else{
        prevTable.fields.push(tF);
      }
    });

    //console.log('fields = ', prevTable.fields);

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

module.exports = {
  createTable,
  changeTable
}