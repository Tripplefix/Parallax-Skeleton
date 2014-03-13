/* 
 * parallax-skeleton - Parallax-scrolling on a new level w/o jquery
 * Copyright (c) 2014 Rolf Isler
 * Licensed under MIT.
 * Date: 27.01.2014
 * @author Rolf Isler
 * @version 0.1.0
 * 
 * The MIT License
 *
 * Copyright 2014 Rolf Isler.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var Parallax = function() {

    // configuration, change things here
    var config = {
        placeHolderName: 'parallax',
        parentName: 'parallax-parent',
        parallax: 0.75
    };

    var ParallaxContainer = function(parent) {
        return {
            imageTransX: 0,
            imageTransY: 0,
            cont: null,
            image: null,
            finish: function() {
                //append those container tho its parents
                this.cont.appendChild(this.image);
                parent.appendChild(this.cont);
            }
        };
    };

    // start of main code 
    function init() {
        // check if the first argument is an object
        var a = arguments;
        if (isObj(a[ 0 ])) {
            var cfg = a[ 0 ];

            // loop through arguments and alter the configuration
            for (var i in cfg) {
                setConfig(config, i, cfg[i]);
            }
        }

        //image settings
        var //_imgTransX = [],
                //_imgTransY = [],
                _imgPosY = 0,
                _parallax = document.getElementsByClassName(config.placeHolderName),
                _body = document.body,
                _winWith = window.innerWidth,
                _winHeight = window.innerHeight,
                _transform = _body.style.transform !== undefined ? true : false,
                _containerList = new Array();

        //create parent element for the parallax-container                
        var parallaxParent = document.createElement("div");
        parallaxParent.classList.add(config.parentName);
        _body.insertBefore(parallaxParent, _body.firstChild);

        Array.prototype.forEach.call(_parallax, function(elem, index) {
            var elemHeight = elem.dataset.height,
                    elemWith = elem.dataset.with,
                    elemImage = elem.dataset.image,
                    elemOffset = elem.offsetTop,
                    containerHeight = elem.dataset.containerHeight;

            //set placeholder properties
            elem.style.height = containerHeight + "px";
            elem.style.width = '100%';

            var pc = new ParallaxContainer(parallaxParent);

            if (_winWith >= elemWith) {
                pc.imageTransX = 0;
                elemWith = elemWith + (_winWith - elemWith);
                elemHeight = elemHeight * (_winWith / elemWith);
            } else {
                pc.imageTransX = (_winWith - elemWith) / 2;
            }
            pc.imageTransY = -elem.dataset.posy;

            pc.cont = document.createElement("div");
            pc.cont.classList.add("parallax-container");
            pc.cont.style.visibility = 'visible';
            pc.cont.style.height = containerHeight + "px";
            if (_transform)
                pc.cont.style.transform = 'translate3d(0px, ' + elemOffset + 'px, 0px)';
            else
                pc.cont.style.webkitTransform = 'translate3d(0px, ' + elemOffset + 'px, 0px)';


            //create a image-container for each parallax-container
            pc.image = document.createElement("div");
            pc.image.classList.add("parallax-image");
            pc.image.style.backgroundImage = "url('" + elemImage + "')";
            pc.image.style.width = elemWith + "px";
            pc.image.style.height = elemHeight + "px";
            if (_transform)
                pc.image.style.transform = 'translate3d(' + pc.imageTransX + 'px, ' + (-(elemOffset) * config.parallax - _imgPosY) + 'px, 0px)';
            else
                pc.image.style.webkitTransform = 'translate3d(' + pc.imageTransX + 'px, ' + (-(elemOffset) * config.parallax - _imgPosY) + 'px, 0px)';

            pc.finish();
            _containerList.push(pc);
        });

        var //_parallaxContainer = document.getElementsByClassName('parallax-container'),
                _parallaxImage = document.getElementsByClassName('parallax-image');

        //set image position on resize
        window.addEventListener("resize", function() {
            //update window-variables
            _winWith = window.innerWidth;
            _winHeight = window.innerHeight;

            Array.prototype.forEach.call(_parallaxImage, function(elem, index) {
                var elemWith = _parallax[index].dataset.with,
                        elemHeight = _parallax[index].dataset.height,
                        cont = _containerList[index];

                if (_winWith >= elemWith) {
                    cont.imageTransX = 0;
                    elemWith = elemWith + (_winWith - elemWith);
                    elemHeight = elemHeight * (_winWith / elemWith);
                } else {
                    cont.imageTransX = (_winWith - elemWith) / 2;
                }
                elem.style.width = elemWith + "px";
                elem.style.height = elemHeight + "px";
                if (_transform)
                    elem.style.transform = 'translate3d(' + cont.imageTransX + 'px, ' + cont.imageTransY + 'px, 0px)';
                else
                    elem.style.webkitTransform = 'translate3d(' + cont.imageTransX + 'px, ' + cont.imageTransY + 'px, 0px)';
            });
        });

        //bind on scroll event to window
        window.addEventListener("scroll", function() {
            var scrollTop = document.body.scrollTop,
                    contTop = _winHeight + scrollTop;

            //reset all css-properties
            for (var i = 0, max = _containerList.length; i < max; i++) {
                _containerList[i].cont.style.visibility = 'hidden';
                if (_transform)
                    _containerList[i].cont.style.transform = 'translate3d(0px, 0px, 0px)';
                else
                    _containerList[i].cont.style.webkitTransform = 'translate3d(0px, 0px, 0px)';
            }

            //loop through each parallax object on the document
            Array.prototype.forEach.call(_parallax, function(elem, index) {
                var offset = elem.offsetTop,
                        position = (offset - scrollTop),
                        visibility = 'visible',
                        obj = _containerList[index],
                        containerHeight = elem.dataset.containerHeight;


                //if container-top(offset.top) reaches the bottom of the window(winHeight + scrollTop) while scrolling ... 1*
                if ((contTop) >= offset) {
                    //but, if container-bottom(settings.containerHeight) reaches top of the window(scrollTop - offset.top)  while scrolling ... 2*
                    if ((scrollTop - offset) >= containerHeight) {
                        // 2* ... hide the container ...
                        position = 0;
                        visibility = 'hidden';
                    }

                    // 1* ... set the container visible and set it to the position of its placeholder ...
                    obj.cont.style.visibility = visibility;
                    if (_transform)
                        obj.cont.style.transform = 'translate3d(0px, ' + position + 'px, 0px)';
                    else
                        obj.cont.style.webkitTransform = 'translate3d(0px, ' + position + 'px, 0px)';


                    // ... set the parallax-image visible and translate it a bit slower as its container
                    obj.imageTransY = (-(position) * config.parallax - _imgPosY);
                    //translateImage($(cont.children().first()), _imgTransX[index], _imgTransY[index]);

                    if (_transform)
                        obj.cont.children[0].style.transform = 'translate3d(' + obj.imageTransX + 'px, ' + obj.imageTransY + 'px, 0px)';
                    else
                        obj.cont.children[0].style.webkitTransform = 'translate3d(' + obj.imageTransX + 'px, ' + obj.imageTransY + 'px, 0px)';
                }
            });
        });
    }

    function setConfig(o, p, v) {
        // loop through all the properties of he object
        for (var i in o) {
            // when the value is an object call this function recursively
            if (isObj(o[i])) {
                setConfig(o[i], p, v);

                // otherwise compare properties and set their value accordingly
            } else {
                if (i === p) {
                    o[p] = v;
                }
            }
        }
    }

    // tests if a parameter is an object (and not an array)
    function isObj(o) {
        return (typeof o === 'object' && typeof o.splice !== 'function');
    }

    return {
        init: init
    };
};