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
            containerHeight: 500,
            parallax: 0.75
        }, options );
        
        var parallaxParent = document.createElement("div");
        $(parallaxParent).addClass("parallax-parent");
        $('.wrapper').prepend($(parallaxParent));
            
        return $(".parallax").each(function (index, obj){
            var parallaxContainer = document.createElement("div");
            $(parallaxContainer).addClass("parallax-container");
            $(parallaxContainer).css({
                visibility: 'hidden',
                height: 0
            });
            
            var parallaxImage = document.createElement("div");
            $(parallaxImage).addClass("parallax-image");
            $(parallaxImage).css({
                    backgroundImage: "url('" + $(obj).attr('data-image') + "')", 
                    backgroundPositionY: "-30%"
                });
                
            $(parallaxContainer).append($(parallaxImage));
            $(parallaxParent).append($(parallaxContainer));
        });
        
        /*$("parallax-container").css({
                visibility: 'hidden',
                height: 0
            });
            
        $(".parallax-image").each(function(index, obj){            
            $(obj).css({
                backgroundImage: "url('" + $(".parallax").get(index).attr('data-image') + "')",
                backgroundPositionY: '-40%'
            });
        });*/
    };
    
    $(window).scroll(function(){
        scrollTop = $(window).scrollTop();
        winHeight = $(window).height();
        
        $(".parallax").each(function(index, obj){
            var el = $(obj);
            var offset = el.offset();
            parallax = (offset.top - scrollTop);
            
            var cont = new Array();
            
            cont[index] = $(".parallax-container").get(index);
            $(cont[index]).css({
                visibility: 'hidden',
                height: '0',
                'transform': 'none',
                '-webkit-transform': 'none'
            });
            if((winHeight + scrollTop) >= offset.top){
                $(cont[index]).css({
                    visibility: 'visible',
                    height: '700px',
                    'transform': 'translate3d(0px, ' + parallax + 'px, 0px)',
                    '-webkit-transform': 'translate3d(0px, ' + parallax + 'px, 0px)'
                });
                
                $(cont[index]).children().first().css({
                    visibility: 'visible',
                    'transform': 'translate3d(0px, ' + (-(parallax) * 0.8) + 'px, 0px)',
                    '-webkit-transform': 'translate3d(0px, ' + (-(parallax) * 0.8) + 'px, 0px)'
                });
            }
            
            if((scrollTop - offset.top) >= 700){
                $(cont[index]).css({
                    visibility: 'hidden',
                    height: '0',
                    'transform': 'none',
                    '-webkit-transform': 'none'
                });                
                $(cont[index]).children().first().css({
                    visibility: 'hidden',
                    'transform': 'none',
                    '-webkit-transform': 'none'
                });
            }
        });
    });
 
}( jQuery ));

