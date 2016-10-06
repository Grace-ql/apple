$(function(){
    var solides=$('.gallery-slide-wrapper a');
    var dots=$('.dot');
    var moving=false;
    var moveTo=function (el,dir){
        // if(!moving) {
            if (dir === 'right') {
                moving = true;
                $(el).addClass('right').delay(100).queue(function () {
                    $(this).removeClass('right').addClass('active').dequeue();
                });
                solides.filter('.active').removeClass('active').addClass('leave').delay(1000).queue(function () {
                    $(this).removeClass('leave').dequeue();
                    moving = false;
                });

            } else if (dir === 'left') {
                solides.filter('.active').removeClass('active').addClass('enter').delay(1000).queue(function () {
                    $(this).removeClass('enter').dequeue();
                    moving = false;
                })
                $(el).addClass('left').delay(100).queue(function () {
                    $(this).removeClass('left').addClass('active').dequeue();
                    moving = false;
                });
            }
        // }
            dots.removeClass('active').eq(solides.index(el)).addClass('active');
    }
    dots.on('click',function(){
        var c=solides.filter('.active').index();
        var n=$(this).index();
        if(c==n) {
            return
        }else if(c>n){
            moveTo(solides.eq(n),'left');
        }else if(c<n){
            moveTo(solides.eq(n),'right');
        }

    })
     var moveright=function () {
        var active=solides.filter('.active');
        var el=active.next().length?active.next():solides.eq(0);
        moveTo(el,'right');
    }
   var moveleft=function () {
        var active=solides.filter('.active');
        var el=active.prev().length?active.prev():solides.eq(-1);
        moveTo(el,'left');
    }
   var  t=setInterval(moveright,2000);
    $('.gallery-slide-wrapper').on('mouseenter',function () {
        clearInterval(t);
    })
    $('.gallery-slide-wrapper').on('mouseleave',function () {
        t=setInterval(moveright,2000);
    })
    $('.btn-box-left').on('mouseenter',function(){
        $('.gallery-slide-wrapper .btn-list .leftbtn').animate({
            'opacity':1,
        });
    })
    $('.btn-box-left').on('mouseleave',function () {
        $('.gallery-slide-wrapper .btn-list .leftbtn').animate({
            'opacity':0,
        });
    })
    $('.btn-box-right').on('mouseenter',function(){
        $('.gallery-slide-wrapper .btn-list .rightbtn').animate({
            'opacity':1,
        });
    })
    $('.btn-box-right').on('mouseleave',function () {
        $('.gallery-slide-wrapper .btn-list .rightbtn').animate({
            'opacity':0,
        });
    })

    $('.leftbtn').on('click',function(){
        moveleft();
    })
    $('.rightbtn').on('click',function(){
        moveright();
    })
})