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
            containerHeigth: 500,
            parallax: 0.75
        }, options );
        
        var $parallaxParent = document.createElement("div");
        $parallaxParent.setAttribute("class", "parallax-parent");
        $('body').append($parallaxParent);
            
        return this.find('[data-parallax="true"]').each(function (index, obj){
            var $parallaxContainer = document.createElement("div");
            $parallaxContainer.setAttribute("class", "parallax-container");
            $parallaxContainer.setAttribute("style", "visibility: hidden; heigth: 0;");
            
            var $parallaxImage = document.createElement("div");
            $parallaxImage.setAttribute("class", "parallax-image");
            $parallaxImage.setAttribute("style", "background-image: url('" + $(obj).attr('data-image') + "'); background-position-y: -40%");
            
            $parallaxContainer.appendChild($parallaxImage);
            $parallaxParent.appendChild($parallaxContainer);
        });
    };
    
    $(window).scroll(function(){
        scrollTop = $(window).scrollTop();
        winHeigth = $(window).height();
        
        $(".parallax").each(function(index, obj){
            var el = $(obj);
            var offset = el.offset();
            parallax = (offset.top - scrollTop);
            
            var cont = new Array();
            
            cont[index] = $(".parallax-container").get(index);
            $(cont[index]).css({
                visibility: 'hidden',
                height: '0',
                '-webkit-transform': 'none'
            });
            if((winHeigth + scrollTop) >= offset.top){
                $(cont[index]).css({
                    visibility: 'visible',
                    height: '500px',
                    'transform': 'translate3d(0px, ' + parallax + 'px, 0px)',
                    '-webkit-transform': 'translate3d(0px, ' + parallax + 'px, 0px)'
                });
                
                $(cont[index]).children().first().css({
                    visibility: 'visible',
                    'transform': 'translate3d(0px, ' + (-(parallax) * 0.75) + 'px, 0px)',
                    '-webkit-transform': 'translate3d(0px, ' + (-(parallax) * 0.75) + 'px, 0px)'
                });
            }
            
            if((scrollTop - offset.top) >= 500){
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

