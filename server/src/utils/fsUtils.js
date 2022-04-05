const { access, readFile } = require('fs/promises');
const { constants } = require('fs');
const path = require('path');

const isFileExist = async(_path)=>{
  try {
    await access(path.normalize(_path), constants.R_OK | constants.W_OK);
    return true;
  } catch (error) {
    console.log('error = ', error.message);
    throw error;
  }
}

const readJson = async(filePath)=>{
  try {
    const data = await readFile(filePath);
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  isFileExist,
  readJson
}