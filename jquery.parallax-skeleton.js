/**
 * jQuery.parallax-skeleton - Parallax-scrolling on a new level
 * Copyright (c) 2013 Rolf Isler & Martin Kubli
 * Licensed under MIT.
 * Date: 18/11/2013
 * @author Rolf Isler & Martin Kubli
 * @version 0.1.0
 **/

(function($) {

    $.fn.parallax = function(options) {

        // Default options
        var settings = $.extend({
            placeHolderName: '.parallax',
            containerHeight: 700,
            parallax: 0.75
        }, options);
        
        //image settings
        var imgTransX = new Array();
        var imgTransY = new Array();

        //set placeholder properties
        $(settings.placeHolderName).css({
            height: settings.containerHeight,
            width: '100%'
        });

        //create parent element for the parallax-container
        var parallaxParent = document.createElement("div");
        $(parallaxParent).addClass("parallax-parent");
        $('body').prepend($(parallaxParent));

        $(".parallax").each(function(index, obj) {
            _imgTransX[index] = 0;
            _imgTransY[index] = 0;
            var winWith = parseInt($(window).width());
            var elemWith = parseInt($(obj).attr('data-with'));
            var elemHeight = parseInt($(obj).attr('data-height'));
            
            if(winWith >= elemWith){
                imgTransX[index] = 0;
                elemWith = elemWith + (winWith - elemWith);
                elemHeight = elemHeight * (winWith/elemWith);
            }else{
                imgTransX[index] = (winWith - elemWith)/2;
                
            }
            
            //create a parallax-container for each parallax object in the document
            var parallaxContainer = document.createElement("div");
            $(parallaxContainer).addClass("parallax-container");
            $(parallaxContainer).css({
                visibility: 'hidden',
                'transform': 'translate3d(0px, 0px, 0px)',
                '-webkit-transform': 'translate3d(0px, 0px, 0px)'
            });

            //create a image-container for each parallax-container
            var parallaxImage = document.createElement("div");
            $(parallaxImage).addClass("parallax-image");
            $(parallaxImage).css({
                backgroundImage: "url('" + $(obj).attr('data-image') + "')",
                width: elemWith,
                height: $(obj).attr('data-height'),
                'transform': 'translate3d(' + imgTransX[index] + 'px, 0px, 0px)',
                '-webkit-transform': 'translate3d(' + imgTransX[index] + 'px, 0px, 0px)'
            });

            //append those container tho its parents
            $(parallaxContainer).append($(parallaxImage));
            $(parallaxParent).append($(parallaxContainer));
        });

        //set image position on resize
        $(window).resize(function() {
            $(".parallax-image").each(function(index, obj) {
                var winWith = $(window).width();
                var elemWith = parseInt($($(".parallax").get(index)).attr('data-with'));
                var elemHeight = parseInt($($(".parallax").get(index)).attr('data-height'));
                
                //if winWith is bigger than the image-with, adapt the image-with with the winWith
                if(winWith >= elemWith){
                    imgTransX[index] = 0;
                    //no need to center the image
                    translateImage($(obj), imgTransX[index], imgTransY[index], 0);
                    $(obj).css({
                        width: elemWith + (winWith - elemWith),
                        height: elemHeight * (winWith/elemWith)
                    });
                }else{
                    imgTransX[index] = (winWith - elemWith)/2;
                    //translate the image to center it
                    translateImage($(obj), imgTransX[index], imgTransY[index], 0);
                    $(obj).css({
                        width: elemWith,
                        height: elemHeight
                    });
                }
            });
        });

        //bind on scroll event to window
        $(window).scroll(function() {
            var scrollTop = $(window).scrollTop();
            var winHeight = $(window).height();

            var contTop = winHeight + scrollTop;

            //reset all css-properties
            $(".parallax-container").css({
                visibility: 'hidden',
                height: 0,
                'transform': 'translate3d(0px, 0px, 0px)',
                '-webkit-transform': 'translate3d(0px, 0px, 0px)'
            });
            //loop through each parallax object on the document
            $(".parallax").each(function(index, obj) {
                var offset = $(obj).offset().top;
                var position = (offset - scrollTop);
                var visibility = 'visible';

                var cont = $(".parallax-container").get(index);

                //if container-top(offset.top) reaches the bottom of the window(winHeight + scrollTop) while scrolling ... 1*
                if ((contTop) >= offset) {
                    //but, if container-bottom(settings.containerHeight) reaches top of the window(scrollTop - offset.top)  while scrolling ... 2*
                    if ((scrollTop - offset) >= settings.containerHeight) {
                        // 2* ... hide the container ...
                        position = 0;
                        visibility = 'hidden';
                    }

                    // 1* ... set the container visible and set it to the position of its placeholder ...
                    $(cont).css({
                        visibility: visibility,
                        height: settings.containerHeight,
                        'transform': 'translate3d(0px, ' + position + 'px, 0px)',
                        '-webkit-transform': 'translate3d(0px, ' + position + 'px, 0px)'
                    });

                    // ... set the parallax-image visible and translate it a bit slower as its container
                    imgTransY[index] = (-(position) * settings.parallax);
                    translateImage($(cont).children().first(), imgTransX[index], imgTransY[index]);
                }
            });
        });
        return this;
    };
    
    function translateImage(obj, x, y){
        $(obj).css({                 
            'transform': 'translate3d(' + x + 'px, ' + y + 'px, 0px)',
            '-webkit-transform': 'translate3d(' + x + 'px, ' + y + 'px, 0px)'
        });
    }

}(jQuery));

