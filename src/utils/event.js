export function bindScroll(callback){
    //浏览量滚动条触底事件
    let currentBot = 0
    let isScrollDown = false
    window.onscroll =  ()=>{
        var marginBot = 0;
        if (Number(document.documentElement.scrollTop)){
            var X=Number(document.documentElement.scrollHeight);
            var Y=Number(document.documentElement.scrollTop)+Number(document.body.scrollTop);
            var Z=Number(document.documentElement.clientHeight);
            marginBot=X-Y-Z;
        } else {
            var J=Number(document.body.scrollHeight);
            var I=Number(document.body.scrollTop);
            var K=Number(document.body.clientHeight);
            marginBot=J-I-K;
        }
        if(marginBot<=0) {
            //console.log('to loading c m', currentBot, marginBot)
            if(isScrollDown){
                callback()
                isScrollDown = false
            }
        }else{
            if(currentBot>marginBot){
                isScrollDown = true;
            }else{
                isScrollDown = false
            }
            //console.log('c m', currentBot, marginBot, isScrollDown)
            currentBot = marginBot
        }
    }

}



function checkPosition(callback){
    
}

let currentBot = 0
let isScrollDown = false
export function checkScrollDown(callback){
    
    let marginBot = 0;
    if (Number(document.documentElement.scrollTop)){
        var X=Number(document.documentElement.scrollHeight);
        var Y=Number(document.documentElement.scrollTop)+Number(document.body.scrollTop);
        var Z=Number(document.documentElement.clientHeight);
        marginBot=X-Y-Z;
    } else {
        var J=Number(document.body.scrollHeight);
        var I=Number(document.body.scrollTop);
        var K=Number(document.body.clientHeight);
        marginBot=J-I-K;
    }
    if(marginBot<=0) {
        //console.log('to loading c m', currentBot, marginBot)
        if(isScrollDown){
            callback()
            isScrollDown = false
        }
    }else{
        if(currentBot>marginBot){
            isScrollDown = true;
        }else{
            isScrollDown = false
        }
        //console.log('c m', currentBot, marginBot, isScrollDown)
        currentBot = marginBot
    }
}
