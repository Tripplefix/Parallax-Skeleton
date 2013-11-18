/**
 * jQuery.parallax-skeleton - Parallax-scrolling on a new level
 * Copyright (c) 2013 Rolf Isler & Martin Kubli
 * Licensed under MIT.
 * Date: 18/111/2013
 * @author Rolf Isler & Martin Kubli
 * @version 0.0.1(pre-alpha)
 **/

(function ( $ ) {
 
    $.fn.parallax = function(options) {
 
        // Default options
        var settings = $.extend({
            parallax: 0.75,
            image1url: "img/google-now-parallax-2400.jpg",
            image2url: "img/gallery-parallax-2400.jpg"
        }, options );
        
        return this.find('[data-parallax="rand"]').each(function (){
            var $pxCnt = document.createElement("div");
            $pxCnt.setAttribute("class", "parallax-container");
            $pxCnt.setAttribute("style", "visibility: hidden; heigth: 0;");
            
            var $pxImg = document.createElement("div");
            $pxImg.setAttribute("class", "parallax-image");
            $pxImg.setAttribute("style", "background-image: url('" + settings.image1url + "');");
            
            $pxCnt.appendChild($pxImg);
            $('.parallax-parent').append($pxCnt);
        });
    };
    
    $(window).scroll(function(){
        scrollTop = $(window).scrollTop();
        winHeigth = $(window).height();
        
        //console.log("scrolltop: " + scrollTop);
        //console.log("win heigth: " + winHeigth);
        //console.log("win heigth + scrolltop: " + (winHeigth + scrollTop));
        
        /*$(".parallax-container").each(function(){
            var el = $(this);
            var offset = el.offset();
            console.log(offset.top);
        });*/
        
        $(".parallax").each(function(index){
            var el = $(this);
            var offset = el.offset();
            if((winHeigth + scrollTop) >= el.offset()){
                console.log($(".parallax-container").get(index));
            }
            //console.log("elem pos: " + offset.top);
        });
        

       /* if(($(window).height() + scrollTop) >= $(window).height() && ($(window).height() + scrollTop) <= ($(window).height()*2 + 500)){
        //console.log("window: " + $(window).height());
            parallax = ($(window).height() - scrollTop);
            $('#cnt1').css({
                '-webkit-transform': 'translate3d(0px, ' + parallax + 'px, 0px)',
                'height': '500px',
                'visibility': 'visible'
            });
            $('#img1').css({
                '-webkit-transform': 'translate3d(0px, ' + (-(parallax + 500) * 0.75) + 'px, 0px)',
            });
        }
        else{
            $('#cnt1').css({
                '-webkit-transform': 'none',
                'visibility': 'hidden',
                'height': 0
            });
        }*/
    });
 
}( jQuery ));

