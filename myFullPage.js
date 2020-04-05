$.fn.extend({
    myFullPage:function(config){
        //初始化变量
        var w = $(this);
        var color = config.colorArray;
        var section = w.find('.section');
        var screenWidth = $(window).innerWidth();
        var screenHeight = $(window).innerHeight();
        var commonStyle = {
            width:'100%',
            height:'100%'
        }
        var pageIndex = 0;
        var lock = true;
        //初始化样式
        $('html')
            .add('body')
                .css({position:'relative',margin:0,overflow:'hidden',})
                    .add(w)
                        .css({position:'absolute',top:0,left:0})    
                            .add(section)
                                .css(commonStyle)
        section.each(function(index,ele){
            $(ele).css({backgroundColor:color[index]})
            // console.log($(ele).find('.slide'));
            if($(ele).find('.slide').length){
                $(ele).css({position:'relative',top:0,left:0});
                $(ele).wrapInner("<div class='slideWrapper'>");
            }
        })
        $('.slideWrapper').each(function(index,ele){
            $(ele).css({
                width:$(ele).find('.slide').length * screenWidth,
                height:'100%',
                position:'absolute',
                top:0,
                left:0
            }).find('.slide')
                .css({float:'left',
                width:screenWidth,
                height:'100%'
            }).end()
                .find('.slide')
                    .eq(0)
                        .addClass('innerActive');
        })
        section.eq(0).addClass('active');
        //垂直移动  
        function Move(keyCode){
            if(lock){
                lock = false;
                var direction = '';
                var newHeight = $(w).offset().top;
                if(keyCode == 38 && pageIndex != 0 || keyCode < 0 && pageIndex != 0){
                    pageIndex--;
                    newHeight += screenHeight;
                    direction = 'top';
                }else if(keyCode == 40 && pageIndex != section.length - 1 || keyCode > 0 && pageIndex != section.length - 1){
                    pageIndex++;
                    newHeight -= screenHeight;
                    direction = 'bottom';
                }
                $(w).animate({
                    top:newHeight,
                },800,'swing',function(){
                    lock = true;
                    section.eq(pageIndex).addClass('active');
                    if(direction == 'top'){
                        section.eq(pageIndex + 1).removeClass('active');
                        config.afterLoad(pageIndex);
                    }else if(direction == 'bottom'){
                        section.eq(pageIndex - 1).removeClass('active');
                        config.afterLoad(pageIndex);
                    }
                })
            }
        }
        $(document).on('keydown',function(e){
            if(e.keyCode == 38 || e.keyCode == 40){
                Move(e.keyCode)          
            }
            if(e.keyCode == 37 || e.keyCode == 39){
                if(lock){
                    lock = false;
                    var sw = $('.active').find('.slideWrapper');
                    var newWidth = sw.offset().left;
                    var temp = sw.find('.innerActive');
                    direction = null;
                    if(e.keyCode == 37 && temp.index() != 0){
                        newWidth += screenWidth;
                        direction = 'left';
                    }else if(e.keyCode == 39 && temp.index() != sw.find('.slide').length - 1){
                        newWidth -= screenWidth;
                        direction = 'right';
                    }
                    sw.animate({
                        left:newWidth,
                    },800,'swing',function(){
                        lock = true;
                        direction != null ? temp.removeClass('innerActive') : null;
                        if(direction == 'left'){
                            temp.prev().addClass('innerActive');
                        }else if(direction == 'right'){
                            temp.next().addClass('innerActive');
                        }
                    })
                }
            }
        })
        $(document).on('mousewheel', function(event) {
            Move(event.originalEvent.deltaY)
        });
    }
})
