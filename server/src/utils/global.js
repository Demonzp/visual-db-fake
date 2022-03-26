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

module.exports = {
  createId
}