// Monkey patch jQuery 1.3.1+ to add support for setting or animating CSS
// scale and rotation independently.
// 2009 Zachary Johnson www.zachstronaut.com
(function($){var rotateUnits='deg';$.fn.rotate=function(val)
{var style=$(this).css('transform')||'none';if(typeof val=='undefined')
{if(style)
{var m=style.match(/rotate\(([^)]+)\)/);if(m&&m[1])
{return m[1];}}
return 0;}
var m=val.toString().match(/^(-?\d+(\.\d+)?)(.+)?$/);if(m)
{if(m[3])
{rotateUnits=m[3];}
$(this).css('transform',style.replace(/none|rotate\([^)]*\)/,'')+'rotate('+m[1]+rotateUnits+')');}}
$.fn.scale=function(val,duration,options)
{var style=$(this).css('transform');if(typeof val=='undefined')
{if(style)
{var m=style.match(/scale\(([^)]+)\)/);if(m&&m[1])
{return m[1];}}
return 1;}
$(this).css('transform',style.replace(/none|scale\([^)]*\)/,'')+'scale('+val+')');}
var curProxied=$.fx.prototype.cur;$.fx.prototype.cur=function()
{if(this.prop=='rotate')
{return parseFloat($(this.elem).rotate());}
else if(this.prop=='scale')
{return parseFloat($(this.elem).scale());}
return curProxied.apply(this,arguments);}
$.fx.step.rotate=function(fx)
{$(fx.elem).rotate(fx.now+rotateUnits);}
$.fx.step.scale=function(fx)
{$(fx.elem).scale(fx.now);}
var animateProxied=$.fn.animate;$.fn.animate=function(prop)
{if(typeof prop['rotate']!='undefined')
{var m=prop['rotate'].toString().match(/^(([+-]=)?(-?\d+(\.\d+)?))(.+)?$/);if(m&&m[5])
{rotateUnits=m[5];}
prop['rotate']=m[1];}
return animateProxied.apply(this,arguments);}})(jQuery);