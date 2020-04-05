var timer = null;
var sliderPage = document.getElementsByClassName('sliderPage')[0];
var moveWidth = sliderPage.children[0].offsetWidth;
var num = sliderPage.children.length - 1;
var left = 0;
var leftBtn = document.getElementsByClassName('btnLeft')[0];
var rightBtn = document.getElementsByClassName('btnRight')[0];
var lock = true;
var index = 0;
var oSpanArray = document.getElementsByClassName('sliderIndex')[0].getElementsByTagName('span')
var wrap = document.getElementsByClassName('wrapper')[0];
var btnShow_hide = document.getElementsByClassName('btnShow_hide')[0];
var sliderIndex = document.getElementsByClassName('sliderIndex')[0]
var flag = false;
var btnOpen_ClosePlay = document.getElementsByClassName('btnOpen_ClosePlay')[0];
var btnOpen_CloseLoop = document.getElementsByClassName('btnOpen_CloseLoop')[0]
var playFlag = false;
var loopFlag = false;
var time = 1500;
var input = document.getElementsByClassName('btnList')[0].getElementsByTagName('input')[0];
var setTime = document.getElementsByClassName('setTime')[0]


//动态设置延迟时间
setTime.onclick = function(){
    var value = input.value
    time = value || 1500;
    console.log(time);
}

//显示隐藏指示器
btnShow_hide.onclick = function () {
    var style = getStyle(sliderIndex, 'display')
    if (style == 'block') {
        sliderIndex.style.display = 'none'
    } else {
        sliderIndex.style.display = 'block'
    }
}
//开启关闭自动播放
btnOpen_ClosePlay.onclick = function () {
    if (playFlag) {
        timer = setTimeout(autoMove, time);
        playFlag = false
    } else {
        clearTimeout(timer)
        playFlag = true;
    }
}
//开启关闭无限循环
btnOpen_CloseLoop.onclick = function () {
    // loopFlag = loopFlag == 'ture' ? false : true;
    if(loopFlag){
        loopFlag = false
        timer = setTimeout(autoMove, time);
    }else{
        loopFlag = true;
        
    }
}


//鼠标移入停，移出动
wrap.onmouseenter = function (e) {
    clearTimeout(timer)
    flag = true;
}
wrap.onmouseleave = function () {
    if (!playFlag && !loopFlag) {
        timer = setTimeout(autoMove, time);
    }
    flag = false
}

//左右切换
leftBtn.onclick = function () {
    autoMove('rightToLeft')
}
rightBtn.onclick = function () {
    autoMove('leftToRight')
}

//圆点设置点击事件
for (var i = 0; i < oSpanArray.length; i++) {
    (function (myIndex) {
        oSpanArray[i].onclick = function () {
            if (lock) {
                lock = false;
                clearTimeout(timer);
                index = myIndex;
                startMove(sliderPage, 7, -index * moveWidth, function () {
                    timer = setTimeout(autoMove, time)
                    changeIndex(index)
                    lock = true;
                })
            }
        }
    })(i)
}

//改变圆点样式
function changeIndex(index) {
    for (var i = 0; i < oSpanArray.length; i++) {
        oSpanArray[i].className = ''
    }
    oSpanArray[index].className = 'active'
}

//自动轮播
function autoMove(direction) {
    if (lock) {
        lock = false;
        clearTimeout(timer);
        //左向右自动轮播和右切换
        if (!direction || direction == 'leftToRight') {
            index++;
            left = sliderPage.offsetLeft - moveWidth; //移动到的位置
            startMove(sliderPage, 7, left, function () {
                if(sliderPage.offsetLeft == -(num - 1) * moveWidth && loopFlag){
                    clearTimeout(timer)
                }else{
                    if (sliderPage.offsetLeft == -num * moveWidth) {
                        index = 0;
                        sliderPage.style.left = '0px';
                    }
                    //加标识，在切换状态下只切换不自动轮播 
                    if (!flag && !playFlag) {
                        timer = setTimeout(autoMove, time)
                    }
                }

                
                lock = true;
                changeIndex(index);
            })
        } else if (direction == 'rightToLeft') { //左切换
            if (sliderPage.offsetLeft == 0) {
                index = num;
                sliderPage.style.left = -num * moveWidth + 'px';
            }
            index--;
            changeIndex(index);
            left = sliderPage.offsetLeft + moveWidth; //移动到的位置
            startMove(sliderPage, 7, left, function () {
                //加标识，在切换状态下只切换不自动轮播
                if (!flag && !playFlag) {
                    timer = setTimeout(autoMove, time)
                }
                lock = true;
            })

        }
    }
}
timer = setTimeout(autoMove, time);