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
        
        //set placeholder properties
        $(settings.placeHolderName).css({
            height: settings.containerHeight,
            width: '100%'
        });
        
        //image settings
        var _imgTransX = new Array();
        var _imgTransY = new Array();
                    
        var _window = $(window);
        var _document = $(document);
                    
        var _parallax = $(".parallax");
        var _parallaxContainer = $(".parallax-container");
        var _parallaxImage = $(".parallax-image");
        
        var _body = $('body');
        var _winWith = parseInt(_window.width());
        var _winHeight = parseInt(_window.height());

        //create parent element for the parallax-container
        var parallaxParent = $(document.createElement("div"));
        parallaxParent.addClass("parallax-parent");
        _body.prepend(parallaxParent);

        _parallax.each(function(index, obj) {
            _imgTransX[index] = 0;
            _imgTransY[index] = 0;
            var elem = $(obj);
            var elemHeight = parseInt(elem.attr('data-height'));
            var elemWith = parseInt(elem.attr('data-with'));
            var elemImage = elem.attr('data-image');
            
            if(_winWith >= elemWith){
                _imgTransX[index] = 0;
                elemWith = elemWith + (_winWith - elemWith);
                elemHeight = elemHeight * (_winWith/elemWith);
            }else{
                _imgTransX[index] = (_winWith - elemWith)/2;                
            }
            
            //create a parallax-container for each parallax object in the document
            var parallaxContainer = $(document.createElement("div"));
            parallaxContainer.addClass("parallax-container");
            parallaxContainer.css({
                visibility: 'hidden',
                'transform': 'translate3d(0px, 0px, 0px)',
                '-webkit-transform': 'translate3d(0px, 0px, 0px)'
            });

            //create a image-container for each parallax-container
            var parallaxImage = $(document.createElement("div"));
            parallaxImage.addClass("parallax-image");
            parallaxImage.css({
                backgroundImage: "url('" + elemImage + "')",
                width: elemWith,
                height: elemHeight,
                'transform': 'translate3d(' + _imgTransX[index] + 'px, 0px, 0px)',
                '-webkit-transform': 'translate3d(' + _imgTransX[index] + 'px, 0px, 0px)'
            });

            //append those container tho its parents
            parallaxContainer.append(parallaxImage);
            parallaxParent.append(parallaxContainer);
        });

        //set image position on resize
        _window.resize(function() {
            $(".parallax-image").each(function(index, obj) {
                var elem = $(obj);
                var elemWith = parseInt($(_parallax.get(index)).attr('data-with'));
                var elemHeight = parseInt($(_parallax.get(index)).attr('data-height'));
                
                //if winWith is bigger than the image-with, adapt the image-with with the winWith
                if(_winWith >= elemWith){
                    _imgTransX[index] = 0;
                    //no need to center the image
                    //translateImage(elem, _imgTransX[index], _imgTransY[index]);
                    
                    elem.css({                 
                        'transform': 'translate3d(' + _imgTransX[index] + 'px, ' + _imgTransY[index] + 'px, 0px)',
                        '-webkit-transform': 'translate3d(' + _imgTransX[index] + 'px, ' + _imgTransY[index] + 'px, 0px)'
                    });
                    elem.css({
                        width: elemWith + (_winWith - elemWith),
                        height: elemHeight * (_winWith/elemWith)
                    });
                }else{
                    _imgTransX[index] = (_winWith - elemWith)/2;
                    
                    //translate the image to center it
                    //translateImage(elem, _imgTransX[index], _imgTransY[index]);
                    
                    elem.css({                 
                        'transform': 'translate3d(' + _imgTransX[index] + 'px, ' + _imgTransY[index] + 'px, 0px)',
                        '-webkit-transform': 'translate3d(' + _imgTransX[index] + 'px, ' + _imgTransY[index] + 'px, 0px)'
                    });
                    elem.css({
                        width: elemWith,
                        height: elemHeight
                    });
                }
                
                if(_winWith >= elemWith){
                    _imgTransX[index] = 0;
                    elemWith = elemWith + (_winWith - elemWith);
                    elemHeight = elemHeight * (_winWith/elemWith);
                }else{
                    _imgTransX[index] = (_winWith - elemWith)/2;                
                }
                
            });
        });

        //bind on scroll event to window
        _window.scroll(function() {
            var scrollTop = _window.scrollTop();            
            var contTop = _winHeight + scrollTop;

            //reset all css-properties
            _parallaxContainer.css({
                visibility: 'hidden',
                height: 0,
                'transform': 'translate3d(0px, 0px, 0px)',
                '-webkit-transform': 'translate3d(0px, 0px, 0px)'
            });
            
            //loop through each parallax object on the document
            _parallax.each(function(index, obj) {                
                var elem = $(obj);
                
                var offset = elem.offset().top;
                var position = (offset - scrollTop);
                var visibility = 'visible';

                var cont = $(_parallaxContainer.get(index));

                //if container-top(offset.top) reaches the bottom of the window(winHeight + scrollTop) while scrolling ... 1*
                if ((contTop) >= offset) {
                    //but, if container-bottom(settings.containerHeight) reaches top of the window(scrollTop - offset.top)  while scrolling ... 2*
                    if ((scrollTop - offset) >= settings.containerHeight) {
                        // 2* ... hide the container ...
                        position = 0;
                        visibility = 'hidden';
                    }

                    // 1* ... set the container visible and set it to the position of its placeholder ...
                    cont.css({
                        visibility: visibility,
                        height: settings.containerHeight,
                        'transform': 'translate3d(0px, ' + position + 'px, 0px)',
                        '-webkit-transform': 'translate3d(0px, ' + position + 'px, 0px)'
                    });

                    // ... set the parallax-image visible and translate it a bit slower as its container
                    _imgTransY[index] = (-(position) * settings.parallax);
                    //translateImage($(cont.children().first()), _imgTransX[index], _imgTransY[index]);
                    
                    cont.children().first().css({                 
                        'transform': 'translate3d(' + _imgTransX[index] + 'px, ' + _imgTransY[index] + 'px, 0px)',
                        '-webkit-transform': 'translate3d(' + _imgTransX[index] + 'px, ' + _imgTransY[index] + 'px, 0px)'
                    });
                }
            });
        });
        return this;
    };
    
    /*function translateImage(obj, x, y){
        obj.css({                 
            'transform': 'translate3d(' + x + 'px, ' + y + 'px, 0px)',
            '-webkit-transform': 'translate3d(' + x + 'px, ' + y + 'px, 0px)'
        });
    }*/

}(jQuery));

