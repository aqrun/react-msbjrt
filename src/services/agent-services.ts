import { IResource } from '../reducers/agent-reducer'
import { v4 as uuidv4 } from 'uuid'

import {tableData} from './table-data'

let defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRF-Token': 'csrf-token',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    //'Content-Type': 'multipart/form-data'
};

const baseUrl = '/'
// TODO: delete
const delay = 500

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

function randomNum(minNum:number, maxNum:number):number {
    switch (arguments.length) {
      case 1:
          //@ts-ignore
        return parseInt(Math.random() * minNum + 1, 10);
        break;
      case 2:
          //@ts-ignore
        return parseInt(Math.random() * ( maxNum - minNum + 1 ) + minNum, 10);
        //或者 Math.floor(Math.random()*( maxNum - minNum + 1 ) + minNum );
        break;
      default:
        return 0;
        break;
    }
} 

const total = 80
function mockTableList(params:any){
    const initData = tableData
    const pageSize = params.pageSize
    let res = []
    let max = pageSize
    if(max<pageSize){
        max = pageSize
    }
    let total_left = total - (pageSize * params.current)
    if(total_left<pageSize){
        max = total_left
    }
    console.log('max', max)
    for(let i=0; i<max; i++){
        const num = randomNum(0, initData.length-1)
        let data = JSON.parse(JSON.stringify(initData[num]))
        //@ts-ignore
        data.id = uuidv4()
        res.push(data)
    }
    console.log('res', res)
    return res
}

interface IFetchParams{
    current: number,
    pageSize: number,
}
export function fetchTableList(params: IFetchParams){
    console.log('fetch table list server handle')
    //////////////////////模拟服务器数据
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            let data = mockTableList(params)
            resolve({
                current: params.current,
                pageSize: params.pageSize,
                total: total,
                data
            })
        }, delay)
    })
}