export const fetchChangeTableFieldType = async (data:any):Promise<any>=>{
  return new Promise((resolve)=>{
    setTimeout(()=>{
      
      const table = {
        name:'user',
        fieds:[
          {
            name: 'first-name',
            type: 'str',
          },
          {
            name: 'second-name',
            type: 'str'
          }
        ],
        length: 0
      };

      return resolve(table);
    }, 1000);
  });
}