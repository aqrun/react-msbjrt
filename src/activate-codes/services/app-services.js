let defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRF-Token': g.csrfToken,
    // 'Content-Type': 'application/x-www-form-urlencoded',
    //'Content-Type': 'multipart/form-data'
};

const TABLE_LIST_URL = `${g.baseUrl}activate-code`;


export function fetchTableList(params={}){
    let url = TABLE_LIST_URL;

    let defaultData = {
      
    };
    //console.log('params',params);
    let ajaxData = Object.assign({}, defaultData, params);

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
}

export function fetchCode(num){
  let url = `${g.baseUrl}activate-code/generate-code?num=${num}`;
  
  return fetch(url, {
    method: 'get',
    headers: defaultHeaders,
    credentials: 'same-origin',
  }).then(response => {
    return response.json().then(res => {
      if(res.code == 0){
        return res.result;
      }else{
        throw res;
      }
    })
  }).catch(err=>{
    throw err;
  });


}

export function fetchAddActivateCode(params){
  let url = `${g.baseUrl}activate-code/add`;

  let defaultData = {
    
  };
  //console.log('params',params);
  let ajaxData = Object.assign({}, defaultData, params);

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
          if(responseIsOk && data.code==0){
            resolve(data);
          }else{
            reject(data);
          }
        }).catch(error => {
          //console.log(error)
          reject(error);
        });
  })
}

export function fetchUpdateActivateCode(params){
  let url = `${g.baseUrl}activate-code/edit`;

  let defaultData = {
    
  };
  //console.log('params',params);
  let ajaxData = Object.assign({}, defaultData, params);
  return fetch(url, {
    method: 'post',
    headers: defaultHeaders,
    credentials: 'same-origin',
    body: JSON.stringify(ajaxData),
  }).then( response => {
    return response.json().then(res => {
      if (res.code == 0) {
          return res.result;
      } else {
          throw res;
      }
    })
  }).catch(error => {
    //console.log(error)
    throw error;
  });
}

export function fetchProductTypes(device_code) {
  let url = `${g.baseUrl}device/get-product-list?code=${device_code}&datatype=array`;

  return fetch(url, {
      method: 'get',
      headers: defaultHeaders,
      credentials: 'same-origin',
  }).then(response => {
      return response.json().then(res => {
          if (res.result == 1) {
              return res;
          } else {
              throw res;
          }
      })
  }).catch(error => {
      throw error;
  });
}

export function fetchDeviceList(data) {
  let code = data.code;
  let parent_code = data.parent_code;
  let url = `${g.baseUrl}device/get-device-list-array?code=${code}&parent_code=${parent_code}`;

  return fetch(url, {
      method: 'get',
      headers: defaultHeaders,
      credentials: 'same-origin',
  }).then(response => {
      return response.json().then(res => {
          if (res.code == 0) {
              return res.result;
          } else {
              throw res;
          }
      })
  }).catch(error => {
      throw error;
  });
}

export function fetchPermissionOptions(data){
  let url = `${g.baseUrl}activate-code/get-permission-array?device=${data.device}&product_type=${data.product_type}`;

  return fetch(url, {
      method: 'get',
      headers: defaultHeaders,
      credentials: 'same-origin',
  }).then(response => {
      return response.json().then(res => {
          if (res.code == 0) {
              return res.result;
          } else {
              throw res;
          }
      })
  }).catch(error => {
      throw error;
  });
}

export function fetchDeleteCode(id){
  let url = `${g.baseUrl}activate-code/delete`;

  let defaultData = {
    
  };
  //console.log('params',params);
  let ajaxData = Object.assign({}, defaultData, {
    id: id
  });
  return fetch(url, {
    method: 'post',
    headers: defaultHeaders,
    credentials: 'same-origin',
    body: JSON.stringify(ajaxData),
  }).then( response => {
    return response.json().then(res => {
      if (res.code == 0) {
          return res.result;
      } else {
          throw res;
      }
    })
  }).catch(error => {
    //console.log(error)
    throw error;
  });
}