/*!
 * jQuery Image Twister
 *
 * Copyright 2010, Andrew Hite
 * Date: Thu May 27
 */
$(function(){
  $.fn.twister = function(options){
    options = jQuery.extend({
      duration: 250,
      degrees: 5,
      scale: 1.2,
      overflown: false
    }, options);
      
    $(this).each(function(){
      var container = $(this);
      $(this).find('img').load(function(){
        $(container).css({
          height: $(this).height(),
          width: $(this).width(),
          overflow: options.overflown ? 'visible' : 'hidden'
        });
      });
    })
    .mouseenter(function(){
      $(this).find('img')
        .css({
          zIndex: '9999'
        })
        .animate({
          rotate: options.degrees + 'deg',
					scale: options.scale
        }, { 
          duration: options.duration, 
          queue: true
        });
    })
    .mouseleave(function(){
      $(this).find('img')
        .css({
          zIndex: '9988'
        })
        .animate({
          rotate: 0 + 'deg',
					scale: 1
        }, {
          duration: options.duration,
          queue: true
        });
    });
  }
});