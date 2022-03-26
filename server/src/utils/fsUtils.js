const { access } = require('fs/promises');
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

module.exports = {
  isFileExist
}