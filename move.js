function startMove(dom,speed,target,callback){
    clearInterval(timer);
    var iSpeed = null;
    var timer = setInterval(function(){
        iSpeed = (target - dom.offsetLeft) / speed;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        if(dom.offsetLeft == target){
            clearInterval(timer);
            callback()
        }else{
            dom.style.left = dom.offsetLeft + iSpeed +'px'
        }
    },30)
}

//获取dom.style
function getStyle(dom,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(dom,null)[attr]
    }else{
        return dom.currentStyle[attr] //ie兼容
    }
}