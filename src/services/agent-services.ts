import { IResource } from '../reducers/agent-reducer'
import { v4 as uuidv4 } from 'uuid'

let defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRF-Token': 'csrf-token',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    //'Content-Type': 'multipart/form-data'
};

const baseUrl = '/'
// TODO: delete
const delay = 1500

interface IParams{
    id: number|string,
    data: string,
}

function mockResourceData(params:IParams){
    let result:IResource[] = []
    let items = params.data.split(',')
    items.map(item=>{
        result.push({
            id: uuidv4(),
            name: item
        })
    })
    return result
}

export function fetchAddResources(params:IParams){
    let url = `${baseUrl}add-resources`;

    let defaultData = {
      
    };
    //console.log('params',params);
    let ajaxData = Object.assign({}, defaultData, params);

    //////////////////////模拟服务器数据
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            let data = mockResourceData(params)
            resolve({data})
        }, delay)
    })


    /* 请求服务器
    var responseIsOk = false;
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'post',
            headers: defaultHeaders,
            credentials: 'same-origin',
            body: JSON.stringify(ajaxData),
          }).then( response => {
            responseIsOk = response.ok;
            if(!response.ok){
              //console.log(response)
            }
            return response.json();
          }).then( data => {
            if(responseIsOk){
              resolve(data);
            }else{
              reject(data);
            }
          }).catch(error => {
            //console.log(error)
            reject(error);
          });
    })
    */
}