(function () {
  'use strict';

  var create_1 = create;

  /**
   * Creates a new, empty vec4
   *
   * @returns {vec4} a new 4D vector
   */
  function create () {
    var out = new Float32Array(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out
  }

  var clone_1 = clone;

  /**
   * Creates a new vec4 initialized with values from an existing vector
   *
   * @param {vec4} a vector to clone
   * @returns {vec4} a new 4D vector
   */
  function clone (a) {
    var out = new Float32Array(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out
  }

  var fromValues_1 = fromValues;

  /**
   * Creates a new vec4 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {vec4} a new 4D vector
   */
  function fromValues (x, y, z, w) {
    var out = new Float32Array(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out
  }

  var copy_1 = copy;

  /**
   * Copy the values from one vec4 to another
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the source vector
   * @returns {vec4} out
   */
  function copy (out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out
  }

  var set_1 = set;

  /**
   * Set the components of a vec4 to the given values
   *
   * @param {vec4} out the receiving vector
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {vec4} out
   */
  function set (out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out
  }

  var add_1 = add;

  /**
   * Adds two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */
  function add (out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out
  }

  var subtract_1 = subtract;

  /**
   * Subtracts vector b from vector a
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */
  function subtract (out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out
  }

  var multiply_1 = multiply;

  /**
   * Multiplies two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */
  function multiply (out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out
  }

  var divide_1 = divide;

  /**
   * Divides two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */
  function divide (out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out
  }

  var min_1 = min;

  /**
   * Returns the minimum of two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */
  function min (out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out
  }

  var max_1 = max;

  /**
   * Returns the maximum of two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */
  function max (out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out
  }

  var scale_1 = scale;

  /**
   * Scales a vec4 by a scalar number
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {vec4} out
   */
  function scale (out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out
  }

  var scaleAndAdd_1 = scaleAndAdd;

  /**
   * Adds two vec4's after scaling the second operand by a scalar value
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @param {Number} scale the amount to scale b by before adding
   * @returns {vec4} out
   */
  function scaleAndAdd (out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out
  }

  var distance_1 = distance;

  /**
   * Calculates the euclidian distance between two vec4's
   *
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {Number} distance between a and b
   */
  function distance (a, b) {
    var x = b[0] - a[0],
      y = b[1] - a[1],
      z = b[2] - a[2],
      w = b[3] - a[3];
    return Math.sqrt(x * x + y * y + z * z + w * w)
  }

  var squaredDistance_1 = squaredDistance;

  /**
   * Calculates the squared euclidian distance between two vec4's
   *
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {Number} squared distance between a and b
   */
  function squaredDistance (a, b) {
    var x = b[0] - a[0],
      y = b[1] - a[1],
      z = b[2] - a[2],
      w = b[3] - a[3];
    return x * x + y * y + z * z + w * w
  }

  var length_1 = length;

  /**
   * Calculates the length of a vec4
   *
   * @param {vec4} a vector to calculate length of
   * @returns {Number} length of a
   */
  function length (a) {
    var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
    return Math.sqrt(x * x + y * y + z * z + w * w)
  }

  var squaredLength_1 = squaredLength;

  /**
   * Calculates the squared length of a vec4
   *
   * @param {vec4} a vector to calculate squared length of
   * @returns {Number} squared length of a
   */
  function squaredLength (a) {
    var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
    return x * x + y * y + z * z + w * w
  }

  var negate_1 = negate;

  /**
   * Negates the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to negate
   * @returns {vec4} out
   */
  function negate (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out
  }

  var inverse_1 = inverse;

  /**
   * Returns the inverse of the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to invert
   * @returns {vec4} out
   */
  function inverse (out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    out[2] = 1.0 / a[2];
    out[3] = 1.0 / a[3];
    return out
  }

  var normalize_1 = normalize;

  /**
   * Normalize a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to normalize
   * @returns {vec4} out
   */
  function normalize (out, a) {
    var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
    var len = x * x + y * y + z * z + w * w;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
      out[0] = x * len;
      out[1] = y * len;
      out[2] = z * len;
      out[3] = w * len;
    }
    return out
  }

  var dot_1 = dot;

  /**
   * Calculates the dot product of two vec4's
   *
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {Number} dot product of a and b
   */
  function dot (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
  }

  var lerp_1 = lerp;

  /**
   * Performs a linear interpolation between two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @param {Number} t interpolation amount between the two inputs
   * @returns {vec4} out
   */
  function lerp (out, a, b, t) {
    var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out
  }

  var random_1 = random;

  /**
   * Generates a random vector with the given scale
   *
   * @param {vec4} out the receiving vector
   * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
   * @returns {vec4} out
   */
  function random (out, scale) {
    scale = scale || 1.0;

    // TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = Math.random();
    out[1] = Math.random();
    out[2] = Math.random();
    out[3] = Math.random();
    normalize_1(out, out);
    scale_1(out, out, scale);
    return out
  }

  var transformMat4_1 = transformMat4;

  /**
   * Transforms the vec4 with a mat4.
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the vector to transform
   * @param {mat4} m matrix to transform with
   * @returns {vec4} out
   */
  function transformMat4 (out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out
  }

  var transformQuat_1 = transformQuat;

  /**
   * Transforms the vec4 with a quat
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the vector to transform
   * @param {quat} q quaternion to transform with
   * @returns {vec4} out
   */
  function transformQuat (out, a, q) {
    var x = a[0], y = a[1], z = a[2],
      qx = q[0], qy = q[1], qz = q[2], qw = q[3],

      // calculate quat * vec
      ix = qw * x + qy * z - qz * y,
      iy = qw * y + qz * x - qx * z,
      iz = qw * z + qx * y - qy * x,
      iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    out[3] = a[3];
    return out
  }

  var glVec4 = {
    create: create_1,
    clone: clone_1,
    fromValues: fromValues_1,
    copy: copy_1,
    set: set_1,
    add: add_1,
    subtract: subtract_1,
    multiply: multiply_1,
    divide: divide_1,
    min: min_1,
    max: max_1,
    scale: scale_1,
    scaleAndAdd: scaleAndAdd_1,
    distance: distance_1,
    squaredDistance: squaredDistance_1,
    length: length_1,
    squaredLength: squaredLength_1,
    negate: negate_1,
    inverse: inverse_1,
    normalize: normalize_1,
    dot: dot_1,
    lerp: lerp_1,
    random: random_1,
    transformMat4: transformMat4_1,
    transformQuat: transformQuat_1
  };

  function createSpring (stiffness, dampening, value, precision) {
    precision = precision ? precision * precision : Number.EPSILON;
    const isInputArray = Array.isArray(value);
    const vecComponents = isInputArray ? value.length : Number.isFinite(value) ? 1 : null;

    if (!Number.isFinite(stiffness) || !Number.isFinite(dampening)) {
      throw new Error(`spring-animator: expected numbers for stiffness and dampening. (e.g. createSpring(0.003, 0.1, startingValue))`)
    }

    if (!vecComponents || vecComponents > 4) {
      throw new Error(`spring-animator: expected value \`${value}\` to be a scalar, vec2, vec3, or vec4`)
    }

    function makeValueVec4 (out = [], v) {
      if (isInputArray !== Array.isArray(v) || (isInputArray && vecComponents !== v.length)) {
        throw new Error(`spring-animator: destination value type must match initial value type: ${!isInputArray ? 'scalar' : vecComponents + '-component vector'}`)
      }
      if (Number.isFinite(v)) {
        out[0] = v;
        out[1] = out[2] = out[3] = 0;
        return out
      }
      glVec4.copy(out, v);
      while (out.length < 4) out.push(0);
      return out
    }

    value = makeValueVec4([], value);
    let lastValue = glVec4.copy([], value);
    let destinationValue = glVec4.copy([], value);

    // set up some reusable arrays to use in tick()
    let nextValue = [];
    let velocity = [];
    let delta = [];
    let spring = [];
    let damper = [];
    let acceleration = [];

    return {
      setDestination,
      getCurrentValue,
      isAtDestination,
      tick
    }

    function setDestination (newValue, shouldAnimate = true) {
      makeValueVec4(destinationValue, newValue);
      if (!shouldAnimate) {
        glVec4.copy(value, destinationValue);
        glVec4.copy(lastValue, destinationValue);
      }
    }

    function isAtDestination (threshold) {
      // square this so we don't need to use Math.sqrt
      threshold = threshold ? threshold * threshold : precision;
      return (
        glVec4.squaredDistance(value, destinationValue) <= threshold &&
        glVec4.squaredDistance(value, lastValue) <= threshold
      )
    }

    function getCurrentValue (out = []) {
      if (!isInputArray) return value[0]
      for (let i = 0; i < vecComponents; i++) {
        out[i] = value[i];
      }
      return out
    }

    function tick (s = stiffness, d = dampening) {
      glVec4.subtract(velocity, value, lastValue);
      glVec4.subtract(delta, destinationValue, value);
      glVec4.scale(spring, delta, s);
      glVec4.scale(damper, velocity, -d);
      glVec4.add(acceleration, spring, damper);
      glVec4.add(velocity, velocity, acceleration);
      glVec4.add(nextValue, velocity, value);
      glVec4.copy(lastValue, value);
      glVec4.copy(value, nextValue);
      if (isAtDestination()) {
        glVec4.copy(value, destinationValue);
        glVec4.copy(lastValue, destinationValue);
      }
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
          if (elem.className === undefined) ; else if (elem.className === className) {
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

  var datGui = dat_gui;
  var color = dat_color;
  var datGui_1 = datGui.GUI;
  datGui.color = color;

  /* global requestAnimationFrame */

  const MAX_RADIUS = 100;
  const MIN_RADIUS = 5;
  const LAST_VALUES_TRAIL_LENGTH = 500;

  const settings = {
    stiffness: 0.003,
    dampening: 0.1
  };

  const gui = new datGui_1();
  gui.add(settings, 'stiffness', 0.001, 0.08).step(0.001);
  gui.add(settings, 'dampening', 0.01, 0.5).step(0.01);
  gui.add({ clear: setupSprings }, 'clear');

  const canvas = document.querySelector('canvas');
  const ctx = setupCanvasAndGetContext(canvas);

  canvas.addEventListener('click', (e) => {
    if (
      circle.positionSpring.isAtDestination(0.2) &&
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
      positionSpring: createSpring(stiffness, dampening, center)
    };
  }

  function setPositionAndRadius (position) {
    const newRadius = (MAX_RADIUS - MIN_RADIUS) * Math.random() + MIN_RADIUS;
    circle.radiusSpring.setDestination(newRadius);
    circle.positionSpring.setDestination(position);
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
    circle.positionSpring.tick(settings.stiffness, settings.dampening);
    circle.radiusSpring.tick(settings.stiffness, settings.dampening);
    const position = circle.positionSpring.getCurrentValue();
    const radius = circle.radiusSpring.getCurrentValue();
    lastValues = lastValues.slice(Math.max(0, lastValues.length - LAST_VALUES_TRAIL_LENGTH));
    lastValues.forEach(([pos, rad]) => drawCircle(ctx, pos, rad, 'transparent', 'rgba(94, 126, 178, 0.4)'));
    drawCircle(ctx, position, radius, 'rgb(94, 126, 178)', 'rgba(255, 255, 255, 0.8)');
    lastValues.push([position, radius]);
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

  function clearRect (ctx, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fill();
  }

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9jcmVhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9jbG9uZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L2Zyb21WYWx1ZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9jb3B5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvc2V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvYWRkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvc3VidHJhY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9tdWx0aXBseS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L2RpdmlkZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L21pbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L21heC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L3NjYWxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvc2NhbGVBbmRBZGQuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9kaXN0YW5jZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L3NxdWFyZWREaXN0YW5jZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L2xlbmd0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L3NxdWFyZWRMZW5ndGguanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9uZWdhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9pbnZlcnNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvbm9ybWFsaXplLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvZG90LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvbGVycC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L3JhbmRvbS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L3RyYW5zZm9ybU1hdDQuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC90cmFuc2Zvcm1RdWF0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvaW5kZXguanMiLCIuLi9zcmMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0LWd1aS92ZW5kb3IvZGF0Lmd1aS5qcyIsIi4uL25vZGVfbW9kdWxlcy9kYXQtZ3VpL3ZlbmRvci9kYXQuY29sb3IuanMiLCIuLi9ub2RlX21vZHVsZXMvZGF0LWd1aS9pbmRleC5qcyIsImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gY3JlYXRlXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldywgZW1wdHkgdmVjNFxuICpcbiAqIEByZXR1cm5zIHt2ZWM0fSBhIG5ldyA0RCB2ZWN0b3JcbiAqL1xuZnVuY3Rpb24gY3JlYXRlICgpIHtcbiAgdmFyIG91dCA9IG5ldyBGbG9hdDMyQXJyYXkoNClcbiAgb3V0WzBdID0gMFxuICBvdXRbMV0gPSAwXG4gIG91dFsyXSA9IDBcbiAgb3V0WzNdID0gMFxuICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGNsb25lXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWM0IGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgdmVjdG9yXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBhIHZlY3RvciB0byBjbG9uZVxuICogQHJldHVybnMge3ZlYzR9IGEgbmV3IDREIHZlY3RvclxuICovXG5mdW5jdGlvbiBjbG9uZSAoYSkge1xuICB2YXIgb3V0ID0gbmV3IEZsb2F0MzJBcnJheSg0KVxuICBvdXRbMF0gPSBhWzBdXG4gIG91dFsxXSA9IGFbMV1cbiAgb3V0WzJdID0gYVsyXVxuICBvdXRbM10gPSBhWzNdXG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnJvbVZhbHVlc1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjNCBpbml0aWFsaXplZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0gdyBXIGNvbXBvbmVudFxuICogQHJldHVybnMge3ZlYzR9IGEgbmV3IDREIHZlY3RvclxuICovXG5mdW5jdGlvbiBmcm9tVmFsdWVzICh4LCB5LCB6LCB3KSB7XG4gIHZhciBvdXQgPSBuZXcgRmxvYXQzMkFycmF5KDQpXG4gIG91dFswXSA9IHhcbiAgb3V0WzFdID0geVxuICBvdXRbMl0gPSB6XG4gIG91dFszXSA9IHdcbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBjb3B5XG5cbi8qKlxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIHZlYzQgdG8gYW5vdGhlclxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIHNvdXJjZSB2ZWN0b3JcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuZnVuY3Rpb24gY29weSAob3V0LCBhKSB7XG4gIG91dFswXSA9IGFbMF1cbiAgb3V0WzFdID0gYVsxXVxuICBvdXRbMl0gPSBhWzJdXG4gIG91dFszXSA9IGFbM11cbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBzZXRcblxuLyoqXG4gKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0IHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHcgVyBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuZnVuY3Rpb24gc2V0IChvdXQsIHgsIHksIHosIHcpIHtcbiAgb3V0WzBdID0geFxuICBvdXRbMV0gPSB5XG4gIG91dFsyXSA9IHpcbiAgb3V0WzNdID0gd1xuICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGFkZFxuXG4vKipcbiAqIEFkZHMgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuZnVuY3Rpb24gYWRkIChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSArIGJbMF1cbiAgb3V0WzFdID0gYVsxXSArIGJbMV1cbiAgb3V0WzJdID0gYVsyXSArIGJbMl1cbiAgb3V0WzNdID0gYVszXSArIGJbM11cbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBzdWJ0cmFjdFxuXG4vKipcbiAqIFN1YnRyYWN0cyB2ZWN0b3IgYiBmcm9tIHZlY3RvciBhXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiBzdWJ0cmFjdCAob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gLSBiWzBdXG4gIG91dFsxXSA9IGFbMV0gLSBiWzFdXG4gIG91dFsyXSA9IGFbMl0gLSBiWzJdXG4gIG91dFszXSA9IGFbM10gLSBiWzNdXG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gbXVsdGlwbHlcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbmZ1bmN0aW9uIG11bHRpcGx5IChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAqIGJbMF1cbiAgb3V0WzFdID0gYVsxXSAqIGJbMV1cbiAgb3V0WzJdID0gYVsyXSAqIGJbMl1cbiAgb3V0WzNdID0gYVszXSAqIGJbM11cbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBkaXZpZGVcblxuLyoqXG4gKiBEaXZpZGVzIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbmZ1bmN0aW9uIGRpdmlkZSAob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gLyBiWzBdXG4gIG91dFsxXSA9IGFbMV0gLyBiWzFdXG4gIG91dFsyXSA9IGFbMl0gLyBiWzJdXG4gIG91dFszXSA9IGFbM10gLyBiWzNdXG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gbWluXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWluaW11bSBvZiB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiBtaW4gKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBNYXRoLm1pbihhWzBdLCBiWzBdKVxuICBvdXRbMV0gPSBNYXRoLm1pbihhWzFdLCBiWzFdKVxuICBvdXRbMl0gPSBNYXRoLm1pbihhWzJdLCBiWzJdKVxuICBvdXRbM10gPSBNYXRoLm1pbihhWzNdLCBiWzNdKVxuICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IG1heFxuXG4vKipcbiAqIFJldHVybnMgdGhlIG1heGltdW0gb2YgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuZnVuY3Rpb24gbWF4IChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gTWF0aC5tYXgoYVswXSwgYlswXSlcbiAgb3V0WzFdID0gTWF0aC5tYXgoYVsxXSwgYlsxXSlcbiAgb3V0WzJdID0gTWF0aC5tYXgoYVsyXSwgYlsyXSlcbiAgb3V0WzNdID0gTWF0aC5tYXgoYVszXSwgYlszXSlcbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBzY2FsZVxuXG4vKipcbiAqIFNjYWxlcyBhIHZlYzQgYnkgYSBzY2FsYXIgbnVtYmVyXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHZlY3RvciBieVxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiBzY2FsZSAob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKiBiXG4gIG91dFsxXSA9IGFbMV0gKiBiXG4gIG91dFsyXSA9IGFbMl0gKiBiXG4gIG91dFszXSA9IGFbM10gKiBiXG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gc2NhbGVBbmRBZGRcblxuLyoqXG4gKiBBZGRzIHR3byB2ZWM0J3MgYWZ0ZXIgc2NhbGluZyB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgdGhlIGFtb3VudCB0byBzY2FsZSBiIGJ5IGJlZm9yZSBhZGRpbmdcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuZnVuY3Rpb24gc2NhbGVBbmRBZGQgKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgb3V0WzBdID0gYVswXSArIChiWzBdICogc2NhbGUpXG4gIG91dFsxXSA9IGFbMV0gKyAoYlsxXSAqIHNjYWxlKVxuICBvdXRbMl0gPSBhWzJdICsgKGJbMl0gKiBzY2FsZSlcbiAgb3V0WzNdID0gYVszXSArIChiWzNdICogc2NhbGUpXG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZGlzdGFuY2VcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xuZnVuY3Rpb24gZGlzdGFuY2UgKGEsIGIpIHtcbiAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICB5ID0gYlsxXSAtIGFbMV0sXG4gICAgeiA9IGJbMl0gLSBhWzJdLFxuICAgIHcgPSBiWzNdIC0gYVszXVxuICByZXR1cm4gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkgKyB6ICogeiArIHcgKiB3KVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBzcXVhcmVkRGlzdGFuY2VcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cbmZ1bmN0aW9uIHNxdWFyZWREaXN0YW5jZSAoYSwgYikge1xuICB2YXIgeCA9IGJbMF0gLSBhWzBdLFxuICAgIHkgPSBiWzFdIC0gYVsxXSxcbiAgICB6ID0gYlsyXSAtIGFbMl0sXG4gICAgdyA9IGJbM10gLSBhWzNdXG4gIHJldHVybiB4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogd1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBsZW5ndGhcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxuICovXG5mdW5jdGlvbiBsZW5ndGggKGEpIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgIHkgPSBhWzFdLFxuICAgIHogPSBhWzJdLFxuICAgIHcgPSBhWzNdXG4gIHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHcpXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHNxdWFyZWRMZW5ndGhcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBzcXVhcmVkIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBsZW5ndGggb2YgYVxuICovXG5mdW5jdGlvbiBzcXVhcmVkTGVuZ3RoIChhKSB7XG4gIHZhciB4ID0gYVswXSxcbiAgICB5ID0gYVsxXSxcbiAgICB6ID0gYVsyXSxcbiAgICB3ID0gYVszXVxuICByZXR1cm4geCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHdcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gbmVnYXRlXG5cbi8qKlxuICogTmVnYXRlcyB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHZlY3RvciB0byBuZWdhdGVcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuZnVuY3Rpb24gbmVnYXRlIChvdXQsIGEpIHtcbiAgb3V0WzBdID0gLWFbMF1cbiAgb3V0WzFdID0gLWFbMV1cbiAgb3V0WzJdID0gLWFbMl1cbiAgb3V0WzNdID0gLWFbM11cbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBpbnZlcnNlXG5cbi8qKlxuICogUmV0dXJucyB0aGUgaW52ZXJzZSBvZiB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHZlY3RvciB0byBpbnZlcnRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuZnVuY3Rpb24gaW52ZXJzZSAob3V0LCBhKSB7XG4gIG91dFswXSA9IDEuMCAvIGFbMF1cbiAgb3V0WzFdID0gMS4wIC8gYVsxXVxuICBvdXRbMl0gPSAxLjAgLyBhWzJdXG4gIG91dFszXSA9IDEuMCAvIGFbM11cbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBub3JtYWxpemVcblxuLyoqXG4gKiBOb3JtYWxpemUgYSB2ZWM0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB2ZWN0b3IgdG8gbm9ybWFsaXplXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZSAob3V0LCBhKSB7XG4gIHZhciB4ID0gYVswXSxcbiAgICB5ID0gYVsxXSxcbiAgICB6ID0gYVsyXSxcbiAgICB3ID0gYVszXVxuICB2YXIgbGVuID0geCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHdcbiAgaWYgKGxlbiA+IDApIHtcbiAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbilcbiAgICBvdXRbMF0gPSB4ICogbGVuXG4gICAgb3V0WzFdID0geSAqIGxlblxuICAgIG91dFsyXSA9IHogKiBsZW5cbiAgICBvdXRbM10gPSB3ICogbGVuXG4gIH1cbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBkb3RcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkb3QgcHJvZHVjdCBvZiBhIGFuZCBiXG4gKi9cbmZ1bmN0aW9uIGRvdCAoYSwgYikge1xuICByZXR1cm4gYVswXSAqIGJbMF0gKyBhWzFdICogYlsxXSArIGFbMl0gKiBiWzJdICsgYVszXSAqIGJbM11cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gbGVycFxuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiBsZXJwIChvdXQsIGEsIGIsIHQpIHtcbiAgdmFyIGF4ID0gYVswXSxcbiAgICBheSA9IGFbMV0sXG4gICAgYXogPSBhWzJdLFxuICAgIGF3ID0gYVszXVxuICBvdXRbMF0gPSBheCArIHQgKiAoYlswXSAtIGF4KVxuICBvdXRbMV0gPSBheSArIHQgKiAoYlsxXSAtIGF5KVxuICBvdXRbMl0gPSBheiArIHQgKiAoYlsyXSAtIGF6KVxuICBvdXRbM10gPSBhdyArIHQgKiAoYlszXSAtIGF3KVxuICByZXR1cm4gb3V0XG59XG4iLCJ2YXIgdmVjTm9ybWFsaXplID0gcmVxdWlyZSgnLi9ub3JtYWxpemUnKVxudmFyIHZlY1NjYWxlID0gcmVxdWlyZSgnLi9zY2FsZScpXG5cbm1vZHVsZS5leHBvcnRzID0gcmFuZG9tXG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcmFuZG9tIHZlY3RvciB3aXRoIHRoZSBnaXZlbiBzY2FsZVxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0gW3NjYWxlXSBMZW5ndGggb2YgdGhlIHJlc3VsdGluZyB2ZWN0b3IuIElmIG9tbWl0dGVkLCBhIHVuaXQgdmVjdG9yIHdpbGwgYmUgcmV0dXJuZWRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuZnVuY3Rpb24gcmFuZG9tIChvdXQsIHNjYWxlKSB7XG4gIHNjYWxlID0gc2NhbGUgfHwgMS4wXG5cbiAgLy8gVE9ETzogVGhpcyBpcyBhIHByZXR0eSBhd2Z1bCB3YXkgb2YgZG9pbmcgdGhpcy4gRmluZCBzb21ldGhpbmcgYmV0dGVyLlxuICBvdXRbMF0gPSBNYXRoLnJhbmRvbSgpXG4gIG91dFsxXSA9IE1hdGgucmFuZG9tKClcbiAgb3V0WzJdID0gTWF0aC5yYW5kb20oKVxuICBvdXRbM10gPSBNYXRoLnJhbmRvbSgpXG4gIHZlY05vcm1hbGl6ZShvdXQsIG91dClcbiAgdmVjU2NhbGUob3V0LCBvdXQsIHNjYWxlKVxuICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHRyYW5zZm9ybU1hdDRcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWM0IHdpdGggYSBtYXQ0LlxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0NH0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuZnVuY3Rpb24gdHJhbnNmb3JtTWF0NCAob3V0LCBhLCBtKSB7XG4gIHZhciB4ID0gYVswXSwgeSA9IGFbMV0sIHogPSBhWzJdLCB3ID0gYVszXVxuICBvdXRbMF0gPSBtWzBdICogeCArIG1bNF0gKiB5ICsgbVs4XSAqIHogKyBtWzEyXSAqIHdcbiAgb3V0WzFdID0gbVsxXSAqIHggKyBtWzVdICogeSArIG1bOV0gKiB6ICsgbVsxM10gKiB3XG4gIG91dFsyXSA9IG1bMl0gKiB4ICsgbVs2XSAqIHkgKyBtWzEwXSAqIHogKyBtWzE0XSAqIHdcbiAgb3V0WzNdID0gbVszXSAqIHggKyBtWzddICogeSArIG1bMTFdICogeiArIG1bMTVdICogd1xuICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHRyYW5zZm9ybVF1YXRcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWM0IHdpdGggYSBxdWF0XG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHtxdWF0fSBxIHF1YXRlcm5pb24gdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuZnVuY3Rpb24gdHJhbnNmb3JtUXVhdCAob3V0LCBhLCBxKSB7XG4gIHZhciB4ID0gYVswXSwgeSA9IGFbMV0sIHogPSBhWzJdLFxuICAgIHF4ID0gcVswXSwgcXkgPSBxWzFdLCBxeiA9IHFbMl0sIHF3ID0gcVszXSxcblxuICAgIC8vIGNhbGN1bGF0ZSBxdWF0ICogdmVjXG4gICAgaXggPSBxdyAqIHggKyBxeSAqIHogLSBxeiAqIHksXG4gICAgaXkgPSBxdyAqIHkgKyBxeiAqIHggLSBxeCAqIHosXG4gICAgaXogPSBxdyAqIHogKyBxeCAqIHkgLSBxeSAqIHgsXG4gICAgaXcgPSAtcXggKiB4IC0gcXkgKiB5IC0gcXogKiB6XG5cbiAgLy8gY2FsY3VsYXRlIHJlc3VsdCAqIGludmVyc2UgcXVhdFxuICBvdXRbMF0gPSBpeCAqIHF3ICsgaXcgKiAtcXggKyBpeSAqIC1xeiAtIGl6ICogLXF5XG4gIG91dFsxXSA9IGl5ICogcXcgKyBpdyAqIC1xeSArIGl6ICogLXF4IC0gaXggKiAtcXpcbiAgb3V0WzJdID0gaXogKiBxdyArIGl3ICogLXF6ICsgaXggKiAtcXkgLSBpeSAqIC1xeFxuICBvdXRbM10gPSBhWzNdXG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGU6IHJlcXVpcmUoJy4vY3JlYXRlJyksXG4gIGNsb25lOiByZXF1aXJlKCcuL2Nsb25lJyksXG4gIGZyb21WYWx1ZXM6IHJlcXVpcmUoJy4vZnJvbVZhbHVlcycpLFxuICBjb3B5OiByZXF1aXJlKCcuL2NvcHknKSxcbiAgc2V0OiByZXF1aXJlKCcuL3NldCcpLFxuICBhZGQ6IHJlcXVpcmUoJy4vYWRkJyksXG4gIHN1YnRyYWN0OiByZXF1aXJlKCcuL3N1YnRyYWN0JyksXG4gIG11bHRpcGx5OiByZXF1aXJlKCcuL211bHRpcGx5JyksXG4gIGRpdmlkZTogcmVxdWlyZSgnLi9kaXZpZGUnKSxcbiAgbWluOiByZXF1aXJlKCcuL21pbicpLFxuICBtYXg6IHJlcXVpcmUoJy4vbWF4JyksXG4gIHNjYWxlOiByZXF1aXJlKCcuL3NjYWxlJyksXG4gIHNjYWxlQW5kQWRkOiByZXF1aXJlKCcuL3NjYWxlQW5kQWRkJyksXG4gIGRpc3RhbmNlOiByZXF1aXJlKCcuL2Rpc3RhbmNlJyksXG4gIHNxdWFyZWREaXN0YW5jZTogcmVxdWlyZSgnLi9zcXVhcmVkRGlzdGFuY2UnKSxcbiAgbGVuZ3RoOiByZXF1aXJlKCcuL2xlbmd0aCcpLFxuICBzcXVhcmVkTGVuZ3RoOiByZXF1aXJlKCcuL3NxdWFyZWRMZW5ndGgnKSxcbiAgbmVnYXRlOiByZXF1aXJlKCcuL25lZ2F0ZScpLFxuICBpbnZlcnNlOiByZXF1aXJlKCcuL2ludmVyc2UnKSxcbiAgbm9ybWFsaXplOiByZXF1aXJlKCcuL25vcm1hbGl6ZScpLFxuICBkb3Q6IHJlcXVpcmUoJy4vZG90JyksXG4gIGxlcnA6IHJlcXVpcmUoJy4vbGVycCcpLFxuICByYW5kb206IHJlcXVpcmUoJy4vcmFuZG9tJyksXG4gIHRyYW5zZm9ybU1hdDQ6IHJlcXVpcmUoJy4vdHJhbnNmb3JtTWF0NCcpLFxuICB0cmFuc2Zvcm1RdWF0OiByZXF1aXJlKCcuL3RyYW5zZm9ybVF1YXQnKVxufVxuIiwiaW1wb3J0IHZlYzQgZnJvbSAnZ2wtdmVjNCdcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNwcmluZyAoc3RpZmZuZXNzLCBkYW1wZW5pbmcsIHZhbHVlLCBwcmVjaXNpb24pIHtcbiAgcHJlY2lzaW9uID0gcHJlY2lzaW9uID8gcHJlY2lzaW9uICogcHJlY2lzaW9uIDogTnVtYmVyLkVQU0lMT05cbiAgY29uc3QgaXNJbnB1dEFycmF5ID0gQXJyYXkuaXNBcnJheSh2YWx1ZSlcbiAgY29uc3QgdmVjQ29tcG9uZW50cyA9IGlzSW5wdXRBcnJheSA/IHZhbHVlLmxlbmd0aCA6IE51bWJlci5pc0Zpbml0ZSh2YWx1ZSkgPyAxIDogbnVsbFxuXG4gIGlmICghTnVtYmVyLmlzRmluaXRlKHN0aWZmbmVzcykgfHwgIU51bWJlci5pc0Zpbml0ZShkYW1wZW5pbmcpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBzcHJpbmctYW5pbWF0b3I6IGV4cGVjdGVkIG51bWJlcnMgZm9yIHN0aWZmbmVzcyBhbmQgZGFtcGVuaW5nLiAoZS5nLiBjcmVhdGVTcHJpbmcoMC4wMDMsIDAuMSwgc3RhcnRpbmdWYWx1ZSkpYClcbiAgfVxuXG4gIGlmICghdmVjQ29tcG9uZW50cyB8fCB2ZWNDb21wb25lbnRzID4gNCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgc3ByaW5nLWFuaW1hdG9yOiBleHBlY3RlZCB2YWx1ZSBcXGAke3ZhbHVlfVxcYCB0byBiZSBhIHNjYWxhciwgdmVjMiwgdmVjMywgb3IgdmVjNGApXG4gIH1cblxuICBmdW5jdGlvbiBtYWtlVmFsdWVWZWM0IChvdXQgPSBbXSwgdikge1xuICAgIGlmIChpc0lucHV0QXJyYXkgIT09IEFycmF5LmlzQXJyYXkodikgfHwgKGlzSW5wdXRBcnJheSAmJiB2ZWNDb21wb25lbnRzICE9PSB2Lmxlbmd0aCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgc3ByaW5nLWFuaW1hdG9yOiBkZXN0aW5hdGlvbiB2YWx1ZSB0eXBlIG11c3QgbWF0Y2ggaW5pdGlhbCB2YWx1ZSB0eXBlOiAkeyFpc0lucHV0QXJyYXkgPyAnc2NhbGFyJyA6IHZlY0NvbXBvbmVudHMgKyAnLWNvbXBvbmVudCB2ZWN0b3InfWApXG4gICAgfVxuICAgIGlmIChOdW1iZXIuaXNGaW5pdGUodikpIHtcbiAgICAgIG91dFswXSA9IHZcbiAgICAgIG91dFsxXSA9IG91dFsyXSA9IG91dFszXSA9IDBcbiAgICAgIHJldHVybiBvdXRcbiAgICB9XG4gICAgdmVjNC5jb3B5KG91dCwgdilcbiAgICB3aGlsZSAob3V0Lmxlbmd0aCA8IDQpIG91dC5wdXNoKDApXG4gICAgcmV0dXJuIG91dFxuICB9XG5cbiAgdmFsdWUgPSBtYWtlVmFsdWVWZWM0KFtdLCB2YWx1ZSlcbiAgbGV0IGxhc3RWYWx1ZSA9IHZlYzQuY29weShbXSwgdmFsdWUpXG4gIGxldCBkZXN0aW5hdGlvblZhbHVlID0gdmVjNC5jb3B5KFtdLCB2YWx1ZSlcblxuICAvLyBzZXQgdXAgc29tZSByZXVzYWJsZSBhcnJheXMgdG8gdXNlIGluIHRpY2soKVxuICBsZXQgbmV4dFZhbHVlID0gW11cbiAgbGV0IHZlbG9jaXR5ID0gW11cbiAgbGV0IGRlbHRhID0gW11cbiAgbGV0IHNwcmluZyA9IFtdXG4gIGxldCBkYW1wZXIgPSBbXVxuICBsZXQgYWNjZWxlcmF0aW9uID0gW11cblxuICByZXR1cm4ge1xuICAgIHNldERlc3RpbmF0aW9uLFxuICAgIGdldEN1cnJlbnRWYWx1ZSxcbiAgICBpc0F0RGVzdGluYXRpb24sXG4gICAgdGlja1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0RGVzdGluYXRpb24gKG5ld1ZhbHVlLCBzaG91bGRBbmltYXRlID0gdHJ1ZSkge1xuICAgIG1ha2VWYWx1ZVZlYzQoZGVzdGluYXRpb25WYWx1ZSwgbmV3VmFsdWUpXG4gICAgaWYgKCFzaG91bGRBbmltYXRlKSB7XG4gICAgICB2ZWM0LmNvcHkodmFsdWUsIGRlc3RpbmF0aW9uVmFsdWUpXG4gICAgICB2ZWM0LmNvcHkobGFzdFZhbHVlLCBkZXN0aW5hdGlvblZhbHVlKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzQXREZXN0aW5hdGlvbiAodGhyZXNob2xkKSB7XG4gICAgLy8gc3F1YXJlIHRoaXMgc28gd2UgZG9uJ3QgbmVlZCB0byB1c2UgTWF0aC5zcXJ0XG4gICAgdGhyZXNob2xkID0gdGhyZXNob2xkID8gdGhyZXNob2xkICogdGhyZXNob2xkIDogcHJlY2lzaW9uXG4gICAgcmV0dXJuIChcbiAgICAgIHZlYzQuc3F1YXJlZERpc3RhbmNlKHZhbHVlLCBkZXN0aW5hdGlvblZhbHVlKSA8PSB0aHJlc2hvbGQgJiZcbiAgICAgIHZlYzQuc3F1YXJlZERpc3RhbmNlKHZhbHVlLCBsYXN0VmFsdWUpIDw9IHRocmVzaG9sZFxuICAgIClcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEN1cnJlbnRWYWx1ZSAob3V0ID0gW10pIHtcbiAgICBpZiAoIWlzSW5wdXRBcnJheSkgcmV0dXJuIHZhbHVlWzBdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2ZWNDb21wb25lbnRzOyBpKyspIHtcbiAgICAgIG91dFtpXSA9IHZhbHVlW2ldXG4gICAgfVxuICAgIHJldHVybiBvdXRcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpY2sgKHMgPSBzdGlmZm5lc3MsIGQgPSBkYW1wZW5pbmcpIHtcbiAgICB2ZWM0LnN1YnRyYWN0KHZlbG9jaXR5LCB2YWx1ZSwgbGFzdFZhbHVlKVxuICAgIHZlYzQuc3VidHJhY3QoZGVsdGEsIGRlc3RpbmF0aW9uVmFsdWUsIHZhbHVlKVxuICAgIHZlYzQuc2NhbGUoc3ByaW5nLCBkZWx0YSwgcylcbiAgICB2ZWM0LnNjYWxlKGRhbXBlciwgdmVsb2NpdHksIC1kKVxuICAgIHZlYzQuYWRkKGFjY2VsZXJhdGlvbiwgc3ByaW5nLCBkYW1wZXIpXG4gICAgdmVjNC5hZGQodmVsb2NpdHksIHZlbG9jaXR5LCBhY2NlbGVyYXRpb24pXG4gICAgdmVjNC5hZGQobmV4dFZhbHVlLCB2ZWxvY2l0eSwgdmFsdWUpXG4gICAgdmVjNC5jb3B5KGxhc3RWYWx1ZSwgdmFsdWUpXG4gICAgdmVjNC5jb3B5KHZhbHVlLCBuZXh0VmFsdWUpXG4gICAgaWYgKGlzQXREZXN0aW5hdGlvbigpKSB7XG4gICAgICB2ZWM0LmNvcHkodmFsdWUsIGRlc3RpbmF0aW9uVmFsdWUpXG4gICAgICB2ZWM0LmNvcHkobGFzdFZhbHVlLCBkZXN0aW5hdGlvblZhbHVlKVxuICAgIH1cbiAgfVxufVxuIiwiLyoqXG4gKiBkYXQtZ3VpIEphdmFTY3JpcHQgQ29udHJvbGxlciBMaWJyYXJ5XG4gKiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvZGF0LWd1aVxuICpcbiAqIENvcHlyaWdodCAyMDExIERhdGEgQXJ0cyBUZWFtLCBHb29nbGUgQ3JlYXRpdmUgTGFiXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICovXG5cbi8qKiBAbmFtZXNwYWNlICovXG52YXIgZGF0ID0gbW9kdWxlLmV4cG9ydHMgPSBkYXQgfHwge307XG5cbi8qKiBAbmFtZXNwYWNlICovXG5kYXQuZ3VpID0gZGF0Lmd1aSB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC51dGlscyA9IGRhdC51dGlscyB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC5jb250cm9sbGVycyA9IGRhdC5jb250cm9sbGVycyB8fCB7fTtcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmRhdC5kb20gPSBkYXQuZG9tIHx8IHt9O1xuXG4vKiogQG5hbWVzcGFjZSAqL1xuZGF0LmNvbG9yID0gZGF0LmNvbG9yIHx8IHt9O1xuXG5kYXQudXRpbHMuY3NzID0gKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICBsb2FkOiBmdW5jdGlvbiAodXJsLCBkb2MpIHtcbiAgICAgIGRvYyA9IGRvYyB8fCBkb2N1bWVudDtcbiAgICAgIHZhciBsaW5rID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgICAgIGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGxpbmspO1xuICAgIH0sXG4gICAgaW5qZWN0OiBmdW5jdGlvbihjc3MsIGRvYykge1xuICAgICAgZG9jID0gZG9jIHx8IGRvY3VtZW50O1xuICAgICAgdmFyIGluamVjdGVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIGluamVjdGVkLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgaW5qZWN0ZWQuaW5uZXJIVE1MID0gY3NzO1xuICAgICAgZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoaW5qZWN0ZWQpO1xuICAgIH1cbiAgfVxufSkoKTtcblxuXG5kYXQudXRpbHMuY29tbW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgXG4gIHZhciBBUlJfRUFDSCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xuICB2YXIgQVJSX1NMSUNFID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG4gIC8qKlxuICAgKiBCYW5kLWFpZCBtZXRob2RzIGZvciB0aGluZ3MgdGhhdCBzaG91bGQgYmUgYSBsb3QgZWFzaWVyIGluIEphdmFTY3JpcHQuXG4gICAqIEltcGxlbWVudGF0aW9uIGFuZCBzdHJ1Y3R1cmUgaW5zcGlyZWQgYnkgdW5kZXJzY29yZS5qc1xuICAgKiBodHRwOi8vZG9jdW1lbnRjbG91ZC5naXRodWIuY29tL3VuZGVyc2NvcmUvXG4gICAqL1xuXG4gIHJldHVybiB7IFxuICAgIFxuICAgIEJSRUFLOiB7fSxcbiAgXG4gICAgZXh0ZW5kOiBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIFxuICAgICAgdGhpcy5lYWNoKEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cywgMSksIGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iailcbiAgICAgICAgICBpZiAoIXRoaXMuaXNVbmRlZmluZWQob2JqW2tleV0pKSBcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgICAgIFxuICAgICAgfSwgdGhpcyk7XG4gICAgICBcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICBcbiAgICB9LFxuICAgIFxuICAgIGRlZmF1bHRzOiBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIFxuICAgICAgdGhpcy5lYWNoKEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cywgMSksIGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iailcbiAgICAgICAgICBpZiAodGhpcy5pc1VuZGVmaW5lZCh0YXJnZXRba2V5XSkpIFxuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgXG4gICAgICB9LCB0aGlzKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICBcbiAgICB9LFxuICAgIFxuICAgIGNvbXBvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRvQ2FsbCA9IEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBhcmdzID0gQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRvQ2FsbC5sZW5ndGggLTE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgYXJncyA9IFt0b0NhbGxbaV0uYXBwbHkodGhpcywgYXJncyldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBhcmdzWzBdO1xuICAgICAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgZWFjaDogZnVuY3Rpb24ob2JqLCBpdHIsIHNjb3BlKSB7XG5cbiAgICAgIFxuICAgICAgaWYgKEFSUl9FQUNIICYmIG9iai5mb3JFYWNoID09PSBBUlJfRUFDSCkgeyBcbiAgICAgICAgXG4gICAgICAgIG9iai5mb3JFYWNoKGl0ciwgc2NvcGUpO1xuICAgICAgICBcbiAgICAgIH0gZWxzZSBpZiAob2JqLmxlbmd0aCA9PT0gb2JqLmxlbmd0aCArIDApIHsgLy8gSXMgbnVtYmVyIGJ1dCBub3QgTmFOXG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBrZXkgPSAwLCBsID0gb2JqLmxlbmd0aDsga2V5IDwgbDsga2V5KyspXG4gICAgICAgICAgaWYgKGtleSBpbiBvYmogJiYgaXRyLmNhbGwoc2NvcGUsIG9ialtrZXldLCBrZXkpID09PSB0aGlzLkJSRUFLKSBcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSBcbiAgICAgICAgICBpZiAoaXRyLmNhbGwoc2NvcGUsIG9ialtrZXldLCBrZXkpID09PSB0aGlzLkJSRUFLKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICB9XG4gICAgICAgICAgICBcbiAgICB9LFxuICAgIFxuICAgIGRlZmVyOiBmdW5jdGlvbihmbmMpIHtcbiAgICAgIHNldFRpbWVvdXQoZm5jLCAwKTtcbiAgICB9LFxuICAgIFxuICAgIHRvQXJyYXk6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgaWYgKG9iai50b0FycmF5KSByZXR1cm4gb2JqLnRvQXJyYXkoKTtcbiAgICAgIHJldHVybiBBUlJfU0xJQ0UuY2FsbChvYmopO1xuICAgIH0sXG5cbiAgICBpc1VuZGVmaW5lZDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBcbiAgICBpc051bGw6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gbnVsbDtcbiAgICB9LFxuICAgIFxuICAgIGlzTmFOOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogIT09IG9iajtcbiAgICB9LFxuICAgIFxuICAgIGlzQXJyYXk6IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqLmNvbnN0cnVjdG9yID09PSBBcnJheTtcbiAgICB9LFxuICAgIFxuICAgIGlzT2JqZWN0OiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IE9iamVjdChvYmopO1xuICAgIH0sXG4gICAgXG4gICAgaXNOdW1iZXI6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gb2JqKzA7XG4gICAgfSxcbiAgICBcbiAgICBpc1N0cmluZzogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBvYmorJyc7XG4gICAgfSxcbiAgICBcbiAgICBpc0Jvb2xlYW46IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gZmFsc2UgfHwgb2JqID09PSB0cnVlO1xuICAgIH0sXG4gICAgXG4gICAgaXNGdW5jdGlvbjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gICAgfVxuICBcbiAgfTtcbiAgICBcbn0pKCk7XG5cblxuZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKGNvbW1vbikge1xuXG4gIC8qKlxuICAgKiBAY2xhc3MgQW4gXCJhYnN0cmFjdFwiIGNsYXNzIHRoYXQgcmVwcmVzZW50cyBhIGdpdmVuIHByb3BlcnR5IG9mIGFuIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBDb250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXG4gICAgdGhpcy5pbml0aWFsVmFsdWUgPSBvYmplY3RbcHJvcGVydHldO1xuXG4gICAgLyoqXG4gICAgICogVGhvc2Ugd2hvIGV4dGVuZCB0aGlzIGNsYXNzIHdpbGwgcHV0IHRoZWlyIERPTSBlbGVtZW50cyBpbiBoZXJlLlxuICAgICAqIEB0eXBlIHtET01FbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG9iamVjdCB0byBtYW5pcHVsYXRlXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKi9cbiAgICB0aGlzLm9iamVjdCA9IG9iamVjdDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBtYW5pcHVsYXRlXG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLnByb3BlcnR5ID0gcHJvcGVydHk7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGNoYW5nZS5cbiAgICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHRoaXMuX19vbkNoYW5nZSA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgb24gZmluaXNoaW5nIGNoYW5nZS5cbiAgICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHRoaXMuX19vbkZpbmlzaENoYW5nZSA9IHVuZGVmaW5lZDtcblxuICB9O1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIENvbnRyb2xsZXIucHJvdG90eXBlLFxuXG4gICAgICAvKiogQGxlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLnByb3RvdHlwZSAqL1xuICAgICAge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZ5IHRoYXQgYSBmdW5jdGlvbiBmaXJlIGV2ZXJ5IHRpbWUgc29tZW9uZSBjaGFuZ2VzIHRoZSB2YWx1ZSB3aXRoXG4gICAgICAgICAqIHRoaXMgQ29udHJvbGxlci5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5jIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlIHZhbHVlXG4gICAgICAgICAqIGlzIG1vZGlmaWVkIHZpYSB0aGlzIENvbnRyb2xsZXIuXG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcn0gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uKGZuYykge1xuICAgICAgICAgIHRoaXMuX19vbkNoYW5nZSA9IGZuYztcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lmeSB0aGF0IGEgZnVuY3Rpb24gZmlyZSBldmVyeSB0aW1lIHNvbWVvbmUgXCJmaW5pc2hlc1wiIGNoYW5naW5nXG4gICAgICAgICAqIHRoZSB2YWx1ZSB3aWggdGhpcyBDb250cm9sbGVyLiBVc2VmdWwgZm9yIHZhbHVlcyB0aGF0IGNoYW5nZVxuICAgICAgICAgKiBpbmNyZW1lbnRhbGx5IGxpa2UgbnVtYmVycyBvciBzdHJpbmdzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbmMgVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuZXZlclxuICAgICAgICAgKiBzb21lb25lIFwiZmluaXNoZXNcIiBjaGFuZ2luZyB0aGUgdmFsdWUgdmlhIHRoaXMgQ29udHJvbGxlci5cbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5Db250cm9sbGVyfSB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBvbkZpbmlzaENoYW5nZTogZnVuY3Rpb24oZm5jKSB7XG4gICAgICAgICAgdGhpcy5fX29uRmluaXNoQ2hhbmdlID0gZm5jO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGFuZ2UgdGhlIHZhbHVlIG9mIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBuZXdWYWx1ZSBUaGUgbmV3IHZhbHVlIG9mIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XG4gICAgICAgICAqL1xuICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24obmV3VmFsdWUpIHtcbiAgICAgICAgICB0aGlzLm9iamVjdFt0aGlzLnByb3BlcnR5XSA9IG5ld1ZhbHVlO1xuICAgICAgICAgIGlmICh0aGlzLl9fb25DaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX19vbkNoYW5nZS5jYWxsKHRoaXMsIG5ld1ZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIHZhbHVlIG9mIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBjdXJyZW50IHZhbHVlIG9mIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XG4gICAgICAgICAqL1xuICAgICAgICBnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0W3RoaXMucHJvcGVydHldO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWZyZXNoZXMgdGhlIHZpc3VhbCBkaXNwbGF5IG9mIGEgQ29udHJvbGxlciBpbiBvcmRlciB0byBrZWVwIHN5bmNcbiAgICAgICAgICogd2l0aCB0aGUgb2JqZWN0J3MgY3VycmVudCB2YWx1ZS5cbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5Db250cm9sbGVyfSB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICB1cGRhdGVEaXNwbGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgdGhlIHZhbHVlIGhhcyBkZXZpYXRlZCBmcm9tIGluaXRpYWxWYWx1ZVxuICAgICAgICAgKi9cbiAgICAgICAgaXNNb2RpZmllZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaW5pdGlhbFZhbHVlICE9PSB0aGlzLmdldFZhbHVlKClcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgKTtcblxuICByZXR1cm4gQ29udHJvbGxlcjtcblxuXG59KShkYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuZG9tLmRvbSA9IChmdW5jdGlvbiAoY29tbW9uKSB7XG5cbiAgdmFyIEVWRU5UX01BUCA9IHtcbiAgICAnSFRNTEV2ZW50cyc6IFsnY2hhbmdlJ10sXG4gICAgJ01vdXNlRXZlbnRzJzogWydjbGljaycsJ21vdXNlbW92ZScsJ21vdXNlZG93bicsJ21vdXNldXAnLCAnbW91c2VvdmVyJ10sXG4gICAgJ0tleWJvYXJkRXZlbnRzJzogWydrZXlkb3duJ11cbiAgfTtcblxuICB2YXIgRVZFTlRfTUFQX0lOViA9IHt9O1xuICBjb21tb24uZWFjaChFVkVOVF9NQVAsIGZ1bmN0aW9uKHYsIGspIHtcbiAgICBjb21tb24uZWFjaCh2LCBmdW5jdGlvbihlKSB7XG4gICAgICBFVkVOVF9NQVBfSU5WW2VdID0gaztcbiAgICB9KTtcbiAgfSk7XG5cbiAgdmFyIENTU19WQUxVRV9QSVhFTFMgPSAvKFxcZCsoXFwuXFxkKyk/KXB4LztcblxuICBmdW5jdGlvbiBjc3NWYWx1ZVRvUGl4ZWxzKHZhbCkge1xuXG4gICAgaWYgKHZhbCA9PT0gJzAnIHx8IGNvbW1vbi5pc1VuZGVmaW5lZCh2YWwpKSByZXR1cm4gMDtcblxuICAgIHZhciBtYXRjaCA9IHZhbC5tYXRjaChDU1NfVkFMVUVfUElYRUxTKTtcblxuICAgIGlmICghY29tbW9uLmlzTnVsbChtYXRjaCkpIHtcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPIC4uLmVtcz8gJT9cblxuICAgIHJldHVybiAwO1xuXG4gIH1cblxuICAvKipcbiAgICogQG5hbWVzcGFjZVxuICAgKiBAbWVtYmVyIGRhdC5kb21cbiAgICovXG4gIHZhciBkb20gPSB7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqIEBwYXJhbSBzZWxlY3RhYmxlXG4gICAgICovXG4gICAgbWFrZVNlbGVjdGFibGU6IGZ1bmN0aW9uKGVsZW0sIHNlbGVjdGFibGUpIHtcblxuICAgICAgaWYgKGVsZW0gPT09IHVuZGVmaW5lZCB8fCBlbGVtLnN0eWxlID09PSB1bmRlZmluZWQpIHJldHVybjtcblxuICAgICAgZWxlbS5vbnNlbGVjdHN0YXJ0ID0gc2VsZWN0YWJsZSA/IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IDogZnVuY3Rpb24oKSB7XG4gICAgICB9O1xuXG4gICAgICBlbGVtLnN0eWxlLk1velVzZXJTZWxlY3QgPSBzZWxlY3RhYmxlID8gJ2F1dG8nIDogJ25vbmUnO1xuICAgICAgZWxlbS5zdHlsZS5LaHRtbFVzZXJTZWxlY3QgPSBzZWxlY3RhYmxlID8gJ2F1dG8nIDogJ25vbmUnO1xuICAgICAgZWxlbS51bnNlbGVjdGFibGUgPSBzZWxlY3RhYmxlID8gJ29uJyA6ICdvZmYnO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKiBAcGFyYW0gaG9yaXpvbnRhbFxuICAgICAqIEBwYXJhbSB2ZXJ0aWNhbFxuICAgICAqL1xuICAgIG1ha2VGdWxsc2NyZWVuOiBmdW5jdGlvbihlbGVtLCBob3Jpem9udGFsLCB2ZXJ0aWNhbCkge1xuXG4gICAgICBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKGhvcml6b250YWwpKSBob3Jpem9udGFsID0gdHJ1ZTtcbiAgICAgIGlmIChjb21tb24uaXNVbmRlZmluZWQodmVydGljYWwpKSB2ZXJ0aWNhbCA9IHRydWU7XG5cbiAgICAgIGVsZW0uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXG4gICAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgICBlbGVtLnN0eWxlLmxlZnQgPSAwO1xuICAgICAgICBlbGVtLnN0eWxlLnJpZ2h0ID0gMDtcbiAgICAgIH1cbiAgICAgIGlmICh2ZXJ0aWNhbCkge1xuICAgICAgICBlbGVtLnN0eWxlLnRvcCA9IDA7XG4gICAgICAgIGVsZW0uc3R5bGUuYm90dG9tID0gMDtcbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICogQHBhcmFtIGV2ZW50VHlwZVxuICAgICAqIEBwYXJhbSBwYXJhbXNcbiAgICAgKi9cbiAgICBmYWtlRXZlbnQ6IGZ1bmN0aW9uKGVsZW0sIGV2ZW50VHlwZSwgcGFyYW1zLCBhdXgpIHtcbiAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcbiAgICAgIHZhciBjbGFzc05hbWUgPSBFVkVOVF9NQVBfSU5WW2V2ZW50VHlwZV07XG4gICAgICBpZiAoIWNsYXNzTmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V2ZW50IHR5cGUgJyArIGV2ZW50VHlwZSArICcgbm90IHN1cHBvcnRlZC4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChjbGFzc05hbWUpO1xuICAgICAgc3dpdGNoIChjbGFzc05hbWUpIHtcbiAgICAgICAgY2FzZSAnTW91c2VFdmVudHMnOlxuICAgICAgICAgIHZhciBjbGllbnRYID0gcGFyYW1zLnggfHwgcGFyYW1zLmNsaWVudFggfHwgMDtcbiAgICAgICAgICB2YXIgY2xpZW50WSA9IHBhcmFtcy55IHx8IHBhcmFtcy5jbGllbnRZIHx8IDA7XG4gICAgICAgICAgZXZ0LmluaXRNb3VzZUV2ZW50KGV2ZW50VHlwZSwgcGFyYW1zLmJ1YmJsZXMgfHwgZmFsc2UsXG4gICAgICAgICAgICAgIHBhcmFtcy5jYW5jZWxhYmxlIHx8IHRydWUsIHdpbmRvdywgcGFyYW1zLmNsaWNrQ291bnQgfHwgMSxcbiAgICAgICAgICAgICAgMCwgLy9zY3JlZW4gWFxuICAgICAgICAgICAgICAwLCAvL3NjcmVlbiBZXG4gICAgICAgICAgICAgIGNsaWVudFgsIC8vY2xpZW50IFhcbiAgICAgICAgICAgICAgY2xpZW50WSwgLy9jbGllbnQgWVxuICAgICAgICAgICAgICBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgMCwgbnVsbCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0tleWJvYXJkRXZlbnRzJzpcbiAgICAgICAgICB2YXIgaW5pdCA9IGV2dC5pbml0S2V5Ym9hcmRFdmVudCB8fCBldnQuaW5pdEtleUV2ZW50OyAvLyB3ZWJraXQgfHwgbW96XG4gICAgICAgICAgY29tbW9uLmRlZmF1bHRzKHBhcmFtcywge1xuICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGN0cmxLZXk6IGZhbHNlLFxuICAgICAgICAgICAgYWx0S2V5OiBmYWxzZSxcbiAgICAgICAgICAgIHNoaWZ0S2V5OiBmYWxzZSxcbiAgICAgICAgICAgIG1ldGFLZXk6IGZhbHNlLFxuICAgICAgICAgICAga2V5Q29kZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgY2hhckNvZGU6IHVuZGVmaW5lZFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGluaXQoZXZlbnRUeXBlLCBwYXJhbXMuYnViYmxlcyB8fCBmYWxzZSxcbiAgICAgICAgICAgICAgcGFyYW1zLmNhbmNlbGFibGUsIHdpbmRvdyxcbiAgICAgICAgICAgICAgcGFyYW1zLmN0cmxLZXksIHBhcmFtcy5hbHRLZXksXG4gICAgICAgICAgICAgIHBhcmFtcy5zaGlmdEtleSwgcGFyYW1zLm1ldGFLZXksXG4gICAgICAgICAgICAgIHBhcmFtcy5rZXlDb2RlLCBwYXJhbXMuY2hhckNvZGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGV2dC5pbml0RXZlbnQoZXZlbnRUeXBlLCBwYXJhbXMuYnViYmxlcyB8fCBmYWxzZSxcbiAgICAgICAgICAgICAgcGFyYW1zLmNhbmNlbGFibGUgfHwgdHJ1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb21tb24uZGVmYXVsdHMoZXZ0LCBhdXgpO1xuICAgICAgZWxlbS5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKiBAcGFyYW0gZnVuY1xuICAgICAqIEBwYXJhbSBib29sXG4gICAgICovXG4gICAgYmluZDogZnVuY3Rpb24oZWxlbSwgZXZlbnQsIGZ1bmMsIGJvb2wpIHtcbiAgICAgIGJvb2wgPSBib29sIHx8IGZhbHNlO1xuICAgICAgaWYgKGVsZW0uYWRkRXZlbnRMaXN0ZW5lcilcbiAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jLCBib29sKTtcbiAgICAgIGVsc2UgaWYgKGVsZW0uYXR0YWNoRXZlbnQpXG4gICAgICAgIGVsZW0uYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBmdW5jKTtcbiAgICAgIHJldHVybiBkb207XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKiBAcGFyYW0gZnVuY1xuICAgICAqIEBwYXJhbSBib29sXG4gICAgICovXG4gICAgdW5iaW5kOiBmdW5jdGlvbihlbGVtLCBldmVudCwgZnVuYywgYm9vbCkge1xuICAgICAgYm9vbCA9IGJvb2wgfHwgZmFsc2U7XG4gICAgICBpZiAoZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKVxuICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMsIGJvb2wpO1xuICAgICAgZWxzZSBpZiAoZWxlbS5kZXRhY2hFdmVudClcbiAgICAgICAgZWxlbS5kZXRhY2hFdmVudCgnb24nICsgZXZlbnQsIGZ1bmMpO1xuICAgICAgcmV0dXJuIGRvbTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqIEBwYXJhbSBjbGFzc05hbWVcbiAgICAgKi9cbiAgICBhZGRDbGFzczogZnVuY3Rpb24oZWxlbSwgY2xhc3NOYW1lKSB7XG4gICAgICBpZiAoZWxlbS5jbGFzc05hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICAgIH0gZWxzZSBpZiAoZWxlbS5jbGFzc05hbWUgIT09IGNsYXNzTmFtZSkge1xuICAgICAgICB2YXIgY2xhc3NlcyA9IGVsZW0uY2xhc3NOYW1lLnNwbGl0KC8gKy8pO1xuICAgICAgICBpZiAoY2xhc3Nlcy5pbmRleE9mKGNsYXNzTmFtZSkgPT0gLTEpIHtcbiAgICAgICAgICBjbGFzc2VzLnB1c2goY2xhc3NOYW1lKTtcbiAgICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbignICcpLnJlcGxhY2UoL15cXHMrLywgJycpLnJlcGxhY2UoL1xccyskLywgJycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZG9tO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICogQHBhcmFtIGNsYXNzTmFtZVxuICAgICAqL1xuICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbihlbGVtLCBjbGFzc05hbWUpIHtcbiAgICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgICAgaWYgKGVsZW0uY2xhc3NOYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBlbGVtLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtLmNsYXNzTmFtZSA9PT0gY2xhc3NOYW1lKSB7XG4gICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtLmNsYXNzTmFtZS5zcGxpdCgvICsvKTtcbiAgICAgICAgICB2YXIgaW5kZXggPSBjbGFzc2VzLmluZGV4T2YoY2xhc3NOYW1lKTtcbiAgICAgICAgICBpZiAoaW5kZXggIT0gLTEpIHtcbiAgICAgICAgICAgIGNsYXNzZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIGVsZW0uY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKCcgJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkb207XG4gICAgfSxcblxuICAgIGhhc0NsYXNzOiBmdW5jdGlvbihlbGVtLCBjbGFzc05hbWUpIHtcbiAgICAgIHJldHVybiBuZXcgUmVnRXhwKCcoPzpefFxcXFxzKyknICsgY2xhc3NOYW1lICsgJyg/OlxcXFxzK3wkKScpLnRlc3QoZWxlbS5jbGFzc05hbWUpIHx8IGZhbHNlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICovXG4gICAgZ2V0V2lkdGg6IGZ1bmN0aW9uKGVsZW0pIHtcblxuICAgICAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKTtcblxuICAgICAgcmV0dXJuIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ2JvcmRlci1sZWZ0LXdpZHRoJ10pICtcbiAgICAgICAgICBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydib3JkZXItcmlnaHQtd2lkdGgnXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3BhZGRpbmctbGVmdCddKSArXG4gICAgICAgICAgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsncGFkZGluZy1yaWdodCddKSArXG4gICAgICAgICAgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsnd2lkdGgnXSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGVsZW1cbiAgICAgKi9cbiAgICBnZXRIZWlnaHQ6IGZ1bmN0aW9uKGVsZW0pIHtcblxuICAgICAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKTtcblxuICAgICAgcmV0dXJuIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ2JvcmRlci10b3Atd2lkdGgnXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ2JvcmRlci1ib3R0b20td2lkdGgnXSkgK1xuICAgICAgICAgIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3BhZGRpbmctdG9wJ10pICtcbiAgICAgICAgICBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydwYWRkaW5nLWJvdHRvbSddKSArXG4gICAgICAgICAgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsnaGVpZ2h0J10pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbGVtXG4gICAgICovXG4gICAgZ2V0T2Zmc2V0OiBmdW5jdGlvbihlbGVtKSB7XG4gICAgICB2YXIgb2Zmc2V0ID0ge2xlZnQ6IDAsIHRvcDowfTtcbiAgICAgIGlmIChlbGVtLm9mZnNldFBhcmVudCkge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgb2Zmc2V0LmxlZnQgKz0gZWxlbS5vZmZzZXRMZWZ0O1xuICAgICAgICAgIG9mZnNldC50b3AgKz0gZWxlbS5vZmZzZXRUb3A7XG4gICAgICAgIH0gd2hpbGUgKGVsZW0gPSBlbGVtLm9mZnNldFBhcmVudCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2Zmc2V0O1xuICAgIH0sXG5cbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcG9zdHMvMjY4NDU2MS9yZXZpc2lvbnNcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gZWxlbVxuICAgICAqL1xuICAgIGlzQWN0aXZlOiBmdW5jdGlvbihlbGVtKSB7XG4gICAgICByZXR1cm4gZWxlbSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiAoIGVsZW0udHlwZSB8fCBlbGVtLmhyZWYgKTtcbiAgICB9XG5cbiAgfTtcblxuICByZXR1cm4gZG9tO1xuXG59KShkYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuY29udHJvbGxlcnMuT3B0aW9uQ29udHJvbGxlciA9IChmdW5jdGlvbiAoQ29udHJvbGxlciwgZG9tLCBjb21tb24pIHtcblxuICAvKipcbiAgICogQGNsYXNzIFByb3ZpZGVzIGEgc2VsZWN0IGlucHV0IHRvIGFsdGVyIHRoZSBwcm9wZXJ0eSBvZiBhbiBvYmplY3QsIHVzaW5nIGFcbiAgICogbGlzdCBvZiBhY2NlcHRlZCB2YWx1ZXMuXG4gICAqXG4gICAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7T2JqZWN0fHN0cmluZ1tdfSBvcHRpb25zIEEgbWFwIG9mIGxhYmVscyB0byBhY2NlcHRhYmxlIHZhbHVlcywgb3JcbiAgICogYSBsaXN0IG9mIGFjY2VwdGFibGUgc3RyaW5nIHZhbHVlcy5cbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBPcHRpb25Db250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSwgb3B0aW9ucykge1xuXG4gICAgT3B0aW9uQ29udHJvbGxlci5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGRyb3AgZG93biBtZW51XG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIHRoaXMuX19zZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcblxuICAgIGlmIChjb21tb24uaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgdmFyIG1hcCA9IHt9O1xuICAgICAgY29tbW9uLmVhY2gob3B0aW9ucywgZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICBtYXBbZWxlbWVudF0gPSBlbGVtZW50O1xuICAgICAgfSk7XG4gICAgICBvcHRpb25zID0gbWFwO1xuICAgIH1cblxuICAgIGNvbW1vbi5lYWNoKG9wdGlvbnMsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcblxuICAgICAgdmFyIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgb3B0LmlubmVySFRNTCA9IGtleTtcbiAgICAgIG9wdC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgdmFsdWUpO1xuICAgICAgX3RoaXMuX19zZWxlY3QuYXBwZW5kQ2hpbGQob3B0KTtcblxuICAgIH0pO1xuXG4gICAgLy8gQWNrbm93bGVkZ2Ugb3JpZ2luYWwgdmFsdWVcbiAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcblxuICAgIGRvbS5iaW5kKHRoaXMuX19zZWxlY3QsICdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBkZXNpcmVkVmFsdWUgPSB0aGlzLm9wdGlvbnNbdGhpcy5zZWxlY3RlZEluZGV4XS52YWx1ZTtcbiAgICAgIF90aGlzLnNldFZhbHVlKGRlc2lyZWRWYWx1ZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX3NlbGVjdCk7XG5cbiAgfTtcblxuICBPcHRpb25Db250cm9sbGVyLnN1cGVyY2xhc3MgPSBDb250cm9sbGVyO1xuXG4gIGNvbW1vbi5leHRlbmQoXG5cbiAgICAgIE9wdGlvbkNvbnRyb2xsZXIucHJvdG90eXBlLFxuICAgICAgQ29udHJvbGxlci5wcm90b3R5cGUsXG5cbiAgICAgIHtcblxuICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24odikge1xuICAgICAgICAgIHZhciB0b1JldHVybiA9IE9wdGlvbkNvbnRyb2xsZXIuc3VwZXJjbGFzcy5wcm90b3R5cGUuc2V0VmFsdWUuY2FsbCh0aGlzLCB2KTtcbiAgICAgICAgICBpZiAodGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbCh0aGlzLCB0aGlzLmdldFZhbHVlKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdG9SZXR1cm47XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlRGlzcGxheTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5fX3NlbGVjdC52YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKTtcbiAgICAgICAgICByZXR1cm4gT3B0aW9uQ29udHJvbGxlci5zdXBlcmNsYXNzLnByb3RvdHlwZS51cGRhdGVEaXNwbGF5LmNhbGwodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICk7XG5cbiAgcmV0dXJuIE9wdGlvbkNvbnRyb2xsZXI7XG5cbn0pKGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLFxuZGF0LmRvbS5kb20sXG5kYXQudXRpbHMuY29tbW9uKTtcblxuXG5kYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlciA9IChmdW5jdGlvbiAoQ29udHJvbGxlciwgY29tbW9uKSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBSZXByZXNlbnRzIGEgZ2l2ZW4gcHJvcGVydHkgb2YgYW4gb2JqZWN0IHRoYXQgaXMgYSBudW1iZXIuXG4gICAqXG4gICAqIEBleHRlbmRzIGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXSBPcHRpb25hbCBwYXJhbWV0ZXJzXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcGFyYW1zLm1pbl0gTWluaW11bSBhbGxvd2VkIHZhbHVlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcGFyYW1zLm1heF0gTWF4aW11bSBhbGxvd2VkIHZhbHVlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbcGFyYW1zLnN0ZXBdIEluY3JlbWVudCBieSB3aGljaCB0byBjaGFuZ2UgdmFsdWVcbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBOdW1iZXJDb250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSwgcGFyYW1zKSB7XG5cbiAgICBOdW1iZXJDb250cm9sbGVyLnN1cGVyY2xhc3MuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KTtcblxuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcblxuICAgIHRoaXMuX19taW4gPSBwYXJhbXMubWluO1xuICAgIHRoaXMuX19tYXggPSBwYXJhbXMubWF4O1xuICAgIHRoaXMuX19zdGVwID0gcGFyYW1zLnN0ZXA7XG5cbiAgICBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKHRoaXMuX19zdGVwKSkge1xuXG4gICAgICBpZiAodGhpcy5pbml0aWFsVmFsdWUgPT0gMCkge1xuICAgICAgICB0aGlzLl9faW1wbGllZFN0ZXAgPSAxOyAvLyBXaGF0IGFyZSB3ZSwgcHN5Y2hpY3M/XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBIZXkgRG91ZywgY2hlY2sgdGhpcyBvdXQuXG4gICAgICAgIHRoaXMuX19pbXBsaWVkU3RlcCA9IE1hdGgucG93KDEwLCBNYXRoLmZsb29yKE1hdGgubG9nKHRoaXMuaW5pdGlhbFZhbHVlKS9NYXRoLkxOMTApKS8xMDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMuX19pbXBsaWVkU3RlcCA9IHRoaXMuX19zdGVwO1xuXG4gICAgfVxuXG4gICAgdGhpcy5fX3ByZWNpc2lvbiA9IG51bURlY2ltYWxzKHRoaXMuX19pbXBsaWVkU3RlcCk7XG5cblxuICB9O1xuXG4gIE51bWJlckNvbnRyb2xsZXIuc3VwZXJjbGFzcyA9IENvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgTnVtYmVyQ29udHJvbGxlci5wcm90b3R5cGUsXG4gICAgICBDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAgLyoqIEBsZW5kcyBkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlci5wcm90b3R5cGUgKi9cbiAgICAgIHtcblxuICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24odikge1xuXG4gICAgICAgICAgaWYgKHRoaXMuX19taW4gIT09IHVuZGVmaW5lZCAmJiB2IDwgdGhpcy5fX21pbikge1xuICAgICAgICAgICAgdiA9IHRoaXMuX19taW47XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9fbWF4ICE9PSB1bmRlZmluZWQgJiYgdiA+IHRoaXMuX19tYXgpIHtcbiAgICAgICAgICAgIHYgPSB0aGlzLl9fbWF4O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLl9fc3RlcCAhPT0gdW5kZWZpbmVkICYmIHYgJSB0aGlzLl9fc3RlcCAhPSAwKSB7XG4gICAgICAgICAgICB2ID0gTWF0aC5yb3VuZCh2IC8gdGhpcy5fX3N0ZXApICogdGhpcy5fX3N0ZXA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIE51bWJlckNvbnRyb2xsZXIuc3VwZXJjbGFzcy5wcm90b3R5cGUuc2V0VmFsdWUuY2FsbCh0aGlzLCB2KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWZ5IGEgbWluaW11bSB2YWx1ZSBmb3IgPGNvZGU+b2JqZWN0W3Byb3BlcnR5XTwvY29kZT4uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtaW5WYWx1ZSBUaGUgbWluaW11bSB2YWx1ZSBmb3JcbiAgICAgICAgICogPGNvZGU+b2JqZWN0W3Byb3BlcnR5XTwvY29kZT5cbiAgICAgICAgICogQHJldHVybnMge2RhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyfSB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBtaW46IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICB0aGlzLl9fbWluID0gdjtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lmeSBhIG1heGltdW0gdmFsdWUgZm9yIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gbWF4VmFsdWUgVGhlIG1heGltdW0gdmFsdWUgZm9yXG4gICAgICAgICAqIDxjb2RlPm9iamVjdFtwcm9wZXJ0eV08L2NvZGU+XG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlcn0gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgbWF4OiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgdGhpcy5fX21heCA9IHY7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZnkgYSBzdGVwIHZhbHVlIHRoYXQgZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJcbiAgICAgICAgICogaW5jcmVtZW50cyBieS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IHN0ZXBWYWx1ZSBUaGUgc3RlcCB2YWx1ZSBmb3JcbiAgICAgICAgICogZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJcbiAgICAgICAgICogQGRlZmF1bHQgaWYgbWluaW11bSBhbmQgbWF4aW11bSBzcGVjaWZpZWQgaW5jcmVtZW50IGlzIDElIG9mIHRoZVxuICAgICAgICAgKiBkaWZmZXJlbmNlIG90aGVyd2lzZSBzdGVwVmFsdWUgaXMgMVxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJ9IHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIHN0ZXA6IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICB0aGlzLl9fc3RlcCA9IHY7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICk7XG5cbiAgZnVuY3Rpb24gbnVtRGVjaW1hbHMoeCkge1xuICAgIHggPSB4LnRvU3RyaW5nKCk7XG4gICAgaWYgKHguaW5kZXhPZignLicpID4gLTEpIHtcbiAgICAgIHJldHVybiB4Lmxlbmd0aCAtIHguaW5kZXhPZignLicpIC0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE51bWJlckNvbnRyb2xsZXI7XG5cbn0pKGRhdC5jb250cm9sbGVycy5Db250cm9sbGVyLFxuZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJCb3ggPSAoZnVuY3Rpb24gKE51bWJlckNvbnRyb2xsZXIsIGRvbSwgY29tbW9uKSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBSZXByZXNlbnRzIGEgZ2l2ZW4gcHJvcGVydHkgb2YgYW4gb2JqZWN0IHRoYXQgaXMgYSBudW1iZXIgYW5kXG4gICAqIHByb3ZpZGVzIGFuIGlucHV0IGVsZW1lbnQgd2l0aCB3aGljaCB0byBtYW5pcHVsYXRlIGl0LlxuICAgKlxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlclxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc10gT3B0aW9uYWwgcGFyYW1ldGVyc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5taW5dIE1pbmltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5tYXhdIE1heGltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW3BhcmFtcy5zdGVwXSBJbmNyZW1lbnQgYnkgd2hpY2ggdG8gY2hhbmdlIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0LmNvbnRyb2xsZXJzXG4gICAqL1xuICB2YXIgTnVtYmVyQ29udHJvbGxlckJveCA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHksIHBhcmFtcykge1xuXG4gICAgdGhpcy5fX3RydW5jYXRpb25TdXNwZW5kZWQgPSBmYWxzZTtcblxuICAgIE51bWJlckNvbnRyb2xsZXJCb3guc3VwZXJjbGFzcy5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHksIHBhcmFtcyk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLyoqXG4gICAgICoge051bWJlcn0gUHJldmlvdXMgbW91c2UgeSBwb3NpdGlvblxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICB2YXIgcHJldl95O1xuXG4gICAgdGhpcy5fX2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0aGlzLl9faW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcblxuICAgIC8vIE1ha2VzIGl0IHNvIG1hbnVhbGx5IHNwZWNpZmllZCB2YWx1ZXMgYXJlIG5vdCB0cnVuY2F0ZWQuXG5cbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdjaGFuZ2UnLCBvbkNoYW5nZSk7XG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAnYmx1cicsIG9uQmx1cik7XG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAnbW91c2Vkb3duJywgb25Nb3VzZURvd24pO1xuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgIC8vIFdoZW4gcHJlc3NpbmcgZW50aXJlLCB5b3UgY2FuIGJlIGFzIHByZWNpc2UgYXMgeW91IHdhbnQuXG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICBfdGhpcy5fX3RydW5jYXRpb25TdXNwZW5kZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmJsdXIoKTtcbiAgICAgICAgX3RoaXMuX190cnVuY2F0aW9uU3VzcGVuZGVkID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIG9uQ2hhbmdlKCkge1xuICAgICAgdmFyIGF0dGVtcHRlZCA9IHBhcnNlRmxvYXQoX3RoaXMuX19pbnB1dC52YWx1ZSk7XG4gICAgICBpZiAoIWNvbW1vbi5pc05hTihhdHRlbXB0ZWQpKSBfdGhpcy5zZXRWYWx1ZShhdHRlbXB0ZWQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQmx1cigpIHtcbiAgICAgIG9uQ2hhbmdlKCk7XG4gICAgICBpZiAoX3RoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICBfdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwoX3RoaXMsIF90aGlzLmdldFZhbHVlKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VEb3duKGUpIHtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIG9uTW91c2VEcmFnKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuICAgICAgcHJldl95ID0gZS5jbGllbnRZO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VEcmFnKGUpIHtcblxuICAgICAgdmFyIGRpZmYgPSBwcmV2X3kgLSBlLmNsaWVudFk7XG4gICAgICBfdGhpcy5zZXRWYWx1ZShfdGhpcy5nZXRWYWx1ZSgpICsgZGlmZiAqIF90aGlzLl9faW1wbGllZFN0ZXApO1xuXG4gICAgICBwcmV2X3kgPSBlLmNsaWVudFk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1vdXNlVXAoKSB7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIG9uTW91c2VEcmFnKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIG9uTW91c2VVcCk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX2lucHV0KTtcblxuICB9O1xuXG4gIE51bWJlckNvbnRyb2xsZXJCb3guc3VwZXJjbGFzcyA9IE51bWJlckNvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgTnVtYmVyQ29udHJvbGxlckJveC5wcm90b3R5cGUsXG4gICAgICBOdW1iZXJDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAge1xuXG4gICAgICAgIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgdGhpcy5fX2lucHV0LnZhbHVlID0gdGhpcy5fX3RydW5jYXRpb25TdXNwZW5kZWQgPyB0aGlzLmdldFZhbHVlKCkgOiByb3VuZFRvRGVjaW1hbCh0aGlzLmdldFZhbHVlKCksIHRoaXMuX19wcmVjaXNpb24pO1xuICAgICAgICAgIHJldHVybiBOdW1iZXJDb250cm9sbGVyQm94LnN1cGVyY2xhc3MucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgKTtcblxuICBmdW5jdGlvbiByb3VuZFRvRGVjaW1hbCh2YWx1ZSwgZGVjaW1hbHMpIHtcbiAgICB2YXIgdGVuVG8gPSBNYXRoLnBvdygxMCwgZGVjaW1hbHMpO1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlICogdGVuVG8pIC8gdGVuVG87XG4gIH1cblxuICByZXR1cm4gTnVtYmVyQ29udHJvbGxlckJveDtcblxufSkoZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXIsXG5kYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyU2xpZGVyID0gKGZ1bmN0aW9uIChOdW1iZXJDb250cm9sbGVyLCBkb20sIGNzcywgY29tbW9uLCBzdHlsZVNoZWV0KSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBSZXByZXNlbnRzIGEgZ2l2ZW4gcHJvcGVydHkgb2YgYW4gb2JqZWN0IHRoYXQgaXMgYSBudW1iZXIsIGNvbnRhaW5zXG4gICAqIGEgbWluaW11bSBhbmQgbWF4aW11bSwgYW5kIHByb3ZpZGVzIGEgc2xpZGVyIGVsZW1lbnQgd2l0aCB3aGljaCB0b1xuICAgKiBtYW5pcHVsYXRlIGl0LiBJdCBzaG91bGQgYmUgbm90ZWQgdGhhdCB0aGUgc2xpZGVyIGVsZW1lbnQgaXMgbWFkZSB1cCBvZlxuICAgKiA8Y29kZT4mbHQ7ZGl2Jmd0OzwvY29kZT4gdGFncywgPHN0cm9uZz5ub3Q8L3N0cm9uZz4gdGhlIGh0bWw1XG4gICAqIDxjb2RlPiZsdDtzbGlkZXImZ3Q7PC9jb2RlPiBlbGVtZW50LlxuICAgKlxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlclxuICAgKiBcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG1pblZhbHVlIE1pbmltdW0gYWxsb3dlZCB2YWx1ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gbWF4VmFsdWUgTWF4aW11bSBhbGxvd2VkIHZhbHVlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzdGVwVmFsdWUgSW5jcmVtZW50IGJ5IHdoaWNoIHRvIGNoYW5nZSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xuICAgKi9cbiAgdmFyIE51bWJlckNvbnRyb2xsZXJTbGlkZXIgPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5LCBtaW4sIG1heCwgc3RlcCkge1xuXG4gICAgTnVtYmVyQ29udHJvbGxlclNsaWRlci5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSwgeyBtaW46IG1pbiwgbWF4OiBtYXgsIHN0ZXA6IHN0ZXAgfSk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5fX2JhY2tncm91bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9fZm9yZWdyb3VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIFxuXG5cbiAgICBkb20uYmluZCh0aGlzLl9fYmFja2dyb3VuZCwgJ21vdXNlZG93bicsIG9uTW91c2VEb3duKTtcbiAgICBcbiAgICBkb20uYWRkQ2xhc3ModGhpcy5fX2JhY2tncm91bmQsICdzbGlkZXInKTtcbiAgICBkb20uYWRkQ2xhc3ModGhpcy5fX2ZvcmVncm91bmQsICdzbGlkZXItZmcnKTtcblxuICAgIGZ1bmN0aW9uIG9uTW91c2VEb3duKGUpIHtcblxuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgb25Nb3VzZURyYWcpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2V1cCcsIG9uTW91c2VVcCk7XG5cbiAgICAgIG9uTW91c2VEcmFnKGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTW91c2VEcmFnKGUpIHtcblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgb2Zmc2V0ID0gZG9tLmdldE9mZnNldChfdGhpcy5fX2JhY2tncm91bmQpO1xuICAgICAgdmFyIHdpZHRoID0gZG9tLmdldFdpZHRoKF90aGlzLl9fYmFja2dyb3VuZCk7XG4gICAgICBcbiAgICAgIF90aGlzLnNldFZhbHVlKFxuICAgICAgICBtYXAoZS5jbGllbnRYLCBvZmZzZXQubGVmdCwgb2Zmc2V0LmxlZnQgKyB3aWR0aCwgX3RoaXMuX19taW4sIF90aGlzLl9fbWF4KVxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZVVwKCkge1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBvbk1vdXNlRHJhZyk7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBvbk1vdXNlVXApO1xuICAgICAgaWYgKF90aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgX3RoaXMuX19vbkZpbmlzaENoYW5nZS5jYWxsKF90aGlzLCBfdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcblxuICAgIHRoaXMuX19iYWNrZ3JvdW5kLmFwcGVuZENoaWxkKHRoaXMuX19mb3JlZ3JvdW5kKTtcbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX2JhY2tncm91bmQpO1xuXG4gIH07XG5cbiAgTnVtYmVyQ29udHJvbGxlclNsaWRlci5zdXBlcmNsYXNzID0gTnVtYmVyQ29udHJvbGxlcjtcblxuICAvKipcbiAgICogSW5qZWN0cyBkZWZhdWx0IHN0eWxlc2hlZXQgZm9yIHNsaWRlciBlbGVtZW50cy5cbiAgICovXG4gIE51bWJlckNvbnRyb2xsZXJTbGlkZXIudXNlRGVmYXVsdFN0eWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIGNzcy5pbmplY3Qoc3R5bGVTaGVldCk7XG4gIH07XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgTnVtYmVyQ29udHJvbGxlclNsaWRlci5wcm90b3R5cGUsXG4gICAgICBOdW1iZXJDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAge1xuXG4gICAgICAgIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBwY3QgPSAodGhpcy5nZXRWYWx1ZSgpIC0gdGhpcy5fX21pbikvKHRoaXMuX19tYXggLSB0aGlzLl9fbWluKTtcbiAgICAgICAgICB0aGlzLl9fZm9yZWdyb3VuZC5zdHlsZS53aWR0aCA9IHBjdCoxMDArJyUnO1xuICAgICAgICAgIHJldHVybiBOdW1iZXJDb250cm9sbGVyU2xpZGVyLnN1cGVyY2xhc3MucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cblxuXG4gICk7XG5cbiAgZnVuY3Rpb24gbWFwKHYsIGkxLCBpMiwgbzEsIG8yKSB7XG4gICAgcmV0dXJuIG8xICsgKG8yIC0gbzEpICogKCh2IC0gaTEpIC8gKGkyIC0gaTEpKTtcbiAgfVxuXG4gIHJldHVybiBOdW1iZXJDb250cm9sbGVyU2xpZGVyO1xuICBcbn0pKGRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyLFxuZGF0LmRvbS5kb20sXG5kYXQudXRpbHMuY3NzLFxuZGF0LnV0aWxzLmNvbW1vbixcblwiLnNsaWRlciB7XFxuICBib3gtc2hhZG93OiBpbnNldCAwIDJweCA0cHggcmdiYSgwLDAsMCwwLjE1KTtcXG4gIGhlaWdodDogMWVtO1xcbiAgYm9yZGVyLXJhZGl1czogMWVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcXG4gIHBhZGRpbmc6IDAgMC41ZW07XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4uc2xpZGVyLWZnIHtcXG4gIHBhZGRpbmc6IDFweCAwIDJweCAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2FhYTtcXG4gIGhlaWdodDogMWVtO1xcbiAgbWFyZ2luLWxlZnQ6IC0wLjVlbTtcXG4gIHBhZGRpbmctcmlnaHQ6IDAuNWVtO1xcbiAgYm9yZGVyLXJhZGl1czogMWVtIDAgMCAxZW07XFxufVxcblxcbi5zbGlkZXItZmc6YWZ0ZXIge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgYm9yZGVyLXJhZGl1czogMWVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJvcmRlcjogIDFweCBzb2xpZCAjYWFhO1xcbiAgY29udGVudDogJyc7XFxuICBmbG9hdDogcmlnaHQ7XFxuICBtYXJnaW4tcmlnaHQ6IC0xZW07XFxuICBtYXJnaW4tdG9wOiAtMXB4O1xcbiAgaGVpZ2h0OiAwLjllbTtcXG4gIHdpZHRoOiAwLjllbTtcXG59XCIpO1xuXG5cbmRhdC5jb250cm9sbGVycy5GdW5jdGlvbkNvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKENvbnRyb2xsZXIsIGRvbSwgY29tbW9uKSB7XG5cbiAgLyoqXG4gICAqIEBjbGFzcyBQcm92aWRlcyBhIEdVSSBpbnRlcmZhY2UgdG8gZmlyZSBhIHNwZWNpZmllZCBtZXRob2QsIGEgcHJvcGVydHkgb2YgYW4gb2JqZWN0LlxuICAgKlxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xuICAgKi9cbiAgdmFyIEZ1bmN0aW9uQ29udHJvbGxlciA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHksIHRleHQpIHtcblxuICAgIEZ1bmN0aW9uQ29udHJvbGxlci5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5fX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19idXR0b24uaW5uZXJIVE1MID0gdGV4dCA9PT0gdW5kZWZpbmVkID8gJ0ZpcmUnIDogdGV4dDtcbiAgICBkb20uYmluZCh0aGlzLl9fYnV0dG9uLCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBfdGhpcy5maXJlKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICBkb20uYWRkQ2xhc3ModGhpcy5fX2J1dHRvbiwgJ2J1dHRvbicpO1xuXG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19idXR0b24pO1xuXG5cbiAgfTtcblxuICBGdW5jdGlvbkNvbnRyb2xsZXIuc3VwZXJjbGFzcyA9IENvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgRnVuY3Rpb25Db250cm9sbGVyLnByb3RvdHlwZSxcbiAgICAgIENvbnRyb2xsZXIucHJvdG90eXBlLFxuICAgICAge1xuICAgICAgICBcbiAgICAgICAgZmlyZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX19vbkNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5fX29uQ2hhbmdlLmNhbGwodGhpcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX19vbkZpbmlzaENoYW5nZS5jYWxsKHRoaXMsIHRoaXMuZ2V0VmFsdWUoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZ2V0VmFsdWUoKS5jYWxsKHRoaXMub2JqZWN0KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICk7XG5cbiAgcmV0dXJuIEZ1bmN0aW9uQ29udHJvbGxlcjtcblxufSkoZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIsXG5kYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jb21tb24pO1xuXG5cbmRhdC5jb250cm9sbGVycy5Cb29sZWFuQ29udHJvbGxlciA9IChmdW5jdGlvbiAoQ29udHJvbGxlciwgZG9tLCBjb21tb24pIHtcblxuICAvKipcbiAgICogQGNsYXNzIFByb3ZpZGVzIGEgY2hlY2tib3ggaW5wdXQgdG8gYWx0ZXIgdGhlIGJvb2xlYW4gcHJvcGVydHkgb2YgYW4gb2JqZWN0LlxuICAgKiBAZXh0ZW5kcyBkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlclxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBtYW5pcHVsYXRlZFxuICAgKlxuICAgKiBAbWVtYmVyIGRhdC5jb250cm9sbGVyc1xuICAgKi9cbiAgdmFyIEJvb2xlYW5Db250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXG4gICAgQm9vbGVhbkNvbnRyb2xsZXIuc3VwZXJjbGFzcy5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB0aGlzLl9fcHJldiA9IHRoaXMuZ2V0VmFsdWUoKTtcblxuICAgIHRoaXMuX19jaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGhpcy5fX2NoZWNrYm94LnNldEF0dHJpYnV0ZSgndHlwZScsICdjaGVja2JveCcpO1xuXG5cbiAgICBkb20uYmluZCh0aGlzLl9fY2hlY2tib3gsICdjaGFuZ2UnLCBvbkNoYW5nZSwgZmFsc2UpO1xuXG4gICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19jaGVja2JveCk7XG5cbiAgICAvLyBNYXRjaCBvcmlnaW5hbCB2YWx1ZVxuICAgIHRoaXMudXBkYXRlRGlzcGxheSgpO1xuXG4gICAgZnVuY3Rpb24gb25DaGFuZ2UoKSB7XG4gICAgICBfdGhpcy5zZXRWYWx1ZSghX3RoaXMuX19wcmV2KTtcbiAgICB9XG5cbiAgfTtcblxuICBCb29sZWFuQ29udHJvbGxlci5zdXBlcmNsYXNzID0gQ29udHJvbGxlcjtcblxuICBjb21tb24uZXh0ZW5kKFxuXG4gICAgICBCb29sZWFuQ29udHJvbGxlci5wcm90b3R5cGUsXG4gICAgICBDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAge1xuXG4gICAgICAgIHNldFZhbHVlOiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgdmFyIHRvUmV0dXJuID0gQm9vbGVhbkNvbnRyb2xsZXIuc3VwZXJjbGFzcy5wcm90b3R5cGUuc2V0VmFsdWUuY2FsbCh0aGlzLCB2KTtcbiAgICAgICAgICBpZiAodGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbCh0aGlzLCB0aGlzLmdldFZhbHVlKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9fcHJldiA9IHRoaXMuZ2V0VmFsdWUoKTtcbiAgICAgICAgICByZXR1cm4gdG9SZXR1cm47XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXBkYXRlRGlzcGxheTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKHRoaXMuZ2V0VmFsdWUoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5fX2NoZWNrYm94LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJyk7XG4gICAgICAgICAgICB0aGlzLl9fY2hlY2tib3guY2hlY2tlZCA9IHRydWU7ICAgIFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuX19jaGVja2JveC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIEJvb2xlYW5Db250cm9sbGVyLnN1cGVyY2xhc3MucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkuY2FsbCh0aGlzKTtcblxuICAgICAgICB9XG5cblxuICAgICAgfVxuXG4gICk7XG5cbiAgcmV0dXJuIEJvb2xlYW5Db250cm9sbGVyO1xuXG59KShkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcixcbmRhdC5kb20uZG9tLFxuZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmNvbG9yLnRvU3RyaW5nID0gKGZ1bmN0aW9uIChjb21tb24pIHtcblxuICByZXR1cm4gZnVuY3Rpb24oY29sb3IpIHtcblxuICAgIGlmIChjb2xvci5hID09IDEgfHwgY29tbW9uLmlzVW5kZWZpbmVkKGNvbG9yLmEpKSB7XG5cbiAgICAgIHZhciBzID0gY29sb3IuaGV4LnRvU3RyaW5nKDE2KTtcbiAgICAgIHdoaWxlIChzLmxlbmd0aCA8IDYpIHtcbiAgICAgICAgcyA9ICcwJyArIHM7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnIycgKyBzO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuICdyZ2JhKCcgKyBNYXRoLnJvdW5kKGNvbG9yLnIpICsgJywnICsgTWF0aC5yb3VuZChjb2xvci5nKSArICcsJyArIE1hdGgucm91bmQoY29sb3IuYikgKyAnLCcgKyBjb2xvci5hICsgJyknO1xuXG4gICAgfVxuXG4gIH1cblxufSkoZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LmNvbG9yLmludGVycHJldCA9IChmdW5jdGlvbiAodG9TdHJpbmcsIGNvbW1vbikge1xuXG4gIHZhciByZXN1bHQsIHRvUmV0dXJuO1xuXG4gIHZhciBpbnRlcnByZXQgPSBmdW5jdGlvbigpIHtcblxuICAgIHRvUmV0dXJuID0gZmFsc2U7XG5cbiAgICB2YXIgb3JpZ2luYWwgPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGNvbW1vbi50b0FycmF5KGFyZ3VtZW50cykgOiBhcmd1bWVudHNbMF07XG5cbiAgICBjb21tb24uZWFjaChJTlRFUlBSRVRBVElPTlMsIGZ1bmN0aW9uKGZhbWlseSkge1xuXG4gICAgICBpZiAoZmFtaWx5LmxpdG11cyhvcmlnaW5hbCkpIHtcblxuICAgICAgICBjb21tb24uZWFjaChmYW1pbHkuY29udmVyc2lvbnMsIGZ1bmN0aW9uKGNvbnZlcnNpb24sIGNvbnZlcnNpb25OYW1lKSB7XG5cbiAgICAgICAgICByZXN1bHQgPSBjb252ZXJzaW9uLnJlYWQob3JpZ2luYWwpO1xuXG4gICAgICAgICAgaWYgKHRvUmV0dXJuID09PSBmYWxzZSAmJiByZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0b1JldHVybiA9IHJlc3VsdDtcbiAgICAgICAgICAgIHJlc3VsdC5jb252ZXJzaW9uTmFtZSA9IGNvbnZlcnNpb25OYW1lO1xuICAgICAgICAgICAgcmVzdWx0LmNvbnZlcnNpb24gPSBjb252ZXJzaW9uO1xuICAgICAgICAgICAgcmV0dXJuIGNvbW1vbi5CUkVBSztcblxuICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gY29tbW9uLkJSRUFLO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIHJldHVybiB0b1JldHVybjtcblxuICB9O1xuXG4gIHZhciBJTlRFUlBSRVRBVElPTlMgPSBbXG5cbiAgICAvLyBTdHJpbmdzXG4gICAge1xuXG4gICAgICBsaXRtdXM6IGNvbW1vbi5pc1N0cmluZyxcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBUSFJFRV9DSEFSX0hFWDoge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXiMoW0EtRjAtOV0pKFtBLUYwLTldKShbQS1GMC05XSkkL2kpO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdIRVgnLFxuICAgICAgICAgICAgICBoZXg6IHBhcnNlSW50KFxuICAgICAgICAgICAgICAgICAgJzB4JyArXG4gICAgICAgICAgICAgICAgICAgICAgdGVzdFsxXS50b1N0cmluZygpICsgdGVzdFsxXS50b1N0cmluZygpICtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXN0WzJdLnRvU3RyaW5nKCkgKyB0ZXN0WzJdLnRvU3RyaW5nKCkgK1xuICAgICAgICAgICAgICAgICAgICAgIHRlc3RbM10udG9TdHJpbmcoKSArIHRlc3RbM10udG9TdHJpbmcoKSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfSxcblxuICAgICAgICBTSVhfQ0hBUl9IRVg6IHtcblxuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL14jKFtBLUYwLTldezZ9KSQvaSk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ0hFWCcsXG4gICAgICAgICAgICAgIGhleDogcGFyc2VJbnQoJzB4JyArIHRlc3RbMV0udG9TdHJpbmcoKSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfSxcblxuICAgICAgICBDU1NfUkdCOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9ecmdiXFwoXFxzKiguKylcXHMqLFxccyooLispXFxzKixcXHMqKC4rKVxccypcXCkvKTtcbiAgICAgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgcjogcGFyc2VGbG9hdCh0ZXN0WzFdKSxcbiAgICAgICAgICAgICAgZzogcGFyc2VGbG9hdCh0ZXN0WzJdKSxcbiAgICAgICAgICAgICAgYjogcGFyc2VGbG9hdCh0ZXN0WzNdKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogdG9TdHJpbmdcblxuICAgICAgICB9LFxuXG4gICAgICAgIENTU19SR0JBOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9ecmdiYVxcKFxccyooLispXFxzKixcXHMqKC4rKVxccyosXFxzKiguKylcXHMqXFwsXFxzKiguKylcXHMqXFwpLyk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IHBhcnNlRmxvYXQodGVzdFsxXSksXG4gICAgICAgICAgICAgIGc6IHBhcnNlRmxvYXQodGVzdFsyXSksXG4gICAgICAgICAgICAgIGI6IHBhcnNlRmxvYXQodGVzdFszXSksXG4gICAgICAgICAgICAgIGE6IHBhcnNlRmxvYXQodGVzdFs0XSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gTnVtYmVyc1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNOdW1iZXIsXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgSEVYOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnSEVYJyxcbiAgICAgICAgICAgICAgaGV4OiBvcmlnaW5hbCxcbiAgICAgICAgICAgICAgY29udmVyc2lvbk5hbWU6ICdIRVgnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIGNvbG9yLmhleDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8vIEFycmF5c1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNBcnJheSxcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBSR0JfQVJSQVk6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKG9yaWdpbmFsLmxlbmd0aCAhPSAzKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IG9yaWdpbmFsWzBdLFxuICAgICAgICAgICAgICBnOiBvcmlnaW5hbFsxXSxcbiAgICAgICAgICAgICAgYjogb3JpZ2luYWxbMl1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIFtjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBSR0JBX0FSUkFZOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbC5sZW5ndGggIT0gNCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBvcmlnaW5hbFswXSxcbiAgICAgICAgICAgICAgZzogb3JpZ2luYWxbMV0sXG4gICAgICAgICAgICAgIGI6IG9yaWdpbmFsWzJdLFxuICAgICAgICAgICAgICBhOiBvcmlnaW5hbFszXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gW2NvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIsIGNvbG9yLmFdO1xuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvLyBPYmplY3RzXG4gICAge1xuXG4gICAgICBsaXRtdXM6IGNvbW1vbi5pc09iamVjdCxcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBSR0JBX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnIpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmcpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmIpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmEpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICAgIHI6IG9yaWdpbmFsLnIsXG4gICAgICAgICAgICAgICAgZzogb3JpZ2luYWwuZyxcbiAgICAgICAgICAgICAgICBiOiBvcmlnaW5hbC5iLFxuICAgICAgICAgICAgICAgIGE6IG9yaWdpbmFsLmFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHI6IGNvbG9yLnIsXG4gICAgICAgICAgICAgIGc6IGNvbG9yLmcsXG4gICAgICAgICAgICAgIGI6IGNvbG9yLmIsXG4gICAgICAgICAgICAgIGE6IGNvbG9yLmFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgUkdCX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnIpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmcpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmIpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICAgIHI6IG9yaWdpbmFsLnIsXG4gICAgICAgICAgICAgICAgZzogb3JpZ2luYWwuZyxcbiAgICAgICAgICAgICAgICBiOiBvcmlnaW5hbC5iXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICByOiBjb2xvci5yLFxuICAgICAgICAgICAgICBnOiBjb2xvci5nLFxuICAgICAgICAgICAgICBiOiBjb2xvci5iXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIEhTVkFfT0JKOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuaCkgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwucykgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwudikgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuYSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzcGFjZTogJ0hTVicsXG4gICAgICAgICAgICAgICAgaDogb3JpZ2luYWwuaCxcbiAgICAgICAgICAgICAgICBzOiBvcmlnaW5hbC5zLFxuICAgICAgICAgICAgICAgIHY6IG9yaWdpbmFsLnYsXG4gICAgICAgICAgICAgICAgYTogb3JpZ2luYWwuYVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgaDogY29sb3IuaCxcbiAgICAgICAgICAgICAgczogY29sb3IucyxcbiAgICAgICAgICAgICAgdjogY29sb3IudixcbiAgICAgICAgICAgICAgYTogY29sb3IuYVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBIU1ZfT0JKOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuaCkgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwucykgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwudikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzcGFjZTogJ0hTVicsXG4gICAgICAgICAgICAgICAgaDogb3JpZ2luYWwuaCxcbiAgICAgICAgICAgICAgICBzOiBvcmlnaW5hbC5zLFxuICAgICAgICAgICAgICAgIHY6IG9yaWdpbmFsLnZcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGg6IGNvbG9yLmgsXG4gICAgICAgICAgICAgIHM6IGNvbG9yLnMsXG4gICAgICAgICAgICAgIHY6IGNvbG9yLnZcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG5cblxuICBdO1xuXG4gIHJldHVybiBpbnRlcnByZXQ7XG5cblxufSkoZGF0LmNvbG9yLnRvU3RyaW5nLFxuZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LkdVSSA9IGRhdC5ndWkuR1VJID0gKGZ1bmN0aW9uIChjc3MsIHNhdmVEaWFsb2d1ZUNvbnRlbnRzLCBzdHlsZVNoZWV0LCBjb250cm9sbGVyRmFjdG9yeSwgQ29udHJvbGxlciwgQm9vbGVhbkNvbnRyb2xsZXIsIEZ1bmN0aW9uQ29udHJvbGxlciwgTnVtYmVyQ29udHJvbGxlckJveCwgTnVtYmVyQ29udHJvbGxlclNsaWRlciwgT3B0aW9uQ29udHJvbGxlciwgQ29sb3JDb250cm9sbGVyLCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUsIENlbnRlcmVkRGl2LCBkb20sIGNvbW1vbikge1xuXG4gIGNzcy5pbmplY3Qoc3R5bGVTaGVldCk7XG5cbiAgLyoqIE91dGVyLW1vc3QgY2xhc3NOYW1lIGZvciBHVUkncyAqL1xuICB2YXIgQ1NTX05BTUVTUEFDRSA9ICdkZyc7XG5cbiAgdmFyIEhJREVfS0VZX0NPREUgPSA3MjtcblxuICAvKiogVGhlIG9ubHkgdmFsdWUgc2hhcmVkIGJldHdlZW4gdGhlIEpTIGFuZCBTQ1NTLiBVc2UgY2F1dGlvbi4gKi9cbiAgdmFyIENMT1NFX0JVVFRPTl9IRUlHSFQgPSAyMDtcblxuICB2YXIgREVGQVVMVF9ERUZBVUxUX1BSRVNFVF9OQU1FID0gJ0RlZmF1bHQnO1xuXG4gIHZhciBTVVBQT1JUU19MT0NBTF9TVE9SQUdFID0gKGZ1bmN0aW9uKCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gJ2xvY2FsU3RvcmFnZScgaW4gd2luZG93ICYmIHdpbmRvd1snbG9jYWxTdG9yYWdlJ10gIT09IG51bGw7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSkoKTtcblxuICB2YXIgU0FWRV9ESUFMT0dVRTtcblxuICAvKiogSGF2ZSB3ZSB5ZXQgdG8gY3JlYXRlIGFuIGF1dG9QbGFjZSBHVUk/ICovXG4gIHZhciBhdXRvX3BsYWNlX3ZpcmdpbiA9IHRydWU7XG5cbiAgLyoqIEZpeGVkIHBvc2l0aW9uIGRpdiB0aGF0IGF1dG8gcGxhY2UgR1VJJ3MgZ28gaW5zaWRlICovXG4gIHZhciBhdXRvX3BsYWNlX2NvbnRhaW5lcjtcblxuICAvKiogQXJlIHdlIGhpZGluZyB0aGUgR1VJJ3MgPyAqL1xuICB2YXIgaGlkZSA9IGZhbHNlO1xuXG4gIC8qKiBHVUkncyB3aGljaCBzaG91bGQgYmUgaGlkZGVuICovXG4gIHZhciBoaWRlYWJsZV9ndWlzID0gW107XG5cbiAgLyoqXG4gICAqIEEgbGlnaHR3ZWlnaHQgY29udHJvbGxlciBsaWJyYXJ5IGZvciBKYXZhU2NyaXB0LiBJdCBhbGxvd3MgeW91IHRvIGVhc2lseVxuICAgKiBtYW5pcHVsYXRlIHZhcmlhYmxlcyBhbmQgZmlyZSBmdW5jdGlvbnMgb24gdGhlIGZseS5cbiAgICogQGNsYXNzXG4gICAqXG4gICAqIEBtZW1iZXIgZGF0Lmd1aVxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc11cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtwYXJhbXMubmFtZV0gVGhlIG5hbWUgb2YgdGhpcyBHVUkuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zLmxvYWRdIEpTT04gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgc2F2ZWQgc3RhdGUgb2ZcbiAgICogdGhpcyBHVUkuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3BhcmFtcy5hdXRvPXRydWVdXG4gICAqIEBwYXJhbSB7ZGF0Lmd1aS5HVUl9IFtwYXJhbXMucGFyZW50XSBUaGUgR1VJIEknbSBuZXN0ZWQgaW4uXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3BhcmFtcy5jbG9zZWRdIElmIHRydWUsIHN0YXJ0cyBjbG9zZWRcbiAgICovXG4gIHZhciBHVUkgPSBmdW5jdGlvbihwYXJhbXMpIHtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvKipcbiAgICAgKiBPdXRlcm1vc3QgRE9NIEVsZW1lbnRcbiAgICAgKiBAdHlwZSBET01FbGVtZW50XG4gICAgICovXG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fX3VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX3VsKTtcblxuICAgIGRvbS5hZGRDbGFzcyh0aGlzLmRvbUVsZW1lbnQsIENTU19OQU1FU1BBQ0UpO1xuXG4gICAgLyoqXG4gICAgICogTmVzdGVkIEdVSSdzIGJ5IG5hbWVcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgdGhpcy5fX2ZvbGRlcnMgPSB7fTtcblxuICAgIHRoaXMuX19jb250cm9sbGVycyA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogTGlzdCBvZiBvYmplY3RzIEknbSByZW1lbWJlcmluZyBmb3Igc2F2ZSwgb25seSB1c2VkIGluIHRvcCBsZXZlbCBHVUlcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgdGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzID0gW107XG5cbiAgICAvKipcbiAgICAgKiBNYXBzIHRoZSBpbmRleCBvZiByZW1lbWJlcmVkIG9iamVjdHMgdG8gYSBtYXAgb2YgY29udHJvbGxlcnMsIG9ubHkgdXNlZFxuICAgICAqIGluIHRvcCBsZXZlbCBHVUkuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBpZ25vcmVcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogW1xuICAgICAqICB7XG4gICAgICogICAgcHJvcGVydHlOYW1lOiBDb250cm9sbGVyLFxuICAgICAqICAgIGFub3RoZXJQcm9wZXJ0eU5hbWU6IENvbnRyb2xsZXJcbiAgICAgKiAgfSxcbiAgICAgKiAge1xuICAgICAqICAgIHByb3BlcnR5TmFtZTogQ29udHJvbGxlclxuICAgICAqICB9XG4gICAgICogXVxuICAgICAqL1xuICAgIHRoaXMuX19yZW1lbWJlcmVkT2JqZWN0SW5kZWNlc1RvQ29udHJvbGxlcnMgPSBbXTtcblxuICAgIHRoaXMuX19saXN0ZW5pbmcgPSBbXTtcblxuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcblxuICAgIC8vIERlZmF1bHQgcGFyYW1ldGVyc1xuICAgIHBhcmFtcyA9IGNvbW1vbi5kZWZhdWx0cyhwYXJhbXMsIHtcbiAgICAgIGF1dG9QbGFjZTogdHJ1ZSxcbiAgICAgIHdpZHRoOiBHVUkuREVGQVVMVF9XSURUSFxuICAgIH0pO1xuXG4gICAgcGFyYW1zID0gY29tbW9uLmRlZmF1bHRzKHBhcmFtcywge1xuICAgICAgcmVzaXphYmxlOiBwYXJhbXMuYXV0b1BsYWNlLFxuICAgICAgaGlkZWFibGU6IHBhcmFtcy5hdXRvUGxhY2VcbiAgICB9KTtcblxuXG4gICAgaWYgKCFjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLmxvYWQpKSB7XG5cbiAgICAgIC8vIEV4cGxpY2l0IHByZXNldFxuICAgICAgaWYgKHBhcmFtcy5wcmVzZXQpIHBhcmFtcy5sb2FkLnByZXNldCA9IHBhcmFtcy5wcmVzZXQ7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBwYXJhbXMubG9hZCA9IHsgcHJlc2V0OiBERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUUgfTtcblxuICAgIH1cblxuICAgIGlmIChjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLnBhcmVudCkgJiYgcGFyYW1zLmhpZGVhYmxlKSB7XG4gICAgICBoaWRlYWJsZV9ndWlzLnB1c2godGhpcyk7XG4gICAgfVxuXG4gICAgLy8gT25seSByb290IGxldmVsIEdVSSdzIGFyZSByZXNpemFibGUuXG4gICAgcGFyYW1zLnJlc2l6YWJsZSA9IGNvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMucGFyZW50KSAmJiBwYXJhbXMucmVzaXphYmxlO1xuXG5cbiAgICBpZiAocGFyYW1zLmF1dG9QbGFjZSAmJiBjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLnNjcm9sbGFibGUpKSB7XG4gICAgICBwYXJhbXMuc2Nyb2xsYWJsZSA9IHRydWU7XG4gICAgfVxuLy8gICAgcGFyYW1zLnNjcm9sbGFibGUgPSBjb21tb24uaXNVbmRlZmluZWQocGFyYW1zLnBhcmVudCkgJiYgcGFyYW1zLnNjcm9sbGFibGUgPT09IHRydWU7XG5cbiAgICAvLyBOb3QgcGFydCBvZiBwYXJhbXMgYmVjYXVzZSBJIGRvbid0IHdhbnQgcGVvcGxlIHBhc3NpbmcgdGhpcyBpbiB2aWFcbiAgICAvLyBjb25zdHJ1Y3Rvci4gU2hvdWxkIGJlIGEgJ3JlbWVtYmVyZWQnIHZhbHVlLlxuICAgIHZhciB1c2VfbG9jYWxfc3RvcmFnZSA9XG4gICAgICAgIFNVUFBPUlRTX0xPQ0FMX1NUT1JBR0UgJiZcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGdldExvY2FsU3RvcmFnZUhhc2godGhpcywgJ2lzTG9jYWwnKSkgPT09ICd0cnVlJztcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsXG5cbiAgICAgICAgLyoqIEBsZW5kcyBkYXQuZ3VpLkdVSS5wcm90b3R5cGUgKi9cbiAgICAgICAge1xuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogVGhlIHBhcmVudCA8Y29kZT5HVUk8L2NvZGU+XG4gICAgICAgICAgICogQHR5cGUgZGF0Lmd1aS5HVUlcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBwYXJlbnQ6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJhbXMucGFyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBzY3JvbGxhYmxlOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLnNjcm9sbGFibGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEhhbmRsZXMgPGNvZGU+R1VJPC9jb2RlPidzIGVsZW1lbnQgcGxhY2VtZW50IGZvciB5b3VcbiAgICAgICAgICAgKiBAdHlwZSBCb29sZWFuXG4gICAgICAgICAgICovXG4gICAgICAgICAgYXV0b1BsYWNlOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcGFyYW1zLmF1dG9QbGFjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogVGhlIGlkZW50aWZpZXIgZm9yIGEgc2V0IG9mIHNhdmVkIHZhbHVlc1xuICAgICAgICAgICAqIEB0eXBlIFN0cmluZ1xuICAgICAgICAgICAqL1xuICAgICAgICAgIHByZXNldDoge1xuXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAoX3RoaXMucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmdldFJvb3QoKS5wcmVzZXQ7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5sb2FkLnByZXNldDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgIGlmIChfdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5nZXRSb290KCkucHJlc2V0ID0gdjtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMubG9hZC5wcmVzZXQgPSB2O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNldFByZXNldFNlbGVjdEluZGV4KHRoaXMpO1xuICAgICAgICAgICAgICBfdGhpcy5yZXZlcnQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBUaGUgd2lkdGggb2YgPGNvZGU+R1VJPC9jb2RlPiBlbGVtZW50XG4gICAgICAgICAgICogQHR5cGUgTnVtYmVyXG4gICAgICAgICAgICovXG4gICAgICAgICAgd2lkdGg6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJhbXMud2lkdGg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgIHBhcmFtcy53aWR0aCA9IHY7XG4gICAgICAgICAgICAgIHNldFdpZHRoKF90aGlzLCB2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogVGhlIG5hbWUgb2YgPGNvZGU+R1VJPC9jb2RlPi4gVXNlZCBmb3IgZm9sZGVycy4gaS5lXG4gICAgICAgICAgICogYSBmb2xkZXIncyBuYW1lXG4gICAgICAgICAgICogQHR5cGUgU3RyaW5nXG4gICAgICAgICAgICovXG4gICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy5uYW1lO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICAvLyBUT0RPIENoZWNrIGZvciBjb2xsaXNpb25zIGFtb25nIHNpYmxpbmcgZm9sZGVyc1xuICAgICAgICAgICAgICBwYXJhbXMubmFtZSA9IHY7XG4gICAgICAgICAgICAgIGlmICh0aXRsZV9yb3dfbmFtZSkge1xuICAgICAgICAgICAgICAgIHRpdGxlX3Jvd19uYW1lLmlubmVySFRNTCA9IHBhcmFtcy5uYW1lO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFdoZXRoZXIgdGhlIDxjb2RlPkdVSTwvY29kZT4gaXMgY29sbGFwc2VkIG9yIG5vdFxuICAgICAgICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICBjbG9zZWQ6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJhbXMuY2xvc2VkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICBwYXJhbXMuY2xvc2VkID0gdjtcbiAgICAgICAgICAgICAgaWYgKHBhcmFtcy5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICBkb20uYWRkQ2xhc3MoX3RoaXMuX191bCwgR1VJLkNMQVNTX0NMT1NFRCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9tLnJlbW92ZUNsYXNzKF90aGlzLl9fdWwsIEdVSS5DTEFTU19DTE9TRUQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIEZvciBicm93c2VycyB0aGF0IGFyZW4ndCBnb2luZyB0byByZXNwZWN0IHRoZSBDU1MgdHJhbnNpdGlvbixcbiAgICAgICAgICAgICAgLy8gTGV0cyBqdXN0IGNoZWNrIG91ciBoZWlnaHQgYWdhaW5zdCB0aGUgd2luZG93IGhlaWdodCByaWdodCBvZmZcbiAgICAgICAgICAgICAgLy8gdGhlIGJhdC5cbiAgICAgICAgICAgICAgdGhpcy5vblJlc2l6ZSgpO1xuXG4gICAgICAgICAgICAgIGlmIChfdGhpcy5fX2Nsb3NlQnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX19jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSB2ID8gR1VJLlRFWFRfT1BFTiA6IEdVSS5URVhUX0NMT1NFRDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBDb250YWlucyBhbGwgcHJlc2V0c1xuICAgICAgICAgICAqIEB0eXBlIE9iamVjdFxuICAgICAgICAgICAqL1xuICAgICAgICAgIGxvYWQ6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwYXJhbXMubG9hZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0byB1c2UgPGEgaHJlZj1cImh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0RPTS9TdG9yYWdlI2xvY2FsU3RvcmFnZVwiPmxvY2FsU3RvcmFnZTwvYT4gYXMgdGhlIG1lYW5zIGZvclxuICAgICAgICAgICAqIDxjb2RlPnJlbWVtYmVyPC9jb2RlPmluZ1xuICAgICAgICAgICAqIEB0eXBlIEJvb2xlYW5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICB1c2VMb2NhbFN0b3JhZ2U6IHtcblxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHVzZV9sb2NhbF9zdG9yYWdlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24oYm9vbCkge1xuICAgICAgICAgICAgICBpZiAoU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSkge1xuICAgICAgICAgICAgICAgIHVzZV9sb2NhbF9zdG9yYWdlID0gYm9vbDtcbiAgICAgICAgICAgICAgICBpZiAoYm9vbCkge1xuICAgICAgICAgICAgICAgICAgZG9tLmJpbmQod2luZG93LCAndW5sb2FkJywgc2F2ZVRvTG9jYWxTdG9yYWdlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZG9tLnVuYmluZCh3aW5kb3csICd1bmxvYWQnLCBzYXZlVG9Mb2NhbFN0b3JhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKF90aGlzLCAnaXNMb2NhbCcpLCBib29sKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgLy8gQXJlIHdlIGEgcm9vdCBsZXZlbCBHVUk/XG4gICAgaWYgKGNvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMucGFyZW50KSkge1xuXG4gICAgICBwYXJhbXMuY2xvc2VkID0gZmFsc2U7XG5cbiAgICAgIGRvbS5hZGRDbGFzcyh0aGlzLmRvbUVsZW1lbnQsIEdVSS5DTEFTU19NQUlOKTtcbiAgICAgIGRvbS5tYWtlU2VsZWN0YWJsZSh0aGlzLmRvbUVsZW1lbnQsIGZhbHNlKTtcblxuICAgICAgLy8gQXJlIHdlIHN1cHBvc2VkIHRvIGJlIGxvYWRpbmcgbG9jYWxseT9cbiAgICAgIGlmIChTVVBQT1JUU19MT0NBTF9TVE9SQUdFKSB7XG5cbiAgICAgICAgaWYgKHVzZV9sb2NhbF9zdG9yYWdlKSB7XG5cbiAgICAgICAgICBfdGhpcy51c2VMb2NhbFN0b3JhZ2UgPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIHNhdmVkX2d1aSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGdldExvY2FsU3RvcmFnZUhhc2godGhpcywgJ2d1aScpKTtcblxuICAgICAgICAgIGlmIChzYXZlZF9ndWkpIHtcbiAgICAgICAgICAgIHBhcmFtcy5sb2FkID0gSlNPTi5wYXJzZShzYXZlZF9ndWkpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgICAgdGhpcy5fX2Nsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0aGlzLl9fY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gR1VJLlRFWFRfQ0xPU0VEO1xuICAgICAgZG9tLmFkZENsYXNzKHRoaXMuX19jbG9zZUJ1dHRvbiwgR1VJLkNMQVNTX0NMT1NFX0JVVFRPTik7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX2Nsb3NlQnV0dG9uKTtcblxuICAgICAgZG9tLmJpbmQodGhpcy5fX2Nsb3NlQnV0dG9uLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcblxuICAgICAgICBfdGhpcy5jbG9zZWQgPSAhX3RoaXMuY2xvc2VkO1xuXG5cbiAgICAgIH0pO1xuXG5cbiAgICAgIC8vIE9oLCB5b3UncmUgYSBuZXN0ZWQgR1VJIVxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGlmIChwYXJhbXMuY2xvc2VkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcGFyYW1zLmNsb3NlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHZhciB0aXRsZV9yb3dfbmFtZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHBhcmFtcy5uYW1lKTtcbiAgICAgIGRvbS5hZGRDbGFzcyh0aXRsZV9yb3dfbmFtZSwgJ2NvbnRyb2xsZXItbmFtZScpO1xuXG4gICAgICB2YXIgdGl0bGVfcm93ID0gYWRkUm93KF90aGlzLCB0aXRsZV9yb3dfbmFtZSk7XG5cbiAgICAgIHZhciBvbl9jbGlja190aXRsZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBfdGhpcy5jbG9zZWQgPSAhX3RoaXMuY2xvc2VkO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBkb20uYWRkQ2xhc3ModGhpcy5fX3VsLCBHVUkuQ0xBU1NfQ0xPU0VEKTtcblxuICAgICAgZG9tLmFkZENsYXNzKHRpdGxlX3JvdywgJ3RpdGxlJyk7XG4gICAgICBkb20uYmluZCh0aXRsZV9yb3csICdjbGljaycsIG9uX2NsaWNrX3RpdGxlKTtcblxuICAgICAgaWYgKCFwYXJhbXMuY2xvc2VkKSB7XG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLmF1dG9QbGFjZSkge1xuXG4gICAgICBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5wYXJlbnQpKSB7XG5cbiAgICAgICAgaWYgKGF1dG9fcGxhY2VfdmlyZ2luKSB7XG4gICAgICAgICAgYXV0b19wbGFjZV9jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBkb20uYWRkQ2xhc3MoYXV0b19wbGFjZV9jb250YWluZXIsIENTU19OQU1FU1BBQ0UpO1xuICAgICAgICAgIGRvbS5hZGRDbGFzcyhhdXRvX3BsYWNlX2NvbnRhaW5lciwgR1VJLkNMQVNTX0FVVE9fUExBQ0VfQ09OVEFJTkVSKTtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGF1dG9fcGxhY2VfY29udGFpbmVyKTtcbiAgICAgICAgICBhdXRvX3BsYWNlX3ZpcmdpbiA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUHV0IGl0IGluIHRoZSBkb20gZm9yIHlvdS5cbiAgICAgICAgYXV0b19wbGFjZV9jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5kb21FbGVtZW50KTtcblxuICAgICAgICAvLyBBcHBseSB0aGUgYXV0byBzdHlsZXNcbiAgICAgICAgZG9tLmFkZENsYXNzKHRoaXMuZG9tRWxlbWVudCwgR1VJLkNMQVNTX0FVVE9fUExBQ0UpO1xuXG4gICAgICB9XG5cblxuICAgICAgLy8gTWFrZSBpdCBub3QgZWxhc3RpYy5cbiAgICAgIGlmICghdGhpcy5wYXJlbnQpIHNldFdpZHRoKF90aGlzLCBwYXJhbXMud2lkdGgpO1xuXG4gICAgfVxuXG4gICAgZG9tLmJpbmQod2luZG93LCAncmVzaXplJywgZnVuY3Rpb24oKSB7IF90aGlzLm9uUmVzaXplKCkgfSk7XG4gICAgZG9tLmJpbmQodGhpcy5fX3VsLCAnd2Via2l0VHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uKCkgeyBfdGhpcy5vblJlc2l6ZSgpOyB9KTtcbiAgICBkb20uYmluZCh0aGlzLl9fdWwsICd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24oKSB7IF90aGlzLm9uUmVzaXplKCkgfSk7XG4gICAgZG9tLmJpbmQodGhpcy5fX3VsLCAnb1RyYW5zaXRpb25FbmQnLCBmdW5jdGlvbigpIHsgX3RoaXMub25SZXNpemUoKSB9KTtcbiAgICB0aGlzLm9uUmVzaXplKCk7XG5cblxuICAgIGlmIChwYXJhbXMucmVzaXphYmxlKSB7XG4gICAgICBhZGRSZXNpemVIYW5kbGUodGhpcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2F2ZVRvTG9jYWxTdG9yYWdlKCkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaChfdGhpcywgJ2d1aScpLCBKU09OLnN0cmluZ2lmeShfdGhpcy5nZXRTYXZlT2JqZWN0KCkpKTtcbiAgICB9XG5cbiAgICB2YXIgcm9vdCA9IF90aGlzLmdldFJvb3QoKTtcbiAgICBmdW5jdGlvbiByZXNldFdpZHRoKCkge1xuICAgICAgICB2YXIgcm9vdCA9IF90aGlzLmdldFJvb3QoKTtcbiAgICAgICAgcm9vdC53aWR0aCArPSAxO1xuICAgICAgICBjb21tb24uZGVmZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcm9vdC53aWR0aCAtPSAxO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFwYXJhbXMucGFyZW50KSB7XG4gICAgICAgIHJlc2V0V2lkdGgoKTtcbiAgICAgIH1cblxuICB9O1xuXG4gIEdVSS50b2dnbGVIaWRlID0gZnVuY3Rpb24oKSB7XG5cbiAgICBoaWRlID0gIWhpZGU7XG4gICAgY29tbW9uLmVhY2goaGlkZWFibGVfZ3VpcywgZnVuY3Rpb24oZ3VpKSB7XG4gICAgICBndWkuZG9tRWxlbWVudC5zdHlsZS56SW5kZXggPSBoaWRlID8gLTk5OSA6IDk5OTtcbiAgICAgIGd1aS5kb21FbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBoaWRlID8gMCA6IDE7XG4gICAgfSk7XG4gIH07XG5cbiAgR1VJLkNMQVNTX0FVVE9fUExBQ0UgPSAnYSc7XG4gIEdVSS5DTEFTU19BVVRPX1BMQUNFX0NPTlRBSU5FUiA9ICdhYyc7XG4gIEdVSS5DTEFTU19NQUlOID0gJ21haW4nO1xuICBHVUkuQ0xBU1NfQ09OVFJPTExFUl9ST1cgPSAnY3InO1xuICBHVUkuQ0xBU1NfVE9PX1RBTEwgPSAndGFsbGVyLXRoYW4td2luZG93JztcbiAgR1VJLkNMQVNTX0NMT1NFRCA9ICdjbG9zZWQnO1xuICBHVUkuQ0xBU1NfQ0xPU0VfQlVUVE9OID0gJ2Nsb3NlLWJ1dHRvbic7XG4gIEdVSS5DTEFTU19EUkFHID0gJ2RyYWcnO1xuXG4gIEdVSS5ERUZBVUxUX1dJRFRIID0gMjQ1O1xuICBHVUkuVEVYVF9DTE9TRUQgPSAnQ2xvc2UgQ29udHJvbHMnO1xuICBHVUkuVEVYVF9PUEVOID0gJ09wZW4gQ29udHJvbHMnO1xuXG4gIGRvbS5iaW5kKHdpbmRvdywgJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XG5cbiAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudC50eXBlICE9PSAndGV4dCcgJiZcbiAgICAgICAgKGUud2hpY2ggPT09IEhJREVfS0VZX0NPREUgfHwgZS5rZXlDb2RlID09IEhJREVfS0VZX0NPREUpKSB7XG4gICAgICBHVUkudG9nZ2xlSGlkZSgpO1xuICAgIH1cblxuICB9LCBmYWxzZSk7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgR1VJLnByb3RvdHlwZSxcblxuICAgICAgLyoqIEBsZW5kcyBkYXQuZ3VpLkdVSSAqL1xuICAgICAge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eVxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJ9IFRoZSBuZXcgY29udHJvbGxlciB0aGF0IHdhcyBhZGRlZC5cbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBhZGQ6IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcblxuICAgICAgICAgIHJldHVybiBhZGQoXG4gICAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAgIG9iamVjdCxcbiAgICAgICAgICAgICAgcHJvcGVydHksXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmYWN0b3J5QXJnczogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgKTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0XG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eVxuICAgICAgICAgKiBAcmV0dXJucyB7ZGF0LmNvbnRyb2xsZXJzLkNvbG9yQ29udHJvbGxlcn0gVGhlIG5ldyBjb250cm9sbGVyIHRoYXQgd2FzIGFkZGVkLlxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIGFkZENvbG9yOiBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7XG5cbiAgICAgICAgICByZXR1cm4gYWRkKFxuICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICBvYmplY3QsXG4gICAgICAgICAgICAgIHByb3BlcnR5LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29sb3I6IHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIGNvbnRyb2xsZXJcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKGNvbnRyb2xsZXIpIHtcblxuICAgICAgICAgIC8vIFRPRE8gbGlzdGVuaW5nP1xuICAgICAgICAgIHRoaXMuX191bC5yZW1vdmVDaGlsZChjb250cm9sbGVyLl9fbGkpO1xuICAgICAgICAgIHRoaXMuX19jb250cm9sbGVycy5zbGljZSh0aGlzLl9fY29udHJvbGxlcnMuaW5kZXhPZihjb250cm9sbGVyKSwgMSk7XG4gICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICBjb21tb24uZGVmZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfdGhpcy5vblJlc2l6ZSgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICBpZiAodGhpcy5hdXRvUGxhY2UpIHtcbiAgICAgICAgICAgIGF1dG9fcGxhY2VfY29udGFpbmVyLnJlbW92ZUNoaWxkKHRoaXMuZG9tRWxlbWVudCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICAgICAqIEByZXR1cm5zIHtkYXQuZ3VpLkdVSX0gVGhlIG5ldyBmb2xkZXIuXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBpZiB0aGlzIEdVSSBhbHJlYWR5IGhhcyBhIGZvbGRlciBieSB0aGUgc3BlY2lmaWVkXG4gICAgICAgICAqIG5hbWVcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBhZGRGb2xkZXI6IGZ1bmN0aW9uKG5hbWUpIHtcblxuICAgICAgICAgIC8vIFdlIGhhdmUgdG8gcHJldmVudCBjb2xsaXNpb25zIG9uIG5hbWVzIGluIG9yZGVyIHRvIGhhdmUgYSBrZXlcbiAgICAgICAgICAvLyBieSB3aGljaCB0byByZW1lbWJlciBzYXZlZCB2YWx1ZXNcbiAgICAgICAgICBpZiAodGhpcy5fX2ZvbGRlcnNbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgYWxyZWFkeSBoYXZlIGEgZm9sZGVyIGluIHRoaXMgR1VJIGJ5IHRoZScgK1xuICAgICAgICAgICAgICAgICcgbmFtZSBcIicgKyBuYW1lICsgJ1wiJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIG5ld19ndWlfcGFyYW1zID0geyBuYW1lOiBuYW1lLCBwYXJlbnQ6IHRoaXMgfTtcblxuICAgICAgICAgIC8vIFdlIG5lZWQgdG8gcGFzcyBkb3duIHRoZSBhdXRvUGxhY2UgdHJhaXQgc28gdGhhdCB3ZSBjYW5cbiAgICAgICAgICAvLyBhdHRhY2ggZXZlbnQgbGlzdGVuZXJzIHRvIG9wZW4vY2xvc2UgZm9sZGVyIGFjdGlvbnMgdG9cbiAgICAgICAgICAvLyBlbnN1cmUgdGhhdCBhIHNjcm9sbGJhciBhcHBlYXJzIGlmIHRoZSB3aW5kb3cgaXMgdG9vIHNob3J0LlxuICAgICAgICAgIG5ld19ndWlfcGFyYW1zLmF1dG9QbGFjZSA9IHRoaXMuYXV0b1BsYWNlO1xuXG4gICAgICAgICAgLy8gRG8gd2UgaGF2ZSBzYXZlZCBhcHBlYXJhbmNlIGRhdGEgZm9yIHRoaXMgZm9sZGVyP1xuXG4gICAgICAgICAgaWYgKHRoaXMubG9hZCAmJiAvLyBBbnl0aGluZyBsb2FkZWQ/XG4gICAgICAgICAgICAgIHRoaXMubG9hZC5mb2xkZXJzICYmIC8vIFdhcyBteSBwYXJlbnQgYSBkZWFkLWVuZD9cbiAgICAgICAgICAgICAgdGhpcy5sb2FkLmZvbGRlcnNbbmFtZV0pIHsgLy8gRGlkIGRhZGR5IHJlbWVtYmVyIG1lP1xuXG4gICAgICAgICAgICAvLyBTdGFydCBtZSBjbG9zZWQgaWYgSSB3YXMgY2xvc2VkXG4gICAgICAgICAgICBuZXdfZ3VpX3BhcmFtcy5jbG9zZWQgPSB0aGlzLmxvYWQuZm9sZGVyc1tuYW1lXS5jbG9zZWQ7XG5cbiAgICAgICAgICAgIC8vIFBhc3MgZG93biB0aGUgbG9hZGVkIGRhdGFcbiAgICAgICAgICAgIG5ld19ndWlfcGFyYW1zLmxvYWQgPSB0aGlzLmxvYWQuZm9sZGVyc1tuYW1lXTtcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBndWkgPSBuZXcgR1VJKG5ld19ndWlfcGFyYW1zKTtcbiAgICAgICAgICB0aGlzLl9fZm9sZGVyc1tuYW1lXSA9IGd1aTtcblxuICAgICAgICAgIHZhciBsaSA9IGFkZFJvdyh0aGlzLCBndWkuZG9tRWxlbWVudCk7XG4gICAgICAgICAgZG9tLmFkZENsYXNzKGxpLCAnZm9sZGVyJyk7XG4gICAgICAgICAgcmV0dXJuIGd1aTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIG9wZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBvblJlc2l6ZTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICB2YXIgcm9vdCA9IHRoaXMuZ2V0Um9vdCgpO1xuXG4gICAgICAgICAgaWYgKHJvb3Quc2Nyb2xsYWJsZSkge1xuXG4gICAgICAgICAgICB2YXIgdG9wID0gZG9tLmdldE9mZnNldChyb290Ll9fdWwpLnRvcDtcbiAgICAgICAgICAgIHZhciBoID0gMDtcblxuICAgICAgICAgICAgY29tbW9uLmVhY2gocm9vdC5fX3VsLmNoaWxkTm9kZXMsIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICAgICAgaWYgKCEgKHJvb3QuYXV0b1BsYWNlICYmIG5vZGUgPT09IHJvb3QuX19zYXZlX3JvdykpXG4gICAgICAgICAgICAgICAgaCArPSBkb20uZ2V0SGVpZ2h0KG5vZGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJIZWlnaHQgLSB0b3AgLSBDTE9TRV9CVVRUT05fSEVJR0hUIDwgaCkge1xuICAgICAgICAgICAgICBkb20uYWRkQ2xhc3Mocm9vdC5kb21FbGVtZW50LCBHVUkuQ0xBU1NfVE9PX1RBTEwpO1xuICAgICAgICAgICAgICByb290Ll9fdWwuc3R5bGUuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gdG9wIC0gQ0xPU0VfQlVUVE9OX0hFSUdIVCArICdweCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkb20ucmVtb3ZlQ2xhc3Mocm9vdC5kb21FbGVtZW50LCBHVUkuQ0xBU1NfVE9PX1RBTEwpO1xuICAgICAgICAgICAgICByb290Ll9fdWwuc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJvb3QuX19yZXNpemVfaGFuZGxlKSB7XG4gICAgICAgICAgICBjb21tb24uZGVmZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJvb3QuX19yZXNpemVfaGFuZGxlLnN0eWxlLmhlaWdodCA9IHJvb3QuX191bC5vZmZzZXRIZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJvb3QuX19jbG9zZUJ1dHRvbikge1xuICAgICAgICAgICAgcm9vdC5fX2Nsb3NlQnV0dG9uLnN0eWxlLndpZHRoID0gcm9vdC53aWR0aCArICdweCc7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1hcmsgb2JqZWN0cyBmb3Igc2F2aW5nLiBUaGUgb3JkZXIgb2YgdGhlc2Ugb2JqZWN0cyBjYW5ub3QgY2hhbmdlIGFzXG4gICAgICAgICAqIHRoZSBHVUkgZ3Jvd3MuIFdoZW4gcmVtZW1iZXJpbmcgbmV3IG9iamVjdHMsIGFwcGVuZCB0aGVtIHRvIHRoZSBlbmRcbiAgICAgICAgICogb2YgdGhlIGxpc3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0Li4ufSBvYmplY3RzXG4gICAgICAgICAqIEB0aHJvd3Mge0Vycm9yfSBpZiBub3QgY2FsbGVkIG9uIGEgdG9wIGxldmVsIEdVSS5cbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICByZW1lbWJlcjogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICBpZiAoY29tbW9uLmlzVW5kZWZpbmVkKFNBVkVfRElBTE9HVUUpKSB7XG4gICAgICAgICAgICBTQVZFX0RJQUxPR1VFID0gbmV3IENlbnRlcmVkRGl2KCk7XG4gICAgICAgICAgICBTQVZFX0RJQUxPR1VFLmRvbUVsZW1lbnQuaW5uZXJIVE1MID0gc2F2ZURpYWxvZ3VlQ29udGVudHM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgY2FuIG9ubHkgY2FsbCByZW1lbWJlciBvbiBhIHRvcCBsZXZlbCBHVUkuXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICBjb21tb24uZWFjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpLCBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgIGFkZFNhdmVNZW51KF90aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChfdGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzLmluZGV4T2Yob2JqZWN0KSA9PSAtMSkge1xuICAgICAgICAgICAgICBfdGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzLnB1c2gob2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmICh0aGlzLmF1dG9QbGFjZSkge1xuICAgICAgICAgICAgLy8gU2V0IHNhdmUgcm93IHdpZHRoXG4gICAgICAgICAgICBzZXRXaWR0aCh0aGlzLCB0aGlzLndpZHRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybnMge2RhdC5ndWkuR1VJfSB0aGUgdG9wbW9zdCBwYXJlbnQgR1VJIG9mIGEgbmVzdGVkIEdVSS5cbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBnZXRSb290OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZ3VpID0gdGhpcztcbiAgICAgICAgICB3aGlsZSAoZ3VpLnBhcmVudCkge1xuICAgICAgICAgICAgZ3VpID0gZ3VpLnBhcmVudDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGd1aTtcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHJldHVybnMge09iamVjdH0gYSBKU09OIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnQgc3RhdGUgb2ZcbiAgICAgICAgICogdGhpcyBHVUkgYXMgd2VsbCBhcyBpdHMgcmVtZW1iZXJlZCBwcm9wZXJ0aWVzLlxuICAgICAgICAgKiBAaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIGdldFNhdmVPYmplY3Q6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgdmFyIHRvUmV0dXJuID0gdGhpcy5sb2FkO1xuXG4gICAgICAgICAgdG9SZXR1cm4uY2xvc2VkID0gdGhpcy5jbG9zZWQ7XG5cbiAgICAgICAgICAvLyBBbSBJIHJlbWVtYmVyaW5nIGFueSB2YWx1ZXM/XG4gICAgICAgICAgaWYgKHRoaXMuX19yZW1lbWJlcmVkT2JqZWN0cy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIHRvUmV0dXJuLnByZXNldCA9IHRoaXMucHJlc2V0O1xuXG4gICAgICAgICAgICBpZiAoIXRvUmV0dXJuLnJlbWVtYmVyZWQpIHtcbiAgICAgICAgICAgICAgdG9SZXR1cm4ucmVtZW1iZXJlZCA9IHt9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b1JldHVybi5yZW1lbWJlcmVkW3RoaXMucHJlc2V0XSA9IGdldEN1cnJlbnRQcmVzZXQodGhpcyk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0b1JldHVybi5mb2xkZXJzID0ge307XG4gICAgICAgICAgY29tbW9uLmVhY2godGhpcy5fX2ZvbGRlcnMsIGZ1bmN0aW9uKGVsZW1lbnQsIGtleSkge1xuICAgICAgICAgICAgdG9SZXR1cm4uZm9sZGVyc1trZXldID0gZWxlbWVudC5nZXRTYXZlT2JqZWN0KCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gdG9SZXR1cm47XG5cbiAgICAgICAgfSxcblxuICAgICAgICBzYXZlOiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIGlmICghdGhpcy5sb2FkLnJlbWVtYmVyZWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZC5yZW1lbWJlcmVkID0ge307XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5sb2FkLnJlbWVtYmVyZWRbdGhpcy5wcmVzZXRdID0gZ2V0Q3VycmVudFByZXNldCh0aGlzKTtcbiAgICAgICAgICBtYXJrUHJlc2V0TW9kaWZpZWQodGhpcywgZmFsc2UpO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2F2ZUFzOiBmdW5jdGlvbihwcmVzZXROYW1lKSB7XG5cbiAgICAgICAgICBpZiAoIXRoaXMubG9hZC5yZW1lbWJlcmVkKSB7XG5cbiAgICAgICAgICAgIC8vIFJldGFpbiBkZWZhdWx0IHZhbHVlcyB1cG9uIGZpcnN0IHNhdmVcbiAgICAgICAgICAgIHRoaXMubG9hZC5yZW1lbWJlcmVkID0ge307XG4gICAgICAgICAgICB0aGlzLmxvYWQucmVtZW1iZXJlZFtERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUVdID0gZ2V0Q3VycmVudFByZXNldCh0aGlzLCB0cnVlKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMubG9hZC5yZW1lbWJlcmVkW3ByZXNldE5hbWVdID0gZ2V0Q3VycmVudFByZXNldCh0aGlzKTtcbiAgICAgICAgICB0aGlzLnByZXNldCA9IHByZXNldE5hbWU7XG4gICAgICAgICAgYWRkUHJlc2V0T3B0aW9uKHRoaXMsIHByZXNldE5hbWUsIHRydWUpO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgcmV2ZXJ0OiBmdW5jdGlvbihndWkpIHtcblxuICAgICAgICAgIGNvbW1vbi5lYWNoKHRoaXMuX19jb250cm9sbGVycywgZnVuY3Rpb24oY29udHJvbGxlcikge1xuICAgICAgICAgICAgLy8gTWFrZSByZXZlcnQgd29yayBvbiBEZWZhdWx0LlxuICAgICAgICAgICAgaWYgKCF0aGlzLmdldFJvb3QoKS5sb2FkLnJlbWVtYmVyZWQpIHtcbiAgICAgICAgICAgICAgY29udHJvbGxlci5zZXRWYWx1ZShjb250cm9sbGVyLmluaXRpYWxWYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZWNhbGxTYXZlZFZhbHVlKGd1aSB8fCB0aGlzLmdldFJvb3QoKSwgY29udHJvbGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgICBjb21tb24uZWFjaCh0aGlzLl9fZm9sZGVycywgZnVuY3Rpb24oZm9sZGVyKSB7XG4gICAgICAgICAgICBmb2xkZXIucmV2ZXJ0KGZvbGRlcik7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoIWd1aSkge1xuICAgICAgICAgICAgbWFya1ByZXNldE1vZGlmaWVkKHRoaXMuZ2V0Um9vdCgpLCBmYWxzZSk7XG4gICAgICAgICAgfVxuXG5cbiAgICAgICAgfSxcblxuICAgICAgICBsaXN0ZW46IGZ1bmN0aW9uKGNvbnRyb2xsZXIpIHtcblxuICAgICAgICAgIHZhciBpbml0ID0gdGhpcy5fX2xpc3RlbmluZy5sZW5ndGggPT0gMDtcbiAgICAgICAgICB0aGlzLl9fbGlzdGVuaW5nLnB1c2goY29udHJvbGxlcik7XG4gICAgICAgICAgaWYgKGluaXQpIHVwZGF0ZURpc3BsYXlzKHRoaXMuX19saXN0ZW5pbmcpO1xuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICk7XG5cbiAgZnVuY3Rpb24gYWRkKGd1aSwgb2JqZWN0LCBwcm9wZXJ0eSwgcGFyYW1zKSB7XG5cbiAgICBpZiAob2JqZWN0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPYmplY3QgXCIgKyBvYmplY3QgKyBcIiBoYXMgbm8gcHJvcGVydHkgXFxcIlwiICsgcHJvcGVydHkgKyBcIlxcXCJcIik7XG4gICAgfVxuXG4gICAgdmFyIGNvbnRyb2xsZXI7XG5cbiAgICBpZiAocGFyYW1zLmNvbG9yKSB7XG5cbiAgICAgIGNvbnRyb2xsZXIgPSBuZXcgQ29sb3JDb250cm9sbGVyKG9iamVjdCwgcHJvcGVydHkpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdmFyIGZhY3RvcnlBcmdzID0gW29iamVjdCxwcm9wZXJ0eV0uY29uY2F0KHBhcmFtcy5mYWN0b3J5QXJncyk7XG4gICAgICBjb250cm9sbGVyID0gY29udHJvbGxlckZhY3RvcnkuYXBwbHkoZ3VpLCBmYWN0b3J5QXJncyk7XG5cbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLmJlZm9yZSBpbnN0YW5jZW9mIENvbnRyb2xsZXIpIHtcbiAgICAgIHBhcmFtcy5iZWZvcmUgPSBwYXJhbXMuYmVmb3JlLl9fbGk7XG4gICAgfVxuXG4gICAgcmVjYWxsU2F2ZWRWYWx1ZShndWksIGNvbnRyb2xsZXIpO1xuXG4gICAgZG9tLmFkZENsYXNzKGNvbnRyb2xsZXIuZG9tRWxlbWVudCwgJ2MnKTtcblxuICAgIHZhciBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGRvbS5hZGRDbGFzcyhuYW1lLCAncHJvcGVydHktbmFtZScpO1xuICAgIG5hbWUuaW5uZXJIVE1MID0gY29udHJvbGxlci5wcm9wZXJ0eTtcblxuICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobmFtZSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRyb2xsZXIuZG9tRWxlbWVudCk7XG5cbiAgICB2YXIgbGkgPSBhZGRSb3coZ3VpLCBjb250YWluZXIsIHBhcmFtcy5iZWZvcmUpO1xuXG4gICAgZG9tLmFkZENsYXNzKGxpLCBHVUkuQ0xBU1NfQ09OVFJPTExFUl9ST1cpO1xuICAgIGRvbS5hZGRDbGFzcyhsaSwgdHlwZW9mIGNvbnRyb2xsZXIuZ2V0VmFsdWUoKSk7XG5cbiAgICBhdWdtZW50Q29udHJvbGxlcihndWksIGxpLCBjb250cm9sbGVyKTtcblxuICAgIGd1aS5fX2NvbnRyb2xsZXJzLnB1c2goY29udHJvbGxlcik7XG5cbiAgICByZXR1cm4gY29udHJvbGxlcjtcblxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIHJvdyB0byB0aGUgZW5kIG9mIHRoZSBHVUkgb3IgYmVmb3JlIGFub3RoZXIgcm93LlxuICAgKlxuICAgKiBAcGFyYW0gZ3VpXG4gICAqIEBwYXJhbSBbZG9tXSBJZiBzcGVjaWZpZWQsIGluc2VydHMgdGhlIGRvbSBjb250ZW50IGluIHRoZSBuZXcgcm93XG4gICAqIEBwYXJhbSBbbGlCZWZvcmVdIElmIHNwZWNpZmllZCwgcGxhY2VzIHRoZSBuZXcgcm93IGJlZm9yZSBhbm90aGVyIHJvd1xuICAgKi9cbiAgZnVuY3Rpb24gYWRkUm93KGd1aSwgZG9tLCBsaUJlZm9yZSkge1xuICAgIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgaWYgKGRvbSkgbGkuYXBwZW5kQ2hpbGQoZG9tKTtcbiAgICBpZiAobGlCZWZvcmUpIHtcbiAgICAgIGd1aS5fX3VsLmluc2VydEJlZm9yZShsaSwgcGFyYW1zLmJlZm9yZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGd1aS5fX3VsLmFwcGVuZENoaWxkKGxpKTtcbiAgICB9XG4gICAgZ3VpLm9uUmVzaXplKCk7XG4gICAgcmV0dXJuIGxpO1xuICB9XG5cbiAgZnVuY3Rpb24gYXVnbWVudENvbnRyb2xsZXIoZ3VpLCBsaSwgY29udHJvbGxlcikge1xuXG4gICAgY29udHJvbGxlci5fX2xpID0gbGk7XG4gICAgY29udHJvbGxlci5fX2d1aSA9IGd1aTtcblxuICAgIGNvbW1vbi5leHRlbmQoY29udHJvbGxlciwge1xuXG4gICAgICBvcHRpb25zOiBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgY29udHJvbGxlci5yZW1vdmUoKTtcblxuICAgICAgICAgIHJldHVybiBhZGQoXG4gICAgICAgICAgICAgIGd1aSxcbiAgICAgICAgICAgICAgY29udHJvbGxlci5vYmplY3QsXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIucHJvcGVydHksXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBiZWZvcmU6IGNvbnRyb2xsZXIuX19saS5uZXh0RWxlbWVudFNpYmxpbmcsXG4gICAgICAgICAgICAgICAgZmFjdG9yeUFyZ3M6IFtjb21tb24udG9BcnJheShhcmd1bWVudHMpXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbW1vbi5pc0FycmF5KG9wdGlvbnMpIHx8IGNvbW1vbi5pc09iamVjdChvcHRpb25zKSkge1xuICAgICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlKCk7XG5cbiAgICAgICAgICByZXR1cm4gYWRkKFxuICAgICAgICAgICAgICBndWksXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIub2JqZWN0LFxuICAgICAgICAgICAgICBjb250cm9sbGVyLnByb3BlcnR5LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYmVmb3JlOiBjb250cm9sbGVyLl9fbGkubmV4dEVsZW1lbnRTaWJsaW5nLFxuICAgICAgICAgICAgICAgIGZhY3RvcnlBcmdzOiBbb3B0aW9uc11cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9LFxuXG4gICAgICBuYW1lOiBmdW5jdGlvbih2KSB7XG4gICAgICAgIGNvbnRyb2xsZXIuX19saS5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5pbm5lckhUTUwgPSB2O1xuICAgICAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgICAgIH0sXG5cbiAgICAgIGxpc3RlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRyb2xsZXIuX19ndWkubGlzdGVuKGNvbnRyb2xsZXIpO1xuICAgICAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgICAgIH0sXG5cbiAgICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnRyb2xsZXIuX19ndWkucmVtb3ZlKGNvbnRyb2xsZXIpO1xuICAgICAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgLy8gQWxsIHNsaWRlcnMgc2hvdWxkIGJlIGFjY29tcGFuaWVkIGJ5IGEgYm94LlxuICAgIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgTnVtYmVyQ29udHJvbGxlclNsaWRlcikge1xuXG4gICAgICB2YXIgYm94ID0gbmV3IE51bWJlckNvbnRyb2xsZXJCb3goY29udHJvbGxlci5vYmplY3QsIGNvbnRyb2xsZXIucHJvcGVydHksXG4gICAgICAgICAgeyBtaW46IGNvbnRyb2xsZXIuX19taW4sIG1heDogY29udHJvbGxlci5fX21heCwgc3RlcDogY29udHJvbGxlci5fX3N0ZXAgfSk7XG5cbiAgICAgIGNvbW1vbi5lYWNoKFsndXBkYXRlRGlzcGxheScsICdvbkNoYW5nZScsICdvbkZpbmlzaENoYW5nZSddLCBmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgdmFyIHBjID0gY29udHJvbGxlclttZXRob2RdO1xuICAgICAgICB2YXIgcGIgPSBib3hbbWV0aG9kXTtcbiAgICAgICAgY29udHJvbGxlclttZXRob2RdID0gYm94W21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgcGMuYXBwbHkoY29udHJvbGxlciwgYXJncyk7XG4gICAgICAgICAgcmV0dXJuIHBiLmFwcGx5KGJveCwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBkb20uYWRkQ2xhc3MobGksICdoYXMtc2xpZGVyJyk7XG4gICAgICBjb250cm9sbGVyLmRvbUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGJveC5kb21FbGVtZW50LCBjb250cm9sbGVyLmRvbUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpO1xuXG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBOdW1iZXJDb250cm9sbGVyQm94KSB7XG5cbiAgICAgIHZhciByID0gZnVuY3Rpb24ocmV0dXJuZWQpIHtcblxuICAgICAgICAvLyBIYXZlIHdlIGRlZmluZWQgYm90aCBib3VuZGFyaWVzP1xuICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKGNvbnRyb2xsZXIuX19taW4pICYmIGNvbW1vbi5pc051bWJlcihjb250cm9sbGVyLl9fbWF4KSkge1xuXG4gICAgICAgICAgLy8gV2VsbCwgdGhlbiBsZXRzIGp1c3QgcmVwbGFjZSB0aGlzIHdpdGggYSBzbGlkZXIuXG4gICAgICAgICAgY29udHJvbGxlci5yZW1vdmUoKTtcbiAgICAgICAgICByZXR1cm4gYWRkKFxuICAgICAgICAgICAgICBndWksXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIub2JqZWN0LFxuICAgICAgICAgICAgICBjb250cm9sbGVyLnByb3BlcnR5LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYmVmb3JlOiBjb250cm9sbGVyLl9fbGkubmV4dEVsZW1lbnRTaWJsaW5nLFxuICAgICAgICAgICAgICAgIGZhY3RvcnlBcmdzOiBbY29udHJvbGxlci5fX21pbiwgY29udHJvbGxlci5fX21heCwgY29udHJvbGxlci5fX3N0ZXBdXG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0dXJuZWQ7XG5cbiAgICAgIH07XG5cbiAgICAgIGNvbnRyb2xsZXIubWluID0gY29tbW9uLmNvbXBvc2UociwgY29udHJvbGxlci5taW4pO1xuICAgICAgY29udHJvbGxlci5tYXggPSBjb21tb24uY29tcG9zZShyLCBjb250cm9sbGVyLm1heCk7XG5cbiAgICB9XG4gICAgZWxzZSBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIEJvb2xlYW5Db250cm9sbGVyKSB7XG5cbiAgICAgIGRvbS5iaW5kKGxpLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZG9tLmZha2VFdmVudChjb250cm9sbGVyLl9fY2hlY2tib3gsICdjbGljaycpO1xuICAgICAgfSk7XG5cbiAgICAgIGRvbS5iaW5kKGNvbnRyb2xsZXIuX19jaGVja2JveCwgJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpOyAvLyBQcmV2ZW50cyBkb3VibGUtdG9nZ2xlXG4gICAgICB9KVxuXG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBGdW5jdGlvbkNvbnRyb2xsZXIpIHtcblxuICAgICAgZG9tLmJpbmQobGksICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBkb20uZmFrZUV2ZW50KGNvbnRyb2xsZXIuX19idXR0b24sICdjbGljaycpO1xuICAgICAgfSk7XG5cbiAgICAgIGRvbS5iaW5kKGxpLCAnbW91c2VvdmVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvbS5hZGRDbGFzcyhjb250cm9sbGVyLl9fYnV0dG9uLCAnaG92ZXInKTtcbiAgICAgIH0pO1xuXG4gICAgICBkb20uYmluZChsaSwgJ21vdXNlb3V0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvbS5yZW1vdmVDbGFzcyhjb250cm9sbGVyLl9fYnV0dG9uLCAnaG92ZXInKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBDb2xvckNvbnRyb2xsZXIpIHtcblxuICAgICAgZG9tLmFkZENsYXNzKGxpLCAnY29sb3InKTtcbiAgICAgIGNvbnRyb2xsZXIudXBkYXRlRGlzcGxheSA9IGNvbW1vbi5jb21wb3NlKGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgbGkuc3R5bGUuYm9yZGVyTGVmdENvbG9yID0gY29udHJvbGxlci5fX2NvbG9yLnRvU3RyaW5nKCk7XG4gICAgICAgIHJldHVybiByO1xuICAgICAgfSwgY29udHJvbGxlci51cGRhdGVEaXNwbGF5KTtcblxuICAgICAgY29udHJvbGxlci51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICB9XG5cbiAgICBjb250cm9sbGVyLnNldFZhbHVlID0gY29tbW9uLmNvbXBvc2UoZnVuY3Rpb24ocikge1xuICAgICAgaWYgKGd1aS5nZXRSb290KCkuX19wcmVzZXRfc2VsZWN0ICYmIGNvbnRyb2xsZXIuaXNNb2RpZmllZCgpKSB7XG4gICAgICAgIG1hcmtQcmVzZXRNb2RpZmllZChndWkuZ2V0Um9vdCgpLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByO1xuICAgIH0sIGNvbnRyb2xsZXIuc2V0VmFsdWUpO1xuXG4gIH1cblxuICBmdW5jdGlvbiByZWNhbGxTYXZlZFZhbHVlKGd1aSwgY29udHJvbGxlcikge1xuXG4gICAgLy8gRmluZCB0aGUgdG9wbW9zdCBHVUksIHRoYXQncyB3aGVyZSByZW1lbWJlcmVkIG9iamVjdHMgbGl2ZS5cbiAgICB2YXIgcm9vdCA9IGd1aS5nZXRSb290KCk7XG5cbiAgICAvLyBEb2VzIHRoZSBvYmplY3Qgd2UncmUgY29udHJvbGxpbmcgbWF0Y2ggYW55dGhpbmcgd2UndmUgYmVlbiB0b2xkIHRvXG4gICAgLy8gcmVtZW1iZXI/XG4gICAgdmFyIG1hdGNoZWRfaW5kZXggPSByb290Ll9fcmVtZW1iZXJlZE9iamVjdHMuaW5kZXhPZihjb250cm9sbGVyLm9iamVjdCk7XG5cbiAgICAvLyBXaHkgeWVzLCBpdCBkb2VzIVxuICAgIGlmIChtYXRjaGVkX2luZGV4ICE9IC0xKSB7XG5cbiAgICAgIC8vIExldCBtZSBmZXRjaCBhIG1hcCBvZiBjb250cm9sbGVycyBmb3IgdGhjb21tb24uaXNPYmplY3QuXG4gICAgICB2YXIgY29udHJvbGxlcl9tYXAgPVxuICAgICAgICAgIHJvb3QuX19yZW1lbWJlcmVkT2JqZWN0SW5kZWNlc1RvQ29udHJvbGxlcnNbbWF0Y2hlZF9pbmRleF07XG5cbiAgICAgIC8vIE9ocCwgSSBiZWxpZXZlIHRoaXMgaXMgdGhlIGZpcnN0IGNvbnRyb2xsZXIgd2UndmUgY3JlYXRlZCBmb3IgdGhpc1xuICAgICAgLy8gb2JqZWN0LiBMZXRzIG1ha2UgdGhlIG1hcCBmcmVzaC5cbiAgICAgIGlmIChjb250cm9sbGVyX21hcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnRyb2xsZXJfbWFwID0ge307XG4gICAgICAgIHJvb3QuX19yZW1lbWJlcmVkT2JqZWN0SW5kZWNlc1RvQ29udHJvbGxlcnNbbWF0Y2hlZF9pbmRleF0gPVxuICAgICAgICAgICAgY29udHJvbGxlcl9tYXA7XG4gICAgICB9XG5cbiAgICAgIC8vIEtlZXAgdHJhY2sgb2YgdGhpcyBjb250cm9sbGVyXG4gICAgICBjb250cm9sbGVyX21hcFtjb250cm9sbGVyLnByb3BlcnR5XSA9IGNvbnRyb2xsZXI7XG5cbiAgICAgIC8vIE9rYXksIG5vdyBoYXZlIHdlIHNhdmVkIGFueSB2YWx1ZXMgZm9yIHRoaXMgY29udHJvbGxlcj9cbiAgICAgIGlmIChyb290LmxvYWQgJiYgcm9vdC5sb2FkLnJlbWVtYmVyZWQpIHtcblxuICAgICAgICB2YXIgcHJlc2V0X21hcCA9IHJvb3QubG9hZC5yZW1lbWJlcmVkO1xuXG4gICAgICAgIC8vIFdoaWNoIHByZXNldCBhcmUgd2UgdHJ5aW5nIHRvIGxvYWQ/XG4gICAgICAgIHZhciBwcmVzZXQ7XG5cbiAgICAgICAgaWYgKHByZXNldF9tYXBbZ3VpLnByZXNldF0pIHtcblxuICAgICAgICAgIHByZXNldCA9IHByZXNldF9tYXBbZ3VpLnByZXNldF07XG5cbiAgICAgICAgfSBlbHNlIGlmIChwcmVzZXRfbWFwW0RFRkFVTFRfREVGQVVMVF9QUkVTRVRfTkFNRV0pIHtcblxuICAgICAgICAgIC8vIFVoaCwgeW91IGNhbiBoYXZlIHRoZSBkZWZhdWx0IGluc3RlYWQ/XG4gICAgICAgICAgcHJlc2V0ID0gcHJlc2V0X21hcFtERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUVdO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAvLyBOYWRhLlxuXG4gICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIERpZCB0aGUgbG9hZGVkIG9iamVjdCByZW1lbWJlciB0aGNvbW1vbi5pc09iamVjdD9cbiAgICAgICAgaWYgKHByZXNldFttYXRjaGVkX2luZGV4XSAmJlxuXG4gICAgICAgICAgLy8gRGlkIHdlIHJlbWVtYmVyIHRoaXMgcGFydGljdWxhciBwcm9wZXJ0eT9cbiAgICAgICAgICAgIHByZXNldFttYXRjaGVkX2luZGV4XVtjb250cm9sbGVyLnByb3BlcnR5XSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAvLyBXZSBkaWQgcmVtZW1iZXIgc29tZXRoaW5nIGZvciB0aGlzIGd1eSAuLi5cbiAgICAgICAgICB2YXIgdmFsdWUgPSBwcmVzZXRbbWF0Y2hlZF9pbmRleF1bY29udHJvbGxlci5wcm9wZXJ0eV07XG5cbiAgICAgICAgICAvLyBBbmQgdGhhdCdzIHdoYXQgaXQgaXMuXG4gICAgICAgICAgY29udHJvbGxlci5pbml0aWFsVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICBjb250cm9sbGVyLnNldFZhbHVlKHZhbHVlKTtcblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TG9jYWxTdG9yYWdlSGFzaChndWksIGtleSkge1xuICAgIC8vIFRPRE8gaG93IGRvZXMgdGhpcyBkZWFsIHdpdGggbXVsdGlwbGUgR1VJJ3M/XG4gICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgKyAnLicgKyBrZXk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFNhdmVNZW51KGd1aSkge1xuXG4gICAgdmFyIGRpdiA9IGd1aS5fX3NhdmVfcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblxuICAgIGRvbS5hZGRDbGFzcyhndWkuZG9tRWxlbWVudCwgJ2hhcy1zYXZlJyk7XG5cbiAgICBndWkuX191bC5pbnNlcnRCZWZvcmUoZGl2LCBndWkuX191bC5maXJzdENoaWxkKTtcblxuICAgIGRvbS5hZGRDbGFzcyhkaXYsICdzYXZlLXJvdycpO1xuXG4gICAgdmFyIGdlYXJzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGdlYXJzLmlubmVySFRNTCA9ICcmbmJzcDsnO1xuICAgIGRvbS5hZGRDbGFzcyhnZWFycywgJ2J1dHRvbiBnZWFycycpO1xuXG4gICAgLy8gVE9ETyByZXBsYWNlIHdpdGggRnVuY3Rpb25Db250cm9sbGVyXG4gICAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBidXR0b24uaW5uZXJIVE1MID0gJ1NhdmUnO1xuICAgIGRvbS5hZGRDbGFzcyhidXR0b24sICdidXR0b24nKTtcbiAgICBkb20uYWRkQ2xhc3MoYnV0dG9uLCAnc2F2ZScpO1xuXG4gICAgdmFyIGJ1dHRvbjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgYnV0dG9uMi5pbm5lckhUTUwgPSAnTmV3JztcbiAgICBkb20uYWRkQ2xhc3MoYnV0dG9uMiwgJ2J1dHRvbicpO1xuICAgIGRvbS5hZGRDbGFzcyhidXR0b24yLCAnc2F2ZS1hcycpO1xuXG4gICAgdmFyIGJ1dHRvbjMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgYnV0dG9uMy5pbm5lckhUTUwgPSAnUmV2ZXJ0JztcbiAgICBkb20uYWRkQ2xhc3MoYnV0dG9uMywgJ2J1dHRvbicpO1xuICAgIGRvbS5hZGRDbGFzcyhidXR0b24zLCAncmV2ZXJ0Jyk7XG5cbiAgICB2YXIgc2VsZWN0ID0gZ3VpLl9fcHJlc2V0X3NlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuXG4gICAgaWYgKGd1aS5sb2FkICYmIGd1aS5sb2FkLnJlbWVtYmVyZWQpIHtcblxuICAgICAgY29tbW9uLmVhY2goZ3VpLmxvYWQucmVtZW1iZXJlZCwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICBhZGRQcmVzZXRPcHRpb24oZ3VpLCBrZXksIGtleSA9PSBndWkucHJlc2V0KTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZFByZXNldE9wdGlvbihndWksIERFRkFVTFRfREVGQVVMVF9QUkVTRVRfTkFNRSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGRvbS5iaW5kKHNlbGVjdCwgJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuXG5cbiAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBndWkuX19wcmVzZXRfc2VsZWN0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBndWkuX19wcmVzZXRfc2VsZWN0W2luZGV4XS5pbm5lckhUTUwgPSBndWkuX19wcmVzZXRfc2VsZWN0W2luZGV4XS52YWx1ZTtcbiAgICAgIH1cblxuICAgICAgZ3VpLnByZXNldCA9IHRoaXMudmFsdWU7XG5cbiAgICB9KTtcblxuICAgIGRpdi5hcHBlbmRDaGlsZChzZWxlY3QpO1xuICAgIGRpdi5hcHBlbmRDaGlsZChnZWFycyk7XG4gICAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbjIpO1xuICAgIGRpdi5hcHBlbmRDaGlsZChidXR0b24zKTtcblxuICAgIGlmIChTVVBQT1JUU19MT0NBTF9TVE9SQUdFKSB7XG5cbiAgICAgIHZhciBzYXZlTG9jYWxseSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZy1zYXZlLWxvY2FsbHknKTtcbiAgICAgIHZhciBleHBsYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RnLWxvY2FsLWV4cGxhaW4nKTtcblxuICAgICAgc2F2ZUxvY2FsbHkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgIHZhciBsb2NhbFN0b3JhZ2VDaGVja0JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZy1sb2NhbC1zdG9yYWdlJyk7XG5cbiAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKGd1aSwgJ2lzTG9jYWwnKSkgPT09ICd0cnVlJykge1xuICAgICAgICBsb2NhbFN0b3JhZ2VDaGVja0JveC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzaG93SGlkZUV4cGxhaW4oKSB7XG4gICAgICAgIGV4cGxhaW4uc3R5bGUuZGlzcGxheSA9IGd1aS51c2VMb2NhbFN0b3JhZ2UgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgICAgfVxuXG4gICAgICBzaG93SGlkZUV4cGxhaW4oKTtcblxuICAgICAgLy8gVE9ETzogVXNlIGEgYm9vbGVhbiBjb250cm9sbGVyLCBmb29sIVxuICAgICAgZG9tLmJpbmQobG9jYWxTdG9yYWdlQ2hlY2tCb3gsICdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZ3VpLnVzZUxvY2FsU3RvcmFnZSA9ICFndWkudXNlTG9jYWxTdG9yYWdlO1xuICAgICAgICBzaG93SGlkZUV4cGxhaW4oKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgdmFyIG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGctbmV3LWNvbnN0cnVjdG9yJyk7XG5cbiAgICBkb20uYmluZChuZXdDb25zdHJ1Y3RvclRleHRBcmVhLCAna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChlLm1ldGFLZXkgJiYgKGUud2hpY2ggPT09IDY3IHx8IGUua2V5Q29kZSA9PSA2NykpIHtcbiAgICAgICAgU0FWRV9ESUFMT0dVRS5oaWRlKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBkb20uYmluZChnZWFycywgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBuZXdDb25zdHJ1Y3RvclRleHRBcmVhLmlubmVySFRNTCA9IEpTT04uc3RyaW5naWZ5KGd1aS5nZXRTYXZlT2JqZWN0KCksIHVuZGVmaW5lZCwgMik7XG4gICAgICBTQVZFX0RJQUxPR1VFLnNob3coKTtcbiAgICAgIG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEuZm9jdXMoKTtcbiAgICAgIG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEuc2VsZWN0KCk7XG4gICAgfSk7XG5cbiAgICBkb20uYmluZChidXR0b24sICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgZ3VpLnNhdmUoKTtcbiAgICB9KTtcblxuICAgIGRvbS5iaW5kKGJ1dHRvbjIsICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHByZXNldE5hbWUgPSBwcm9tcHQoJ0VudGVyIGEgbmV3IHByZXNldCBuYW1lLicpO1xuICAgICAgaWYgKHByZXNldE5hbWUpIGd1aS5zYXZlQXMocHJlc2V0TmFtZSk7XG4gICAgfSk7XG5cbiAgICBkb20uYmluZChidXR0b24zLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIGd1aS5yZXZlcnQoKTtcbiAgICB9KTtcblxuLy8gICAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbjIpO1xuXG4gIH1cblxuICBmdW5jdGlvbiBhZGRSZXNpemVIYW5kbGUoZ3VpKSB7XG5cbiAgICBndWkuX19yZXNpemVfaGFuZGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBjb21tb24uZXh0ZW5kKGd1aS5fX3Jlc2l6ZV9oYW5kbGUuc3R5bGUsIHtcblxuICAgICAgd2lkdGg6ICc2cHgnLFxuICAgICAgbWFyZ2luTGVmdDogJy0zcHgnLFxuICAgICAgaGVpZ2h0OiAnMjAwcHgnLFxuICAgICAgY3Vyc29yOiAnZXctcmVzaXplJyxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4vLyAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBibHVlJ1xuXG4gICAgfSk7XG5cbiAgICB2YXIgcG1vdXNlWDtcblxuICAgIGRvbS5iaW5kKGd1aS5fX3Jlc2l6ZV9oYW5kbGUsICdtb3VzZWRvd24nLCBkcmFnU3RhcnQpO1xuICAgIGRvbS5iaW5kKGd1aS5fX2Nsb3NlQnV0dG9uLCAnbW91c2Vkb3duJywgZHJhZ1N0YXJ0KTtcblxuICAgIGd1aS5kb21FbGVtZW50Lmluc2VydEJlZm9yZShndWkuX19yZXNpemVfaGFuZGxlLCBndWkuZG9tRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCk7XG5cbiAgICBmdW5jdGlvbiBkcmFnU3RhcnQoZSkge1xuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHBtb3VzZVggPSBlLmNsaWVudFg7XG5cbiAgICAgIGRvbS5hZGRDbGFzcyhndWkuX19jbG9zZUJ1dHRvbiwgR1VJLkNMQVNTX0RSQUcpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgZHJhZyk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZXVwJywgZHJhZ1N0b3ApO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmFnKGUpIHtcblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBndWkud2lkdGggKz0gcG1vdXNlWCAtIGUuY2xpZW50WDtcbiAgICAgIGd1aS5vblJlc2l6ZSgpO1xuICAgICAgcG1vdXNlWCA9IGUuY2xpZW50WDtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhZ1N0b3AoKSB7XG5cbiAgICAgIGRvbS5yZW1vdmVDbGFzcyhndWkuX19jbG9zZUJ1dHRvbiwgR1VJLkNMQVNTX0RSQUcpO1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBkcmFnKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIGRyYWdTdG9wKTtcblxuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gc2V0V2lkdGgoZ3VpLCB3KSB7XG4gICAgZ3VpLmRvbUVsZW1lbnQuc3R5bGUud2lkdGggPSB3ICsgJ3B4JztcbiAgICAvLyBBdXRvIHBsYWNlZCBzYXZlLXJvd3MgYXJlIHBvc2l0aW9uIGZpeGVkLCBzbyB3ZSBoYXZlIHRvXG4gICAgLy8gc2V0IHRoZSB3aWR0aCBtYW51YWxseSBpZiB3ZSB3YW50IGl0IHRvIGJsZWVkIHRvIHRoZSBlZGdlXG4gICAgaWYgKGd1aS5fX3NhdmVfcm93ICYmIGd1aS5hdXRvUGxhY2UpIHtcbiAgICAgIGd1aS5fX3NhdmVfcm93LnN0eWxlLndpZHRoID0gdyArICdweCc7XG4gICAgfWlmIChndWkuX19jbG9zZUJ1dHRvbikge1xuICAgICAgZ3VpLl9fY2xvc2VCdXR0b24uc3R5bGUud2lkdGggPSB3ICsgJ3B4JztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDdXJyZW50UHJlc2V0KGd1aSwgdXNlSW5pdGlhbFZhbHVlcykge1xuXG4gICAgdmFyIHRvUmV0dXJuID0ge307XG5cbiAgICAvLyBGb3IgZWFjaCBvYmplY3QgSSdtIHJlbWVtYmVyaW5nXG4gICAgY29tbW9uLmVhY2goZ3VpLl9fcmVtZW1iZXJlZE9iamVjdHMsIGZ1bmN0aW9uKHZhbCwgaW5kZXgpIHtcblxuICAgICAgdmFyIHNhdmVkX3ZhbHVlcyA9IHt9O1xuXG4gICAgICAvLyBUaGUgY29udHJvbGxlcnMgSSd2ZSBtYWRlIGZvciB0aGNvbW1vbi5pc09iamVjdCBieSBwcm9wZXJ0eVxuICAgICAgdmFyIGNvbnRyb2xsZXJfbWFwID1cbiAgICAgICAgICBndWkuX19yZW1lbWJlcmVkT2JqZWN0SW5kZWNlc1RvQ29udHJvbGxlcnNbaW5kZXhdO1xuXG4gICAgICAvLyBSZW1lbWJlciBlYWNoIHZhbHVlIGZvciBlYWNoIHByb3BlcnR5XG4gICAgICBjb21tb24uZWFjaChjb250cm9sbGVyX21hcCwgZnVuY3Rpb24oY29udHJvbGxlciwgcHJvcGVydHkpIHtcbiAgICAgICAgc2F2ZWRfdmFsdWVzW3Byb3BlcnR5XSA9IHVzZUluaXRpYWxWYWx1ZXMgPyBjb250cm9sbGVyLmluaXRpYWxWYWx1ZSA6IGNvbnRyb2xsZXIuZ2V0VmFsdWUoKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBTYXZlIHRoZSB2YWx1ZXMgZm9yIHRoY29tbW9uLmlzT2JqZWN0XG4gICAgICB0b1JldHVybltpbmRleF0gPSBzYXZlZF92YWx1ZXM7XG5cbiAgICB9KTtcblxuICAgIHJldHVybiB0b1JldHVybjtcblxuICB9XG5cbiAgZnVuY3Rpb24gYWRkUHJlc2V0T3B0aW9uKGd1aSwgbmFtZSwgc2V0U2VsZWN0ZWQpIHtcbiAgICB2YXIgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgb3B0LmlubmVySFRNTCA9IG5hbWU7XG4gICAgb3B0LnZhbHVlID0gbmFtZTtcbiAgICBndWkuX19wcmVzZXRfc2VsZWN0LmFwcGVuZENoaWxkKG9wdCk7XG4gICAgaWYgKHNldFNlbGVjdGVkKSB7XG4gICAgICBndWkuX19wcmVzZXRfc2VsZWN0LnNlbGVjdGVkSW5kZXggPSBndWkuX19wcmVzZXRfc2VsZWN0Lmxlbmd0aCAtIDE7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0UHJlc2V0U2VsZWN0SW5kZXgoZ3VpKSB7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGd1aS5fX3ByZXNldF9zZWxlY3QubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBpZiAoZ3VpLl9fcHJlc2V0X3NlbGVjdFtpbmRleF0udmFsdWUgPT0gZ3VpLnByZXNldCkge1xuICAgICAgICBndWkuX19wcmVzZXRfc2VsZWN0LnNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtYXJrUHJlc2V0TW9kaWZpZWQoZ3VpLCBtb2RpZmllZCkge1xuICAgIHZhciBvcHQgPSBndWkuX19wcmVzZXRfc2VsZWN0W2d1aS5fX3ByZXNldF9zZWxlY3Quc2VsZWN0ZWRJbmRleF07XG4vLyAgICBjb25zb2xlLmxvZygnbWFyaycsIG1vZGlmaWVkLCBvcHQpO1xuICAgIGlmIChtb2RpZmllZCkge1xuICAgICAgb3B0LmlubmVySFRNTCA9IG9wdC52YWx1ZSArIFwiKlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHQuaW5uZXJIVE1MID0gb3B0LnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXlzKGNvbnRyb2xsZXJBcnJheSkge1xuXG5cbiAgICBpZiAoY29udHJvbGxlckFycmF5Lmxlbmd0aCAhPSAwKSB7XG5cbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgdXBkYXRlRGlzcGxheXMoY29udHJvbGxlckFycmF5KTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgY29tbW9uLmVhY2goY29udHJvbGxlckFycmF5LCBmdW5jdGlvbihjKSB7XG4gICAgICBjLnVwZGF0ZURpc3BsYXkoKTtcbiAgICB9KTtcblxuICB9XG5cbiAgcmV0dXJuIEdVSTtcblxufSkoZGF0LnV0aWxzLmNzcyxcblwiPGRpdiBpZD1cXFwiZGctc2F2ZVxcXCIgY2xhc3M9XFxcImRnIGRpYWxvZ3VlXFxcIj5cXG5cXG4gIEhlcmUncyB0aGUgbmV3IGxvYWQgcGFyYW1ldGVyIGZvciB5b3VyIDxjb2RlPkdVSTwvY29kZT4ncyBjb25zdHJ1Y3RvcjpcXG5cXG4gIDx0ZXh0YXJlYSBpZD1cXFwiZGctbmV3LWNvbnN0cnVjdG9yXFxcIj48L3RleHRhcmVhPlxcblxcbiAgPGRpdiBpZD1cXFwiZGctc2F2ZS1sb2NhbGx5XFxcIj5cXG5cXG4gICAgPGlucHV0IGlkPVxcXCJkZy1sb2NhbC1zdG9yYWdlXFxcIiB0eXBlPVxcXCJjaGVja2JveFxcXCIvPiBBdXRvbWF0aWNhbGx5IHNhdmVcXG4gICAgdmFsdWVzIHRvIDxjb2RlPmxvY2FsU3RvcmFnZTwvY29kZT4gb24gZXhpdC5cXG5cXG4gICAgPGRpdiBpZD1cXFwiZGctbG9jYWwtZXhwbGFpblxcXCI+VGhlIHZhbHVlcyBzYXZlZCB0byA8Y29kZT5sb2NhbFN0b3JhZ2U8L2NvZGU+IHdpbGxcXG4gICAgICBvdmVycmlkZSB0aG9zZSBwYXNzZWQgdG8gPGNvZGU+ZGF0LkdVSTwvY29kZT4ncyBjb25zdHJ1Y3Rvci4gVGhpcyBtYWtlcyBpdFxcbiAgICAgIGVhc2llciB0byB3b3JrIGluY3JlbWVudGFsbHksIGJ1dCA8Y29kZT5sb2NhbFN0b3JhZ2U8L2NvZGU+IGlzIGZyYWdpbGUsXFxuICAgICAgYW5kIHlvdXIgZnJpZW5kcyBtYXkgbm90IHNlZSB0aGUgc2FtZSB2YWx1ZXMgeW91IGRvLlxcbiAgICAgIFxcbiAgICA8L2Rpdj5cXG4gICAgXFxuICA8L2Rpdj5cXG5cXG48L2Rpdj5cIixcblwiLmRnIHVse2xpc3Qtc3R5bGU6bm9uZTttYXJnaW46MDtwYWRkaW5nOjA7d2lkdGg6MTAwJTtjbGVhcjpib3RofS5kZy5hY3twb3NpdGlvbjpmaXhlZDt0b3A6MDtsZWZ0OjA7cmlnaHQ6MDtoZWlnaHQ6MDt6LWluZGV4OjB9LmRnOm5vdCguYWMpIC5tYWlue292ZXJmbG93OmhpZGRlbn0uZGcubWFpbnstd2Via2l0LXRyYW5zaXRpb246b3BhY2l0eSAwLjFzIGxpbmVhcjstby10cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXI7LW1vei10cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXI7dHJhbnNpdGlvbjpvcGFjaXR5IDAuMXMgbGluZWFyfS5kZy5tYWluLnRhbGxlci10aGFuLXdpbmRvd3tvdmVyZmxvdy15OmF1dG99LmRnLm1haW4udGFsbGVyLXRoYW4td2luZG93IC5jbG9zZS1idXR0b257b3BhY2l0eToxO21hcmdpbi10b3A6LTFweDtib3JkZXItdG9wOjFweCBzb2xpZCAjMmMyYzJjfS5kZy5tYWluIHVsLmNsb3NlZCAuY2xvc2UtYnV0dG9ue29wYWNpdHk6MSAhaW1wb3J0YW50fS5kZy5tYWluOmhvdmVyIC5jbG9zZS1idXR0b24sLmRnLm1haW4gLmNsb3NlLWJ1dHRvbi5kcmFne29wYWNpdHk6MX0uZGcubWFpbiAuY2xvc2UtYnV0dG9uey13ZWJraXQtdHJhbnNpdGlvbjpvcGFjaXR5IDAuMXMgbGluZWFyOy1vLXRyYW5zaXRpb246b3BhY2l0eSAwLjFzIGxpbmVhcjstbW96LXRyYW5zaXRpb246b3BhY2l0eSAwLjFzIGxpbmVhcjt0cmFuc2l0aW9uOm9wYWNpdHkgMC4xcyBsaW5lYXI7Ym9yZGVyOjA7cG9zaXRpb246YWJzb2x1dGU7bGluZS1oZWlnaHQ6MTlweDtoZWlnaHQ6MjBweDtjdXJzb3I6cG9pbnRlcjt0ZXh0LWFsaWduOmNlbnRlcjtiYWNrZ3JvdW5kLWNvbG9yOiMwMDB9LmRnLm1haW4gLmNsb3NlLWJ1dHRvbjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiMxMTF9LmRnLmF7ZmxvYXQ6cmlnaHQ7bWFyZ2luLXJpZ2h0OjE1cHg7b3ZlcmZsb3cteDpoaWRkZW59LmRnLmEuaGFzLXNhdmUgdWx7bWFyZ2luLXRvcDoyN3B4fS5kZy5hLmhhcy1zYXZlIHVsLmNsb3NlZHttYXJnaW4tdG9wOjB9LmRnLmEgLnNhdmUtcm93e3Bvc2l0aW9uOmZpeGVkO3RvcDowO3otaW5kZXg6MTAwMn0uZGcgbGl7LXdlYmtpdC10cmFuc2l0aW9uOmhlaWdodCAwLjFzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246aGVpZ2h0IDAuMXMgZWFzZS1vdXQ7LW1vei10cmFuc2l0aW9uOmhlaWdodCAwLjFzIGVhc2Utb3V0O3RyYW5zaXRpb246aGVpZ2h0IDAuMXMgZWFzZS1vdXR9LmRnIGxpOm5vdCguZm9sZGVyKXtjdXJzb3I6YXV0bztoZWlnaHQ6MjdweDtsaW5lLWhlaWdodDoyN3B4O292ZXJmbG93OmhpZGRlbjtwYWRkaW5nOjAgNHB4IDAgNXB4fS5kZyBsaS5mb2xkZXJ7cGFkZGluZzowO2JvcmRlci1sZWZ0OjRweCBzb2xpZCByZ2JhKDAsMCwwLDApfS5kZyBsaS50aXRsZXtjdXJzb3I6cG9pbnRlcjttYXJnaW4tbGVmdDotNHB4fS5kZyAuY2xvc2VkIGxpOm5vdCgudGl0bGUpLC5kZyAuY2xvc2VkIHVsIGxpLC5kZyAuY2xvc2VkIHVsIGxpID4gKntoZWlnaHQ6MDtvdmVyZmxvdzpoaWRkZW47Ym9yZGVyOjB9LmRnIC5jcntjbGVhcjpib3RoO3BhZGRpbmctbGVmdDozcHg7aGVpZ2h0OjI3cHh9LmRnIC5wcm9wZXJ0eS1uYW1le2N1cnNvcjpkZWZhdWx0O2Zsb2F0OmxlZnQ7Y2xlYXI6bGVmdDt3aWR0aDo0MCU7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXN9LmRnIC5je2Zsb2F0OmxlZnQ7d2lkdGg6NjAlfS5kZyAuYyBpbnB1dFt0eXBlPXRleHRde2JvcmRlcjowO21hcmdpbi10b3A6NHB4O3BhZGRpbmc6M3B4O3dpZHRoOjEwMCU7ZmxvYXQ6cmlnaHR9LmRnIC5oYXMtc2xpZGVyIGlucHV0W3R5cGU9dGV4dF17d2lkdGg6MzAlO21hcmdpbi1sZWZ0OjB9LmRnIC5zbGlkZXJ7ZmxvYXQ6bGVmdDt3aWR0aDo2NiU7bWFyZ2luLWxlZnQ6LTVweDttYXJnaW4tcmlnaHQ6MDtoZWlnaHQ6MTlweDttYXJnaW4tdG9wOjRweH0uZGcgLnNsaWRlci1mZ3toZWlnaHQ6MTAwJX0uZGcgLmMgaW5wdXRbdHlwZT1jaGVja2JveF17bWFyZ2luLXRvcDo5cHh9LmRnIC5jIHNlbGVjdHttYXJnaW4tdG9wOjVweH0uZGcgLmNyLmZ1bmN0aW9uLC5kZyAuY3IuZnVuY3Rpb24gLnByb3BlcnR5LW5hbWUsLmRnIC5jci5mdW5jdGlvbiAqLC5kZyAuY3IuYm9vbGVhbiwuZGcgLmNyLmJvb2xlYW4gKntjdXJzb3I6cG9pbnRlcn0uZGcgLnNlbGVjdG9ye2Rpc3BsYXk6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTttYXJnaW4tbGVmdDotOXB4O21hcmdpbi10b3A6MjNweDt6LWluZGV4OjEwfS5kZyAuYzpob3ZlciAuc2VsZWN0b3IsLmRnIC5zZWxlY3Rvci5kcmFne2Rpc3BsYXk6YmxvY2t9LmRnIGxpLnNhdmUtcm93e3BhZGRpbmc6MH0uZGcgbGkuc2F2ZS1yb3cgLmJ1dHRvbntkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjBweCA2cHh9LmRnLmRpYWxvZ3Vle2JhY2tncm91bmQtY29sb3I6IzIyMjt3aWR0aDo0NjBweDtwYWRkaW5nOjE1cHg7Zm9udC1zaXplOjEzcHg7bGluZS1oZWlnaHQ6MTVweH0jZGctbmV3LWNvbnN0cnVjdG9ye3BhZGRpbmc6MTBweDtjb2xvcjojMjIyO2ZvbnQtZmFtaWx5Ok1vbmFjbywgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB4O2JvcmRlcjowO3Jlc2l6ZTpub25lO2JveC1zaGFkb3c6aW5zZXQgMXB4IDFweCAxcHggIzg4ODt3b3JkLXdyYXA6YnJlYWstd29yZDttYXJnaW46MTJweCAwO2Rpc3BsYXk6YmxvY2s7d2lkdGg6NDQwcHg7b3ZlcmZsb3cteTpzY3JvbGw7aGVpZ2h0OjEwMHB4O3Bvc2l0aW9uOnJlbGF0aXZlfSNkZy1sb2NhbC1leHBsYWlue2Rpc3BsYXk6bm9uZTtmb250LXNpemU6MTFweDtsaW5lLWhlaWdodDoxN3B4O2JvcmRlci1yYWRpdXM6M3B4O2JhY2tncm91bmQtY29sb3I6IzMzMztwYWRkaW5nOjhweDttYXJnaW4tdG9wOjEwcHh9I2RnLWxvY2FsLWV4cGxhaW4gY29kZXtmb250LXNpemU6MTBweH0jZGF0LWd1aS1zYXZlLWxvY2FsbHl7ZGlzcGxheTpub25lfS5kZ3tjb2xvcjojZWVlO2ZvbnQ6MTFweCAnTHVjaWRhIEdyYW5kZScsIHNhbnMtc2VyaWY7dGV4dC1zaGFkb3c6MCAtMXB4IDAgIzExMX0uZGcubWFpbjo6LXdlYmtpdC1zY3JvbGxiYXJ7d2lkdGg6NXB4O2JhY2tncm91bmQ6IzFhMWExYX0uZGcubWFpbjo6LXdlYmtpdC1zY3JvbGxiYXItY29ybmVye2hlaWdodDowO2Rpc3BsYXk6bm9uZX0uZGcubWFpbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWJ7Ym9yZGVyLXJhZGl1czo1cHg7YmFja2dyb3VuZDojNjc2NzY3fS5kZyBsaTpub3QoLmZvbGRlcil7YmFja2dyb3VuZDojMWExYTFhO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICMyYzJjMmN9LmRnIGxpLnNhdmUtcm93e2xpbmUtaGVpZ2h0OjI1cHg7YmFja2dyb3VuZDojZGFkNWNiO2JvcmRlcjowfS5kZyBsaS5zYXZlLXJvdyBzZWxlY3R7bWFyZ2luLWxlZnQ6NXB4O3dpZHRoOjEwOHB4fS5kZyBsaS5zYXZlLXJvdyAuYnV0dG9ue21hcmdpbi1sZWZ0OjVweDttYXJnaW4tdG9wOjFweDtib3JkZXItcmFkaXVzOjJweDtmb250LXNpemU6OXB4O2xpbmUtaGVpZ2h0OjdweDtwYWRkaW5nOjRweCA0cHggNXB4IDRweDtiYWNrZ3JvdW5kOiNjNWJkYWQ7Y29sb3I6I2ZmZjt0ZXh0LXNoYWRvdzowIDFweCAwICNiMGE1OGY7Ym94LXNoYWRvdzowIC0xcHggMCAjYjBhNThmO2N1cnNvcjpwb2ludGVyfS5kZyBsaS5zYXZlLXJvdyAuYnV0dG9uLmdlYXJze2JhY2tncm91bmQ6I2M1YmRhZCB1cmwoZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBc0FBQUFOQ0FZQUFBQi85WlE3QUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQUFRSkpSRUZVZU5waVlLQVUvUC8vUHdHSUMvQXBDQUJpQlNBVytJOEFDbEFjZ0t4UTRUOWhvTUFFVXJ4eDJRU0dONitlZ0RYKy92V1Q0ZTdOODJBTVlvUEF4L2V2d1dvWW9TWWJBQ1gyczdLeEN4emNzZXpEaDNldkZvREVCWVRFRXF5Y2dnV0F6QTlBdVVTUVFnZVlQYTlmUHY2L1lXbS9BY3g1SVBiN3R5L2Z3K1FaYmx3Njd2RHM4UjBZSHlRaGdPYngreUFKa0JxbUc1ZFBQRGgxYVBPR1IvZXVnVzBHNHZsSW9USWZ5RmNBK1Fla2hoSEpoUGRReGJpQUlndU1CVFFaclBENzEwOE02cm9XWURGUWlJQUF2NkFvdy8xYkZ3WGdpcytmMkxVQXlud29JYU5jejhYTngzRGw3TUVKVURHUXB4OWd0UThZQ3VlQitEMjZPRUNBQVFEYWR0N2U0NkQ0MlFBQUFBQkpSVTVFcmtKZ2dnPT0pIDJweCAxcHggbm8tcmVwZWF0O2hlaWdodDo3cHg7d2lkdGg6OHB4fS5kZyBsaS5zYXZlLXJvdyAuYnV0dG9uOmhvdmVye2JhY2tncm91bmQtY29sb3I6I2JhYjE5ZTtib3gtc2hhZG93OjAgLTFweCAwICNiMGE1OGZ9LmRnIGxpLmZvbGRlcntib3JkZXItYm90dG9tOjB9LmRnIGxpLnRpdGxle3BhZGRpbmctbGVmdDoxNnB4O2JhY2tncm91bmQ6IzAwMCB1cmwoZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQlFBRkFKRUFBUC8vLy9QejgvLy8vLy8vL3lINUJBRUFBQUlBTEFBQUFBQUZBQVVBQUFJSWxJK2hLZ0Z4b0NnQU93PT0pIDZweCAxMHB4IG5vLXJlcGVhdDtjdXJzb3I6cG9pbnRlcjtib3JkZXItYm90dG9tOjFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMil9LmRnIC5jbG9zZWQgbGkudGl0bGV7YmFja2dyb3VuZC1pbWFnZTp1cmwoZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQlFBRkFKRUFBUC8vLy9QejgvLy8vLy8vL3lINUJBRUFBQUlBTEFBQUFBQUZBQVVBQUFJSWxHSVdxTUNiV0FFQU93PT0pfS5kZyAuY3IuYm9vbGVhbntib3JkZXItbGVmdDozcHggc29saWQgIzgwNjc4N30uZGcgLmNyLmZ1bmN0aW9ue2JvcmRlci1sZWZ0OjNweCBzb2xpZCAjZTYxZDVmfS5kZyAuY3IubnVtYmVye2JvcmRlci1sZWZ0OjNweCBzb2xpZCAjMmZhMWQ2fS5kZyAuY3IubnVtYmVyIGlucHV0W3R5cGU9dGV4dF17Y29sb3I6IzJmYTFkNn0uZGcgLmNyLnN0cmluZ3tib3JkZXItbGVmdDozcHggc29saWQgIzFlZDM2Zn0uZGcgLmNyLnN0cmluZyBpbnB1dFt0eXBlPXRleHRde2NvbG9yOiMxZWQzNmZ9LmRnIC5jci5mdW5jdGlvbjpob3ZlciwuZGcgLmNyLmJvb2xlYW46aG92ZXJ7YmFja2dyb3VuZDojMTExfS5kZyAuYyBpbnB1dFt0eXBlPXRleHRde2JhY2tncm91bmQ6IzMwMzAzMDtvdXRsaW5lOm5vbmV9LmRnIC5jIGlucHV0W3R5cGU9dGV4dF06aG92ZXJ7YmFja2dyb3VuZDojM2MzYzNjfS5kZyAuYyBpbnB1dFt0eXBlPXRleHRdOmZvY3Vze2JhY2tncm91bmQ6IzQ5NDk0OTtjb2xvcjojZmZmfS5kZyAuYyAuc2xpZGVye2JhY2tncm91bmQ6IzMwMzAzMDtjdXJzb3I6ZXctcmVzaXplfS5kZyAuYyAuc2xpZGVyLWZne2JhY2tncm91bmQ6IzJmYTFkNn0uZGcgLmMgLnNsaWRlcjpob3ZlcntiYWNrZ3JvdW5kOiMzYzNjM2N9LmRnIC5jIC5zbGlkZXI6aG92ZXIgLnNsaWRlci1mZ3tiYWNrZ3JvdW5kOiM0NGFiZGF9XFxuXCIsXG5kYXQuY29udHJvbGxlcnMuZmFjdG9yeSA9IChmdW5jdGlvbiAoT3B0aW9uQ29udHJvbGxlciwgTnVtYmVyQ29udHJvbGxlckJveCwgTnVtYmVyQ29udHJvbGxlclNsaWRlciwgU3RyaW5nQ29udHJvbGxlciwgRnVuY3Rpb25Db250cm9sbGVyLCBCb29sZWFuQ29udHJvbGxlciwgY29tbW9uKSB7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7XG5cbiAgICAgICAgdmFyIGluaXRpYWxWYWx1ZSA9IG9iamVjdFtwcm9wZXJ0eV07XG5cbiAgICAgICAgLy8gUHJvdmlkaW5nIG9wdGlvbnM/XG4gICAgICAgIGlmIChjb21tb24uaXNBcnJheShhcmd1bWVudHNbMl0pIHx8IGNvbW1vbi5pc09iamVjdChhcmd1bWVudHNbMl0pKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBPcHRpb25Db250cm9sbGVyKG9iamVjdCwgcHJvcGVydHksIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQcm92aWRpbmcgYSBtYXA/XG5cbiAgICAgICAgaWYgKGNvbW1vbi5pc051bWJlcihpbml0aWFsVmFsdWUpKSB7XG5cbiAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKGFyZ3VtZW50c1syXSkgJiYgY29tbW9uLmlzTnVtYmVyKGFyZ3VtZW50c1szXSkpIHtcblxuICAgICAgICAgICAgLy8gSGFzIG1pbiBhbmQgbWF4LlxuICAgICAgICAgICAgcmV0dXJuIG5ldyBOdW1iZXJDb250cm9sbGVyU2xpZGVyKG9iamVjdCwgcHJvcGVydHksIGFyZ3VtZW50c1syXSwgYXJndW1lbnRzWzNdKTtcblxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgTnVtYmVyQ29udHJvbGxlckJveChvYmplY3QsIHByb3BlcnR5LCB7IG1pbjogYXJndW1lbnRzWzJdLCBtYXg6IGFyZ3VtZW50c1szXSB9KTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbW1vbi5pc1N0cmluZyhpbml0aWFsVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBTdHJpbmdDb250cm9sbGVyKG9iamVjdCwgcHJvcGVydHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbW1vbi5pc0Z1bmN0aW9uKGluaXRpYWxWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IEZ1bmN0aW9uQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5LCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29tbW9uLmlzQm9vbGVhbihpbml0aWFsVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBCb29sZWFuQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5KTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9KShkYXQuY29udHJvbGxlcnMuT3B0aW9uQ29udHJvbGxlcixcbmRhdC5jb250cm9sbGVycy5OdW1iZXJDb250cm9sbGVyQm94LFxuZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJTbGlkZXIsXG5kYXQuY29udHJvbGxlcnMuU3RyaW5nQ29udHJvbGxlciA9IChmdW5jdGlvbiAoQ29udHJvbGxlciwgZG9tLCBjb21tb24pIHtcblxuICAvKipcbiAgICogQGNsYXNzIFByb3ZpZGVzIGEgdGV4dCBpbnB1dCB0byBhbHRlciB0aGUgc3RyaW5nIHByb3BlcnR5IG9mIGFuIG9iamVjdC5cbiAgICpcbiAgICogQGV4dGVuZHMgZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXJcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIG1hbmlwdWxhdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgbWFuaXB1bGF0ZWRcbiAgICpcbiAgICogQG1lbWJlciBkYXQuY29udHJvbGxlcnNcbiAgICovXG4gIHZhciBTdHJpbmdDb250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXG4gICAgU3RyaW5nQ29udHJvbGxlci5zdXBlcmNsYXNzLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5fX2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0aGlzLl9faW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcblxuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2tleXVwJywgb25DaGFuZ2UpO1xuICAgIGRvbS5iaW5kKHRoaXMuX19pbnB1dCwgJ2NoYW5nZScsIG9uQ2hhbmdlKTtcbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdibHVyJywgb25CbHVyKTtcbiAgICBkb20uYmluZCh0aGlzLl9faW5wdXQsICdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgdGhpcy5ibHVyKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG5cbiAgICBmdW5jdGlvbiBvbkNoYW5nZSgpIHtcbiAgICAgIF90aGlzLnNldFZhbHVlKF90aGlzLl9faW5wdXQudmFsdWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQmx1cigpIHtcbiAgICAgIGlmIChfdGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgIF90aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbChfdGhpcywgX3RoaXMuZ2V0VmFsdWUoKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fX2lucHV0KTtcblxuICB9O1xuXG4gIFN0cmluZ0NvbnRyb2xsZXIuc3VwZXJjbGFzcyA9IENvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgU3RyaW5nQ29udHJvbGxlci5wcm90b3R5cGUsXG4gICAgICBDb250cm9sbGVyLnByb3RvdHlwZSxcblxuICAgICAge1xuXG4gICAgICAgIHVwZGF0ZURpc3BsYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIFN0b3BzIHRoZSBjYXJldCBmcm9tIG1vdmluZyBvbiBhY2NvdW50IG9mOlxuICAgICAgICAgIC8vIGtleXVwIC0+IHNldFZhbHVlIC0+IHVwZGF0ZURpc3BsYXlcbiAgICAgICAgICBpZiAoIWRvbS5pc0FjdGl2ZSh0aGlzLl9faW5wdXQpKSB7XG4gICAgICAgICAgICB0aGlzLl9faW5wdXQudmFsdWUgPSB0aGlzLmdldFZhbHVlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBTdHJpbmdDb250cm9sbGVyLnN1cGVyY2xhc3MucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgKTtcblxuICByZXR1cm4gU3RyaW5nQ29udHJvbGxlcjtcblxufSkoZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIsXG5kYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jb21tb24pLFxuZGF0LmNvbnRyb2xsZXJzLkZ1bmN0aW9uQ29udHJvbGxlcixcbmRhdC5jb250cm9sbGVycy5Cb29sZWFuQ29udHJvbGxlcixcbmRhdC51dGlscy5jb21tb24pLFxuZGF0LmNvbnRyb2xsZXJzLkNvbnRyb2xsZXIsXG5kYXQuY29udHJvbGxlcnMuQm9vbGVhbkNvbnRyb2xsZXIsXG5kYXQuY29udHJvbGxlcnMuRnVuY3Rpb25Db250cm9sbGVyLFxuZGF0LmNvbnRyb2xsZXJzLk51bWJlckNvbnRyb2xsZXJCb3gsXG5kYXQuY29udHJvbGxlcnMuTnVtYmVyQ29udHJvbGxlclNsaWRlcixcbmRhdC5jb250cm9sbGVycy5PcHRpb25Db250cm9sbGVyLFxuZGF0LmNvbnRyb2xsZXJzLkNvbG9yQ29udHJvbGxlciA9IChmdW5jdGlvbiAoQ29udHJvbGxlciwgZG9tLCBDb2xvciwgaW50ZXJwcmV0LCBjb21tb24pIHtcblxuICB2YXIgQ29sb3JDb250cm9sbGVyID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuXG4gICAgQ29sb3JDb250cm9sbGVyLnN1cGVyY2xhc3MuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KTtcblxuICAgIHRoaXMuX19jb2xvciA9IG5ldyBDb2xvcih0aGlzLmdldFZhbHVlKCkpO1xuICAgIHRoaXMuX190ZW1wID0gbmV3IENvbG9yKDApO1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgZG9tLm1ha2VTZWxlY3RhYmxlKHRoaXMuZG9tRWxlbWVudCwgZmFsc2UpO1xuXG4gICAgdGhpcy5fX3NlbGVjdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fX3NlbGVjdG9yLmNsYXNzTmFtZSA9ICdzZWxlY3Rvcic7XG5cbiAgICB0aGlzLl9fc2F0dXJhdGlvbl9maWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19zYXR1cmF0aW9uX2ZpZWxkLmNsYXNzTmFtZSA9ICdzYXR1cmF0aW9uLWZpZWxkJztcblxuICAgIHRoaXMuX19maWVsZF9rbm9iID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fX2ZpZWxkX2tub2IuY2xhc3NOYW1lID0gJ2ZpZWxkLWtub2InO1xuICAgIHRoaXMuX19maWVsZF9rbm9iX2JvcmRlciA9ICcycHggc29saWQgJztcblxuICAgIHRoaXMuX19odWVfa25vYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19odWVfa25vYi5jbGFzc05hbWUgPSAnaHVlLWtub2InO1xuXG4gICAgdGhpcy5fX2h1ZV9maWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19odWVfZmllbGQuY2xhc3NOYW1lID0gJ2h1ZS1maWVsZCc7XG5cbiAgICB0aGlzLl9faW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRoaXMuX19pbnB1dC50eXBlID0gJ3RleHQnO1xuICAgIHRoaXMuX19pbnB1dF90ZXh0U2hhZG93ID0gJzAgMXB4IDFweCAnO1xuXG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7IC8vIG9uIGVudGVyXG4gICAgICAgIG9uQmx1ci5jYWxsKHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZG9tLmJpbmQodGhpcy5fX2lucHV0LCAnYmx1cicsIG9uQmx1cik7XG5cbiAgICBkb20uYmluZCh0aGlzLl9fc2VsZWN0b3IsICdtb3VzZWRvd24nLCBmdW5jdGlvbihlKSB7XG5cbiAgICAgIGRvbVxuICAgICAgICAuYWRkQ2xhc3ModGhpcywgJ2RyYWcnKVxuICAgICAgICAuYmluZCh3aW5kb3csICdtb3VzZXVwJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGRvbS5yZW1vdmVDbGFzcyhfdGhpcy5fX3NlbGVjdG9yLCAnZHJhZycpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgdmFyIHZhbHVlX2ZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19zZWxlY3Rvci5zdHlsZSwge1xuICAgICAgd2lkdGg6ICcxMjJweCcsXG4gICAgICBoZWlnaHQ6ICcxMDJweCcsXG4gICAgICBwYWRkaW5nOiAnM3B4JyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyMyMjInLFxuICAgICAgYm94U2hhZG93OiAnMHB4IDFweCAzcHggcmdiYSgwLDAsMCwwLjMpJ1xuICAgIH0pO1xuXG4gICAgY29tbW9uLmV4dGVuZCh0aGlzLl9fZmllbGRfa25vYi5zdHlsZSwge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB3aWR0aDogJzEycHgnLFxuICAgICAgaGVpZ2h0OiAnMTJweCcsXG4gICAgICBib3JkZXI6IHRoaXMuX19maWVsZF9rbm9iX2JvcmRlciArICh0aGlzLl9fY29sb3IudiA8IC41ID8gJyNmZmYnIDogJyMwMDAnKSxcbiAgICAgIGJveFNoYWRvdzogJzBweCAxcHggM3B4IHJnYmEoMCwwLDAsMC41KScsXG4gICAgICBib3JkZXJSYWRpdXM6ICcxMnB4JyxcbiAgICAgIHpJbmRleDogMVxuICAgIH0pO1xuICAgIFxuICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX2h1ZV9rbm9iLnN0eWxlLCB7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgIHdpZHRoOiAnMTVweCcsXG4gICAgICBoZWlnaHQ6ICcycHgnLFxuICAgICAgYm9yZGVyUmlnaHQ6ICc0cHggc29saWQgI2ZmZicsXG4gICAgICB6SW5kZXg6IDFcbiAgICB9KTtcblxuICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX3NhdHVyYXRpb25fZmllbGQuc3R5bGUsIHtcbiAgICAgIHdpZHRoOiAnMTAwcHgnLFxuICAgICAgaGVpZ2h0OiAnMTAwcHgnLFxuICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICM1NTUnLFxuICAgICAgbWFyZ2luUmlnaHQ6ICczcHgnLFxuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgIH0pO1xuXG4gICAgY29tbW9uLmV4dGVuZCh2YWx1ZV9maWVsZC5zdHlsZSwge1xuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgYmFja2dyb3VuZDogJ25vbmUnXG4gICAgfSk7XG4gICAgXG4gICAgbGluZWFyR3JhZGllbnQodmFsdWVfZmllbGQsICd0b3AnLCAncmdiYSgwLDAsMCwwKScsICcjMDAwJyk7XG5cbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19odWVfZmllbGQuc3R5bGUsIHtcbiAgICAgIHdpZHRoOiAnMTVweCcsXG4gICAgICBoZWlnaHQ6ICcxMDBweCcsXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjNTU1JyxcbiAgICAgIGN1cnNvcjogJ25zLXJlc2l6ZSdcbiAgICB9KTtcblxuICAgIGh1ZUdyYWRpZW50KHRoaXMuX19odWVfZmllbGQpO1xuXG4gICAgY29tbW9uLmV4dGVuZCh0aGlzLl9faW5wdXQuc3R5bGUsIHtcbiAgICAgIG91dGxpbmU6ICdub25lJyxcbi8vICAgICAgd2lkdGg6ICcxMjBweCcsXG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuLy8gICAgICBwYWRkaW5nOiAnNHB4Jyxcbi8vICAgICAgbWFyZ2luQm90dG9tOiAnNnB4JyxcbiAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICBib3JkZXI6IDAsXG4gICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICB0ZXh0U2hhZG93OiB0aGlzLl9faW5wdXRfdGV4dFNoYWRvdyArICdyZ2JhKDAsMCwwLDAuNyknXG4gICAgfSk7XG5cbiAgICBkb20uYmluZCh0aGlzLl9fc2F0dXJhdGlvbl9maWVsZCwgJ21vdXNlZG93bicsIGZpZWxkRG93bik7XG4gICAgZG9tLmJpbmQodGhpcy5fX2ZpZWxkX2tub2IsICdtb3VzZWRvd24nLCBmaWVsZERvd24pO1xuXG4gICAgZG9tLmJpbmQodGhpcy5fX2h1ZV9maWVsZCwgJ21vdXNlZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHNldEgoZSk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBzZXRIKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCB1bmJpbmRIKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGZpZWxkRG93bihlKSB7XG4gICAgICBzZXRTVihlKTtcbiAgICAgIC8vIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gJ25vbmUnO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgc2V0U1YpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2V1cCcsIHVuYmluZFNWKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bmJpbmRTVigpIHtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgc2V0U1YpO1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZXVwJywgdW5iaW5kU1YpO1xuICAgICAgLy8gZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25CbHVyKCkge1xuICAgICAgdmFyIGkgPSBpbnRlcnByZXQodGhpcy52YWx1ZSk7XG4gICAgICBpZiAoaSAhPT0gZmFsc2UpIHtcbiAgICAgICAgX3RoaXMuX19jb2xvci5fX3N0YXRlID0gaTtcbiAgICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuX19jb2xvci50b09yaWdpbmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IF90aGlzLl9fY29sb3IudG9TdHJpbmcoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bmJpbmRIKCkge1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBzZXRIKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIHVuYmluZEgpO1xuICAgIH1cblxuICAgIHRoaXMuX19zYXR1cmF0aW9uX2ZpZWxkLmFwcGVuZENoaWxkKHZhbHVlX2ZpZWxkKTtcbiAgICB0aGlzLl9fc2VsZWN0b3IuYXBwZW5kQ2hpbGQodGhpcy5fX2ZpZWxkX2tub2IpO1xuICAgIHRoaXMuX19zZWxlY3Rvci5hcHBlbmRDaGlsZCh0aGlzLl9fc2F0dXJhdGlvbl9maWVsZCk7XG4gICAgdGhpcy5fX3NlbGVjdG9yLmFwcGVuZENoaWxkKHRoaXMuX19odWVfZmllbGQpO1xuICAgIHRoaXMuX19odWVfZmllbGQuYXBwZW5kQ2hpbGQodGhpcy5fX2h1ZV9rbm9iKTtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9faW5wdXQpO1xuICAgIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9fc2VsZWN0b3IpO1xuXG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICBmdW5jdGlvbiBzZXRTVihlKSB7XG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyIHcgPSBkb20uZ2V0V2lkdGgoX3RoaXMuX19zYXR1cmF0aW9uX2ZpZWxkKTtcbiAgICAgIHZhciBvID0gZG9tLmdldE9mZnNldChfdGhpcy5fX3NhdHVyYXRpb25fZmllbGQpO1xuICAgICAgdmFyIHMgPSAoZS5jbGllbnRYIC0gby5sZWZ0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0KSAvIHc7XG4gICAgICB2YXIgdiA9IDEgLSAoZS5jbGllbnRZIC0gby50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCkgLyB3O1xuXG4gICAgICBpZiAodiA+IDEpIHYgPSAxO1xuICAgICAgZWxzZSBpZiAodiA8IDApIHYgPSAwO1xuXG4gICAgICBpZiAocyA+IDEpIHMgPSAxO1xuICAgICAgZWxzZSBpZiAocyA8IDApIHMgPSAwO1xuXG4gICAgICBfdGhpcy5fX2NvbG9yLnYgPSB2O1xuICAgICAgX3RoaXMuX19jb2xvci5zID0gcztcblxuICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuX19jb2xvci50b09yaWdpbmFsKCkpO1xuXG5cbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEgoZSkge1xuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhciBzID0gZG9tLmdldEhlaWdodChfdGhpcy5fX2h1ZV9maWVsZCk7XG4gICAgICB2YXIgbyA9IGRvbS5nZXRPZmZzZXQoX3RoaXMuX19odWVfZmllbGQpO1xuICAgICAgdmFyIGggPSAxIC0gKGUuY2xpZW50WSAtIG8udG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3ApIC8gcztcblxuICAgICAgaWYgKGggPiAxKSBoID0gMTtcbiAgICAgIGVsc2UgaWYgKGggPCAwKSBoID0gMDtcblxuICAgICAgX3RoaXMuX19jb2xvci5oID0gaCAqIDM2MDtcblxuICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuX19jb2xvci50b09yaWdpbmFsKCkpO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgfTtcblxuICBDb2xvckNvbnRyb2xsZXIuc3VwZXJjbGFzcyA9IENvbnRyb2xsZXI7XG5cbiAgY29tbW9uLmV4dGVuZChcblxuICAgICAgQ29sb3JDb250cm9sbGVyLnByb3RvdHlwZSxcbiAgICAgIENvbnRyb2xsZXIucHJvdG90eXBlLFxuXG4gICAgICB7XG5cbiAgICAgICAgdXBkYXRlRGlzcGxheTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICB2YXIgaSA9IGludGVycHJldCh0aGlzLmdldFZhbHVlKCkpO1xuXG4gICAgICAgICAgaWYgKGkgIT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgIHZhciBtaXNtYXRjaCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBDaGVjayBmb3IgbWlzbWF0Y2ggb24gdGhlIGludGVycHJldGVkIHZhbHVlLlxuXG4gICAgICAgICAgICBjb21tb24uZWFjaChDb2xvci5DT01QT05FTlRTLCBmdW5jdGlvbihjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgaWYgKCFjb21tb24uaXNVbmRlZmluZWQoaVtjb21wb25lbnRdKSAmJlxuICAgICAgICAgICAgICAgICAgIWNvbW1vbi5pc1VuZGVmaW5lZCh0aGlzLl9fY29sb3IuX19zdGF0ZVtjb21wb25lbnRdKSAmJlxuICAgICAgICAgICAgICAgICAgaVtjb21wb25lbnRdICE9PSB0aGlzLl9fY29sb3IuX19zdGF0ZVtjb21wb25lbnRdKSB7XG4gICAgICAgICAgICAgICAgbWlzbWF0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiB7fTsgLy8gYnJlYWtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgICAgIC8vIElmIG5vdGhpbmcgZGl2ZXJnZXMsIHdlIGtlZXAgb3VyIHByZXZpb3VzIHZhbHVlc1xuICAgICAgICAgICAgLy8gZm9yIHN0YXRlZnVsbmVzcywgb3RoZXJ3aXNlIHdlIHJlY2FsY3VsYXRlIGZyZXNoXG4gICAgICAgICAgICBpZiAobWlzbWF0Y2gpIHtcbiAgICAgICAgICAgICAgY29tbW9uLmV4dGVuZCh0aGlzLl9fY29sb3IuX19zdGF0ZSwgaSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb21tb24uZXh0ZW5kKHRoaXMuX190ZW1wLl9fc3RhdGUsIHRoaXMuX19jb2xvci5fX3N0YXRlKTtcblxuICAgICAgICAgIHRoaXMuX190ZW1wLmEgPSAxO1xuXG4gICAgICAgICAgdmFyIGZsaXAgPSAodGhpcy5fX2NvbG9yLnYgPCAuNSB8fCB0aGlzLl9fY29sb3IucyA+IC41KSA/IDI1NSA6IDA7XG4gICAgICAgICAgdmFyIF9mbGlwID0gMjU1IC0gZmxpcDtcblxuICAgICAgICAgIGNvbW1vbi5leHRlbmQodGhpcy5fX2ZpZWxkX2tub2Iuc3R5bGUsIHtcbiAgICAgICAgICAgIG1hcmdpbkxlZnQ6IDEwMCAqIHRoaXMuX19jb2xvci5zIC0gNyArICdweCcsXG4gICAgICAgICAgICBtYXJnaW5Ub3A6IDEwMCAqICgxIC0gdGhpcy5fX2NvbG9yLnYpIC0gNyArICdweCcsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuX190ZW1wLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBib3JkZXI6IHRoaXMuX19maWVsZF9rbm9iX2JvcmRlciArICdyZ2IoJyArIGZsaXAgKyAnLCcgKyBmbGlwICsgJywnICsgZmxpcCArJyknXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLl9faHVlX2tub2Iuc3R5bGUubWFyZ2luVG9wID0gKDEgLSB0aGlzLl9fY29sb3IuaCAvIDM2MCkgKiAxMDAgKyAncHgnXG5cbiAgICAgICAgICB0aGlzLl9fdGVtcC5zID0gMTtcbiAgICAgICAgICB0aGlzLl9fdGVtcC52ID0gMTtcblxuICAgICAgICAgIGxpbmVhckdyYWRpZW50KHRoaXMuX19zYXR1cmF0aW9uX2ZpZWxkLCAnbGVmdCcsICcjZmZmJywgdGhpcy5fX3RlbXAudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgICBjb21tb24uZXh0ZW5kKHRoaXMuX19pbnB1dC5zdHlsZSwge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLl9faW5wdXQudmFsdWUgPSB0aGlzLl9fY29sb3IudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIGNvbG9yOiAncmdiKCcgKyBmbGlwICsgJywnICsgZmxpcCArICcsJyArIGZsaXAgKycpJyxcbiAgICAgICAgICAgIHRleHRTaGFkb3c6IHRoaXMuX19pbnB1dF90ZXh0U2hhZG93ICsgJ3JnYmEoJyArIF9mbGlwICsgJywnICsgX2ZsaXAgKyAnLCcgKyBfZmxpcCArJywuNyknXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgKTtcbiAgXG4gIHZhciB2ZW5kb3JzID0gWyctbW96LScsJy1vLScsJy13ZWJraXQtJywnLW1zLScsJyddO1xuICBcbiAgZnVuY3Rpb24gbGluZWFyR3JhZGllbnQoZWxlbSwgeCwgYSwgYikge1xuICAgIGVsZW0uc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgIGNvbW1vbi5lYWNoKHZlbmRvcnMsIGZ1bmN0aW9uKHZlbmRvcikge1xuICAgICAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiAnICsgdmVuZG9yICsgJ2xpbmVhci1ncmFkaWVudCgnK3grJywgJythKycgMCUsICcgKyBiICsgJyAxMDAlKTsgJztcbiAgICB9KTtcbiAgfVxuICBcbiAgZnVuY3Rpb24gaHVlR3JhZGllbnQoZWxlbSkge1xuICAgIGVsZW0uc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgIGVsZW0uc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZDogLW1vei1saW5lYXItZ3JhZGllbnQodG9wLCAgI2ZmMDAwMCAwJSwgI2ZmMDBmZiAxNyUsICMwMDAwZmYgMzQlLCAjMDBmZmZmIDUwJSwgIzAwZmYwMCA2NyUsICNmZmZmMDAgODQlLCAjZmYwMDAwIDEwMCUpOydcbiAgICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsI2ZmMDBmZiAxNyUsIzAwMDBmZiAzNCUsIzAwZmZmZiA1MCUsIzAwZmYwMCA2NyUsI2ZmZmYwMCA4NCUsI2ZmMDAwMCAxMDAlKTsnXG4gICAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiAtby1saW5lYXItZ3JhZGllbnQodG9wLCAgI2ZmMDAwMCAwJSwjZmYwMGZmIDE3JSwjMDAwMGZmIDM0JSwjMDBmZmZmIDUwJSwjMDBmZjAwIDY3JSwjZmZmZjAwIDg0JSwjZmYwMDAwIDEwMCUpOydcbiAgICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IC1tcy1saW5lYXItZ3JhZGllbnQodG9wLCAgI2ZmMDAwMCAwJSwjZmYwMGZmIDE3JSwjMDAwMGZmIDM0JSwjMDBmZmZmIDUwJSwjMDBmZjAwIDY3JSwjZmZmZjAwIDg0JSwjZmYwMDAwIDEwMCUpOydcbiAgICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0b3AsICAjZmYwMDAwIDAlLCNmZjAwZmYgMTclLCMwMDAwZmYgMzQlLCMwMGZmZmYgNTAlLCMwMGZmMDAgNjclLCNmZmZmMDAgODQlLCNmZjAwMDAgMTAwJSk7J1xuICB9XG5cblxuICByZXR1cm4gQ29sb3JDb250cm9sbGVyO1xuXG59KShkYXQuY29udHJvbGxlcnMuQ29udHJvbGxlcixcbmRhdC5kb20uZG9tLFxuZGF0LmNvbG9yLkNvbG9yID0gKGZ1bmN0aW9uIChpbnRlcnByZXQsIG1hdGgsIHRvU3RyaW5nLCBjb21tb24pIHtcblxuICB2YXIgQ29sb3IgPSBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuX19zdGF0ZSA9IGludGVycHJldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgaWYgKHRoaXMuX19zdGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93ICdGYWlsZWQgdG8gaW50ZXJwcmV0IGNvbG9yIGFyZ3VtZW50cyc7XG4gICAgfVxuXG4gICAgdGhpcy5fX3N0YXRlLmEgPSB0aGlzLl9fc3RhdGUuYSB8fCAxO1xuXG5cbiAgfTtcblxuICBDb2xvci5DT01QT05FTlRTID0gWydyJywnZycsJ2InLCdoJywncycsJ3YnLCdoZXgnLCdhJ107XG5cbiAgY29tbW9uLmV4dGVuZChDb2xvci5wcm90b3R5cGUsIHtcblxuICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0b1N0cmluZyh0aGlzKTtcbiAgICB9LFxuXG4gICAgdG9PcmlnaW5hbDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmNvbnZlcnNpb24ud3JpdGUodGhpcyk7XG4gICAgfVxuXG4gIH0pO1xuXG4gIGRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdyJywgMik7XG4gIGRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdnJywgMSk7XG4gIGRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdiJywgMCk7XG5cbiAgZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ2gnKTtcbiAgZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ3MnKTtcbiAgZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ3YnKTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29sb3IucHJvdG90eXBlLCAnYScsIHtcblxuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmE7XG4gICAgfSxcblxuICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgdGhpcy5fX3N0YXRlLmEgPSB2O1xuICAgIH1cblxuICB9KTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29sb3IucHJvdG90eXBlLCAnaGV4Jywge1xuXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcblxuICAgICAgaWYgKCF0aGlzLl9fc3RhdGUuc3BhY2UgIT09ICdIRVgnKSB7XG4gICAgICAgIHRoaXMuX19zdGF0ZS5oZXggPSBtYXRoLnJnYl90b19oZXgodGhpcy5yLCB0aGlzLmcsIHRoaXMuYik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9fc3RhdGUuaGV4O1xuXG4gICAgfSxcblxuICAgIHNldDogZnVuY3Rpb24odikge1xuXG4gICAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnSEVYJztcbiAgICAgIHRoaXMuX19zdGF0ZS5oZXggPSB2O1xuXG4gICAgfVxuXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGRlZmluZVJHQkNvbXBvbmVudCh0YXJnZXQsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpIHtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbXBvbmVudCwge1xuXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgPT09ICdSR0InKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVjYWxjdWxhdGVSR0IodGhpcywgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuXG4gICAgICB9LFxuXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnUkdCJykge1xuICAgICAgICAgIHJlY2FsY3VsYXRlUkdCKHRoaXMsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpO1xuICAgICAgICAgIHRoaXMuX19zdGF0ZS5zcGFjZSA9ICdSR0InO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fX3N0YXRlW2NvbXBvbmVudF0gPSB2O1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbiAgZnVuY3Rpb24gZGVmaW5lSFNWQ29tcG9uZW50KHRhcmdldCwgY29tcG9uZW50KSB7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb21wb25lbnQsIHtcblxuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlID09PSAnSFNWJylcbiAgICAgICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XG5cbiAgICAgICAgcmVjYWxjdWxhdGVIU1YodGhpcyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuXG4gICAgICB9LFxuXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnSFNWJykge1xuICAgICAgICAgIHJlY2FsY3VsYXRlSFNWKHRoaXMpO1xuICAgICAgICAgIHRoaXMuX19zdGF0ZS5zcGFjZSA9ICdIU1YnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fX3N0YXRlW2NvbXBvbmVudF0gPSB2O1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbiAgZnVuY3Rpb24gcmVjYWxjdWxhdGVSR0IoY29sb3IsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpIHtcblxuICAgIGlmIChjb2xvci5fX3N0YXRlLnNwYWNlID09PSAnSEVYJykge1xuXG4gICAgICBjb2xvci5fX3N0YXRlW2NvbXBvbmVudF0gPSBtYXRoLmNvbXBvbmVudF9mcm9tX2hleChjb2xvci5fX3N0YXRlLmhleCwgY29tcG9uZW50SGV4SW5kZXgpO1xuXG4gICAgfSBlbHNlIGlmIChjb2xvci5fX3N0YXRlLnNwYWNlID09PSAnSFNWJykge1xuXG4gICAgICBjb21tb24uZXh0ZW5kKGNvbG9yLl9fc3RhdGUsIG1hdGguaHN2X3RvX3JnYihjb2xvci5fX3N0YXRlLmgsIGNvbG9yLl9fc3RhdGUucywgY29sb3IuX19zdGF0ZS52KSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aHJvdyAnQ29ycnVwdGVkIGNvbG9yIHN0YXRlJztcblxuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gcmVjYWxjdWxhdGVIU1YoY29sb3IpIHtcblxuICAgIHZhciByZXN1bHQgPSBtYXRoLnJnYl90b19oc3YoY29sb3IuciwgY29sb3IuZywgY29sb3IuYik7XG5cbiAgICBjb21tb24uZXh0ZW5kKGNvbG9yLl9fc3RhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICBzOiByZXN1bHQucyxcbiAgICAgICAgICB2OiByZXN1bHQudlxuICAgICAgICB9XG4gICAgKTtcblxuICAgIGlmICghY29tbW9uLmlzTmFOKHJlc3VsdC5oKSkge1xuICAgICAgY29sb3IuX19zdGF0ZS5oID0gcmVzdWx0Lmg7XG4gICAgfSBlbHNlIGlmIChjb21tb24uaXNVbmRlZmluZWQoY29sb3IuX19zdGF0ZS5oKSkge1xuICAgICAgY29sb3IuX19zdGF0ZS5oID0gMDtcbiAgICB9XG5cbiAgfVxuXG4gIHJldHVybiBDb2xvcjtcblxufSkoZGF0LmNvbG9yLmludGVycHJldCxcbmRhdC5jb2xvci5tYXRoID0gKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgdG1wQ29tcG9uZW50O1xuXG4gIHJldHVybiB7XG5cbiAgICBoc3ZfdG9fcmdiOiBmdW5jdGlvbihoLCBzLCB2KSB7XG5cbiAgICAgIHZhciBoaSA9IE1hdGguZmxvb3IoaCAvIDYwKSAlIDY7XG5cbiAgICAgIHZhciBmID0gaCAvIDYwIC0gTWF0aC5mbG9vcihoIC8gNjApO1xuICAgICAgdmFyIHAgPSB2ICogKDEuMCAtIHMpO1xuICAgICAgdmFyIHEgPSB2ICogKDEuMCAtIChmICogcykpO1xuICAgICAgdmFyIHQgPSB2ICogKDEuMCAtICgoMS4wIC0gZikgKiBzKSk7XG4gICAgICB2YXIgYyA9IFtcbiAgICAgICAgW3YsIHQsIHBdLFxuICAgICAgICBbcSwgdiwgcF0sXG4gICAgICAgIFtwLCB2LCB0XSxcbiAgICAgICAgW3AsIHEsIHZdLFxuICAgICAgICBbdCwgcCwgdl0sXG4gICAgICAgIFt2LCBwLCBxXVxuICAgICAgXVtoaV07XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHI6IGNbMF0gKiAyNTUsXG4gICAgICAgIGc6IGNbMV0gKiAyNTUsXG4gICAgICAgIGI6IGNbMl0gKiAyNTVcbiAgICAgIH07XG5cbiAgICB9LFxuXG4gICAgcmdiX3RvX2hzdjogZnVuY3Rpb24ociwgZywgYikge1xuXG4gICAgICB2YXIgbWluID0gTWF0aC5taW4ociwgZywgYiksXG4gICAgICAgICAgbWF4ID0gTWF0aC5tYXgociwgZywgYiksXG4gICAgICAgICAgZGVsdGEgPSBtYXggLSBtaW4sXG4gICAgICAgICAgaCwgcztcblxuICAgICAgaWYgKG1heCAhPSAwKSB7XG4gICAgICAgIHMgPSBkZWx0YSAvIG1heDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaDogTmFOLFxuICAgICAgICAgIHM6IDAsXG4gICAgICAgICAgdjogMFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBpZiAociA9PSBtYXgpIHtcbiAgICAgICAgaCA9IChnIC0gYikgLyBkZWx0YTtcbiAgICAgIH0gZWxzZSBpZiAoZyA9PSBtYXgpIHtcbiAgICAgICAgaCA9IDIgKyAoYiAtIHIpIC8gZGVsdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoID0gNCArIChyIC0gZykgLyBkZWx0YTtcbiAgICAgIH1cbiAgICAgIGggLz0gNjtcbiAgICAgIGlmIChoIDwgMCkge1xuICAgICAgICBoICs9IDE7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGg6IGggKiAzNjAsXG4gICAgICAgIHM6IHMsXG4gICAgICAgIHY6IG1heCAvIDI1NVxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgcmdiX3RvX2hleDogZnVuY3Rpb24ociwgZywgYikge1xuICAgICAgdmFyIGhleCA9IHRoaXMuaGV4X3dpdGhfY29tcG9uZW50KDAsIDIsIHIpO1xuICAgICAgaGV4ID0gdGhpcy5oZXhfd2l0aF9jb21wb25lbnQoaGV4LCAxLCBnKTtcbiAgICAgIGhleCA9IHRoaXMuaGV4X3dpdGhfY29tcG9uZW50KGhleCwgMCwgYik7XG4gICAgICByZXR1cm4gaGV4O1xuICAgIH0sXG5cbiAgICBjb21wb25lbnRfZnJvbV9oZXg6IGZ1bmN0aW9uKGhleCwgY29tcG9uZW50SW5kZXgpIHtcbiAgICAgIHJldHVybiAoaGV4ID4+IChjb21wb25lbnRJbmRleCAqIDgpKSAmIDB4RkY7XG4gICAgfSxcblxuICAgIGhleF93aXRoX2NvbXBvbmVudDogZnVuY3Rpb24oaGV4LCBjb21wb25lbnRJbmRleCwgdmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA8PCAodG1wQ29tcG9uZW50ID0gY29tcG9uZW50SW5kZXggKiA4KSB8IChoZXggJiB+ICgweEZGIDw8IHRtcENvbXBvbmVudCkpO1xuICAgIH1cblxuICB9XG5cbn0pKCksXG5kYXQuY29sb3IudG9TdHJpbmcsXG5kYXQudXRpbHMuY29tbW9uKSxcbmRhdC5jb2xvci5pbnRlcnByZXQsXG5kYXQudXRpbHMuY29tbW9uKSxcbmRhdC51dGlscy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSAoZnVuY3Rpb24gKCkge1xuXG4gIC8qKlxuICAgKiByZXF1aXJlanMgdmVyc2lvbiBvZiBQYXVsIElyaXNoJ3MgUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAqIGh0dHA6Ly9wYXVsaXJpc2guY29tLzIwMTEvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1hbmltYXRpbmcvXG4gICAqL1xuXG4gIHJldHVybiB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICBmdW5jdGlvbihjYWxsYmFjaywgZWxlbWVudCkge1xuXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApO1xuXG4gICAgICB9O1xufSkoKSxcbmRhdC5kb20uQ2VudGVyZWREaXYgPSAoZnVuY3Rpb24gKGRvbSwgY29tbW9uKSB7XG5cblxuICB2YXIgQ2VudGVyZWREaXYgPSBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuYmFja2dyb3VuZEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUsIHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsMC44KScsXG4gICAgICB0b3A6IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgekluZGV4OiAnMTAwMCcsXG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgV2Via2l0VHJhbnNpdGlvbjogJ29wYWNpdHkgMC4ycyBsaW5lYXInXG4gICAgfSk7XG5cbiAgICBkb20ubWFrZUZ1bGxzY3JlZW4odGhpcy5iYWNrZ3JvdW5kRWxlbWVudCk7XG4gICAgdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb21tb24uZXh0ZW5kKHRoaXMuZG9tRWxlbWVudC5zdHlsZSwge1xuICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICB6SW5kZXg6ICcxMDAxJyxcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICBXZWJraXRUcmFuc2l0aW9uOiAnLXdlYmtpdC10cmFuc2Zvcm0gMC4ycyBlYXNlLW91dCwgb3BhY2l0eSAwLjJzIGxpbmVhcidcbiAgICB9KTtcblxuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmJhY2tncm91bmRFbGVtZW50KTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZG9tRWxlbWVudCk7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIGRvbS5iaW5kKHRoaXMuYmFja2dyb3VuZEVsZW1lbnQsICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgX3RoaXMuaGlkZSgpO1xuICAgIH0pO1xuXG5cbiAgfTtcblxuICBDZW50ZXJlZERpdi5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBcblxuXG4gICAgdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG4vLyAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUudG9wID0gJzUyJSc7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgxLjEpJztcblxuICAgIHRoaXMubGF5b3V0KCk7XG5cbiAgICBjb21tb24uZGVmZXIoZnVuY3Rpb24oKSB7XG4gICAgICBfdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgIF90aGlzLmRvbUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICBfdGhpcy5kb21FbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgxKSc7XG4gICAgfSk7XG5cbiAgfTtcblxuICBDZW50ZXJlZERpdi5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBoaWRlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgIF90aGlzLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIF90aGlzLmJhY2tncm91bmRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgIGRvbS51bmJpbmQoX3RoaXMuZG9tRWxlbWVudCwgJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBoaWRlKTtcbiAgICAgIGRvbS51bmJpbmQoX3RoaXMuZG9tRWxlbWVudCwgJ3RyYW5zaXRpb25lbmQnLCBoaWRlKTtcbiAgICAgIGRvbS51bmJpbmQoX3RoaXMuZG9tRWxlbWVudCwgJ29UcmFuc2l0aW9uRW5kJywgaGlkZSk7XG5cbiAgICB9O1xuXG4gICAgZG9tLmJpbmQodGhpcy5kb21FbGVtZW50LCAnd2Via2l0VHJhbnNpdGlvbkVuZCcsIGhpZGUpO1xuICAgIGRvbS5iaW5kKHRoaXMuZG9tRWxlbWVudCwgJ3RyYW5zaXRpb25lbmQnLCBoaWRlKTtcbiAgICBkb20uYmluZCh0aGlzLmRvbUVsZW1lbnQsICdvVHJhbnNpdGlvbkVuZCcsIGhpZGUpO1xuXG4gICAgdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbi8vICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS50b3AgPSAnNDglJztcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgxLjEpJztcblxuICB9O1xuXG4gIENlbnRlcmVkRGl2LnByb3RvdHlwZS5sYXlvdXQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUubGVmdCA9IHdpbmRvdy5pbm5lcldpZHRoLzIgLSBkb20uZ2V0V2lkdGgodGhpcy5kb21FbGVtZW50KSAvIDIgKyAncHgnO1xuICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS50b3AgPSB3aW5kb3cuaW5uZXJIZWlnaHQvMiAtIGRvbS5nZXRIZWlnaHQodGhpcy5kb21FbGVtZW50KSAvIDIgKyAncHgnO1xuICB9O1xuICBcbiAgZnVuY3Rpb24gbG9ja1Njcm9sbChlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG4gIH1cblxuICByZXR1cm4gQ2VudGVyZWREaXY7XG5cbn0pKGRhdC5kb20uZG9tLFxuZGF0LnV0aWxzLmNvbW1vbiksXG5kYXQuZG9tLmRvbSxcbmRhdC51dGlscy5jb21tb24pOyIsIi8qKlxuICogZGF0LWd1aSBKYXZhU2NyaXB0IENvbnRyb2xsZXIgTGlicmFyeVxuICogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2RhdC1ndWlcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMSBEYXRhIEFydHMgVGVhbSwgR29vZ2xlIENyZWF0aXZlIExhYlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqL1xuXG4vKiogQG5hbWVzcGFjZSAqL1xudmFyIGRhdCA9IG1vZHVsZS5leHBvcnRzID0gZGF0IHx8IHt9O1xuXG4vKiogQG5hbWVzcGFjZSAqL1xuZGF0LmNvbG9yID0gZGF0LmNvbG9yIHx8IHt9O1xuXG4vKiogQG5hbWVzcGFjZSAqL1xuZGF0LnV0aWxzID0gZGF0LnV0aWxzIHx8IHt9O1xuXG5kYXQudXRpbHMuY29tbW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgXG4gIHZhciBBUlJfRUFDSCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xuICB2YXIgQVJSX1NMSUNFID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG4gIC8qKlxuICAgKiBCYW5kLWFpZCBtZXRob2RzIGZvciB0aGluZ3MgdGhhdCBzaG91bGQgYmUgYSBsb3QgZWFzaWVyIGluIEphdmFTY3JpcHQuXG4gICAqIEltcGxlbWVudGF0aW9uIGFuZCBzdHJ1Y3R1cmUgaW5zcGlyZWQgYnkgdW5kZXJzY29yZS5qc1xuICAgKiBodHRwOi8vZG9jdW1lbnRjbG91ZC5naXRodWIuY29tL3VuZGVyc2NvcmUvXG4gICAqL1xuXG4gIHJldHVybiB7IFxuICAgIFxuICAgIEJSRUFLOiB7fSxcbiAgXG4gICAgZXh0ZW5kOiBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIFxuICAgICAgdGhpcy5lYWNoKEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cywgMSksIGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iailcbiAgICAgICAgICBpZiAoIXRoaXMuaXNVbmRlZmluZWQob2JqW2tleV0pKSBcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgICAgIFxuICAgICAgfSwgdGhpcyk7XG4gICAgICBcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICBcbiAgICB9LFxuICAgIFxuICAgIGRlZmF1bHRzOiBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIFxuICAgICAgdGhpcy5lYWNoKEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cywgMSksIGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iailcbiAgICAgICAgICBpZiAodGhpcy5pc1VuZGVmaW5lZCh0YXJnZXRba2V5XSkpIFxuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgXG4gICAgICB9LCB0aGlzKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICBcbiAgICB9LFxuICAgIFxuICAgIGNvbXBvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRvQ2FsbCA9IEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBhcmdzID0gQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHRvQ2FsbC5sZW5ndGggLTE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgYXJncyA9IFt0b0NhbGxbaV0uYXBwbHkodGhpcywgYXJncyldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBhcmdzWzBdO1xuICAgICAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgZWFjaDogZnVuY3Rpb24ob2JqLCBpdHIsIHNjb3BlKSB7XG5cbiAgICAgIFxuICAgICAgaWYgKEFSUl9FQUNIICYmIG9iai5mb3JFYWNoID09PSBBUlJfRUFDSCkgeyBcbiAgICAgICAgXG4gICAgICAgIG9iai5mb3JFYWNoKGl0ciwgc2NvcGUpO1xuICAgICAgICBcbiAgICAgIH0gZWxzZSBpZiAob2JqLmxlbmd0aCA9PT0gb2JqLmxlbmd0aCArIDApIHsgLy8gSXMgbnVtYmVyIGJ1dCBub3QgTmFOXG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBrZXkgPSAwLCBsID0gb2JqLmxlbmd0aDsga2V5IDwgbDsga2V5KyspXG4gICAgICAgICAgaWYgKGtleSBpbiBvYmogJiYgaXRyLmNhbGwoc2NvcGUsIG9ialtrZXldLCBrZXkpID09PSB0aGlzLkJSRUFLKSBcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSBcbiAgICAgICAgICBpZiAoaXRyLmNhbGwoc2NvcGUsIG9ialtrZXldLCBrZXkpID09PSB0aGlzLkJSRUFLKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICB9XG4gICAgICAgICAgICBcbiAgICB9LFxuICAgIFxuICAgIGRlZmVyOiBmdW5jdGlvbihmbmMpIHtcbiAgICAgIHNldFRpbWVvdXQoZm5jLCAwKTtcbiAgICB9LFxuICAgIFxuICAgIHRvQXJyYXk6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgaWYgKG9iai50b0FycmF5KSByZXR1cm4gb2JqLnRvQXJyYXkoKTtcbiAgICAgIHJldHVybiBBUlJfU0xJQ0UuY2FsbChvYmopO1xuICAgIH0sXG5cbiAgICBpc1VuZGVmaW5lZDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBcbiAgICBpc051bGw6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gbnVsbDtcbiAgICB9LFxuICAgIFxuICAgIGlzTmFOOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogIT09IG9iajtcbiAgICB9LFxuICAgIFxuICAgIGlzQXJyYXk6IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqLmNvbnN0cnVjdG9yID09PSBBcnJheTtcbiAgICB9LFxuICAgIFxuICAgIGlzT2JqZWN0OiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IE9iamVjdChvYmopO1xuICAgIH0sXG4gICAgXG4gICAgaXNOdW1iZXI6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gb2JqKzA7XG4gICAgfSxcbiAgICBcbiAgICBpc1N0cmluZzogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09PSBvYmorJyc7XG4gICAgfSxcbiAgICBcbiAgICBpc0Jvb2xlYW46IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PT0gZmFsc2UgfHwgb2JqID09PSB0cnVlO1xuICAgIH0sXG4gICAgXG4gICAgaXNGdW5jdGlvbjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gICAgfVxuICBcbiAgfTtcbiAgICBcbn0pKCk7XG5cblxuZGF0LmNvbG9yLnRvU3RyaW5nID0gKGZ1bmN0aW9uIChjb21tb24pIHtcblxuICByZXR1cm4gZnVuY3Rpb24oY29sb3IpIHtcblxuICAgIGlmIChjb2xvci5hID09IDEgfHwgY29tbW9uLmlzVW5kZWZpbmVkKGNvbG9yLmEpKSB7XG5cbiAgICAgIHZhciBzID0gY29sb3IuaGV4LnRvU3RyaW5nKDE2KTtcbiAgICAgIHdoaWxlIChzLmxlbmd0aCA8IDYpIHtcbiAgICAgICAgcyA9ICcwJyArIHM7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnIycgKyBzO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuICdyZ2JhKCcgKyBNYXRoLnJvdW5kKGNvbG9yLnIpICsgJywnICsgTWF0aC5yb3VuZChjb2xvci5nKSArICcsJyArIE1hdGgucm91bmQoY29sb3IuYikgKyAnLCcgKyBjb2xvci5hICsgJyknO1xuXG4gICAgfVxuXG4gIH1cblxufSkoZGF0LnV0aWxzLmNvbW1vbik7XG5cblxuZGF0LkNvbG9yID0gZGF0LmNvbG9yLkNvbG9yID0gKGZ1bmN0aW9uIChpbnRlcnByZXQsIG1hdGgsIHRvU3RyaW5nLCBjb21tb24pIHtcblxuICB2YXIgQ29sb3IgPSBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuX19zdGF0ZSA9IGludGVycHJldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgaWYgKHRoaXMuX19zdGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93ICdGYWlsZWQgdG8gaW50ZXJwcmV0IGNvbG9yIGFyZ3VtZW50cyc7XG4gICAgfVxuXG4gICAgdGhpcy5fX3N0YXRlLmEgPSB0aGlzLl9fc3RhdGUuYSB8fCAxO1xuXG5cbiAgfTtcblxuICBDb2xvci5DT01QT05FTlRTID0gWydyJywnZycsJ2InLCdoJywncycsJ3YnLCdoZXgnLCdhJ107XG5cbiAgY29tbW9uLmV4dGVuZChDb2xvci5wcm90b3R5cGUsIHtcblxuICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0b1N0cmluZyh0aGlzKTtcbiAgICB9LFxuXG4gICAgdG9PcmlnaW5hbDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmNvbnZlcnNpb24ud3JpdGUodGhpcyk7XG4gICAgfVxuXG4gIH0pO1xuXG4gIGRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdyJywgMik7XG4gIGRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdnJywgMSk7XG4gIGRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdiJywgMCk7XG5cbiAgZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ2gnKTtcbiAgZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ3MnKTtcbiAgZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ3YnKTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29sb3IucHJvdG90eXBlLCAnYScsIHtcblxuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmE7XG4gICAgfSxcblxuICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgdGhpcy5fX3N0YXRlLmEgPSB2O1xuICAgIH1cblxuICB9KTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29sb3IucHJvdG90eXBlLCAnaGV4Jywge1xuXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcblxuICAgICAgaWYgKCF0aGlzLl9fc3RhdGUuc3BhY2UgIT09ICdIRVgnKSB7XG4gICAgICAgIHRoaXMuX19zdGF0ZS5oZXggPSBtYXRoLnJnYl90b19oZXgodGhpcy5yLCB0aGlzLmcsIHRoaXMuYik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9fc3RhdGUuaGV4O1xuXG4gICAgfSxcblxuICAgIHNldDogZnVuY3Rpb24odikge1xuXG4gICAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnSEVYJztcbiAgICAgIHRoaXMuX19zdGF0ZS5oZXggPSB2O1xuXG4gICAgfVxuXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGRlZmluZVJHQkNvbXBvbmVudCh0YXJnZXQsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpIHtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbXBvbmVudCwge1xuXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgPT09ICdSR0InKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVjYWxjdWxhdGVSR0IodGhpcywgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuXG4gICAgICB9LFxuXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnUkdCJykge1xuICAgICAgICAgIHJlY2FsY3VsYXRlUkdCKHRoaXMsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpO1xuICAgICAgICAgIHRoaXMuX19zdGF0ZS5zcGFjZSA9ICdSR0InO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fX3N0YXRlW2NvbXBvbmVudF0gPSB2O1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbiAgZnVuY3Rpb24gZGVmaW5lSFNWQ29tcG9uZW50KHRhcmdldCwgY29tcG9uZW50KSB7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb21wb25lbnQsIHtcblxuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlID09PSAnSFNWJylcbiAgICAgICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XG5cbiAgICAgICAgcmVjYWxjdWxhdGVIU1YodGhpcyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuXG4gICAgICB9LFxuXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcblxuICAgICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnSFNWJykge1xuICAgICAgICAgIHJlY2FsY3VsYXRlSFNWKHRoaXMpO1xuICAgICAgICAgIHRoaXMuX19zdGF0ZS5zcGFjZSA9ICdIU1YnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fX3N0YXRlW2NvbXBvbmVudF0gPSB2O1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbiAgZnVuY3Rpb24gcmVjYWxjdWxhdGVSR0IoY29sb3IsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpIHtcblxuICAgIGlmIChjb2xvci5fX3N0YXRlLnNwYWNlID09PSAnSEVYJykge1xuXG4gICAgICBjb2xvci5fX3N0YXRlW2NvbXBvbmVudF0gPSBtYXRoLmNvbXBvbmVudF9mcm9tX2hleChjb2xvci5fX3N0YXRlLmhleCwgY29tcG9uZW50SGV4SW5kZXgpO1xuXG4gICAgfSBlbHNlIGlmIChjb2xvci5fX3N0YXRlLnNwYWNlID09PSAnSFNWJykge1xuXG4gICAgICBjb21tb24uZXh0ZW5kKGNvbG9yLl9fc3RhdGUsIG1hdGguaHN2X3RvX3JnYihjb2xvci5fX3N0YXRlLmgsIGNvbG9yLl9fc3RhdGUucywgY29sb3IuX19zdGF0ZS52KSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aHJvdyAnQ29ycnVwdGVkIGNvbG9yIHN0YXRlJztcblxuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gcmVjYWxjdWxhdGVIU1YoY29sb3IpIHtcblxuICAgIHZhciByZXN1bHQgPSBtYXRoLnJnYl90b19oc3YoY29sb3IuciwgY29sb3IuZywgY29sb3IuYik7XG5cbiAgICBjb21tb24uZXh0ZW5kKGNvbG9yLl9fc3RhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICBzOiByZXN1bHQucyxcbiAgICAgICAgICB2OiByZXN1bHQudlxuICAgICAgICB9XG4gICAgKTtcblxuICAgIGlmICghY29tbW9uLmlzTmFOKHJlc3VsdC5oKSkge1xuICAgICAgY29sb3IuX19zdGF0ZS5oID0gcmVzdWx0Lmg7XG4gICAgfSBlbHNlIGlmIChjb21tb24uaXNVbmRlZmluZWQoY29sb3IuX19zdGF0ZS5oKSkge1xuICAgICAgY29sb3IuX19zdGF0ZS5oID0gMDtcbiAgICB9XG5cbiAgfVxuXG4gIHJldHVybiBDb2xvcjtcblxufSkoZGF0LmNvbG9yLmludGVycHJldCA9IChmdW5jdGlvbiAodG9TdHJpbmcsIGNvbW1vbikge1xuXG4gIHZhciByZXN1bHQsIHRvUmV0dXJuO1xuXG4gIHZhciBpbnRlcnByZXQgPSBmdW5jdGlvbigpIHtcblxuICAgIHRvUmV0dXJuID0gZmFsc2U7XG5cbiAgICB2YXIgb3JpZ2luYWwgPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGNvbW1vbi50b0FycmF5KGFyZ3VtZW50cykgOiBhcmd1bWVudHNbMF07XG5cbiAgICBjb21tb24uZWFjaChJTlRFUlBSRVRBVElPTlMsIGZ1bmN0aW9uKGZhbWlseSkge1xuXG4gICAgICBpZiAoZmFtaWx5LmxpdG11cyhvcmlnaW5hbCkpIHtcblxuICAgICAgICBjb21tb24uZWFjaChmYW1pbHkuY29udmVyc2lvbnMsIGZ1bmN0aW9uKGNvbnZlcnNpb24sIGNvbnZlcnNpb25OYW1lKSB7XG5cbiAgICAgICAgICByZXN1bHQgPSBjb252ZXJzaW9uLnJlYWQob3JpZ2luYWwpO1xuXG4gICAgICAgICAgaWYgKHRvUmV0dXJuID09PSBmYWxzZSAmJiByZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0b1JldHVybiA9IHJlc3VsdDtcbiAgICAgICAgICAgIHJlc3VsdC5jb252ZXJzaW9uTmFtZSA9IGNvbnZlcnNpb25OYW1lO1xuICAgICAgICAgICAgcmVzdWx0LmNvbnZlcnNpb24gPSBjb252ZXJzaW9uO1xuICAgICAgICAgICAgcmV0dXJuIGNvbW1vbi5CUkVBSztcblxuICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gY29tbW9uLkJSRUFLO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIHJldHVybiB0b1JldHVybjtcblxuICB9O1xuXG4gIHZhciBJTlRFUlBSRVRBVElPTlMgPSBbXG5cbiAgICAvLyBTdHJpbmdzXG4gICAge1xuXG4gICAgICBsaXRtdXM6IGNvbW1vbi5pc1N0cmluZyxcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBUSFJFRV9DSEFSX0hFWDoge1xuXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcblxuICAgICAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXiMoW0EtRjAtOV0pKFtBLUYwLTldKShbQS1GMC05XSkkL2kpO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdIRVgnLFxuICAgICAgICAgICAgICBoZXg6IHBhcnNlSW50KFxuICAgICAgICAgICAgICAgICAgJzB4JyArXG4gICAgICAgICAgICAgICAgICAgICAgdGVzdFsxXS50b1N0cmluZygpICsgdGVzdFsxXS50b1N0cmluZygpICtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXN0WzJdLnRvU3RyaW5nKCkgKyB0ZXN0WzJdLnRvU3RyaW5nKCkgK1xuICAgICAgICAgICAgICAgICAgICAgIHRlc3RbM10udG9TdHJpbmcoKSArIHRlc3RbM10udG9TdHJpbmcoKSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfSxcblxuICAgICAgICBTSVhfQ0hBUl9IRVg6IHtcblxuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG5cbiAgICAgICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL14jKFtBLUYwLTldezZ9KSQvaSk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ0hFWCcsXG4gICAgICAgICAgICAgIGhleDogcGFyc2VJbnQoJzB4JyArIHRlc3RbMV0udG9TdHJpbmcoKSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfSxcblxuICAgICAgICBDU1NfUkdCOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9ecmdiXFwoXFxzKiguKylcXHMqLFxccyooLispXFxzKixcXHMqKC4rKVxccypcXCkvKTtcbiAgICAgICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgICAgcjogcGFyc2VGbG9hdCh0ZXN0WzFdKSxcbiAgICAgICAgICAgICAgZzogcGFyc2VGbG9hdCh0ZXN0WzJdKSxcbiAgICAgICAgICAgICAgYjogcGFyc2VGbG9hdCh0ZXN0WzNdKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogdG9TdHJpbmdcblxuICAgICAgICB9LFxuXG4gICAgICAgIENTU19SR0JBOiB7XG5cbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuXG4gICAgICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9ecmdiYVxcKFxccyooLispXFxzKixcXHMqKC4rKVxccyosXFxzKiguKylcXHMqXFwsXFxzKiguKylcXHMqXFwpLyk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IHBhcnNlRmxvYXQodGVzdFsxXSksXG4gICAgICAgICAgICAgIGc6IHBhcnNlRmxvYXQodGVzdFsyXSksXG4gICAgICAgICAgICAgIGI6IHBhcnNlRmxvYXQodGVzdFszXSksXG4gICAgICAgICAgICAgIGE6IHBhcnNlRmxvYXQodGVzdFs0XSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IHRvU3RyaW5nXG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gTnVtYmVyc1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNOdW1iZXIsXG5cbiAgICAgIGNvbnZlcnNpb25zOiB7XG5cbiAgICAgICAgSEVYOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHNwYWNlOiAnSEVYJyxcbiAgICAgICAgICAgICAgaGV4OiBvcmlnaW5hbCxcbiAgICAgICAgICAgICAgY29udmVyc2lvbk5hbWU6ICdIRVgnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIGNvbG9yLmhleDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8vIEFycmF5c1xuICAgIHtcblxuICAgICAgbGl0bXVzOiBjb21tb24uaXNBcnJheSxcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBSR0JfQVJSQVk6IHtcbiAgICAgICAgICByZWFkOiBmdW5jdGlvbihvcmlnaW5hbCkge1xuICAgICAgICAgICAgaWYgKG9yaWdpbmFsLmxlbmd0aCAhPSAzKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICAgIHI6IG9yaWdpbmFsWzBdLFxuICAgICAgICAgICAgICBnOiBvcmlnaW5hbFsxXSxcbiAgICAgICAgICAgICAgYjogb3JpZ2luYWxbMl1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIFtjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBSR0JBX0FSUkFZOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbC5sZW5ndGggIT0gNCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICByOiBvcmlnaW5hbFswXSxcbiAgICAgICAgICAgICAgZzogb3JpZ2luYWxbMV0sXG4gICAgICAgICAgICAgIGI6IG9yaWdpbmFsWzJdLFxuICAgICAgICAgICAgICBhOiBvcmlnaW5hbFszXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gW2NvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIsIGNvbG9yLmFdO1xuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvLyBPYmplY3RzXG4gICAge1xuXG4gICAgICBsaXRtdXM6IGNvbW1vbi5pc09iamVjdCxcblxuICAgICAgY29udmVyc2lvbnM6IHtcblxuICAgICAgICBSR0JBX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnIpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmcpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmIpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmEpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICAgIHI6IG9yaWdpbmFsLnIsXG4gICAgICAgICAgICAgICAgZzogb3JpZ2luYWwuZyxcbiAgICAgICAgICAgICAgICBiOiBvcmlnaW5hbC5iLFxuICAgICAgICAgICAgICAgIGE6IG9yaWdpbmFsLmFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHI6IGNvbG9yLnIsXG4gICAgICAgICAgICAgIGc6IGNvbG9yLmcsXG4gICAgICAgICAgICAgIGI6IGNvbG9yLmIsXG4gICAgICAgICAgICAgIGE6IGNvbG9yLmFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgUkdCX09CSjoge1xuICAgICAgICAgIHJlYWQ6IGZ1bmN0aW9uKG9yaWdpbmFsKSB7XG4gICAgICAgICAgICBpZiAoY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnIpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmcpICYmXG4gICAgICAgICAgICAgICAgY29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmIpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgICAgIHI6IG9yaWdpbmFsLnIsXG4gICAgICAgICAgICAgICAgZzogb3JpZ2luYWwuZyxcbiAgICAgICAgICAgICAgICBiOiBvcmlnaW5hbC5iXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICByOiBjb2xvci5yLFxuICAgICAgICAgICAgICBnOiBjb2xvci5nLFxuICAgICAgICAgICAgICBiOiBjb2xvci5iXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIEhTVkFfT0JKOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuaCkgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwucykgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwudikgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuYSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzcGFjZTogJ0hTVicsXG4gICAgICAgICAgICAgICAgaDogb3JpZ2luYWwuaCxcbiAgICAgICAgICAgICAgICBzOiBvcmlnaW5hbC5zLFxuICAgICAgICAgICAgICAgIHY6IG9yaWdpbmFsLnYsXG4gICAgICAgICAgICAgICAgYTogb3JpZ2luYWwuYVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHdyaXRlOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgaDogY29sb3IuaCxcbiAgICAgICAgICAgICAgczogY29sb3IucyxcbiAgICAgICAgICAgICAgdjogY29sb3IudixcbiAgICAgICAgICAgICAgYTogY29sb3IuYVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBIU1ZfT0JKOiB7XG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICAgICAgICAgIGlmIChjb21tb24uaXNOdW1iZXIob3JpZ2luYWwuaCkgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwucykgJiZcbiAgICAgICAgICAgICAgICBjb21tb24uaXNOdW1iZXIob3JpZ2luYWwudikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzcGFjZTogJ0hTVicsXG4gICAgICAgICAgICAgICAgaDogb3JpZ2luYWwuaCxcbiAgICAgICAgICAgICAgICBzOiBvcmlnaW5hbC5zLFxuICAgICAgICAgICAgICAgIHY6IG9yaWdpbmFsLnZcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB3cml0ZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGg6IGNvbG9yLmgsXG4gICAgICAgICAgICAgIHM6IGNvbG9yLnMsXG4gICAgICAgICAgICAgIHY6IGNvbG9yLnZcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG5cblxuICBdO1xuXG4gIHJldHVybiBpbnRlcnByZXQ7XG5cblxufSkoZGF0LmNvbG9yLnRvU3RyaW5nLFxuZGF0LnV0aWxzLmNvbW1vbiksXG5kYXQuY29sb3IubWF0aCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIHRtcENvbXBvbmVudDtcblxuICByZXR1cm4ge1xuXG4gICAgaHN2X3RvX3JnYjogZnVuY3Rpb24oaCwgcywgdikge1xuXG4gICAgICB2YXIgaGkgPSBNYXRoLmZsb29yKGggLyA2MCkgJSA2O1xuXG4gICAgICB2YXIgZiA9IGggLyA2MCAtIE1hdGguZmxvb3IoaCAvIDYwKTtcbiAgICAgIHZhciBwID0gdiAqICgxLjAgLSBzKTtcbiAgICAgIHZhciBxID0gdiAqICgxLjAgLSAoZiAqIHMpKTtcbiAgICAgIHZhciB0ID0gdiAqICgxLjAgLSAoKDEuMCAtIGYpICogcykpO1xuICAgICAgdmFyIGMgPSBbXG4gICAgICAgIFt2LCB0LCBwXSxcbiAgICAgICAgW3EsIHYsIHBdLFxuICAgICAgICBbcCwgdiwgdF0sXG4gICAgICAgIFtwLCBxLCB2XSxcbiAgICAgICAgW3QsIHAsIHZdLFxuICAgICAgICBbdiwgcCwgcV1cbiAgICAgIF1baGldO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICByOiBjWzBdICogMjU1LFxuICAgICAgICBnOiBjWzFdICogMjU1LFxuICAgICAgICBiOiBjWzJdICogMjU1XG4gICAgICB9O1xuXG4gICAgfSxcblxuICAgIHJnYl90b19oc3Y6IGZ1bmN0aW9uKHIsIGcsIGIpIHtcblxuICAgICAgdmFyIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpLFxuICAgICAgICAgIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLFxuICAgICAgICAgIGRlbHRhID0gbWF4IC0gbWluLFxuICAgICAgICAgIGgsIHM7XG5cbiAgICAgIGlmIChtYXggIT0gMCkge1xuICAgICAgICBzID0gZGVsdGEgLyBtYXg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGg6IE5hTixcbiAgICAgICAgICBzOiAwLFxuICAgICAgICAgIHY6IDBcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKHIgPT0gbWF4KSB7XG4gICAgICAgIGggPSAoZyAtIGIpIC8gZGVsdGE7XG4gICAgICB9IGVsc2UgaWYgKGcgPT0gbWF4KSB7XG4gICAgICAgIGggPSAyICsgKGIgLSByKSAvIGRlbHRhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaCA9IDQgKyAociAtIGcpIC8gZGVsdGE7XG4gICAgICB9XG4gICAgICBoIC89IDY7XG4gICAgICBpZiAoaCA8IDApIHtcbiAgICAgICAgaCArPSAxO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBoOiBoICogMzYwLFxuICAgICAgICBzOiBzLFxuICAgICAgICB2OiBtYXggLyAyNTVcbiAgICAgIH07XG4gICAgfSxcblxuICAgIHJnYl90b19oZXg6IGZ1bmN0aW9uKHIsIGcsIGIpIHtcbiAgICAgIHZhciBoZXggPSB0aGlzLmhleF93aXRoX2NvbXBvbmVudCgwLCAyLCByKTtcbiAgICAgIGhleCA9IHRoaXMuaGV4X3dpdGhfY29tcG9uZW50KGhleCwgMSwgZyk7XG4gICAgICBoZXggPSB0aGlzLmhleF93aXRoX2NvbXBvbmVudChoZXgsIDAsIGIpO1xuICAgICAgcmV0dXJuIGhleDtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50X2Zyb21faGV4OiBmdW5jdGlvbihoZXgsIGNvbXBvbmVudEluZGV4KSB7XG4gICAgICByZXR1cm4gKGhleCA+PiAoY29tcG9uZW50SW5kZXggKiA4KSkgJiAweEZGO1xuICAgIH0sXG5cbiAgICBoZXhfd2l0aF9jb21wb25lbnQ6IGZ1bmN0aW9uKGhleCwgY29tcG9uZW50SW5kZXgsIHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPDwgKHRtcENvbXBvbmVudCA9IGNvbXBvbmVudEluZGV4ICogOCkgfCAoaGV4ICYgfiAoMHhGRiA8PCB0bXBDb21wb25lbnQpKTtcbiAgICB9XG5cbiAgfVxuXG59KSgpLFxuZGF0LmNvbG9yLnRvU3RyaW5nLFxuZGF0LnV0aWxzLmNvbW1vbik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3ZlbmRvci9kYXQuZ3VpJylcbm1vZHVsZS5leHBvcnRzLmNvbG9yID0gcmVxdWlyZSgnLi92ZW5kb3IvZGF0LmNvbG9yJykiLCIvKiBnbG9iYWwgcmVxdWVzdEFuaW1hdGlvbkZyYW1lICovXG5cbmltcG9ydCB7IGNyZWF0ZVNwcmluZyB9IGZyb20gJy4uL3NyYydcbmltcG9ydCB7IEdVSSB9IGZyb20gJ2RhdC1ndWknXG5cbmNvbnN0IE1BWF9SQURJVVMgPSAxMDBcbmNvbnN0IE1JTl9SQURJVVMgPSA1XG5jb25zdCBMQVNUX1ZBTFVFU19UUkFJTF9MRU5HVEggPSA1MDBcblxuY29uc3Qgc2V0dGluZ3MgPSB7XG4gIHN0aWZmbmVzczogMC4wMDMsXG4gIGRhbXBlbmluZzogMC4xXG59XG5cbmNvbnN0IGd1aSA9IG5ldyBHVUkoKVxuZ3VpLmFkZChzZXR0aW5ncywgJ3N0aWZmbmVzcycsIDAuMDAxLCAwLjA4KS5zdGVwKDAuMDAxKVxuZ3VpLmFkZChzZXR0aW5ncywgJ2RhbXBlbmluZycsIDAuMDEsIDAuNSkuc3RlcCgwLjAxKVxuZ3VpLmFkZCh7IGNsZWFyOiBzZXR1cFNwcmluZ3MgfSwgJ2NsZWFyJylcblxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJylcbmNvbnN0IGN0eCA9IHNldHVwQ2FudmFzQW5kR2V0Q29udGV4dChjYW52YXMpXG5cbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIGlmIChcbiAgICBjaXJjbGUucG9zaXRpb25TcHJpbmcuaXNBdERlc3RpbmF0aW9uKDAuMikgJiZcbiAgICBjaXJjbGUucmFkaXVzU3ByaW5nLmlzQXREZXN0aW5hdGlvbigwLjIpXG4gICkge1xuICAgIGxhc3RWYWx1ZXMgPSBbXVxuICB9XG4gIHNldFBvc2l0aW9uQW5kUmFkaXVzKFtlLm9mZnNldFgsIGUub2Zmc2V0WV0pXG59KVxuXG5jb25zdCBjZW50ZXIgPSBbY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAvIDJdXG5sZXQgbGFzdFZhbHVlcyA9IFtdXG5cbmxldCBjaXJjbGVcbnNldHVwU3ByaW5ncygpXG5zZXRQb3NpdGlvbkFuZFJhZGl1cyhjZW50ZXIpXG5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcClcblxuZnVuY3Rpb24gc2V0dXBTcHJpbmdzICgpIHtcbiAgY29uc3QgZGFtcGVuaW5nID0gc2V0dGluZ3MuZGFtcGVuaW5nXG4gIGNvbnN0IHN0aWZmbmVzcyA9IHNldHRpbmdzLnN0aWZmbmVzc1xuICBsYXN0VmFsdWVzID0gW11cbiAgY2lyY2xlID0ge1xuICAgIHJhZGl1c1NwcmluZzogY3JlYXRlU3ByaW5nKHN0aWZmbmVzcywgZGFtcGVuaW5nLCAxMCksXG4gICAgcG9zaXRpb25TcHJpbmc6IGNyZWF0ZVNwcmluZyhzdGlmZm5lc3MsIGRhbXBlbmluZywgY2VudGVyKVxuICB9XG59XG5cbmZ1bmN0aW9uIHNldFBvc2l0aW9uQW5kUmFkaXVzIChwb3NpdGlvbikge1xuICBjb25zdCBuZXdSYWRpdXMgPSAoTUFYX1JBRElVUyAtIE1JTl9SQURJVVMpICogTWF0aC5yYW5kb20oKSArIE1JTl9SQURJVVNcbiAgY2lyY2xlLnJhZGl1c1NwcmluZy5zZXREZXN0aW5hdGlvbihuZXdSYWRpdXMpXG4gIGNpcmNsZS5wb3NpdGlvblNwcmluZy5zZXREZXN0aW5hdGlvbihwb3NpdGlvbilcbn1cblxuZnVuY3Rpb24gc2V0dXBDYW52YXNBbmRHZXRDb250ZXh0IChjYW52YXMpIHtcbiAgbGV0IHsgd2lkdGgsIGhlaWdodCB9ID0gY2FudmFzLnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgaGVpZ2h0ICo9IDJcbiAgY2FudmFzLndpZHRoID0gd2lkdGhcbiAgY2FudmFzLmhlaWdodCA9IGhlaWdodFxuICBjYW52YXMuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1weGBcbiAgY2FudmFzLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGBcbiAgcmV0dXJuIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG59XG5cbmZ1bmN0aW9uIGxvb3AgKCkge1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcClcbiAgY2xlYXJSZWN0KGN0eCwgJ3JnYigyNDgsIDI0NSwgMjUwKScpXG4gIGNpcmNsZS5wb3NpdGlvblNwcmluZy50aWNrKHNldHRpbmdzLnN0aWZmbmVzcywgc2V0dGluZ3MuZGFtcGVuaW5nKVxuICBjaXJjbGUucmFkaXVzU3ByaW5nLnRpY2soc2V0dGluZ3Muc3RpZmZuZXNzLCBzZXR0aW5ncy5kYW1wZW5pbmcpXG4gIGNvbnN0IHBvc2l0aW9uID0gY2lyY2xlLnBvc2l0aW9uU3ByaW5nLmdldEN1cnJlbnRWYWx1ZSgpXG4gIGNvbnN0IHJhZGl1cyA9IGNpcmNsZS5yYWRpdXNTcHJpbmcuZ2V0Q3VycmVudFZhbHVlKClcbiAgbGFzdFZhbHVlcyA9IGxhc3RWYWx1ZXMuc2xpY2UoTWF0aC5tYXgoMCwgbGFzdFZhbHVlcy5sZW5ndGggLSBMQVNUX1ZBTFVFU19UUkFJTF9MRU5HVEgpKVxuICBsYXN0VmFsdWVzLmZvckVhY2goKFtwb3MsIHJhZF0pID0+IGRyYXdDaXJjbGUoY3R4LCBwb3MsIHJhZCwgJ3RyYW5zcGFyZW50JywgJ3JnYmEoOTQsIDEyNiwgMTc4LCAwLjQpJykpXG4gIGRyYXdDaXJjbGUoY3R4LCBwb3NpdGlvbiwgcmFkaXVzLCAncmdiKDk0LCAxMjYsIDE3OCknLCAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpJylcbiAgbGFzdFZhbHVlcy5wdXNoKFtwb3NpdGlvbiwgcmFkaXVzXSlcbn1cblxuZnVuY3Rpb24gZHJhd0NpcmNsZSAoY3R4LCBwb3NpdGlvbiwgcmFkaXVzLCBmaWxsQ29sb3IgPSAndHJhbnNwYXJlbnQnLCBzdHJva2VDb2xvciA9ICd0cmFuc3BhcmVudCcpIHtcbiAgaWYgKHJhZGl1cyA8IDApIHJldHVyblxuICBjdHguYmVnaW5QYXRoKClcbiAgY3R4LnN0cm9rZVN0eWxlID0gc3Ryb2tlQ29sb3JcbiAgY3R4LmZpbGxTdHlsZSA9IGZpbGxDb2xvclxuICBjdHguYXJjKHBvc2l0aW9uWzBdLCBwb3NpdGlvblsxXSwgcmFkaXVzLCAwLCBNYXRoLlBJICogMilcbiAgY3R4LmZpbGwoKVxuICBjdHguc3Ryb2tlKClcbn1cblxuZnVuY3Rpb24gY2xlYXJSZWN0IChjdHgsIGNvbG9yKSB7XG4gIGN0eC5iZWdpblBhdGgoKVxuICBjdHguZmlsbFN0eWxlID0gY29sb3JcbiAgY3R4LnJlY3QoMCwgMCwgY3R4LmNhbnZhcy53aWR0aCwgY3R4LmNhbnZhcy5oZWlnaHQpXG4gIGN0eC5maWxsKClcbn1cbiJdLCJuYW1lcyI6WyJ2ZWNOb3JtYWxpemUiLCJ2ZWNTY2FsZSIsInJlcXVpcmUkJDAiLCJyZXF1aXJlJCQxIiwicmVxdWlyZSQkMiIsInJlcXVpcmUkJDMiLCJyZXF1aXJlJCQ0IiwicmVxdWlyZSQkNSIsInJlcXVpcmUkJDYiLCJyZXF1aXJlJCQ3IiwicmVxdWlyZSQkOCIsInJlcXVpcmUkJDkiLCJyZXF1aXJlJCQxMCIsInJlcXVpcmUkJDExIiwicmVxdWlyZSQkMTIiLCJyZXF1aXJlJCQxMyIsInJlcXVpcmUkJDE0IiwicmVxdWlyZSQkMTUiLCJyZXF1aXJlJCQxNiIsInJlcXVpcmUkJDE3IiwicmVxdWlyZSQkMTgiLCJyZXF1aXJlJCQxOSIsInJlcXVpcmUkJDIwIiwicmVxdWlyZSQkMjEiLCJyZXF1aXJlJCQyMiIsInJlcXVpcmUkJDIzIiwicmVxdWlyZSQkMjQiLCJ2ZWM0IiwiR1VJIl0sIm1hcHBpbmdzIjoiOzs7RUFBQSxZQUFjLEdBQUcsT0FBTTs7Ozs7OztFQU92QixTQUFTLE1BQU0sSUFBSTtJQUNqQixJQUFJLEdBQUcsR0FBRyxJQUFJLFlBQVksQ0FBQyxDQUFDLEVBQUM7SUFDN0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUM7SUFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQztJQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFDO0lBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUM7SUFDVixPQUFPLEdBQUc7R0FDWDs7RUNkRCxXQUFjLEdBQUcsTUFBSzs7Ozs7Ozs7RUFRdEIsU0FBUyxLQUFLLEVBQUUsQ0FBQyxFQUFFO0lBQ2pCLElBQUksR0FBRyxHQUFHLElBQUksWUFBWSxDQUFDLENBQUMsRUFBQztJQUM3QixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUNiLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQ2IsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDYixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUNiLE9BQU8sR0FBRztHQUNYOztFQ2ZELGdCQUFjLEdBQUcsV0FBVTs7Ozs7Ozs7Ozs7RUFXM0IsU0FBUyxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQy9CLElBQUksR0FBRyxHQUFHLElBQUksWUFBWSxDQUFDLENBQUMsRUFBQztJQUM3QixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQztJQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFDO0lBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUM7SUFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQztJQUNWLE9BQU8sR0FBRztHQUNYOztFQ2xCRCxVQUFjLEdBQUcsS0FBSTs7Ozs7Ozs7O0VBU3JCLFNBQVMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUU7SUFDckIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDYixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUNiLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQ2IsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDYixPQUFPLEdBQUc7R0FDWDs7RUNmRCxTQUFjLEdBQUcsSUFBRzs7Ozs7Ozs7Ozs7O0VBWXBCLFNBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDN0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUM7SUFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQztJQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFDO0lBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUM7SUFDVixPQUFPLEdBQUc7R0FDWDs7RUNsQkQsU0FBYyxHQUFHLElBQUc7Ozs7Ozs7Ozs7RUFVcEIsU0FBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDdkIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQ3BCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUNwQixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDcEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQ3BCLE9BQU8sR0FBRztHQUNYOztFQ2hCRCxjQUFjLEdBQUcsU0FBUTs7Ozs7Ozs7OztFQVV6QixTQUFTLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUM1QixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDcEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQ3BCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUNwQixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDcEIsT0FBTyxHQUFHO0dBQ1g7O0VDaEJELGNBQWMsR0FBRyxTQUFROzs7Ozs7Ozs7O0VBVXpCLFNBQVMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQzVCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUNwQixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDcEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQ3BCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUNwQixPQUFPLEdBQUc7R0FDWDs7RUNoQkQsWUFBYyxHQUFHLE9BQU07Ozs7Ozs7Ozs7RUFVdkIsU0FBUyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDMUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQ3BCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUNwQixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDcEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQ3BCLE9BQU8sR0FBRztHQUNYOztFQ2hCRCxTQUFjLEdBQUcsSUFBRzs7Ozs7Ozs7OztFQVVwQixTQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUN2QixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQzdCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDN0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUM3QixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQzdCLE9BQU8sR0FBRztHQUNYOztFQ2hCRCxTQUFjLEdBQUcsSUFBRzs7Ozs7Ozs7OztFQVVwQixTQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUN2QixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQzdCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENB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QyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsR0FBRztVQUNOLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7VUFDVCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1VBQ1QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztVQUNULENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7VUFDVCxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1VBQ1QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNWLENBQUMsRUFBRSxDQUFDLENBQUM7O1FBRU4sT0FBTztVQUNMLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRztVQUNiLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRztVQUNiLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRztTQUNkLENBQUM7O09BRUg7O01BRUQsVUFBVSxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7O1FBRTVCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdkIsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFB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
