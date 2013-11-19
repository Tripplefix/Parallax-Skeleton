/**
 * jQuery.parallax-skeleton - Parallax-scrolling on a new level
 * Copyright (c) 2013 Rolf Isler & Martin Kubli
 * Licensed under MIT.
 * Date: 18/111/2013
 * @author Rolf Isler & Martin Kubli
 * @version 0.0.1(pre-alpha)
 **/

(function($) {

    $.fn.parallax = function(options) {

        // Default options
        var settings = $.extend({
            containerHeight: 700,
            parallax: 0.75
        }, options);

        //bind on scroll event to window
        $(window).scroll(function() {
            scrollTop = $(window).scrollTop();
            winHeight = $(window).height();

            //loop through each parallax object on the document
            $(".parallax").each(function(index, obj) {
                var el = $(obj);
                var offset = el.offset();
                position = (offset.top - scrollTop);

                var cont = new Array();

                //reset all css-properties
                cont[index] = $(".parallax-container").get(index);
                $(cont[index]).css({
                    visibility: 'hidden',
                    height: 0,
                    'transform': 'none',
                    '-webkit-transform': 'none'
                });

                //if container-top(offset.top) reaches the bottom of the window(winHeight + scrollTop) while scrolling ...
                if ((winHeight + scrollTop) >= offset.top) {
                    // ... set the container visible and set it to the position of its placeholder ...
                    $(cont[index]).css({
                        visibility: 'visible',
                        height: settings.containerHeight,
                        'transform': 'translate3d(0px, ' + position + 'px, 0px)',
                        '-webkit-transform': 'translate3d(0px, ' + position + 'px, 0px)'
                    });

                    // ... set the parallax-image visible and translate it a bit slower as its container
                    $(cont[index]).children().first().css({
                        visibility: 'visible',
                        'transform': 'translate3d(0px, ' + (-(position) * settings.parallax) + 'px, 0px)',
                        '-webkit-transform': 'translate3d(0px, ' + (-(position) * settings.parallax) + 'px, 0px)'
                    });
                }

                //if container-bottom(settings.containerHeight) reaches top of the window(scrollTop - offset.top)  while scrolling ... 
                if ((scrollTop - offset.top) >= settings.containerHeight) {
                    // ... hide the container and disable all transforms ...
                    $(cont[index]).css({
                        visibility: 'hidden',
                        height: 0,
                        'transform': 'none',
                        '-webkit-transform': 'none'
                    });
                    // ... hide the parallax-image and disable all transforms
                    $(cont[index]).children().first().css({
                        visibility: 'hidden',
                        'transform': 'none',
                        '-webkit-transform': 'none'
                    });
                }
            });
        });    
        
        //create parent element for the parallax-container
        var parallaxParent = document.createElement("div");
        $(parallaxParent).addClass("parallax-parent");
        $('.wrapper').prepend($(parallaxParent));

        $(".parallax").each(function(index, obj) {
            //create a parallax-container for each parallax object in the document
            var parallaxContainer = document.createElement("div");
            $(parallaxContainer).addClass("parallax-container");
            $(parallaxContainer).css({
                visibility: 'hidden',
                height: 0
            });
            
            //create a image-container for each parallax-container
            var parallaxImage = document.createElement("div");
            $(parallaxImage).addClass("parallax-image");
            $(parallaxImage).css({
                backgroundImage: "url('" + $(obj).attr('data-image') + "')"
            });

            //append those container tho its parents
            $(parallaxContainer).append($(parallaxImage));
            $(parallaxParent).append($(parallaxContainer));
        });        
        return this;
    };

}(jQuery));

