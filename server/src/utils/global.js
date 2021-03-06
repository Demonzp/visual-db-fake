const path = require('path');

const createId = (length, arrSymbals) => {
  const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  let addChars = [];
  let id = '';

  if(Array.isArray(arrSymbals)){
    addChars = arrSymbals;
  }

  const fullChars = [...chars, ...addChars];

  for (let i = 0; i < length; i++) {
    id += fullChars[Math.floor(Math.random() * fullChars.length)];

  }

  return id;
}

const pathDB = path.normalize(path.join(__dirname, '../../db'));
const pathTables = path.normalize(path.join(__dirname, '../../tables'));
const pathData = path.normalize(path.join(__dirname, '../../data'));

const upDate = (data)=>{
  data.version = Number(data.version) + 1;
  data.changeAt = Date.now();
  return data;
}

module.exports = {
  createId,
  pathDB,
  pathTables,
  pathData,
  upDate
}