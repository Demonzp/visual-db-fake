const path = require('path');
const { writeFile, readdir, mkdir } = require('fs/promises');
const { createId, pathDB, pathTables } = require('../utils/global');
const { isFileExist, readJson } = require('../utils/fsUtils');

const detectPathDB = async () => {
  try {
    await isFileExist(pathDB);
  } catch (error) {
    try {
      await mkdir(pathDB);
    } catch (error) {
      console.log('error = ', error.message);
      throw error;
    }
    //res.status(400).json({ message: 'no any DataBases' });
  }
}

const createDb = async (req, res) => {
  try {
    const id = createId(6, ['_']);
    const body = {
      dialect: 'mysql',
      createAt: Date.now(),
      changeAt: Date.now(),
      id,
      version: 1,
      tables: []
    };

    const fileName = id + '.json';
    
    await detectPathDB();
    
    const filePath = path.join(pathDB, fileName);

    try {

      await isFileExist(filePath);
      createDb(req, res);

    } catch (error) {

      console.log('body = ', body);
      await writeFile(filePath, JSON.stringify(body));

    }
    res.json({ db: body });
  } catch (error) {
    console.log('error = ', error.message);
    res.status(400).json({ message: error.message });
  }
}

const getAllDb = async(_, res)=>{
  try {
    //console.log(__dirname +'../../db');
    
    const filePath = pathDB;
    console.log(filePath);
    try {
      await isFileExist(filePath);
    } catch (error) {
      res.status(400).json({ message: 'no any DataBases' });
      return;
    }
   
    const files = await readdir(filePath);
    const dbs = [];

    for (const file of files){
      const data = await readJson(path.join(filePath, file));
      //console.log('data = ', JSON.parse(data));
      dbs.push(data);
    }
    res.json({dbs});
  } catch (error) {
    console.log('error = ', error.message);
    res.status(400).json({ message: error.message });
  }
}

const getDb = async(req, res) =>{
  try {
    const id = req.query.id;

    const fileName = id + '.json';
    
    const data = await readJson(path.join(pathDB, fileName));
    const tables = [];
    
    for (const tableName of data.tables) {
      const tableData = await readJson(path.join(pathTables, id+'_'+tableName+'.json'));
      tables.push(tableData);
    }
    console.log('tables = ', tables);

    delete data.tables;

    res.json({
      db: data,
      tables
    });
  } catch (error) {
    console.log('error = ', error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createDb,
  getAllDb,
  getDb
}