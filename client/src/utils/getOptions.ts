export const getOptionsFromEnum = <T>(varEnum:T):{value: string, label: string}[]=>{
  let arr = [];
  for (const [key, value] of Object.entries(varEnum)) {
    //console.log(`${key}: ${value}`);
    arr.push({
      value: value.toString(),
      label: key.toString()
    });
  }
  //console.log('arr = ', arr);
  return arr;
};