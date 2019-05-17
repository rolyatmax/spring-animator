(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.SpringAnimator = {}));
}(this, function (exports) { 'use strict';

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

    function tick (out = [], s = stiffness, d = dampening) {
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
      return getCurrentValue(out)
    }
  }

  exports.createSpring = createSpring;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW1kLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9jcmVhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9jbG9uZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L2Zyb21WYWx1ZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9jb3B5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvc2V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvYWRkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvc3VidHJhY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9tdWx0aXBseS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L2RpdmlkZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L21pbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L21heC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L3NjYWxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvc2NhbGVBbmRBZGQuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9kaXN0YW5jZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L3NxdWFyZWREaXN0YW5jZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L2xlbmd0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L3NxdWFyZWRMZW5ndGguanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9uZWdhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9pbnZlcnNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvbm9ybWFsaXplLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvZG90LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvbGVycC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L3JhbmRvbS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L3RyYW5zZm9ybU1hdDQuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC90cmFuc2Zvcm1RdWF0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvaW5kZXguanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3LCBlbXB0eSB2ZWM0XG4gKlxuICogQHJldHVybnMge3ZlYzR9IGEgbmV3IDREIHZlY3RvclxuICovXG5mdW5jdGlvbiBjcmVhdGUgKCkge1xuICB2YXIgb3V0ID0gbmV3IEZsb2F0MzJBcnJheSg0KVxuICBvdXRbMF0gPSAwXG4gIG91dFsxXSA9IDBcbiAgb3V0WzJdID0gMFxuICBvdXRbM10gPSAwXG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gY2xvbmVcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzQgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdmVjdG9yIHRvIGNsb25lXG4gKiBAcmV0dXJucyB7dmVjNH0gYSBuZXcgNEQgdmVjdG9yXG4gKi9cbmZ1bmN0aW9uIGNsb25lIChhKSB7XG4gIHZhciBvdXQgPSBuZXcgRmxvYXQzMkFycmF5KDQpXG4gIG91dFswXSA9IGFbMF1cbiAgb3V0WzFdID0gYVsxXVxuICBvdXRbMl0gPSBhWzJdXG4gIG91dFszXSA9IGFbM11cbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmcm9tVmFsdWVzXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWM0IGluaXRpYWxpemVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB3IFcgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjNH0gYSBuZXcgNEQgdmVjdG9yXG4gKi9cbmZ1bmN0aW9uIGZyb21WYWx1ZXMgKHgsIHksIHosIHcpIHtcbiAgdmFyIG91dCA9IG5ldyBGbG9hdDMyQXJyYXkoNClcbiAgb3V0WzBdID0geFxuICBvdXRbMV0gPSB5XG4gIG91dFsyXSA9IHpcbiAgb3V0WzNdID0gd1xuICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGNvcHlcblxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgdmVjNCB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgc291cmNlIHZlY3RvclxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiBjb3B5IChvdXQsIGEpIHtcbiAgb3V0WzBdID0gYVswXVxuICBvdXRbMV0gPSBhWzFdXG4gIG91dFsyXSA9IGFbMl1cbiAgb3V0WzNdID0gYVszXVxuICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHNldFxuXG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzQgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0gdyBXIGNvbXBvbmVudFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiBzZXQgKG91dCwgeCwgeSwgeiwgdykge1xuICBvdXRbMF0gPSB4XG4gIG91dFsxXSA9IHlcbiAgb3V0WzJdID0gelxuICBvdXRbM10gPSB3XG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gYWRkXG5cbi8qKlxuICogQWRkcyB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiBhZGQgKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICsgYlswXVxuICBvdXRbMV0gPSBhWzFdICsgYlsxXVxuICBvdXRbMl0gPSBhWzJdICsgYlsyXVxuICBvdXRbM10gPSBhWzNdICsgYlszXVxuICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHN1YnRyYWN0XG5cbi8qKlxuICogU3VidHJhY3RzIHZlY3RvciBiIGZyb20gdmVjdG9yIGFcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbmZ1bmN0aW9uIHN1YnRyYWN0IChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAtIGJbMF1cbiAgb3V0WzFdID0gYVsxXSAtIGJbMV1cbiAgb3V0WzJdID0gYVsyXSAtIGJbMl1cbiAgb3V0WzNdID0gYVszXSAtIGJbM11cbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBtdWx0aXBseVxuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuZnVuY3Rpb24gbXVsdGlwbHkgKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICogYlswXVxuICBvdXRbMV0gPSBhWzFdICogYlsxXVxuICBvdXRbMl0gPSBhWzJdICogYlsyXVxuICBvdXRbM10gPSBhWzNdICogYlszXVxuICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGRpdmlkZVxuXG4vKipcbiAqIERpdmlkZXMgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuZnVuY3Rpb24gZGl2aWRlIChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAvIGJbMF1cbiAgb3V0WzFdID0gYVsxXSAvIGJbMV1cbiAgb3V0WzJdID0gYVsyXSAvIGJbMl1cbiAgb3V0WzNdID0gYVszXSAvIGJbM11cbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBtaW5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtaW5pbXVtIG9mIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbmZ1bmN0aW9uIG1pbiAob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IE1hdGgubWluKGFbMF0sIGJbMF0pXG4gIG91dFsxXSA9IE1hdGgubWluKGFbMV0sIGJbMV0pXG4gIG91dFsyXSA9IE1hdGgubWluKGFbMl0sIGJbMl0pXG4gIG91dFszXSA9IE1hdGgubWluKGFbM10sIGJbM10pXG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gbWF4XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWF4aW11bSBvZiB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiBtYXggKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBNYXRoLm1heChhWzBdLCBiWzBdKVxuICBvdXRbMV0gPSBNYXRoLm1heChhWzFdLCBiWzFdKVxuICBvdXRbMl0gPSBNYXRoLm1heChhWzJdLCBiWzJdKVxuICBvdXRbM10gPSBNYXRoLm1heChhWzNdLCBiWzNdKVxuICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHNjYWxlXG5cbi8qKlxuICogU2NhbGVzIGEgdmVjNCBieSBhIHNjYWxhciBudW1iZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSB2ZWN0b3IgdG8gc2NhbGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbmZ1bmN0aW9uIHNjYWxlIChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAqIGJcbiAgb3V0WzFdID0gYVsxXSAqIGJcbiAgb3V0WzJdID0gYVsyXSAqIGJcbiAgb3V0WzNdID0gYVszXSAqIGJcbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBzY2FsZUFuZEFkZFxuXG4vKipcbiAqIEFkZHMgdHdvIHZlYzQncyBhZnRlciBzY2FsaW5nIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSB0aGUgYW1vdW50IHRvIHNjYWxlIGIgYnkgYmVmb3JlIGFkZGluZ1xuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiBzY2FsZUFuZEFkZCAob3V0LCBhLCBiLCBzY2FsZSkge1xuICBvdXRbMF0gPSBhWzBdICsgKGJbMF0gKiBzY2FsZSlcbiAgb3V0WzFdID0gYVsxXSArIChiWzFdICogc2NhbGUpXG4gIG91dFsyXSA9IGFbMl0gKyAoYlsyXSAqIHNjYWxlKVxuICBvdXRbM10gPSBhWzNdICsgKGJbM10gKiBzY2FsZSlcbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBkaXN0YW5jZVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG5mdW5jdGlvbiBkaXN0YW5jZSAoYSwgYikge1xuICB2YXIgeCA9IGJbMF0gLSBhWzBdLFxuICAgIHkgPSBiWzFdIC0gYVsxXSxcbiAgICB6ID0gYlsyXSAtIGFbMl0sXG4gICAgdyA9IGJbM10gLSBhWzNdXG4gIHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHcpXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHNxdWFyZWREaXN0YW5jZVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xuZnVuY3Rpb24gc3F1YXJlZERpc3RhbmNlIChhLCBiKSB7XG4gIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgeSA9IGJbMV0gLSBhWzFdLFxuICAgIHogPSBiWzJdIC0gYVsyXSxcbiAgICB3ID0gYlszXSAtIGFbM11cbiAgcmV0dXJuIHggKiB4ICsgeSAqIHkgKyB6ICogeiArIHcgKiB3XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGxlbmd0aFxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGxlbmd0aCBvZiBhXG4gKi9cbmZ1bmN0aW9uIGxlbmd0aCAoYSkge1xuICB2YXIgeCA9IGFbMF0sXG4gICAgeSA9IGFbMV0sXG4gICAgeiA9IGFbMl0sXG4gICAgdyA9IGFbM11cbiAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdylcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gc3F1YXJlZExlbmd0aFxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHNxdWFyZWQgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGxlbmd0aCBvZiBhXG4gKi9cbmZ1bmN0aW9uIHNxdWFyZWRMZW5ndGggKGEpIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgIHkgPSBhWzFdLFxuICAgIHogPSBhWzJdLFxuICAgIHcgPSBhWzNdXG4gIHJldHVybiB4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogd1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBuZWdhdGVcblxuLyoqXG4gKiBOZWdhdGVzIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdmVjdG9yIHRvIG5lZ2F0ZVxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiBuZWdhdGUgKG91dCwgYSkge1xuICBvdXRbMF0gPSAtYVswXVxuICBvdXRbMV0gPSAtYVsxXVxuICBvdXRbMl0gPSAtYVsyXVxuICBvdXRbM10gPSAtYVszXVxuICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGludmVyc2VcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpbnZlcnNlIG9mIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdmVjdG9yIHRvIGludmVydFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiBpbnZlcnNlIChvdXQsIGEpIHtcbiAgb3V0WzBdID0gMS4wIC8gYVswXVxuICBvdXRbMV0gPSAxLjAgLyBhWzFdXG4gIG91dFsyXSA9IDEuMCAvIGFbMl1cbiAgb3V0WzNdID0gMS4wIC8gYVszXVxuICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IG5vcm1hbGl6ZVxuXG4vKipcbiAqIE5vcm1hbGl6ZSBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHZlY3RvciB0byBub3JtYWxpemVcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplIChvdXQsIGEpIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgIHkgPSBhWzFdLFxuICAgIHogPSBhWzJdLFxuICAgIHcgPSBhWzNdXG4gIHZhciBsZW4gPSB4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogd1xuICBpZiAobGVuID4gMCkge1xuICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKVxuICAgIG91dFswXSA9IHggKiBsZW5cbiAgICBvdXRbMV0gPSB5ICogbGVuXG4gICAgb3V0WzJdID0geiAqIGxlblxuICAgIG91dFszXSA9IHcgKiBsZW5cbiAgfVxuICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGRvdFxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcbiAqL1xuZnVuY3Rpb24gZG90IChhLCBiKSB7XG4gIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdICsgYVsyXSAqIGJbMl0gKyBhWzNdICogYlszXVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBsZXJwXG5cbi8qKlxuICogUGVyZm9ybXMgYSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbmZ1bmN0aW9uIGxlcnAgKG91dCwgYSwgYiwgdCkge1xuICB2YXIgYXggPSBhWzBdLFxuICAgIGF5ID0gYVsxXSxcbiAgICBheiA9IGFbMl0sXG4gICAgYXcgPSBhWzNdXG4gIG91dFswXSA9IGF4ICsgdCAqIChiWzBdIC0gYXgpXG4gIG91dFsxXSA9IGF5ICsgdCAqIChiWzFdIC0gYXkpXG4gIG91dFsyXSA9IGF6ICsgdCAqIChiWzJdIC0gYXopXG4gIG91dFszXSA9IGF3ICsgdCAqIChiWzNdIC0gYXcpXG4gIHJldHVybiBvdXRcbn1cbiIsInZhciB2ZWNOb3JtYWxpemUgPSByZXF1aXJlKCcuL25vcm1hbGl6ZScpXG52YXIgdmVjU2NhbGUgPSByZXF1aXJlKCcuL3NjYWxlJylcblxubW9kdWxlLmV4cG9ydHMgPSByYW5kb21cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gdmVjdG9yIHdpdGggdGhlIGdpdmVuIHNjYWxlXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSBbc2NhbGVdIExlbmd0aCBvZiB0aGUgcmVzdWx0aW5nIHZlY3Rvci4gSWYgb21taXR0ZWQsIGEgdW5pdCB2ZWN0b3Igd2lsbCBiZSByZXR1cm5lZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiByYW5kb20gKG91dCwgc2NhbGUpIHtcbiAgc2NhbGUgPSBzY2FsZSB8fCAxLjBcblxuICAvLyBUT0RPOiBUaGlzIGlzIGEgcHJldHR5IGF3ZnVsIHdheSBvZiBkb2luZyB0aGlzLiBGaW5kIHNvbWV0aGluZyBiZXR0ZXIuXG4gIG91dFswXSA9IE1hdGgucmFuZG9tKClcbiAgb3V0WzFdID0gTWF0aC5yYW5kb20oKVxuICBvdXRbMl0gPSBNYXRoLnJhbmRvbSgpXG4gIG91dFszXSA9IE1hdGgucmFuZG9tKClcbiAgdmVjTm9ybWFsaXplKG91dCwgb3V0KVxuICB2ZWNTY2FsZShvdXQsIG91dCwgc2NhbGUpXG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gdHJhbnNmb3JtTWF0NFxuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzQgd2l0aCBhIG1hdDQuXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHttYXQ0fSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiB0cmFuc2Zvcm1NYXQ0IChvdXQsIGEsIG0pIHtcbiAgdmFyIHggPSBhWzBdLCB5ID0gYVsxXSwgeiA9IGFbMl0sIHcgPSBhWzNdXG4gIG91dFswXSA9IG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzhdICogeiArIG1bMTJdICogd1xuICBvdXRbMV0gPSBtWzFdICogeCArIG1bNV0gKiB5ICsgbVs5XSAqIHogKyBtWzEzXSAqIHdcbiAgb3V0WzJdID0gbVsyXSAqIHggKyBtWzZdICogeSArIG1bMTBdICogeiArIG1bMTRdICogd1xuICBvdXRbM10gPSBtWzNdICogeCArIG1bN10gKiB5ICsgbVsxMV0gKiB6ICsgbVsxNV0gKiB3XG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gdHJhbnNmb3JtUXVhdFxuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzQgd2l0aCBhIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge3F1YXR9IHEgcXVhdGVybmlvbiB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiB0cmFuc2Zvcm1RdWF0IChvdXQsIGEsIHEpIHtcbiAgdmFyIHggPSBhWzBdLCB5ID0gYVsxXSwgeiA9IGFbMl0sXG4gICAgcXggPSBxWzBdLCBxeSA9IHFbMV0sIHF6ID0gcVsyXSwgcXcgPSBxWzNdLFxuXG4gICAgLy8gY2FsY3VsYXRlIHF1YXQgKiB2ZWNcbiAgICBpeCA9IHF3ICogeCArIHF5ICogeiAtIHF6ICogeSxcbiAgICBpeSA9IHF3ICogeSArIHF6ICogeCAtIHF4ICogeixcbiAgICBpeiA9IHF3ICogeiArIHF4ICogeSAtIHF5ICogeCxcbiAgICBpdyA9IC1xeCAqIHggLSBxeSAqIHkgLSBxeiAqIHpcblxuICAvLyBjYWxjdWxhdGUgcmVzdWx0ICogaW52ZXJzZSBxdWF0XG4gIG91dFswXSA9IGl4ICogcXcgKyBpdyAqIC1xeCArIGl5ICogLXF6IC0gaXogKiAtcXlcbiAgb3V0WzFdID0gaXkgKiBxdyArIGl3ICogLXF5ICsgaXogKiAtcXggLSBpeCAqIC1xelxuICBvdXRbMl0gPSBpeiAqIHF3ICsgaXcgKiAtcXogKyBpeCAqIC1xeSAtIGl5ICogLXF4XG4gIG91dFszXSA9IGFbM11cbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZTogcmVxdWlyZSgnLi9jcmVhdGUnKSxcbiAgY2xvbmU6IHJlcXVpcmUoJy4vY2xvbmUnKSxcbiAgZnJvbVZhbHVlczogcmVxdWlyZSgnLi9mcm9tVmFsdWVzJyksXG4gIGNvcHk6IHJlcXVpcmUoJy4vY29weScpLFxuICBzZXQ6IHJlcXVpcmUoJy4vc2V0JyksXG4gIGFkZDogcmVxdWlyZSgnLi9hZGQnKSxcbiAgc3VidHJhY3Q6IHJlcXVpcmUoJy4vc3VidHJhY3QnKSxcbiAgbXVsdGlwbHk6IHJlcXVpcmUoJy4vbXVsdGlwbHknKSxcbiAgZGl2aWRlOiByZXF1aXJlKCcuL2RpdmlkZScpLFxuICBtaW46IHJlcXVpcmUoJy4vbWluJyksXG4gIG1heDogcmVxdWlyZSgnLi9tYXgnKSxcbiAgc2NhbGU6IHJlcXVpcmUoJy4vc2NhbGUnKSxcbiAgc2NhbGVBbmRBZGQ6IHJlcXVpcmUoJy4vc2NhbGVBbmRBZGQnKSxcbiAgZGlzdGFuY2U6IHJlcXVpcmUoJy4vZGlzdGFuY2UnKSxcbiAgc3F1YXJlZERpc3RhbmNlOiByZXF1aXJlKCcuL3NxdWFyZWREaXN0YW5jZScpLFxuICBsZW5ndGg6IHJlcXVpcmUoJy4vbGVuZ3RoJyksXG4gIHNxdWFyZWRMZW5ndGg6IHJlcXVpcmUoJy4vc3F1YXJlZExlbmd0aCcpLFxuICBuZWdhdGU6IHJlcXVpcmUoJy4vbmVnYXRlJyksXG4gIGludmVyc2U6IHJlcXVpcmUoJy4vaW52ZXJzZScpLFxuICBub3JtYWxpemU6IHJlcXVpcmUoJy4vbm9ybWFsaXplJyksXG4gIGRvdDogcmVxdWlyZSgnLi9kb3QnKSxcbiAgbGVycDogcmVxdWlyZSgnLi9sZXJwJyksXG4gIHJhbmRvbTogcmVxdWlyZSgnLi9yYW5kb20nKSxcbiAgdHJhbnNmb3JtTWF0NDogcmVxdWlyZSgnLi90cmFuc2Zvcm1NYXQ0JyksXG4gIHRyYW5zZm9ybVF1YXQ6IHJlcXVpcmUoJy4vdHJhbnNmb3JtUXVhdCcpXG59XG4iLCJpbXBvcnQgdmVjNCBmcm9tICdnbC12ZWM0J1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3ByaW5nIChzdGlmZm5lc3MsIGRhbXBlbmluZywgdmFsdWUsIHByZWNpc2lvbikge1xuICBwcmVjaXNpb24gPSBwcmVjaXNpb24gPyBwcmVjaXNpb24gKiBwcmVjaXNpb24gOiBOdW1iZXIuRVBTSUxPTlxuICBjb25zdCBpc0lucHV0QXJyYXkgPSBBcnJheS5pc0FycmF5KHZhbHVlKVxuICBjb25zdCB2ZWNDb21wb25lbnRzID0gaXNJbnB1dEFycmF5ID8gdmFsdWUubGVuZ3RoIDogTnVtYmVyLmlzRmluaXRlKHZhbHVlKSA/IDEgOiBudWxsXG5cbiAgaWYgKCF2ZWNDb21wb25lbnRzIHx8IHZlY0NvbXBvbmVudHMgPiA0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBzcHJpbmctYW5pbWF0b3I6IGV4cGVjdGVkIHZhbHVlIFxcYCR7dmFsdWV9XFxgIHRvIGJlIGEgc2NhbGFyLCB2ZWMyLCB2ZWMzLCBvciB2ZWM0YClcbiAgfVxuXG4gIGZ1bmN0aW9uIG1ha2VWYWx1ZVZlYzQgKG91dCA9IFtdLCB2KSB7XG4gICAgaWYgKGlzSW5wdXRBcnJheSAhPT0gQXJyYXkuaXNBcnJheSh2KSB8fCAoaXNJbnB1dEFycmF5ICYmIHZlY0NvbXBvbmVudHMgIT09IHYubGVuZ3RoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBzcHJpbmctYW5pbWF0b3I6IGRlc3RpbmF0aW9uIHZhbHVlIHR5cGUgbXVzdCBtYXRjaCBpbml0aWFsIHZhbHVlIHR5cGU6ICR7IWlzSW5wdXRBcnJheSA/ICdzY2FsYXInIDogdmVjQ29tcG9uZW50cyArICctY29tcG9uZW50IHZlY3Rvcid9YClcbiAgICB9XG4gICAgaWYgKE51bWJlci5pc0Zpbml0ZSh2KSkge1xuICAgICAgb3V0WzBdID0gdlxuICAgICAgb3V0WzFdID0gb3V0WzJdID0gb3V0WzNdID0gMFxuICAgICAgcmV0dXJuIG91dFxuICAgIH1cbiAgICB2ZWM0LmNvcHkob3V0LCB2KVxuICAgIHdoaWxlIChvdXQubGVuZ3RoIDwgNCkgb3V0LnB1c2goMClcbiAgICByZXR1cm4gb3V0XG4gIH1cblxuICB2YWx1ZSA9IG1ha2VWYWx1ZVZlYzQoW10sIHZhbHVlKVxuICBsZXQgbGFzdFZhbHVlID0gdmVjNC5jb3B5KFtdLCB2YWx1ZSlcbiAgbGV0IGRlc3RpbmF0aW9uVmFsdWUgPSB2ZWM0LmNvcHkoW10sIHZhbHVlKVxuXG4gIC8vIHNldCB1cCBzb21lIHJldXNhYmxlIGFycmF5cyB0byB1c2UgaW4gdGljaygpXG4gIGxldCBuZXh0VmFsdWUgPSBbXVxuICBsZXQgdmVsb2NpdHkgPSBbXVxuICBsZXQgZGVsdGEgPSBbXVxuICBsZXQgc3ByaW5nID0gW11cbiAgbGV0IGRhbXBlciA9IFtdXG4gIGxldCBhY2NlbGVyYXRpb24gPSBbXVxuXG4gIHJldHVybiB7XG4gICAgc2V0RGVzdGluYXRpb24sXG4gICAgZ2V0Q3VycmVudFZhbHVlLFxuICAgIGlzQXREZXN0aW5hdGlvbixcbiAgICB0aWNrXG4gIH1cblxuICBmdW5jdGlvbiBzZXREZXN0aW5hdGlvbiAobmV3VmFsdWUsIHNob3VsZEFuaW1hdGUgPSB0cnVlKSB7XG4gICAgbWFrZVZhbHVlVmVjNChkZXN0aW5hdGlvblZhbHVlLCBuZXdWYWx1ZSlcbiAgICBpZiAoIXNob3VsZEFuaW1hdGUpIHtcbiAgICAgIHZlYzQuY29weSh2YWx1ZSwgZGVzdGluYXRpb25WYWx1ZSlcbiAgICAgIHZlYzQuY29weShsYXN0VmFsdWUsIGRlc3RpbmF0aW9uVmFsdWUpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNBdERlc3RpbmF0aW9uICh0aHJlc2hvbGQpIHtcbiAgICAvLyBzcXVhcmUgdGhpcyBzbyB3ZSBkb24ndCBuZWVkIHRvIHVzZSBNYXRoLnNxcnRcbiAgICB0aHJlc2hvbGQgPSB0aHJlc2hvbGQgPyB0aHJlc2hvbGQgKiB0aHJlc2hvbGQgOiBwcmVjaXNpb25cbiAgICByZXR1cm4gKFxuICAgICAgdmVjNC5zcXVhcmVkRGlzdGFuY2UodmFsdWUsIGRlc3RpbmF0aW9uVmFsdWUpIDw9IHRocmVzaG9sZCAmJlxuICAgICAgdmVjNC5zcXVhcmVkRGlzdGFuY2UodmFsdWUsIGxhc3RWYWx1ZSkgPD0gdGhyZXNob2xkXG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q3VycmVudFZhbHVlIChvdXQgPSBbXSkge1xuICAgIGlmICghaXNJbnB1dEFycmF5KSByZXR1cm4gdmFsdWVbMF1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZlY0NvbXBvbmVudHM7IGkrKykge1xuICAgICAgb3V0W2ldID0gdmFsdWVbaV1cbiAgICB9XG4gICAgcmV0dXJuIG91dFxuICB9XG5cbiAgZnVuY3Rpb24gdGljayAob3V0ID0gW10sIHMgPSBzdGlmZm5lc3MsIGQgPSBkYW1wZW5pbmcpIHtcbiAgICB2ZWM0LnN1YnRyYWN0KHZlbG9jaXR5LCB2YWx1ZSwgbGFzdFZhbHVlKVxuICAgIHZlYzQuc3VidHJhY3QoZGVsdGEsIGRlc3RpbmF0aW9uVmFsdWUsIHZhbHVlKVxuICAgIHZlYzQuc2NhbGUoc3ByaW5nLCBkZWx0YSwgcylcbiAgICB2ZWM0LnNjYWxlKGRhbXBlciwgdmVsb2NpdHksIC1kKVxuICAgIHZlYzQuYWRkKGFjY2VsZXJhdGlvbiwgc3ByaW5nLCBkYW1wZXIpXG4gICAgdmVjNC5hZGQodmVsb2NpdHksIHZlbG9jaXR5LCBhY2NlbGVyYXRpb24pXG4gICAgdmVjNC5hZGQobmV4dFZhbHVlLCB2ZWxvY2l0eSwgdmFsdWUpXG4gICAgdmVjNC5jb3B5KGxhc3RWYWx1ZSwgdmFsdWUpXG4gICAgdmVjNC5jb3B5KHZhbHVlLCBuZXh0VmFsdWUpXG4gICAgaWYgKGlzQXREZXN0aW5hdGlvbigpKSB7XG4gICAgICB2ZWM0LmNvcHkodmFsdWUsIGRlc3RpbmF0aW9uVmFsdWUpXG4gICAgICB2ZWM0LmNvcHkobGFzdFZhbHVlLCBkZXN0aW5hdGlvblZhbHVlKVxuICAgIH1cbiAgICByZXR1cm4gZ2V0Q3VycmVudFZhbHVlKG91dClcbiAgfVxufVxuIl0sIm5hbWVzIjpbInZlY05vcm1hbGl6ZSIsInZlY1NjYWxlIiwicmVxdWlyZSQkMCIsInJlcXVpcmUkJDEiLCJyZXF1aXJlJCQyIiwicmVxdWlyZSQkMyIsInJlcXVpcmUkJDQiLCJyZXF1aXJlJCQ1IiwicmVxdWlyZSQkNiIsInJlcXVpcmUkJDciLCJyZXF1aXJlJCQ4IiwicmVxdWlyZSQkOSIsInJlcXVpcmUkJDEwIiwicmVxdWlyZSQkMTEiLCJyZXF1aXJlJCQxMiIsInJlcXVpcmUkJDEzIiwicmVxdWlyZSQkMTQiLCJyZXF1aXJlJCQxNSIsInJlcXVpcmUkJDE2IiwicmVxdWlyZSQkMTciLCJyZXF1aXJlJCQxOCIsInJlcXVpcmUkJDE5IiwicmVxdWlyZSQkMjAiLCJyZXF1aXJlJCQyMSIsInJlcXVpcmUkJDIyIiwicmVxdWlyZSQkMjMiLCJyZXF1aXJlJCQyNCIsInZlYzQiXSwibWFwcGluZ3MiOiI7Ozs7OztFQUFBLFlBQWMsR0FBRyxPQUFNOzs7Ozs7O0VBT3ZCLFNBQVMsTUFBTSxJQUFJO0lBQ2pCLElBQUksR0FBRyxHQUFHLElBQUksWUFBWSxDQUFDLENBQUMsRUFBQztJQUM3QixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQztJQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFDO0lBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUM7SUFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQztJQUNWLE9BQU8sR0FBRztHQUNYOztFQ2RELFdBQWMsR0FBRyxNQUFLOzs7Ozs7OztFQVF0QixTQUFTLEtBQUssRUFBRSxDQUFDLEVBQUU7SUFDakIsSUFBSSxHQUFHLEdBQUcsSUFBSSxZQUFZLENBQUMsQ0FBQyxFQUFDO0lBQzdCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQ2IsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDYixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUNiLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQ2IsT0FBTyxHQUFHO0dBQ1g7O0VDZkQsZ0JBQWMsR0FBRyxXQUFVOzs7Ozs7Ozs7OztFQVczQixTQUFTLFVBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDL0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxZQUFZLENBQUMsQ0FBQyxFQUFDO0lBQzdCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFDO0lBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUM7SUFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQztJQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFDO0lBQ1YsT0FBTyxHQUFHO0dBQ1g7O0VDbEJELFVBQWMsR0FBRyxLQUFJOzs7Ozs7Ozs7RUFTckIsU0FBUyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRTtJQUNyQixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUNiLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQ2IsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDYixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUNiLE9BQU8sR0FBRztHQUNYOztFQ2ZELFNBQWMsR0FBRyxJQUFHOzs7Ozs7Ozs7Ozs7RUFZcEIsU0FBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUM3QixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQztJQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFDO0lBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUM7SUFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQztJQUNWLE9BQU8sR0FBRztHQUNYOztFQ2xCRCxTQUFjLEdBQUcsSUFBRzs7Ozs7Ozs7OztFQVVwQixTQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUN2QixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDcEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQ3BCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUNwQixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDcEIsT0FBTyxHQUFHO0dBQ1g7O0VDaEJELGNBQWMsR0FBRyxTQUFROzs7Ozs7Ozs7O0VBVXpCLFNBQVMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQzVCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUNwQixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDcEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQ3BCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUNwQixPQUFPLEdBQUc7R0FDWDs7RUNoQkQsY0FBYyxHQUFHLFNBQVE7Ozs7Ozs7Ozs7RUFVekIsU0FBUyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDNUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQ3BCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUNwQixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDcEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQ3BCLE9BQU8sR0FBRztHQUNYOztFQ2hCRCxZQUFjLEdBQUcsT0FBTTs7Ozs7Ozs7OztFQVV2QixTQUFTLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUMxQixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDcEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQ3BCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUNwQixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDcEIsT0FBTyxHQUFHO0dBQ1g7O0VDaEJELFNBQWMsR0FBRyxJQUFHOzs7Ozs7Ozs7O0VBVXBCLFNBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ3ZCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDN0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUM3QixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQzdCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDN0IsT0FBTyxHQUFHO0dBQ1g7O0VDaEJELFNBQWMsR0FBRyxJQUFHOzs7Ozs7Ozs7O0VBVXBCLFNBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxF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QUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDOUIsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7OztNQUcxQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO01BQzdCLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7TUFDN0IsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztNQUM3QixFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUM7OztJQUdoQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUU7SUFDakQsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFFO0lBQ2pELEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRTtJQUNqRCxHQUFHLENBQUMsQ0FBQyxDQUFD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
