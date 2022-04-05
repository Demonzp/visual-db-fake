const path = require('path');
const { writeFile, mkdir } = require('fs/promises');
const { isFileExist, readJson } = require('../utils/fsUtils');
const { pathTables, pathDB } = require('../utils/global');

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

const validationCreateTable = (body)=>{
  if(body.hasOwnProperty('nameTable')){
    const nameTable = body.nameTable;
    if(nameTable.length>30){
      throw new Error('nameTable cant be more then 30 chars');
    }else if(nameTable.length===0){
      throw new Error('nameTable is required');
    }

    return nameTable;
  }else{
    throw new Error('nameTable is required');
  }
}


const createTable = async (req, res)=>{
  try {
    let validData;

    try {
      validData = validationCreateTable(req.body);
    } catch (error) {
      res.status(412).json({field:'nameTable', message: error.message });
      return;
    }

    const dbId = req.body.dbId;
    const dbFile = path.join(pathDB, dbId+'.json');
    const dbData = await readJson(dbFile);

    await detectPathTable();

    const filePath = path.join(pathTables, dbId+'_'+validData+'.json');

    try {
      await isFileExist(filePath);
      res.status(412).json({field:'nameTable', message: `table "${validData}" already exists` });
      return;

    } catch (error) {
      if(dbData.tables.find(name=>name===validData)){
        res.status(412).json({field:'nameTable', message: `table "${validData}" already exists` });
        return;
      }
      
    }
    console.log('dbData = ', dbData);
    const data = {
      name: validData,
      version: 1,
      fields:[],
      rows: 0
    }

    dbData.tables.push(validData);
    dbData.version = Number(dbData.version)+1;
    dbData.changeAt = Date.now();
    
    await writeFile(filePath, JSON.stringify(data));
    await writeFile(dbFile, JSON.stringify(dbData));

    res.json({db: dbData, table: data});
    
  } catch (error) {
    console.log('error = ', error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createTable,
}