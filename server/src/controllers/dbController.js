const path = require('path');
const { writeFile, readdir, readFile, mkdir } = require('fs/promises');
const { createId } = require('../utils/global');
const { isFileExist } = require('../utils/fsUtils');

const createDb = async (req, res) => {
  try {
    const id = createId(6, ['_']);

    const fileName = id + '.json';
    const dirPath = path.normalize(path.join(__dirname, '../../db'));
    try {
      await isFileExist(dirPath);
    } catch (error) {
      try {
        await mkdir(dirPath);
      } catch (error) {
        console.log('error = ', error.message);
        res.status(400).json({ message: error.message });
        return;
      }
      //res.status(400).json({ message: 'no any DataBases' });
    }
    
    const filePath = path.join(dirPath, fileName);

    try {

      await isFileExist(filePath);
      createDb(req, res);

    } catch (error) {

      const body = {
        createAt: Date.now(),
        changeAt: Date.now(),
        id,
        version: 1,
        tables: []
      }

      console.log('body = ', body);
      await writeFile(filePath, JSON.stringify(body));

    }
    res.json({ id });
  } catch (error) {
    console.log('error = ', error.message);
    res.json({ message: error.message });
  }
}

const getAllDb = async(_, res)=>{
  try {
    //console.log(__dirname +'../../db');
    
    const filePath = path.normalize(path.join(__dirname, '../../db'));
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
      const data = await readFile(path.join(filePath, file));
      //console.log('data = ', JSON.parse(data));
      dbs.push(JSON.parse(data));
    }
    res.json({dbs});
  } catch (error) {
    console.log('error = ', error.message);
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  createDb,
  getAllDb
}