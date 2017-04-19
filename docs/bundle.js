(function () {
'use strict';

function createSpring(stiffness, dampening, value) {
  var lastValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  lastValue = lastValue || value;
  var destinationValue = value;

  return {
    updateValue: updateValue,
    isAtDestination: isAtDestination,
    tick: tick
  };

  function updateValue(newValue) {
    var shouldAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    destinationValue = newValue;
    if (!shouldAnimate) {
      value = newValue;
      lastValue = newValue;
    }
  }

  function isAtDestination() {
    var threshold = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Number.EPSILON;

    // making sure we're near the destination and that velocity is below threshold
    // NOTE: we could be doing this a better way perhaps?
    return Math.abs(value - destinationValue) <= threshold && Math.abs(value - lastValue) <= threshold;
  }

  function tick() {
    var steps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var shouldUpdateInternally = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (steps < 1) throw new Error('tick() expects `steps` to be greater than 0');
    if (!Number.isInteger(steps)) throw new Error('tick() expects `steps` to be an integer');

    var _value = value;
    var _lastValue = lastValue;
    while (steps--) {
      var velocity = _value - _lastValue;
      var delta = destinationValue - _value;
      var spring = delta * stiffness;
      var damper = velocity * -dampening;
      var acceleration = spring + damper;
      var nextValue = acceleration + velocity + _value;
      _lastValue = _value;
      _value = nextValue;
    }

    if (shouldUpdateInternally) {
      lastValue = _lastValue;
      value = _value;
    }

    return _value;
  }
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var dat_gui = createCommonjsModule(function (module) {
/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/** @namespace */
var dat = module.exports = dat || {};

/** @namespace */
dat.gui = dat.gui || {};

/** @namespace */
dat.utils = dat.utils || {};

/** @namespace */
dat.controllers = dat.controllers || {};

/** @namespace */
dat.dom = dat.dom || {};

/** @namespace */
dat.color = dat.color || {};

dat.utils.css = (function () {
  return {
    load: function (url, doc) {
      doc = doc || document;
      var link = doc.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = url;
      doc.getElementsByTagName('head')[0].appendChild(link);
    },
    inject: function(css, doc) {
      doc = doc || document;
      var injected = document.createElement('style');
      injected.type = 'text/css';
      injected.innerHTML = css;
      doc.getElementsByTagName('head')[0].appendChild(injected);
    }
  }
})();


dat.utils.common = (function () {
  
  var ARR_EACH = Array.prototype.forEach;
  var ARR_SLICE = Array.prototype.slice;

  /**
   * Band-aid methods for things that should be a lot easier in JavaScript.
   * Implementation and structure inspired by underscore.js
   * http://documentcloud.github.com/underscore/
   */

  return { 
    
    BREAK: {},
  
    extend: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (!this.isUndefined(obj[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
      
    },
    
    defaults: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (this.isUndefined(target[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
    
    },
    
    compose: function() {
      var toCall = ARR_SLICE.call(arguments);
            return function() {
              var args = ARR_SLICE.call(arguments);
              for (var i = toCall.length -1; i >= 0; i--) {
                args = [toCall[i].apply(this, args)];
              }
              return args[0];
            }
    },
    
    each: function(obj, itr, scope) {

      
      if (ARR_EACH && obj.forEach === ARR_EACH) { 
        
        obj.forEach(itr, scope);
        
      } else if (obj.length === obj.length + 0) { // Is number but not NaN
        
        for (var key = 0, l = obj.length; key < l; key++)
          if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) 
            return;
            
      } else {

        for (var key in obj) 
          if (itr.call(scope, obj[key], key) === this.BREAK)
            return;
            
      }
            
    },
    
    defer: function(fnc) {
      setTimeout(fnc, 0);
    },
    
    toArray: function(obj) {
      if (obj.toArray) return obj.toArray();
      return ARR_SLICE.call(obj);
    },

    isUndefined: function(obj) {
      return obj === undefined;
    },
    
    isNull: function(obj) {
      return obj === null;
    },
    
    isNaN: function(obj) {
      return obj !== obj;
    },
    
    isArray: Array.isArray || function(obj) {
      return obj.constructor === Array;
    },
    
    isObject: function(obj) {
      return obj === Object(obj);
    },
    
    isNumber: function(obj) {
      return obj === obj+0;
    },
    
    isString: function(obj) {
      return obj === obj+'';
    },
    
    isBoolean: function(obj) {
      return obj === false || obj === true;
    },
    
    isFunction: function(obj) {
      return Object.prototype.toString.call(obj) === '[object Function]';
    }
  
  };
    
})();


dat.controllers.Controller = (function (common) {

  /**
   * @class An "abstract" class that represents a given property of an object.
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var Controller = function(object, property) {

    this.initialValue = object[property];

    /**
     * Those who extend this class will put their DOM elements in here.
     * @type {DOMElement}
     */
    this.domElement = document.createElement('div');

    /**
     * The object to manipulate
     * @type {Object}
     */
    this.object = object;

    /**
     * The name of the property to manipulate
     * @type {String}
     */
    this.property = property;

    /**
     * The function to be called on change.
     * @type {Function}
     * @ignore
     */
    this.__onChange = undefined;

    /**
     * The function to be called on finishing change.
     * @type {Function}
     * @ignore
     */
    this.__onFinishChange = undefined;

  };

  common.extend(

      Controller.prototype,

      /** @lends dat.controllers.Controller.prototype */
      {

        /**
         * Specify that a function fire every time someone changes the value with
         * this Controller.
         *
         * @param {Function} fnc This function will be called whenever the value
         * is modified via this Controller.
         * @returns {dat.controllers.Controller} this
         */
        onChange: function(fnc) {
          this.__onChange = fnc;
          return this;
        },

        /**
         * Specify that a function fire every time someone "finishes" changing
         * the value wih this Controller. Useful for values that change
         * incrementally like numbers or strings.
         *
         * @param {Function} fnc This function will be called whenever
         * someone "finishes" changing the value via this Controller.
         * @returns {dat.controllers.Controller} this
         */
        onFinishChange: function(fnc) {
          this.__onFinishChange = fnc;
          return this;
        },

        /**
         * Change the value of <code>object[property]</code>
         *
         * @param {Object} newValue The new value of <code>object[property]</code>
         */
        setValue: function(newValue) {
          this.object[this.property] = newValue;
          if (this.__onChange) {
            this.__onChange.call(this, newValue);
          }
          this.updateDisplay();
          return this;
        },

        /**
         * Gets the value of <code>object[property]</code>
         *
         * @returns {Object} The current value of <code>object[property]</code>
         */
        getValue: function() {
          return this.object[this.property];
        },

        /**
         * Refreshes the visual display of a Controller in order to keep sync
         * with the object's current value.
         * @returns {dat.controllers.Controller} this
         */
        updateDisplay: function() {
          return this;
        },

        /**
         * @returns {Boolean} true if the value has deviated from initialValue
         */
        isModified: function() {
          return this.initialValue !== this.getValue()
        }

      }

  );

  return Controller;


})(dat.utils.common);


dat.dom.dom = (function (common) {

  var EVENT_MAP = {
    'HTMLEvents': ['change'],
    'MouseEvents': ['click','mousemove','mousedown','mouseup', 'mouseover'],
    'KeyboardEvents': ['keydown']
  };

  var EVENT_MAP_INV = {};
  common.each(EVENT_MAP, function(v, k) {
    common.each(v, function(e) {
      EVENT_MAP_INV[e] = k;
    });
  });

  var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;

  function cssValueToPixels(val) {

    if (val === '0' || common.isUndefined(val)) return 0;

    var match = val.match(CSS_VALUE_PIXELS);

    if (!common.isNull(match)) {
      return parseFloat(match[1]);
    }

    // TODO ...ems? %?

    return 0;

  }

  /**
   * @namespace
   * @member dat.dom
   */
  var dom = {

    /**
     * 
     * @param elem
     * @param selectable
     */
    makeSelectable: function(elem, selectable) {

      if (elem === undefined || elem.style === undefined) return;

      elem.onselectstart = selectable ? function() {
        return false;
      } : function() {
      };

      elem.style.MozUserSelect = selectable ? 'auto' : 'none';
      elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
      elem.unselectable = selectable ? 'on' : 'off';

    },

    /**
     *
     * @param elem
     * @param horizontal
     * @param vertical
     */
    makeFullscreen: function(elem, horizontal, vertical) {

      if (common.isUndefined(horizontal)) horizontal = true;
      if (common.isUndefined(vertical)) vertical = true;

      elem.style.position = 'absolute';

      if (horizontal) {
        elem.style.left = 0;
        elem.style.right = 0;
      }
      if (vertical) {
        elem.style.top = 0;
        elem.style.bottom = 0;
      }

    },

    /**
     *
     * @param elem
     * @param eventType
     * @param params
     */
    fakeEvent: function(elem, eventType, params, aux) {
      params = params || {};
      var className = EVENT_MAP_INV[eventType];
      if (!className) {
        throw new Error('Event type ' + eventType + ' not supported.');
      }
      var evt = document.createEvent(className);
      switch (className) {
        case 'MouseEvents':
          var clientX = params.x || params.clientX || 0;
          var clientY = params.y || params.clientY || 0;
          evt.initMouseEvent(eventType, params.bubbles || false,
              params.cancelable || true, window, params.clickCount || 1,
              0, //screen X
              0, //screen Y
              clientX, //client X
              clientY, //client Y
              false, false, false, false, 0, null);
          break;
        case 'KeyboardEvents':
          var init = evt.initKeyboardEvent || evt.initKeyEvent; // webkit || moz
          common.defaults(params, {
            cancelable: true,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: undefined,
            charCode: undefined
          });
          init(eventType, params.bubbles || false,
              params.cancelable, window,
              params.ctrlKey, params.altKey,
              params.shiftKey, params.metaKey,
              params.keyCode, params.charCode);
          break;
        default:
          evt.initEvent(eventType, params.bubbles || false,
              params.cancelable || true);
          break;
      }
      common.defaults(evt, aux);
      elem.dispatchEvent(evt);
    },

    /**
     *
     * @param elem
     * @param event
     * @param func
     * @param bool
     */
    bind: function(elem, event, func, bool) {
      bool = bool || false;
      if (elem.addEventListener)
        elem.addEventListener(event, func, bool);
      else if (elem.attachEvent)
        elem.attachEvent('on' + event, func);
      return dom;
    },

    /**
     *
     * @param elem
     * @param event
     * @param func
     * @param bool
     */
    unbind: function(elem, event, func, bool) {
      bool = bool || false;
      if (elem.removeEventListener)
        elem.removeEventListener(event, func, bool);
      else if (elem.detachEvent)
        elem.detachEvent('on' + event, func);
      return dom;
    },

    /**
     *
     * @param elem
     * @param className
     */
    addClass: function(elem, className) {
      if (elem.className === undefined) {
        elem.className = className;
      } else if (elem.className !== className) {
        var classes = elem.className.split(/ +/);
        if (classes.indexOf(className) == -1) {
          classes.push(className);
          elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
        }
      }
      return dom;
    },

    /**
     *
     * @param elem
     * @param className
     */
    removeClass: function(elem, className) {
      if (className) {
        if (elem.className === undefined) {
          // elem.className = className;
        } else if (elem.className === className) {
          elem.removeAttribute('class');
        } else {
          var classes = elem.className.split(/ +/);
          var index = classes.indexOf(className);
          if (index != -1) {
            classes.splice(index, 1);
            elem.className = classes.join(' ');
          }
        }
      } else {
        elem.className = undefined;
      }
      return dom;
    },

    hasClass: function(elem, className) {
      return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
    },

    /**
     *
     * @param elem
     */
    getWidth: function(elem) {

      var style = getComputedStyle(elem);

      return cssValueToPixels(style['border-left-width']) +
          cssValueToPixels(style['border-right-width']) +
          cssValueToPixels(style['padding-left']) +
          cssValueToPixels(style['padding-right']) +
          cssValueToPixels(style['width']);
    },

    /**
     *
     * @param elem
     */
    getHeight: function(elem) {

      var style = getComputedStyle(elem);

      return cssValueToPixels(style['border-top-width']) +
          cssValueToPixels(style['border-bottom-width']) +
          cssValueToPixels(style['padding-top']) +
          cssValueToPixels(style['padding-bottom']) +
          cssValueToPixels(style['height']);
    },

    /**
     *
     * @param elem
     */
    getOffset: function(elem) {
      var offset = {left: 0, top:0};
      if (elem.offsetParent) {
        do {
          offset.left += elem.offsetLeft;
          offset.top += elem.offsetTop;
        } while (elem = elem.offsetParent);
      }
      return offset;
    },

    // http://stackoverflow.com/posts/2684561/revisions
    /**
     * 
     * @param elem
     */
    isActive: function(elem) {
      return elem === document.activeElement && ( elem.type || elem.href );
    }

  };

  return dom;

})(dat.utils.common);


dat.controllers.OptionController = (function (Controller, dom, common) {

  /**
   * @class Provides a select input to alter the property of an object, using a
   * list of accepted values.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Object|string[]} options A map of labels to acceptable values, or
   * a list of acceptable string values.
   *
   * @member dat.controllers
   */
  var OptionController = function(object, property, options) {

    OptionController.superclass.call(this, object, property);

    var _this = this;

    /**
     * The drop down menu
     * @ignore
     */
    this.__select = document.createElement('select');

    if (common.isArray(options)) {
      var map = {};
      common.each(options, function(element) {
        map[element] = element;
      });
      options = map;
    }

    common.each(options, function(value, key) {

      var opt = document.createElement('option');
      opt.innerHTML = key;
      opt.setAttribute('value', value);
      _this.__select.appendChild(opt);

    });

    // Acknowledge original value
    this.updateDisplay();

    dom.bind(this.__select, 'change', function() {
      var desiredValue = this.options[this.selectedIndex].value;
      _this.setValue(desiredValue);
    });

    this.domElement.appendChild(this.__select);

  };

  OptionController.superclass = Controller;

  common.extend(

      OptionController.prototype,
      Controller.prototype,

      {

        setValue: function(v) {
          var toReturn = OptionController.superclass.prototype.setValue.call(this, v);
          if (this.__onFinishChange) {
            this.__onFinishChange.call(this, this.getValue());
          }
          return toReturn;
        },

        updateDisplay: function() {
          this.__select.value = this.getValue();
          return OptionController.superclass.prototype.updateDisplay.call(this);
        }

      }

  );

  return OptionController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common);


dat.controllers.NumberController = (function (Controller, common) {

  /**
   * @class Represents a given property of an object that is a number.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Object} [params] Optional parameters
   * @param {Number} [params.min] Minimum allowed value
   * @param {Number} [params.max] Maximum allowed value
   * @param {Number} [params.step] Increment by which to change value
   *
   * @member dat.controllers
   */
  var NumberController = function(object, property, params) {

    NumberController.superclass.call(this, object, property);

    params = params || {};

    this.__min = params.min;
    this.__max = params.max;
    this.__step = params.step;

    if (common.isUndefined(this.__step)) {

      if (this.initialValue == 0) {
        this.__impliedStep = 1; // What are we, psychics?
      } else {
        // Hey Doug, check this out.
        this.__impliedStep = Math.pow(10, Math.floor(Math.log(this.initialValue)/Math.LN10))/10;
      }

    } else {

      this.__impliedStep = this.__step;

    }

    this.__precision = numDecimals(this.__impliedStep);


  };

  NumberController.superclass = Controller;

  common.extend(

      NumberController.prototype,
      Controller.prototype,

      /** @lends dat.controllers.NumberController.prototype */
      {

        setValue: function(v) {

          if (this.__min !== undefined && v < this.__min) {
            v = this.__min;
          } else if (this.__max !== undefined && v > this.__max) {
            v = this.__max;
          }

          if (this.__step !== undefined && v % this.__step != 0) {
            v = Math.round(v / this.__step) * this.__step;
          }

          return NumberController.superclass.prototype.setValue.call(this, v);

        },

        /**
         * Specify a minimum value for <code>object[property]</code>.
         *
         * @param {Number} minValue The minimum value for
         * <code>object[property]</code>
         * @returns {dat.controllers.NumberController} this
         */
        min: function(v) {
          this.__min = v;
          return this;
        },

        /**
         * Specify a maximum value for <code>object[property]</code>.
         *
         * @param {Number} maxValue The maximum value for
         * <code>object[property]</code>
         * @returns {dat.controllers.NumberController} this
         */
        max: function(v) {
          this.__max = v;
          return this;
        },

        /**
         * Specify a step value that dat.controllers.NumberController
         * increments by.
         *
         * @param {Number} stepValue The step value for
         * dat.controllers.NumberController
         * @default if minimum and maximum specified increment is 1% of the
         * difference otherwise stepValue is 1
         * @returns {dat.controllers.NumberController} this
         */
        step: function(v) {
          this.__step = v;
          return this;
        }

      }

  );

  function numDecimals(x) {
    x = x.toString();
    if (x.indexOf('.') > -1) {
      return x.length - x.indexOf('.') - 1;
    } else {
      return 0;
    }
  }

  return NumberController;

})(dat.controllers.Controller,
dat.utils.common);


dat.controllers.NumberControllerBox = (function (NumberController, dom, common) {

  /**
   * @class Represents a given property of an object that is a number and
   * provides an input element with which to manipulate it.
   *
   * @extends dat.controllers.Controller
   * @extends dat.controllers.NumberController
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Object} [params] Optional parameters
   * @param {Number} [params.min] Minimum allowed value
   * @param {Number} [params.max] Maximum allowed value
   * @param {Number} [params.step] Increment by which to change value
   *
   * @member dat.controllers
   */
  var NumberControllerBox = function(object, property, params) {

    this.__truncationSuspended = false;

    NumberControllerBox.superclass.call(this, object, property, params);

    var _this = this;

    /**
     * {Number} Previous mouse y position
     * @ignore
     */
    var prev_y;

    this.__input = document.createElement('input');
    this.__input.setAttribute('type', 'text');

    // Makes it so manually specified values are not truncated.

    dom.bind(this.__input, 'change', onChange);
    dom.bind(this.__input, 'blur', onBlur);
    dom.bind(this.__input, 'mousedown', onMouseDown);
    dom.bind(this.__input, 'keydown', function(e) {

      // When pressing entire, you can be as precise as you want.
      if (e.keyCode === 13) {
        _this.__truncationSuspended = true;
        this.blur();
        _this.__truncationSuspended = false;
      }

    });

    function onChange() {
      var attempted = parseFloat(_this.__input.value);
      if (!common.isNaN(attempted)) _this.setValue(attempted);
    }

    function onBlur() {
      onChange();
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    function onMouseDown(e) {
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      prev_y = e.clientY;
    }

    function onMouseDrag(e) {

      var diff = prev_y - e.clientY;
      _this.setValue(_this.getValue() + diff * _this.__impliedStep);

      prev_y = e.clientY;

    }

    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
    }

    this.updateDisplay();

    this.domElement.appendChild(this.__input);

  };

  NumberControllerBox.superclass = NumberController;

  common.extend(

      NumberControllerBox.prototype,
      NumberController.prototype,

      {

        updateDisplay: function() {

          this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
          return NumberControllerBox.superclass.prototype.updateDisplay.call(this);
        }

      }

  );

  function roundToDecimal(value, decimals) {
    var tenTo = Math.pow(10, decimals);
    return Math.round(value * tenTo) / tenTo;
  }

  return NumberControllerBox;

})(dat.controllers.NumberController,
dat.dom.dom,
dat.utils.common);


dat.controllers.NumberControllerSlider = (function (NumberController, dom, css, common, styleSheet) {

  /**
   * @class Represents a given property of an object that is a number, contains
   * a minimum and maximum, and provides a slider element with which to
   * manipulate it. It should be noted that the slider element is made up of
   * <code>&lt;div&gt;</code> tags, <strong>not</strong> the html5
   * <code>&lt;slider&gt;</code> element.
   *
   * @extends dat.controllers.Controller
   * @extends dat.controllers.NumberController
   * 
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   * @param {Number} minValue Minimum allowed value
   * @param {Number} maxValue Maximum allowed value
   * @param {Number} stepValue Increment by which to change value
   *
   * @member dat.controllers
   */
  var NumberControllerSlider = function(object, property, min, max, step) {

    NumberControllerSlider.superclass.call(this, object, property, { min: min, max: max, step: step });

    var _this = this;

    this.__background = document.createElement('div');
    this.__foreground = document.createElement('div');
    


    dom.bind(this.__background, 'mousedown', onMouseDown);
    
    dom.addClass(this.__background, 'slider');
    dom.addClass(this.__foreground, 'slider-fg');

    function onMouseDown(e) {

      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);

      onMouseDrag(e);
    }

    function onMouseDrag(e) {

      e.preventDefault();

      var offset = dom.getOffset(_this.__background);
      var width = dom.getWidth(_this.__background);
      
      _this.setValue(
        map(e.clientX, offset.left, offset.left + width, _this.__min, _this.__max)
      );

      return false;

    }

    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    this.updateDisplay();

    this.__background.appendChild(this.__foreground);
    this.domElement.appendChild(this.__background);

  };

  NumberControllerSlider.superclass = NumberController;

  /**
   * Injects default stylesheet for slider elements.
   */
  NumberControllerSlider.useDefaultStyles = function() {
    css.inject(styleSheet);
  };

  common.extend(

      NumberControllerSlider.prototype,
      NumberController.prototype,

      {

        updateDisplay: function() {
          var pct = (this.getValue() - this.__min)/(this.__max - this.__min);
          this.__foreground.style.width = pct*100+'%';
          return NumberControllerSlider.superclass.prototype.updateDisplay.call(this);
        }

      }



  );

  function map(v, i1, i2, o1, o2) {
    return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
  }

  return NumberControllerSlider;
  
})(dat.controllers.NumberController,
dat.dom.dom,
dat.utils.css,
dat.utils.common,
".slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}");


dat.controllers.FunctionController = (function (Controller, dom, common) {

  /**
   * @class Provides a GUI interface to fire a specified method, a property of an object.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var FunctionController = function(object, property, text) {

    FunctionController.superclass.call(this, object, property);

    var _this = this;

    this.__button = document.createElement('div');
    this.__button.innerHTML = text === undefined ? 'Fire' : text;
    dom.bind(this.__button, 'click', function(e) {
      e.preventDefault();
      _this.fire();
      return false;
    });

    dom.addClass(this.__button, 'button');

    this.domElement.appendChild(this.__button);


  };

  FunctionController.superclass = Controller;

  common.extend(

      FunctionController.prototype,
      Controller.prototype,
      {
        
        fire: function() {
          if (this.__onChange) {
            this.__onChange.call(this);
          }
          if (this.__onFinishChange) {
            this.__onFinishChange.call(this, this.getValue());
          }
          this.getValue().call(this.object);
        }
      }

  );

  return FunctionController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common);


dat.controllers.BooleanController = (function (Controller, dom, common) {

  /**
   * @class Provides a checkbox input to alter the boolean property of an object.
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var BooleanController = function(object, property) {

    BooleanController.superclass.call(this, object, property);

    var _this = this;
    this.__prev = this.getValue();

    this.__checkbox = document.createElement('input');
    this.__checkbox.setAttribute('type', 'checkbox');


    dom.bind(this.__checkbox, 'change', onChange, false);

    this.domElement.appendChild(this.__checkbox);

    // Match original value
    this.updateDisplay();

    function onChange() {
      _this.setValue(!_this.__prev);
    }

  };

  BooleanController.superclass = Controller;

  common.extend(

      BooleanController.prototype,
      Controller.prototype,

      {

        setValue: function(v) {
          var toReturn = BooleanController.superclass.prototype.setValue.call(this, v);
          if (this.__onFinishChange) {
            this.__onFinishChange.call(this, this.getValue());
          }
          this.__prev = this.getValue();
          return toReturn;
        },

        updateDisplay: function() {
          
          if (this.getValue() === true) {
            this.__checkbox.setAttribute('checked', 'checked');
            this.__checkbox.checked = true;    
          } else {
              this.__checkbox.checked = false;
          }

          return BooleanController.superclass.prototype.updateDisplay.call(this);

        }


      }

  );

  return BooleanController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common);


dat.color.toString = (function (common) {

  return function(color) {

    if (color.a == 1 || common.isUndefined(color.a)) {

      var s = color.hex.toString(16);
      while (s.length < 6) {
        s = '0' + s;
      }

      return '#' + s;

    } else {

      return 'rgba(' + Math.round(color.r) + ',' + Math.round(color.g) + ',' + Math.round(color.b) + ',' + color.a + ')';

    }

  }

})(dat.utils.common);


dat.color.interpret = (function (toString, common) {

  var result, toReturn;

  var interpret = function() {

    toReturn = false;

    var original = arguments.length > 1 ? common.toArray(arguments) : arguments[0];

    common.each(INTERPRETATIONS, function(family) {

      if (family.litmus(original)) {

        common.each(family.conversions, function(conversion, conversionName) {

          result = conversion.read(original);

          if (toReturn === false && result !== false) {
            toReturn = result;
            result.conversionName = conversionName;
            result.conversion = conversion;
            return common.BREAK;

          }

        });

        return common.BREAK;

      }

    });

    return toReturn;

  };

  var INTERPRETATIONS = [

    // Strings
    {

      litmus: common.isString,

      conversions: {

        THREE_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt(
                  '0x' +
                      test[1].toString() + test[1].toString() +
                      test[2].toString() + test[2].toString() +
                      test[3].toString() + test[3].toString())
            };

          },

          write: toString

        },

        SIX_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9]{6})$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt('0x' + test[1].toString())
            };

          },

          write: toString

        },

        CSS_RGB: {

          read: function(original) {

            var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3])
            };

          },

          write: toString

        },

        CSS_RGBA: {

          read: function(original) {

            var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3]),
              a: parseFloat(test[4])
            };

          },

          write: toString

        }

      }

    },

    // Numbers
    {

      litmus: common.isNumber,

      conversions: {

        HEX: {
          read: function(original) {
            return {
              space: 'HEX',
              hex: original,
              conversionName: 'HEX'
            }
          },

          write: function(color) {
            return color.hex;
          }
        }

      }

    },

    // Arrays
    {

      litmus: common.isArray,

      conversions: {

        RGB_ARRAY: {
          read: function(original) {
            if (original.length != 3) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b];
          }

        },

        RGBA_ARRAY: {
          read: function(original) {
            if (original.length != 4) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2],
              a: original[3]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b, color.a];
          }

        }

      }

    },

    // Objects
    {

      litmus: common.isObject,

      conversions: {

        RGBA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b) &&
                common.isNumber(original.a)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b,
              a: color.a
            }
          }
        },

        RGB_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b
            }
          }
        },

        HSVA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v) &&
                common.isNumber(original.a)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v,
              a: color.a
            }
          }
        },

        HSV_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v
            }
          }

        }

      }

    }


  ];

  return interpret;


})(dat.color.toString,
dat.utils.common);


dat.GUI = dat.gui.GUI = (function (css, saveDialogueContents, styleSheet, controllerFactory, Controller, BooleanController, FunctionController, NumberControllerBox, NumberControllerSlider, OptionController, ColorController, requestAnimationFrame, CenteredDiv, dom, common) {

  css.inject(styleSheet);

  /** Outer-most className for GUI's */
  var CSS_NAMESPACE = 'dg';

  var HIDE_KEY_CODE = 72;

  /** The only value shared between the JS and SCSS. Use caution. */
  var CLOSE_BUTTON_HEIGHT = 20;

  var DEFAULT_DEFAULT_PRESET_NAME = 'Default';

  var SUPPORTS_LOCAL_STORAGE = (function() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  })();

  var SAVE_DIALOGUE;

  /** Have we yet to create an autoPlace GUI? */
  var auto_place_virgin = true;

  /** Fixed position div that auto place GUI's go inside */
  var auto_place_container;

  /** Are we hiding the GUI's ? */
  var hide = false;

  /** GUI's which should be hidden */
  var hideable_guis = [];

  /**
   * A lightweight controller library for JavaScript. It allows you to easily
   * manipulate variables and fire functions on the fly.
   * @class
   *
   * @member dat.gui
   *
   * @param {Object} [params]
   * @param {String} [params.name] The name of this GUI.
   * @param {Object} [params.load] JSON object representing the saved state of
   * this GUI.
   * @param {Boolean} [params.auto=true]
   * @param {dat.gui.GUI} [params.parent] The GUI I'm nested in.
   * @param {Boolean} [params.closed] If true, starts closed
   */
  var GUI = function(params) {

    var _this = this;

    /**
     * Outermost DOM Element
     * @type DOMElement
     */
    this.domElement = document.createElement('div');
    this.__ul = document.createElement('ul');
    this.domElement.appendChild(this.__ul);

    dom.addClass(this.domElement, CSS_NAMESPACE);

    /**
     * Nested GUI's by name
     * @ignore
     */
    this.__folders = {};

    this.__controllers = [];

    /**
     * List of objects I'm remembering for save, only used in top level GUI
     * @ignore
     */
    this.__rememberedObjects = [];

    /**
     * Maps the index of remembered objects to a map of controllers, only used
     * in top level GUI.
     *
     * @private
     * @ignore
     *
     * @example
     * [
     *  {
     *    propertyName: Controller,
     *    anotherPropertyName: Controller
     *  },
     *  {
     *    propertyName: Controller
     *  }
     * ]
     */
    this.__rememberedObjectIndecesToControllers = [];

    this.__listening = [];

    params = params || {};

    // Default parameters
    params = common.defaults(params, {
      autoPlace: true,
      width: GUI.DEFAULT_WIDTH
    });

    params = common.defaults(params, {
      resizable: params.autoPlace,
      hideable: params.autoPlace
    });


    if (!common.isUndefined(params.load)) {

      // Explicit preset
      if (params.preset) params.load.preset = params.preset;

    } else {

      params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME };

    }

    if (common.isUndefined(params.parent) && params.hideable) {
      hideable_guis.push(this);
    }

    // Only root level GUI's are resizable.
    params.resizable = common.isUndefined(params.parent) && params.resizable;


    if (params.autoPlace && common.isUndefined(params.scrollable)) {
      params.scrollable = true;
    }
//    params.scrollable = common.isUndefined(params.parent) && params.scrollable === true;

    // Not part of params because I don't want people passing this in via
    // constructor. Should be a 'remembered' value.
    var use_local_storage =
        SUPPORTS_LOCAL_STORAGE &&
            localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';

    Object.defineProperties(this,

        /** @lends dat.gui.GUI.prototype */
        {

          /**
           * The parent <code>GUI</code>
           * @type dat.gui.GUI
           */
          parent: {
            get: function() {
              return params.parent;
            }
          },

          scrollable: {
            get: function() {
              return params.scrollable;
            }
          },

          /**
           * Handles <code>GUI</code>'s element placement for you
           * @type Boolean
           */
          autoPlace: {
            get: function() {
              return params.autoPlace;
            }
          },

          /**
           * The identifier for a set of saved values
           * @type String
           */
          preset: {

            get: function() {
              if (_this.parent) {
                return _this.getRoot().preset;
              } else {
                return params.load.preset;
              }
            },

            set: function(v) {
              if (_this.parent) {
                _this.getRoot().preset = v;
              } else {
                params.load.preset = v;
              }
              setPresetSelectIndex(this);
              _this.revert();
            }

          },

          /**
           * The width of <code>GUI</code> element
           * @type Number
           */
          width: {
            get: function() {
              return params.width;
            },
            set: function(v) {
              params.width = v;
              setWidth(_this, v);
            }
          },

          /**
           * The name of <code>GUI</code>. Used for folders. i.e
           * a folder's name
           * @type String
           */
          name: {
            get: function() {
              return params.name;
            },
            set: function(v) {
              // TODO Check for collisions among sibling folders
              params.name = v;
              if (title_row_name) {
                title_row_name.innerHTML = params.name;
              }
            }
          },

          /**
           * Whether the <code>GUI</code> is collapsed or not
           * @type Boolean
           */
          closed: {
            get: function() {
              return params.closed;
            },
            set: function(v) {
              params.closed = v;
              if (params.closed) {
                dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
              } else {
                dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
              }
              // For browsers that aren't going to respect the CSS transition,
              // Lets just check our height against the window height right off
              // the bat.
              this.onResize();

              if (_this.__closeButton) {
                _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
              }
            }
          },

          /**
           * Contains all presets
           * @type Object
           */
          load: {
            get: function() {
              return params.load;
            }
          },

          /**
           * Determines whether or not to use <a href="https://developer.mozilla.org/en/DOM/Storage#localStorage">localStorage</a> as the means for
           * <code>remember</code>ing
           * @type Boolean
           */
          useLocalStorage: {

            get: function() {
              return use_local_storage;
            },
            set: function(bool) {
              if (SUPPORTS_LOCAL_STORAGE) {
                use_local_storage = bool;
                if (bool) {
                  dom.bind(window, 'unload', saveToLocalStorage);
                } else {
                  dom.unbind(window, 'unload', saveToLocalStorage);
                }
                localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
              }
            }

          }

        });

    // Are we a root level GUI?
    if (common.isUndefined(params.parent)) {

      params.closed = false;

      dom.addClass(this.domElement, GUI.CLASS_MAIN);
      dom.makeSelectable(this.domElement, false);

      // Are we supposed to be loading locally?
      if (SUPPORTS_LOCAL_STORAGE) {

        if (use_local_storage) {

          _this.useLocalStorage = true;

          var saved_gui = localStorage.getItem(getLocalStorageHash(this, 'gui'));

          if (saved_gui) {
            params.load = JSON.parse(saved_gui);
          }

        }

      }

      this.__closeButton = document.createElement('div');
      this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);
      this.domElement.appendChild(this.__closeButton);

      dom.bind(this.__closeButton, 'click', function() {

        _this.closed = !_this.closed;


      });


      // Oh, you're a nested GUI!
    } else {

      if (params.closed === undefined) {
        params.closed = true;
      }

      var title_row_name = document.createTextNode(params.name);
      dom.addClass(title_row_name, 'controller-name');

      var title_row = addRow(_this, title_row_name);

      var on_click_title = function(e) {
        e.preventDefault();
        _this.closed = !_this.closed;
        return false;
      };

      dom.addClass(this.__ul, GUI.CLASS_CLOSED);

      dom.addClass(title_row, 'title');
      dom.bind(title_row, 'click', on_click_title);

      if (!params.closed) {
        this.closed = false;
      }

    }

    if (params.autoPlace) {

      if (common.isUndefined(params.parent)) {

        if (auto_place_virgin) {
          auto_place_container = document.createElement('div');
          dom.addClass(auto_place_container, CSS_NAMESPACE);
          dom.addClass(auto_place_container, GUI.CLASS_AUTO_PLACE_CONTAINER);
          document.body.appendChild(auto_place_container);
          auto_place_virgin = false;
        }

        // Put it in the dom for you.
        auto_place_container.appendChild(this.domElement);

        // Apply the auto styles
        dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);

      }


      // Make it not elastic.
      if (!this.parent) setWidth(_this, params.width);

    }

    dom.bind(window, 'resize', function() { _this.onResize(); });
    dom.bind(this.__ul, 'webkitTransitionEnd', function() { _this.onResize(); });
    dom.bind(this.__ul, 'transitionend', function() { _this.onResize(); });
    dom.bind(this.__ul, 'oTransitionEnd', function() { _this.onResize(); });
    this.onResize();


    if (params.resizable) {
      addResizeHandle(this);
    }

    function saveToLocalStorage() {
      localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
    }

    var root = _this.getRoot();
    function resetWidth() {
        var root = _this.getRoot();
        root.width += 1;
        common.defer(function() {
          root.width -= 1;
        });
      }

      if (!params.parent) {
        resetWidth();
      }

  };

  GUI.toggleHide = function() {

    hide = !hide;
    common.each(hideable_guis, function(gui) {
      gui.domElement.style.zIndex = hide ? -999 : 999;
      gui.domElement.style.opacity = hide ? 0 : 1;
    });
  };

  GUI.CLASS_AUTO_PLACE = 'a';
  GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
  GUI.CLASS_MAIN = 'main';
  GUI.CLASS_CONTROLLER_ROW = 'cr';
  GUI.CLASS_TOO_TALL = 'taller-than-window';
  GUI.CLASS_CLOSED = 'closed';
  GUI.CLASS_CLOSE_BUTTON = 'close-button';
  GUI.CLASS_DRAG = 'drag';

  GUI.DEFAULT_WIDTH = 245;
  GUI.TEXT_CLOSED = 'Close Controls';
  GUI.TEXT_OPEN = 'Open Controls';

  dom.bind(window, 'keydown', function(e) {

    if (document.activeElement.type !== 'text' &&
        (e.which === HIDE_KEY_CODE || e.keyCode == HIDE_KEY_CODE)) {
      GUI.toggleHide();
    }

  }, false);

  common.extend(

      GUI.prototype,

      /** @lends dat.gui.GUI */
      {

        /**
         * @param object
         * @param property
         * @returns {dat.controllers.Controller} The new controller that was added.
         * @instance
         */
        add: function(object, property) {

          return add(
              this,
              object,
              property,
              {
                factoryArgs: Array.prototype.slice.call(arguments, 2)
              }
          );

        },

        /**
         * @param object
         * @param property
         * @returns {dat.controllers.ColorController} The new controller that was added.
         * @instance
         */
        addColor: function(object, property) {

          return add(
              this,
              object,
              property,
              {
                color: true
              }
          );

        },

        /**
         * @param controller
         * @instance
         */
        remove: function(controller) {

          // TODO listening?
          this.__ul.removeChild(controller.__li);
          this.__controllers.slice(this.__controllers.indexOf(controller), 1);
          var _this = this;
          common.defer(function() {
            _this.onResize();
          });

        },

        destroy: function() {

          if (this.autoPlace) {
            auto_place_container.removeChild(this.domElement);
          }

        },

        /**
         * @param name
         * @returns {dat.gui.GUI} The new folder.
         * @throws {Error} if this GUI already has a folder by the specified
         * name
         * @instance
         */
        addFolder: function(name) {

          // We have to prevent collisions on names in order to have a key
          // by which to remember saved values
          if (this.__folders[name] !== undefined) {
            throw new Error('You already have a folder in this GUI by the' +
                ' name "' + name + '"');
          }

          var new_gui_params = { name: name, parent: this };

          // We need to pass down the autoPlace trait so that we can
          // attach event listeners to open/close folder actions to
          // ensure that a scrollbar appears if the window is too short.
          new_gui_params.autoPlace = this.autoPlace;

          // Do we have saved appearance data for this folder?

          if (this.load && // Anything loaded?
              this.load.folders && // Was my parent a dead-end?
              this.load.folders[name]) { // Did daddy remember me?

            // Start me closed if I was closed
            new_gui_params.closed = this.load.folders[name].closed;

            // Pass down the loaded data
            new_gui_params.load = this.load.folders[name];

          }

          var gui = new GUI(new_gui_params);
          this.__folders[name] = gui;

          var li = addRow(this, gui.domElement);
          dom.addClass(li, 'folder');
          return gui;

        },

        open: function() {
          this.closed = false;
        },

        close: function() {
          this.closed = true;
        },

        onResize: function() {

          var root = this.getRoot();

          if (root.scrollable) {

            var top = dom.getOffset(root.__ul).top;
            var h = 0;

            common.each(root.__ul.childNodes, function(node) {
              if (! (root.autoPlace && node === root.__save_row))
                h += dom.getHeight(node);
            });

            if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
              dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
              root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
            } else {
              dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
              root.__ul.style.height = 'auto';
            }

          }

          if (root.__resize_handle) {
            common.defer(function() {
              root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
            });
          }

          if (root.__closeButton) {
            root.__closeButton.style.width = root.width + 'px';
          }

        },

        /**
         * Mark objects for saving. The order of these objects cannot change as
         * the GUI grows. When remembering new objects, append them to the end
         * of the list.
         *
         * @param {Object...} objects
         * @throws {Error} if not called on a top level GUI.
         * @instance
         */
        remember: function() {

          if (common.isUndefined(SAVE_DIALOGUE)) {
            SAVE_DIALOGUE = new CenteredDiv();
            SAVE_DIALOGUE.domElement.innerHTML = saveDialogueContents;
          }

          if (this.parent) {
            throw new Error("You can only call remember on a top level GUI.");
          }

          var _this = this;

          common.each(Array.prototype.slice.call(arguments), function(object) {
            if (_this.__rememberedObjects.length == 0) {
              addSaveMenu(_this);
            }
            if (_this.__rememberedObjects.indexOf(object) == -1) {
              _this.__rememberedObjects.push(object);
            }
          });

          if (this.autoPlace) {
            // Set save row width
            setWidth(this, this.width);
          }

        },

        /**
         * @returns {dat.gui.GUI} the topmost parent GUI of a nested GUI.
         * @instance
         */
        getRoot: function() {
          var gui = this;
          while (gui.parent) {
            gui = gui.parent;
          }
          return gui;
        },

        /**
         * @returns {Object} a JSON object representing the current state of
         * this GUI as well as its remembered properties.
         * @instance
         */
        getSaveObject: function() {

          var toReturn = this.load;

          toReturn.closed = this.closed;

          // Am I remembering any values?
          if (this.__rememberedObjects.length > 0) {

            toReturn.preset = this.preset;

            if (!toReturn.remembered) {
              toReturn.remembered = {};
            }

            toReturn.remembered[this.preset] = getCurrentPreset(this);

          }

          toReturn.folders = {};
          common.each(this.__folders, function(element, key) {
            toReturn.folders[key] = element.getSaveObject();
          });

          return toReturn;

        },

        save: function() {

          if (!this.load.remembered) {
            this.load.remembered = {};
          }

          this.load.remembered[this.preset] = getCurrentPreset(this);
          markPresetModified(this, false);

        },

        saveAs: function(presetName) {

          if (!this.load.remembered) {

            // Retain default values upon first save
            this.load.remembered = {};
            this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);

          }

          this.load.remembered[presetName] = getCurrentPreset(this);
          this.preset = presetName;
          addPresetOption(this, presetName, true);

        },

        revert: function(gui) {

          common.each(this.__controllers, function(controller) {
            // Make revert work on Default.
            if (!this.getRoot().load.remembered) {
              controller.setValue(controller.initialValue);
            } else {
              recallSavedValue(gui || this.getRoot(), controller);
            }
          }, this);

          common.each(this.__folders, function(folder) {
            folder.revert(folder);
          });

          if (!gui) {
            markPresetModified(this.getRoot(), false);
          }


        },

        listen: function(controller) {

          var init = this.__listening.length == 0;
          this.__listening.push(controller);
          if (init) updateDisplays(this.__listening);

        }

      }

  );

  function add(gui, object, property, params) {

    if (object[property] === undefined) {
      throw new Error("Object " + object + " has no property \"" + property + "\"");
    }

    var controller;

    if (params.color) {

      controller = new ColorController(object, property);

    } else {

      var factoryArgs = [object,property].concat(params.factoryArgs);
      controller = controllerFactory.apply(gui, factoryArgs);

    }

    if (params.before instanceof Controller) {
      params.before = params.before.__li;
    }

    recallSavedValue(gui, controller);

    dom.addClass(controller.domElement, 'c');

    var name = document.createElement('span');
    dom.addClass(name, 'property-name');
    name.innerHTML = controller.property;

    var container = document.createElement('div');
    container.appendChild(name);
    container.appendChild(controller.domElement);

    var li = addRow(gui, container, params.before);

    dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);
    dom.addClass(li, typeof controller.getValue());

    augmentController(gui, li, controller);

    gui.__controllers.push(controller);

    return controller;

  }

  /**
   * Add a row to the end of the GUI or before another row.
   *
   * @param gui
   * @param [dom] If specified, inserts the dom content in the new row
   * @param [liBefore] If specified, places the new row before another row
   */
  function addRow(gui, dom, liBefore) {
    var li = document.createElement('li');
    if (dom) li.appendChild(dom);
    if (liBefore) {
      gui.__ul.insertBefore(li, params.before);
    } else {
      gui.__ul.appendChild(li);
    }
    gui.onResize();
    return li;
  }

  function augmentController(gui, li, controller) {

    controller.__li = li;
    controller.__gui = gui;

    common.extend(controller, {

      options: function(options) {

        if (arguments.length > 1) {
          controller.remove();

          return add(
              gui,
              controller.object,
              controller.property,
              {
                before: controller.__li.nextElementSibling,
                factoryArgs: [common.toArray(arguments)]
              }
          );

        }

        if (common.isArray(options) || common.isObject(options)) {
          controller.remove();

          return add(
              gui,
              controller.object,
              controller.property,
              {
                before: controller.__li.nextElementSibling,
                factoryArgs: [options]
              }
          );

        }

      },

      name: function(v) {
        controller.__li.firstElementChild.firstElementChild.innerHTML = v;
        return controller;
      },

      listen: function() {
        controller.__gui.listen(controller);
        return controller;
      },

      remove: function() {
        controller.__gui.remove(controller);
        return controller;
      }

    });

    // All sliders should be accompanied by a box.
    if (controller instanceof NumberControllerSlider) {

      var box = new NumberControllerBox(controller.object, controller.property,
          { min: controller.__min, max: controller.__max, step: controller.__step });

      common.each(['updateDisplay', 'onChange', 'onFinishChange'], function(method) {
        var pc = controller[method];
        var pb = box[method];
        controller[method] = box[method] = function() {
          var args = Array.prototype.slice.call(arguments);
          pc.apply(controller, args);
          return pb.apply(box, args);
        };
      });

      dom.addClass(li, 'has-slider');
      controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);

    }
    else if (controller instanceof NumberControllerBox) {

      var r = function(returned) {

        // Have we defined both boundaries?
        if (common.isNumber(controller.__min) && common.isNumber(controller.__max)) {

          // Well, then lets just replace this with a slider.
          controller.remove();
          return add(
              gui,
              controller.object,
              controller.property,
              {
                before: controller.__li.nextElementSibling,
                factoryArgs: [controller.__min, controller.__max, controller.__step]
              });

        }

        return returned;

      };

      controller.min = common.compose(r, controller.min);
      controller.max = common.compose(r, controller.max);

    }
    else if (controller instanceof BooleanController) {

      dom.bind(li, 'click', function() {
        dom.fakeEvent(controller.__checkbox, 'click');
      });

      dom.bind(controller.__checkbox, 'click', function(e) {
        e.stopPropagation(); // Prevents double-toggle
      });

    }
    else if (controller instanceof FunctionController) {

      dom.bind(li, 'click', function() {
        dom.fakeEvent(controller.__button, 'click');
      });

      dom.bind(li, 'mouseover', function() {
        dom.addClass(controller.__button, 'hover');
      });

      dom.bind(li, 'mouseout', function() {
        dom.removeClass(controller.__button, 'hover');
      });

    }
    else if (controller instanceof ColorController) {

      dom.addClass(li, 'color');
      controller.updateDisplay = common.compose(function(r) {
        li.style.borderLeftColor = controller.__color.toString();
        return r;
      }, controller.updateDisplay);

      controller.updateDisplay();

    }

    controller.setValue = common.compose(function(r) {
      if (gui.getRoot().__preset_select && controller.isModified()) {
        markPresetModified(gui.getRoot(), true);
      }
      return r;
    }, controller.setValue);

  }

  function recallSavedValue(gui, controller) {

    // Find the topmost GUI, that's where remembered objects live.
    var root = gui.getRoot();

    // Does the object we're controlling match anything we've been told to
    // remember?
    var matched_index = root.__rememberedObjects.indexOf(controller.object);

    // Why yes, it does!
    if (matched_index != -1) {

      // Let me fetch a map of controllers for thcommon.isObject.
      var controller_map =
          root.__rememberedObjectIndecesToControllers[matched_index];

      // Ohp, I believe this is the first controller we've created for this
      // object. Lets make the map fresh.
      if (controller_map === undefined) {
        controller_map = {};
        root.__rememberedObjectIndecesToControllers[matched_index] =
            controller_map;
      }

      // Keep track of this controller
      controller_map[controller.property] = controller;

      // Okay, now have we saved any values for this controller?
      if (root.load && root.load.remembered) {

        var preset_map = root.load.remembered;

        // Which preset are we trying to load?
        var preset;

        if (preset_map[gui.preset]) {

          preset = preset_map[gui.preset];

        } else if (preset_map[DEFAULT_DEFAULT_PRESET_NAME]) {

          // Uhh, you can have the default instead?
          preset = preset_map[DEFAULT_DEFAULT_PRESET_NAME];

        } else {

          // Nada.

          return;

        }


        // Did the loaded object remember thcommon.isObject?
        if (preset[matched_index] &&

          // Did we remember this particular property?
            preset[matched_index][controller.property] !== undefined) {

          // We did remember something for this guy ...
          var value = preset[matched_index][controller.property];

          // And that's what it is.
          controller.initialValue = value;
          controller.setValue(value);

        }

      }

    }

  }

  function getLocalStorageHash(gui, key) {
    // TODO how does this deal with multiple GUI's?
    return document.location.href + '.' + key;

  }

  function addSaveMenu(gui) {

    var div = gui.__save_row = document.createElement('li');

    dom.addClass(gui.domElement, 'has-save');

    gui.__ul.insertBefore(div, gui.__ul.firstChild);

    dom.addClass(div, 'save-row');

    var gears = document.createElement('span');
    gears.innerHTML = '&nbsp;';
    dom.addClass(gears, 'button gears');

    // TODO replace with FunctionController
    var button = document.createElement('span');
    button.innerHTML = 'Save';
    dom.addClass(button, 'button');
    dom.addClass(button, 'save');

    var button2 = document.createElement('span');
    button2.innerHTML = 'New';
    dom.addClass(button2, 'button');
    dom.addClass(button2, 'save-as');

    var button3 = document.createElement('span');
    button3.innerHTML = 'Revert';
    dom.addClass(button3, 'button');
    dom.addClass(button3, 'revert');

    var select = gui.__preset_select = document.createElement('select');

    if (gui.load && gui.load.remembered) {

      common.each(gui.load.remembered, function(value, key) {
        addPresetOption(gui, key, key == gui.preset);
      });

    } else {
      addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
    }

    dom.bind(select, 'change', function() {


      for (var index = 0; index < gui.__preset_select.length; index++) {
        gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
      }

      gui.preset = this.value;

    });

    div.appendChild(select);
    div.appendChild(gears);
    div.appendChild(button);
    div.appendChild(button2);
    div.appendChild(button3);

    if (SUPPORTS_LOCAL_STORAGE) {

      var saveLocally = document.getElementById('dg-save-locally');
      var explain = document.getElementById('dg-local-explain');

      saveLocally.style.display = 'block';

      var localStorageCheckBox = document.getElementById('dg-local-storage');

      if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
        localStorageCheckBox.setAttribute('checked', 'checked');
      }

      function showHideExplain() {
        explain.style.display = gui.useLocalStorage ? 'block' : 'none';
      }

      showHideExplain();

      // TODO: Use a boolean controller, fool!
      dom.bind(localStorageCheckBox, 'change', function() {
        gui.useLocalStorage = !gui.useLocalStorage;
        showHideExplain();
      });

    }

    var newConstructorTextArea = document.getElementById('dg-new-constructor');

    dom.bind(newConstructorTextArea, 'keydown', function(e) {
      if (e.metaKey && (e.which === 67 || e.keyCode == 67)) {
        SAVE_DIALOGUE.hide();
      }
    });

    dom.bind(gears, 'click', function() {
      newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
      SAVE_DIALOGUE.show();
      newConstructorTextArea.focus();
      newConstructorTextArea.select();
    });

    dom.bind(button, 'click', function() {
      gui.save();
    });

    dom.bind(button2, 'click', function() {
      var presetName = prompt('Enter a new preset name.');
      if (presetName) gui.saveAs(presetName);
    });

    dom.bind(button3, 'click', function() {
      gui.revert();
    });

//    div.appendChild(button2);

  }

  function addResizeHandle(gui) {

    gui.__resize_handle = document.createElement('div');

    common.extend(gui.__resize_handle.style, {

      width: '6px',
      marginLeft: '-3px',
      height: '200px',
      cursor: 'ew-resize',
      position: 'absolute'
//      border: '1px solid blue'

    });

    var pmouseX;

    dom.bind(gui.__resize_handle, 'mousedown', dragStart);
    dom.bind(gui.__closeButton, 'mousedown', dragStart);

    gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);

    function dragStart(e) {

      e.preventDefault();

      pmouseX = e.clientX;

      dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
      dom.bind(window, 'mousemove', drag);
      dom.bind(window, 'mouseup', dragStop);

      return false;

    }

    function drag(e) {

      e.preventDefault();

      gui.width += pmouseX - e.clientX;
      gui.onResize();
      pmouseX = e.clientX;

      return false;

    }

    function dragStop() {

      dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
      dom.unbind(window, 'mousemove', drag);
      dom.unbind(window, 'mouseup', dragStop);

    }

  }

  function setWidth(gui, w) {
    gui.domElement.style.width = w + 'px';
    // Auto placed save-rows are position fixed, so we have to
    // set the width manually if we want it to bleed to the edge
    if (gui.__save_row && gui.autoPlace) {
      gui.__save_row.style.width = w + 'px';
    }if (gui.__closeButton) {
      gui.__closeButton.style.width = w + 'px';
    }
  }

  function getCurrentPreset(gui, useInitialValues) {

    var toReturn = {};

    // For each object I'm remembering
    common.each(gui.__rememberedObjects, function(val, index) {

      var saved_values = {};

      // The controllers I've made for thcommon.isObject by property
      var controller_map =
          gui.__rememberedObjectIndecesToControllers[index];

      // Remember each value for each property
      common.each(controller_map, function(controller, property) {
        saved_values[property] = useInitialValues ? controller.initialValue : controller.getValue();
      });

      // Save the values for thcommon.isObject
      toReturn[index] = saved_values;

    });

    return toReturn;

  }

  function addPresetOption(gui, name, setSelected) {
    var opt = document.createElement('option');
    opt.innerHTML = name;
    opt.value = name;
    gui.__preset_select.appendChild(opt);
    if (setSelected) {
      gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
    }
  }

  function setPresetSelectIndex(gui) {
    for (var index = 0; index < gui.__preset_select.length; index++) {
      if (gui.__preset_select[index].value == gui.preset) {
        gui.__preset_select.selectedIndex = index;
      }
    }
  }

  function markPresetModified(gui, modified) {
    var opt = gui.__preset_select[gui.__preset_select.selectedIndex];
//    console.log('mark', modified, opt);
    if (modified) {
      opt.innerHTML = opt.value + "*";
    } else {
      opt.innerHTML = opt.value;
    }
  }

  function updateDisplays(controllerArray) {


    if (controllerArray.length != 0) {

      requestAnimationFrame(function() {
        updateDisplays(controllerArray);
      });

    }

    common.each(controllerArray, function(c) {
      c.updateDisplay();
    });

  }

  return GUI;

})(dat.utils.css,
"<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>",
".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save ul{margin-top:27px}.dg.a.has-save ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height 0.1s ease-out;-o-transition:height 0.1s ease-out;-moz-transition:height 0.1s ease-out;transition:height 0.1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li > *{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n",
dat.controllers.factory = (function (OptionController, NumberControllerBox, NumberControllerSlider, StringController, FunctionController, BooleanController, common) {

      return function(object, property) {

        var initialValue = object[property];

        // Providing options?
        if (common.isArray(arguments[2]) || common.isObject(arguments[2])) {
          return new OptionController(object, property, arguments[2]);
        }

        // Providing a map?

        if (common.isNumber(initialValue)) {

          if (common.isNumber(arguments[2]) && common.isNumber(arguments[3])) {

            // Has min and max.
            return new NumberControllerSlider(object, property, arguments[2], arguments[3]);

          } else {

            return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3] });

          }

        }

        if (common.isString(initialValue)) {
          return new StringController(object, property);
        }

        if (common.isFunction(initialValue)) {
          return new FunctionController(object, property, '');
        }

        if (common.isBoolean(initialValue)) {
          return new BooleanController(object, property);
        }

      }

    })(dat.controllers.OptionController,
dat.controllers.NumberControllerBox,
dat.controllers.NumberControllerSlider,
dat.controllers.StringController = (function (Controller, dom, common) {

  /**
   * @class Provides a text input to alter the string property of an object.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var StringController = function(object, property) {

    StringController.superclass.call(this, object, property);

    var _this = this;

    this.__input = document.createElement('input');
    this.__input.setAttribute('type', 'text');

    dom.bind(this.__input, 'keyup', onChange);
    dom.bind(this.__input, 'change', onChange);
    dom.bind(this.__input, 'blur', onBlur);
    dom.bind(this.__input, 'keydown', function(e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });
    

    function onChange() {
      _this.setValue(_this.__input.value);
    }

    function onBlur() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    this.updateDisplay();

    this.domElement.appendChild(this.__input);

  };

  StringController.superclass = Controller;

  common.extend(

      StringController.prototype,
      Controller.prototype,

      {

        updateDisplay: function() {
          // Stops the caret from moving on account of:
          // keyup -> setValue -> updateDisplay
          if (!dom.isActive(this.__input)) {
            this.__input.value = this.getValue();
          }
          return StringController.superclass.prototype.updateDisplay.call(this);
        }

      }

  );

  return StringController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.utils.common),
dat.controllers.FunctionController,
dat.controllers.BooleanController,
dat.utils.common),
dat.controllers.Controller,
dat.controllers.BooleanController,
dat.controllers.FunctionController,
dat.controllers.NumberControllerBox,
dat.controllers.NumberControllerSlider,
dat.controllers.OptionController,
dat.controllers.ColorController = (function (Controller, dom, Color, interpret, common) {

  var ColorController = function(object, property) {

    ColorController.superclass.call(this, object, property);

    this.__color = new Color(this.getValue());
    this.__temp = new Color(0);

    var _this = this;

    this.domElement = document.createElement('div');

    dom.makeSelectable(this.domElement, false);

    this.__selector = document.createElement('div');
    this.__selector.className = 'selector';

    this.__saturation_field = document.createElement('div');
    this.__saturation_field.className = 'saturation-field';

    this.__field_knob = document.createElement('div');
    this.__field_knob.className = 'field-knob';
    this.__field_knob_border = '2px solid ';

    this.__hue_knob = document.createElement('div');
    this.__hue_knob.className = 'hue-knob';

    this.__hue_field = document.createElement('div');
    this.__hue_field.className = 'hue-field';

    this.__input = document.createElement('input');
    this.__input.type = 'text';
    this.__input_textShadow = '0 1px 1px ';

    dom.bind(this.__input, 'keydown', function(e) {
      if (e.keyCode === 13) { // on enter
        onBlur.call(this);
      }
    });

    dom.bind(this.__input, 'blur', onBlur);

    dom.bind(this.__selector, 'mousedown', function(e) {

      dom
        .addClass(this, 'drag')
        .bind(window, 'mouseup', function(e) {
          dom.removeClass(_this.__selector, 'drag');
        });

    });

    var value_field = document.createElement('div');

    common.extend(this.__selector.style, {
      width: '122px',
      height: '102px',
      padding: '3px',
      backgroundColor: '#222',
      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
    });

    common.extend(this.__field_knob.style, {
      position: 'absolute',
      width: '12px',
      height: '12px',
      border: this.__field_knob_border + (this.__color.v < .5 ? '#fff' : '#000'),
      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
      borderRadius: '12px',
      zIndex: 1
    });
    
    common.extend(this.__hue_knob.style, {
      position: 'absolute',
      width: '15px',
      height: '2px',
      borderRight: '4px solid #fff',
      zIndex: 1
    });

    common.extend(this.__saturation_field.style, {
      width: '100px',
      height: '100px',
      border: '1px solid #555',
      marginRight: '3px',
      display: 'inline-block',
      cursor: 'pointer'
    });

    common.extend(value_field.style, {
      width: '100%',
      height: '100%',
      background: 'none'
    });
    
    linearGradient(value_field, 'top', 'rgba(0,0,0,0)', '#000');

    common.extend(this.__hue_field.style, {
      width: '15px',
      height: '100px',
      display: 'inline-block',
      border: '1px solid #555',
      cursor: 'ns-resize'
    });

    hueGradient(this.__hue_field);

    common.extend(this.__input.style, {
      outline: 'none',
//      width: '120px',
      textAlign: 'center',
//      padding: '4px',
//      marginBottom: '6px',
      color: '#fff',
      border: 0,
      fontWeight: 'bold',
      textShadow: this.__input_textShadow + 'rgba(0,0,0,0.7)'
    });

    dom.bind(this.__saturation_field, 'mousedown', fieldDown);
    dom.bind(this.__field_knob, 'mousedown', fieldDown);

    dom.bind(this.__hue_field, 'mousedown', function(e) {
      setH(e);
      dom.bind(window, 'mousemove', setH);
      dom.bind(window, 'mouseup', unbindH);
    });

    function fieldDown(e) {
      setSV(e);
      // document.body.style.cursor = 'none';
      dom.bind(window, 'mousemove', setSV);
      dom.bind(window, 'mouseup', unbindSV);
    }

    function unbindSV() {
      dom.unbind(window, 'mousemove', setSV);
      dom.unbind(window, 'mouseup', unbindSV);
      // document.body.style.cursor = 'default';
    }

    function onBlur() {
      var i = interpret(this.value);
      if (i !== false) {
        _this.__color.__state = i;
        _this.setValue(_this.__color.toOriginal());
      } else {
        this.value = _this.__color.toString();
      }
    }

    function unbindH() {
      dom.unbind(window, 'mousemove', setH);
      dom.unbind(window, 'mouseup', unbindH);
    }

    this.__saturation_field.appendChild(value_field);
    this.__selector.appendChild(this.__field_knob);
    this.__selector.appendChild(this.__saturation_field);
    this.__selector.appendChild(this.__hue_field);
    this.__hue_field.appendChild(this.__hue_knob);

    this.domElement.appendChild(this.__input);
    this.domElement.appendChild(this.__selector);

    this.updateDisplay();

    function setSV(e) {

      e.preventDefault();

      var w = dom.getWidth(_this.__saturation_field);
      var o = dom.getOffset(_this.__saturation_field);
      var s = (e.clientX - o.left + document.body.scrollLeft) / w;
      var v = 1 - (e.clientY - o.top + document.body.scrollTop) / w;

      if (v > 1) v = 1;
      else if (v < 0) v = 0;

      if (s > 1) s = 1;
      else if (s < 0) s = 0;

      _this.__color.v = v;
      _this.__color.s = s;

      _this.setValue(_this.__color.toOriginal());


      return false;

    }

    function setH(e) {

      e.preventDefault();

      var s = dom.getHeight(_this.__hue_field);
      var o = dom.getOffset(_this.__hue_field);
      var h = 1 - (e.clientY - o.top + document.body.scrollTop) / s;

      if (h > 1) h = 1;
      else if (h < 0) h = 0;

      _this.__color.h = h * 360;

      _this.setValue(_this.__color.toOriginal());

      return false;

    }

  };

  ColorController.superclass = Controller;

  common.extend(

      ColorController.prototype,
      Controller.prototype,

      {

        updateDisplay: function() {

          var i = interpret(this.getValue());

          if (i !== false) {

            var mismatch = false;

            // Check for mismatch on the interpreted value.

            common.each(Color.COMPONENTS, function(component) {
              if (!common.isUndefined(i[component]) &&
                  !common.isUndefined(this.__color.__state[component]) &&
                  i[component] !== this.__color.__state[component]) {
                mismatch = true;
                return {}; // break
              }
            }, this);

            // If nothing diverges, we keep our previous values
            // for statefulness, otherwise we recalculate fresh
            if (mismatch) {
              common.extend(this.__color.__state, i);
            }

          }

          common.extend(this.__temp.__state, this.__color.__state);

          this.__temp.a = 1;

          var flip = (this.__color.v < .5 || this.__color.s > .5) ? 255 : 0;
          var _flip = 255 - flip;

          common.extend(this.__field_knob.style, {
            marginLeft: 100 * this.__color.s - 7 + 'px',
            marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
            backgroundColor: this.__temp.toString(),
            border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip +')'
          });

          this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px';

          this.__temp.s = 1;
          this.__temp.v = 1;

          linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toString());

          common.extend(this.__input.style, {
            backgroundColor: this.__input.value = this.__color.toString(),
            color: 'rgb(' + flip + ',' + flip + ',' + flip +')',
            textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip +',.7)'
          });

        }

      }

  );
  
  var vendors = ['-moz-','-o-','-webkit-','-ms-',''];
  
  function linearGradient(elem, x, a, b) {
    elem.style.background = '';
    common.each(vendors, function(vendor) {
      elem.style.cssText += 'background: ' + vendor + 'linear-gradient('+x+', '+a+' 0%, ' + b + ' 100%); ';
    });
  }
  
  function hueGradient(elem) {
    elem.style.background = '';
    elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);';
    elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
    elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
    elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
    elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  }


  return ColorController;

})(dat.controllers.Controller,
dat.dom.dom,
dat.color.Color = (function (interpret, math, toString, common) {

  var Color = function() {

    this.__state = interpret.apply(this, arguments);

    if (this.__state === false) {
      throw 'Failed to interpret color arguments';
    }

    this.__state.a = this.__state.a || 1;


  };

  Color.COMPONENTS = ['r','g','b','h','s','v','hex','a'];

  common.extend(Color.prototype, {

    toString: function() {
      return toString(this);
    },

    toOriginal: function() {
      return this.__state.conversion.write(this);
    }

  });

  defineRGBComponent(Color.prototype, 'r', 2);
  defineRGBComponent(Color.prototype, 'g', 1);
  defineRGBComponent(Color.prototype, 'b', 0);

  defineHSVComponent(Color.prototype, 'h');
  defineHSVComponent(Color.prototype, 's');
  defineHSVComponent(Color.prototype, 'v');

  Object.defineProperty(Color.prototype, 'a', {

    get: function() {
      return this.__state.a;
    },

    set: function(v) {
      this.__state.a = v;
    }

  });

  Object.defineProperty(Color.prototype, 'hex', {

    get: function() {

      if (!this.__state.space !== 'HEX') {
        this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b);
      }

      return this.__state.hex;

    },

    set: function(v) {

      this.__state.space = 'HEX';
      this.__state.hex = v;

    }

  });

  function defineRGBComponent(target, component, componentHexIndex) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'RGB') {
          return this.__state[component];
        }

        recalculateRGB(this, component, componentHexIndex);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'RGB') {
          recalculateRGB(this, component, componentHexIndex);
          this.__state.space = 'RGB';
        }

        this.__state[component] = v;

      }

    });

  }

  function defineHSVComponent(target, component) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'HSV')
          return this.__state[component];

        recalculateHSV(this);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'HSV') {
          recalculateHSV(this);
          this.__state.space = 'HSV';
        }

        this.__state[component] = v;

      }

    });

  }

  function recalculateRGB(color, component, componentHexIndex) {

    if (color.__state.space === 'HEX') {

      color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex);

    } else if (color.__state.space === 'HSV') {

      common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));

    } else {

      throw 'Corrupted color state';

    }

  }

  function recalculateHSV(color) {

    var result = math.rgb_to_hsv(color.r, color.g, color.b);

    common.extend(color.__state,
        {
          s: result.s,
          v: result.v
        }
    );

    if (!common.isNaN(result.h)) {
      color.__state.h = result.h;
    } else if (common.isUndefined(color.__state.h)) {
      color.__state.h = 0;
    }

  }

  return Color;

})(dat.color.interpret,
dat.color.math = (function () {

  var tmpComponent;

  return {

    hsv_to_rgb: function(h, s, v) {

      var hi = Math.floor(h / 60) % 6;

      var f = h / 60 - Math.floor(h / 60);
      var p = v * (1.0 - s);
      var q = v * (1.0 - (f * s));
      var t = v * (1.0 - ((1.0 - f) * s));
      var c = [
        [v, t, p],
        [q, v, p],
        [p, v, t],
        [p, q, v],
        [t, p, v],
        [v, p, q]
      ][hi];

      return {
        r: c[0] * 255,
        g: c[1] * 255,
        b: c[2] * 255
      };

    },

    rgb_to_hsv: function(r, g, b) {

      var min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          delta = max - min,
          h, s;

      if (max != 0) {
        s = delta / max;
      } else {
        return {
          h: NaN,
          s: 0,
          v: 0
        };
      }

      if (r == max) {
        h = (g - b) / delta;
      } else if (g == max) {
        h = 2 + (b - r) / delta;
      } else {
        h = 4 + (r - g) / delta;
      }
      h /= 6;
      if (h < 0) {
        h += 1;
      }

      return {
        h: h * 360,
        s: s,
        v: max / 255
      };
    },

    rgb_to_hex: function(r, g, b) {
      var hex = this.hex_with_component(0, 2, r);
      hex = this.hex_with_component(hex, 1, g);
      hex = this.hex_with_component(hex, 0, b);
      return hex;
    },

    component_from_hex: function(hex, componentIndex) {
      return (hex >> (componentIndex * 8)) & 0xFF;
    },

    hex_with_component: function(hex, componentIndex, value) {
      return value << (tmpComponent = componentIndex * 8) | (hex & ~ (0xFF << tmpComponent));
    }

  }

})(),
dat.color.toString,
dat.utils.common),
dat.color.interpret,
dat.utils.common),
dat.utils.requestAnimationFrame = (function () {

  /**
   * requirejs version of Paul Irish's RequestAnimationFrame
   * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
   */

  return window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback, element) {

        window.setTimeout(callback, 1000 / 60);

      };
})(),
dat.dom.CenteredDiv = (function (dom, common) {


  var CenteredDiv = function() {

    this.backgroundElement = document.createElement('div');
    common.extend(this.backgroundElement.style, {
      backgroundColor: 'rgba(0,0,0,0.8)',
      top: 0,
      left: 0,
      display: 'none',
      zIndex: '1000',
      opacity: 0,
      WebkitTransition: 'opacity 0.2s linear'
    });

    dom.makeFullscreen(this.backgroundElement);
    this.backgroundElement.style.position = 'fixed';

    this.domElement = document.createElement('div');
    common.extend(this.domElement.style, {
      position: 'fixed',
      display: 'none',
      zIndex: '1001',
      opacity: 0,
      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear'
    });


    document.body.appendChild(this.backgroundElement);
    document.body.appendChild(this.domElement);

    var _this = this;
    dom.bind(this.backgroundElement, 'click', function() {
      _this.hide();
    });


  };

  CenteredDiv.prototype.show = function() {

    var _this = this;
    


    this.backgroundElement.style.display = 'block';

    this.domElement.style.display = 'block';
    this.domElement.style.opacity = 0;
//    this.domElement.style.top = '52%';
    this.domElement.style.webkitTransform = 'scale(1.1)';

    this.layout();

    common.defer(function() {
      _this.backgroundElement.style.opacity = 1;
      _this.domElement.style.opacity = 1;
      _this.domElement.style.webkitTransform = 'scale(1)';
    });

  };

  CenteredDiv.prototype.hide = function() {

    var _this = this;

    var hide = function() {

      _this.domElement.style.display = 'none';
      _this.backgroundElement.style.display = 'none';

      dom.unbind(_this.domElement, 'webkitTransitionEnd', hide);
      dom.unbind(_this.domElement, 'transitionend', hide);
      dom.unbind(_this.domElement, 'oTransitionEnd', hide);

    };

    dom.bind(this.domElement, 'webkitTransitionEnd', hide);
    dom.bind(this.domElement, 'transitionend', hide);
    dom.bind(this.domElement, 'oTransitionEnd', hide);

    this.backgroundElement.style.opacity = 0;
//    this.domElement.style.top = '48%';
    this.domElement.style.opacity = 0;
    this.domElement.style.webkitTransform = 'scale(1.1)';

  };

  CenteredDiv.prototype.layout = function() {
    this.domElement.style.left = window.innerWidth/2 - dom.getWidth(this.domElement) / 2 + 'px';
    this.domElement.style.top = window.innerHeight/2 - dom.getHeight(this.domElement) / 2 + 'px';
  };
  
  return CenteredDiv;

})(dat.dom.dom,
dat.utils.common),
dat.dom.dom,
dat.utils.common);
});

var dat_color = createCommonjsModule(function (module) {
/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/** @namespace */
var dat = module.exports = dat || {};

/** @namespace */
dat.color = dat.color || {};

/** @namespace */
dat.utils = dat.utils || {};

dat.utils.common = (function () {
  
  var ARR_EACH = Array.prototype.forEach;
  var ARR_SLICE = Array.prototype.slice;

  /**
   * Band-aid methods for things that should be a lot easier in JavaScript.
   * Implementation and structure inspired by underscore.js
   * http://documentcloud.github.com/underscore/
   */

  return { 
    
    BREAK: {},
  
    extend: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (!this.isUndefined(obj[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
      
    },
    
    defaults: function(target) {
      
      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
        
        for (var key in obj)
          if (this.isUndefined(target[key])) 
            target[key] = obj[key];
        
      }, this);
      
      return target;
    
    },
    
    compose: function() {
      var toCall = ARR_SLICE.call(arguments);
            return function() {
              var args = ARR_SLICE.call(arguments);
              for (var i = toCall.length -1; i >= 0; i--) {
                args = [toCall[i].apply(this, args)];
              }
              return args[0];
            }
    },
    
    each: function(obj, itr, scope) {

      
      if (ARR_EACH && obj.forEach === ARR_EACH) { 
        
        obj.forEach(itr, scope);
        
      } else if (obj.length === obj.length + 0) { // Is number but not NaN
        
        for (var key = 0, l = obj.length; key < l; key++)
          if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) 
            return;
            
      } else {

        for (var key in obj) 
          if (itr.call(scope, obj[key], key) === this.BREAK)
            return;
            
      }
            
    },
    
    defer: function(fnc) {
      setTimeout(fnc, 0);
    },
    
    toArray: function(obj) {
      if (obj.toArray) return obj.toArray();
      return ARR_SLICE.call(obj);
    },

    isUndefined: function(obj) {
      return obj === undefined;
    },
    
    isNull: function(obj) {
      return obj === null;
    },
    
    isNaN: function(obj) {
      return obj !== obj;
    },
    
    isArray: Array.isArray || function(obj) {
      return obj.constructor === Array;
    },
    
    isObject: function(obj) {
      return obj === Object(obj);
    },
    
    isNumber: function(obj) {
      return obj === obj+0;
    },
    
    isString: function(obj) {
      return obj === obj+'';
    },
    
    isBoolean: function(obj) {
      return obj === false || obj === true;
    },
    
    isFunction: function(obj) {
      return Object.prototype.toString.call(obj) === '[object Function]';
    }
  
  };
    
})();


dat.color.toString = (function (common) {

  return function(color) {

    if (color.a == 1 || common.isUndefined(color.a)) {

      var s = color.hex.toString(16);
      while (s.length < 6) {
        s = '0' + s;
      }

      return '#' + s;

    } else {

      return 'rgba(' + Math.round(color.r) + ',' + Math.round(color.g) + ',' + Math.round(color.b) + ',' + color.a + ')';

    }

  }

})(dat.utils.common);


dat.Color = dat.color.Color = (function (interpret, math, toString, common) {

  var Color = function() {

    this.__state = interpret.apply(this, arguments);

    if (this.__state === false) {
      throw 'Failed to interpret color arguments';
    }

    this.__state.a = this.__state.a || 1;


  };

  Color.COMPONENTS = ['r','g','b','h','s','v','hex','a'];

  common.extend(Color.prototype, {

    toString: function() {
      return toString(this);
    },

    toOriginal: function() {
      return this.__state.conversion.write(this);
    }

  });

  defineRGBComponent(Color.prototype, 'r', 2);
  defineRGBComponent(Color.prototype, 'g', 1);
  defineRGBComponent(Color.prototype, 'b', 0);

  defineHSVComponent(Color.prototype, 'h');
  defineHSVComponent(Color.prototype, 's');
  defineHSVComponent(Color.prototype, 'v');

  Object.defineProperty(Color.prototype, 'a', {

    get: function() {
      return this.__state.a;
    },

    set: function(v) {
      this.__state.a = v;
    }

  });

  Object.defineProperty(Color.prototype, 'hex', {

    get: function() {

      if (!this.__state.space !== 'HEX') {
        this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b);
      }

      return this.__state.hex;

    },

    set: function(v) {

      this.__state.space = 'HEX';
      this.__state.hex = v;

    }

  });

  function defineRGBComponent(target, component, componentHexIndex) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'RGB') {
          return this.__state[component];
        }

        recalculateRGB(this, component, componentHexIndex);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'RGB') {
          recalculateRGB(this, component, componentHexIndex);
          this.__state.space = 'RGB';
        }

        this.__state[component] = v;

      }

    });

  }

  function defineHSVComponent(target, component) {

    Object.defineProperty(target, component, {

      get: function() {

        if (this.__state.space === 'HSV')
          return this.__state[component];

        recalculateHSV(this);

        return this.__state[component];

      },

      set: function(v) {

        if (this.__state.space !== 'HSV') {
          recalculateHSV(this);
          this.__state.space = 'HSV';
        }

        this.__state[component] = v;

      }

    });

  }

  function recalculateRGB(color, component, componentHexIndex) {

    if (color.__state.space === 'HEX') {

      color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex);

    } else if (color.__state.space === 'HSV') {

      common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));

    } else {

      throw 'Corrupted color state';

    }

  }

  function recalculateHSV(color) {

    var result = math.rgb_to_hsv(color.r, color.g, color.b);

    common.extend(color.__state,
        {
          s: result.s,
          v: result.v
        }
    );

    if (!common.isNaN(result.h)) {
      color.__state.h = result.h;
    } else if (common.isUndefined(color.__state.h)) {
      color.__state.h = 0;
    }

  }

  return Color;

})(dat.color.interpret = (function (toString, common) {

  var result, toReturn;

  var interpret = function() {

    toReturn = false;

    var original = arguments.length > 1 ? common.toArray(arguments) : arguments[0];

    common.each(INTERPRETATIONS, function(family) {

      if (family.litmus(original)) {

        common.each(family.conversions, function(conversion, conversionName) {

          result = conversion.read(original);

          if (toReturn === false && result !== false) {
            toReturn = result;
            result.conversionName = conversionName;
            result.conversion = conversion;
            return common.BREAK;

          }

        });

        return common.BREAK;

      }

    });

    return toReturn;

  };

  var INTERPRETATIONS = [

    // Strings
    {

      litmus: common.isString,

      conversions: {

        THREE_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt(
                  '0x' +
                      test[1].toString() + test[1].toString() +
                      test[2].toString() + test[2].toString() +
                      test[3].toString() + test[3].toString())
            };

          },

          write: toString

        },

        SIX_CHAR_HEX: {

          read: function(original) {

            var test = original.match(/^#([A-F0-9]{6})$/i);
            if (test === null) return false;

            return {
              space: 'HEX',
              hex: parseInt('0x' + test[1].toString())
            };

          },

          write: toString

        },

        CSS_RGB: {

          read: function(original) {

            var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3])
            };

          },

          write: toString

        },

        CSS_RGBA: {

          read: function(original) {

            var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
            if (test === null) return false;

            return {
              space: 'RGB',
              r: parseFloat(test[1]),
              g: parseFloat(test[2]),
              b: parseFloat(test[3]),
              a: parseFloat(test[4])
            };

          },

          write: toString

        }

      }

    },

    // Numbers
    {

      litmus: common.isNumber,

      conversions: {

        HEX: {
          read: function(original) {
            return {
              space: 'HEX',
              hex: original,
              conversionName: 'HEX'
            }
          },

          write: function(color) {
            return color.hex;
          }
        }

      }

    },

    // Arrays
    {

      litmus: common.isArray,

      conversions: {

        RGB_ARRAY: {
          read: function(original) {
            if (original.length != 3) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b];
          }

        },

        RGBA_ARRAY: {
          read: function(original) {
            if (original.length != 4) return false;
            return {
              space: 'RGB',
              r: original[0],
              g: original[1],
              b: original[2],
              a: original[3]
            };
          },

          write: function(color) {
            return [color.r, color.g, color.b, color.a];
          }

        }

      }

    },

    // Objects
    {

      litmus: common.isObject,

      conversions: {

        RGBA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b) &&
                common.isNumber(original.a)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b,
              a: color.a
            }
          }
        },

        RGB_OBJ: {
          read: function(original) {
            if (common.isNumber(original.r) &&
                common.isNumber(original.g) &&
                common.isNumber(original.b)) {
              return {
                space: 'RGB',
                r: original.r,
                g: original.g,
                b: original.b
              }
            }
            return false;
          },

          write: function(color) {
            return {
              r: color.r,
              g: color.g,
              b: color.b
            }
          }
        },

        HSVA_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v) &&
                common.isNumber(original.a)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v,
                a: original.a
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v,
              a: color.a
            }
          }
        },

        HSV_OBJ: {
          read: function(original) {
            if (common.isNumber(original.h) &&
                common.isNumber(original.s) &&
                common.isNumber(original.v)) {
              return {
                space: 'HSV',
                h: original.h,
                s: original.s,
                v: original.v
              }
            }
            return false;
          },

          write: function(color) {
            return {
              h: color.h,
              s: color.s,
              v: color.v
            }
          }

        }

      }

    }


  ];

  return interpret;


})(dat.color.toString,
dat.utils.common),
dat.color.math = (function () {

  var tmpComponent;

  return {

    hsv_to_rgb: function(h, s, v) {

      var hi = Math.floor(h / 60) % 6;

      var f = h / 60 - Math.floor(h / 60);
      var p = v * (1.0 - s);
      var q = v * (1.0 - (f * s));
      var t = v * (1.0 - ((1.0 - f) * s));
      var c = [
        [v, t, p],
        [q, v, p],
        [p, v, t],
        [p, q, v],
        [t, p, v],
        [v, p, q]
      ][hi];

      return {
        r: c[0] * 255,
        g: c[1] * 255,
        b: c[2] * 255
      };

    },

    rgb_to_hsv: function(r, g, b) {

      var min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          delta = max - min,
          h, s;

      if (max != 0) {
        s = delta / max;
      } else {
        return {
          h: NaN,
          s: 0,
          v: 0
        };
      }

      if (r == max) {
        h = (g - b) / delta;
      } else if (g == max) {
        h = 2 + (b - r) / delta;
      } else {
        h = 4 + (r - g) / delta;
      }
      h /= 6;
      if (h < 0) {
        h += 1;
      }

      return {
        h: h * 360,
        s: s,
        v: max / 255
      };
    },

    rgb_to_hex: function(r, g, b) {
      var hex = this.hex_with_component(0, 2, r);
      hex = this.hex_with_component(hex, 1, g);
      hex = this.hex_with_component(hex, 0, b);
      return hex;
    },

    component_from_hex: function(hex, componentIndex) {
      return (hex >> (componentIndex * 8)) & 0xFF;
    },

    hex_with_component: function(hex, componentIndex, value) {
      return value << (tmpComponent = componentIndex * 8) | (hex & ~ (0xFF << tmpComponent));
    }

  }

})(),
dat.color.toString,
dat.utils.common);
});

var index$1 = dat_gui;
var color = dat_color;

var index_1 = index$1.GUI;
index$1.color = color;

/* global requestAnimationFrame */

const maxRadius = 100;
const minRadius = 5;

const settings = {
  dampening: 0.28,
  stiffness: 0.03
};

const gui = new index_1();
gui.add(settings, 'dampening', 0, 1.0).step(0.01).onChange(setupSprings);
gui.add(settings, 'stiffness', 0, 1.0).step(0.01).onChange(setupSprings);
gui.add({ clear }, 'clear');

function clear () {
  lastValues = [];
}

const canvas = document.querySelector('canvas');
const ctx = setupCanvasAndGetContext(canvas);

canvas.addEventListener('click', (e) => {
  if (
    circle.xSpring.isAtDestination(0.2) &&
    circle.ySpring.isAtDestination(0.2) &&
    circle.radiusSpring.isAtDestination(0.2)
  ) {
    lastValues = [];
  }
  setPositionAndRadius([e.offsetX, e.offsetY]);
});

const center = [canvas.width / 2, canvas.height / 2];
let lastValues = [];

let circle;
setupSprings();
setPositionAndRadius(center);
requestAnimationFrame(loop);

function setupSprings () {
  const dampening = settings.dampening;
  const stiffness = settings.stiffness;
  lastValues = [];
  circle = {
    radiusSpring: createSpring(stiffness, dampening, 10),
    xSpring: createSpring(stiffness, dampening, center[0]),
    ySpring: createSpring(stiffness, dampening, center[1])
  };
}

function setPositionAndRadius (position) {
  const newRadius = (maxRadius - minRadius) * Math.random() + minRadius;
  circle.radiusSpring.updateValue(newRadius);
  circle.xSpring.updateValue(position[0]);
  circle.ySpring.updateValue(position[1]);
}

function setupCanvasAndGetContext (canvas) {
  let { width, height } = canvas.parentElement.getBoundingClientRect();
  height *= 2;
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  return canvas.getContext('2d')
}

function loop () {
  requestAnimationFrame(loop);
  clearRect(ctx, 'rgb(248, 245, 250)');
  const x = circle.xSpring.tick(2);
  const y = circle.ySpring.tick();
  const radius = circle.radiusSpring.tick(2);
  lastValues.push([[x, y], radius]);
  lastValues.forEach(([pos, rad]) => drawCircle(ctx, pos, rad, 'transparent', 'rgba(94, 126, 178, 0.4)'));
  drawCircle(ctx, [x, y], radius, 'rgb(94, 126, 178)', 'rgba(255, 255, 255, 0.8)');
}

function drawCircle (ctx, position, radius, fillColor = 'transparent', strokeColor = 'transparent') {
  if (radius < 0) return
  ctx.beginPath();
  ctx.strokeStyle = strokeColor;
  ctx.fillStyle = fillColor;
  ctx.arc(position[0], position[1], radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

function clearRect (ctx, color$$1) {
  ctx.beginPath();
  ctx.fillStyle = color$$1;
  ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fill();
}

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZGF0LWd1aS92ZW5kb3IvZGF0Lmd1aS5qcyIsIm5vZGVfbW9kdWxlcy9kYXQtZ3VpL3ZlbmRvci9kYXQuY29sb3IuanMiLCJub2RlX21vZHVsZXMvZGF0LWd1aS9pbmRleC5qcyIsImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTcHJpbmcoc3RpZmZuZXNzLCBkYW1wZW5pbmcsIHZhbHVlKSB7XG4gIHZhciBsYXN0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IG51bGw7XG5cbiAgbGFzdFZhbHVlID0gbGFzdFZhbHVlIHx8IHZhbHVlO1xuICB2YXIgZGVzdGluYXRpb25WYWx1ZSA9IHZhbHVlO1xuXG4gIHJldHVybiB7XG4gICAgdXBkYXRlVmFsdWU6IHVwZGF0ZVZhbHVlLFxuICAgIGlzQXREZXN0aW5hdGlvbjogaXNBdERlc3RpbmF0aW9uLFxuICAgIHRpY2s6IHRpY2tcbiAgfTtcblxuICBmdW5jdGlvbiB1cGRhdGVWYWx1ZShuZXdWYWx1ZSkge1xuICAgIHZhciBzaG91bGRBbmltYXRlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB0cnVlO1xuXG4gICAgZGVzdGluYXRpb25WYWx1ZSA9IG5ld1ZhbHVlO1xuICAgIGlmICghc2hvdWxkQW5pbWF0ZSkge1xuICAgICAgdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgIGxhc3RWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzQXREZXN0aW5hdGlvbigpIHtcbiAgICB2YXIgdGhyZXNob2xkID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBOdW1iZXIuRVBTSUxPTjtcblxuICAgIC8vIG1ha2luZyBzdXJlIHdlJ3JlIG5lYXIgdGhlIGRlc3RpbmF0aW9uIGFuZCB0aGF0IHZlbG9jaXR5IGlzIGJlbG93IHRocmVzaG9sZFxuICAgIC8vIE5PVEU6IHdlIGNvdWxkIGJlIGRvaW5nIHRoaXMgYSBiZXR0ZXIgd2F5IHBlcmhhcHM/XG4gICAgcmV0dXJuIE1hdGguYWJzKHZhbHVlIC0gZGVzdGluYXRpb25WYWx1ZSkgPD0gdGhyZXNob2xkICYmIE1hdGguYWJzKHZhbHVlIC0gbGFzdFZhbHVlKSA8PSB0aHJlc2hvbGQ7XG4gIH1cblxuICBmdW5jdGlvbiB0aWNrKCkge1xuICAgIHZhciBzdGVwcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogMTtcbiAgICB2YXIgc2hvdWxkVXBkYXRlSW50ZXJuYWxseSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogdHJ1ZTtcblxuICAgIGlmIChzdGVwcyA8IDEpIHRocm93IG5ldyBFcnJvcigndGljaygpIGV4cGVjdHMgYHN0ZXBzYCB0byBiZSBncmVhdGVyIHRoYW4gMCcpO1xuICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihzdGVwcykpIHRocm93IG5ldyBFcnJvcigndGljaygpIGV4cGVjdHMgYHN0ZXBzYCB0byBiZSBhbiBpbnRlZ2VyJyk7XG5cbiAgICB2YXIgX3ZhbHVlID0gdmFsdWU7XG4gICAgdmFyIF9sYXN0VmFsdWUgPSBsYXN0VmFsdWU7XG4gICAgd2hpbGUgKHN0ZXBzLS0pIHtcbiAgICAgIHZhciB2ZWxvY2l0eSA9IF92YWx1ZSAtIF9sYXN0VmFsdWU7XG4gICAgICB2YXIgZGVsdGEgPSBkZXN0aW5hdGlvblZhbHVlIC0gX3ZhbHVlO1xuICAgICAgdmFyIHNwcmluZyA9IGRlbHRhICogc3RpZmZuZXNzO1xuICAgICAgdmFyIGRhbXBlciA9IHZlbG9jaXR5ICogLWRhbXBlbmluZztcbiAgICAgIHZhciBhY2NlbGVyYXRpb24gPSBzcHJpbmcgKyBkYW1wZXI7XG4gICAgICB2YXIgbmV4dFZhbHVlID0gYWNjZWxlcmF0aW9uICsgdmVsb2NpdHkgKyBfdmFsdWU7XG4gICAgICBfbGFzdFZhbHVlID0gX3ZhbHVlO1xuICAgICAgX3ZhbHVlID0gbmV4dFZhbHVlO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRVcGRhdGVJbnRlcm5hbGx5KSB7XG4gICAgICBsYXN0VmFsdWUgPSBfbGFzdFZhbHVlO1xuICAgICAgdmFsdWUgPSBfdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIF92YWx1ZTtcbiAgfVxufSIsIi8qKlxuICogZGF0LWd1aSBKYXZhU2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeVxuICogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2RhdC1ndWlcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMSBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIENyZWF0aXZlIExhYlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqL1xuXG4vKiogQG5hbWVzcGFjZSAqL1xudmFyIGRhdCA9IG1vZHVsZS5leHBvcnRzID0gZGF0IHx8IHt9O1xuXG4vKiogQG5hbWVzcGFjZSAqL1xuZGF0Lmd1aSA9IGRhdC5ndWkgfHwge307XG5cbi8qKiBAbmFtZXNwYWNlICovXG5kYXQudXRpbHMgPSBkYXQudXRpbHMgfHwge307XG5cbi8qKiBAbmFtZXNwYWNlICovXG5kYXQuY29udHJvbGxlcnMgPSBkYXQuY29udHJvbGxlcnMgfHwge307XG5cbi8qKiBAbmFtZXNwYWNlICovXG5kYXQuZG9tID0gZGF0LmRvbSB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC5jb2xvciA9IGRhdC5jb2xvciB8fCB7fTtcblxuZGF0LnV0aWxzLmNzcyA9IChmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgbG9hZDogZnVuY3Rpb24gKHVybCwgZG9jKSB7XG4gICAgICBkb2MgPSBkb2MgfHwgZG9jdW1lbnQ7XG4gICAgICB2YXIgbGluayA9IGRvYy5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgICBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICB9LFxuICAgIGluamVjdDogZnVuY3Rpb24oY3NzLCBkb2MpIHtcbiAgICAgIGRvYyA9IGRvYyB8fCBkb2N1bWVudDtcbiAgICAgIHZhciBpbmplY3RlZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICBpbmplY3RlZC50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgIGluamVjdGVkLmlubmVySFRNTCA9IGNzcztcbiAgICAgIGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGluamVjdGVkKTtcbiAgICB9XG4gIH1cbn0pKCk7XG5cblxuZGF0LnV0aWxzLmNvbW1vbiA9IChmdW5jdGlvbiAoKSB7XG4gIFxuICB2YXIgQVJSX0VBQ0ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaDtcbiAgdmFyIEFSUl9TTElDRSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuICAvKipcbiAgICogQmFuZC1haWQgbWV0aG9kcyBmb3IgdGhpbmdzIHRoYXQgc2hvdWxkIGJlIGEgbG90IGVhc2llciBpbiBKYXZhU2NyaXB0LlxuICAgKiBJbXBsZW1lbnRhdGlvbiBhbmQgc3RydWN0dXJlIGluc3BpcmVkIGJ5IHVuZGVyc2NvcmUuanNcbiAgICogaHR0cDovL2RvY3VtZW50Y2xvdWQuZ2l0aHViLmNvbS91bmRlcnNjb3JlL1xuICAgKi9cblxuICByZXR1cm4geyBcbiAgICBcbiAgICBCUkVBSzoge30sXG4gIFxuICAgIGV4dGVuZDogZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICBcbiAgICAgIHRoaXMuZWFjaChBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMsIDEpLCBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopXG4gICAgICAgICAgaWYgKCF0aGlzLmlzVW5kZWZpbmVkKG9ialtrZXldKSkgXG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IG9ialtrZXldO1xuICAgICAgICBcbiAgICAgIH0sIHRoaXMpO1xuICAgICAgXG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgXG4gICAgfSxcbiAgICBcbiAgICBkZWZhdWx0czogZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICBcbiAgICAgIHRoaXMuZWFjaChBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMsIDEpLCBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopXG4gICAgICAgICAgaWYgKHRoaXMuaXNVbmRlZmluZWQodGFyZ2V0W2tleV0pKSBcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgICAgIFxuICAgICAgfSwgdGhpcyk7XG4gICAgICBcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgXG4gICAgfSxcbiAgICBcbiAgICBjb21wb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0b0NhbGwgPSBBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgYXJncyA9IEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSB0b0NhbGwubGVuZ3RoIC0xOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGFyZ3MgPSBbdG9DYWxsW2ldLmFwcGx5KHRoaXMsIGFyZ3MpXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gYXJnc1swXTtcbiAgICAgICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIGVhY2g6IGZ1bmN0aW9uKG9iaiwgaXRyLCBzY29wZSkge1xuXG4gICAgICBcbiAgICAgIGlmIChBUlJfRUFDSCAmJiBvYmouZm9yRWFjaCA9PT0gQVJSX0VBQ0gpIHsgXG4gICAgICAgIFxuICAgICAgICBvYmouZm9yRWFjaChpdHIsIHNjb3BlKTtcbiAgICAgICAgXG4gICAgICB9IGVsc2UgaWYgKG9iai5sZW5ndGggPT09IG9iai5sZW5ndGggKyAwKSB7IC8vIElzIG51bWJlciBidXQgbm90IE5hTlxuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIga2V5ID0gMCwgbCA9IG9iai5sZW5ndGg7IGtleSA8IGw7IGtleSsrKVxuICAgICAgICAgIGlmIChrZXkgaW4gb2JqICYmIGl0ci5jYWxsKHNjb3BlLCBvYmpba2V5XSwga2V5KSA9PT0gdGhpcy5CUkVBSykgXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikgXG4gICAgICAgICAgaWYgKGl0ci5jYWxsKHNjb3BlLCBvYmpba2V5XSwga2V5KSA9PT0gdGhpcy5CUkVBSylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgfVxuICAgICAgICAgICAgXG4gICAgfSxcbiAgICBcbiAgICBkZWZlcjogZnVuY3Rpb24oZm5jKSB7XG4gICAgICBzZXRUaW1lb3V0KGZuYywgMCk7XG4gICAgfSxcbiAgICBcbiAgICB0b0FycmF5OiBmdW5jdGlvbihvYmopIHtcbiAgICAgIGlmIChvYmoudG9BcnJheSkgcmV0dXJuIG9iai50b0FycmF5KCk7XG4gICAgICByZXR1cm4gQVJSX1NMSUNFLmNhbGwob2JqKTtcbiAgICB9LFxuXG4gICAgaXNVbmRlZmluZWQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkO1xuICAgIH0sXG4gICAgXG4gICAgaXNOdWxsOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IG51bGw7XG4gICAgfSxcbiAgICBcbiAgICBpc05hTjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICE9PSBvYmo7XG4gICAgfSxcbiAgICBcbiAgICBpc0FycmF5OiBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iai5jb25zdHJ1Y3RvciA9PT0gQXJyYXk7XG4gICAgfSxcbiAgICBcbiAgICBpc09iamVjdDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBPYmplY3Qob2JqKTtcbiAgICB9LFxuICAgIFxuICAgIGlzTnVtYmVyOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IG9iaiswO1xuICAgIH0sXG4gICAgXG4gICAgaXNTdHJpbmc6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gb2JqKycnO1xuICAgIH0sXG4gICAgXG4gICAgaXNCb29sZWFuOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IGZhbHNlIHx8IG9iaiA9PT0gdHJ1ZTtcbiAgICB9LFxuICAgIFxuICAgIGlzRnVuY3Rpb246IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuICAgIH1cbiAgXG4gIH07XG4gICAgXG59KSgpO1xuXG5cbmRhdC5jb250cm9sbGVycy5Db250cm9sbGVyID0gKGZ1bmN0aW9uIChjb21tb24pIHtcblxuICAvKipcbiAgICogQGNsYXNzIEFuIFwiYWJzdHJhY3RcIiBjbGFzcyB0aGF0IHJlcHJlc2VudHMgYSBnaXZlbiBwcm9wZXJ0eSBvZiBhbiBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXG4gICAqL1xuICB2YXIgQ29udHJvbGxlciA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcblxuICAgIHRoaXMuaW5pdGlhbFZhbHVlID0gb2JqZWN0W3Byb3BlcnR5XTtcblxuICAgIC8qKlxuICAgICAqIFRob3NlIHdobyBleHRlbmQgdGhpcyBjbGFzcyB3aWxsIHB1dCB0aGVpciBET00gZWxlbWVudHMgaW4gaGVyZS5cbiAgICAgKiBAdHlwZSB7RE9NRWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBvYmplY3QgdG8gbWFuaXB1bGF0ZVxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gbWFuaXB1bGF0ZVxuICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICovXG4gICAgdGhpcy5wcm9wZXJ0eSA9IHByb3BlcnR5O1xuXG4gICAgLyoqXG4gICAgICogVGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbiBjaGFuZ2UuXG4gICAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICB0aGlzLl9fb25DaGFuZ2UgPSB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGZpbmlzaGluZyBjaGFuZ2UuXG4gICAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UgPSB1bmRlZmluZWQ7XG5cbiAgfTtcblxuICBjb21tb24uZXh0ZW5kKFxuXG4gICAgICBDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAgLyoqIEBsZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlci5wcm90b3R5cGUgKi9cbiAgICAgIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lmeSB0aGF0IGEgZnVuY3Rpb24gZmlyZSBldmVyeSB0aW1lIHNvbWVvbmUgY2hhbmdlcyB0aGUgdmFsdWUgd2l0aFxuICAgICAgICAgKiB0aGlzIENvbnRyb2xsZXIuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuYyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZSB2YWx1ZVxuICAgICAgICAgKiBpcyBtb2RpZmllZCB2aWEgdGhpcyBDb250cm9sbGVyLlxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJ9IHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbihmbmMpIHtcbiAgICAgICAgICB0aGlzLl9fb25DaGFuZ2UgPSBmbmM7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZnkgdGhhdCBhIGZ1bmN0aW9uIGZpcmUgZXZlcnkgdGltZSBzb21lb25lIFwiZmluaXNoZXNcIiBjaGFuZ2luZ1xuICAgICAgICAgKiB0aGUgdmFsdWUgd2loIHRoaXMgQ29udHJvbGxlci4gVXNlZnVsIGZvciB2YWx1ZXMgdGhhdCBjaGFuZ2VcbiAgICAgICAgICogaW5jcmVtZW50YWxseSBsaWtlIG51bWJlcnMgb3Igc3RyaW5ncy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5jIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbmV2ZXJcbiAgICAgICAgICogc29tZW9uZSBcImZpbmlzaGVzXCIgY2hhbmdpbmcgdGhlIHZhbHVlIHZpYSB0aGlzIENvbnRyb2xsZXIuXG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcn0gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgb25GaW5pc2hDaGFuZ2U6IGZ1bmN0aW9uKGZuYykge1xuICAgICAgICAgIHRoaXMuX19vbkZpbmlzaENoYW5nZSA9IGZuYztcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hhbmdlIHRoZSB2YWx1ZSBvZiA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gbmV3VmFsdWUgVGhlIG5ldyB2YWx1ZSBvZiA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPlxuICAgICAgICAgKi9cbiAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5vYmplY3RbdGhpcy5wcm9wZXJ0eV0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICBpZiAodGhpcy5fX29uQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLl9fb25DaGFuZ2UuY2FsbCh0aGlzLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMudXBkYXRlRGlzcGxheSgpO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSB2YWx1ZSBvZiA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgY3VycmVudCB2YWx1ZSBvZiA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0VmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdFt0aGlzLnByb3BlcnR5XTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVmcmVzaGVzIHRoZSB2aXN1YWwgZGlzcGxheSBvZiBhIENvbnRyb2xsZXIgaW4gb3JkZXIgdG8ga2VlcCBzeW5jXG4gICAgICAgICAqIHdpdGggdGhlIG9iamVjdCdzIGN1cnJlbnQgdmFsdWUuXG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcn0gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgdXBkYXRlRGlzcGxheTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm5zIHtCb29sZWFufSB0cnVlIGlmIHRoZSB2YWx1ZSBoYXMgZGV2aWF0ZWQgZnJvbSBpbml0aWFsVmFsdWVcbiAgICAgICAgICovXG4gICAgICAgIGlzTW9kaWZpZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmluaXRpYWxWYWx1ZSAhPT0gdGhpcy5nZXRWYWx1ZSgpXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICk7XG5cbiAgcmV0dXJuIENvbnRyb2xsZXI7XG5cblxufSkoZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmRvbS5kb20gPSAoZnVuY3Rpb24gKGNvbW1vbikge1xuXG4gIHZhciBFVkVOVF9NQVAgPSB7XG4gICAgJ0hUTUxFdmVudHMnOiBbJ2NoYW5nZSddLFxuICAgICdNb3VzZUV2ZW50cyc6IFsnY2xpY2snLCdtb3VzZW1vdmUnLCdtb3VzZWRvd24nLCdtb3VzZXVwJywgJ21vdXNlb3ZlciddLFxuICAgICdLZXlib2FyZEV2ZW50cyc6IFsna2V5ZG93biddXG4gIH07XG5cbiAgdmFyIEVWRU5UX01BUF9JTlYgPSB7fTtcbiAgY29tbW9uLmVhY2goRVZFTlRfTUFQLCBmdW5jdGlvbih2LCBrKSB7XG4gICAgY29tbW9uLmVhY2godiwgZnVuY3Rpb24oZSkge1xuICAgICAgRVZFTlRfTUFQX0lOVltlXSA9IGs7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHZhciBDU1NfVkFMVUVfUElYRUxTID0gLyhcXGQrKFxcLlxcZCspPylweC87XG5cbiAgZnVuY3Rpb24gY3NzVmFsdWVUb1BpeGVscyh2YWwpIHtcblxuICAgIGlmICh2YWwgPT09ICcwJyB8fCBjb21tb24uaXNVbmRlZmluZWQodmFsKSkgcmV0dXJuIDA7XG5cbiAgICB2YXIgbWF0Y2ggPSB2YWwubWF0Y2goQ1NTX1ZBTFVFX1BJWEVMUyk7XG5cbiAgICBpZiAoIWNvbW1vbi5pc051bGwobWF0Y2gpKSB7XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdChtYXRjaFsxXSk7XG4gICAgfVxuXG4gICAgLy8gVE9ETyAuLi5lbXM/ICU/XG5cbiAgICByZXR1cm4gMDtcblxuICB9XG5cbiAgLyoqXG4gICAqIEBuYW1lc3BhY2VcbiAgICogQG1lbWJlciBkYXQuZG9tXG4gICAqL1xuICB2YXIgZG9tID0ge1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKiBAcGFyYW0gc2VsZWN0YWJsZVxuICAgICAqL1xuICAgIG1ha2VTZWxlY3RhYmxlOiBmdW5jdGlvbihlbGVtLCBzZWxlY3RhYmxlKSB7XG5cbiAgICAgIGlmIChlbGVtID09PSB1bmRlZmluZWQgfHwgZWxlbS5zdHlsZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG5cbiAgICAgIGVsZW0ub25zZWxlY3RzdGFydCA9IHNlbGVjdGFibGUgPyBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSA6IGZ1bmN0aW9uKCkge1xuICAgICAgfTtcblxuICAgICAgZWxlbS5zdHlsZS5Nb3pVc2VyU2VsZWN0ID0gc2VsZWN0YWJsZSA/ICdhdXRvJyA6ICdub25lJztcbiAgICAgIGVsZW0uc3R5bGUuS2h0bWxVc2VyU2VsZWN0ID0gc2VsZWN0YWJsZSA/ICdhdXRvJyA6ICdub25lJztcbiAgICAgIGVsZW0udW5zZWxlY3RhYmxlID0gc2VsZWN0YWJsZSA/ICdvbicgOiAnb2ZmJztcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICogQHBhcmFtIGhvcml6b250YWxcbiAgICAgKiBAcGFyYW0gdmVydGljYWxcbiAgICAgKi9cbiAgICBtYWtlRnVsbHNjcmVlbjogZnVuY3Rpb24oZWxlbSwgaG9yaXpvbnRhbCwgdmVydGljYWwpIHtcblxuICAgICAgaWYgKGNvbW1vbi5pc1VuZGVmaW5lZChob3Jpem9udGFsKSkgaG9yaXpvbnRhbCA9IHRydWU7XG4gICAgICBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKHZlcnRpY2FsKSkgdmVydGljYWwgPSB0cnVlO1xuXG4gICAgICBlbGVtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblxuICAgICAgaWYgKGhvcml6b250YWwpIHtcbiAgICAgICAgZWxlbS5zdHlsZS5sZWZ0ID0gMDtcbiAgICAgICAgZWxlbS5zdHlsZS5yaWdodCA9IDA7XG4gICAgICB9XG4gICAgICBpZiAodmVydGljYWwpIHtcbiAgICAgICAgZWxlbS5zdHlsZS50b3AgPSAwO1xuICAgICAgICBlbGVtLnN0eWxlLmJvdHRvbSA9IDA7XG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqIEBwYXJhbSBldmVudFR5cGVcbiAgICAgKiBAcGFyYW0gcGFyYW1zXG4gICAgICovXG4gICAgZmFrZUV2ZW50OiBmdW5jdGlvbihlbGVtLCBldmVudFR5cGUsIHBhcmFtcywgYXV4KSB7XG4gICAgICBwYXJhbXMgPSBwYXJhbXMgfHwge307XG4gICAgICB2YXIgY2xhc3NOYW1lID0gRVZFTlRfTUFQX0lOVltldmVudFR5cGVdO1xuICAgICAgaWYgKCFjbGFzc05hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFdmVudCB0eXBlICcgKyBldmVudFR5cGUgKyAnIG5vdCBzdXBwb3J0ZWQuJyk7XG4gICAgICB9XG4gICAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoY2xhc3NOYW1lKTtcbiAgICAgIHN3aXRjaCAoY2xhc3NOYW1lKSB7XG4gICAgICAgIGNhc2UgJ01vdXNlRXZlbnRzJzpcbiAgICAgICAgICB2YXIgY2xpZW50WCA9IHBhcmFtcy54IHx8IHBhcmFtcy5jbGllbnRYIHx8IDA7XG4gICAgICAgICAgdmFyIGNsaWVudFkgPSBwYXJhbXMueSB8fCBwYXJhbXMuY2xpZW50WSB8fCAwO1xuICAgICAgICAgIGV2dC5pbml0TW91c2VFdmVudChldmVudFR5cGUsIHBhcmFtcy5idWJibGVzIHx8IGZhbHNlLFxuICAgICAgICAgICAgICBwYXJhbXMuY2FuY2VsYWJsZSB8fCB0cnVlLCB3aW5kb3csIHBhcmFtcy5jbGlja0NvdW50IHx8IDEsXG4gICAgICAgICAgICAgIDAsIC8vc2NyZWVuIFhcbiAgICAgICAgICAgICAgMCwgLy9zY3JlZW4gWVxuICAgICAgICAgICAgICBjbGllbnRYLCAvL2NsaWVudCBYXG4gICAgICAgICAgICAgIGNsaWVudFksIC8vY2xpZW50IFlcbiAgICAgICAgICAgICAgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGwpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdLZXlib2FyZEV2ZW50cyc6XG4gICAgICAgICAgdmFyIGluaXQgPSBldnQuaW5pdEtleWJvYXJkRXZlbnQgfHwgZXZ0LmluaXRLZXlFdmVudDsgLy8gd2Via2l0IHx8IG1velxuICAgICAgICAgIGNvbW1vbi5kZWZhdWx0cyhwYXJhbXMsIHtcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgICAgICBjdHJsS2V5OiBmYWxzZSxcbiAgICAgICAgICAgIGFsdEtleTogZmFsc2UsXG4gICAgICAgICAgICBzaGlmdEtleTogZmFsc2UsXG4gICAgICAgICAgICBtZXRhS2V5OiBmYWxzZSxcbiAgICAgICAgICAgIGtleUNvZGU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGNoYXJDb2RlOiB1bmRlZmluZWRcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpbml0KGV2ZW50VHlwZSwgcGFyYW1zLmJ1YmJsZXMgfHwgZmFsc2UsXG4gICAgICAgICAgICAgIHBhcmFtcy5jYW5jZWxhYmxlLCB3aW5kb3csXG4gICAgICAgICAgICAgIHBhcmFtcy5jdHJsS2V5LCBwYXJhbXMuYWx0S2V5LFxuICAgICAgICAgICAgICBwYXJhbXMuc2hpZnRLZXksIHBhcmFtcy5tZXRhS2V5LFxuICAgICAgICAgICAgICBwYXJhbXMua2V5Q29kZSwgcGFyYW1zLmNoYXJDb2RlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBldnQuaW5pdEV2ZW50KGV2ZW50VHlwZSwgcGFyYW1zLmJ1YmJsZXMgfHwgZmFsc2UsXG4gICAgICAgICAgICAgIHBhcmFtcy5jYW5jZWxhYmxlIHx8IHRydWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY29tbW9uLmRlZmF1bHRzKGV2dCwgYXV4KTtcbiAgICAgIGVsZW0uZGlzcGF0Y2hFdmVudChldnQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICogQHBhcmFtIGZ1bmNcbiAgICAgKiBAcGFyYW0gYm9vbFxuICAgICAqL1xuICAgIGJpbmQ6IGZ1bmN0aW9uKGVsZW0sIGV2ZW50LCBmdW5jLCBib29sKSB7XG4gICAgICBib29sID0gYm9vbCB8fCBmYWxzZTtcbiAgICAgIGlmIChlbGVtLmFkZEV2ZW50TGlzdGVuZXIpXG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYywgYm9vbCk7XG4gICAgICBlbHNlIGlmIChlbGVtLmF0dGFjaEV2ZW50KVxuICAgICAgICBlbGVtLmF0dGFjaEV2ZW50KCdvbicgKyBldmVudCwgZnVuYyk7XG4gICAgICByZXR1cm4gZG9tO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICogQHBhcmFtIGZ1bmNcbiAgICAgKiBAcGFyYW0gYm9vbFxuICAgICAqL1xuICAgIHVuYmluZDogZnVuY3Rpb24oZWxlbSwgZXZlbnQsIGZ1bmMsIGJvb2wpIHtcbiAgICAgIGJvb2wgPSBib29sIHx8IGZhbHNlO1xuICAgICAgaWYgKGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcilcbiAgICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jLCBib29sKTtcbiAgICAgIGVsc2UgaWYgKGVsZW0uZGV0YWNoRXZlbnQpXG4gICAgICAgIGVsZW0uZGV0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBmdW5jKTtcbiAgICAgIHJldHVybiBkb207XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKiBAcGFyYW0gY2xhc3NOYW1lXG4gICAgICovXG4gICAgYWRkQ2xhc3M6IGZ1bmN0aW9uKGVsZW0sIGNsYXNzTmFtZSkge1xuICAgICAgaWYgKGVsZW0uY2xhc3NOYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZWxlbS5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgICB9IGVsc2UgaWYgKGVsZW0uY2xhc3NOYW1lICE9PSBjbGFzc05hbWUpIHtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtLmNsYXNzTmFtZS5zcGxpdCgvICsvKTtcbiAgICAgICAgaWYgKGNsYXNzZXMuaW5kZXhPZihjbGFzc05hbWUpID09IC0xKSB7XG4gICAgICAgICAgY2xhc3Nlcy5wdXNoKGNsYXNzTmFtZSk7XG4gICAgICAgICAgZWxlbS5jbGFzc05hbWUgPSBjbGFzc2VzLmpvaW4oJyAnKS5yZXBsYWNlKC9eXFxzKy8sICcnKS5yZXBsYWNlKC9cXHMrJC8sICcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGRvbTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqIEBwYXJhbSBjbGFzc05hbWVcbiAgICAgKi9cbiAgICByZW1vdmVDbGFzczogZnVuY3Rpb24oZWxlbSwgY2xhc3NOYW1lKSB7XG4gICAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICAgIGlmIChlbGVtLmNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gZWxlbS5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbS5jbGFzc05hbWUgPT09IGNsYXNzTmFtZSkge1xuICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBjbGFzc2VzID0gZWxlbS5jbGFzc05hbWUuc3BsaXQoLyArLyk7XG4gICAgICAgICAgdmFyIGluZGV4ID0gY2xhc3Nlcy5pbmRleE9mKGNsYXNzTmFtZSk7XG4gICAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbignICcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbS5jbGFzc05hbWUgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gZG9tO1xuICAgIH0sXG5cbiAgICBoYXNDbGFzczogZnVuY3Rpb24oZWxlbSwgY2xhc3NOYW1lKSB7XG4gICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKD86XnxcXFxccyspJyArIGNsYXNzTmFtZSArICcoPzpcXFxccyt8JCknKS50ZXN0KGVsZW0uY2xhc3NOYW1lKSB8fCBmYWxzZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqL1xuICAgIGdldFdpZHRoOiBmdW5jdGlvbihlbGVtKSB7XG5cbiAgICAgIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbSk7XG5cbiAgICAgIHJldHVybiBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydib3JkZXItbGVmdC13aWR0aCddKSArXG4gICAgICAgICAgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsnYm9yZGVyLXJpZ2h0LXdpZHRoJ10pICtcbiAgICAgICAgICBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydwYWRkaW5nLWxlZnQnXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3BhZGRpbmctcmlnaHQnXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3dpZHRoJ10pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICovXG4gICAgZ2V0SGVpZ2h0OiBmdW5jdGlvbihlbGVtKSB7XG5cbiAgICAgIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbSk7XG5cbiAgICAgIHJldHVybiBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydib3JkZXItdG9wLXdpZHRoJ10pICtcbiAgICAgICAgICBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydib3JkZXItYm90dG9tLXdpZHRoJ10pICtcbiAgICAgICAgICBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydwYWRkaW5nLXRvcCddKSArXG4gICAgICAgICAgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsncGFkZGluZy1ib3R0b20nXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ2hlaWdodCddKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqL1xuICAgIGdldE9mZnNldDogZnVuY3Rpb24oZWxlbSkge1xuICAgICAgdmFyIG9mZnNldCA9IHtsZWZ0OiAwLCB0b3A6MH07XG4gICAgICBpZiAoZWxlbS5vZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIG9mZnNldC5sZWZ0ICs9IGVsZW0ub2Zmc2V0TGVmdDtcbiAgICAgICAgICBvZmZzZXQudG9wICs9IGVsZW0ub2Zmc2V0VG9wO1xuICAgICAgICB9IHdoaWxlIChlbGVtID0gZWxlbS5vZmZzZXRQYXJlbnQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9mZnNldDtcbiAgICB9LFxuXG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3Bvc3RzLzI2ODQ1NjEvcmV2aXNpb25zXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKi9cbiAgICBpc0FjdGl2ZTogZnVuY3Rpb24oZWxlbSkge1xuICAgICAgcmV0dXJuIGVsZW0gPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgKCBlbGVtLnR5cGUgfHwgZWxlbS5ocmVmICk7XG4gICAgfVxuXG4gIH07XG5cbiAgcmV0dXJuIGRvbTtcblxufSkoZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmNvbnRyb2xsZXJzLk9wdGlvbkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKENvbnRyb2xsZXIsIGRvbSwgY29tbW9uKSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBQcm92aWRlcyBhIHNlbGVjdCBpbnB1dCB0byBhbHRlciB0aGUgcHJvcGVydHkgb2YgYW4gb2JqZWN0LCB1c2luZyBhXG4gICAqIGxpc3Qgb2YgYWNjZXB0ZWQgdmFsdWVzLlxuICAgKlxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge09iamVjdHxzdHJpbmdbXX0gb3B0aW9ucyBBIG1hcCBvZiBsYWJlbHMgdG8gYWNjZXB0YWJsZSB2YWx1ZXMsIG9yXG4gICAqIGEgbGlzdCBvZiBhY2NlcHRhYmxlIHN0cmluZyB2YWx1ZXMuXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXG4gICAqL1xuICB2YXIgT3B0aW9uQ29udHJvbGxlciA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHksIG9wdGlvbnMpIHtcblxuICAgIE9wdGlvbkNvbnRyb2xsZXIuc3VwZXJjbGFzcy5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8qKlxuICAgICAqIFRoZSBkcm9wIGRvd24gbWVudVxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICB0aGlzLl9fc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG5cbiAgICBpZiAoY29tbW9uLmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgIHZhciBtYXAgPSB7fTtcbiAgICAgIGNvbW1vbi5lYWNoKG9wdGlvbnMsIGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgbWFwW2VsZW1lbnRdID0gZWxlbWVudDtcbiAgICAgIH0pO1xuICAgICAgb3B0aW9ucyA9IG1hcDtcbiAgICB9XG5cbiAgICBjb21tb24uZWFjaChvcHRpb25zLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG5cbiAgICAgIHZhciBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgIG9wdC5pbm5lckhUTUwgPSBrZXk7XG4gICAgICBvcHQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHZhbHVlKTtcbiAgICAgIF90aGlzLl9fc2VsZWN0LmFwcGVuZENoaWxkKG9wdCk7XG5cbiAgICB9KTtcblxuICAgIC8vIEFja25vd2xlZGdlIG9yaWdpbmFsIHZhbHVlXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICBkb20uYmluZCh0aGlzLl9fc2VsZWN0LCAnY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZGVzaXJlZFZhbHVlID0gdGhpcy5vcHRpb25zW3RoaXMuc2VsZWN0ZWRJbmRleF0udmFsdWU7XG4gICAgICBfdGhpcy5zZXRWYWx1ZShkZXNpcmVkVmFsdWUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19zZWxlY3QpO1xuXG4gIH07XG5cbiAgT3B0aW9uQ29udHJvbGxlci5zdXBlcmNsYXNzID0gQ29udHJvbGxlcjtcblxuICBjb21tb24uZXh0ZW5kKFxuXG4gICAgICBPcHRpb25Db250cm9sbGVyLnByb3RvdHlwZSxcbiAgICAgIENvbnRyb2xsZXIucHJvdG90eXBlLFxuXG4gICAgICB7XG5cbiAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICB2YXIgdG9SZXR1cm4gPSBPcHRpb25Db250cm9sbGVyLnN1cGVyY2xhc3MucHJvdG90eXBlLnNldFZhbHVlLmNhbGwodGhpcywgdik7XG4gICAgICAgICAgaWYgKHRoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwodGhpcywgdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRvUmV0dXJuO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMuX19zZWxlY3QudmFsdWUgPSB0aGlzLmdldFZhbHVlKCk7XG4gICAgICAgICAgcmV0dXJuIE9wdGlvbkNvbnRyb2xsZXIuc3VwZXJjbGFzcy5wcm90b3R5cGUudXBkYXRlRGlzcGxheS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICApO1xuXG4gIHJldHVybiBPcHRpb25Db250cm9sbGVyO1xuXG59KShkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcixcbmRhdC5kb20uZG9tLFxuZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKENvbnRyb2xsZXIsIGNvbW1vbikge1xuXG4gIC8qKlxuICAgKiBAY2xhc3MgUmVwcmVzZW50cyBhIGdpdmVuIHByb3BlcnR5IG9mIGFuIG9iamVjdCB0aGF0IGlzIGEgbnVtYmVyLlxuICAgKlxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gT3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5taW5dIE1pbmltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5tYXhdIE1heGltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5zdGVwXSBJbmNyZW1lbnQgYnkgd2hpY2ggdG8gY2hhbmdlIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXG4gICAqL1xuICB2YXIgTnVtYmVyQ29udHJvbGxlciA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHksIHBhcmFtcykge1xuXG4gICAgTnVtYmVyQ29udHJvbGxlci5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICBwYXJhbXMgPSBwYXJhbXMgfHwge307XG5cbiAgICB0aGlzLl9fbWluID0gcGFyYW1zLm1pbjtcbiAgICB0aGlzLl9fbWF4ID0gcGFyYW1zLm1heDtcbiAgICB0aGlzLl9fc3RlcCA9IHBhcmFtcy5zdGVwO1xuXG4gICAgaWYgKGNvbW1vbi5pc1VuZGVmaW5lZCh0aGlzLl9fc3RlcCkpIHtcblxuICAgICAgaWYgKHRoaXMuaW5pdGlhbFZhbHVlID09IDApIHtcbiAgICAgICAgdGhpcy5fX2ltcGxpZWRTdGVwID0gMTsgLy8gV2hhdCBhcmUgd2UsIHBzeWNoaWNzP1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSGV5IERvdWcsIGNoZWNrIHRoaXMgb3V0LlxuICAgICAgICB0aGlzLl9faW1wbGllZFN0ZXAgPSBNYXRoLnBvdygxMCwgTWF0aC5mbG9vcihNYXRoLmxvZyh0aGlzLmluaXRpYWxWYWx1ZSkvTWF0aC5MTjEwKSkvMTA7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aGlzLl9faW1wbGllZFN0ZXAgPSB0aGlzLl9fc3RlcDtcblxuICAgIH1cblxuICAgIHRoaXMuX19wcmVjaXNpb24gPSBudW1EZWNpbWFscyh0aGlzLl9faW1wbGllZFN0ZXApO1xuXG5cbiAgfTtcblxuICBOdW1iZXJDb250cm9sbGVyLnN1cGVyY2xhc3MgPSBDb250cm9sbGVyO1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIE51bWJlckNvbnRyb2xsZXIucHJvdG90eXBlLFxuICAgICAgQ29udHJvbGxlci5wcm90b3R5cGUsXG5cbiAgICAgIC8qKiBAbGVuZHMgZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXIucHJvdG90eXBlICovXG4gICAgICB7XG5cbiAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uKHYpIHtcblxuICAgICAgICAgIGlmICh0aGlzLl9fbWluICE9PSB1bmRlZmluZWQgJiYgdiA8IHRoaXMuX19taW4pIHtcbiAgICAgICAgICAgIHYgPSB0aGlzLl9fbWluO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fX21heCAhPT0gdW5kZWZpbmVkICYmIHYgPiB0aGlzLl9fbWF4KSB7XG4gICAgICAgICAgICB2ID0gdGhpcy5fX21heDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5fX3N0ZXAgIT09IHVuZGVmaW5lZCAmJiB2ICUgdGhpcy5fX3N0ZXAgIT0gMCkge1xuICAgICAgICAgICAgdiA9IE1hdGgucm91bmQodiAvIHRoaXMuX19zdGVwKSAqIHRoaXMuX19zdGVwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBOdW1iZXJDb250cm9sbGVyLnN1cGVyY2xhc3MucHJvdG90eXBlLnNldFZhbHVlLmNhbGwodGhpcywgdik7XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lmeSBhIG1pbmltdW0gdmFsdWUgZm9yIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gbWluVmFsdWUgVGhlIG1pbmltdW0gdmFsdWUgZm9yXG4gICAgICAgICAqIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlcn0gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgbWluOiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgdGhpcy5fX21pbiA9IHY7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZnkgYSBtYXhpbXVtIHZhbHVlIGZvciA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG1heFZhbHVlIFRoZSBtYXhpbXVtIHZhbHVlIGZvclxuICAgICAgICAgKiA8Y29kZT5vYmplY3RbcHJvcGVydHldPC9jb2RlPlxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJ9IHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIG1heDogZnVuY3Rpb24odikge1xuICAgICAgICAgIHRoaXMuX19tYXggPSB2O1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZ5IGEgc3RlcCB2YWx1ZSB0aGF0IGRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyXG4gICAgICAgICAqIGluY3JlbWVudHMgYnkuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzdGVwVmFsdWUgVGhlIHN0ZXAgdmFsdWUgZm9yXG4gICAgICAgICAqIGRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyXG4gICAgICAgICAqIEBkZWZhdWx0IGlmIG1pbmltdW0gYW5kIG1heGltdW0gc3BlY2lmaWVkIGluY3JlbWVudCBpcyAxJSBvZiB0aGVcbiAgICAgICAgICogZGlmZmVyZW5jZSBvdGhlcndpc2Ugc3RlcFZhbHVlIGlzIDFcbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyfSB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBzdGVwOiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgdGhpcy5fX3N0ZXAgPSB2O1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICApO1xuXG4gIGZ1bmN0aW9uIG51bURlY2ltYWxzKHgpIHtcbiAgICB4ID0geC50b1N0cmluZygpO1xuICAgIGlmICh4LmluZGV4T2YoJy4nKSA+IC0xKSB7XG4gICAgICByZXR1cm4geC5sZW5ndGggLSB4LmluZGV4T2YoJy4nKSAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBOdW1iZXJDb250cm9sbGVyO1xuXG59KShkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcixcbmRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyQm94ID0gKGZ1bmN0aW9uIChOdW1iZXJDb250cm9sbGVyLCBkb20sIGNvbW1vbikge1xuXG4gIC8qKlxuICAgKiBAY2xhc3MgUmVwcmVzZW50cyBhIGdpdmVuIHByb3BlcnR5IG9mIGFuIG9iamVjdCB0aGF0IGlzIGEgbnVtYmVyIGFuZFxuICAgKiBwcm92aWRlcyBhbiBpbnB1dCBlbGVtZW50IHdpdGggd2hpY2ggdG8gbWFuaXB1bGF0ZSBpdC5cbiAgICpcbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJcbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdIE9wdGlvbmFsIHBhcmFtZXRlcnNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtwYXJhbXMubWluXSBNaW5pbXVtIGFsbG93ZWQgdmFsdWVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtwYXJhbXMubWF4XSBNYXhpbXVtIGFsbG93ZWQgdmFsdWVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtwYXJhbXMuc3RlcF0gSW5jcmVtZW50IGJ5IHdoaWNoIHRvIGNoYW5nZSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xuICAgKi9cbiAgdmFyIE51bWJlckNvbnRyb2xsZXJCb3ggPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5LCBwYXJhbXMpIHtcblxuICAgIHRoaXMuX190cnVuY2F0aW9uU3VzcGVuZGVkID0gZmFsc2U7XG5cbiAgICBOdW1iZXJDb250cm9sbGVyQm94LnN1cGVyY2xhc3MuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5LCBwYXJhbXMpO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8qKlxuICAgICAqIHtOdW1iZXJ9IFByZXZpb3VzIG1vdXNlIHkgcG9zaXRpb25cbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgdmFyIHByZXZfeTtcblxuICAgIHRoaXMuX19pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGhpcy5fX2lucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XG5cbiAgICAvLyBNYWtlcyBpdCBzbyBtYW51YWxseSBzcGVjaWZpZWQgdmFsdWVzIGFyZSBub3QgdHJ1bmNhdGVkLlxuXG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAnY2hhbmdlJywgb25DaGFuZ2UpO1xuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2JsdXInLCBvbkJsdXIpO1xuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ21vdXNlZG93bicsIG9uTW91c2VEb3duKTtcbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICAvLyBXaGVuIHByZXNzaW5nIGVudGlyZSwgeW91IGNhbiBiZSBhcyBwcmVjaXNlIGFzIHlvdSB3YW50LlxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgX3RoaXMuX190cnVuY2F0aW9uU3VzcGVuZGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ibHVyKCk7XG4gICAgICAgIF90aGlzLl9fdHJ1bmNhdGlvblN1c3BlbmRlZCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBvbkNoYW5nZSgpIHtcbiAgICAgIHZhciBhdHRlbXB0ZWQgPSBwYXJzZUZsb2F0KF90aGlzLl9faW5wdXQudmFsdWUpO1xuICAgICAgaWYgKCFjb21tb24uaXNOYU4oYXR0ZW1wdGVkKSkgX3RoaXMuc2V0VmFsdWUoYXR0ZW1wdGVkKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkJsdXIoKSB7XG4gICAgICBvbkNoYW5nZSgpO1xuICAgICAgaWYgKF90aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgX3RoaXMuX19vbkZpbmlzaENoYW5nZS5jYWxsKF90aGlzLCBfdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlRG93bihlKSB7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBvbk1vdXNlRHJhZyk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZXVwJywgb25Nb3VzZVVwKTtcbiAgICAgIHByZXZfeSA9IGUuY2xpZW50WTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlRHJhZyhlKSB7XG5cbiAgICAgIHZhciBkaWZmID0gcHJldl95IC0gZS5jbGllbnRZO1xuICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuZ2V0VmFsdWUoKSArIGRpZmYgKiBfdGhpcy5fX2ltcGxpZWRTdGVwKTtcblxuICAgICAgcHJldl95ID0gZS5jbGllbnRZO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZVVwKCkge1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBvbk1vdXNlRHJhZyk7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlRGlzcGxheSgpO1xuXG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19pbnB1dCk7XG5cbiAgfTtcblxuICBOdW1iZXJDb250cm9sbGVyQm94LnN1cGVyY2xhc3MgPSBOdW1iZXJDb250cm9sbGVyO1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIE51bWJlckNvbnRyb2xsZXJCb3gucHJvdG90eXBlLFxuICAgICAgTnVtYmVyQ29udHJvbGxlci5wcm90b3R5cGUsXG5cbiAgICAgIHtcblxuICAgICAgICB1cGRhdGVEaXNwbGF5OiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIHRoaXMuX19pbnB1dC52YWx1ZSA9IHRoaXMuX190cnVuY2F0aW9uU3VzcGVuZGVkID8gdGhpcy5nZXRWYWx1ZSgpIDogcm91bmRUb0RlY2ltYWwodGhpcy5nZXRWYWx1ZSgpLCB0aGlzLl9fcHJlY2lzaW9uKTtcbiAgICAgICAgICByZXR1cm4gTnVtYmVyQ29udHJvbGxlckJveC5zdXBlcmNsYXNzLnByb3RvdHlwZS51cGRhdGVEaXNwbGF5LmNhbGwodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICk7XG5cbiAgZnVuY3Rpb24gcm91bmRUb0RlY2ltYWwodmFsdWUsIGRlY2ltYWxzKSB7XG4gICAgdmFyIHRlblRvID0gTWF0aC5wb3coMTAsIGRlY2ltYWxzKTtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIHRlblRvKSAvIHRlblRvO1xuICB9XG5cbiAgcmV0dXJuIE51bWJlckNvbnRyb2xsZXJCb3g7XG5cbn0pKGRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyLFxuZGF0LmRvbS5kb20sXG5kYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlclNsaWRlciA9IChmdW5jdGlvbiAoTnVtYmVyQ29udHJvbGxlciwgZG9tLCBjc3MsIGNvbW1vbiwgc3R5bGVTaGVldCkge1xuXG4gIC8qKlxuICAgKiBAY2xhc3MgUmVwcmVzZW50cyBhIGdpdmVuIHByb3BlcnR5IG9mIGFuIG9iamVjdCB0aGF0IGlzIGEgbnVtYmVyLCBjb250YWluc1xuICAgKiBhIG1pbmltdW0gYW5kIG1heGltdW0sIGFuZCBwcm92aWRlcyBhIHNsaWRlciBlbGVtZW50IHdpdGggd2hpY2ggdG9cbiAgICogbWFuaXB1bGF0ZSBpdC4gSXQgc2hvdWxkIGJlIG5vdGVkIHRoYXQgdGhlIHNsaWRlciBlbGVtZW50IGlzIG1hZGUgdXAgb2ZcbiAgICogPGNvZGU+Jmx0O2RpdiZndDs8L2NvZGU+IHRhZ3MsIDxzdHJvbmc+bm90PC9zdHJvbmc+IHRoZSBodG1sNVxuICAgKiA8Y29kZT4mbHQ7c2xpZGVyJmd0OzwvY29kZT4gZWxlbWVudC5cbiAgICpcbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJcbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJcbiAgICogXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtaW5WYWx1ZSBNaW5pbXVtIGFsbG93ZWQgdmFsdWVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG1heFZhbHVlIE1heGltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gc3RlcFZhbHVlIEluY3JlbWVudCBieSB3aGljaCB0byBjaGFuZ2UgdmFsdWVcbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBOdW1iZXJDb250cm9sbGVyU2xpZGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSwgbWluLCBtYXgsIHN0ZXApIHtcblxuICAgIE51bWJlckNvbnRyb2xsZXJTbGlkZXIuc3VwZXJjbGFzcy5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHksIHsgbWluOiBtaW4sIG1heDogbWF4LCBzdGVwOiBzdGVwIH0pO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuX19iYWNrZ3JvdW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fX2ZvcmVncm91bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBcblxuXG4gICAgZG9tLmJpbmQodGhpcy5fX2JhY2tncm91bmQsICdtb3VzZWRvd24nLCBvbk1vdXNlRG93bik7XG4gICAgXG4gICAgZG9tLmFkZENsYXNzKHRoaXMuX19iYWNrZ3JvdW5kLCAnc2xpZGVyJyk7XG4gICAgZG9tLmFkZENsYXNzKHRoaXMuX19mb3JlZ3JvdW5kLCAnc2xpZGVyLWZnJyk7XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlRG93bihlKSB7XG5cbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIG9uTW91c2VEcmFnKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuXG4gICAgICBvbk1vdXNlRHJhZyhlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlRHJhZyhlKSB7XG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyIG9mZnNldCA9IGRvbS5nZXRPZmZzZXQoX3RoaXMuX19iYWNrZ3JvdW5kKTtcbiAgICAgIHZhciB3aWR0aCA9IGRvbS5nZXRXaWR0aChfdGhpcy5fX2JhY2tncm91bmQpO1xuICAgICAgXG4gICAgICBfdGhpcy5zZXRWYWx1ZShcbiAgICAgICAgbWFwKGUuY2xpZW50WCwgb2Zmc2V0LmxlZnQsIG9mZnNldC5sZWZ0ICsgd2lkdGgsIF90aGlzLl9fbWluLCBfdGhpcy5fX21heClcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VVcCgpIHtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgb25Nb3VzZURyYWcpO1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZXVwJywgb25Nb3VzZVVwKTtcbiAgICAgIGlmIChfdGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgIF90aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbChfdGhpcywgX3RoaXMuZ2V0VmFsdWUoKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICB0aGlzLl9fYmFja2dyb3VuZC5hcHBlbmRDaGlsZCh0aGlzLl9fZm9yZWdyb3VuZCk7XG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19iYWNrZ3JvdW5kKTtcblxuICB9O1xuXG4gIE51bWJlckNvbnRyb2xsZXJTbGlkZXIuc3VwZXJjbGFzcyA9IE51bWJlckNvbnRyb2xsZXI7XG5cbiAgLyoqXG4gICAqIEluamVjdHMgZGVmYXVsdCBzdHlsZXNoZWV0IGZvciBzbGlkZXIgZWxlbWVudHMuXG4gICAqL1xuICBOdW1iZXJDb250cm9sbGVyU2xpZGVyLnVzZURlZmF1bHRTdHlsZXMgPSBmdW5jdGlvbigpIHtcbiAgICBjc3MuaW5qZWN0KHN0eWxlU2hlZXQpO1xuICB9O1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIE51bWJlckNvbnRyb2xsZXJTbGlkZXIucHJvdG90eXBlLFxuICAgICAgTnVtYmVyQ29udHJvbGxlci5wcm90b3R5cGUsXG5cbiAgICAgIHtcblxuICAgICAgICB1cGRhdGVEaXNwbGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgcGN0ID0gKHRoaXMuZ2V0VmFsdWUoKSAtIHRoaXMuX19taW4pLyh0aGlzLl9fbWF4IC0gdGhpcy5fX21pbik7XG4gICAgICAgICAgdGhpcy5fX2ZvcmVncm91bmQuc3R5bGUud2lkdGggPSBwY3QqMTAwKyclJztcbiAgICAgICAgICByZXR1cm4gTnVtYmVyQ29udHJvbGxlclNsaWRlci5zdXBlcmNsYXNzLnByb3RvdHlwZS51cGRhdGVEaXNwbGF5LmNhbGwodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG5cblxuICApO1xuXG4gIGZ1bmN0aW9uIG1hcCh2LCBpMSwgaTIsIG8xLCBvMikge1xuICAgIHJldHVybiBvMSArIChvMiAtIG8xKSAqICgodiAtIGkxKSAvIChpMiAtIGkxKSk7XG4gIH1cblxuICByZXR1cm4gTnVtYmVyQ29udHJvbGxlclNsaWRlcjtcbiAgXG59KShkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlcixcbmRhdC5kb20uZG9tLFxuZGF0LnV0aWxzLmNzcyxcbmRhdC51dGlscy5jb21tb24sXG5cIi5zbGlkZXIge1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xNSk7XFxuICBoZWlnaHQ6IDFlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDFlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XFxuICBwYWRkaW5nOiAwIDAuNWVtO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuLnNsaWRlci1mZyB7XFxuICBwYWRkaW5nOiAxcHggMCAycHggMDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNhYWE7XFxuICBoZWlnaHQ6IDFlbTtcXG4gIG1hcmdpbi1sZWZ0OiAtMC41ZW07XFxuICBwYWRkaW5nLXJpZ2h0OiAwLjVlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDFlbSAwIDAgMWVtO1xcbn1cXG5cXG4uc2xpZGVyLWZnOmFmdGVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGJvcmRlci1yYWRpdXM6IDFlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBib3JkZXI6ICAxcHggc29saWQgI2FhYTtcXG4gIGNvbnRlbnQ6ICcnO1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgbWFyZ2luLXJpZ2h0OiAtMWVtO1xcbiAgbWFyZ2luLXRvcDogLTFweDtcXG4gIGhlaWdodDogMC45ZW07XFxuICB3aWR0aDogMC45ZW07XFxufVwiKTtcblxuXG5kYXQuY29udHJvbGxlcnMuRnVuY3Rpb25Db250cm9sbGVyID0gKGZ1bmN0aW9uIChDb250cm9sbGVyLCBkb20sIGNvbW1vbikge1xuXG4gIC8qKlxuICAgKiBAY2xhc3MgUHJvdmlkZXMgYSBHVUkgaW50ZXJmYWNlIHRvIGZpcmUgYSBzcGVjaWZpZWQgbWV0aG9kLCBhIHByb3BlcnR5IG9mIGFuIG9iamVjdC5cbiAgICpcbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBGdW5jdGlvbkNvbnRyb2xsZXIgPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5LCB0ZXh0KSB7XG5cbiAgICBGdW5jdGlvbkNvbnRyb2xsZXIuc3VwZXJjbGFzcy5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuX19idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9fYnV0dG9uLmlubmVySFRNTCA9IHRleHQgPT09IHVuZGVmaW5lZCA/ICdGaXJlJyA6IHRleHQ7XG4gICAgZG9tLmJpbmQodGhpcy5fX2J1dHRvbiwgJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgX3RoaXMuZmlyZSgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgZG9tLmFkZENsYXNzKHRoaXMuX19idXR0b24sICdidXR0b24nKTtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9fYnV0dG9uKTtcblxuXG4gIH07XG5cbiAgRnVuY3Rpb25Db250cm9sbGVyLnN1cGVyY2xhc3MgPSBDb250cm9sbGVyO1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIEZ1bmN0aW9uQ29udHJvbGxlci5wcm90b3R5cGUsXG4gICAgICBDb250cm9sbGVyLnByb3RvdHlwZSxcbiAgICAgIHtcbiAgICAgICAgXG4gICAgICAgIGZpcmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICh0aGlzLl9fb25DaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX19vbkNoYW5nZS5jYWxsKHRoaXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbCh0aGlzLCB0aGlzLmdldFZhbHVlKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmdldFZhbHVlKCkuY2FsbCh0aGlzLm9iamVjdCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICApO1xuXG4gIHJldHVybiBGdW5jdGlvbkNvbnRyb2xsZXI7XG5cbn0pKGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLFxuZGF0LmRvbS5kb20sXG5kYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuY29udHJvbGxlcnMuQm9vbGVhbkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKENvbnRyb2xsZXIsIGRvbSwgY29tbW9uKSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBQcm92aWRlcyBhIGNoZWNrYm94IGlucHV0IHRvIGFsdGVyIHRoZSBib29sZWFuIHByb3BlcnR5IG9mIGFuIG9iamVjdC5cbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBCb29sZWFuQ29udHJvbGxlciA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcblxuICAgIEJvb2xlYW5Db250cm9sbGVyLnN1cGVyY2xhc3MuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KTtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy5fX3ByZXYgPSB0aGlzLmdldFZhbHVlKCk7XG5cbiAgICB0aGlzLl9fY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRoaXMuX19jaGVja2JveC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcblxuXG4gICAgZG9tLmJpbmQodGhpcy5fX2NoZWNrYm94LCAnY2hhbmdlJywgb25DaGFuZ2UsIGZhbHNlKTtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9fY2hlY2tib3gpO1xuXG4gICAgLy8gTWF0Y2ggb3JpZ2luYWwgdmFsdWVcbiAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcblxuICAgIGZ1bmN0aW9uIG9uQ2hhbmdlKCkge1xuICAgICAgX3RoaXMuc2V0VmFsdWUoIV90aGlzLl9fcHJldik7XG4gICAgfVxuXG4gIH07XG5cbiAgQm9vbGVhbkNvbnRyb2xsZXIuc3VwZXJjbGFzcyA9IENvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgQm9vbGVhbkNvbnRyb2xsZXIucHJvdG90eXBlLFxuICAgICAgQ29udHJvbGxlci5wcm90b3R5cGUsXG5cbiAgICAgIHtcblxuICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24odikge1xuICAgICAgICAgIHZhciB0b1JldHVybiA9IEJvb2xlYW5Db250cm9sbGVyLnN1cGVyY2xhc3MucHJvdG90eXBlLnNldFZhbHVlLmNhbGwodGhpcywgdik7XG4gICAgICAgICAgaWYgKHRoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwodGhpcywgdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fX3ByZXYgPSB0aGlzLmdldFZhbHVlKCk7XG4gICAgICAgICAgcmV0dXJuIHRvUmV0dXJuO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIFxuICAgICAgICAgIGlmICh0aGlzLmdldFZhbHVlKCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuX19jaGVja2JveC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xuICAgICAgICAgICAgdGhpcy5fX2NoZWNrYm94LmNoZWNrZWQgPSB0cnVlOyAgICBcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLl9fY2hlY2tib3guY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBCb29sZWFuQ29udHJvbGxlci5zdXBlcmNsYXNzLnByb3RvdHlwZS51cGRhdGVEaXNwbGF5LmNhbGwodGhpcyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgIH1cblxuICApO1xuXG4gIHJldHVybiBCb29sZWFuQ29udHJvbGxlcjtcblxufSkoZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIsXG5kYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5jb2xvci50b1N0cmluZyA9IChmdW5jdGlvbiAoY29tbW9uKSB7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbG9yKSB7XG5cbiAgICBpZiAoY29sb3IuYSA9PSAxIHx8IGNvbW1vbi5pc1VuZGVmaW5lZChjb2xvci5hKSkge1xuXG4gICAgICB2YXIgcyA9IGNvbG9yLmhleC50b1N0cmluZygxNik7XG4gICAgICB3aGlsZSAocy5sZW5ndGggPCA2KSB7XG4gICAgICAgIHMgPSAnMCcgKyBzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJyMnICsgcztcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiAncmdiYSgnICsgTWF0aC5yb3VuZChjb2xvci5yKSArICcsJyArIE1hdGgucm91bmQoY29sb3IuZykgKyAnLCcgKyBNYXRoLnJvdW5kKGNvbG9yLmIpICsgJywnICsgY29sb3IuYSArICcpJztcblxuICAgIH1cblxuICB9XG5cbn0pKGRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5jb2xvci5pbnRlcnByZXQgPSAoZnVuY3Rpb24gKHRvU3RyaW5nLCBjb21tb24pIHtcblxuICB2YXIgcmVzdWx0LCB0b1JldHVybjtcblxuICB2YXIgaW50ZXJwcmV0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0b1JldHVybiA9IGZhbHNlO1xuXG4gICAgdmFyIG9yaWdpbmFsID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBjb21tb24udG9BcnJheShhcmd1bWVudHMpIDogYXJndW1lbnRzWzBdO1xuXG4gICAgY29tbW9uLmVhY2goSU5URVJQUkVUQVRJT05TLCBmdW5jdGlvbihmYW1pbHkpIHtcblxuICAgICAgaWYgKGZhbWlseS5saXRtdXMob3JpZ2luYWwpKSB7XG5cbiAgICAgICAgY29tbW9uLmVhY2goZmFtaWx5LmNvbnZlcnNpb25zLCBmdW5jdGlvbihjb252ZXJzaW9uLCBjb252ZXJzaW9uTmFtZSkge1xuXG4gICAgICAgICAgcmVzdWx0ID0gY29udmVyc2lvbi5yZWFkKG9yaWdpbmFsKTtcblxuICAgICAgICAgIGlmICh0b1JldHVybiA9PT0gZmFsc2UgJiYgcmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgdG9SZXR1cm4gPSByZXN1bHQ7XG4gICAgICAgICAgICByZXN1bHQuY29udmVyc2lvbk5hbWUgPSBjb252ZXJzaW9uTmFtZTtcbiAgICAgICAgICAgIHJlc3VsdC5jb252ZXJzaW9uID0gY29udmVyc2lvbjtcbiAgICAgICAgICAgIHJldHVybiBjb21tb24uQlJFQUs7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGNvbW1vbi5CUkVBSztcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9SZXR1cm47XG5cbiAgfTtcblxuICB2YXIgSU5URVJQUkVUQVRJT05TID0gW1xuXG4gICAgLy8gU3RyaW5nc1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNTdHJpbmcsXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgVEhSRUVfQ0hBUl9IRVg6IHtcblxuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL14jKFtBLUYwLTldKShbQS1GMC05XSkoW0EtRjAtOV0pJC9pKTtcbiAgICAgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnSEVYJyxcbiAgICAgICAgICAgICAgaGV4OiBwYXJzZUludChcbiAgICAgICAgICAgICAgICAgICcweCcgK1xuICAgICAgICAgICAgICAgICAgICAgIHRlc3RbMV0udG9TdHJpbmcoKSArIHRlc3RbMV0udG9TdHJpbmcoKSArXG4gICAgICAgICAgICAgICAgICAgICAgdGVzdFsyXS50b1N0cmluZygpICsgdGVzdFsyXS50b1N0cmluZygpICtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXN0WzNdLnRvU3RyaW5nKCkgKyB0ZXN0WzNdLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgU0lYX0NIQVJfSEVYOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9eIyhbQS1GMC05XXs2fSkkL2kpO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdIRVgnLFxuICAgICAgICAgICAgICBoZXg6IHBhcnNlSW50KCcweCcgKyB0ZXN0WzFdLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgQ1NTX1JHQjoge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXnJnYlxcKFxccyooLispXFxzKixcXHMqKC4rKVxccyosXFxzKiguKylcXHMqXFwpLyk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IHBhcnNlRmxvYXQodGVzdFsxXSksXG4gICAgICAgICAgICAgIGc6IHBhcnNlRmxvYXQodGVzdFsyXSksXG4gICAgICAgICAgICAgIGI6IHBhcnNlRmxvYXQodGVzdFszXSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfSxcblxuICAgICAgICBDU1NfUkdCQToge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXnJnYmFcXChcXHMqKC4rKVxccyosXFxzKiguKylcXHMqLFxccyooLispXFxzKlxcLFxccyooLispXFxzKlxcKS8pO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBwYXJzZUZsb2F0KHRlc3RbMV0pLFxuICAgICAgICAgICAgICBnOiBwYXJzZUZsb2F0KHRlc3RbMl0pLFxuICAgICAgICAgICAgICBiOiBwYXJzZUZsb2F0KHRlc3RbM10pLFxuICAgICAgICAgICAgICBhOiBwYXJzZUZsb2F0KHRlc3RbNF0pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8vIE51bWJlcnNcbiAgICB7XG5cbiAgICAgIGxpdG11czogY29tbW9uLmlzTnVtYmVyLFxuXG4gICAgICBjb252ZXJzaW9uczoge1xuXG4gICAgICAgIEhFWDoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ0hFWCcsXG4gICAgICAgICAgICAgIGhleDogb3JpZ2luYWwsXG4gICAgICAgICAgICAgIGNvbnZlcnNpb25OYW1lOiAnSEVYJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBjb2xvci5oZXg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvLyBBcnJheXNcbiAgICB7XG5cbiAgICAgIGxpdG11czogY29tbW9uLmlzQXJyYXksXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgUkdCX0FSUkFZOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbC5sZW5ndGggIT0gMykgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBvcmlnaW5hbFswXSxcbiAgICAgICAgICAgICAgZzogb3JpZ2luYWxbMV0sXG4gICAgICAgICAgICAgIGI6IG9yaWdpbmFsWzJdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBbY29sb3IuciwgY29sb3IuZywgY29sb3IuYl07XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgUkdCQV9BUlJBWToge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAob3JpZ2luYWwubGVuZ3RoICE9IDQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgcjogb3JpZ2luYWxbMF0sXG4gICAgICAgICAgICAgIGc6IG9yaWdpbmFsWzFdLFxuICAgICAgICAgICAgICBiOiBvcmlnaW5hbFsyXSxcbiAgICAgICAgICAgICAgYTogb3JpZ2luYWxbM11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIFtjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iLCBjb2xvci5hXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gT2JqZWN0c1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNPYmplY3QsXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgUkdCQV9PQko6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5yKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5nKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5iKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5hKSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgICByOiBvcmlnaW5hbC5yLFxuICAgICAgICAgICAgICAgIGc6IG9yaWdpbmFsLmcsXG4gICAgICAgICAgICAgICAgYjogb3JpZ2luYWwuYixcbiAgICAgICAgICAgICAgICBhOiBvcmlnaW5hbC5hXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICByOiBjb2xvci5yLFxuICAgICAgICAgICAgICBnOiBjb2xvci5nLFxuICAgICAgICAgICAgICBiOiBjb2xvci5iLFxuICAgICAgICAgICAgICBhOiBjb2xvci5hXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIFJHQl9PQko6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5yKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5nKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5iKSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgICByOiBvcmlnaW5hbC5yLFxuICAgICAgICAgICAgICAgIGc6IG9yaWdpbmFsLmcsXG4gICAgICAgICAgICAgICAgYjogb3JpZ2luYWwuYlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgcjogY29sb3IucixcbiAgICAgICAgICAgICAgZzogY29sb3IuZyxcbiAgICAgICAgICAgICAgYjogY29sb3IuYlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBIU1ZBX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmgpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnMpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnYpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmEpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdIU1YnLFxuICAgICAgICAgICAgICAgIGg6IG9yaWdpbmFsLmgsXG4gICAgICAgICAgICAgICAgczogb3JpZ2luYWwucyxcbiAgICAgICAgICAgICAgICB2OiBvcmlnaW5hbC52LFxuICAgICAgICAgICAgICAgIGE6IG9yaWdpbmFsLmFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGg6IGNvbG9yLmgsXG4gICAgICAgICAgICAgIHM6IGNvbG9yLnMsXG4gICAgICAgICAgICAgIHY6IGNvbG9yLnYsXG4gICAgICAgICAgICAgIGE6IGNvbG9yLmFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgSFNWX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmgpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnMpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnYpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdIU1YnLFxuICAgICAgICAgICAgICAgIGg6IG9yaWdpbmFsLmgsXG4gICAgICAgICAgICAgICAgczogb3JpZ2luYWwucyxcbiAgICAgICAgICAgICAgICB2OiBvcmlnaW5hbC52XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBoOiBjb2xvci5oLFxuICAgICAgICAgICAgICBzOiBjb2xvci5zLFxuICAgICAgICAgICAgICB2OiBjb2xvci52XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfVxuXG5cbiAgXTtcblxuICByZXR1cm4gaW50ZXJwcmV0O1xuXG5cbn0pKGRhdC5jb2xvci50b1N0cmluZyxcbmRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5HVUkgPSBkYXQuZ3VpLkdVSSA9IChmdW5jdGlvbiAoY3NzLCBzYXZlRGlhbG9ndWVDb250ZW50cywgc3R5bGVTaGVldCwgY29udHJvbGxlckZhY3RvcnksIENvbnRyb2xsZXIsIEJvb2xlYW5Db250cm9sbGVyLCBGdW5jdGlvbkNvbnRyb2xsZXIsIE51bWJlckNvbnRyb2xsZXJCb3gsIE51bWJlckNvbnRyb2xsZXJTbGlkZXIsIE9wdGlvbkNvbnRyb2xsZXIsIENvbG9yQ29udHJvbGxlciwgcmVxdWVzdEFuaW1hdGlvbkZyYW1lLCBDZW50ZXJlZERpdiwgZG9tLCBjb21tb24pIHtcblxuICBjc3MuaW5qZWN0KHN0eWxlU2hlZXQpO1xuXG4gIC8qKiBPdXRlci1tb3N0IGNsYXNzTmFtZSBmb3IgR1VJJ3MgKi9cbiAgdmFyIENTU19OQU1FU1BBQ0UgPSAnZGcnO1xuXG4gIHZhciBISURFX0tFWV9DT0RFID0gNzI7XG5cbiAgLyoqIFRoZSBvbmx5IHZhbHVlIHNoYXJlZCBiZXR3ZWVuIHRoZSBKUyBhbmQgU0NTUy4gVXNlIGNhdXRpb24uICovXG4gIHZhciBDTE9TRV9CVVRUT05fSEVJR0hUID0gMjA7XG5cbiAgdmFyIERFRkFVTFRfREVGQVVMVF9QUkVTRVRfTkFNRSA9ICdEZWZhdWx0JztcblxuICB2YXIgU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSA9IChmdW5jdGlvbigpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuICdsb2NhbFN0b3JhZ2UnIGluIHdpbmRvdyAmJiB3aW5kb3dbJ2xvY2FsU3RvcmFnZSddICE9PSBudWxsO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pKCk7XG5cbiAgdmFyIFNBVkVfRElBTE9HVUU7XG5cbiAgLyoqIEhhdmUgd2UgeWV0IHRvIGNyZWF0ZSBhbiBhdXRvUGxhY2UgR1VJPyAqL1xuICB2YXIgYXV0b19wbGFjZV92aXJnaW4gPSB0cnVlO1xuXG4gIC8qKiBGaXhlZCBwb3NpdGlvbiBkaXYgdGhhdCBhdXRvIHBsYWNlIEdVSSdzIGdvIGluc2lkZSAqL1xuICB2YXIgYXV0b19wbGFjZV9jb250YWluZXI7XG5cbiAgLyoqIEFyZSB3ZSBoaWRpbmcgdGhlIEdVSSdzID8gKi9cbiAgdmFyIGhpZGUgPSBmYWxzZTtcblxuICAvKiogR1VJJ3Mgd2hpY2ggc2hvdWxkIGJlIGhpZGRlbiAqL1xuICB2YXIgaGlkZWFibGVfZ3VpcyA9IFtdO1xuXG4gIC8qKlxuICAgKiBBIGxpZ2h0d2VpZ2h0IGNvbnRyb2xsZXIgbGlicmFyeSBmb3IgSmF2YVNjcmlwdC4gSXQgYWxsb3dzIHlvdSB0byBlYXNpbHlcbiAgICogbWFuaXB1bGF0ZSB2YXJpYWJsZXMgYW5kIGZpcmUgZnVuY3Rpb25zIG9uIHRoZSBmbHkuXG4gICAqIEBjbGFzc1xuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5ndWlcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbcGFyYW1zLm5hbWVdIFRoZSBuYW1lIG9mIHRoaXMgR1VJLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtcy5sb2FkXSBKU09OIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHNhdmVkIHN0YXRlIG9mXG4gICAqIHRoaXMgR1VJLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtwYXJhbXMuYXV0bz10cnVlXVxuICAgKiBAcGFyYW0ge2RhdC5ndWkuR1VJfSBbcGFyYW1zLnBhcmVudF0gVGhlIEdVSSBJJ20gbmVzdGVkIGluLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtwYXJhbXMuY2xvc2VkXSBJZiB0cnVlLCBzdGFydHMgY2xvc2VkXG4gICAqL1xuICB2YXIgR1VJID0gZnVuY3Rpb24ocGFyYW1zKSB7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLyoqXG4gICAgICogT3V0ZXJtb3N0IERPTSBFbGVtZW50XG4gICAgICogQHR5cGUgRE9NRWxlbWVudFxuICAgICAqL1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX191bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX191bCk7XG5cbiAgICBkb20uYWRkQ2xhc3ModGhpcy5kb21FbGVtZW50LCBDU1NfTkFNRVNQQUNFKTtcblxuICAgIC8qKlxuICAgICAqIE5lc3RlZCBHVUkncyBieSBuYW1lXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHRoaXMuX19mb2xkZXJzID0ge307XG5cbiAgICB0aGlzLl9fY29udHJvbGxlcnMgPSBbXTtcblxuICAgIC8qKlxuICAgICAqIExpc3Qgb2Ygb2JqZWN0cyBJJ20gcmVtZW1iZXJpbmcgZm9yIHNhdmUsIG9ubHkgdXNlZCBpbiB0b3AgbGV2ZWwgR1VJXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHRoaXMuX19yZW1lbWJlcmVkT2JqZWN0cyA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogTWFwcyB0aGUgaW5kZXggb2YgcmVtZW1iZXJlZCBvYmplY3RzIHRvIGEgbWFwIG9mIGNvbnRyb2xsZXJzLCBvbmx5IHVzZWRcbiAgICAgKiBpbiB0b3AgbGV2ZWwgR1VJLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAaWdub3JlXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIFtcbiAgICAgKiAge1xuICAgICAqICAgIHByb3BlcnR5TmFtZTogQ29udHJvbGxlcixcbiAgICAgKiAgICBhbm90aGVyUHJvcGVydHlOYW1lOiBDb250cm9sbGVyXG4gICAgICogIH0sXG4gICAgICogIHtcbiAgICAgKiAgICBwcm9wZXJ0eU5hbWU6IENvbnRyb2xsZXJcbiAgICAgKiAgfVxuICAgICAqIF1cbiAgICAgKi9cbiAgICB0aGlzLl9fcmVtZW1iZXJlZE9iamVjdEluZGVjZXNUb0NvbnRyb2xsZXJzID0gW107XG5cbiAgICB0aGlzLl9fbGlzdGVuaW5nID0gW107XG5cbiAgICBwYXJhbXMgPSBwYXJhbXMgfHwge307XG5cbiAgICAvLyBEZWZhdWx0IHBhcmFtZXRlcnNcbiAgICBwYXJhbXMgPSBjb21tb24uZGVmYXVsdHMocGFyYW1zLCB7XG4gICAgICBhdXRvUGxhY2U6IHRydWUsXG4gICAgICB3aWR0aDogR1VJLkRFRkFVTFRfV0lEVEhcbiAgICB9KTtcblxuICAgIHBhcmFtcyA9IGNvbW1vbi5kZWZhdWx0cyhwYXJhbXMsIHtcbiAgICAgIHJlc2l6YWJsZTogcGFyYW1zLmF1dG9QbGFjZSxcbiAgICAgIGhpZGVhYmxlOiBwYXJhbXMuYXV0b1BsYWNlXG4gICAgfSk7XG5cblxuICAgIGlmICghY29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5sb2FkKSkge1xuXG4gICAgICAvLyBFeHBsaWNpdCBwcmVzZXRcbiAgICAgIGlmIChwYXJhbXMucHJlc2V0KSBwYXJhbXMubG9hZC5wcmVzZXQgPSBwYXJhbXMucHJlc2V0O1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcGFyYW1zLmxvYWQgPSB7IHByZXNldDogREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FIH07XG5cbiAgICB9XG5cbiAgICBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5wYXJlbnQpICYmIHBhcmFtcy5oaWRlYWJsZSkge1xuICAgICAgaGlkZWFibGVfZ3Vpcy5wdXNoKHRoaXMpO1xuICAgIH1cblxuICAgIC8vIE9ubHkgcm9vdCBsZXZlbCBHVUkncyBhcmUgcmVzaXphYmxlLlxuICAgIHBhcmFtcy5yZXNpemFibGUgPSBjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLnBhcmVudCkgJiYgcGFyYW1zLnJlc2l6YWJsZTtcblxuXG4gICAgaWYgKHBhcmFtcy5hdXRvUGxhY2UgJiYgY29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5zY3JvbGxhYmxlKSkge1xuICAgICAgcGFyYW1zLnNjcm9sbGFibGUgPSB0cnVlO1xuICAgIH1cbi8vICAgIHBhcmFtcy5zY3JvbGxhYmxlID0gY29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5wYXJlbnQpICYmIHBhcmFtcy5zY3JvbGxhYmxlID09PSB0cnVlO1xuXG4gICAgLy8gTm90IHBhcnQgb2YgcGFyYW1zIGJlY2F1c2UgSSBkb24ndCB3YW50IHBlb3BsZSBwYXNzaW5nIHRoaXMgaW4gdmlhXG4gICAgLy8gY29uc3RydWN0b3IuIFNob3VsZCBiZSBhICdyZW1lbWJlcmVkJyB2YWx1ZS5cbiAgICB2YXIgdXNlX2xvY2FsX3N0b3JhZ2UgPVxuICAgICAgICBTVVBQT1JUU19MT0NBTF9TVE9SQUdFICYmXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKHRoaXMsICdpc0xvY2FsJykpID09PSAndHJ1ZSc7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLFxuXG4gICAgICAgIC8qKiBAbGVuZHMgZGF0Lmd1aS5HVUkucHJvdG90eXBlICovXG4gICAgICAgIHtcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFRoZSBwYXJlbnQgPGNvZGU+R1VJPC9jb2RlPlxuICAgICAgICAgICAqIEB0eXBlIGRhdC5ndWkuR1VJXG4gICAgICAgICAgICovXG4gICAgICAgICAgcGFyZW50OiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLnBhcmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc2Nyb2xsYWJsZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5zY3JvbGxhYmxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBIYW5kbGVzIDxjb2RlPkdVSTwvY29kZT4ncyBlbGVtZW50IHBsYWNlbWVudCBmb3IgeW91XG4gICAgICAgICAgICogQHR5cGUgQm9vbGVhblxuICAgICAgICAgICAqL1xuICAgICAgICAgIGF1dG9QbGFjZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5hdXRvUGxhY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFRoZSBpZGVudGlmaWVyIGZvciBhIHNldCBvZiBzYXZlZCB2YWx1ZXNcbiAgICAgICAgICAgKiBAdHlwZSBTdHJpbmdcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBwcmVzZXQ6IHtcblxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKF90aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5nZXRSb290KCkucHJlc2V0O1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbXMubG9hZC5wcmVzZXQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICBpZiAoX3RoaXMucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0Um9vdCgpLnByZXNldCA9IHY7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmxvYWQucHJlc2V0ID0gdjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzZXRQcmVzZXRTZWxlY3RJbmRleCh0aGlzKTtcbiAgICAgICAgICAgICAgX3RoaXMucmV2ZXJ0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogVGhlIHdpZHRoIG9mIDxjb2RlPkdVSTwvY29kZT4gZWxlbWVudFxuICAgICAgICAgICAqIEB0eXBlIE51bWJlclxuICAgICAgICAgICAqL1xuICAgICAgICAgIHdpZHRoOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLndpZHRoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICBwYXJhbXMud2lkdGggPSB2O1xuICAgICAgICAgICAgICBzZXRXaWR0aChfdGhpcywgdik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFRoZSBuYW1lIG9mIDxjb2RlPkdVSTwvY29kZT4uIFVzZWQgZm9yIGZvbGRlcnMuIGkuZVxuICAgICAgICAgICAqIGEgZm9sZGVyJ3MgbmFtZVxuICAgICAgICAgICAqIEB0eXBlIFN0cmluZ1xuICAgICAgICAgICAqL1xuICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJhbXMubmFtZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgICAgLy8gVE9ETyBDaGVjayBmb3IgY29sbGlzaW9ucyBhbW9uZyBzaWJsaW5nIGZvbGRlcnNcbiAgICAgICAgICAgICAgcGFyYW1zLm5hbWUgPSB2O1xuICAgICAgICAgICAgICBpZiAodGl0bGVfcm93X25hbWUpIHtcbiAgICAgICAgICAgICAgICB0aXRsZV9yb3dfbmFtZS5pbm5lckhUTUwgPSBwYXJhbXMubmFtZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBXaGV0aGVyIHRoZSA8Y29kZT5HVUk8L2NvZGU+IGlzIGNvbGxhcHNlZCBvciBub3RcbiAgICAgICAgICAgKiBAdHlwZSBCb29sZWFuXG4gICAgICAgICAgICovXG4gICAgICAgICAgY2xvc2VkOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLmNsb3NlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgICAgcGFyYW1zLmNsb3NlZCA9IHY7XG4gICAgICAgICAgICAgIGlmIChwYXJhbXMuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgZG9tLmFkZENsYXNzKF90aGlzLl9fdWwsIEdVSS5DTEFTU19DTE9TRUQpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5yZW1vdmVDbGFzcyhfdGhpcy5fX3VsLCBHVUkuQ0xBU1NfQ0xPU0VEKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBGb3IgYnJvd3NlcnMgdGhhdCBhcmVuJ3QgZ29pbmcgdG8gcmVzcGVjdCB0aGUgQ1NTIHRyYW5zaXRpb24sXG4gICAgICAgICAgICAgIC8vIExldHMganVzdCBjaGVjayBvdXIgaGVpZ2h0IGFnYWluc3QgdGhlIHdpbmRvdyBoZWlnaHQgcmlnaHQgb2ZmXG4gICAgICAgICAgICAgIC8vIHRoZSBiYXQuXG4gICAgICAgICAgICAgIHRoaXMub25SZXNpemUoKTtcblxuICAgICAgICAgICAgICBpZiAoX3RoaXMuX19jbG9zZUJ1dHRvbikge1xuICAgICAgICAgICAgICAgIF90aGlzLl9fY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gdiA/IEdVSS5URVhUX09QRU4gOiBHVUkuVEVYVF9DTE9TRUQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogQ29udGFpbnMgYWxsIHByZXNldHNcbiAgICAgICAgICAgKiBAdHlwZSBPYmplY3RcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBsb2FkOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLmxvYWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgdG8gdXNlIDxhIGhyZWY9XCJodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9ET00vU3RvcmFnZSNsb2NhbFN0b3JhZ2VcIj5sb2NhbFN0b3JhZ2U8L2E+IGFzIHRoZSBtZWFucyBmb3JcbiAgICAgICAgICAgKiA8Y29kZT5yZW1lbWJlcjwvY29kZT5pbmdcbiAgICAgICAgICAgKiBAdHlwZSBCb29sZWFuXG4gICAgICAgICAgICovXG4gICAgICAgICAgdXNlTG9jYWxTdG9yYWdlOiB7XG5cbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1c2VfbG9jYWxfc3RvcmFnZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKGJvb2wpIHtcbiAgICAgICAgICAgICAgaWYgKFNVUFBPUlRTX0xPQ0FMX1NUT1JBR0UpIHtcbiAgICAgICAgICAgICAgICB1c2VfbG9jYWxfc3RvcmFnZSA9IGJvb2w7XG4gICAgICAgICAgICAgICAgaWYgKGJvb2wpIHtcbiAgICAgICAgICAgICAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ3VubG9hZCcsIHNhdmVUb0xvY2FsU3RvcmFnZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGRvbS51bmJpbmQod2luZG93LCAndW5sb2FkJywgc2F2ZVRvTG9jYWxTdG9yYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaChfdGhpcywgJ2lzTG9jYWwnKSwgYm9vbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgIC8vIEFyZSB3ZSBhIHJvb3QgbGV2ZWwgR1VJP1xuICAgIGlmIChjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLnBhcmVudCkpIHtcblxuICAgICAgcGFyYW1zLmNsb3NlZCA9IGZhbHNlO1xuXG4gICAgICBkb20uYWRkQ2xhc3ModGhpcy5kb21FbGVtZW50LCBHVUkuQ0xBU1NfTUFJTik7XG4gICAgICBkb20ubWFrZVNlbGVjdGFibGUodGhpcy5kb21FbGVtZW50LCBmYWxzZSk7XG5cbiAgICAgIC8vIEFyZSB3ZSBzdXBwb3NlZCB0byBiZSBsb2FkaW5nIGxvY2FsbHk/XG4gICAgICBpZiAoU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSkge1xuXG4gICAgICAgIGlmICh1c2VfbG9jYWxfc3RvcmFnZSkge1xuXG4gICAgICAgICAgX3RoaXMudXNlTG9jYWxTdG9yYWdlID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBzYXZlZF9ndWkgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKHRoaXMsICdndWknKSk7XG5cbiAgICAgICAgICBpZiAoc2F2ZWRfZ3VpKSB7XG4gICAgICAgICAgICBwYXJhbXMubG9hZCA9IEpTT04ucGFyc2Uoc2F2ZWRfZ3VpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX19jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGhpcy5fX2Nsb3NlQnV0dG9uLmlubmVySFRNTCA9IEdVSS5URVhUX0NMT1NFRDtcbiAgICAgIGRvbS5hZGRDbGFzcyh0aGlzLl9fY2xvc2VCdXR0b24sIEdVSS5DTEFTU19DTE9TRV9CVVRUT04pO1xuICAgICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19jbG9zZUJ1dHRvbik7XG5cbiAgICAgIGRvbS5iaW5kKHRoaXMuX19jbG9zZUJ1dHRvbiwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgX3RoaXMuY2xvc2VkID0gIV90aGlzLmNsb3NlZDtcblxuXG4gICAgICB9KTtcblxuXG4gICAgICAvLyBPaCwgeW91J3JlIGEgbmVzdGVkIEdVSSFcbiAgICB9IGVsc2Uge1xuXG4gICAgICBpZiAocGFyYW1zLmNsb3NlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBhcmFtcy5jbG9zZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGl0bGVfcm93X25hbWUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwYXJhbXMubmFtZSk7XG4gICAgICBkb20uYWRkQ2xhc3ModGl0bGVfcm93X25hbWUsICdjb250cm9sbGVyLW5hbWUnKTtcblxuICAgICAgdmFyIHRpdGxlX3JvdyA9IGFkZFJvdyhfdGhpcywgdGl0bGVfcm93X25hbWUpO1xuXG4gICAgICB2YXIgb25fY2xpY2tfdGl0bGUgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgX3RoaXMuY2xvc2VkID0gIV90aGlzLmNsb3NlZDtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfTtcblxuICAgICAgZG9tLmFkZENsYXNzKHRoaXMuX191bCwgR1VJLkNMQVNTX0NMT1NFRCk7XG5cbiAgICAgIGRvbS5hZGRDbGFzcyh0aXRsZV9yb3csICd0aXRsZScpO1xuICAgICAgZG9tLmJpbmQodGl0bGVfcm93LCAnY2xpY2snLCBvbl9jbGlja190aXRsZSk7XG5cbiAgICAgIGlmICghcGFyYW1zLmNsb3NlZCkge1xuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcy5hdXRvUGxhY2UpIHtcblxuICAgICAgaWYgKGNvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMucGFyZW50KSkge1xuXG4gICAgICAgIGlmIChhdXRvX3BsYWNlX3Zpcmdpbikge1xuICAgICAgICAgIGF1dG9fcGxhY2VfY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgZG9tLmFkZENsYXNzKGF1dG9fcGxhY2VfY29udGFpbmVyLCBDU1NfTkFNRVNQQUNFKTtcbiAgICAgICAgICBkb20uYWRkQ2xhc3MoYXV0b19wbGFjZV9jb250YWluZXIsIEdVSS5DTEFTU19BVVRPX1BMQUNFX0NPTlRBSU5FUik7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhdXRvX3BsYWNlX2NvbnRhaW5lcik7XG4gICAgICAgICAgYXV0b19wbGFjZV92aXJnaW4gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFB1dCBpdCBpbiB0aGUgZG9tIGZvciB5b3UuXG4gICAgICAgIGF1dG9fcGxhY2VfY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZG9tRWxlbWVudCk7XG5cbiAgICAgICAgLy8gQXBwbHkgdGhlIGF1dG8gc3R5bGVzXG4gICAgICAgIGRvbS5hZGRDbGFzcyh0aGlzLmRvbUVsZW1lbnQsIEdVSS5DTEFTU19BVVRPX1BMQUNFKTtcblxuICAgICAgfVxuXG5cbiAgICAgIC8vIE1ha2UgaXQgbm90IGVsYXN0aWMuXG4gICAgICBpZiAoIXRoaXMucGFyZW50KSBzZXRXaWR0aChfdGhpcywgcGFyYW1zLndpZHRoKTtcblxuICAgIH1cblxuICAgIGRvbS5iaW5kKHdpbmRvdywgJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkgeyBfdGhpcy5vblJlc2l6ZSgpIH0pO1xuICAgIGRvbS5iaW5kKHRoaXMuX191bCwgJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBmdW5jdGlvbigpIHsgX3RoaXMub25SZXNpemUoKTsgfSk7XG4gICAgZG9tLmJpbmQodGhpcy5fX3VsLCAndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKCkgeyBfdGhpcy5vblJlc2l6ZSgpIH0pO1xuICAgIGRvbS5iaW5kKHRoaXMuX191bCwgJ29UcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24oKSB7IF90aGlzLm9uUmVzaXplKCkgfSk7XG4gICAgdGhpcy5vblJlc2l6ZSgpO1xuXG5cbiAgICBpZiAocGFyYW1zLnJlc2l6YWJsZSkge1xuICAgICAgYWRkUmVzaXplSGFuZGxlKHRoaXMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNhdmVUb0xvY2FsU3RvcmFnZSgpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGdldExvY2FsU3RvcmFnZUhhc2goX3RoaXMsICdndWknKSwgSlNPTi5zdHJpbmdpZnkoX3RoaXMuZ2V0U2F2ZU9iamVjdCgpKSk7XG4gICAgfVxuXG4gICAgdmFyIHJvb3QgPSBfdGhpcy5nZXRSb290KCk7XG4gICAgZnVuY3Rpb24gcmVzZXRXaWR0aCgpIHtcbiAgICAgICAgdmFyIHJvb3QgPSBfdGhpcy5nZXRSb290KCk7XG4gICAgICAgIHJvb3Qud2lkdGggKz0gMTtcbiAgICAgICAgY29tbW9uLmRlZmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJvb3Qud2lkdGggLT0gMTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghcGFyYW1zLnBhcmVudCkge1xuICAgICAgICByZXNldFdpZHRoKCk7XG4gICAgICB9XG5cbiAgfTtcblxuICBHVUkudG9nZ2xlSGlkZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgaGlkZSA9ICFoaWRlO1xuICAgIGNvbW1vbi5lYWNoKGhpZGVhYmxlX2d1aXMsIGZ1bmN0aW9uKGd1aSkge1xuICAgICAgZ3VpLmRvbUVsZW1lbnQuc3R5bGUuekluZGV4ID0gaGlkZSA/IC05OTkgOiA5OTk7XG4gICAgICBndWkuZG9tRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gaGlkZSA/IDAgOiAxO1xuICAgIH0pO1xuICB9O1xuXG4gIEdVSS5DTEFTU19BVVRPX1BMQUNFID0gJ2EnO1xuICBHVUkuQ0xBU1NfQVVUT19QTEFDRV9DT05UQUlORVIgPSAnYWMnO1xuICBHVUkuQ0xBU1NfTUFJTiA9ICdtYWluJztcbiAgR1VJLkNMQVNTX0NPTlRST0xMRVJfUk9XID0gJ2NyJztcbiAgR1VJLkNMQVNTX1RPT19UQUxMID0gJ3RhbGxlci10aGFuLXdpbmRvdyc7XG4gIEdVSS5DTEFTU19DTE9TRUQgPSAnY2xvc2VkJztcbiAgR1VJLkNMQVNTX0NMT1NFX0JVVFRPTiA9ICdjbG9zZS1idXR0b24nO1xuICBHVUkuQ0xBU1NfRFJBRyA9ICdkcmFnJztcblxuICBHVUkuREVGQVVMVF9XSURUSCA9IDI0NTtcbiAgR1VJLlRFWFRfQ0xPU0VEID0gJ0Nsb3NlIENvbnRyb2xzJztcbiAgR1VJLlRFWFRfT1BFTiA9ICdPcGVuIENvbnRyb2xzJztcblxuICBkb20uYmluZCh3aW5kb3csICdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuXG4gICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQudHlwZSAhPT0gJ3RleHQnICYmXG4gICAgICAgIChlLndoaWNoID09PSBISURFX0tFWV9DT0RFIHx8IGUua2V5Q29kZSA9PSBISURFX0tFWV9DT0RFKSkge1xuICAgICAgR1VJLnRvZ2dsZUhpZGUoKTtcbiAgICB9XG5cbiAgfSwgZmFsc2UpO1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIEdVSS5wcm90b3R5cGUsXG5cbiAgICAgIC8qKiBAbGVuZHMgZGF0Lmd1aS5HVUkgKi9cbiAgICAgIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlcbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5Db250cm9sbGVyfSBUaGUgbmV3IGNvbnRyb2xsZXIgdGhhdCB3YXMgYWRkZWQuXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgYWRkOiBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7XG5cbiAgICAgICAgICByZXR1cm4gYWRkKFxuICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICBvYmplY3QsXG4gICAgICAgICAgICAgIHByb3BlcnR5LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmFjdG9yeUFyZ3M6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIG9iamVjdFxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlcbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5Db2xvckNvbnRyb2xsZXJ9IFRoZSBuZXcgY29udHJvbGxlciB0aGF0IHdhcyBhZGRlZC5cbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBhZGRDb2xvcjogZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXG4gICAgICAgICAgcmV0dXJuIGFkZChcbiAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgICAgICBwcm9wZXJ0eSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbG9yOiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSBjb250cm9sbGVyXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbihjb250cm9sbGVyKSB7XG5cbiAgICAgICAgICAvLyBUT0RPIGxpc3RlbmluZz9cbiAgICAgICAgICB0aGlzLl9fdWwucmVtb3ZlQ2hpbGQoY29udHJvbGxlci5fX2xpKTtcbiAgICAgICAgICB0aGlzLl9fY29udHJvbGxlcnMuc2xpY2UodGhpcy5fX2NvbnRyb2xsZXJzLmluZGV4T2YoY29udHJvbGxlciksIDEpO1xuICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgY29tbW9uLmRlZmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3RoaXMub25SZXNpemUoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgaWYgKHRoaXMuYXV0b1BsYWNlKSB7XG4gICAgICAgICAgICBhdXRvX3BsYWNlX2NvbnRhaW5lci5yZW1vdmVDaGlsZCh0aGlzLmRvbUVsZW1lbnQpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0Lmd1aS5HVUl9IFRoZSBuZXcgZm9sZGVyLlxuICAgICAgICAgKiBAdGhyb3dzIHtFcnJvcn0gaWYgdGhpcyBHVUkgYWxyZWFkeSBoYXMgYSBmb2xkZXIgYnkgdGhlIHNwZWNpZmllZFxuICAgICAgICAgKiBuYW1lXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgYWRkRm9sZGVyOiBmdW5jdGlvbihuYW1lKSB7XG5cbiAgICAgICAgICAvLyBXZSBoYXZlIHRvIHByZXZlbnQgY29sbGlzaW9ucyBvbiBuYW1lcyBpbiBvcmRlciB0byBoYXZlIGEga2V5XG4gICAgICAgICAgLy8gYnkgd2hpY2ggdG8gcmVtZW1iZXIgc2F2ZWQgdmFsdWVzXG4gICAgICAgICAgaWYgKHRoaXMuX19mb2xkZXJzW25hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGFscmVhZHkgaGF2ZSBhIGZvbGRlciBpbiB0aGlzIEdVSSBieSB0aGUnICtcbiAgICAgICAgICAgICAgICAnIG5hbWUgXCInICsgbmFtZSArICdcIicpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBuZXdfZ3VpX3BhcmFtcyA9IHsgbmFtZTogbmFtZSwgcGFyZW50OiB0aGlzIH07XG5cbiAgICAgICAgICAvLyBXZSBuZWVkIHRvIHBhc3MgZG93biB0aGUgYXV0b1BsYWNlIHRyYWl0IHNvIHRoYXQgd2UgY2FuXG4gICAgICAgICAgLy8gYXR0YWNoIGV2ZW50IGxpc3RlbmVycyB0byBvcGVuL2Nsb3NlIGZvbGRlciBhY3Rpb25zIHRvXG4gICAgICAgICAgLy8gZW5zdXJlIHRoYXQgYSBzY3JvbGxiYXIgYXBwZWFycyBpZiB0aGUgd2luZG93IGlzIHRvbyBzaG9ydC5cbiAgICAgICAgICBuZXdfZ3VpX3BhcmFtcy5hdXRvUGxhY2UgPSB0aGlzLmF1dG9QbGFjZTtcblxuICAgICAgICAgIC8vIERvIHdlIGhhdmUgc2F2ZWQgYXBwZWFyYW5jZSBkYXRhIGZvciB0aGlzIGZvbGRlcj9cblxuICAgICAgICAgIGlmICh0aGlzLmxvYWQgJiYgLy8gQW55dGhpbmcgbG9hZGVkP1xuICAgICAgICAgICAgICB0aGlzLmxvYWQuZm9sZGVycyAmJiAvLyBXYXMgbXkgcGFyZW50IGEgZGVhZC1lbmQ/XG4gICAgICAgICAgICAgIHRoaXMubG9hZC5mb2xkZXJzW25hbWVdKSB7IC8vIERpZCBkYWRkeSByZW1lbWJlciBtZT9cblxuICAgICAgICAgICAgLy8gU3RhcnQgbWUgY2xvc2VkIGlmIEkgd2FzIGNsb3NlZFxuICAgICAgICAgICAgbmV3X2d1aV9wYXJhbXMuY2xvc2VkID0gdGhpcy5sb2FkLmZvbGRlcnNbbmFtZV0uY2xvc2VkO1xuXG4gICAgICAgICAgICAvLyBQYXNzIGRvd24gdGhlIGxvYWRlZCBkYXRhXG4gICAgICAgICAgICBuZXdfZ3VpX3BhcmFtcy5sb2FkID0gdGhpcy5sb2FkLmZvbGRlcnNbbmFtZV07XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgZ3VpID0gbmV3IEdVSShuZXdfZ3VpX3BhcmFtcyk7XG4gICAgICAgICAgdGhpcy5fX2ZvbGRlcnNbbmFtZV0gPSBndWk7XG5cbiAgICAgICAgICB2YXIgbGkgPSBhZGRSb3codGhpcywgZ3VpLmRvbUVsZW1lbnQpO1xuICAgICAgICAgIGRvbS5hZGRDbGFzcyhsaSwgJ2ZvbGRlcicpO1xuICAgICAgICAgIHJldHVybiBndWk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBvcGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLmNsb3NlZCA9IHRydWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25SZXNpemU6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgdmFyIHJvb3QgPSB0aGlzLmdldFJvb3QoKTtcblxuICAgICAgICAgIGlmIChyb290LnNjcm9sbGFibGUpIHtcblxuICAgICAgICAgICAgdmFyIHRvcCA9IGRvbS5nZXRPZmZzZXQocm9vdC5fX3VsKS50b3A7XG4gICAgICAgICAgICB2YXIgaCA9IDA7XG5cbiAgICAgICAgICAgIGNvbW1vbi5lYWNoKHJvb3QuX191bC5jaGlsZE5vZGVzLCBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgICAgIGlmICghIChyb290LmF1dG9QbGFjZSAmJiBub2RlID09PSByb290Ll9fc2F2ZV9yb3cpKVxuICAgICAgICAgICAgICAgIGggKz0gZG9tLmdldEhlaWdodChub2RlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAod2luZG93LmlubmVySGVpZ2h0IC0gdG9wIC0gQ0xPU0VfQlVUVE9OX0hFSUdIVCA8IGgpIHtcbiAgICAgICAgICAgICAgZG9tLmFkZENsYXNzKHJvb3QuZG9tRWxlbWVudCwgR1VJLkNMQVNTX1RPT19UQUxMKTtcbiAgICAgICAgICAgICAgcm9vdC5fX3VsLnN0eWxlLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIHRvcCAtIENMT1NFX0JVVFRPTl9IRUlHSFQgKyAncHgnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZG9tLnJlbW92ZUNsYXNzKHJvb3QuZG9tRWxlbWVudCwgR1VJLkNMQVNTX1RPT19UQUxMKTtcbiAgICAgICAgICAgICAgcm9vdC5fX3VsLnN0eWxlLmhlaWdodCA9ICdhdXRvJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChyb290Ll9fcmVzaXplX2hhbmRsZSkge1xuICAgICAgICAgICAgY29tbW9uLmRlZmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByb290Ll9fcmVzaXplX2hhbmRsZS5zdHlsZS5oZWlnaHQgPSByb290Ll9fdWwub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChyb290Ll9fY2xvc2VCdXR0b24pIHtcbiAgICAgICAgICAgIHJvb3QuX19jbG9zZUJ1dHRvbi5zdHlsZS53aWR0aCA9IHJvb3Qud2lkdGggKyAncHgnO1xuICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNYXJrIG9iamVjdHMgZm9yIHNhdmluZy4gVGhlIG9yZGVyIG9mIHRoZXNlIG9iamVjdHMgY2Fubm90IGNoYW5nZSBhc1xuICAgICAgICAgKiB0aGUgR1VJIGdyb3dzLiBXaGVuIHJlbWVtYmVyaW5nIG5ldyBvYmplY3RzLCBhcHBlbmQgdGhlbSB0byB0aGUgZW5kXG4gICAgICAgICAqIG9mIHRoZSBsaXN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdC4uLn0gb2JqZWN0c1xuICAgICAgICAgKiBAdGhyb3dzIHtFcnJvcn0gaWYgbm90IGNhbGxlZCBvbiBhIHRvcCBsZXZlbCBHVUkuXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgcmVtZW1iZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgaWYgKGNvbW1vbi5pc1VuZGVmaW5lZChTQVZFX0RJQUxPR1VFKSkge1xuICAgICAgICAgICAgU0FWRV9ESUFMT0dVRSA9IG5ldyBDZW50ZXJlZERpdigpO1xuICAgICAgICAgICAgU0FWRV9ESUFMT0dVRS5kb21FbGVtZW50LmlubmVySFRNTCA9IHNhdmVEaWFsb2d1ZUNvbnRlbnRzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWW91IGNhbiBvbmx5IGNhbGwgcmVtZW1iZXIgb24gYSB0b3AgbGV2ZWwgR1VJLlwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgY29tbW9uLmVhY2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSwgZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMuX19yZW1lbWJlcmVkT2JqZWN0cy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICBhZGRTYXZlTWVudShfdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoX3RoaXMuX19yZW1lbWJlcmVkT2JqZWN0cy5pbmRleE9mKG9iamVjdCkgPT0gLTEpIHtcbiAgICAgICAgICAgICAgX3RoaXMuX19yZW1lbWJlcmVkT2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAodGhpcy5hdXRvUGxhY2UpIHtcbiAgICAgICAgICAgIC8vIFNldCBzYXZlIHJvdyB3aWR0aFxuICAgICAgICAgICAgc2V0V2lkdGgodGhpcywgdGhpcy53aWR0aCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuZ3VpLkdVSX0gdGhlIHRvcG1vc3QgcGFyZW50IEdVSSBvZiBhIG5lc3RlZCBHVUkuXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0Um9vdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGd1aSA9IHRoaXM7XG4gICAgICAgICAgd2hpbGUgKGd1aS5wYXJlbnQpIHtcbiAgICAgICAgICAgIGd1aSA9IGd1aS5wYXJlbnQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBndWk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3R9IGEgSlNPTiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IHN0YXRlIG9mXG4gICAgICAgICAqIHRoaXMgR1VJIGFzIHdlbGwgYXMgaXRzIHJlbWVtYmVyZWQgcHJvcGVydGllcy5cbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBnZXRTYXZlT2JqZWN0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIHZhciB0b1JldHVybiA9IHRoaXMubG9hZDtcblxuICAgICAgICAgIHRvUmV0dXJuLmNsb3NlZCA9IHRoaXMuY2xvc2VkO1xuXG4gICAgICAgICAgLy8gQW0gSSByZW1lbWJlcmluZyBhbnkgdmFsdWVzP1xuICAgICAgICAgIGlmICh0aGlzLl9fcmVtZW1iZXJlZE9iamVjdHMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICB0b1JldHVybi5wcmVzZXQgPSB0aGlzLnByZXNldDtcblxuICAgICAgICAgICAgaWYgKCF0b1JldHVybi5yZW1lbWJlcmVkKSB7XG4gICAgICAgICAgICAgIHRvUmV0dXJuLnJlbWVtYmVyZWQgPSB7fTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG9SZXR1cm4ucmVtZW1iZXJlZFt0aGlzLnByZXNldF0gPSBnZXRDdXJyZW50UHJlc2V0KHRoaXMpO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdG9SZXR1cm4uZm9sZGVycyA9IHt9O1xuICAgICAgICAgIGNvbW1vbi5lYWNoKHRoaXMuX19mb2xkZXJzLCBmdW5jdGlvbihlbGVtZW50LCBrZXkpIHtcbiAgICAgICAgICAgIHRvUmV0dXJuLmZvbGRlcnNba2V5XSA9IGVsZW1lbnQuZ2V0U2F2ZU9iamVjdCgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIHRvUmV0dXJuO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2F2ZTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICBpZiAoIXRoaXMubG9hZC5yZW1lbWJlcmVkKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWQucmVtZW1iZXJlZCA9IHt9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMubG9hZC5yZW1lbWJlcmVkW3RoaXMucHJlc2V0XSA9IGdldEN1cnJlbnRQcmVzZXQodGhpcyk7XG4gICAgICAgICAgbWFya1ByZXNldE1vZGlmaWVkKHRoaXMsIGZhbHNlKTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIHNhdmVBczogZnVuY3Rpb24ocHJlc2V0TmFtZSkge1xuXG4gICAgICAgICAgaWYgKCF0aGlzLmxvYWQucmVtZW1iZXJlZCkge1xuXG4gICAgICAgICAgICAvLyBSZXRhaW4gZGVmYXVsdCB2YWx1ZXMgdXBvbiBmaXJzdCBzYXZlXG4gICAgICAgICAgICB0aGlzLmxvYWQucmVtZW1iZXJlZCA9IHt9O1xuICAgICAgICAgICAgdGhpcy5sb2FkLnJlbWVtYmVyZWRbREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FXSA9IGdldEN1cnJlbnRQcmVzZXQodGhpcywgdHJ1ZSk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmxvYWQucmVtZW1iZXJlZFtwcmVzZXROYW1lXSA9IGdldEN1cnJlbnRQcmVzZXQodGhpcyk7XG4gICAgICAgICAgdGhpcy5wcmVzZXQgPSBwcmVzZXROYW1lO1xuICAgICAgICAgIGFkZFByZXNldE9wdGlvbih0aGlzLCBwcmVzZXROYW1lLCB0cnVlKTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIHJldmVydDogZnVuY3Rpb24oZ3VpKSB7XG5cbiAgICAgICAgICBjb21tb24uZWFjaCh0aGlzLl9fY29udHJvbGxlcnMsIGZ1bmN0aW9uKGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIC8vIE1ha2UgcmV2ZXJ0IHdvcmsgb24gRGVmYXVsdC5cbiAgICAgICAgICAgIGlmICghdGhpcy5nZXRSb290KCkubG9hZC5yZW1lbWJlcmVkKSB7XG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIuc2V0VmFsdWUoY29udHJvbGxlci5pbml0aWFsVmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVjYWxsU2F2ZWRWYWx1ZShndWkgfHwgdGhpcy5nZXRSb290KCksIGNvbnRyb2xsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgICAgY29tbW9uLmVhY2godGhpcy5fX2ZvbGRlcnMsIGZ1bmN0aW9uKGZvbGRlcikge1xuICAgICAgICAgICAgZm9sZGVyLnJldmVydChmb2xkZXIpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKCFndWkpIHtcbiAgICAgICAgICAgIG1hcmtQcmVzZXRNb2RpZmllZCh0aGlzLmdldFJvb3QoKSwgZmFsc2UpO1xuICAgICAgICAgIH1cblxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbGlzdGVuOiBmdW5jdGlvbihjb250cm9sbGVyKSB7XG5cbiAgICAgICAgICB2YXIgaW5pdCA9IHRoaXMuX19saXN0ZW5pbmcubGVuZ3RoID09IDA7XG4gICAgICAgICAgdGhpcy5fX2xpc3RlbmluZy5wdXNoKGNvbnRyb2xsZXIpO1xuICAgICAgICAgIGlmIChpbml0KSB1cGRhdGVEaXNwbGF5cyh0aGlzLl9fbGlzdGVuaW5nKTtcblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICApO1xuXG4gIGZ1bmN0aW9uIGFkZChndWksIG9iamVjdCwgcHJvcGVydHksIHBhcmFtcykge1xuXG4gICAgaWYgKG9iamVjdFtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiT2JqZWN0IFwiICsgb2JqZWN0ICsgXCIgaGFzIG5vIHByb3BlcnR5IFxcXCJcIiArIHByb3BlcnR5ICsgXCJcXFwiXCIpO1xuICAgIH1cblxuICAgIHZhciBjb250cm9sbGVyO1xuXG4gICAgaWYgKHBhcmFtcy5jb2xvcikge1xuXG4gICAgICBjb250cm9sbGVyID0gbmV3IENvbG9yQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5KTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHZhciBmYWN0b3J5QXJncyA9IFtvYmplY3QscHJvcGVydHldLmNvbmNhdChwYXJhbXMuZmFjdG9yeUFyZ3MpO1xuICAgICAgY29udHJvbGxlciA9IGNvbnRyb2xsZXJGYWN0b3J5LmFwcGx5KGd1aSwgZmFjdG9yeUFyZ3MpO1xuXG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcy5iZWZvcmUgaW5zdGFuY2VvZiBDb250cm9sbGVyKSB7XG4gICAgICBwYXJhbXMuYmVmb3JlID0gcGFyYW1zLmJlZm9yZS5fX2xpO1xuICAgIH1cblxuICAgIHJlY2FsbFNhdmVkVmFsdWUoZ3VpLCBjb250cm9sbGVyKTtcblxuICAgIGRvbS5hZGRDbGFzcyhjb250cm9sbGVyLmRvbUVsZW1lbnQsICdjJyk7XG5cbiAgICB2YXIgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBkb20uYWRkQ2xhc3MobmFtZSwgJ3Byb3BlcnR5LW5hbWUnKTtcbiAgICBuYW1lLmlubmVySFRNTCA9IGNvbnRyb2xsZXIucHJvcGVydHk7XG5cbiAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5hbWUpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250cm9sbGVyLmRvbUVsZW1lbnQpO1xuXG4gICAgdmFyIGxpID0gYWRkUm93KGd1aSwgY29udGFpbmVyLCBwYXJhbXMuYmVmb3JlKTtcblxuICAgIGRvbS5hZGRDbGFzcyhsaSwgR1VJLkNMQVNTX0NPTlRST0xMRVJfUk9XKTtcbiAgICBkb20uYWRkQ2xhc3MobGksIHR5cGVvZiBjb250cm9sbGVyLmdldFZhbHVlKCkpO1xuXG4gICAgYXVnbWVudENvbnRyb2xsZXIoZ3VpLCBsaSwgY29udHJvbGxlcik7XG5cbiAgICBndWkuX19jb250cm9sbGVycy5wdXNoKGNvbnRyb2xsZXIpO1xuXG4gICAgcmV0dXJuIGNvbnRyb2xsZXI7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSByb3cgdG8gdGhlIGVuZCBvZiB0aGUgR1VJIG9yIGJlZm9yZSBhbm90aGVyIHJvdy5cbiAgICpcbiAgICogQHBhcmFtIGd1aVxuICAgKiBAcGFyYW0gW2RvbV0gSWYgc3BlY2lmaWVkLCBpbnNlcnRzIHRoZSBkb20gY29udGVudCBpbiB0aGUgbmV3IHJvd1xuICAgKiBAcGFyYW0gW2xpQmVmb3JlXSBJZiBzcGVjaWZpZWQsIHBsYWNlcyB0aGUgbmV3IHJvdyBiZWZvcmUgYW5vdGhlciByb3dcbiAgICovXG4gIGZ1bmN0aW9uIGFkZFJvdyhndWksIGRvbSwgbGlCZWZvcmUpIHtcbiAgICB2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGlmIChkb20pIGxpLmFwcGVuZENoaWxkKGRvbSk7XG4gICAgaWYgKGxpQmVmb3JlKSB7XG4gICAgICBndWkuX191bC5pbnNlcnRCZWZvcmUobGksIHBhcmFtcy5iZWZvcmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBndWkuX191bC5hcHBlbmRDaGlsZChsaSk7XG4gICAgfVxuICAgIGd1aS5vblJlc2l6ZSgpO1xuICAgIHJldHVybiBsaTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGF1Z21lbnRDb250cm9sbGVyKGd1aSwgbGksIGNvbnRyb2xsZXIpIHtcblxuICAgIGNvbnRyb2xsZXIuX19saSA9IGxpO1xuICAgIGNvbnRyb2xsZXIuX19ndWkgPSBndWk7XG5cbiAgICBjb21tb24uZXh0ZW5kKGNvbnRyb2xsZXIsIHtcblxuICAgICAgb3B0aW9uczogZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlKCk7XG5cbiAgICAgICAgICByZXR1cm4gYWRkKFxuICAgICAgICAgICAgICBndWksXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIub2JqZWN0LFxuICAgICAgICAgICAgICBjb250cm9sbGVyLnByb3BlcnR5LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYmVmb3JlOiBjb250cm9sbGVyLl9fbGkubmV4dEVsZW1lbnRTaWJsaW5nLFxuICAgICAgICAgICAgICAgIGZhY3RvcnlBcmdzOiBbY29tbW9uLnRvQXJyYXkoYXJndW1lbnRzKV1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb21tb24uaXNBcnJheShvcHRpb25zKSB8fCBjb21tb24uaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICAgICAgICBjb250cm9sbGVyLnJlbW92ZSgpO1xuXG4gICAgICAgICAgcmV0dXJuIGFkZChcbiAgICAgICAgICAgICAgZ3VpLFxuICAgICAgICAgICAgICBjb250cm9sbGVyLm9iamVjdCxcbiAgICAgICAgICAgICAgY29udHJvbGxlci5wcm9wZXJ0eSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJlZm9yZTogY29udHJvbGxlci5fX2xpLm5leHRFbGVtZW50U2libGluZyxcbiAgICAgICAgICAgICAgICBmYWN0b3J5QXJnczogW29wdGlvbnNdXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuXG4gICAgICAgIH1cblxuICAgICAgfSxcblxuICAgICAgbmFtZTogZnVuY3Rpb24odikge1xuICAgICAgICBjb250cm9sbGVyLl9fbGkuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQuaW5uZXJIVE1MID0gdjtcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXI7XG4gICAgICB9LFxuXG4gICAgICBsaXN0ZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250cm9sbGVyLl9fZ3VpLmxpc3Rlbihjb250cm9sbGVyKTtcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXI7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb250cm9sbGVyLl9fZ3VpLnJlbW92ZShjb250cm9sbGVyKTtcbiAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXI7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIC8vIEFsbCBzbGlkZXJzIHNob3VsZCBiZSBhY2NvbXBhbmllZCBieSBhIGJveC5cbiAgICBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIE51bWJlckNvbnRyb2xsZXJTbGlkZXIpIHtcblxuICAgICAgdmFyIGJveCA9IG5ldyBOdW1iZXJDb250cm9sbGVyQm94KGNvbnRyb2xsZXIub2JqZWN0LCBjb250cm9sbGVyLnByb3BlcnR5LFxuICAgICAgICAgIHsgbWluOiBjb250cm9sbGVyLl9fbWluLCBtYXg6IGNvbnRyb2xsZXIuX19tYXgsIHN0ZXA6IGNvbnRyb2xsZXIuX19zdGVwIH0pO1xuXG4gICAgICBjb21tb24uZWFjaChbJ3VwZGF0ZURpc3BsYXknLCAnb25DaGFuZ2UnLCAnb25GaW5pc2hDaGFuZ2UnXSwgZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgIHZhciBwYyA9IGNvbnRyb2xsZXJbbWV0aG9kXTtcbiAgICAgICAgdmFyIHBiID0gYm94W21ldGhvZF07XG4gICAgICAgIGNvbnRyb2xsZXJbbWV0aG9kXSA9IGJveFttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgIHBjLmFwcGx5KGNvbnRyb2xsZXIsIGFyZ3MpO1xuICAgICAgICAgIHJldHVybiBwYi5hcHBseShib3gsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgZG9tLmFkZENsYXNzKGxpLCAnaGFzLXNsaWRlcicpO1xuICAgICAgY29udHJvbGxlci5kb21FbGVtZW50Lmluc2VydEJlZm9yZShib3guZG9tRWxlbWVudCwgY29udHJvbGxlci5kb21FbGVtZW50LmZpcnN0RWxlbWVudENoaWxkKTtcblxuICAgIH1cbiAgICBlbHNlIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgTnVtYmVyQ29udHJvbGxlckJveCkge1xuXG4gICAgICB2YXIgciA9IGZ1bmN0aW9uKHJldHVybmVkKSB7XG5cbiAgICAgICAgLy8gSGF2ZSB3ZSBkZWZpbmVkIGJvdGggYm91bmRhcmllcz9cbiAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihjb250cm9sbGVyLl9fbWluKSAmJiBjb21tb24uaXNOdW1iZXIoY29udHJvbGxlci5fX21heCkpIHtcblxuICAgICAgICAgIC8vIFdlbGwsIHRoZW4gbGV0cyBqdXN0IHJlcGxhY2UgdGhpcyB3aXRoIGEgc2xpZGVyLlxuICAgICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlKCk7XG4gICAgICAgICAgcmV0dXJuIGFkZChcbiAgICAgICAgICAgICAgZ3VpLFxuICAgICAgICAgICAgICBjb250cm9sbGVyLm9iamVjdCxcbiAgICAgICAgICAgICAgY29udHJvbGxlci5wcm9wZXJ0eSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJlZm9yZTogY29udHJvbGxlci5fX2xpLm5leHRFbGVtZW50U2libGluZyxcbiAgICAgICAgICAgICAgICBmYWN0b3J5QXJnczogW2NvbnRyb2xsZXIuX19taW4sIGNvbnRyb2xsZXIuX19tYXgsIGNvbnRyb2xsZXIuX19zdGVwXVxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldHVybmVkO1xuXG4gICAgICB9O1xuXG4gICAgICBjb250cm9sbGVyLm1pbiA9IGNvbW1vbi5jb21wb3NlKHIsIGNvbnRyb2xsZXIubWluKTtcbiAgICAgIGNvbnRyb2xsZXIubWF4ID0gY29tbW9uLmNvbXBvc2UociwgY29udHJvbGxlci5tYXgpO1xuXG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBCb29sZWFuQ29udHJvbGxlcikge1xuXG4gICAgICBkb20uYmluZChsaSwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvbS5mYWtlRXZlbnQoY29udHJvbGxlci5fX2NoZWNrYm94LCAnY2xpY2snKTtcbiAgICAgIH0pO1xuXG4gICAgICBkb20uYmluZChjb250cm9sbGVyLl9fY2hlY2tib3gsICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgLy8gUHJldmVudHMgZG91YmxlLXRvZ2dsZVxuICAgICAgfSlcblxuICAgIH1cbiAgICBlbHNlIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgRnVuY3Rpb25Db250cm9sbGVyKSB7XG5cbiAgICAgIGRvbS5iaW5kKGxpLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZG9tLmZha2VFdmVudChjb250cm9sbGVyLl9fYnV0dG9uLCAnY2xpY2snKTtcbiAgICAgIH0pO1xuXG4gICAgICBkb20uYmluZChsaSwgJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBkb20uYWRkQ2xhc3MoY29udHJvbGxlci5fX2J1dHRvbiwgJ2hvdmVyJyk7XG4gICAgICB9KTtcblxuICAgICAgZG9tLmJpbmQobGksICdtb3VzZW91dCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBkb20ucmVtb3ZlQ2xhc3MoY29udHJvbGxlci5fX2J1dHRvbiwgJ2hvdmVyJyk7XG4gICAgICB9KTtcblxuICAgIH1cbiAgICBlbHNlIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgQ29sb3JDb250cm9sbGVyKSB7XG5cbiAgICAgIGRvbS5hZGRDbGFzcyhsaSwgJ2NvbG9yJyk7XG4gICAgICBjb250cm9sbGVyLnVwZGF0ZURpc3BsYXkgPSBjb21tb24uY29tcG9zZShmdW5jdGlvbihyKSB7XG4gICAgICAgIGxpLnN0eWxlLmJvcmRlckxlZnRDb2xvciA9IGNvbnRyb2xsZXIuX19jb2xvci50b1N0cmluZygpO1xuICAgICAgICByZXR1cm4gcjtcbiAgICAgIH0sIGNvbnRyb2xsZXIudXBkYXRlRGlzcGxheSk7XG5cbiAgICAgIGNvbnRyb2xsZXIudXBkYXRlRGlzcGxheSgpO1xuXG4gICAgfVxuXG4gICAgY29udHJvbGxlci5zZXRWYWx1ZSA9IGNvbW1vbi5jb21wb3NlKGZ1bmN0aW9uKHIpIHtcbiAgICAgIGlmIChndWkuZ2V0Um9vdCgpLl9fcHJlc2V0X3NlbGVjdCAmJiBjb250cm9sbGVyLmlzTW9kaWZpZWQoKSkge1xuICAgICAgICBtYXJrUHJlc2V0TW9kaWZpZWQoZ3VpLmdldFJvb3QoKSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcjtcbiAgICB9LCBjb250cm9sbGVyLnNldFZhbHVlKTtcblxuICB9XG5cbiAgZnVuY3Rpb24gcmVjYWxsU2F2ZWRWYWx1ZShndWksIGNvbnRyb2xsZXIpIHtcblxuICAgIC8vIEZpbmQgdGhlIHRvcG1vc3QgR1VJLCB0aGF0J3Mgd2hlcmUgcmVtZW1iZXJlZCBvYmplY3RzIGxpdmUuXG4gICAgdmFyIHJvb3QgPSBndWkuZ2V0Um9vdCgpO1xuXG4gICAgLy8gRG9lcyB0aGUgb2JqZWN0IHdlJ3JlIGNvbnRyb2xsaW5nIG1hdGNoIGFueXRoaW5nIHdlJ3ZlIGJlZW4gdG9sZCB0b1xuICAgIC8vIHJlbWVtYmVyP1xuICAgIHZhciBtYXRjaGVkX2luZGV4ID0gcm9vdC5fX3JlbWVtYmVyZWRPYmplY3RzLmluZGV4T2YoY29udHJvbGxlci5vYmplY3QpO1xuXG4gICAgLy8gV2h5IHllcywgaXQgZG9lcyFcbiAgICBpZiAobWF0Y2hlZF9pbmRleCAhPSAtMSkge1xuXG4gICAgICAvLyBMZXQgbWUgZmV0Y2ggYSBtYXAgb2YgY29udHJvbGxlcnMgZm9yIHRoY29tbW9uLmlzT2JqZWN0LlxuICAgICAgdmFyIGNvbnRyb2xsZXJfbWFwID1cbiAgICAgICAgICByb290Ll9fcmVtZW1iZXJlZE9iamVjdEluZGVjZXNUb0NvbnRyb2xsZXJzW21hdGNoZWRfaW5kZXhdO1xuXG4gICAgICAvLyBPaHAsIEkgYmVsaWV2ZSB0aGlzIGlzIHRoZSBmaXJzdCBjb250cm9sbGVyIHdlJ3ZlIGNyZWF0ZWQgZm9yIHRoaXNcbiAgICAgIC8vIG9iamVjdC4gTGV0cyBtYWtlIHRoZSBtYXAgZnJlc2guXG4gICAgICBpZiAoY29udHJvbGxlcl9tYXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb250cm9sbGVyX21hcCA9IHt9O1xuICAgICAgICByb290Ll9fcmVtZW1iZXJlZE9iamVjdEluZGVjZXNUb0NvbnRyb2xsZXJzW21hdGNoZWRfaW5kZXhdID1cbiAgICAgICAgICAgIGNvbnRyb2xsZXJfbWFwO1xuICAgICAgfVxuXG4gICAgICAvLyBLZWVwIHRyYWNrIG9mIHRoaXMgY29udHJvbGxlclxuICAgICAgY29udHJvbGxlcl9tYXBbY29udHJvbGxlci5wcm9wZXJ0eV0gPSBjb250cm9sbGVyO1xuXG4gICAgICAvLyBPa2F5LCBub3cgaGF2ZSB3ZSBzYXZlZCBhbnkgdmFsdWVzIGZvciB0aGlzIGNvbnRyb2xsZXI/XG4gICAgICBpZiAocm9vdC5sb2FkICYmIHJvb3QubG9hZC5yZW1lbWJlcmVkKSB7XG5cbiAgICAgICAgdmFyIHByZXNldF9tYXAgPSByb290LmxvYWQucmVtZW1iZXJlZDtcblxuICAgICAgICAvLyBXaGljaCBwcmVzZXQgYXJlIHdlIHRyeWluZyB0byBsb2FkP1xuICAgICAgICB2YXIgcHJlc2V0O1xuXG4gICAgICAgIGlmIChwcmVzZXRfbWFwW2d1aS5wcmVzZXRdKSB7XG5cbiAgICAgICAgICBwcmVzZXQgPSBwcmVzZXRfbWFwW2d1aS5wcmVzZXRdO1xuXG4gICAgICAgIH0gZWxzZSBpZiAocHJlc2V0X21hcFtERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUVdKSB7XG5cbiAgICAgICAgICAvLyBVaGgsIHlvdSBjYW4gaGF2ZSB0aGUgZGVmYXVsdCBpbnN0ZWFkP1xuICAgICAgICAgIHByZXNldCA9IHByZXNldF9tYXBbREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FXTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgLy8gTmFkYS5cblxuICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9XG5cblxuICAgICAgICAvLyBEaWQgdGhlIGxvYWRlZCBvYmplY3QgcmVtZW1iZXIgdGhjb21tb24uaXNPYmplY3Q/XG4gICAgICAgIGlmIChwcmVzZXRbbWF0Y2hlZF9pbmRleF0gJiZcblxuICAgICAgICAgIC8vIERpZCB3ZSByZW1lbWJlciB0aGlzIHBhcnRpY3VsYXIgcHJvcGVydHk/XG4gICAgICAgICAgICBwcmVzZXRbbWF0Y2hlZF9pbmRleF1bY29udHJvbGxlci5wcm9wZXJ0eV0gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgLy8gV2UgZGlkIHJlbWVtYmVyIHNvbWV0aGluZyBmb3IgdGhpcyBndXkgLi4uXG4gICAgICAgICAgdmFyIHZhbHVlID0gcHJlc2V0W21hdGNoZWRfaW5kZXhdW2NvbnRyb2xsZXIucHJvcGVydHldO1xuXG4gICAgICAgICAgLy8gQW5kIHRoYXQncyB3aGF0IGl0IGlzLlxuICAgICAgICAgIGNvbnRyb2xsZXIuaW5pdGlhbFZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgY29udHJvbGxlci5zZXRWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExvY2FsU3RvcmFnZUhhc2goZ3VpLCBrZXkpIHtcbiAgICAvLyBUT0RPIGhvdyBkb2VzIHRoaXMgZGVhbCB3aXRoIG11bHRpcGxlIEdVSSdzP1xuICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmICsgJy4nICsga2V5O1xuXG4gIH1cblxuICBmdW5jdGlvbiBhZGRTYXZlTWVudShndWkpIHtcblxuICAgIHZhciBkaXYgPSBndWkuX19zYXZlX3JvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cbiAgICBkb20uYWRkQ2xhc3MoZ3VpLmRvbUVsZW1lbnQsICdoYXMtc2F2ZScpO1xuXG4gICAgZ3VpLl9fdWwuaW5zZXJ0QmVmb3JlKGRpdiwgZ3VpLl9fdWwuZmlyc3RDaGlsZCk7XG5cbiAgICBkb20uYWRkQ2xhc3MoZGl2LCAnc2F2ZS1yb3cnKTtcblxuICAgIHZhciBnZWFycyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBnZWFycy5pbm5lckhUTUwgPSAnJm5ic3A7JztcbiAgICBkb20uYWRkQ2xhc3MoZ2VhcnMsICdidXR0b24gZ2VhcnMnKTtcblxuICAgIC8vIFRPRE8gcmVwbGFjZSB3aXRoIEZ1bmN0aW9uQ29udHJvbGxlclxuICAgIHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgYnV0dG9uLmlubmVySFRNTCA9ICdTYXZlJztcbiAgICBkb20uYWRkQ2xhc3MoYnV0dG9uLCAnYnV0dG9uJyk7XG4gICAgZG9tLmFkZENsYXNzKGJ1dHRvbiwgJ3NhdmUnKTtcblxuICAgIHZhciBidXR0b24yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGJ1dHRvbjIuaW5uZXJIVE1MID0gJ05ldyc7XG4gICAgZG9tLmFkZENsYXNzKGJ1dHRvbjIsICdidXR0b24nKTtcbiAgICBkb20uYWRkQ2xhc3MoYnV0dG9uMiwgJ3NhdmUtYXMnKTtcblxuICAgIHZhciBidXR0b24zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGJ1dHRvbjMuaW5uZXJIVE1MID0gJ1JldmVydCc7XG4gICAgZG9tLmFkZENsYXNzKGJ1dHRvbjMsICdidXR0b24nKTtcbiAgICBkb20uYWRkQ2xhc3MoYnV0dG9uMywgJ3JldmVydCcpO1xuXG4gICAgdmFyIHNlbGVjdCA9IGd1aS5fX3ByZXNldF9zZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcblxuICAgIGlmIChndWkubG9hZCAmJiBndWkubG9hZC5yZW1lbWJlcmVkKSB7XG5cbiAgICAgIGNvbW1vbi5lYWNoKGd1aS5sb2FkLnJlbWVtYmVyZWQsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgYWRkUHJlc2V0T3B0aW9uKGd1aSwga2V5LCBrZXkgPT0gZ3VpLnByZXNldCk7XG4gICAgICB9KTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBhZGRQcmVzZXRPcHRpb24oZ3VpLCBERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUUsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBkb20uYmluZChzZWxlY3QsICdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcblxuXG4gICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgZ3VpLl9fcHJlc2V0X3NlbGVjdC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgZ3VpLl9fcHJlc2V0X3NlbGVjdFtpbmRleF0uaW5uZXJIVE1MID0gZ3VpLl9fcHJlc2V0X3NlbGVjdFtpbmRleF0udmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGd1aS5wcmVzZXQgPSB0aGlzLnZhbHVlO1xuXG4gICAgfSk7XG5cbiAgICBkaXYuYXBwZW5kQ2hpbGQoc2VsZWN0KTtcbiAgICBkaXYuYXBwZW5kQ2hpbGQoZ2VhcnMpO1xuICAgIGRpdi5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgIGRpdi5hcHBlbmRDaGlsZChidXR0b24yKTtcbiAgICBkaXYuYXBwZW5kQ2hpbGQoYnV0dG9uMyk7XG5cbiAgICBpZiAoU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSkge1xuXG4gICAgICB2YXIgc2F2ZUxvY2FsbHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGctc2F2ZS1sb2NhbGx5Jyk7XG4gICAgICB2YXIgZXhwbGFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZy1sb2NhbC1leHBsYWluJyk7XG5cbiAgICAgIHNhdmVMb2NhbGx5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICB2YXIgbG9jYWxTdG9yYWdlQ2hlY2tCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGctbG9jYWwtc3RvcmFnZScpO1xuXG4gICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaChndWksICdpc0xvY2FsJykpID09PSAndHJ1ZScpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlQ2hlY2tCb3guc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2hvd0hpZGVFeHBsYWluKCkge1xuICAgICAgICBleHBsYWluLnN0eWxlLmRpc3BsYXkgPSBndWkudXNlTG9jYWxTdG9yYWdlID8gJ2Jsb2NrJyA6ICdub25lJztcbiAgICAgIH1cblxuICAgICAgc2hvd0hpZGVFeHBsYWluKCk7XG5cbiAgICAgIC8vIFRPRE86IFVzZSBhIGJvb2xlYW4gY29udHJvbGxlciwgZm9vbCFcbiAgICAgIGRvbS5iaW5kKGxvY2FsU3RvcmFnZUNoZWNrQm94LCAnY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGd1aS51c2VMb2NhbFN0b3JhZ2UgPSAhZ3VpLnVzZUxvY2FsU3RvcmFnZTtcbiAgICAgICAgc2hvd0hpZGVFeHBsYWluKCk7XG4gICAgICB9KTtcblxuICAgIH1cblxuICAgIHZhciBuZXdDb25zdHJ1Y3RvclRleHRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RnLW5ldy1jb25zdHJ1Y3RvcicpO1xuXG4gICAgZG9tLmJpbmQobmV3Q29uc3RydWN0b3JUZXh0QXJlYSwgJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoZS5tZXRhS2V5ICYmIChlLndoaWNoID09PSA2NyB8fCBlLmtleUNvZGUgPT0gNjcpKSB7XG4gICAgICAgIFNBVkVfRElBTE9HVUUuaGlkZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZG9tLmJpbmQoZ2VhcnMsICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgbmV3Q29uc3RydWN0b3JUZXh0QXJlYS5pbm5lckhUTUwgPSBKU09OLnN0cmluZ2lmeShndWkuZ2V0U2F2ZU9iamVjdCgpLCB1bmRlZmluZWQsIDIpO1xuICAgICAgU0FWRV9ESUFMT0dVRS5zaG93KCk7XG4gICAgICBuZXdDb25zdHJ1Y3RvclRleHRBcmVhLmZvY3VzKCk7XG4gICAgICBuZXdDb25zdHJ1Y3RvclRleHRBcmVhLnNlbGVjdCgpO1xuICAgIH0pO1xuXG4gICAgZG9tLmJpbmQoYnV0dG9uLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIGd1aS5zYXZlKCk7XG4gICAgfSk7XG5cbiAgICBkb20uYmluZChidXR0b24yLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwcmVzZXROYW1lID0gcHJvbXB0KCdFbnRlciBhIG5ldyBwcmVzZXQgbmFtZS4nKTtcbiAgICAgIGlmIChwcmVzZXROYW1lKSBndWkuc2F2ZUFzKHByZXNldE5hbWUpO1xuICAgIH0pO1xuXG4gICAgZG9tLmJpbmQoYnV0dG9uMywgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBndWkucmV2ZXJ0KCk7XG4gICAgfSk7XG5cbi8vICAgIGRpdi5hcHBlbmRDaGlsZChidXR0b24yKTtcblxuICB9XG5cbiAgZnVuY3Rpb24gYWRkUmVzaXplSGFuZGxlKGd1aSkge1xuXG4gICAgZ3VpLl9fcmVzaXplX2hhbmRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgY29tbW9uLmV4dGVuZChndWkuX19yZXNpemVfaGFuZGxlLnN0eWxlLCB7XG5cbiAgICAgIHdpZHRoOiAnNnB4JyxcbiAgICAgIG1hcmdpbkxlZnQ6ICctM3B4JyxcbiAgICAgIGhlaWdodDogJzIwMHB4JyxcbiAgICAgIGN1cnNvcjogJ2V3LXJlc2l6ZScsXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuLy8gICAgICBib3JkZXI6ICcxcHggc29saWQgYmx1ZSdcblxuICAgIH0pO1xuXG4gICAgdmFyIHBtb3VzZVg7XG5cbiAgICBkb20uYmluZChndWkuX19yZXNpemVfaGFuZGxlLCAnbW91c2Vkb3duJywgZHJhZ1N0YXJ0KTtcbiAgICBkb20uYmluZChndWkuX19jbG9zZUJ1dHRvbiwgJ21vdXNlZG93bicsIGRyYWdTdGFydCk7XG5cbiAgICBndWkuZG9tRWxlbWVudC5pbnNlcnRCZWZvcmUoZ3VpLl9fcmVzaXplX2hhbmRsZSwgZ3VpLmRvbUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpO1xuXG4gICAgZnVuY3Rpb24gZHJhZ1N0YXJ0KGUpIHtcblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBwbW91c2VYID0gZS5jbGllbnRYO1xuXG4gICAgICBkb20uYWRkQ2xhc3MoZ3VpLl9fY2xvc2VCdXR0b24sIEdVSS5DTEFTU19EUkFHKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIGRyYWcpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2V1cCcsIGRyYWdTdG9wKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhZyhlKSB7XG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgZ3VpLndpZHRoICs9IHBtb3VzZVggLSBlLmNsaWVudFg7XG4gICAgICBndWkub25SZXNpemUoKTtcbiAgICAgIHBtb3VzZVggPSBlLmNsaWVudFg7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYWdTdG9wKCkge1xuXG4gICAgICBkb20ucmVtb3ZlQ2xhc3MoZ3VpLl9fY2xvc2VCdXR0b24sIEdVSS5DTEFTU19EUkFHKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgZHJhZyk7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBkcmFnU3RvcCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFdpZHRoKGd1aSwgdykge1xuICAgIGd1aS5kb21FbGVtZW50LnN0eWxlLndpZHRoID0gdyArICdweCc7XG4gICAgLy8gQXV0byBwbGFjZWQgc2F2ZS1yb3dzIGFyZSBwb3NpdGlvbiBmaXhlZCwgc28gd2UgaGF2ZSB0b1xuICAgIC8vIHNldCB0aGUgd2lkdGggbWFudWFsbHkgaWYgd2Ugd2FudCBpdCB0byBibGVlZCB0byB0aGUgZWRnZVxuICAgIGlmIChndWkuX19zYXZlX3JvdyAmJiBndWkuYXV0b1BsYWNlKSB7XG4gICAgICBndWkuX19zYXZlX3Jvdy5zdHlsZS53aWR0aCA9IHcgKyAncHgnO1xuICAgIH1pZiAoZ3VpLl9fY2xvc2VCdXR0b24pIHtcbiAgICAgIGd1aS5fX2Nsb3NlQnV0dG9uLnN0eWxlLndpZHRoID0gdyArICdweCc7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q3VycmVudFByZXNldChndWksIHVzZUluaXRpYWxWYWx1ZXMpIHtcblxuICAgIHZhciB0b1JldHVybiA9IHt9O1xuXG4gICAgLy8gRm9yIGVhY2ggb2JqZWN0IEknbSByZW1lbWJlcmluZ1xuICAgIGNvbW1vbi5lYWNoKGd1aS5fX3JlbWVtYmVyZWRPYmplY3RzLCBmdW5jdGlvbih2YWwsIGluZGV4KSB7XG5cbiAgICAgIHZhciBzYXZlZF92YWx1ZXMgPSB7fTtcblxuICAgICAgLy8gVGhlIGNvbnRyb2xsZXJzIEkndmUgbWFkZSBmb3IgdGhjb21tb24uaXNPYmplY3QgYnkgcHJvcGVydHlcbiAgICAgIHZhciBjb250cm9sbGVyX21hcCA9XG4gICAgICAgICAgZ3VpLl9fcmVtZW1iZXJlZE9iamVjdEluZGVjZXNUb0NvbnRyb2xsZXJzW2luZGV4XTtcblxuICAgICAgLy8gUmVtZW1iZXIgZWFjaCB2YWx1ZSBmb3IgZWFjaCBwcm9wZXJ0eVxuICAgICAgY29tbW9uLmVhY2goY29udHJvbGxlcl9tYXAsIGZ1bmN0aW9uKGNvbnRyb2xsZXIsIHByb3BlcnR5KSB7XG4gICAgICAgIHNhdmVkX3ZhbHVlc1twcm9wZXJ0eV0gPSB1c2VJbml0aWFsVmFsdWVzID8gY29udHJvbGxlci5pbml0aWFsVmFsdWUgOiBjb250cm9sbGVyLmdldFZhbHVlKCk7XG4gICAgICB9KTtcblxuICAgICAgLy8gU2F2ZSB0aGUgdmFsdWVzIGZvciB0aGNvbW1vbi5pc09iamVjdFxuICAgICAgdG9SZXR1cm5baW5kZXhdID0gc2F2ZWRfdmFsdWVzO1xuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9SZXR1cm47XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFByZXNldE9wdGlvbihndWksIG5hbWUsIHNldFNlbGVjdGVkKSB7XG4gICAgdmFyIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgIG9wdC5pbm5lckhUTUwgPSBuYW1lO1xuICAgIG9wdC52YWx1ZSA9IG5hbWU7XG4gICAgZ3VpLl9fcHJlc2V0X3NlbGVjdC5hcHBlbmRDaGlsZChvcHQpO1xuICAgIGlmIChzZXRTZWxlY3RlZCkge1xuICAgICAgZ3VpLl9fcHJlc2V0X3NlbGVjdC5zZWxlY3RlZEluZGV4ID0gZ3VpLl9fcHJlc2V0X3NlbGVjdC5sZW5ndGggLSAxO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFByZXNldFNlbGVjdEluZGV4KGd1aSkge1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBndWkuX19wcmVzZXRfc2VsZWN0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgaWYgKGd1aS5fX3ByZXNldF9zZWxlY3RbaW5kZXhdLnZhbHVlID09IGd1aS5wcmVzZXQpIHtcbiAgICAgICAgZ3VpLl9fcHJlc2V0X3NlbGVjdC5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWFya1ByZXNldE1vZGlmaWVkKGd1aSwgbW9kaWZpZWQpIHtcbiAgICB2YXIgb3B0ID0gZ3VpLl9fcHJlc2V0X3NlbGVjdFtndWkuX19wcmVzZXRfc2VsZWN0LnNlbGVjdGVkSW5kZXhdO1xuLy8gICAgY29uc29sZS5sb2coJ21hcmsnLCBtb2RpZmllZCwgb3B0KTtcbiAgICBpZiAobW9kaWZpZWQpIHtcbiAgICAgIG9wdC5pbm5lckhUTUwgPSBvcHQudmFsdWUgKyBcIipcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0LmlubmVySFRNTCA9IG9wdC52YWx1ZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5cyhjb250cm9sbGVyQXJyYXkpIHtcblxuXG4gICAgaWYgKGNvbnRyb2xsZXJBcnJheS5sZW5ndGggIT0gMCkge1xuXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgICAgIHVwZGF0ZURpc3BsYXlzKGNvbnRyb2xsZXJBcnJheSk7XG4gICAgICB9KTtcblxuICAgIH1cblxuICAgIGNvbW1vbi5lYWNoKGNvbnRyb2xsZXJBcnJheSwgZnVuY3Rpb24oYykge1xuICAgICAgYy51cGRhdGVEaXNwbGF5KCk7XG4gICAgfSk7XG5cbiAgfVxuXG4gIHJldHVybiBHVUk7XG5cbn0pKGRhdC51dGlscy5jc3MsXG5cIjxkaXYgaWQ9XFxcImRnLXNhdmVcXFwiIGNsYXNzPVxcXCJkZyBkaWFsb2d1ZVxcXCI+XFxuXFxuICBIZXJlJ3MgdGhlIG5ldyBsb2FkIHBhcmFtZXRlciBmb3IgeW91ciA8Y29kZT5HVUk8L2NvZGU+J3MgY29uc3RydWN0b3I6XFxuXFxuICA8dGV4dGFyZWEgaWQ9XFxcImRnLW5ldy1jb25zdHJ1Y3RvclxcXCI+PC90ZXh0YXJlYT5cXG5cXG4gIDxkaXYgaWQ9XFxcImRnLXNhdmUtbG9jYWxseVxcXCI+XFxuXFxuICAgIDxpbnB1dCBpZD1cXFwiZGctbG9jYWwtc3RvcmFnZVxcXCIgdHlwZT1cXFwiY2hlY2tib3hcXFwiLz4gQXV0b21hdGljYWxseSBzYXZlXFxuICAgIHZhbHVlcyB0byA8Y29kZT5sb2NhbFN0b3JhZ2U8L2NvZGU+IG9uIGV4aXQuXFxuXFxuICAgIDxkaXYgaWQ9XFxcImRnLWxvY2FsLWV4cGxhaW5cXFwiPlRoZSB2YWx1ZXMgc2F2ZWQgdG8gPGNvZGU+bG9jYWxTdG9yYWdlPC9jb2RlPiB3aWxsXFxuICAgICAgb3ZlcnJpZGUgdGhvc2UgcGFzc2VkIHRvIDxjb2RlPmRhdC5HVUk8L2NvZGU+J3MgY29uc3RydWN0b3IuIFRoaXMgbWFrZXMgaXRcXG4gICAgICBlYXNpZXIgdG8gd29yayBpbmNyZW1lbnRhbGx5LCBidXQgPGNvZGU+bG9jYWxTdG9yYWdlPC9jb2RlPiBpcyBmcmFnaWxlLFxcbiAgICAgIGFuZCB5b3VyIGZyaWVuZHMgbWF5IG5vdCBzZWUgdGhlIHNhbWUgdmFsdWVzIHlvdSBkby5cXG4gICAgICBcXG4gICAgPC9kaXY+XFxuICAgIFxcbiAgPC9kaXY+XFxuXFxuPC9kaXY+XCIsXG5cIi5kZyB1bHtsaXN0LXN0eWxlOm5vbmU7bWFyZ2luOjA7cGFkZGluZzowO3dpZHRoOjEwMCU7Y2xlYXI6Ym90aH0uZGcuYWN7cG9zaXRpb246Zml4ZWQ7dG9wOjA7bGVmdDowO3JpZ2h0OjA7aGVpZ2h0OjA7ei1pbmRleDowfS5kZzpub3QoLmFjKSAubWFpbntvdmVyZmxvdzpoaWRkZW59LmRnLm1haW57LXdlYmtpdC10cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXI7LW8tdHJhbnNpdGlvbjpvcGFjaXR5IDAuMXMgbGluZWFyOy1tb3otdHJhbnNpdGlvbjpvcGFjaXR5IDAuMXMgbGluZWFyO3RyYW5zaXRpb246b3BhY2l0eSAwLjFzIGxpbmVhcn0uZGcubWFpbi50YWxsZXItdGhhbi13aW5kb3d7b3ZlcmZsb3cteTphdXRvfS5kZy5tYWluLnRhbGxlci10aGFuLXdpbmRvdyAuY2xvc2UtYnV0dG9ue29wYWNpdHk6MTttYXJnaW4tdG9wOi0xcHg7Ym9yZGVyLXRvcDoxcHggc29saWQgIzJjMmMyY30uZGcubWFpbiB1bC5jbG9zZWQgLmNsb3NlLWJ1dHRvbntvcGFjaXR5OjEgIWltcG9ydGFudH0uZGcubWFpbjpob3ZlciAuY2xvc2UtYnV0dG9uLC5kZy5tYWluIC5jbG9zZS1idXR0b24uZHJhZ3tvcGFjaXR5OjF9LmRnLm1haW4gLmNsb3NlLWJ1dHRvbnstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSAwLjFzIGxpbmVhcjstby10cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXI7LW1vei10cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXI7dHJhbnNpdGlvbjpvcGFjaXR5IDAuMXMgbGluZWFyO2JvcmRlcjowO3Bvc2l0aW9uOmFic29sdXRlO2xpbmUtaGVpZ2h0OjE5cHg7aGVpZ2h0OjIwcHg7Y3Vyc29yOnBvaW50ZXI7dGV4dC1hbGlnbjpjZW50ZXI7YmFja2dyb3VuZC1jb2xvcjojMDAwfS5kZy5tYWluIC5jbG9zZS1idXR0b246aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojMTExfS5kZy5he2Zsb2F0OnJpZ2h0O21hcmdpbi1yaWdodDoxNXB4O292ZXJmbG93LXg6aGlkZGVufS5kZy5hLmhhcy1zYXZlIHVse21hcmdpbi10b3A6MjdweH0uZGcuYS5oYXMtc2F2ZSB1bC5jbG9zZWR7bWFyZ2luLXRvcDowfS5kZy5hIC5zYXZlLXJvd3twb3NpdGlvbjpmaXhlZDt0b3A6MDt6LWluZGV4OjEwMDJ9LmRnIGxpey13ZWJraXQtdHJhbnNpdGlvbjpoZWlnaHQgMC4xcyBlYXNlLW91dDstby10cmFuc2l0aW9uOmhlaWdodCAwLjFzIGVhc2Utb3V0Oy1tb3otdHJhbnNpdGlvbjpoZWlnaHQgMC4xcyBlYXNlLW91dDt0cmFuc2l0aW9uOmhlaWdodCAwLjFzIGVhc2Utb3V0fS5kZyBsaTpub3QoLmZvbGRlcil7Y3Vyc29yOmF1dG87aGVpZ2h0OjI3cHg7bGluZS1oZWlnaHQ6MjdweDtvdmVyZmxvdzpoaWRkZW47cGFkZGluZzowIDRweCAwIDVweH0uZGcgbGkuZm9sZGVye3BhZGRpbmc6MDtib3JkZXItbGVmdDo0cHggc29saWQgcmdiYSgwLDAsMCwwKX0uZGcgbGkudGl0bGV7Y3Vyc29yOnBvaW50ZXI7bWFyZ2luLWxlZnQ6LTRweH0uZGcgLmNsb3NlZCBsaTpub3QoLnRpdGxlKSwuZGcgLmNsb3NlZCB1bCBsaSwuZGcgLmNsb3NlZCB1bCBsaSA+ICp7aGVpZ2h0OjA7b3ZlcmZsb3c6aGlkZGVuO2JvcmRlcjowfS5kZyAuY3J7Y2xlYXI6Ym90aDtwYWRkaW5nLWxlZnQ6M3B4O2hlaWdodDoyN3B4fS5kZyAucHJvcGVydHktbmFtZXtjdXJzb3I6ZGVmYXVsdDtmbG9hdDpsZWZ0O2NsZWFyOmxlZnQ7d2lkdGg6NDAlO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzfS5kZyAuY3tmbG9hdDpsZWZ0O3dpZHRoOjYwJX0uZGcgLmMgaW5wdXRbdHlwZT10ZXh0XXtib3JkZXI6MDttYXJnaW4tdG9wOjRweDtwYWRkaW5nOjNweDt3aWR0aDoxMDAlO2Zsb2F0OnJpZ2h0fS5kZyAuaGFzLXNsaWRlciBpbnB1dFt0eXBlPXRleHRde3dpZHRoOjMwJTttYXJnaW4tbGVmdDowfS5kZyAuc2xpZGVye2Zsb2F0OmxlZnQ7d2lkdGg6NjYlO21hcmdpbi1sZWZ0Oi01cHg7bWFyZ2luLXJpZ2h0OjA7aGVpZ2h0OjE5cHg7bWFyZ2luLXRvcDo0cHh9LmRnIC5zbGlkZXItZmd7aGVpZ2h0OjEwMCV9LmRnIC5jIGlucHV0W3R5cGU9Y2hlY2tib3hde21hcmdpbi10b3A6OXB4fS5kZyAuYyBzZWxlY3R7bWFyZ2luLXRvcDo1cHh9LmRnIC5jci5mdW5jdGlvbiwuZGcgLmNyLmZ1bmN0aW9uIC5wcm9wZXJ0eS1uYW1lLC5kZyAuY3IuZnVuY3Rpb24gKiwuZGcgLmNyLmJvb2xlYW4sLmRnIC5jci5ib29sZWFuICp7Y3Vyc29yOnBvaW50ZXJ9LmRnIC5zZWxlY3RvcntkaXNwbGF5Om5vbmU7cG9zaXRpb246YWJzb2x1dGU7bWFyZ2luLWxlZnQ6LTlweDttYXJnaW4tdG9wOjIzcHg7ei1pbmRleDoxMH0uZGcgLmM6aG92ZXIgLnNlbGVjdG9yLC5kZyAuc2VsZWN0b3IuZHJhZ3tkaXNwbGF5OmJsb2NrfS5kZyBsaS5zYXZlLXJvd3twYWRkaW5nOjB9LmRnIGxpLnNhdmUtcm93IC5idXR0b257ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzowcHggNnB4fS5kZy5kaWFsb2d1ZXtiYWNrZ3JvdW5kLWNvbG9yOiMyMjI7d2lkdGg6NDYwcHg7cGFkZGluZzoxNXB4O2ZvbnQtc2l6ZToxM3B4O2xpbmUtaGVpZ2h0OjE1cHh9I2RnLW5ldy1jb25zdHJ1Y3RvcntwYWRkaW5nOjEwcHg7Y29sb3I6IzIyMjtmb250LWZhbWlseTpNb25hY28sIG1vbm9zcGFjZTtmb250LXNpemU6MTBweDtib3JkZXI6MDtyZXNpemU6bm9uZTtib3gtc2hhZG93Omluc2V0IDFweCAxcHggMXB4ICM4ODg7d29yZC13cmFwOmJyZWFrLXdvcmQ7bWFyZ2luOjEycHggMDtkaXNwbGF5OmJsb2NrO3dpZHRoOjQ0MHB4O292ZXJmbG93LXk6c2Nyb2xsO2hlaWdodDoxMDBweDtwb3NpdGlvbjpyZWxhdGl2ZX0jZGctbG9jYWwtZXhwbGFpbntkaXNwbGF5Om5vbmU7Zm9udC1zaXplOjExcHg7bGluZS1oZWlnaHQ6MTdweDtib3JkZXItcmFkaXVzOjNweDtiYWNrZ3JvdW5kLWNvbG9yOiMzMzM7cGFkZGluZzo4cHg7bWFyZ2luLXRvcDoxMHB4fSNkZy1sb2NhbC1leHBsYWluIGNvZGV7Zm9udC1zaXplOjEwcHh9I2RhdC1ndWktc2F2ZS1sb2NhbGx5e2Rpc3BsYXk6bm9uZX0uZGd7Y29sb3I6I2VlZTtmb250OjExcHggJ0x1Y2lkYSBHcmFuZGUnLCBzYW5zLXNlcmlmO3RleHQtc2hhZG93OjAgLTFweCAwICMxMTF9LmRnLm1haW46Oi13ZWJraXQtc2Nyb2xsYmFye3dpZHRoOjVweDtiYWNrZ3JvdW5kOiMxYTFhMWF9LmRnLm1haW46Oi13ZWJraXQtc2Nyb2xsYmFyLWNvcm5lcntoZWlnaHQ6MDtkaXNwbGF5Om5vbmV9LmRnLm1haW46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1ie2JvcmRlci1yYWRpdXM6NXB4O2JhY2tncm91bmQ6IzY3Njc2N30uZGcgbGk6bm90KC5mb2xkZXIpe2JhY2tncm91bmQ6IzFhMWExYTtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjMmMyYzJjfS5kZyBsaS5zYXZlLXJvd3tsaW5lLWhlaWdodDoyNXB4O2JhY2tncm91bmQ6I2RhZDVjYjtib3JkZXI6MH0uZGcgbGkuc2F2ZS1yb3cgc2VsZWN0e21hcmdpbi1sZWZ0OjVweDt3aWR0aDoxMDhweH0uZGcgbGkuc2F2ZS1yb3cgLmJ1dHRvbnttYXJnaW4tbGVmdDo1cHg7bWFyZ2luLXRvcDoxcHg7Ym9yZGVyLXJhZGl1czoycHg7Zm9udC1zaXplOjlweDtsaW5lLWhlaWdodDo3cHg7cGFkZGluZzo0cHggNHB4IDVweCA0cHg7YmFja2dyb3VuZDojYzViZGFkO2NvbG9yOiNmZmY7dGV4dC1zaGFkb3c6MCAxcHggMCAjYjBhNThmO2JveC1zaGFkb3c6MCAtMXB4IDAgI2IwYTU4ZjtjdXJzb3I6cG9pbnRlcn0uZGcgbGkuc2F2ZS1yb3cgLmJ1dHRvbi5nZWFyc3tiYWNrZ3JvdW5kOiNjNWJkYWQgdXJsKGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQXNBQUFBTkNBWUFBQUIvOVpRN0FBQUFHWFJGV0hSVGIyWjBkMkZ5WlFCQlpHOWlaU0JKYldGblpWSmxZV1I1Y2NsbFBBQUFBUUpKUkVGVWVOcGlZS0FVL1AvL1B3R0lDL0FwQ0FCaUJTQVcrSThBQ2xBY2dLeFE0VDlob01BRVVyeHgyUVNHTjYrZWdEWCsvdldUNGU3TjgyQU1Zb1BBeC9ldndXb1lvU1liQUNYMnM3S3hDeHpjc2V6RGgzZXZGb0RFQllURUVxeWNnZ1dBekE5QXVVU1FRZ2VZUGE5ZlB2Ni9ZV20vQWN4NUlQYjd0eS9mdytRWmJsdzY3dkRzOFIwWUh5UWhnT2J4K3lBSmtCcW1HNWRQUERoMWFQT0dSL2V1Z1cwRzR2bElvVElmeUZjQStRZWtoaEhKaFBkUXhiaUFJZ3VNQlRRWnJQRDcxMDhNNnJvV1lERlFpSUFBdjZBb3cvMWJGd1hnaXMrZjJMVUF5bndvSWFOY3o4WE54M0RsN01FSlVER1FweDlndFE4WUN1ZUIrRDI2T0VDQUFRRGFkdDdlNDZENDJRQUFBQUJKUlU1RXJrSmdnZz09KSAycHggMXB4IG5vLXJlcGVhdDtoZWlnaHQ6N3B4O3dpZHRoOjhweH0uZGcgbGkuc2F2ZS1yb3cgLmJ1dHRvbjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNiYWIxOWU7Ym94LXNoYWRvdzowIC0xcHggMCAjYjBhNThmfS5kZyBsaS5mb2xkZXJ7Ym9yZGVyLWJvdHRvbTowfS5kZyBsaS50aXRsZXtwYWRkaW5nLWxlZnQ6MTZweDtiYWNrZ3JvdW5kOiMwMDAgdXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEJRQUZBSkVBQVAvLy8vUHo4Ly8vLy8vLy95SDVCQUVBQUFJQUxBQUFBQUFGQUFVQUFBSUlsSStoS2dGeG9DZ0FPdz09KSA2cHggMTBweCBuby1yZXBlYXQ7Y3Vyc29yOnBvaW50ZXI7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjIpfS5kZyAuY2xvc2VkIGxpLnRpdGxle2JhY2tncm91bmQtaW1hZ2U6dXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEJRQUZBSkVBQVAvLy8vUHo4Ly8vLy8vLy95SDVCQUVBQUFJQUxBQUFBQUFGQUFVQUFBSUlsR0lXcU1DYldBRUFPdz09KX0uZGcgLmNyLmJvb2xlYW57Ym9yZGVyLWxlZnQ6M3B4IHNvbGlkICM4MDY3ODd9LmRnIC5jci5mdW5jdGlvbntib3JkZXItbGVmdDozcHggc29saWQgI2U2MWQ1Zn0uZGcgLmNyLm51bWJlcntib3JkZXItbGVmdDozcHggc29saWQgIzJmYTFkNn0uZGcgLmNyLm51bWJlciBpbnB1dFt0eXBlPXRleHRde2NvbG9yOiMyZmExZDZ9LmRnIC5jci5zdHJpbmd7Ym9yZGVyLWxlZnQ6M3B4IHNvbGlkICMxZWQzNmZ9LmRnIC5jci5zdHJpbmcgaW5wdXRbdHlwZT10ZXh0XXtjb2xvcjojMWVkMzZmfS5kZyAuY3IuZnVuY3Rpb246aG92ZXIsLmRnIC5jci5ib29sZWFuOmhvdmVye2JhY2tncm91bmQ6IzExMX0uZGcgLmMgaW5wdXRbdHlwZT10ZXh0XXtiYWNrZ3JvdW5kOiMzMDMwMzA7b3V0bGluZTpub25lfS5kZyAuYyBpbnB1dFt0eXBlPXRleHRdOmhvdmVye2JhY2tncm91bmQ6IzNjM2MzY30uZGcgLmMgaW5wdXRbdHlwZT10ZXh0XTpmb2N1c3tiYWNrZ3JvdW5kOiM0OTQ5NDk7Y29sb3I6I2ZmZn0uZGcgLmMgLnNsaWRlcntiYWNrZ3JvdW5kOiMzMDMwMzA7Y3Vyc29yOmV3LXJlc2l6ZX0uZGcgLmMgLnNsaWRlci1mZ3tiYWNrZ3JvdW5kOiMyZmExZDZ9LmRnIC5jIC5zbGlkZXI6aG92ZXJ7YmFja2dyb3VuZDojM2MzYzNjfS5kZyAuYyAuc2xpZGVyOmhvdmVyIC5zbGlkZXItZmd7YmFja2dyb3VuZDojNDRhYmRhfVxcblwiLFxuZGF0LmNvbnRyb2xsZXJzLmZhY3RvcnkgPSAoZnVuY3Rpb24gKE9wdGlvbkNvbnRyb2xsZXIsIE51bWJlckNvbnRyb2xsZXJCb3gsIE51bWJlckNvbnRyb2xsZXJTbGlkZXIsIFN0cmluZ0NvbnRyb2xsZXIsIEZ1bmN0aW9uQ29udHJvbGxlciwgQm9vbGVhbkNvbnRyb2xsZXIsIGNvbW1vbikge1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXG4gICAgICAgIHZhciBpbml0aWFsVmFsdWUgPSBvYmplY3RbcHJvcGVydHldO1xuXG4gICAgICAgIC8vIFByb3ZpZGluZyBvcHRpb25zP1xuICAgICAgICBpZiAoY29tbW9uLmlzQXJyYXkoYXJndW1lbnRzWzJdKSB8fCBjb21tb24uaXNPYmplY3QoYXJndW1lbnRzWzJdKSkge1xuICAgICAgICAgIHJldHVybiBuZXcgT3B0aW9uQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5LCBhcmd1bWVudHNbMl0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUHJvdmlkaW5nIGEgbWFwP1xuXG4gICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIoaW5pdGlhbFZhbHVlKSkge1xuXG4gICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihhcmd1bWVudHNbMl0pICYmIGNvbW1vbi5pc051bWJlcihhcmd1bWVudHNbM10pKSB7XG5cbiAgICAgICAgICAgIC8vIEhhcyBtaW4gYW5kIG1heC5cbiAgICAgICAgICAgIHJldHVybiBuZXcgTnVtYmVyQ29udHJvbGxlclNsaWRlcihvYmplY3QsIHByb3BlcnR5LCBhcmd1bWVudHNbMl0sIGFyZ3VtZW50c1szXSk7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IE51bWJlckNvbnRyb2xsZXJCb3gob2JqZWN0LCBwcm9wZXJ0eSwgeyBtaW46IGFyZ3VtZW50c1syXSwgbWF4OiBhcmd1bWVudHNbM10gfSk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb21tb24uaXNTdHJpbmcoaW5pdGlhbFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBuZXcgU3RyaW5nQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb21tb24uaXNGdW5jdGlvbihpbml0aWFsVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbkNvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSwgJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbW1vbi5pc0Jvb2xlYW4oaW5pdGlhbFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBuZXcgQm9vbGVhbkNvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfSkoZGF0LmNvbnRyb2xsZXJzLk9wdGlvbkNvbnRyb2xsZXIsXG5kYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlckJveCxcbmRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyU2xpZGVyLFxuZGF0LmNvbnRyb2xsZXJzLlN0cmluZ0NvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKENvbnRyb2xsZXIsIGRvbSwgY29tbW9uKSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBQcm92aWRlcyBhIHRleHQgaW5wdXQgdG8gYWx0ZXIgdGhlIHN0cmluZyBwcm9wZXJ0eSBvZiBhbiBvYmplY3QuXG4gICAqXG4gICAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXG4gICAqL1xuICB2YXIgU3RyaW5nQ29udHJvbGxlciA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcblxuICAgIFN0cmluZ0NvbnRyb2xsZXIuc3VwZXJjbGFzcy5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuX19pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGhpcy5fX2lucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XG5cbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdrZXl1cCcsIG9uQ2hhbmdlKTtcbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdjaGFuZ2UnLCBvbkNoYW5nZSk7XG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAnYmx1cicsIG9uQmx1cik7XG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgIHRoaXMuYmx1cigpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFxuXG4gICAgZnVuY3Rpb24gb25DaGFuZ2UoKSB7XG4gICAgICBfdGhpcy5zZXRWYWx1ZShfdGhpcy5fX2lucHV0LnZhbHVlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkJsdXIoKSB7XG4gICAgICBpZiAoX3RoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICBfdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwoX3RoaXMsIF90aGlzLmdldFZhbHVlKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlRGlzcGxheSgpO1xuXG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19pbnB1dCk7XG5cbiAgfTtcblxuICBTdHJpbmdDb250cm9sbGVyLnN1cGVyY2xhc3MgPSBDb250cm9sbGVyO1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIFN0cmluZ0NvbnRyb2xsZXIucHJvdG90eXBlLFxuICAgICAgQ29udHJvbGxlci5wcm90b3R5cGUsXG5cbiAgICAgIHtcblxuICAgICAgICB1cGRhdGVEaXNwbGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBTdG9wcyB0aGUgY2FyZXQgZnJvbSBtb3Zpbmcgb24gYWNjb3VudCBvZjpcbiAgICAgICAgICAvLyBrZXl1cCAtPiBzZXRWYWx1ZSAtPiB1cGRhdGVEaXNwbGF5XG4gICAgICAgICAgaWYgKCFkb20uaXNBY3RpdmUodGhpcy5fX2lucHV0KSkge1xuICAgICAgICAgICAgdGhpcy5fX2lucHV0LnZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gU3RyaW5nQ29udHJvbGxlci5zdXBlcmNsYXNzLnByb3RvdHlwZS51cGRhdGVEaXNwbGF5LmNhbGwodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICk7XG5cbiAgcmV0dXJuIFN0cmluZ0NvbnRyb2xsZXI7XG5cbn0pKGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLFxuZGF0LmRvbS5kb20sXG5kYXQudXRpbHMuY29tbW9uKSxcbmRhdC5jb250cm9sbGVycy5GdW5jdGlvbkNvbnRyb2xsZXIsXG5kYXQuY29udHJvbGxlcnMuQm9vbGVhbkNvbnRyb2xsZXIsXG5kYXQudXRpbHMuY29tbW9uKSxcbmRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLFxuZGF0LmNvbnRyb2xsZXJzLkJvb2xlYW5Db250cm9sbGVyLFxuZGF0LmNvbnRyb2xsZXJzLkZ1bmN0aW9uQ29udHJvbGxlcixcbmRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyQm94LFxuZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJTbGlkZXIsXG5kYXQuY29udHJvbGxlcnMuT3B0aW9uQ29udHJvbGxlcixcbmRhdC5jb250cm9sbGVycy5Db2xvckNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKENvbnRyb2xsZXIsIGRvbSwgQ29sb3IsIGludGVycHJldCwgY29tbW9uKSB7XG5cbiAgdmFyIENvbG9yQ29udHJvbGxlciA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcblxuICAgIENvbG9yQ29udHJvbGxlci5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICB0aGlzLl9fY29sb3IgPSBuZXcgQ29sb3IodGhpcy5nZXRWYWx1ZSgpKTtcbiAgICB0aGlzLl9fdGVtcCA9IG5ldyBDb2xvcigwKTtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGRvbS5tYWtlU2VsZWN0YWJsZSh0aGlzLmRvbUVsZW1lbnQsIGZhbHNlKTtcblxuICAgIHRoaXMuX19zZWxlY3RvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19zZWxlY3Rvci5jbGFzc05hbWUgPSAnc2VsZWN0b3InO1xuXG4gICAgdGhpcy5fX3NhdHVyYXRpb25fZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9fc2F0dXJhdGlvbl9maWVsZC5jbGFzc05hbWUgPSAnc2F0dXJhdGlvbi1maWVsZCc7XG5cbiAgICB0aGlzLl9fZmllbGRfa25vYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19maWVsZF9rbm9iLmNsYXNzTmFtZSA9ICdmaWVsZC1rbm9iJztcbiAgICB0aGlzLl9fZmllbGRfa25vYl9ib3JkZXIgPSAnMnB4IHNvbGlkICc7XG5cbiAgICB0aGlzLl9faHVlX2tub2IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9faHVlX2tub2IuY2xhc3NOYW1lID0gJ2h1ZS1rbm9iJztcblxuICAgIHRoaXMuX19odWVfZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9faHVlX2ZpZWxkLmNsYXNzTmFtZSA9ICdodWUtZmllbGQnO1xuXG4gICAgdGhpcy5fX2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0aGlzLl9faW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICB0aGlzLl9faW5wdXRfdGV4dFNoYWRvdyA9ICcwIDFweCAxcHggJztcblxuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykgeyAvLyBvbiBlbnRlclxuICAgICAgICBvbkJsdXIuY2FsbCh0aGlzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2JsdXInLCBvbkJsdXIpO1xuXG4gICAgZG9tLmJpbmQodGhpcy5fX3NlbGVjdG9yLCAnbW91c2Vkb3duJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICBkb21cbiAgICAgICAgLmFkZENsYXNzKHRoaXMsICdkcmFnJylcbiAgICAgICAgLmJpbmQod2luZG93LCAnbW91c2V1cCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBkb20ucmVtb3ZlQ2xhc3MoX3RoaXMuX19zZWxlY3RvciwgJ2RyYWcnKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIHZhciB2YWx1ZV9maWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgY29tbW9uLmV4dGVuZCh0aGlzLl9fc2VsZWN0b3Iuc3R5bGUsIHtcbiAgICAgIHdpZHRoOiAnMTIycHgnLFxuICAgICAgaGVpZ2h0OiAnMTAycHgnLFxuICAgICAgcGFkZGluZzogJzNweCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMjIyJyxcbiAgICAgIGJveFNoYWRvdzogJzBweCAxcHggM3B4IHJnYmEoMCwwLDAsMC4zKSdcbiAgICB9KTtcblxuICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX2ZpZWxkX2tub2Iuc3R5bGUsIHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgd2lkdGg6ICcxMnB4JyxcbiAgICAgIGhlaWdodDogJzEycHgnLFxuICAgICAgYm9yZGVyOiB0aGlzLl9fZmllbGRfa25vYl9ib3JkZXIgKyAodGhpcy5fX2NvbG9yLnYgPCAuNSA/ICcjZmZmJyA6ICcjMDAwJyksXG4gICAgICBib3hTaGFkb3c6ICcwcHggMXB4IDNweCByZ2JhKDAsMCwwLDAuNSknLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMTJweCcsXG4gICAgICB6SW5kZXg6IDFcbiAgICB9KTtcbiAgICBcbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19odWVfa25vYi5zdHlsZSwge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB3aWR0aDogJzE1cHgnLFxuICAgICAgaGVpZ2h0OiAnMnB4JyxcbiAgICAgIGJvcmRlclJpZ2h0OiAnNHB4IHNvbGlkICNmZmYnLFxuICAgICAgekluZGV4OiAxXG4gICAgfSk7XG5cbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19zYXR1cmF0aW9uX2ZpZWxkLnN0eWxlLCB7XG4gICAgICB3aWR0aDogJzEwMHB4JyxcbiAgICAgIGhlaWdodDogJzEwMHB4JyxcbiAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjNTU1JyxcbiAgICAgIG1hcmdpblJpZ2h0OiAnM3B4JyxcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICB9KTtcblxuICAgIGNvbW1vbi5leHRlbmQodmFsdWVfZmllbGQuc3R5bGUsIHtcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIGJhY2tncm91bmQ6ICdub25lJ1xuICAgIH0pO1xuICAgIFxuICAgIGxpbmVhckdyYWRpZW50KHZhbHVlX2ZpZWxkLCAndG9wJywgJ3JnYmEoMCwwLDAsMCknLCAnIzAwMCcpO1xuXG4gICAgY29tbW9uLmV4dGVuZCh0aGlzLl9faHVlX2ZpZWxkLnN0eWxlLCB7XG4gICAgICB3aWR0aDogJzE1cHgnLFxuICAgICAgaGVpZ2h0OiAnMTAwcHgnLFxuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICBib3JkZXI6ICcxcHggc29saWQgIzU1NScsXG4gICAgICBjdXJzb3I6ICducy1yZXNpemUnXG4gICAgfSk7XG5cbiAgICBodWVHcmFkaWVudCh0aGlzLl9faHVlX2ZpZWxkKTtcblxuICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX2lucHV0LnN0eWxlLCB7XG4gICAgICBvdXRsaW5lOiAnbm9uZScsXG4vLyAgICAgIHdpZHRoOiAnMTIwcHgnLFxuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbi8vICAgICAgcGFkZGluZzogJzRweCcsXG4vLyAgICAgIG1hcmdpbkJvdHRvbTogJzZweCcsXG4gICAgICBjb2xvcjogJyNmZmYnLFxuICAgICAgYm9yZGVyOiAwLFxuICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgdGV4dFNoYWRvdzogdGhpcy5fX2lucHV0X3RleHRTaGFkb3cgKyAncmdiYSgwLDAsMCwwLjcpJ1xuICAgIH0pO1xuXG4gICAgZG9tLmJpbmQodGhpcy5fX3NhdHVyYXRpb25fZmllbGQsICdtb3VzZWRvd24nLCBmaWVsZERvd24pO1xuICAgIGRvbS5iaW5kKHRoaXMuX19maWVsZF9rbm9iLCAnbW91c2Vkb3duJywgZmllbGREb3duKTtcblxuICAgIGRvbS5iaW5kKHRoaXMuX19odWVfZmllbGQsICdtb3VzZWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICBzZXRIKGUpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgc2V0SCk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZXVwJywgdW5iaW5kSCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBmaWVsZERvd24oZSkge1xuICAgICAgc2V0U1YoZSk7XG4gICAgICAvLyBkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9ICdub25lJztcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIHNldFNWKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCB1bmJpbmRTVik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5iaW5kU1YoKSB7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIHNldFNWKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIHVuYmluZFNWKTtcbiAgICAgIC8vIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQmx1cigpIHtcbiAgICAgIHZhciBpID0gaW50ZXJwcmV0KHRoaXMudmFsdWUpO1xuICAgICAgaWYgKGkgIT09IGZhbHNlKSB7XG4gICAgICAgIF90aGlzLl9fY29sb3IuX19zdGF0ZSA9IGk7XG4gICAgICAgIF90aGlzLnNldFZhbHVlKF90aGlzLl9fY29sb3IudG9PcmlnaW5hbCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSBfdGhpcy5fX2NvbG9yLnRvU3RyaW5nKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5iaW5kSCgpIHtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgc2V0SCk7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCB1bmJpbmRIKTtcbiAgICB9XG5cbiAgICB0aGlzLl9fc2F0dXJhdGlvbl9maWVsZC5hcHBlbmRDaGlsZCh2YWx1ZV9maWVsZCk7XG4gICAgdGhpcy5fX3NlbGVjdG9yLmFwcGVuZENoaWxkKHRoaXMuX19maWVsZF9rbm9iKTtcbiAgICB0aGlzLl9fc2VsZWN0b3IuYXBwZW5kQ2hpbGQodGhpcy5fX3NhdHVyYXRpb25fZmllbGQpO1xuICAgIHRoaXMuX19zZWxlY3Rvci5hcHBlbmRDaGlsZCh0aGlzLl9faHVlX2ZpZWxkKTtcbiAgICB0aGlzLl9faHVlX2ZpZWxkLmFwcGVuZENoaWxkKHRoaXMuX19odWVfa25vYik7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX2lucHV0KTtcbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX3NlbGVjdG9yKTtcblxuICAgIHRoaXMudXBkYXRlRGlzcGxheSgpO1xuXG4gICAgZnVuY3Rpb24gc2V0U1YoZSkge1xuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhciB3ID0gZG9tLmdldFdpZHRoKF90aGlzLl9fc2F0dXJhdGlvbl9maWVsZCk7XG4gICAgICB2YXIgbyA9IGRvbS5nZXRPZmZzZXQoX3RoaXMuX19zYXR1cmF0aW9uX2ZpZWxkKTtcbiAgICAgIHZhciBzID0gKGUuY2xpZW50WCAtIG8ubGVmdCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCkgLyB3O1xuICAgICAgdmFyIHYgPSAxIC0gKGUuY2xpZW50WSAtIG8udG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3ApIC8gdztcblxuICAgICAgaWYgKHYgPiAxKSB2ID0gMTtcbiAgICAgIGVsc2UgaWYgKHYgPCAwKSB2ID0gMDtcblxuICAgICAgaWYgKHMgPiAxKSBzID0gMTtcbiAgICAgIGVsc2UgaWYgKHMgPCAwKSBzID0gMDtcblxuICAgICAgX3RoaXMuX19jb2xvci52ID0gdjtcbiAgICAgIF90aGlzLl9fY29sb3IucyA9IHM7XG5cbiAgICAgIF90aGlzLnNldFZhbHVlKF90aGlzLl9fY29sb3IudG9PcmlnaW5hbCgpKTtcblxuXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRIKGUpIHtcblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgcyA9IGRvbS5nZXRIZWlnaHQoX3RoaXMuX19odWVfZmllbGQpO1xuICAgICAgdmFyIG8gPSBkb20uZ2V0T2Zmc2V0KF90aGlzLl9faHVlX2ZpZWxkKTtcbiAgICAgIHZhciBoID0gMSAtIChlLmNsaWVudFkgLSBvLnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wKSAvIHM7XG5cbiAgICAgIGlmIChoID4gMSkgaCA9IDE7XG4gICAgICBlbHNlIGlmIChoIDwgMCkgaCA9IDA7XG5cbiAgICAgIF90aGlzLl9fY29sb3IuaCA9IGggKiAzNjA7XG5cbiAgICAgIF90aGlzLnNldFZhbHVlKF90aGlzLl9fY29sb3IudG9PcmlnaW5hbCgpKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gIH07XG5cbiAgQ29sb3JDb250cm9sbGVyLnN1cGVyY2xhc3MgPSBDb250cm9sbGVyO1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIENvbG9yQ29udHJvbGxlci5wcm90b3R5cGUsXG4gICAgICBDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAge1xuXG4gICAgICAgIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgdmFyIGkgPSBpbnRlcnByZXQodGhpcy5nZXRWYWx1ZSgpKTtcblxuICAgICAgICAgIGlmIChpICE9PSBmYWxzZSkge1xuXG4gICAgICAgICAgICB2YXIgbWlzbWF0Y2ggPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIG1pc21hdGNoIG9uIHRoZSBpbnRlcnByZXRlZCB2YWx1ZS5cblxuICAgICAgICAgICAgY29tbW9uLmVhY2goQ29sb3IuQ09NUE9ORU5UUywgZnVuY3Rpb24oY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgIGlmICghY29tbW9uLmlzVW5kZWZpbmVkKGlbY29tcG9uZW50XSkgJiZcbiAgICAgICAgICAgICAgICAgICFjb21tb24uaXNVbmRlZmluZWQodGhpcy5fX2NvbG9yLl9fc3RhdGVbY29tcG9uZW50XSkgJiZcbiAgICAgICAgICAgICAgICAgIGlbY29tcG9uZW50XSAhPT0gdGhpcy5fX2NvbG9yLl9fc3RhdGVbY29tcG9uZW50XSkge1xuICAgICAgICAgICAgICAgIG1pc21hdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge307IC8vIGJyZWFrXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgICAgICAvLyBJZiBub3RoaW5nIGRpdmVyZ2VzLCB3ZSBrZWVwIG91ciBwcmV2aW91cyB2YWx1ZXNcbiAgICAgICAgICAgIC8vIGZvciBzdGF0ZWZ1bG5lc3MsIG90aGVyd2lzZSB3ZSByZWNhbGN1bGF0ZSBmcmVzaFxuICAgICAgICAgICAgaWYgKG1pc21hdGNoKSB7XG4gICAgICAgICAgICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX2NvbG9yLl9fc3RhdGUsIGkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29tbW9uLmV4dGVuZCh0aGlzLl9fdGVtcC5fX3N0YXRlLCB0aGlzLl9fY29sb3IuX19zdGF0ZSk7XG5cbiAgICAgICAgICB0aGlzLl9fdGVtcC5hID0gMTtcblxuICAgICAgICAgIHZhciBmbGlwID0gKHRoaXMuX19jb2xvci52IDwgLjUgfHwgdGhpcy5fX2NvbG9yLnMgPiAuNSkgPyAyNTUgOiAwO1xuICAgICAgICAgIHZhciBfZmxpcCA9IDI1NSAtIGZsaXA7XG5cbiAgICAgICAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19maWVsZF9rbm9iLnN0eWxlLCB7XG4gICAgICAgICAgICBtYXJnaW5MZWZ0OiAxMDAgKiB0aGlzLl9fY29sb3IucyAtIDcgKyAncHgnLFxuICAgICAgICAgICAgbWFyZ2luVG9wOiAxMDAgKiAoMSAtIHRoaXMuX19jb2xvci52KSAtIDcgKyAncHgnLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLl9fdGVtcC50b1N0cmluZygpLFxuICAgICAgICAgICAgYm9yZGVyOiB0aGlzLl9fZmllbGRfa25vYl9ib3JkZXIgKyAncmdiKCcgKyBmbGlwICsgJywnICsgZmxpcCArICcsJyArIGZsaXAgKycpJ1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5fX2h1ZV9rbm9iLnN0eWxlLm1hcmdpblRvcCA9ICgxIC0gdGhpcy5fX2NvbG9yLmggLyAzNjApICogMTAwICsgJ3B4J1xuXG4gICAgICAgICAgdGhpcy5fX3RlbXAucyA9IDE7XG4gICAgICAgICAgdGhpcy5fX3RlbXAudiA9IDE7XG5cbiAgICAgICAgICBsaW5lYXJHcmFkaWVudCh0aGlzLl9fc2F0dXJhdGlvbl9maWVsZCwgJ2xlZnQnLCAnI2ZmZicsIHRoaXMuX190ZW1wLnRvU3RyaW5nKCkpO1xuXG4gICAgICAgICAgY29tbW9uLmV4dGVuZCh0aGlzLl9faW5wdXQuc3R5bGUsIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5fX2lucHV0LnZhbHVlID0gdGhpcy5fX2NvbG9yLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBjb2xvcjogJ3JnYignICsgZmxpcCArICcsJyArIGZsaXAgKyAnLCcgKyBmbGlwICsnKScsXG4gICAgICAgICAgICB0ZXh0U2hhZG93OiB0aGlzLl9faW5wdXRfdGV4dFNoYWRvdyArICdyZ2JhKCcgKyBfZmxpcCArICcsJyArIF9mbGlwICsgJywnICsgX2ZsaXAgKycsLjcpJ1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICk7XG4gIFxuICB2YXIgdmVuZG9ycyA9IFsnLW1vei0nLCctby0nLCctd2Via2l0LScsJy1tcy0nLCcnXTtcbiAgXG4gIGZ1bmN0aW9uIGxpbmVhckdyYWRpZW50KGVsZW0sIHgsIGEsIGIpIHtcbiAgICBlbGVtLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICBjb21tb24uZWFjaCh2ZW5kb3JzLCBmdW5jdGlvbih2ZW5kb3IpIHtcbiAgICAgIGVsZW0uc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZDogJyArIHZlbmRvciArICdsaW5lYXItZ3JhZGllbnQoJyt4KycsICcrYSsnIDAlLCAnICsgYiArICcgMTAwJSk7ICc7XG4gICAgfSk7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIGh1ZUdyYWRpZW50KGVsZW0pIHtcbiAgICBlbGVtLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IC1tb3otbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsICNmZjAwZmYgMTclLCAjMDAwMGZmIDM0JSwgIzAwZmZmZiA1MCUsICMwMGZmMDAgNjclLCAjZmZmZjAwIDg0JSwgI2ZmMDAwMCAxMDAlKTsnXG4gICAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICAjZmYwMDAwIDAlLCNmZjAwZmYgMTclLCMwMDAwZmYgMzQlLCMwMGZmZmYgNTAlLCMwMGZmMDAgNjclLCNmZmZmMDAgODQlLCNmZjAwMDAgMTAwJSk7J1xuICAgIGVsZW0uc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZDogLW8tbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsI2ZmMDBmZiAxNyUsIzAwMDBmZiAzNCUsIzAwZmZmZiA1MCUsIzAwZmYwMCA2NyUsI2ZmZmYwMCA4NCUsI2ZmMDAwMCAxMDAlKTsnXG4gICAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiAtbXMtbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsI2ZmMDBmZiAxNyUsIzAwMDBmZiAzNCUsIzAwZmZmZiA1MCUsIzAwZmYwMCA2NyUsI2ZmZmYwMCA4NCUsI2ZmMDAwMCAxMDAlKTsnXG4gICAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG9wLCAgI2ZmMDAwMCAwJSwjZmYwMGZmIDE3JSwjMDAwMGZmIDM0JSwjMDBmZmZmIDUwJSwjMDBmZjAwIDY3JSwjZmZmZjAwIDg0JSwjZmYwMDAwIDEwMCUpOydcbiAgfVxuXG5cbiAgcmV0dXJuIENvbG9yQ29udHJvbGxlcjtcblxufSkoZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIsXG5kYXQuZG9tLmRvbSxcbmRhdC5jb2xvci5Db2xvciA9IChmdW5jdGlvbiAoaW50ZXJwcmV0LCBtYXRoLCB0b1N0cmluZywgY29tbW9uKSB7XG5cbiAgdmFyIENvbG9yID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLl9fc3RhdGUgPSBpbnRlcnByZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIGlmICh0aGlzLl9fc3RhdGUgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyAnRmFpbGVkIHRvIGludGVycHJldCBjb2xvciBhcmd1bWVudHMnO1xuICAgIH1cblxuICAgIHRoaXMuX19zdGF0ZS5hID0gdGhpcy5fX3N0YXRlLmEgfHwgMTtcblxuXG4gIH07XG5cbiAgQ29sb3IuQ09NUE9ORU5UUyA9IFsncicsJ2cnLCdiJywnaCcsJ3MnLCd2JywnaGV4JywnYSddO1xuXG4gIGNvbW1vbi5leHRlbmQoQ29sb3IucHJvdG90eXBlLCB7XG5cbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdG9TdHJpbmcodGhpcyk7XG4gICAgfSxcblxuICAgIHRvT3JpZ2luYWw6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZS5jb252ZXJzaW9uLndyaXRlKHRoaXMpO1xuICAgIH1cblxuICB9KTtcblxuICBkZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAncicsIDIpO1xuICBkZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAnZycsIDEpO1xuICBkZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAnYicsIDApO1xuXG4gIGRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdoJyk7XG4gIGRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdzJyk7XG4gIGRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICd2Jyk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbG9yLnByb3RvdHlwZSwgJ2EnLCB7XG5cbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZS5hO1xuICAgIH0sXG5cbiAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHRoaXMuX19zdGF0ZS5hID0gdjtcbiAgICB9XG5cbiAgfSk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbG9yLnByb3RvdHlwZSwgJ2hleCcsIHtcblxuICAgIGdldDogZnVuY3Rpb24oKSB7XG5cbiAgICAgIGlmICghdGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnSEVYJykge1xuICAgICAgICB0aGlzLl9fc3RhdGUuaGV4ID0gbWF0aC5yZ2JfdG9faGV4KHRoaXMuciwgdGhpcy5nLCB0aGlzLmIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmhleDtcblxuICAgIH0sXG5cbiAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcblxuICAgICAgdGhpcy5fX3N0YXRlLnNwYWNlID0gJ0hFWCc7XG4gICAgICB0aGlzLl9fc3RhdGUuaGV4ID0gdjtcblxuICAgIH1cblxuICB9KTtcblxuICBmdW5jdGlvbiBkZWZpbmVSR0JDb21wb25lbnQodGFyZ2V0LCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KSB7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb21wb25lbnQsIHtcblxuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlID09PSAnUkdCJykge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlY2FsY3VsYXRlUkdCKHRoaXMsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcblxuICAgICAgfSxcblxuICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSAhPT0gJ1JHQicpIHtcbiAgICAgICAgICByZWNhbGN1bGF0ZVJHQih0aGlzLCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KTtcbiAgICAgICAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnUkdCJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdID0gdjtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmluZUhTVkNvbXBvbmVudCh0YXJnZXQsIGNvbXBvbmVudCkge1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29tcG9uZW50LCB7XG5cbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSA9PT0gJ0hTVicpXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuXG4gICAgICAgIHJlY2FsY3VsYXRlSFNWKHRoaXMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcblxuICAgICAgfSxcblxuICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSAhPT0gJ0hTVicpIHtcbiAgICAgICAgICByZWNhbGN1bGF0ZUhTVih0aGlzKTtcbiAgICAgICAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnSFNWJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdID0gdjtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2FsY3VsYXRlUkdCKGNvbG9yLCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KSB7XG5cbiAgICBpZiAoY29sb3IuX19zdGF0ZS5zcGFjZSA9PT0gJ0hFWCcpIHtcblxuICAgICAgY29sb3IuX19zdGF0ZVtjb21wb25lbnRdID0gbWF0aC5jb21wb25lbnRfZnJvbV9oZXgoY29sb3IuX19zdGF0ZS5oZXgsIGNvbXBvbmVudEhleEluZGV4KTtcblxuICAgIH0gZWxzZSBpZiAoY29sb3IuX19zdGF0ZS5zcGFjZSA9PT0gJ0hTVicpIHtcblxuICAgICAgY29tbW9uLmV4dGVuZChjb2xvci5fX3N0YXRlLCBtYXRoLmhzdl90b19yZ2IoY29sb3IuX19zdGF0ZS5oLCBjb2xvci5fX3N0YXRlLnMsIGNvbG9yLl9fc3RhdGUudikpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhyb3cgJ0NvcnJ1cHRlZCBjb2xvciBzdGF0ZSc7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2FsY3VsYXRlSFNWKGNvbG9yKSB7XG5cbiAgICB2YXIgcmVzdWx0ID0gbWF0aC5yZ2JfdG9faHN2KGNvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIpO1xuXG4gICAgY29tbW9uLmV4dGVuZChjb2xvci5fX3N0YXRlLFxuICAgICAgICB7XG4gICAgICAgICAgczogcmVzdWx0LnMsXG4gICAgICAgICAgdjogcmVzdWx0LnZcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICBpZiAoIWNvbW1vbi5pc05hTihyZXN1bHQuaCkpIHtcbiAgICAgIGNvbG9yLl9fc3RhdGUuaCA9IHJlc3VsdC5oO1xuICAgIH0gZWxzZSBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKGNvbG9yLl9fc3RhdGUuaCkpIHtcbiAgICAgIGNvbG9yLl9fc3RhdGUuaCA9IDA7XG4gICAgfVxuXG4gIH1cblxuICByZXR1cm4gQ29sb3I7XG5cbn0pKGRhdC5jb2xvci5pbnRlcnByZXQsXG5kYXQuY29sb3IubWF0aCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIHRtcENvbXBvbmVudDtcblxuICByZXR1cm4ge1xuXG4gICAgaHN2X3RvX3JnYjogZnVuY3Rpb24oaCwgcywgdikge1xuXG4gICAgICB2YXIgaGkgPSBNYXRoLmZsb29yKGggLyA2MCkgJSA2O1xuXG4gICAgICB2YXIgZiA9IGggLyA2MCAtIE1hdGguZmxvb3IoaCAvIDYwKTtcbiAgICAgIHZhciBwID0gdiAqICgxLjAgLSBzKTtcbiAgICAgIHZhciBxID0gdiAqICgxLjAgLSAoZiAqIHMpKTtcbiAgICAgIHZhciB0ID0gdiAqICgxLjAgLSAoKDEuMCAtIGYpICogcykpO1xuICAgICAgdmFyIGMgPSBbXG4gICAgICAgIFt2LCB0LCBwXSxcbiAgICAgICAgW3EsIHYsIHBdLFxuICAgICAgICBbcCwgdiwgdF0sXG4gICAgICAgIFtwLCBxLCB2XSxcbiAgICAgICAgW3QsIHAsIHZdLFxuICAgICAgICBbdiwgcCwgcV1cbiAgICAgIF1baGldO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICByOiBjWzBdICogMjU1LFxuICAgICAgICBnOiBjWzFdICogMjU1LFxuICAgICAgICBiOiBjWzJdICogMjU1XG4gICAgICB9O1xuXG4gICAgfSxcblxuICAgIHJnYl90b19oc3Y6IGZ1bmN0aW9uKHIsIGcsIGIpIHtcblxuICAgICAgdmFyIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpLFxuICAgICAgICAgIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLFxuICAgICAgICAgIGRlbHRhID0gbWF4IC0gbWluLFxuICAgICAgICAgIGgsIHM7XG5cbiAgICAgIGlmIChtYXggIT0gMCkge1xuICAgICAgICBzID0gZGVsdGEgLyBtYXg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGg6IE5hTixcbiAgICAgICAgICBzOiAwLFxuICAgICAgICAgIHY6IDBcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKHIgPT0gbWF4KSB7XG4gICAgICAgIGggPSAoZyAtIGIpIC8gZGVsdGE7XG4gICAgICB9IGVsc2UgaWYgKGcgPT0gbWF4KSB7XG4gICAgICAgIGggPSAyICsgKGIgLSByKSAvIGRlbHRhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaCA9IDQgKyAociAtIGcpIC8gZGVsdGE7XG4gICAgICB9XG4gICAgICBoIC89IDY7XG4gICAgICBpZiAoaCA8IDApIHtcbiAgICAgICAgaCArPSAxO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBoOiBoICogMzYwLFxuICAgICAgICBzOiBzLFxuICAgICAgICB2OiBtYXggLyAyNTVcbiAgICAgIH07XG4gICAgfSxcblxuICAgIHJnYl90b19oZXg6IGZ1bmN0aW9uKHIsIGcsIGIpIHtcbiAgICAgIHZhciBoZXggPSB0aGlzLmhleF93aXRoX2NvbXBvbmVudCgwLCAyLCByKTtcbiAgICAgIGhleCA9IHRoaXMuaGV4X3dpdGhfY29tcG9uZW50KGhleCwgMSwgZyk7XG4gICAgICBoZXggPSB0aGlzLmhleF93aXRoX2NvbXBvbmVudChoZXgsIDAsIGIpO1xuICAgICAgcmV0dXJuIGhleDtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50X2Zyb21faGV4OiBmdW5jdGlvbihoZXgsIGNvbXBvbmVudEluZGV4KSB7XG4gICAgICByZXR1cm4gKGhleCA+PiAoY29tcG9uZW50SW5kZXggKiA4KSkgJiAweEZGO1xuICAgIH0sXG5cbiAgICBoZXhfd2l0aF9jb21wb25lbnQ6IGZ1bmN0aW9uKGhleCwgY29tcG9uZW50SW5kZXgsIHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPDwgKHRtcENvbXBvbmVudCA9IGNvbXBvbmVudEluZGV4ICogOCkgfCAoaGV4ICYgfiAoMHhGRiA8PCB0bXBDb21wb25lbnQpKTtcbiAgICB9XG5cbiAgfVxuXG59KSgpLFxuZGF0LmNvbG9yLnRvU3RyaW5nLFxuZGF0LnV0aWxzLmNvbW1vbiksXG5kYXQuY29sb3IuaW50ZXJwcmV0LFxuZGF0LnV0aWxzLmNvbW1vbiksXG5kYXQudXRpbHMucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gKGZ1bmN0aW9uICgpIHtcblxuICAvKipcbiAgICogcmVxdWlyZWpzIHZlcnNpb24gb2YgUGF1bCBJcmlzaCdzIFJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgKiBodHRwOi8vcGF1bGlyaXNoLmNvbS8yMDExL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtYW5pbWF0aW5nL1xuICAgKi9cblxuICByZXR1cm4gd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgIHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgZnVuY3Rpb24oY2FsbGJhY2ssIGVsZW1lbnQpIHtcblxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcblxuICAgICAgfTtcbn0pKCksXG5kYXQuZG9tLkNlbnRlcmVkRGl2ID0gKGZ1bmN0aW9uIChkb20sIGNvbW1vbikge1xuXG5cbiAgdmFyIENlbnRlcmVkRGl2ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmJhY2tncm91bmRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29tbW9uLmV4dGVuZCh0aGlzLmJhY2tncm91bmRFbGVtZW50LnN0eWxlLCB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLDAuOCknLFxuICAgICAgdG9wOiAwLFxuICAgICAgbGVmdDogMCxcbiAgICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICAgIHpJbmRleDogJzEwMDAnLFxuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIFdlYmtpdFRyYW5zaXRpb246ICdvcGFjaXR5IDAuMnMgbGluZWFyJ1xuICAgIH0pO1xuXG4gICAgZG9tLm1ha2VGdWxsc2NyZWVuKHRoaXMuYmFja2dyb3VuZEVsZW1lbnQpO1xuICAgIHRoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuXG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29tbW9uLmV4dGVuZCh0aGlzLmRvbUVsZW1lbnQuc3R5bGUsIHtcbiAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgekluZGV4OiAnMTAwMScsXG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgV2Via2l0VHJhbnNpdGlvbjogJy13ZWJraXQtdHJhbnNmb3JtIDAuMnMgZWFzZS1vdXQsIG9wYWNpdHkgMC4ycyBsaW5lYXInXG4gICAgfSk7XG5cblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5iYWNrZ3JvdW5kRWxlbWVudCk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmRvbUVsZW1lbnQpO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBkb20uYmluZCh0aGlzLmJhY2tncm91bmRFbGVtZW50LCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIF90aGlzLmhpZGUoKTtcbiAgICB9KTtcblxuXG4gIH07XG5cbiAgQ2VudGVyZWREaXYucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgXG5cblxuICAgIHRoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xuLy8gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLnRvcCA9ICc1MiUnO1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoMS4xKSc7XG5cbiAgICB0aGlzLmxheW91dCgpO1xuXG4gICAgY29tbW9uLmRlZmVyKGZ1bmN0aW9uKCkge1xuICAgICAgX3RoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICBfdGhpcy5kb21FbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgX3RoaXMuZG9tRWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoMSknO1xuICAgIH0pO1xuXG4gIH07XG5cbiAgQ2VudGVyZWREaXYucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgaGlkZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICBfdGhpcy5kb21FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBfdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICBkb20udW5iaW5kKF90aGlzLmRvbUVsZW1lbnQsICd3ZWJraXRUcmFuc2l0aW9uRW5kJywgaGlkZSk7XG4gICAgICBkb20udW5iaW5kKF90aGlzLmRvbUVsZW1lbnQsICd0cmFuc2l0aW9uZW5kJywgaGlkZSk7XG4gICAgICBkb20udW5iaW5kKF90aGlzLmRvbUVsZW1lbnQsICdvVHJhbnNpdGlvbkVuZCcsIGhpZGUpO1xuXG4gICAgfTtcblxuICAgIGRvbS5iaW5kKHRoaXMuZG9tRWxlbWVudCwgJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBoaWRlKTtcbiAgICBkb20uYmluZCh0aGlzLmRvbUVsZW1lbnQsICd0cmFuc2l0aW9uZW5kJywgaGlkZSk7XG4gICAgZG9tLmJpbmQodGhpcy5kb21FbGVtZW50LCAnb1RyYW5zaXRpb25FbmQnLCBoaWRlKTtcblxuICAgIHRoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG4vLyAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUudG9wID0gJzQ4JSc7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoMS4xKSc7XG5cbiAgfTtcblxuICBDZW50ZXJlZERpdi5wcm90b3R5cGUubGF5b3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLmxlZnQgPSB3aW5kb3cuaW5uZXJXaWR0aC8yIC0gZG9tLmdldFdpZHRoKHRoaXMuZG9tRWxlbWVudCkgLyAyICsgJ3B4JztcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUudG9wID0gd2luZG93LmlubmVySGVpZ2h0LzIgLSBkb20uZ2V0SGVpZ2h0KHRoaXMuZG9tRWxlbWVudCkgLyAyICsgJ3B4JztcbiAgfTtcbiAgXG4gIGZ1bmN0aW9uIGxvY2tTY3JvbGwoZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICB9XG5cbiAgcmV0dXJuIENlbnRlcmVkRGl2O1xuXG59KShkYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jb21tb24pLFxuZGF0LmRvbS5kb20sXG5kYXQudXRpbHMuY29tbW9uKTsiLCIvKipcbiAqIGRhdC1ndWkgSmF2YVNjcmlwdCBDb250cm9sbGVyIExpYnJhcnlcbiAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXG4gKlxuICogQ29weXJpZ2h0IDIwMTEgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBDcmVhdGl2ZSBMYWJcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKi9cblxuLyoqIEBuYW1lc3BhY2UgKi9cbnZhciBkYXQgPSBtb2R1bGUuZXhwb3J0cyA9IGRhdCB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC5jb2xvciA9IGRhdC5jb2xvciB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC51dGlscyA9IGRhdC51dGlscyB8fCB7fTtcblxuZGF0LnV0aWxzLmNvbW1vbiA9IChmdW5jdGlvbiAoKSB7XG4gIFxuICB2YXIgQVJSX0VBQ0ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaDtcbiAgdmFyIEFSUl9TTElDRSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuICAvKipcbiAgICogQmFuZC1haWQgbWV0aG9kcyBmb3IgdGhpbmdzIHRoYXQgc2hvdWxkIGJlIGEgbG90IGVhc2llciBpbiBKYXZhU2NyaXB0LlxuICAgKiBJbXBsZW1lbnRhdGlvbiBhbmQgc3RydWN0dXJlIGluc3BpcmVkIGJ5IHVuZGVyc2NvcmUuanNcbiAgICogaHR0cDovL2RvY3VtZW50Y2xvdWQuZ2l0aHViLmNvbS91bmRlcnNjb3JlL1xuICAgKi9cblxuICByZXR1cm4geyBcbiAgICBcbiAgICBCUkVBSzoge30sXG4gIFxuICAgIGV4dGVuZDogZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICBcbiAgICAgIHRoaXMuZWFjaChBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMsIDEpLCBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopXG4gICAgICAgICAgaWYgKCF0aGlzLmlzVW5kZWZpbmVkKG9ialtrZXldKSkgXG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IG9ialtrZXldO1xuICAgICAgICBcbiAgICAgIH0sIHRoaXMpO1xuICAgICAgXG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgXG4gICAgfSxcbiAgICBcbiAgICBkZWZhdWx0czogZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgICBcbiAgICAgIHRoaXMuZWFjaChBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMsIDEpLCBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopXG4gICAgICAgICAgaWYgKHRoaXMuaXNVbmRlZmluZWQodGFyZ2V0W2tleV0pKSBcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgICAgIFxuICAgICAgfSwgdGhpcyk7XG4gICAgICBcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgXG4gICAgfSxcbiAgICBcbiAgICBjb21wb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0b0NhbGwgPSBBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgYXJncyA9IEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSB0b0NhbGwubGVuZ3RoIC0xOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGFyZ3MgPSBbdG9DYWxsW2ldLmFwcGx5KHRoaXMsIGFyZ3MpXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gYXJnc1swXTtcbiAgICAgICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIGVhY2g6IGZ1bmN0aW9uKG9iaiwgaXRyLCBzY29wZSkge1xuXG4gICAgICBcbiAgICAgIGlmIChBUlJfRUFDSCAmJiBvYmouZm9yRWFjaCA9PT0gQVJSX0VBQ0gpIHsgXG4gICAgICAgIFxuICAgICAgICBvYmouZm9yRWFjaChpdHIsIHNjb3BlKTtcbiAgICAgICAgXG4gICAgICB9IGVsc2UgaWYgKG9iai5sZW5ndGggPT09IG9iai5sZW5ndGggKyAwKSB7IC8vIElzIG51bWJlciBidXQgbm90IE5hTlxuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIga2V5ID0gMCwgbCA9IG9iai5sZW5ndGg7IGtleSA8IGw7IGtleSsrKVxuICAgICAgICAgIGlmIChrZXkgaW4gb2JqICYmIGl0ci5jYWxsKHNjb3BlLCBvYmpba2V5XSwga2V5KSA9PT0gdGhpcy5CUkVBSykgXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikgXG4gICAgICAgICAgaWYgKGl0ci5jYWxsKHNjb3BlLCBvYmpba2V5XSwga2V5KSA9PT0gdGhpcy5CUkVBSylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgfVxuICAgICAgICAgICAgXG4gICAgfSxcbiAgICBcbiAgICBkZWZlcjogZnVuY3Rpb24oZm5jKSB7XG4gICAgICBzZXRUaW1lb3V0KGZuYywgMCk7XG4gICAgfSxcbiAgICBcbiAgICB0b0FycmF5OiBmdW5jdGlvbihvYmopIHtcbiAgICAgIGlmIChvYmoudG9BcnJheSkgcmV0dXJuIG9iai50b0FycmF5KCk7XG4gICAgICByZXR1cm4gQVJSX1NMSUNFLmNhbGwob2JqKTtcbiAgICB9LFxuXG4gICAgaXNVbmRlZmluZWQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkO1xuICAgIH0sXG4gICAgXG4gICAgaXNOdWxsOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IG51bGw7XG4gICAgfSxcbiAgICBcbiAgICBpc05hTjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICE9PSBvYmo7XG4gICAgfSxcbiAgICBcbiAgICBpc0FycmF5OiBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iai5jb25zdHJ1Y3RvciA9PT0gQXJyYXk7XG4gICAgfSxcbiAgICBcbiAgICBpc09iamVjdDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBPYmplY3Qob2JqKTtcbiAgICB9LFxuICAgIFxuICAgIGlzTnVtYmVyOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IG9iaiswO1xuICAgIH0sXG4gICAgXG4gICAgaXNTdHJpbmc6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gb2JqKycnO1xuICAgIH0sXG4gICAgXG4gICAgaXNCb29sZWFuOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IGZhbHNlIHx8IG9iaiA9PT0gdHJ1ZTtcbiAgICB9LFxuICAgIFxuICAgIGlzRnVuY3Rpb246IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuICAgIH1cbiAgXG4gIH07XG4gICAgXG59KSgpO1xuXG5cbmRhdC5jb2xvci50b1N0cmluZyA9IChmdW5jdGlvbiAoY29tbW9uKSB7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbG9yKSB7XG5cbiAgICBpZiAoY29sb3IuYSA9PSAxIHx8IGNvbW1vbi5pc1VuZGVmaW5lZChjb2xvci5hKSkge1xuXG4gICAgICB2YXIgcyA9IGNvbG9yLmhleC50b1N0cmluZygxNik7XG4gICAgICB3aGlsZSAocy5sZW5ndGggPCA2KSB7XG4gICAgICAgIHMgPSAnMCcgKyBzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJyMnICsgcztcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiAncmdiYSgnICsgTWF0aC5yb3VuZChjb2xvci5yKSArICcsJyArIE1hdGgucm91bmQoY29sb3IuZykgKyAnLCcgKyBNYXRoLnJvdW5kKGNvbG9yLmIpICsgJywnICsgY29sb3IuYSArICcpJztcblxuICAgIH1cblxuICB9XG5cbn0pKGRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5Db2xvciA9IGRhdC5jb2xvci5Db2xvciA9IChmdW5jdGlvbiAoaW50ZXJwcmV0LCBtYXRoLCB0b1N0cmluZywgY29tbW9uKSB7XG5cbiAgdmFyIENvbG9yID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLl9fc3RhdGUgPSBpbnRlcnByZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIGlmICh0aGlzLl9fc3RhdGUgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyAnRmFpbGVkIHRvIGludGVycHJldCBjb2xvciBhcmd1bWVudHMnO1xuICAgIH1cblxuICAgIHRoaXMuX19zdGF0ZS5hID0gdGhpcy5fX3N0YXRlLmEgfHwgMTtcblxuXG4gIH07XG5cbiAgQ29sb3IuQ09NUE9ORU5UUyA9IFsncicsJ2cnLCdiJywnaCcsJ3MnLCd2JywnaGV4JywnYSddO1xuXG4gIGNvbW1vbi5leHRlbmQoQ29sb3IucHJvdG90eXBlLCB7XG5cbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdG9TdHJpbmcodGhpcyk7XG4gICAgfSxcblxuICAgIHRvT3JpZ2luYWw6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZS5jb252ZXJzaW9uLndyaXRlKHRoaXMpO1xuICAgIH1cblxuICB9KTtcblxuICBkZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAncicsIDIpO1xuICBkZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAnZycsIDEpO1xuICBkZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAnYicsIDApO1xuXG4gIGRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdoJyk7XG4gIGRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdzJyk7XG4gIGRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICd2Jyk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbG9yLnByb3RvdHlwZSwgJ2EnLCB7XG5cbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZS5hO1xuICAgIH0sXG5cbiAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHRoaXMuX19zdGF0ZS5hID0gdjtcbiAgICB9XG5cbiAgfSk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbG9yLnByb3RvdHlwZSwgJ2hleCcsIHtcblxuICAgIGdldDogZnVuY3Rpb24oKSB7XG5cbiAgICAgIGlmICghdGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnSEVYJykge1xuICAgICAgICB0aGlzLl9fc3RhdGUuaGV4ID0gbWF0aC5yZ2JfdG9faGV4KHRoaXMuciwgdGhpcy5nLCB0aGlzLmIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmhleDtcblxuICAgIH0sXG5cbiAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcblxuICAgICAgdGhpcy5fX3N0YXRlLnNwYWNlID0gJ0hFWCc7XG4gICAgICB0aGlzLl9fc3RhdGUuaGV4ID0gdjtcblxuICAgIH1cblxuICB9KTtcblxuICBmdW5jdGlvbiBkZWZpbmVSR0JDb21wb25lbnQodGFyZ2V0LCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KSB7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb21wb25lbnQsIHtcblxuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlID09PSAnUkdCJykge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlY2FsY3VsYXRlUkdCKHRoaXMsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcblxuICAgICAgfSxcblxuICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSAhPT0gJ1JHQicpIHtcbiAgICAgICAgICByZWNhbGN1bGF0ZVJHQih0aGlzLCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KTtcbiAgICAgICAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnUkdCJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdID0gdjtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmluZUhTVkNvbXBvbmVudCh0YXJnZXQsIGNvbXBvbmVudCkge1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29tcG9uZW50LCB7XG5cbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSA9PT0gJ0hTVicpXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuXG4gICAgICAgIHJlY2FsY3VsYXRlSFNWKHRoaXMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcblxuICAgICAgfSxcblxuICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSAhPT0gJ0hTVicpIHtcbiAgICAgICAgICByZWNhbGN1bGF0ZUhTVih0aGlzKTtcbiAgICAgICAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnSFNWJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdID0gdjtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2FsY3VsYXRlUkdCKGNvbG9yLCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KSB7XG5cbiAgICBpZiAoY29sb3IuX19zdGF0ZS5zcGFjZSA9PT0gJ0hFWCcpIHtcblxuICAgICAgY29sb3IuX19zdGF0ZVtjb21wb25lbnRdID0gbWF0aC5jb21wb25lbnRfZnJvbV9oZXgoY29sb3IuX19zdGF0ZS5oZXgsIGNvbXBvbmVudEhleEluZGV4KTtcblxuICAgIH0gZWxzZSBpZiAoY29sb3IuX19zdGF0ZS5zcGFjZSA9PT0gJ0hTVicpIHtcblxuICAgICAgY29tbW9uLmV4dGVuZChjb2xvci5fX3N0YXRlLCBtYXRoLmhzdl90b19yZ2IoY29sb3IuX19zdGF0ZS5oLCBjb2xvci5fX3N0YXRlLnMsIGNvbG9yLl9fc3RhdGUudikpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhyb3cgJ0NvcnJ1cHRlZCBjb2xvciBzdGF0ZSc7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2FsY3VsYXRlSFNWKGNvbG9yKSB7XG5cbiAgICB2YXIgcmVzdWx0ID0gbWF0aC5yZ2JfdG9faHN2KGNvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIpO1xuXG4gICAgY29tbW9uLmV4dGVuZChjb2xvci5fX3N0YXRlLFxuICAgICAgICB7XG4gICAgICAgICAgczogcmVzdWx0LnMsXG4gICAgICAgICAgdjogcmVzdWx0LnZcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICBpZiAoIWNvbW1vbi5pc05hTihyZXN1bHQuaCkpIHtcbiAgICAgIGNvbG9yLl9fc3RhdGUuaCA9IHJlc3VsdC5oO1xuICAgIH0gZWxzZSBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKGNvbG9yLl9fc3RhdGUuaCkpIHtcbiAgICAgIGNvbG9yLl9fc3RhdGUuaCA9IDA7XG4gICAgfVxuXG4gIH1cblxuICByZXR1cm4gQ29sb3I7XG5cbn0pKGRhdC5jb2xvci5pbnRlcnByZXQgPSAoZnVuY3Rpb24gKHRvU3RyaW5nLCBjb21tb24pIHtcblxuICB2YXIgcmVzdWx0LCB0b1JldHVybjtcblxuICB2YXIgaW50ZXJwcmV0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0b1JldHVybiA9IGZhbHNlO1xuXG4gICAgdmFyIG9yaWdpbmFsID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBjb21tb24udG9BcnJheShhcmd1bWVudHMpIDogYXJndW1lbnRzWzBdO1xuXG4gICAgY29tbW9uLmVhY2goSU5URVJQUkVUQVRJT05TLCBmdW5jdGlvbihmYW1pbHkpIHtcblxuICAgICAgaWYgKGZhbWlseS5saXRtdXMob3JpZ2luYWwpKSB7XG5cbiAgICAgICAgY29tbW9uLmVhY2goZmFtaWx5LmNvbnZlcnNpb25zLCBmdW5jdGlvbihjb252ZXJzaW9uLCBjb252ZXJzaW9uTmFtZSkge1xuXG4gICAgICAgICAgcmVzdWx0ID0gY29udmVyc2lvbi5yZWFkKG9yaWdpbmFsKTtcblxuICAgICAgICAgIGlmICh0b1JldHVybiA9PT0gZmFsc2UgJiYgcmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgdG9SZXR1cm4gPSByZXN1bHQ7XG4gICAgICAgICAgICByZXN1bHQuY29udmVyc2lvbk5hbWUgPSBjb252ZXJzaW9uTmFtZTtcbiAgICAgICAgICAgIHJlc3VsdC5jb252ZXJzaW9uID0gY29udmVyc2lvbjtcbiAgICAgICAgICAgIHJldHVybiBjb21tb24uQlJFQUs7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGNvbW1vbi5CUkVBSztcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9SZXR1cm47XG5cbiAgfTtcblxuICB2YXIgSU5URVJQUkVUQVRJT05TID0gW1xuXG4gICAgLy8gU3RyaW5nc1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNTdHJpbmcsXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgVEhSRUVfQ0hBUl9IRVg6IHtcblxuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL14jKFtBLUYwLTldKShbQS1GMC05XSkoW0EtRjAtOV0pJC9pKTtcbiAgICAgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnSEVYJyxcbiAgICAgICAgICAgICAgaGV4OiBwYXJzZUludChcbiAgICAgICAgICAgICAgICAgICcweCcgK1xuICAgICAgICAgICAgICAgICAgICAgIHRlc3RbMV0udG9TdHJpbmcoKSArIHRlc3RbMV0udG9TdHJpbmcoKSArXG4gICAgICAgICAgICAgICAgICAgICAgdGVzdFsyXS50b1N0cmluZygpICsgdGVzdFsyXS50b1N0cmluZygpICtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXN0WzNdLnRvU3RyaW5nKCkgKyB0ZXN0WzNdLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgU0lYX0NIQVJfSEVYOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9eIyhbQS1GMC05XXs2fSkkL2kpO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdIRVgnLFxuICAgICAgICAgICAgICBoZXg6IHBhcnNlSW50KCcweCcgKyB0ZXN0WzFdLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgQ1NTX1JHQjoge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXnJnYlxcKFxccyooLispXFxzKixcXHMqKC4rKVxccyosXFxzKiguKylcXHMqXFwpLyk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IHBhcnNlRmxvYXQodGVzdFsxXSksXG4gICAgICAgICAgICAgIGc6IHBhcnNlRmxvYXQodGVzdFsyXSksXG4gICAgICAgICAgICAgIGI6IHBhcnNlRmxvYXQodGVzdFszXSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfSxcblxuICAgICAgICBDU1NfUkdCQToge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXnJnYmFcXChcXHMqKC4rKVxccyosXFxzKiguKylcXHMqLFxccyooLispXFxzKlxcLFxccyooLispXFxzKlxcKS8pO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBwYXJzZUZsb2F0KHRlc3RbMV0pLFxuICAgICAgICAgICAgICBnOiBwYXJzZUZsb2F0KHRlc3RbMl0pLFxuICAgICAgICAgICAgICBiOiBwYXJzZUZsb2F0KHRlc3RbM10pLFxuICAgICAgICAgICAgICBhOiBwYXJzZUZsb2F0KHRlc3RbNF0pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiB0b1N0cmluZ1xuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8vIE51bWJlcnNcbiAgICB7XG5cbiAgICAgIGxpdG11czogY29tbW9uLmlzTnVtYmVyLFxuXG4gICAgICBjb252ZXJzaW9uczoge1xuXG4gICAgICAgIEhFWDoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ0hFWCcsXG4gICAgICAgICAgICAgIGhleDogb3JpZ2luYWwsXG4gICAgICAgICAgICAgIGNvbnZlcnNpb25OYW1lOiAnSEVYJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBjb2xvci5oZXg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvLyBBcnJheXNcbiAgICB7XG5cbiAgICAgIGxpdG11czogY29tbW9uLmlzQXJyYXksXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgUkdCX0FSUkFZOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbC5sZW5ndGggIT0gMykgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBvcmlnaW5hbFswXSxcbiAgICAgICAgICAgICAgZzogb3JpZ2luYWxbMV0sXG4gICAgICAgICAgICAgIGI6IG9yaWdpbmFsWzJdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBbY29sb3IuciwgY29sb3IuZywgY29sb3IuYl07XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgUkdCQV9BUlJBWToge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAob3JpZ2luYWwubGVuZ3RoICE9IDQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgcjogb3JpZ2luYWxbMF0sXG4gICAgICAgICAgICAgIGc6IG9yaWdpbmFsWzFdLFxuICAgICAgICAgICAgICBiOiBvcmlnaW5hbFsyXSxcbiAgICAgICAgICAgICAgYTogb3JpZ2luYWxbM11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIFtjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iLCBjb2xvci5hXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gT2JqZWN0c1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNPYmplY3QsXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgUkdCQV9PQko6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5yKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5nKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5iKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5hKSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgICByOiBvcmlnaW5hbC5yLFxuICAgICAgICAgICAgICAgIGc6IG9yaWdpbmFsLmcsXG4gICAgICAgICAgICAgICAgYjogb3JpZ2luYWwuYixcbiAgICAgICAgICAgICAgICBhOiBvcmlnaW5hbC5hXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICByOiBjb2xvci5yLFxuICAgICAgICAgICAgICBnOiBjb2xvci5nLFxuICAgICAgICAgICAgICBiOiBjb2xvci5iLFxuICAgICAgICAgICAgICBhOiBjb2xvci5hXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIFJHQl9PQko6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5yKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5nKSAmJlxuICAgICAgICAgICAgICAgIGNvbW1vbi5pc051bWJlcihvcmlnaW5hbC5iKSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgICByOiBvcmlnaW5hbC5yLFxuICAgICAgICAgICAgICAgIGc6IG9yaWdpbmFsLmcsXG4gICAgICAgICAgICAgICAgYjogb3JpZ2luYWwuYlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgcjogY29sb3IucixcbiAgICAgICAgICAgICAgZzogY29sb3IuZyxcbiAgICAgICAgICAgICAgYjogY29sb3IuYlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBIU1ZBX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmgpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnMpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnYpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmEpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdIU1YnLFxuICAgICAgICAgICAgICAgIGg6IG9yaWdpbmFsLmgsXG4gICAgICAgICAgICAgICAgczogb3JpZ2luYWwucyxcbiAgICAgICAgICAgICAgICB2OiBvcmlnaW5hbC52LFxuICAgICAgICAgICAgICAgIGE6IG9yaWdpbmFsLmFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGg6IGNvbG9yLmgsXG4gICAgICAgICAgICAgIHM6IGNvbG9yLnMsXG4gICAgICAgICAgICAgIHY6IGNvbG9yLnYsXG4gICAgICAgICAgICAgIGE6IGNvbG9yLmFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgSFNWX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmgpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnMpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnYpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdIU1YnLFxuICAgICAgICAgICAgICAgIGg6IG9yaWdpbmFsLmgsXG4gICAgICAgICAgICAgICAgczogb3JpZ2luYWwucyxcbiAgICAgICAgICAgICAgICB2OiBvcmlnaW5hbC52XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBoOiBjb2xvci5oLFxuICAgICAgICAgICAgICBzOiBjb2xvci5zLFxuICAgICAgICAgICAgICB2OiBjb2xvci52XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfVxuXG5cbiAgXTtcblxuICByZXR1cm4gaW50ZXJwcmV0O1xuXG5cbn0pKGRhdC5jb2xvci50b1N0cmluZyxcbmRhdC51dGlscy5jb21tb24pLFxuZGF0LmNvbG9yLm1hdGggPSAoZnVuY3Rpb24gKCkge1xuXG4gIHZhciB0bXBDb21wb25lbnQ7XG5cbiAgcmV0dXJuIHtcblxuICAgIGhzdl90b19yZ2I6IGZ1bmN0aW9uKGgsIHMsIHYpIHtcblxuICAgICAgdmFyIGhpID0gTWF0aC5mbG9vcihoIC8gNjApICUgNjtcblxuICAgICAgdmFyIGYgPSBoIC8gNjAgLSBNYXRoLmZsb29yKGggLyA2MCk7XG4gICAgICB2YXIgcCA9IHYgKiAoMS4wIC0gcyk7XG4gICAgICB2YXIgcSA9IHYgKiAoMS4wIC0gKGYgKiBzKSk7XG4gICAgICB2YXIgdCA9IHYgKiAoMS4wIC0gKCgxLjAgLSBmKSAqIHMpKTtcbiAgICAgIHZhciBjID0gW1xuICAgICAgICBbdiwgdCwgcF0sXG4gICAgICAgIFtxLCB2LCBwXSxcbiAgICAgICAgW3AsIHYsIHRdLFxuICAgICAgICBbcCwgcSwgdl0sXG4gICAgICAgIFt0LCBwLCB2XSxcbiAgICAgICAgW3YsIHAsIHFdXG4gICAgICBdW2hpXTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcjogY1swXSAqIDI1NSxcbiAgICAgICAgZzogY1sxXSAqIDI1NSxcbiAgICAgICAgYjogY1syXSAqIDI1NVxuICAgICAgfTtcblxuICAgIH0sXG5cbiAgICByZ2JfdG9faHN2OiBmdW5jdGlvbihyLCBnLCBiKSB7XG5cbiAgICAgIHZhciBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKSxcbiAgICAgICAgICBtYXggPSBNYXRoLm1heChyLCBnLCBiKSxcbiAgICAgICAgICBkZWx0YSA9IG1heCAtIG1pbixcbiAgICAgICAgICBoLCBzO1xuXG4gICAgICBpZiAobWF4ICE9IDApIHtcbiAgICAgICAgcyA9IGRlbHRhIC8gbWF4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBoOiBOYU4sXG4gICAgICAgICAgczogMCxcbiAgICAgICAgICB2OiAwXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChyID09IG1heCkge1xuICAgICAgICBoID0gKGcgLSBiKSAvIGRlbHRhO1xuICAgICAgfSBlbHNlIGlmIChnID09IG1heCkge1xuICAgICAgICBoID0gMiArIChiIC0gcikgLyBkZWx0YTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGggPSA0ICsgKHIgLSBnKSAvIGRlbHRhO1xuICAgICAgfVxuICAgICAgaCAvPSA2O1xuICAgICAgaWYgKGggPCAwKSB7XG4gICAgICAgIGggKz0gMTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaDogaCAqIDM2MCxcbiAgICAgICAgczogcyxcbiAgICAgICAgdjogbWF4IC8gMjU1XG4gICAgICB9O1xuICAgIH0sXG5cbiAgICByZ2JfdG9faGV4OiBmdW5jdGlvbihyLCBnLCBiKSB7XG4gICAgICB2YXIgaGV4ID0gdGhpcy5oZXhfd2l0aF9jb21wb25lbnQoMCwgMiwgcik7XG4gICAgICBoZXggPSB0aGlzLmhleF93aXRoX2NvbXBvbmVudChoZXgsIDEsIGcpO1xuICAgICAgaGV4ID0gdGhpcy5oZXhfd2l0aF9jb21wb25lbnQoaGV4LCAwLCBiKTtcbiAgICAgIHJldHVybiBoZXg7XG4gICAgfSxcblxuICAgIGNvbXBvbmVudF9mcm9tX2hleDogZnVuY3Rpb24oaGV4LCBjb21wb25lbnRJbmRleCkge1xuICAgICAgcmV0dXJuIChoZXggPj4gKGNvbXBvbmVudEluZGV4ICogOCkpICYgMHhGRjtcbiAgICB9LFxuXG4gICAgaGV4X3dpdGhfY29tcG9uZW50OiBmdW5jdGlvbihoZXgsIGNvbXBvbmVudEluZGV4LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlIDw8ICh0bXBDb21wb25lbnQgPSBjb21wb25lbnRJbmRleCAqIDgpIHwgKGhleCAmIH4gKDB4RkYgPDwgdG1wQ29tcG9uZW50KSk7XG4gICAgfVxuXG4gIH1cblxufSkoKSxcbmRhdC5jb2xvci50b1N0cmluZyxcbmRhdC51dGlscy5jb21tb24pOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi92ZW5kb3IvZGF0Lmd1aScpXG5tb2R1bGUuZXhwb3J0cy5jb2xvciA9IHJlcXVpcmUoJy4vdmVuZG9yL2RhdC5jb2xvcicpIiwiLyogZ2xvYmFsIHJlcXVlc3RBbmltYXRpb25GcmFtZSAqL1xuXG5pbXBvcnQgeyBjcmVhdGVTcHJpbmcgfSBmcm9tICcuLi9saWIvaW5kZXgnXG5pbXBvcnQgeyBHVUkgfSBmcm9tICdkYXQtZ3VpJ1xuXG5jb25zdCBtYXhSYWRpdXMgPSAxMDBcbmNvbnN0IG1pblJhZGl1cyA9IDVcblxuY29uc3Qgc2V0dGluZ3MgPSB7XG4gIGRhbXBlbmluZzogMC4yOCxcbiAgc3RpZmZuZXNzOiAwLjAzXG59XG5cbmNvbnN0IGd1aSA9IG5ldyBHVUkoKVxuZ3VpLmFkZChzZXR0aW5ncywgJ2RhbXBlbmluZycsIDAsIDEuMCkuc3RlcCgwLjAxKS5vbkNoYW5nZShzZXR1cFNwcmluZ3MpXG5ndWkuYWRkKHNldHRpbmdzLCAnc3RpZmZuZXNzJywgMCwgMS4wKS5zdGVwKDAuMDEpLm9uQ2hhbmdlKHNldHVwU3ByaW5ncylcbmd1aS5hZGQoeyBjbGVhciB9LCAnY2xlYXInKVxuXG5mdW5jdGlvbiBjbGVhciAoKSB7XG4gIGxhc3RWYWx1ZXMgPSBbXVxufVxuXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKVxuY29uc3QgY3R4ID0gc2V0dXBDYW52YXNBbmRHZXRDb250ZXh0KGNhbnZhcylcblxuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgaWYgKFxuICAgIGNpcmNsZS54U3ByaW5nLmlzQXREZXN0aW5hdGlvbigwLjIpICYmXG4gICAgY2lyY2xlLnlTcHJpbmcuaXNBdERlc3RpbmF0aW9uKDAuMikgJiZcbiAgICBjaXJjbGUucmFkaXVzU3ByaW5nLmlzQXREZXN0aW5hdGlvbigwLjIpXG4gICkge1xuICAgIGxhc3RWYWx1ZXMgPSBbXVxuICB9XG4gIHNldFBvc2l0aW9uQW5kUmFkaXVzKFtlLm9mZnNldFgsIGUub2Zmc2V0WV0pXG59KVxuXG5jb25zdCBjZW50ZXIgPSBbY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAvIDJdXG5sZXQgbGFzdFZhbHVlcyA9IFtdXG5cbmxldCBjaXJjbGVcbnNldHVwU3ByaW5ncygpXG5zZXRQb3NpdGlvbkFuZFJhZGl1cyhjZW50ZXIpXG5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcClcblxuZnVuY3Rpb24gc2V0dXBTcHJpbmdzICgpIHtcbiAgY29uc3QgZGFtcGVuaW5nID0gc2V0dGluZ3MuZGFtcGVuaW5nXG4gIGNvbnN0IHN0aWZmbmVzcyA9IHNldHRpbmdzLnN0aWZmbmVzc1xuICBsYXN0VmFsdWVzID0gW11cbiAgY2lyY2xlID0ge1xuICAgIHJhZGl1c1NwcmluZzogY3JlYXRlU3ByaW5nKHN0aWZmbmVzcywgZGFtcGVuaW5nLCAxMCksXG4gICAgeFNwcmluZzogY3JlYXRlU3ByaW5nKHN0aWZmbmVzcywgZGFtcGVuaW5nLCBjZW50ZXJbMF0pLFxuICAgIHlTcHJpbmc6IGNyZWF0ZVNwcmluZyhzdGlmZm5lc3MsIGRhbXBlbmluZywgY2VudGVyWzFdKVxuICB9XG59XG5cbmZ1bmN0aW9uIHNldFBvc2l0aW9uQW5kUmFkaXVzIChwb3NpdGlvbikge1xuICBjb25zdCBuZXdSYWRpdXMgPSAobWF4UmFkaXVzIC0gbWluUmFkaXVzKSAqIE1hdGgucmFuZG9tKCkgKyBtaW5SYWRpdXNcbiAgY2lyY2xlLnJhZGl1c1NwcmluZy51cGRhdGVWYWx1ZShuZXdSYWRpdXMpXG4gIGNpcmNsZS54U3ByaW5nLnVwZGF0ZVZhbHVlKHBvc2l0aW9uWzBdKVxuICBjaXJjbGUueVNwcmluZy51cGRhdGVWYWx1ZShwb3NpdGlvblsxXSlcbn1cblxuZnVuY3Rpb24gc2V0dXBDYW52YXNBbmRHZXRDb250ZXh0IChjYW52YXMpIHtcbiAgbGV0IHsgd2lkdGgsIGhlaWdodCB9ID0gY2FudmFzLnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgaGVpZ2h0ICo9IDJcbiAgY2FudmFzLndpZHRoID0gd2lkdGhcbiAgY2FudmFzLmhlaWdodCA9IGhlaWdodFxuICBjYW52YXMuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1weGBcbiAgY2FudmFzLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGBcbiAgcmV0dXJuIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG59XG5cbmZ1bmN0aW9uIGxvb3AgKCkge1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcClcbiAgY2xlYXJSZWN0KGN0eCwgJ3JnYigyNDgsIDI0NSwgMjUwKScpXG4gIGNvbnN0IHggPSBjaXJjbGUueFNwcmluZy50aWNrKDIpXG4gIGNvbnN0IHkgPSBjaXJjbGUueVNwcmluZy50aWNrKClcbiAgY29uc3QgcmFkaXVzID0gY2lyY2xlLnJhZGl1c1NwcmluZy50aWNrKDIpXG4gIGxhc3RWYWx1ZXMucHVzaChbW3gsIHldLCByYWRpdXNdKVxuICBsYXN0VmFsdWVzLmZvckVhY2goKFtwb3MsIHJhZF0pID0+IGRyYXdDaXJjbGUoY3R4LCBwb3MsIHJhZCwgJ3RyYW5zcGFyZW50JywgJ3JnYmEoOTQsIDEyNiwgMTc4LCAwLjQpJykpXG4gIGRyYXdDaXJjbGUoY3R4LCBbeCwgeV0sIHJhZGl1cywgJ3JnYig5NCwgMTI2LCAxNzgpJywgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC44KScpXG59XG5cbmZ1bmN0aW9uIGRyYXdDaXJjbGUgKGN0eCwgcG9zaXRpb24sIHJhZGl1cywgZmlsbENvbG9yID0gJ3RyYW5zcGFyZW50Jywgc3Ryb2tlQ29sb3IgPSAndHJhbnNwYXJlbnQnKSB7XG4gIGlmIChyYWRpdXMgPCAwKSByZXR1cm5cbiAgY3R4LmJlZ2luUGF0aCgpXG4gIGN0eC5zdHJva2VTdHlsZSA9IHN0cm9rZUNvbG9yXG4gIGN0eC5maWxsU3R5bGUgPSBmaWxsQ29sb3JcbiAgY3R4LmFyYyhwb3NpdGlvblswXSwgcG9zaXRpb25bMV0sIHJhZGl1cywgMCwgTWF0aC5QSSAqIDIpXG4gIGN0eC5maWxsKClcbiAgY3R4LnN0cm9rZSgpXG59XG5cbmZ1bmN0aW9uIGNsZWFyUmVjdCAoY3R4LCBjb2xvcikge1xuICBjdHguYmVnaW5QYXRoKClcbiAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yXG4gIGN0eC5yZWN0KDAsIDAsIGN0eC5jYW52YXMud2lkdGgsIGN0eC5jYW52YXMuaGVpZ2h0KVxuICBjdHguZmlsbCgpXG59XG4iXSwibmFtZXMiOlsicmVxdWlyZSQkMCIsInJlcXVpcmUkJDEiLCJHVUkiLCJjb2xvciJdLCJtYXBwaW5ncyI6Ijs7O0FBQU8sU0FBUyxZQUFZLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUU7RUFDeEQsSUFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDOztFQUV6RixTQUFTLEdBQUcsU0FBUyxJQUFJLEtBQUssQ0FBQztFQUMvQixJQUFJLGdCQUFnQixHQUFHLEtBQUssQ0FBQzs7RUFFN0IsT0FBTztJQUNMLFdBQVcsRUFBRSxXQUFXO0lBQ3hCLGVBQWUsRUFBRSxlQUFlO0lBQ2hDLElBQUksRUFBRSxJQUFJO0dBQ1gsQ0FBQzs7RUFFRixTQUFTLFdBQVcsQ0FBQyxRQUFRLEVBQUU7SUFDN0IsSUFBSSxhQUFhLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDOztJQUU3RixnQkFBZ0IsR0FBRyxRQUFRLENBQUM7SUFDNUIsSUFBSSxDQUFDLGFBQWEsRUFBRTtNQUNsQixLQUFLLEdBQUcsUUFBUSxDQUFDO01BQ2pCLFNBQVMsR0FBRyxRQUFRLENBQUM7S0FDdEI7R0FDRjs7RUFFRCxTQUFTLGVBQWUsR0FBRztJQUN6QixJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDOzs7O0lBSW5HLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksU0FBUyxDQUFDO0dBQ3BHOztFQUVELFNBQVMsSUFBSSxHQUFHO0lBQ2QsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xGLElBQUksc0JBQXNCLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDOztJQUV0RyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO0lBQzlFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQzs7SUFFekYsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ25CLElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUMzQixPQUFPLEtBQUssRUFBRSxFQUFFO01BQ2QsSUFBSSxRQUFRLEdBQUcsTUFBTSxHQUFHLFVBQVUsQ0FBQztNQUNuQyxJQUFJLEtBQUssR0FBRyxnQkFBZ0IsR0FBRyxNQUFNLENBQUM7TUFDdEMsSUFBSSxNQUFNLEdBQUcsS0FBSyxHQUFHLFNBQVMsQ0FBQztNQUMvQixJQUFJLE1BQU0sR0FBRyxRQUFRLEdBQUcsQ0FBQyxTQUFTLENBQUM7TUFDbkMsSUFBSSxZQUFZLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQztNQUNuQyxJQUFJLFNBQVMsR0FBRyxZQUFZLEdBQUcsUUFBUSxHQUFHLE1BQU0sQ0FBQztNQUNqRCxVQUFVLEdBQUcsTUFBTSxDQUFDO01BQ3BCLE1BQU0sR0FBRyxTQUFTLENBQUM7S0FDcEI7O0lBRUQsSUFBSSxzQkFBc0IsRUFBRTtNQUMxQixTQUFTLEdBQUcsVUFBVSxDQUFDO01BQ3ZCLEtBQUssR0FBRyxNQUFNLENBQUM7S0FDaEI7O0lBRUQsT0FBTyxNQUFNLENBQUM7R0FDZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFDSCxJQUFJLEdBQUcsR0FBRyxjQUFjLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQzs7O0FBR3JDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7OztBQUd4QixHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDOzs7QUFHNUIsR0FBRyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQzs7O0FBR3hDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7OztBQUd4QixHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDOztBQUU1QixHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLFlBQVk7RUFDM0IsT0FBTztJQUNMLElBQUksRUFBRSxVQUFVLEdBQUcsRUFBRSxHQUFHLEVBQUU7TUFDeEIsR0FBRyxHQUFHLEdBQUcsSUFBSSxRQUFRLENBQUM7TUFDdEIsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztNQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztNQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQztNQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztNQUNoQixHQUFHLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3ZEO0lBQ0QsTUFBTSxFQUFFLFNBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRTtNQUN6QixHQUFHLEdBQUcsR0FBRyxJQUFJLFFBQVEsQ0FBQztNQUN0QixJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO01BQy9DLFFBQVEsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO01BQzNCLFFBQVEsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO01BQ3pCLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDM0Q7R0FDRjtDQUNGLEdBQUcsQ0FBQzs7O0FBR0wsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxZQUFZOztFQUU5QixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztFQUN2QyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQzs7Ozs7Ozs7RUFRdEMsT0FBTzs7SUFFTCxLQUFLLEVBQUUsRUFBRTs7SUFFVCxNQUFNLEVBQUUsU0FBUyxNQUFNLEVBQUU7O01BRXZCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsU0FBUyxHQUFHLEVBQUU7O1FBRXBELEtBQUssSUFBSSxHQUFHLElBQUksR0FBRztVQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7T0FFNUIsRUFBRSxJQUFJLENBQUMsQ0FBQzs7TUFFVCxPQUFPLE1BQU0sQ0FBQzs7S0FFZjs7SUFFRCxRQUFRLEVBQUUsU0FBUyxNQUFNLEVBQUU7O01BRXpCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsU0FBUyxHQUFHLEVBQUU7O1FBRXBELEtBQUssSUFBSSxHQUFHLElBQUksR0FBRztVQUNqQixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7O09BRTVCLEVBQUUsSUFBSSxDQUFDLENBQUM7O01BRVQsT0FBTyxNQUFNLENBQUM7O0tBRWY7O0lBRUQsT0FBTyxFQUFFLFdBQVc7TUFDbEIsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNqQyxPQUFPLFdBQVc7Y0FDaEIsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztjQUNyQyxLQUFLLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7ZUFDdEM7Y0FDRCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoQjtLQUNSOztJQUVELElBQUksRUFBRSxTQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFOzs7TUFHOUIsSUFBSSxRQUFRLElBQUksR0FBRyxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQUU7O1FBRXhDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDOztPQUV6QixNQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7UUFFeEMsS0FBSyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUU7VUFDOUMsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSztZQUM3RCxPQUFPOztPQUVaLE1BQU07O1FBRUwsS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHO1VBQ2pCLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLO1lBQy9DLE9BQU87O09BRVo7O0tBRUY7O0lBRUQsS0FBSyxFQUFFLFNBQVMsR0FBRyxFQUFFO01BQ25CLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDcEI7O0lBRUQsT0FBTyxFQUFFLFNBQVMsR0FBRyxFQUFFO01BQ3JCLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztNQUN0QyxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDNUI7O0lBRUQsV0FBVyxFQUFFLFNBQVMsR0FBRyxFQUFFO01BQ3pCLE9BQU8sR0FBRyxLQUFLLFNBQVMsQ0FBQztLQUMxQjs7SUFFRCxNQUFNLEVBQUUsU0FBUyxHQUFHLEVBQUU7TUFDcEIsT0FBTyxHQUFHLEtBQUssSUFBSSxDQUFDO0tBQ3JCOztJQUVELEtBQUssRUFBRSxTQUFTLEdBQUcsRUFBRTtNQUNuQixPQUFPLEdBQUcsS0FBSyxHQUFHLENBQUM7S0FDcEI7O0lBRUQsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLElBQUksU0FBUyxHQUFHLEVBQUU7TUFDdEMsT0FBTyxHQUFHLENBQUMsV0FBVyxLQUFLLEtBQUssQ0FBQztLQUNsQzs7SUFFRCxRQUFRLEVBQUUsU0FBUyxHQUFHLEVBQUU7TUFDdEIsT0FBTyxHQUFHLEtBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzVCOztJQUVELFFBQVEsRUFBRSxTQUFTLEdBQUcsRUFBRTtNQUN0QixPQUFPLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3RCOztJQUVELFFBQVEsRUFBRSxTQUFTLEdBQUcsRUFBRTtNQUN0QixPQUFPLEdBQUcsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDO0tBQ3ZCOztJQUVELFNBQVMsRUFBRSxTQUFTLEdBQUcsRUFBRTtNQUN2QixPQUFPLEdBQUcsS0FBSyxLQUFLLElBQUksR0FBRyxLQUFLLElBQUksQ0FBQztLQUN0Qzs7SUFFRCxVQUFVLEVBQUUsU0FBUyxHQUFHLEVBQUU7TUFDeEIsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssbUJBQW1CLENBQUM7S0FDcEU7O0dBRUYsQ0FBQzs7Q0FFSCxHQUFHLENBQUM7OztBQUdMLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVSxHQUFHLENBQUMsVUFBVSxNQUFNLEVBQUU7Ozs7Ozs7Ozs7RUFVOUMsSUFBSSxVQUFVLEdBQUcsU0FBUyxNQUFNLEVBQUUsUUFBUSxFQUFFOztJQUUxQyxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7O0lBTXJDLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7O0lBTWhELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOzs7Ozs7SUFNckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7Ozs7Ozs7SUFPekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7Ozs7Ozs7SUFPNUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQzs7R0FFbkMsQ0FBQzs7RUFFRixNQUFNLENBQUMsTUFBTTs7TUFFVCxVQUFVLENBQUMsU0FBUzs7O01BR3BCOzs7Ozs7Ozs7O1FBVUUsUUFBUSxFQUFFLFNBQVMsR0FBRyxFQUFFO1VBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1VBQ3RCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7Ozs7Ozs7Ozs7O1FBV0QsY0FBYyxFQUFFLFNBQVMsR0FBRyxFQUFFO1VBQzVCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLENBQUM7VUFDNUIsT0FBTyxJQUFJLENBQUM7U0FDYjs7Ozs7OztRQU9ELFFBQVEsRUFBRSxTQUFTLFFBQVEsRUFBRTtVQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRLENBQUM7VUFDdEMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztXQUN0QztVQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztVQUNyQixPQUFPLElBQUksQ0FBQztTQUNiOzs7Ozs7O1FBT0QsUUFBUSxFQUFFLFdBQVc7VUFDbkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNuQzs7Ozs7OztRQU9ELGFBQWEsRUFBRSxXQUFXO1VBQ3hCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7Ozs7O1FBS0QsVUFBVSxFQUFFLFdBQVc7VUFDckIsT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUU7U0FDN0M7O09BRUY7O0dBRUosQ0FBQzs7RUFFRixPQUFPLFVBQVUsQ0FBQzs7O0NBR25CLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzs7O0FBR3JCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsVUFBVSxNQUFNLEVBQUU7O0VBRS9CLElBQUksU0FBUyxHQUFHO0lBQ2QsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO0lBQ3hCLGFBQWEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUM7SUFDdkUsZ0JBQWdCLEVBQUUsQ0FBQyxTQUFTLENBQUM7R0FDOUIsQ0FBQzs7RUFFRixJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7RUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxFQUFFO01BQ3pCLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDdEIsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDOztFQUVILElBQUksZ0JBQWdCLEdBQUcsaUJBQWlCLENBQUM7O0VBRXpDLFNBQVMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFOztJQUU3QixJQUFJLEdBQUcsS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQzs7SUFFckQsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztJQUV4QyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtNQUN6QixPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM3Qjs7OztJQUlELE9BQU8sQ0FBQyxDQUFDOztHQUVWOzs7Ozs7RUFNRCxJQUFJLEdBQUcsR0FBRzs7Ozs7OztJQU9SLGNBQWMsRUFBRSxTQUFTLElBQUksRUFBRSxVQUFVLEVBQUU7O01BRXpDLElBQUksSUFBSSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRSxPQUFPOztNQUUzRCxJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsR0FBRyxXQUFXO1FBQzNDLE9BQU8sS0FBSyxDQUFDO09BQ2QsR0FBRyxXQUFXO09BQ2QsQ0FBQzs7TUFFRixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxVQUFVLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQztNQUN4RCxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxVQUFVLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQztNQUMxRCxJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDOztLQUUvQzs7Ozs7Ozs7SUFRRCxjQUFjLEVBQUUsU0FBUyxJQUFJLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRTs7TUFFbkQsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFVBQVUsR0FBRyxJQUFJLENBQUM7TUFDdEQsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsR0FBRyxJQUFJLENBQUM7O01BRWxELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQzs7TUFFakMsSUFBSSxVQUFVLEVBQUU7UUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO09BQ3RCO01BQ0QsSUFBSSxRQUFRLEVBQUU7UUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO09BQ3ZCOztLQUVGOzs7Ozs7OztJQVFELFNBQVMsRUFBRSxTQUFTLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtNQUNoRCxNQUFNLEdBQUcsTUFBTSxJQUFJLEVBQUUsQ0FBQztNQUN0QixJQUFJLFNBQVMsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7TUFDekMsSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsYUFBYSxHQUFHLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDO09BQ2hFO01BQ0QsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztNQUMxQyxRQUFRLFNBQVM7UUFDZixLQUFLLGFBQWE7VUFDaEIsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztVQUM5QyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1VBQzlDLEdBQUcsQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxPQUFPLElBQUksS0FBSztjQUNqRCxNQUFNLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLFVBQVUsSUFBSSxDQUFDO2NBQ3pELENBQUM7Y0FDRCxDQUFDO2NBQ0QsT0FBTztjQUNQLE9BQU87Y0FDUCxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1VBQ3pDLE1BQU07UUFDUixLQUFLLGdCQUFnQjtVQUNuQixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsaUJBQWlCLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQztVQUNyRCxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUN0QixVQUFVLEVBQUUsSUFBSTtZQUNoQixPQUFPLEVBQUUsS0FBSztZQUNkLE1BQU0sRUFBRSxLQUFLO1lBQ2IsUUFBUSxFQUFFLEtBQUs7WUFDZixPQUFPLEVBQUUsS0FBSztZQUNkLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLFFBQVEsRUFBRSxTQUFTO1dBQ3BCLENBQUMsQ0FBQztVQUNILElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLE9BQU8sSUFBSSxLQUFLO2NBQ25DLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTTtjQUN6QixNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxNQUFNO2NBQzdCLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLE9BQU87Y0FDL0IsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7VUFDckMsTUFBTTtRQUNSO1VBQ0UsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLE9BQU8sSUFBSSxLQUFLO2NBQzVDLE1BQU0sQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUM7VUFDL0IsTUFBTTtPQUNUO01BQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7TUFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN6Qjs7Ozs7Ozs7O0lBU0QsSUFBSSxFQUFFLFNBQVMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO01BQ3RDLElBQUksR0FBRyxJQUFJLElBQUksS0FBSyxDQUFDO01BQ3JCLElBQUksSUFBSSxDQUFDLGdCQUFnQjtRQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztXQUN0QyxJQUFJLElBQUksQ0FBQyxXQUFXO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztNQUN2QyxPQUFPLEdBQUcsQ0FBQztLQUNaOzs7Ozs7Ozs7SUFTRCxNQUFNLEVBQUUsU0FBUyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7TUFDeEMsSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLLENBQUM7TUFDckIsSUFBSSxJQUFJLENBQUMsbUJBQW1CO1FBQzFCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1dBQ3pDLElBQUksSUFBSSxDQUFDLFdBQVc7UUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO01BQ3ZDLE9BQU8sR0FBRyxDQUFDO0tBQ1o7Ozs7Ozs7SUFPRCxRQUFRLEVBQUUsU0FBUyxJQUFJLEVBQUUsU0FBUyxFQUFFO01BQ2xDLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7UUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7T0FDNUIsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1FBQ3ZDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtVQUNwQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1VBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDNUU7T0FDRjtNQUNELE9BQU8sR0FBRyxDQUFDO0tBQ1o7Ozs7Ozs7SUFPRCxXQUFXLEVBQUUsU0FBUyxJQUFJLEVBQUUsU0FBUyxFQUFFO01BQ3JDLElBQUksU0FBUyxFQUFFO1FBQ2IsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTs7U0FFakMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1VBQ3ZDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDL0IsTUFBTTtVQUNMLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1VBQ3pDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7VUFDdkMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDZixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7V0FDcEM7U0FDRjtPQUNGLE1BQU07UUFDTCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztPQUM1QjtNQUNELE9BQU8sR0FBRyxDQUFDO0tBQ1o7O0lBRUQsUUFBUSxFQUFFLFNBQVMsSUFBSSxFQUFFLFNBQVMsRUFBRTtNQUNsQyxPQUFPLElBQUksTUFBTSxDQUFDLFlBQVksR0FBRyxTQUFTLEdBQUcsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLENBQUM7S0FDMUY7Ozs7OztJQU1ELFFBQVEsRUFBRSxTQUFTLElBQUksRUFBRTs7TUFFdkIsSUFBSSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7O01BRW5DLE9BQU8sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7VUFDL0MsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7VUFDN0MsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1VBQ3ZDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztVQUN4QyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUN0Qzs7Ozs7O0lBTUQsU0FBUyxFQUFFLFNBQVMsSUFBSSxFQUFFOztNQUV4QixJQUFJLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7TUFFbkMsT0FBTyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztVQUM5QyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztVQUM5QyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7VUFDdEMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7VUFDekMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7S0FDdkM7Ozs7OztJQU1ELFNBQVMsRUFBRSxTQUFTLElBQUksRUFBRTtNQUN4QixJQUFJLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQzlCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtRQUNyQixHQUFHO1VBQ0QsTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDO1VBQy9CLE1BQU0sQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUM5QixRQUFRLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFO09BQ3BDO01BQ0QsT0FBTyxNQUFNLENBQUM7S0FDZjs7Ozs7OztJQU9ELFFBQVEsRUFBRSxTQUFTLElBQUksRUFBRTtNQUN2QixPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsYUFBYSxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3RFOztHQUVGLENBQUM7O0VBRUYsT0FBTyxHQUFHLENBQUM7O0NBRVosRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7QUFHckIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLFVBQVUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztFQWVyRSxJQUFJLGdCQUFnQixHQUFHLFNBQVMsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUU7O0lBRXpELGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQzs7SUFFekQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDOzs7Ozs7SUFNakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztJQUVqRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7TUFDM0IsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO01BQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxPQUFPLEVBQUU7UUFDckMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE9BQU8sQ0FBQztPQUN4QixDQUFDLENBQUM7TUFDSCxPQUFPLEdBQUcsR0FBRyxDQUFDO0tBQ2Y7O0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxLQUFLLEVBQUUsR0FBRyxFQUFFOztNQUV4QyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO01BQzNDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO01BQ3BCLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO01BQ2pDLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztLQUVqQyxDQUFDLENBQUM7OztJQUdILElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7SUFFckIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxXQUFXO01BQzNDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQztNQUMxRCxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQzlCLENBQUMsQ0FBQzs7SUFFSCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7O0dBRTVDLENBQUM7O0VBRUYsZ0JBQWdCLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQzs7RUFFekMsTUFBTSxDQUFDLE1BQU07O01BRVQsZ0JBQWdCLENBQUMsU0FBUztNQUMxQixVQUFVLENBQUMsU0FBUzs7TUFFcEI7O1FBRUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxFQUFFO1VBQ3BCLElBQUksUUFBUSxHQUFHLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7VUFDNUUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7V0FDbkQ7VUFDRCxPQUFPLFFBQVEsQ0FBQztTQUNqQjs7UUFFRCxhQUFhLEVBQUUsV0FBVztVQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7VUFDdEMsT0FBTyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkU7O09BRUY7O0dBRUosQ0FBQzs7RUFFRixPQUFPLGdCQUFnQixDQUFDOztDQUV6QixFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVTtBQUM3QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUc7QUFDWCxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7QUFHbEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLFVBQVUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztFQWdCaEUsSUFBSSxnQkFBZ0IsR0FBRyxTQUFTLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFOztJQUV4RCxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7O0lBRXpELE1BQU0sR0FBRyxNQUFNLElBQUksRUFBRSxDQUFDOztJQUV0QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQzs7SUFFMUIsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTs7TUFFbkMsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsRUFBRTtRQUMxQixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztPQUN4QixNQUFNOztRQUVMLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7T0FDekY7O0tBRUYsTUFBTTs7TUFFTCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7O0tBRWxDOztJQUVELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzs7O0dBR3BELENBQUM7O0VBRUYsZ0JBQWdCLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQzs7RUFFekMsTUFBTSxDQUFDLE1BQU07O01BRVQsZ0JBQWdCLENBQUMsU0FBUztNQUMxQixVQUFVLENBQUMsU0FBUzs7O01BR3BCOztRQUVFLFFBQVEsRUFBRSxTQUFTLENBQUMsRUFBRTs7VUFFcEIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUM5QyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztXQUNoQixNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDckQsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7V0FDaEI7O1VBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDckQsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1dBQy9DOztVQUVELE9BQU8sZ0JBQWdCLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzs7U0FFckU7Ozs7Ozs7OztRQVNELEdBQUcsRUFBRSxTQUFTLENBQUMsRUFBRTtVQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1VBQ2YsT0FBTyxJQUFJLENBQUM7U0FDYjs7Ozs7Ozs7O1FBU0QsR0FBRyxFQUFFLFNBQVMsQ0FBQyxFQUFFO1VBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7VUFDZixPQUFPLElBQUksQ0FBQztTQUNiOzs7Ozs7Ozs7Ozs7UUFZRCxJQUFJLEVBQUUsU0FBUyxDQUFDLEVBQUU7VUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7VUFDaEIsT0FBTyxJQUFJLENBQUM7U0FDYjs7T0FFRjs7R0FFSixDQUFDOztFQUVGLFNBQVMsV0FBVyxDQUFDLENBQUMsRUFBRTtJQUN0QixDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2pCLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtNQUN2QixPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDdEMsTUFBTTtNQUNMLE9BQU8sQ0FBQyxDQUFDO0tBQ1Y7R0FDRjs7RUFFRCxPQUFPLGdCQUFnQixDQUFDOztDQUV6QixFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVTtBQUM3QixHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7QUFHbEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLFVBQVUsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBa0I5RSxJQUFJLG1CQUFtQixHQUFHLFNBQVMsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUU7O0lBRTNELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7O0lBRW5DLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7O0lBRXBFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQzs7Ozs7O0lBTWpCLElBQUksTUFBTSxDQUFDOztJQUVYLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7Ozs7SUFJMUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMzQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDakQsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBRTs7O01BRzVDLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxFQUFFLEVBQUU7UUFDcEIsS0FBSyxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixLQUFLLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO09BQ3JDOztLQUVGLENBQUMsQ0FBQzs7SUFFSCxTQUFTLFFBQVEsR0FBRztNQUNsQixJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztNQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3pEOztJQUVELFNBQVMsTUFBTSxHQUFHO01BQ2hCLFFBQVEsRUFBRSxDQUFDO01BQ1gsSUFBSSxLQUFLLENBQUMsZ0JBQWdCLEVBQUU7UUFDMUIsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7T0FDdEQ7S0FDRjs7SUFFRCxTQUFTLFdBQVcsQ0FBQyxDQUFDLEVBQUU7TUFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO01BQzNDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztNQUN2QyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztLQUNwQjs7SUFFRCxTQUFTLFdBQVcsQ0FBQyxDQUFDLEVBQUU7O01BRXRCLElBQUksSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO01BQzlCLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7O01BRTlELE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDOztLQUVwQjs7SUFFRCxTQUFTLFNBQVMsR0FBRztNQUNuQixHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7TUFDN0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQzFDOztJQUVELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7SUFFckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztHQUUzQyxDQUFDOztFQUVGLG1CQUFtQixDQUFDLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQzs7RUFFbEQsTUFBTSxDQUFDLE1BQU07O01BRVQsbUJBQW1CLENBQUMsU0FBUztNQUM3QixnQkFBZ0IsQ0FBQyxTQUFTOztNQUUxQjs7UUFFRSxhQUFhLEVBQUUsV0FBVzs7VUFFeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztVQUN0SCxPQUFPLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxRTs7T0FFRjs7R0FFSixDQUFDOztFQUVGLFNBQVMsY0FBYyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUU7SUFDdkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbkMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7R0FDMUM7O0VBRUQsT0FBTyxtQkFBbUIsQ0FBQzs7Q0FFNUIsRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLGdCQUFnQjtBQUNuQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUc7QUFDWCxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7QUFHbEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsR0FBRyxDQUFDLFVBQVUsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQW9CbEcsSUFBSSxzQkFBc0IsR0FBRyxTQUFTLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7O0lBRXRFLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7O0lBRW5HLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQzs7SUFFakIsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7OztJQUlsRCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDOztJQUV0RCxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDMUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDOztJQUU3QyxTQUFTLFdBQVcsQ0FBQyxDQUFDLEVBQUU7O01BRXRCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztNQUMzQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7O01BRXZDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNoQjs7SUFFRCxTQUFTLFdBQVcsQ0FBQyxDQUFDLEVBQUU7O01BRXRCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7TUFFbkIsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7TUFDL0MsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7O01BRTdDLEtBQUssQ0FBQyxRQUFRO1FBQ1osR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUM7T0FDM0UsQ0FBQzs7TUFFRixPQUFPLEtBQUssQ0FBQzs7S0FFZDs7SUFFRCxTQUFTLFNBQVMsR0FBRztNQUNuQixHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7TUFDN0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO01BQ3pDLElBQUksS0FBSyxDQUFDLGdCQUFnQixFQUFFO1FBQzFCLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO09BQ3REO0tBQ0Y7O0lBRUQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOztJQUVyQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDOztHQUVoRCxDQUFDOztFQUVGLHNCQUFzQixDQUFDLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQzs7Ozs7RUFLckQsc0JBQXNCLENBQUMsZ0JBQWdCLEdBQUcsV0FBVztJQUNuRCxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0dBQ3hCLENBQUM7O0VBRUYsTUFBTSxDQUFDLE1BQU07O01BRVQsc0JBQXNCLENBQUMsU0FBUztNQUNoQyxnQkFBZ0IsQ0FBQyxTQUFTOztNQUUxQjs7UUFFRSxhQUFhLEVBQUUsV0FBVztVQUN4QixJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1VBQ25FLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztVQUM1QyxPQUFPLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3RTs7T0FFRjs7OztHQUlKLENBQUM7O0VBRUYsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtJQUM5QixPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0dBQ2hEOztFQUVELE9BQU8sc0JBQXNCLENBQUM7O0NBRS9CLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0I7QUFDbkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHO0FBQ1gsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHO0FBQ2IsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNO0FBQ2hCLG1rQkFBbWtCLENBQUMsQ0FBQzs7O0FBR3JrQixHQUFHLENBQUMsV0FBVyxDQUFDLGtCQUFrQixHQUFHLENBQUMsVUFBVSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRTs7Ozs7Ozs7Ozs7O0VBWXZFLElBQUksa0JBQWtCLEdBQUcsU0FBUyxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTs7SUFFeEQsa0JBQWtCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDOztJQUUzRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7O0lBRWpCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLEtBQUssU0FBUyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDN0QsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsRUFBRTtNQUMzQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7TUFDbkIsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO01BQ2IsT0FBTyxLQUFLLENBQUM7S0FDZCxDQUFDLENBQUM7O0lBRUgsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDOztJQUV0QyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7OztHQUc1QyxDQUFDOztFQUVGLGtCQUFrQixDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7O0VBRTNDLE1BQU0sQ0FBQyxNQUFNOztNQUVULGtCQUFrQixDQUFDLFNBQVM7TUFDNUIsVUFBVSxDQUFDLFNBQVM7TUFDcEI7O1FBRUUsSUFBSSxFQUFFLFdBQVc7VUFDZixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7V0FDNUI7VUFDRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztXQUNuRDtVQUNELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ25DO09BQ0Y7O0dBRUosQ0FBQzs7RUFFRixPQUFPLGtCQUFrQixDQUFDOztDQUUzQixFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVTtBQUM3QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUc7QUFDWCxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7QUFHbEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLFVBQVUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUU7Ozs7Ozs7Ozs7O0VBV3RFLElBQUksaUJBQWlCLEdBQUcsU0FBUyxNQUFNLEVBQUUsUUFBUSxFQUFFOztJQUVqRCxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7O0lBRTFELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztJQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7SUFFOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQzs7O0lBR2pELEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDOztJQUVyRCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7OztJQUc3QyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7O0lBRXJCLFNBQVMsUUFBUSxHQUFHO01BQ2xCLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDL0I7O0dBRUYsQ0FBQzs7RUFFRixpQkFBaUIsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDOztFQUUxQyxNQUFNLENBQUMsTUFBTTs7TUFFVCxpQkFBaUIsQ0FBQyxTQUFTO01BQzNCLFVBQVUsQ0FBQyxTQUFTOztNQUVwQjs7UUFFRSxRQUFRLEVBQUUsU0FBUyxDQUFDLEVBQUU7VUFDcEIsSUFBSSxRQUFRLEdBQUcsaUJBQWlCLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztVQUM3RSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztXQUNuRDtVQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1VBQzlCLE9BQU8sUUFBUSxDQUFDO1NBQ2pCOztRQUVELGFBQWEsRUFBRSxXQUFXOztVQUV4QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztXQUNoQyxNQUFNO2NBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1dBQ25DOztVQUVELE9BQU8saUJBQWlCLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztTQUV4RTs7O09BR0Y7O0dBRUosQ0FBQzs7RUFFRixPQUFPLGlCQUFpQixDQUFDOztDQUUxQixFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVTtBQUM3QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUc7QUFDWCxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7QUFHbEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxVQUFVLE1BQU0sRUFBRTs7RUFFdEMsT0FBTyxTQUFTLEtBQUssRUFBRTs7SUFFckIsSUFBSSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTs7TUFFL0MsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7TUFDL0IsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNuQixDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztPQUNiOztNQUVELE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQzs7S0FFaEIsTUFBTTs7TUFFTCxPQUFPLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQzs7S0FFcEg7O0dBRUY7O0NBRUYsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7QUFHckIsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxVQUFVLFFBQVEsRUFBRSxNQUFNLEVBQUU7O0VBRWpELElBQUksTUFBTSxFQUFFLFFBQVEsQ0FBQzs7RUFFckIsSUFBSSxTQUFTLEdBQUcsV0FBVzs7SUFFekIsUUFBUSxHQUFHLEtBQUssQ0FBQzs7SUFFakIsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7O0lBRS9FLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFNBQVMsTUFBTSxFQUFFOztNQUU1QyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUU7O1FBRTNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxTQUFTLFVBQVUsRUFBRSxjQUFjLEVBQUU7O1VBRW5FLE1BQU0sR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztVQUVuQyxJQUFJLFFBQVEsS0FBSyxLQUFLLElBQUksTUFBTSxLQUFLLEtBQUssRUFBRTtZQUMxQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1lBQ3ZDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBQy9CLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQzs7V0FFckI7O1NBRUYsQ0FBQyxDQUFDOztRQUVILE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQzs7T0FFckI7O0tBRUYsQ0FBQyxDQUFDOztJQUVILE9BQU8sUUFBUSxDQUFDOztHQUVqQixDQUFDOztFQUVGLElBQUksZUFBZSxHQUFHOzs7SUFHcEI7O01BRUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxRQUFROztNQUV2QixXQUFXLEVBQUU7O1FBRVgsY0FBYyxFQUFFOztVQUVkLElBQUksRUFBRSxTQUFTLFFBQVEsRUFBRTs7WUFFdkIsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1lBQ2hFLElBQUksSUFBSSxLQUFLLElBQUksRUFBRSxPQUFPLEtBQUssQ0FBQzs7WUFFaEMsT0FBTztjQUNMLEtBQUssRUFBRSxLQUFLO2NBQ1osR0FBRyxFQUFFLFFBQVE7a0JBQ1QsSUFBSTtzQkFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtzQkFDdkMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7c0JBQ3ZDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDakQsQ0FBQzs7V0FFSDs7VUFFRCxLQUFLLEVBQUUsUUFBUTs7U0FFaEI7O1FBRUQsWUFBWSxFQUFFOztVQUVaLElBQUksRUFBRSxTQUFTLFFBQVEsRUFBRTs7WUFFdkIsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQy9DLElBQUksSUFBSSxLQUFLLElBQUksRUFBRSxPQUFPLEtBQUssQ0FBQzs7WUFFaEMsT0FBTztjQUNMLEtBQUssRUFBRSxLQUFLO2NBQ1osR0FBRyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ3pDLENBQUM7O1dBRUg7O1VBRUQsS0FBSyxFQUFFLFFBQVE7O1NBRWhCOztRQUVELE9BQU8sRUFBRTs7VUFFUCxJQUFJLEVBQUUsU0FBUyxRQUFRLEVBQUU7O1lBRXZCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztZQUN0RSxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUUsT0FBTyxLQUFLLENBQUM7O1lBRWhDLE9BQU87Y0FDTCxLQUFLLEVBQUUsS0FBSztjQUNaLENBQUMsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2NBQ3RCLENBQUMsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2NBQ3RCLENBQUMsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3ZCLENBQUM7O1dBRUg7O1VBRUQsS0FBSyxFQUFFLFFBQVE7O1NBRWhCOztRQUVELFFBQVEsRUFBRTs7VUFFUixJQUFJLEVBQUUsU0FBUyxRQUFRLEVBQUU7O1lBRXZCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQztZQUNuRixJQUFJLElBQUksS0FBSyxJQUFJLEVBQUUsT0FBTyxLQUFLLENBQUM7O1lBRWhDLE9BQU87Y0FDTCxLQUFLLEVBQUUsS0FBSztjQUNaLENBQUMsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2NBQ3RCLENBQUMsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2NBQ3RCLENBQUMsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2NBQ3RCLENBQUMsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3ZCLENBQUM7O1dBRUg7O1VBRUQsS0FBSyxFQUFFLFFBQVE7O1NBRWhCOztPQUVGOztLQUVGOzs7SUFHRDs7TUFFRSxNQUFNLEVBQUUsTUFBTSxDQUFDLFFBQVE7O01BRXZCLFdBQVcsRUFBRTs7UUFFWCxHQUFHLEVBQUU7VUFDSCxJQUFJLEVBQUUsU0FBUyxRQUFRLEVBQUU7WUFDdkIsT0FBTztjQUNMLEtBQUssRUFBRSxLQUFLO2NBQ1osR0FBRyxFQUFFLFFBQVE7Y0FDYixjQUFjLEVBQUUsS0FBSzthQUN0QjtXQUNGOztVQUVELEtBQUssRUFBRSxTQUFTLEtBQUssRUFBRTtZQUNyQixPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUM7V0FDbEI7U0FDRjs7T0FFRjs7S0FFRjs7O0lBR0Q7O01BRUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxPQUFPOztNQUV0QixXQUFXLEVBQUU7O1FBRVgsU0FBUyxFQUFFO1VBQ1QsSUFBSSxFQUFFLFNBQVMsUUFBUSxFQUFFO1lBQ3ZCLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsT0FBTyxLQUFLLENBQUM7WUFDdkMsT0FBTztjQUNMLEtBQUssRUFBRSxLQUFLO2NBQ1osQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7Y0FDZCxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztjQUNkLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO2FBQ2YsQ0FBQztXQUNIOztVQUVELEtBQUssRUFBRSxTQUFTLEtBQUssRUFBRTtZQUNyQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztXQUNwQzs7U0FFRjs7UUFFRCxVQUFVLEVBQUU7VUFDVixJQUFJLEVBQUUsU0FBUyxRQUFRLEVBQUU7WUFDdkIsSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxPQUFPLEtBQUssQ0FBQztZQUN2QyxPQUFPO2NBQ0wsS0FBSyxFQUFFLEtBQUs7Y0FDWixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztjQUNkLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO2NBQ2QsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7Y0FDZCxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUNmLENBQUM7V0FDSDs7VUFFRCxLQUFLLEVBQUUsU0FBUyxLQUFLLEVBQUU7WUFDckIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztXQUM3Qzs7U0FFRjs7T0FFRjs7S0FFRjs7O0lBR0Q7O01BRUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxRQUFROztNQUV2QixXQUFXLEVBQUU7O1FBRVgsUUFBUSxFQUFFO1VBQ1IsSUFBSSxFQUFFLFNBQVMsUUFBUSxFQUFFO1lBQ3ZCLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7Y0FDL0IsT0FBTztnQkFDTCxLQUFLLEVBQUUsS0FBSztnQkFDWixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNiLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7ZUFDZDthQUNGO1lBQ0QsT0FBTyxLQUFLLENBQUM7V0FDZDs7VUFFRCxLQUFLLEVBQUUsU0FBUyxLQUFLLEVBQUU7WUFDckIsT0FBTztjQUNMLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztjQUNWLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztjQUNWLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztjQUNWLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNYO1dBQ0Y7U0FDRjs7UUFFRCxPQUFPLEVBQUU7VUFDUCxJQUFJLEVBQUUsU0FBUyxRQUFRLEVBQUU7WUFDdkIsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7Y0FDL0IsT0FBTztnQkFDTCxLQUFLLEVBQUUsS0FBSztnQkFDWixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNiLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztlQUNkO2FBQ0Y7WUFDRCxPQUFPLEtBQUssQ0FBQztXQUNkOztVQUVELEtBQUssRUFBRSxTQUFTLEtBQUssRUFBRTtZQUNyQixPQUFPO2NBQ0wsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2NBQ1YsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2NBQ1YsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ1g7V0FDRjtTQUNGOztRQUVELFFBQVEsRUFBRTtVQUNSLElBQUksRUFBRSxTQUFTLFFBQVEsRUFBRTtZQUN2QixJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO2NBQy9CLE9BQU87Z0JBQ0wsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNiLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2VBQ2Q7YUFDRjtZQUNELE9BQU8sS0FBSyxDQUFDO1dBQ2Q7O1VBRUQsS0FBSyxFQUFFLFNBQVMsS0FBSyxFQUFFO1lBQ3JCLE9BQU87Y0FDTCxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Y0FDVixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Y0FDVixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Y0FDVixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDWDtXQUNGO1NBQ0Y7O1FBRUQsT0FBTyxFQUFFO1VBQ1AsSUFBSSxFQUFFLFNBQVMsUUFBUSxFQUFFO1lBQ3ZCLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO2NBQy9CLE9BQU87Z0JBQ0wsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNiLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7ZUFDZDthQUNGO1lBQ0QsT0FBTyxLQUFLLENBQUM7V0FDZDs7VUFFRCxLQUFLLEVBQUUsU0FBUyxLQUFLLEVBQUU7WUFDckIsT0FBTztjQUNMLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztjQUNWLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztjQUNWLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNYO1dBQ0Y7O1NBRUY7O09BRUY7O0tBRUY7OztHQUdGLENBQUM7O0VBRUYsT0FBTyxTQUFTLENBQUM7OztDQUdsQixFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUTtBQUNyQixHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7QUFHbEIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLFVBQVUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsc0JBQXNCLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLHFCQUFxQixFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFOztFQUUvUSxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7RUFHdkIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDOztFQUV6QixJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7OztFQUd2QixJQUFJLG1CQUFtQixHQUFHLEVBQUUsQ0FBQzs7RUFFN0IsSUFBSSwyQkFBMkIsR0FBRyxTQUFTLENBQUM7O0VBRTVDLElBQUksc0JBQXNCLEdBQUcsQ0FBQyxXQUFXO0lBQ3ZDLElBQUk7TUFDRixPQUFPLGNBQWMsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLElBQUksQ0FBQztLQUNwRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO01BQ1YsT0FBTyxLQUFLLENBQUM7S0FDZDtHQUNGLEdBQUcsQ0FBQzs7RUFFTCxJQUFJLGFBQWEsQ0FBQzs7O0VBR2xCLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDOzs7RUFHN0IsSUFBSSxvQkFBb0IsQ0FBQzs7O0VBR3pCLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQzs7O0VBR2pCLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFpQnZCLElBQUksR0FBRyxHQUFHLFNBQVMsTUFBTSxFQUFFOztJQUV6QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7Ozs7OztJQU1qQixJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFFdkMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDOzs7Ozs7SUFNN0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7O0lBRXBCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDOzs7Ozs7SUFNeEIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFvQjlCLElBQUksQ0FBQyxzQ0FBc0MsR0FBRyxFQUFFLENBQUM7O0lBRWpELElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDOztJQUV0QixNQUFNLEdBQUcsTUFBTSxJQUFJLEVBQUUsQ0FBQzs7O0lBR3RCLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtNQUMvQixTQUFTLEVBQUUsSUFBSTtNQUNmLEtBQUssRUFBRSxHQUFHLENBQUMsYUFBYTtLQUN6QixDQUFDLENBQUM7O0lBRUgsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO01BQy9CLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUztNQUMzQixRQUFRLEVBQUUsTUFBTSxDQUFDLFNBQVM7S0FDM0IsQ0FBQyxDQUFDOzs7SUFHSCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7OztNQUdwQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7S0FFdkQsTUFBTTs7TUFFTCxNQUFNLENBQUMsSUFBSSxHQUFHLEVBQUUsTUFBTSxFQUFFLDJCQUEyQixFQUFFLENBQUM7O0tBRXZEOztJQUVELElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtNQUN4RCxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzFCOzs7SUFHRCxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUM7OztJQUd6RSxJQUFJLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUU7TUFDN0QsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7S0FDMUI7Ozs7O0lBS0QsSUFBSSxpQkFBaUI7UUFDakIsc0JBQXNCO1lBQ2xCLFlBQVksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDOztJQUU5RSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSTs7O1FBR3hCOzs7Ozs7VUFNRSxNQUFNLEVBQUU7WUFDTixHQUFHLEVBQUUsV0FBVztjQUNkLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUN0QjtXQUNGOztVQUVELFVBQVUsRUFBRTtZQUNWLEdBQUcsRUFBRSxXQUFXO2NBQ2QsT0FBTyxNQUFNLENBQUMsVUFBVSxDQUFDO2FBQzFCO1dBQ0Y7Ozs7OztVQU1ELFNBQVMsRUFBRTtZQUNULEdBQUcsRUFBRSxXQUFXO2NBQ2QsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDO2FBQ3pCO1dBQ0Y7Ozs7OztVQU1ELE1BQU0sRUFBRTs7WUFFTixHQUFHLEVBQUUsV0FBVztjQUNkLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDaEIsT0FBTyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDO2VBQy9CLE1BQU07Z0JBQ0wsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztlQUMzQjthQUNGOztZQUVELEdBQUcsRUFBRSxTQUFTLENBQUMsRUFBRTtjQUNmLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDaEIsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7ZUFDNUIsTUFBTTtnQkFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7ZUFDeEI7Y0FDRCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztjQUMzQixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDaEI7O1dBRUY7Ozs7OztVQU1ELEtBQUssRUFBRTtZQUNMLEdBQUcsRUFBRSxXQUFXO2NBQ2QsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ3JCO1lBQ0QsR0FBRyxFQUFFLFNBQVMsQ0FBQyxFQUFFO2NBQ2YsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Y0FDakIsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNwQjtXQUNGOzs7Ozs7O1VBT0QsSUFBSSxFQUFFO1lBQ0osR0FBRyxFQUFFLFdBQVc7Y0FDZCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDcEI7WUFDRCxHQUFHLEVBQUUsU0FBUyxDQUFDLEVBQUU7O2NBRWYsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7Y0FDaEIsSUFBSSxjQUFjLEVBQUU7Z0JBQ2xCLGNBQWMsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztlQUN4QzthQUNGO1dBQ0Y7Ozs7OztVQU1ELE1BQU0sRUFBRTtZQUNOLEdBQUcsRUFBRSxXQUFXO2NBQ2QsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ3RCO1lBQ0QsR0FBRyxFQUFFLFNBQVMsQ0FBQyxFQUFFO2NBQ2YsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Y0FDbEIsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUNqQixHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO2VBQzVDLE1BQU07Z0JBQ0wsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztlQUMvQzs7OztjQUlELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7Y0FFaEIsSUFBSSxLQUFLLENBQUMsYUFBYSxFQUFFO2dCQUN2QixLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDO2VBQ3JFO2FBQ0Y7V0FDRjs7Ozs7O1VBTUQsSUFBSSxFQUFFO1lBQ0osR0FBRyxFQUFFLFdBQVc7Y0FDZCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDcEI7V0FDRjs7Ozs7OztVQU9ELGVBQWUsRUFBRTs7WUFFZixHQUFHLEVBQUUsV0FBVztjQUNkLE9BQU8saUJBQWlCLENBQUM7YUFDMUI7WUFDRCxHQUFHLEVBQUUsU0FBUyxJQUFJLEVBQUU7Y0FDbEIsSUFBSSxzQkFBc0IsRUFBRTtnQkFDMUIsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO2dCQUN6QixJQUFJLElBQUksRUFBRTtrQkFDUixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztpQkFDaEQsTUFBTTtrQkFDTCxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztpQkFDbEQ7Z0JBQ0QsWUFBWSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7ZUFDbkU7YUFDRjs7V0FFRjs7U0FFRixDQUFDLENBQUM7OztJQUdQLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7O01BRXJDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOztNQUV0QixHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO01BQzlDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQzs7O01BRzNDLElBQUksc0JBQXNCLEVBQUU7O1FBRTFCLElBQUksaUJBQWlCLEVBQUU7O1VBRXJCLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDOztVQUU3QixJQUFJLFNBQVMsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDOztVQUV2RSxJQUFJLFNBQVMsRUFBRTtZQUNiLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztXQUNyQzs7U0FFRjs7T0FFRjs7TUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7TUFDbkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQztNQUMvQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7TUFDekQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDOztNQUVoRCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLFdBQVc7O1FBRS9DLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDOzs7T0FHOUIsQ0FBQyxDQUFDOzs7O0tBSUosTUFBTTs7TUFFTCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO1FBQy9CLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO09BQ3RCOztNQUVELElBQUksY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO01BQzFELEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLGlCQUFpQixDQUFDLENBQUM7O01BRWhELElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7O01BRTlDLElBQUksY0FBYyxHQUFHLFNBQVMsQ0FBQyxFQUFFO1FBQy9CLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQixLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUM3QixPQUFPLEtBQUssQ0FBQztPQUNkLENBQUM7O01BRUYsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQzs7TUFFMUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7TUFDakMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDOztNQUU3QyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztPQUNyQjs7S0FFRjs7SUFFRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUU7O01BRXBCLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7O1FBRXJDLElBQUksaUJBQWlCLEVBQUU7VUFDckIsb0JBQW9CLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztVQUNyRCxHQUFHLENBQUMsUUFBUSxDQUFDLG9CQUFvQixFQUFFLGFBQWEsQ0FBQyxDQUFDO1VBQ2xELEdBQUcsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7VUFDbkUsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUMsQ0FBQztVQUNoRCxpQkFBaUIsR0FBRyxLQUFLLENBQUM7U0FDM0I7OztRQUdELG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7OztRQUdsRCxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7O09BRXJEOzs7O01BSUQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7O0tBRWpEOztJQUVELEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFBLEVBQUUsQ0FBQyxDQUFDO0lBQzVELEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxxQkFBcUIsRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdFLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQSxFQUFFLENBQUMsQ0FBQztJQUN0RSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQSxFQUFFLENBQUMsQ0FBQztJQUN2RSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7OztJQUdoQixJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUU7TUFDcEIsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3ZCOztJQUVELFNBQVMsa0JBQWtCLEdBQUc7TUFDNUIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ2hHOztJQUVELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMzQixTQUFTLFVBQVUsR0FBRztRQUNsQixJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7UUFDaEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXO1VBQ3RCLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1NBQ2pCLENBQUMsQ0FBQztPQUNKOztNQUVELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1FBQ2xCLFVBQVUsRUFBRSxDQUFDO09BQ2Q7O0dBRUosQ0FBQzs7RUFFRixHQUFHLENBQUMsVUFBVSxHQUFHLFdBQVc7O0lBRTFCLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQztJQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFNBQVMsR0FBRyxFQUFFO01BQ3ZDLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO01BQ2hELEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUM3QyxDQUFDLENBQUM7R0FDSixDQUFDOztFQUVGLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLENBQUM7RUFDM0IsR0FBRyxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQztFQUN0QyxHQUFHLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztFQUN4QixHQUFHLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO0VBQ2hDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsb0JBQW9CLENBQUM7RUFDMUMsR0FBRyxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUM7RUFDNUIsR0FBRyxDQUFDLGtCQUFrQixHQUFHLGNBQWMsQ0FBQztFQUN4QyxHQUFHLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQzs7RUFFeEIsR0FBRyxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7RUFDeEIsR0FBRyxDQUFDLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQztFQUNuQyxHQUFHLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQzs7RUFFaEMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFOztJQUV0QyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLE1BQU07U0FDckMsQ0FBQyxDQUFDLEtBQUssS0FBSyxhQUFhLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxhQUFhLENBQUMsRUFBRTtNQUM3RCxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDbEI7O0dBRUYsRUFBRSxLQUFLLENBQUMsQ0FBQzs7RUFFVixNQUFNLENBQUMsTUFBTTs7TUFFVCxHQUFHLENBQUMsU0FBUzs7O01BR2I7Ozs7Ozs7O1FBUUUsR0FBRyxFQUFFLFNBQVMsTUFBTSxFQUFFLFFBQVEsRUFBRTs7VUFFOUIsT0FBTyxHQUFHO2NBQ04sSUFBSTtjQUNKLE1BQU07Y0FDTixRQUFRO2NBQ1I7Z0JBQ0UsV0FBVyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO2VBQ3REO1dBQ0osQ0FBQzs7U0FFSDs7Ozs7Ozs7UUFRRCxRQUFRLEVBQUUsU0FBUyxNQUFNLEVBQUUsUUFBUSxFQUFFOztVQUVuQyxPQUFPLEdBQUc7Y0FDTixJQUFJO2NBQ0osTUFBTTtjQUNOLFFBQVE7Y0FDUjtnQkFDRSxLQUFLLEVBQUUsSUFBSTtlQUNaO1dBQ0osQ0FBQzs7U0FFSDs7Ozs7O1FBTUQsTUFBTSxFQUFFLFNBQVMsVUFBVSxFQUFFOzs7VUFHM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1VBQ3ZDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1VBQ3BFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztVQUNqQixNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVc7WUFDdEIsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1dBQ2xCLENBQUMsQ0FBQzs7U0FFSjs7UUFFRCxPQUFPLEVBQUUsV0FBVzs7VUFFbEIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7V0FDbkQ7O1NBRUY7Ozs7Ozs7OztRQVNELFNBQVMsRUFBRSxTQUFTLElBQUksRUFBRTs7OztVQUl4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQ3RDLE1BQU0sSUFBSSxLQUFLLENBQUMsOENBQThDO2dCQUMxRCxTQUFTLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1dBQzdCOztVQUVELElBQUksY0FBYyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7Ozs7O1VBS2xELGNBQWMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQzs7OztVQUkxQyxJQUFJLElBQUksQ0FBQyxJQUFJO2NBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO2NBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFOzs7WUFHM0IsY0FBYyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUM7OztZQUd2RCxjQUFjLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztXQUUvQzs7VUFFRCxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztVQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQzs7VUFFM0IsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7VUFDdEMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7VUFDM0IsT0FBTyxHQUFHLENBQUM7O1NBRVo7O1FBRUQsSUFBSSxFQUFFLFdBQVc7VUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUNyQjs7UUFFRCxLQUFLLEVBQUUsV0FBVztVQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUNwQjs7UUFFRCxRQUFRLEVBQUUsV0FBVzs7VUFFbkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOztVQUUxQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7O1lBRW5CLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUN2QyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7O1lBRVYsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFTLElBQUksRUFBRTtjQUMvQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDaEQsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDNUIsQ0FBQyxDQUFDOztZQUVILElBQUksTUFBTSxDQUFDLFdBQVcsR0FBRyxHQUFHLEdBQUcsbUJBQW1CLEdBQUcsQ0FBQyxFQUFFO2NBQ3RELEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7Y0FDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxHQUFHLG1CQUFtQixHQUFHLElBQUksQ0FBQzthQUNoRixNQUFNO2NBQ0wsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztjQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2FBQ2pDOztXQUVGOztVQUVELElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVc7Y0FDdEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzthQUNuRSxDQUFDLENBQUM7V0FDSjs7VUFFRCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1dBQ3BEOztTQUVGOzs7Ozs7Ozs7OztRQVdELFFBQVEsRUFBRSxXQUFXOztVQUVuQixJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDckMsYUFBYSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7WUFDbEMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsb0JBQW9CLENBQUM7V0FDM0Q7O1VBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1dBQ25FOztVQUVELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQzs7VUFFakIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsU0FBUyxNQUFNLEVBQUU7WUFDbEUsSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtjQUN6QyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDcEI7WUFDRCxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Y0FDbkQsS0FBSyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN4QztXQUNGLENBQUMsQ0FBQzs7VUFFSCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7O1lBRWxCLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1dBQzVCOztTQUVGOzs7Ozs7UUFNRCxPQUFPLEVBQUUsV0FBVztVQUNsQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7VUFDZixPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDakIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7V0FDbEI7VUFDRCxPQUFPLEdBQUcsQ0FBQztTQUNaOzs7Ozs7O1FBT0QsYUFBYSxFQUFFLFdBQVc7O1VBRXhCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7O1VBRXpCLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7O1VBRzlCLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O1lBRXZDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7WUFFOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7Y0FDeEIsUUFBUSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7YUFDMUI7O1lBRUQsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7O1dBRTNEOztVQUVELFFBQVEsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1VBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDakQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7V0FDakQsQ0FBQyxDQUFDOztVQUVILE9BQU8sUUFBUSxDQUFDOztTQUVqQjs7UUFFRCxJQUFJLEVBQUUsV0FBVzs7VUFFZixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1dBQzNCOztVQUVELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztVQUMzRCxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7O1NBRWpDOztRQUVELE1BQU0sRUFBRSxTQUFTLFVBQVUsRUFBRTs7VUFFM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFOzs7WUFHekIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLDJCQUEyQixDQUFDLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDOztXQUVsRjs7VUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztVQUMxRCxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztVQUN6QixlQUFlLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQzs7U0FFekM7O1FBRUQsTUFBTSxFQUFFLFNBQVMsR0FBRyxFQUFFOztVQUVwQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsU0FBUyxVQUFVLEVBQUU7O1lBRW5ELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtjQUNuQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUM5QyxNQUFNO2NBQ0wsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUNyRDtXQUNGLEVBQUUsSUFBSSxDQUFDLENBQUM7O1VBRVQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsTUFBTSxFQUFFO1lBQzNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7V0FDdkIsQ0FBQyxDQUFDOztVQUVILElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7V0FDM0M7OztTQUdGOztRQUVELE1BQU0sRUFBRSxTQUFTLFVBQVUsRUFBRTs7VUFFM0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1VBQ3hDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1VBQ2xDLElBQUksSUFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7O1NBRTVDOztPQUVGOztHQUVKLENBQUM7O0VBRUYsU0FBUyxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFOztJQUUxQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxTQUFTLEVBQUU7TUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxTQUFTLEdBQUcsTUFBTSxHQUFHLHFCQUFxQixHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUMvRTs7SUFFRCxJQUFJLFVBQVUsQ0FBQzs7SUFFZixJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7O01BRWhCLFVBQVUsR0FBRyxJQUFJLGVBQWUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7O0tBRXBELE1BQU07O01BRUwsSUFBSSxXQUFXLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztNQUMvRCxVQUFVLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQzs7S0FFeEQ7O0lBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxZQUFZLFVBQVUsRUFBRTtNQUN2QyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ3BDOztJQUVELGdCQUFnQixDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQzs7SUFFbEMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDOztJQUV6QyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQzs7SUFFckMsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLFNBQVMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztJQUU3QyxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7O0lBRS9DLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQzNDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7O0lBRS9DLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7O0lBRXZDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztJQUVuQyxPQUFPLFVBQVUsQ0FBQzs7R0FFbkI7Ozs7Ozs7OztFQVNELFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFO0lBQ2xDLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixJQUFJLFFBQVEsRUFBRTtNQUNaLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDMUMsTUFBTTtNQUNMLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzFCO0lBQ0QsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2YsT0FBTyxFQUFFLENBQUM7R0FDWDs7RUFFRCxTQUFTLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFOztJQUU5QyxVQUFVLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNyQixVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQzs7SUFFdkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7O01BRXhCLE9BQU8sRUFBRSxTQUFTLE9BQU8sRUFBRTs7UUFFekIsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtVQUN4QixVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7O1VBRXBCLE9BQU8sR0FBRztjQUNOLEdBQUc7Y0FDSCxVQUFVLENBQUMsTUFBTTtjQUNqQixVQUFVLENBQUMsUUFBUTtjQUNuQjtnQkFDRSxNQUFNLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxrQkFBa0I7Z0JBQzFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7ZUFDekM7V0FDSixDQUFDOztTQUVIOztRQUVELElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1VBQ3ZELFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7VUFFcEIsT0FBTyxHQUFHO2NBQ04sR0FBRztjQUNILFVBQVUsQ0FBQyxNQUFNO2NBQ2pCLFVBQVUsQ0FBQyxRQUFRO2NBQ25CO2dCQUNFLE1BQU0sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLGtCQUFrQjtnQkFDMUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDO2VBQ3ZCO1dBQ0osQ0FBQzs7U0FFSDs7T0FFRjs7TUFFRCxJQUFJLEVBQUUsU0FBUyxDQUFDLEVBQUU7UUFDaEIsVUFBVSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2xFLE9BQU8sVUFBVSxDQUFDO09BQ25COztNQUVELE1BQU0sRUFBRSxXQUFXO1FBQ2pCLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sVUFBVSxDQUFDO09BQ25COztNQUVELE1BQU0sRUFBRSxXQUFXO1FBQ2pCLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sVUFBVSxDQUFDO09BQ25COztLQUVGLENBQUMsQ0FBQzs7O0lBR0gsSUFBSSxVQUFVLFlBQVksc0JBQXNCLEVBQUU7O01BRWhELElBQUksR0FBRyxHQUFHLElBQUksbUJBQW1CLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsUUFBUTtVQUNwRSxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQzs7TUFFL0UsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLGVBQWUsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsRUFBRSxTQUFTLE1BQU0sRUFBRTtRQUM1RSxJQUFJLEVBQUUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUIsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JCLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsV0FBVztVQUM1QyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7VUFDakQsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7VUFDM0IsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1QixDQUFBO09BQ0YsQ0FBQyxDQUFDOztNQUVILEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO01BQy9CLFVBQVUsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOztLQUU3RjtTQUNJLElBQUksVUFBVSxZQUFZLG1CQUFtQixFQUFFOztNQUVsRCxJQUFJLENBQUMsR0FBRyxTQUFTLFFBQVEsRUFBRTs7O1FBR3pCLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7OztVQUcxRSxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7VUFDcEIsT0FBTyxHQUFHO2NBQ04sR0FBRztjQUNILFVBQVUsQ0FBQyxNQUFNO2NBQ2pCLFVBQVUsQ0FBQyxRQUFRO2NBQ25CO2dCQUNFLE1BQU0sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLGtCQUFrQjtnQkFDMUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUM7ZUFDckUsQ0FBQyxDQUFDOztTQUVSOztRQUVELE9BQU8sUUFBUSxDQUFDOztPQUVqQixDQUFDOztNQUVGLFVBQVUsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO01BQ25ELFVBQVUsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztLQUVwRDtTQUNJLElBQUksVUFBVSxZQUFZLGlCQUFpQixFQUFFOztNQUVoRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsV0FBVztRQUMvQixHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7T0FDL0MsQ0FBQyxDQUFDOztNQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLEVBQUU7UUFDbkQsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO09BQ3JCLENBQUMsQ0FBQTs7S0FFSDtTQUNJLElBQUksVUFBVSxZQUFZLGtCQUFrQixFQUFFOztNQUVqRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsV0FBVztRQUMvQixHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7T0FDN0MsQ0FBQyxDQUFDOztNQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFdBQVcsRUFBRSxXQUFXO1FBQ25DLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztPQUM1QyxDQUFDLENBQUM7O01BRUgsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLFdBQVc7UUFDbEMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO09BQy9DLENBQUMsQ0FBQzs7S0FFSjtTQUNJLElBQUksVUFBVSxZQUFZLGVBQWUsRUFBRTs7TUFFOUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7TUFDMUIsVUFBVSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ3BELEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDekQsT0FBTyxDQUFDLENBQUM7T0FDVixFQUFFLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7TUFFN0IsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDOztLQUU1Qjs7SUFFRCxVQUFVLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7TUFDL0MsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsZUFBZSxJQUFJLFVBQVUsQ0FBQyxVQUFVLEVBQUUsRUFBRTtRQUM1RCxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7T0FDekM7TUFDRCxPQUFPLENBQUMsQ0FBQztLQUNWLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztHQUV6Qjs7RUFFRCxTQUFTLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUU7OztJQUd6QyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7Ozs7SUFJekIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7OztJQUd4RSxJQUFJLGFBQWEsSUFBSSxDQUFDLENBQUMsRUFBRTs7O01BR3ZCLElBQUksY0FBYztVQUNkLElBQUksQ0FBQyxzQ0FBc0MsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7OztNQUkvRCxJQUFJLGNBQWMsS0FBSyxTQUFTLEVBQUU7UUFDaEMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsc0NBQXNDLENBQUMsYUFBYSxDQUFDO1lBQ3RELGNBQWMsQ0FBQztPQUNwQjs7O01BR0QsY0FBYyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxVQUFVLENBQUM7OztNQUdqRCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7O1FBRXJDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDOzs7UUFHdEMsSUFBSSxNQUFNLENBQUM7O1FBRVgsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFOztVQUUxQixNQUFNLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7U0FFakMsTUFBTSxJQUFJLFVBQVUsQ0FBQywyQkFBMkIsQ0FBQyxFQUFFOzs7VUFHbEQsTUFBTSxHQUFHLFVBQVUsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDOztTQUVsRCxNQUFNOzs7O1VBSUwsT0FBTzs7U0FFUjs7OztRQUlELElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQzs7O1lBR3JCLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssU0FBUyxFQUFFOzs7VUFHNUQsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7O1VBR3ZELFVBQVUsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1VBQ2hDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7O1NBRTVCOztPQUVGOztLQUVGOztHQUVGOztFQUVELFNBQVMsbUJBQW1CLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTs7SUFFckMsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDOztHQUUzQzs7RUFFRCxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUU7O0lBRXhCLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFFeEQsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDOztJQUV6QyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzs7SUFFaEQsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7O0lBRTlCLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0MsS0FBSyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDM0IsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7OztJQUdwQyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO0lBQzFCLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztJQUU3QixJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQzFCLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDOztJQUVqQyxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQzdCLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDOztJQUVoQyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7O0lBRXBFLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTs7TUFFbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFTLEtBQUssRUFBRSxHQUFHLEVBQUU7UUFDcEQsZUFBZSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztPQUM5QyxDQUFDLENBQUM7O0tBRUosTUFBTTtNQUNMLGVBQWUsQ0FBQyxHQUFHLEVBQUUsMkJBQTJCLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDMUQ7O0lBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVc7OztNQUdwQyxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDL0QsR0FBRyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUM7T0FDekU7O01BRUQsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOztLQUV6QixDQUFDLENBQUM7O0lBRUgsR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QixHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QixHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztJQUV6QixJQUFJLHNCQUFzQixFQUFFOztNQUUxQixJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUM7TUFDN0QsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztNQUUxRCxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7O01BRXBDLElBQUksb0JBQW9CLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztNQUV2RSxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFO1FBQ3hFLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7T0FDekQ7O01BRUQsU0FBUyxlQUFlLEdBQUc7UUFDekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLGVBQWUsR0FBRyxPQUFPLEdBQUcsTUFBTSxDQUFDO09BQ2hFOztNQUVELGVBQWUsRUFBRSxDQUFDOzs7TUFHbEIsR0FBRyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsV0FBVztRQUNsRCxHQUFHLENBQUMsZUFBZSxHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQztRQUMzQyxlQUFlLEVBQUUsQ0FBQztPQUNuQixDQUFDLENBQUM7O0tBRUo7O0lBRUQsSUFBSSxzQkFBc0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLENBQUM7O0lBRTNFLEdBQUcsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFO01BQ3RELElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxFQUFFO1FBQ3BELGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztPQUN0QjtLQUNGLENBQUMsQ0FBQzs7SUFFSCxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsV0FBVztNQUNsQyxzQkFBc0IsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO01BQ3JGLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztNQUNyQixzQkFBc0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztNQUMvQixzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNqQyxDQUFDLENBQUM7O0lBRUgsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFdBQVc7TUFDbkMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ1osQ0FBQyxDQUFDOztJQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXO01BQ3BDLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO01BQ3BELElBQUksVUFBVSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDeEMsQ0FBQyxDQUFDOztJQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXO01BQ3BDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNkLENBQUMsQ0FBQzs7OztHQUlKOztFQUVELFNBQVMsZUFBZSxDQUFDLEdBQUcsRUFBRTs7SUFFNUIsR0FBRyxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDOztJQUVwRCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFOztNQUV2QyxLQUFLLEVBQUUsS0FBSztNQUNaLFVBQVUsRUFBRSxNQUFNO01BQ2xCLE1BQU0sRUFBRSxPQUFPO01BQ2YsTUFBTSxFQUFFLFdBQVc7TUFDbkIsUUFBUSxFQUFFLFVBQVU7OztLQUdyQixDQUFDLENBQUM7O0lBRUgsSUFBSSxPQUFPLENBQUM7O0lBRVosR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN0RCxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDOztJQUVwRCxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs7SUFFbkYsU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFOztNQUVwQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O01BRW5CLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDOztNQUVwQixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO01BQ2hELEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztNQUNwQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7O01BRXRDLE9BQU8sS0FBSyxDQUFDOztLQUVkOztJQUVELFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRTs7TUFFZixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O01BRW5CLEdBQUcsQ0FBQyxLQUFLLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7TUFDakMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO01BQ2YsT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7O01BRXBCLE9BQU8sS0FBSyxDQUFDOztLQUVkOztJQUVELFNBQVMsUUFBUSxHQUFHOztNQUVsQixHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO01BQ25ELEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztNQUN0QyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7O0tBRXpDOztHQUVGOztFQUVELFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUU7SUFDeEIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7OztJQUd0QyxJQUFJLEdBQUcsQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLFNBQVMsRUFBRTtNQUNuQyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztLQUN2QyxJQUFJLEdBQUcsQ0FBQyxhQUFhLEVBQUU7TUFDdEIsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7S0FDMUM7R0FDRjs7RUFFRCxTQUFTLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRTs7SUFFL0MsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDOzs7SUFHbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsU0FBUyxHQUFHLEVBQUUsS0FBSyxFQUFFOztNQUV4RCxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7OztNQUd0QixJQUFJLGNBQWM7VUFDZCxHQUFHLENBQUMsc0NBQXNDLENBQUMsS0FBSyxDQUFDLENBQUM7OztNQUd0RCxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxTQUFTLFVBQVUsRUFBRSxRQUFRLEVBQUU7UUFDekQsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO09BQzdGLENBQUMsQ0FBQzs7O01BR0gsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLFlBQVksQ0FBQzs7S0FFaEMsQ0FBQyxDQUFDOztJQUVILE9BQU8sUUFBUSxDQUFDOztHQUVqQjs7RUFFRCxTQUFTLGVBQWUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtJQUMvQyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLEdBQUcsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLElBQUksV0FBVyxFQUFFO01BQ2YsR0FBRyxDQUFDLGVBQWUsQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0tBQ3BFO0dBQ0Y7O0VBRUQsU0FBUyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUU7SUFDakMsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO01BQy9ELElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtRQUNsRCxHQUFHLENBQUMsZUFBZSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7T0FDM0M7S0FDRjtHQUNGOztFQUVELFNBQVMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRTtJQUN6QyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7O0lBRWpFLElBQUksUUFBUSxFQUFFO01BQ1osR0FBRyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztLQUNqQyxNQUFNO01BQ0wsR0FBRyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO0tBQzNCO0dBQ0Y7O0VBRUQsU0FBUyxjQUFjLENBQUMsZUFBZSxFQUFFOzs7SUFHdkMsSUFBSSxlQUFlLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTs7TUFFL0IscUJBQXFCLENBQUMsV0FBVztRQUMvQixjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7T0FDakMsQ0FBQyxDQUFDOztLQUVKOztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQyxFQUFFO01BQ3ZDLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUNuQixDQUFDLENBQUM7O0dBRUo7O0VBRUQsT0FBTyxHQUFHLENBQUM7O0NBRVosRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUc7QUFDaEIsZ3JCQUFnckI7QUFDaHJCLDJ2S0FBMnZLO0FBQzN2SyxHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxDQUFDLFVBQVUsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUUsc0JBQXNCLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxFQUFFOztNQUUvSixPQUFPLFNBQVMsTUFBTSxFQUFFLFFBQVEsRUFBRTs7UUFFaEMsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7UUFHcEMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7VUFDakUsT0FBTyxJQUFJLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0Q7Ozs7UUFJRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7O1VBRWpDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFOzs7WUFHbEUsT0FBTyxJQUFJLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztXQUVqRixNQUFNOztZQUVMLE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7V0FFNUY7O1NBRUY7O1FBRUQsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1VBQ2pDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDL0M7O1FBRUQsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFO1VBQ25DLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3JEOztRQUVELElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRTtVQUNsQyxPQUFPLElBQUksaUJBQWlCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ2hEOztPQUVGOztLQUVGLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0I7QUFDdkMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUI7QUFDbkMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxzQkFBc0I7QUFDdEMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLFVBQVUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUU7Ozs7Ozs7Ozs7OztFQVlyRSxJQUFJLGdCQUFnQixHQUFHLFNBQVMsTUFBTSxFQUFFLFFBQVEsRUFBRTs7SUFFaEQsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDOztJQUV6RCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7O0lBRWpCLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7O0lBRTFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDMUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMzQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUU7TUFDNUMsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLEVBQUUsRUFBRTtRQUNwQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7T0FDYjtLQUNGLENBQUMsQ0FBQzs7O0lBR0gsU0FBUyxRQUFRLEdBQUc7TUFDbEIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3JDOztJQUVELFNBQVMsTUFBTSxHQUFHO01BQ2hCLElBQUksS0FBSyxDQUFDLGdCQUFnQixFQUFFO1FBQzFCLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO09BQ3REO0tBQ0Y7O0lBRUQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOztJQUVyQixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7O0dBRTNDLENBQUM7O0VBRUYsZ0JBQWdCLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQzs7RUFFekMsTUFBTSxDQUFDLE1BQU07O01BRVQsZ0JBQWdCLENBQUMsU0FBUztNQUMxQixVQUFVLENBQUMsU0FBUzs7TUFFcEI7O1FBRUUsYUFBYSxFQUFFLFdBQVc7OztVQUd4QixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1dBQ3RDO1VBQ0QsT0FBTyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkU7O09BRUY7O0dBRUosQ0FBQzs7RUFFRixPQUFPLGdCQUFnQixDQUFDOztDQUV6QixFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVTtBQUM3QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUc7QUFDWCxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUNqQixHQUFHLENBQUMsV0FBVyxDQUFDLGtCQUFrQjtBQUNsQyxHQUFHLENBQUMsV0FBVyxDQUFDLGlCQUFpQjtBQUNqQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUNqQixHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVU7QUFDMUIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUI7QUFDakMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0I7QUFDbEMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUI7QUFDbkMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxzQkFBc0I7QUFDdEMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0I7QUFDaEMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxlQUFlLEdBQUcsQ0FBQyxVQUFVLFVBQVUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7O0VBRXRGLElBQUksZUFBZSxHQUFHLFNBQVMsTUFBTSxFQUFFLFFBQVEsRUFBRTs7SUFFL0MsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQzs7SUFFeEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOztJQUUzQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7O0lBRWpCLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7SUFFaEQsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDOztJQUUzQyxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDOztJQUV2QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxHQUFHLGtCQUFrQixDQUFDOztJQUV2RCxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO0lBQzNDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxZQUFZLENBQUM7O0lBRXhDLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7O0lBRXZDLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7O0lBRXpDLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7SUFDM0IsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFlBQVksQ0FBQzs7SUFFdkMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBRTtNQUM1QyxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUFFO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7T0FDbkI7S0FDRixDQUFDLENBQUM7O0lBRUgsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzs7SUFFdkMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsRUFBRTs7TUFFakQsR0FBRztTQUNBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO1NBQ3RCLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFO1VBQ25DLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUMzQyxDQUFDLENBQUM7O0tBRU4sQ0FBQyxDQUFDOztJQUVILElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7O0lBRWhELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUU7TUFDbkMsS0FBSyxFQUFFLE9BQU87TUFDZCxNQUFNLEVBQUUsT0FBTztNQUNmLE9BQU8sRUFBRSxLQUFLO01BQ2QsZUFBZSxFQUFFLE1BQU07TUFDdkIsU0FBUyxFQUFFLDZCQUE2QjtLQUN6QyxDQUFDLENBQUM7O0lBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRTtNQUNyQyxRQUFRLEVBQUUsVUFBVTtNQUNwQixLQUFLLEVBQUUsTUFBTTtNQUNiLE1BQU0sRUFBRSxNQUFNO01BQ2QsTUFBTSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQztNQUMxRSxTQUFTLEVBQUUsNkJBQTZCO01BQ3hDLFlBQVksRUFBRSxNQUFNO01BQ3BCLE1BQU0sRUFBRSxDQUFDO0tBQ1YsQ0FBQyxDQUFDOztJQUVILE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUU7TUFDbkMsUUFBUSxFQUFFLFVBQVU7TUFDcEIsS0FBSyxFQUFFLE1BQU07TUFDYixNQUFNLEVBQUUsS0FBSztNQUNiLFdBQVcsRUFBRSxnQkFBZ0I7TUFDN0IsTUFBTSxFQUFFLENBQUM7S0FDVixDQUFDLENBQUM7O0lBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFO01BQzNDLEtBQUssRUFBRSxPQUFPO01BQ2QsTUFBTSxFQUFFLE9BQU87TUFDZixNQUFNLEVBQUUsZ0JBQWdCO01BQ3hCLFdBQVcsRUFBRSxLQUFLO01BQ2xCLE9BQU8sRUFBRSxjQUFjO01BQ3ZCLE1BQU0sRUFBRSxTQUFTO0tBQ2xCLENBQUMsQ0FBQzs7SUFFSCxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7TUFDL0IsS0FBSyxFQUFFLE1BQU07TUFDYixNQUFNLEVBQUUsTUFBTTtNQUNkLFVBQVUsRUFBRSxNQUFNO0tBQ25CLENBQUMsQ0FBQzs7SUFFSCxjQUFjLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7O0lBRTVELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7TUFDcEMsS0FBSyxFQUFFLE1BQU07TUFDYixNQUFNLEVBQUUsT0FBTztNQUNmLE9BQU8sRUFBRSxjQUFjO01BQ3ZCLE1BQU0sRUFBRSxnQkFBZ0I7TUFDeEIsTUFBTSxFQUFFLFdBQVc7S0FDcEIsQ0FBQyxDQUFDOztJQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7O0lBRTlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7TUFDaEMsT0FBTyxFQUFFLE1BQU07O01BRWYsU0FBUyxFQUFFLFFBQVE7OztNQUduQixLQUFLLEVBQUUsTUFBTTtNQUNiLE1BQU0sRUFBRSxDQUFDO01BQ1QsVUFBVSxFQUFFLE1BQU07TUFDbEIsVUFBVSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxpQkFBaUI7S0FDeEQsQ0FBQyxDQUFDOztJQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMxRCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDOztJQUVwRCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxFQUFFO01BQ2xELElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUNSLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztNQUNwQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDdEMsQ0FBQyxDQUFDOztJQUVILFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRTtNQUNwQixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7O01BRVQsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO01BQ3JDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUN2Qzs7SUFFRCxTQUFTLFFBQVEsR0FBRztNQUNsQixHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7TUFDdkMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDOztLQUV6Qzs7SUFFRCxTQUFTLE1BQU0sR0FBRztNQUNoQixJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO01BQzlCLElBQUksQ0FBQyxLQUFLLEtBQUssRUFBRTtRQUNmLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUMxQixLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztPQUM1QyxNQUFNO1FBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO09BQ3ZDO0tBQ0Y7O0lBRUQsU0FBUyxPQUFPLEdBQUc7TUFDakIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO01BQ3RDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUN4Qzs7SUFFRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDOUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztJQUU5QyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztJQUU3QyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7O0lBRXJCLFNBQVMsS0FBSyxDQUFDLENBQUMsRUFBRTs7TUFFaEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDOztNQUVuQixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO01BQy9DLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7TUFDaEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDO01BQzVELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7O01BRTlELElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1dBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7O01BRXRCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1dBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7O01BRXRCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztNQUNwQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7O01BRXBCLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDOzs7TUFHM0MsT0FBTyxLQUFLLENBQUM7O0tBRWQ7O0lBRUQsU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFOztNQUVmLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7TUFFbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7TUFDekMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7TUFDekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQzs7TUFFOUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7V0FDWixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7TUFFdEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQzs7TUFFMUIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7O01BRTNDLE9BQU8sS0FBSyxDQUFDOztLQUVkOztHQUVGLENBQUM7O0VBRUYsZUFBZSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7O0VBRXhDLE1BQU0sQ0FBQyxNQUFNOztNQUVULGVBQWUsQ0FBQyxTQUFTO01BQ3pCLFVBQVUsQ0FBQyxTQUFTOztNQUVwQjs7UUFFRSxhQUFhLEVBQUUsV0FBVzs7VUFFeEIsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDOztVQUVuQyxJQUFJLENBQUMsS0FBSyxLQUFLLEVBQUU7O1lBRWYsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDOzs7O1lBSXJCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxTQUFTLFNBQVMsRUFBRTtjQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7a0JBQ2pDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztrQkFDcEQsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUNwRCxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNoQixPQUFPLEVBQUUsQ0FBQztlQUNYO2FBQ0YsRUFBRSxJQUFJLENBQUMsQ0FBQzs7OztZQUlULElBQUksUUFBUSxFQUFFO2NBQ1osTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQzthQUN4Qzs7V0FFRjs7VUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7O1VBRXpELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7VUFFbEIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7VUFDbEUsSUFBSSxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQzs7VUFFdkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRTtZQUNyQyxVQUFVLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJO1lBQzNDLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUk7WUFDaEQsZUFBZSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQ3ZDLE1BQU0sRUFBRSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsTUFBTSxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLEVBQUUsR0FBRztXQUNoRixDQUFDLENBQUM7O1VBRUgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFBOztVQUV6RSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7VUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztVQUVsQixjQUFjLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDOztVQUVoRixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ2hDLGVBQWUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUM3RCxLQUFLLEVBQUUsTUFBTSxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLEVBQUUsR0FBRztZQUNuRCxVQUFVLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE9BQU8sR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsS0FBSyxFQUFFLE1BQU07V0FDMUYsQ0FBQyxDQUFDOztTQUVKOztPQUVGOztHQUVKLENBQUM7O0VBRUYsSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7O0VBRW5ELFNBQVMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxNQUFNLEVBQUU7TUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksY0FBYyxHQUFHLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQztLQUN0RyxDQUFDLENBQUM7R0FDSjs7RUFFRCxTQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUU7SUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLG9JQUFvSSxDQUFBO0lBQzFKLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLGlJQUFpSSxDQUFBO0lBQ3ZKLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLDRIQUE0SCxDQUFBO0lBQ2xKLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLDZIQUE2SCxDQUFBO0lBQ25KLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLHlIQUF5SCxDQUFBO0dBQ2hKOzs7RUFHRCxPQUFPLGVBQWUsQ0FBQzs7Q0FFeEIsRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVU7QUFDN0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHO0FBQ1gsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxVQUFVLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTs7RUFFOUQsSUFBSSxLQUFLLEdBQUcsV0FBVzs7SUFFckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQzs7SUFFaEQsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLEtBQUssRUFBRTtNQUMxQixNQUFNLHFDQUFxQyxDQUFDO0tBQzdDOztJQUVELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7O0dBR3RDLENBQUM7O0VBRUYsS0FBSyxDQUFDLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzs7RUFFdkQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFOztJQUU3QixRQUFRLEVBQUUsV0FBVztNQUNuQixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN2Qjs7SUFFRCxVQUFVLEVBQUUsV0FBVztNQUNyQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM1Qzs7R0FFRixDQUFDLENBQUM7O0VBRUgsa0JBQWtCLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDNUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDNUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0VBRTVDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDekMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUN6QyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDOztFQUV6QyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFOztJQUUxQyxHQUFHLEVBQUUsV0FBVztNQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDdkI7O0lBRUQsR0FBRyxFQUFFLFNBQVMsQ0FBQyxFQUFFO01BQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3BCOztHQUVGLENBQUMsQ0FBQzs7RUFFSCxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFOztJQUU1QyxHQUFHLEVBQUUsV0FBVzs7TUFFZCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztPQUM1RDs7TUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDOztLQUV6Qjs7SUFFRCxHQUFHLEVBQUUsU0FBUyxDQUFDLEVBQUU7O01BRWYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO01BQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQzs7S0FFdEI7O0dBRUYsQ0FBQyxDQUFDOztFQUVILFNBQVMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRTs7SUFFaEUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFOztNQUV2QyxHQUFHLEVBQUUsV0FBVzs7UUFFZCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtVQUNoQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDaEM7O1FBRUQsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsaUJBQWlCLENBQUMsQ0FBQzs7UUFFbkQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztPQUVoQzs7TUFFRCxHQUFHLEVBQUUsU0FBUyxDQUFDLEVBQUU7O1FBRWYsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7VUFDaEMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztVQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDNUI7O1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7O09BRTdCOztLQUVGLENBQUMsQ0FBQzs7R0FFSjs7RUFFRCxTQUFTLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUU7O0lBRTdDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRTs7TUFFdkMsR0FBRyxFQUFFLFdBQVc7O1FBRWQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxLQUFLO1VBQzlCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7UUFFakMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUVyQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7O09BRWhDOztNQUVELEdBQUcsRUFBRSxTQUFTLENBQUMsRUFBRTs7UUFFZixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtVQUNoQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7VUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQzVCOztRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztPQUU3Qjs7S0FFRixDQUFDLENBQUM7O0dBRUo7O0VBRUQsU0FBUyxjQUFjLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRTs7SUFFM0QsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7O01BRWpDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7O0tBRTFGLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7O01BRXhDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7S0FFbEcsTUFBTTs7TUFFTCxNQUFNLHVCQUF1QixDQUFDOztLQUUvQjs7R0FFRjs7RUFFRCxTQUFTLGNBQWMsQ0FBQyxLQUFLLEVBQUU7O0lBRTdCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7SUFFeEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTztRQUN2QjtVQUNFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztVQUNYLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNaO0tBQ0osQ0FBQzs7SUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7TUFDM0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUM1QixNQUFNLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO01BQzlDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNyQjs7R0FFRjs7RUFFRCxPQUFPLEtBQUssQ0FBQzs7Q0FFZCxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUztBQUN0QixHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLFlBQVk7O0VBRTVCLElBQUksWUFBWSxDQUFDOztFQUVqQixPQUFPOztJQUVMLFVBQVUsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFOztNQUU1QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7O01BRWhDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7TUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztNQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDcEMsSUFBSSxDQUFDLEdBQUc7UUFDTixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7T0FDVixDQUFDLEVBQUUsQ0FBQyxDQUFDOztNQUVOLE9BQU87UUFDTCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUc7UUFDYixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUc7UUFDYixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUc7T0FDZCxDQUFDOztLQUVIOztJQUVELFVBQVUsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFOztNQUU1QixJ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
