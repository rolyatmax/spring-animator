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

  exports.createSpring = createSpring;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW1kLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9jcmVhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9jbG9uZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L2Zyb21WYWx1ZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9jb3B5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvc2V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvYWRkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvc3VidHJhY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9tdWx0aXBseS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L2RpdmlkZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L21pbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L21heC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L3NjYWxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvc2NhbGVBbmRBZGQuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9kaXN0YW5jZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L3NxdWFyZWREaXN0YW5jZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L2xlbmd0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L3NxdWFyZWRMZW5ndGguanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9uZWdhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC9pbnZlcnNlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvbm9ybWFsaXplLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvZG90LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvbGVycC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L3JhbmRvbS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nbC12ZWM0L3RyYW5zZm9ybU1hdDQuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2wtdmVjNC90cmFuc2Zvcm1RdWF0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsLXZlYzQvaW5kZXguanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3LCBlbXB0eSB2ZWM0XG4gKlxuICogQHJldHVybnMge3ZlYzR9IGEgbmV3IDREIHZlY3RvclxuICovXG5mdW5jdGlvbiBjcmVhdGUgKCkge1xuICB2YXIgb3V0ID0gbmV3IEZsb2F0MzJBcnJheSg0KVxuICBvdXRbMF0gPSAwXG4gIG91dFsxXSA9IDBcbiAgb3V0WzJdID0gMFxuICBvdXRbM10gPSAwXG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gY2xvbmVcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzQgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyB2ZWN0b3JcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdmVjdG9yIHRvIGNsb25lXG4gKiBAcmV0dXJucyB7dmVjNH0gYSBuZXcgNEQgdmVjdG9yXG4gKi9cbmZ1bmN0aW9uIGNsb25lIChhKSB7XG4gIHZhciBvdXQgPSBuZXcgRmxvYXQzMkFycmF5KDQpXG4gIG91dFswXSA9IGFbMF1cbiAgb3V0WzFdID0gYVsxXVxuICBvdXRbMl0gPSBhWzJdXG4gIG91dFszXSA9IGFbM11cbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmcm9tVmFsdWVzXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWM0IGluaXRpYWxpemVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB3IFcgY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjNH0gYSBuZXcgNEQgdmVjdG9yXG4gKi9cbmZ1bmN0aW9uIGZyb21WYWx1ZXMgKHgsIHksIHosIHcpIHtcbiAgdmFyIG91dCA9IG5ldyBGbG9hdDMyQXJyYXkoNClcbiAgb3V0WzBdID0geFxuICBvdXRbMV0gPSB5XG4gIG91dFsyXSA9IHpcbiAgb3V0WzNdID0gd1xuICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGNvcHlcblxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgdmVjNCB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgc291cmNlIHZlY3RvclxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiBjb3B5IChvdXQsIGEpIHtcbiAgb3V0WzBdID0gYVswXVxuICBvdXRbMV0gPSBhWzFdXG4gIG91dFsyXSA9IGFbMl1cbiAgb3V0WzNdID0gYVszXVxuICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHNldFxuXG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzQgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0gdyBXIGNvbXBvbmVudFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiBzZXQgKG91dCwgeCwgeSwgeiwgdykge1xuICBvdXRbMF0gPSB4XG4gIG91dFsxXSA9IHlcbiAgb3V0WzJdID0gelxuICBvdXRbM10gPSB3XG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gYWRkXG5cbi8qKlxuICogQWRkcyB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiBhZGQgKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICsgYlswXVxuICBvdXRbMV0gPSBhWzFdICsgYlsxXVxuICBvdXRbMl0gPSBhWzJdICsgYlsyXVxuICBvdXRbM10gPSBhWzNdICsgYlszXVxuICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHN1YnRyYWN0XG5cbi8qKlxuICogU3VidHJhY3RzIHZlY3RvciBiIGZyb20gdmVjdG9yIGFcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbmZ1bmN0aW9uIHN1YnRyYWN0IChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAtIGJbMF1cbiAgb3V0WzFdID0gYVsxXSAtIGJbMV1cbiAgb3V0WzJdID0gYVsyXSAtIGJbMl1cbiAgb3V0WzNdID0gYVszXSAtIGJbM11cbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBtdWx0aXBseVxuXG4vKipcbiAqIE11bHRpcGxpZXMgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuZnVuY3Rpb24gbXVsdGlwbHkgKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICogYlswXVxuICBvdXRbMV0gPSBhWzFdICogYlsxXVxuICBvdXRbMl0gPSBhWzJdICogYlsyXVxuICBvdXRbM10gPSBhWzNdICogYlszXVxuICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGRpdmlkZVxuXG4vKipcbiAqIERpdmlkZXMgdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuZnVuY3Rpb24gZGl2aWRlIChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAvIGJbMF1cbiAgb3V0WzFdID0gYVsxXSAvIGJbMV1cbiAgb3V0WzJdID0gYVsyXSAvIGJbMl1cbiAgb3V0WzNdID0gYVszXSAvIGJbM11cbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBtaW5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtaW5pbXVtIG9mIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbmZ1bmN0aW9uIG1pbiAob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IE1hdGgubWluKGFbMF0sIGJbMF0pXG4gIG91dFsxXSA9IE1hdGgubWluKGFbMV0sIGJbMV0pXG4gIG91dFsyXSA9IE1hdGgubWluKGFbMl0sIGJbMl0pXG4gIG91dFszXSA9IE1hdGgubWluKGFbM10sIGJbM10pXG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gbWF4XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWF4aW11bSBvZiB0d28gdmVjNCdzXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiBtYXggKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBNYXRoLm1heChhWzBdLCBiWzBdKVxuICBvdXRbMV0gPSBNYXRoLm1heChhWzFdLCBiWzFdKVxuICBvdXRbMl0gPSBNYXRoLm1heChhWzJdLCBiWzJdKVxuICBvdXRbM10gPSBNYXRoLm1heChhWzNdLCBiWzNdKVxuICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHNjYWxlXG5cbi8qKlxuICogU2NhbGVzIGEgdmVjNCBieSBhIHNjYWxhciBudW1iZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSB2ZWN0b3IgdG8gc2NhbGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbmZ1bmN0aW9uIHNjYWxlIChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAqIGJcbiAgb3V0WzFdID0gYVsxXSAqIGJcbiAgb3V0WzJdID0gYVsyXSAqIGJcbiAgb3V0WzNdID0gYVszXSAqIGJcbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBzY2FsZUFuZEFkZFxuXG4vKipcbiAqIEFkZHMgdHdvIHZlYzQncyBhZnRlciBzY2FsaW5nIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSB0aGUgYW1vdW50IHRvIHNjYWxlIGIgYnkgYmVmb3JlIGFkZGluZ1xuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiBzY2FsZUFuZEFkZCAob3V0LCBhLCBiLCBzY2FsZSkge1xuICBvdXRbMF0gPSBhWzBdICsgKGJbMF0gKiBzY2FsZSlcbiAgb3V0WzFdID0gYVsxXSArIChiWzFdICogc2NhbGUpXG4gIG91dFsyXSA9IGFbMl0gKyAoYlsyXSAqIHNjYWxlKVxuICBvdXRbM10gPSBhWzNdICsgKGJbM10gKiBzY2FsZSlcbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBkaXN0YW5jZVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG5mdW5jdGlvbiBkaXN0YW5jZSAoYSwgYikge1xuICB2YXIgeCA9IGJbMF0gLSBhWzBdLFxuICAgIHkgPSBiWzFdIC0gYVsxXSxcbiAgICB6ID0gYlsyXSAtIGFbMl0sXG4gICAgdyA9IGJbM10gLSBhWzNdXG4gIHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHcpXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHNxdWFyZWREaXN0YW5jZVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzQnc1xuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xuZnVuY3Rpb24gc3F1YXJlZERpc3RhbmNlIChhLCBiKSB7XG4gIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgeSA9IGJbMV0gLSBhWzFdLFxuICAgIHogPSBiWzJdIC0gYVsyXSxcbiAgICB3ID0gYlszXSAtIGFbM11cbiAgcmV0dXJuIHggKiB4ICsgeSAqIHkgKyB6ICogeiArIHcgKiB3XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGxlbmd0aFxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBsZW5ndGggb2ZcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGxlbmd0aCBvZiBhXG4gKi9cbmZ1bmN0aW9uIGxlbmd0aCAoYSkge1xuICB2YXIgeCA9IGFbMF0sXG4gICAgeSA9IGFbMV0sXG4gICAgeiA9IGFbMl0sXG4gICAgdyA9IGFbM11cbiAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdylcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gc3F1YXJlZExlbmd0aFxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHNxdWFyZWQgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGxlbmd0aCBvZiBhXG4gKi9cbmZ1bmN0aW9uIHNxdWFyZWRMZW5ndGggKGEpIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgIHkgPSBhWzFdLFxuICAgIHogPSBhWzJdLFxuICAgIHcgPSBhWzNdXG4gIHJldHVybiB4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogd1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBuZWdhdGVcblxuLyoqXG4gKiBOZWdhdGVzIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdmVjdG9yIHRvIG5lZ2F0ZVxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiBuZWdhdGUgKG91dCwgYSkge1xuICBvdXRbMF0gPSAtYVswXVxuICBvdXRbMV0gPSAtYVsxXVxuICBvdXRbMl0gPSAtYVsyXVxuICBvdXRbM10gPSAtYVszXVxuICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGludmVyc2VcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpbnZlcnNlIG9mIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNFxuICpcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdmVjdG9yIHRvIGludmVydFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiBpbnZlcnNlIChvdXQsIGEpIHtcbiAgb3V0WzBdID0gMS4wIC8gYVswXVxuICBvdXRbMV0gPSAxLjAgLyBhWzFdXG4gIG91dFsyXSA9IDEuMCAvIGFbMl1cbiAgb3V0WzNdID0gMS4wIC8gYVszXVxuICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IG5vcm1hbGl6ZVxuXG4vKipcbiAqIE5vcm1hbGl6ZSBhIHZlYzRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHZlY3RvciB0byBub3JtYWxpemVcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplIChvdXQsIGEpIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgIHkgPSBhWzFdLFxuICAgIHogPSBhWzJdLFxuICAgIHcgPSBhWzNdXG4gIHZhciBsZW4gPSB4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogd1xuICBpZiAobGVuID4gMCkge1xuICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKVxuICAgIG91dFswXSA9IHggKiBsZW5cbiAgICBvdXRbMV0gPSB5ICogbGVuXG4gICAgb3V0WzJdID0geiAqIGxlblxuICAgIG91dFszXSA9IHcgKiBsZW5cbiAgfVxuICByZXR1cm4gb3V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGRvdFxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcbiAqL1xuZnVuY3Rpb24gZG90IChhLCBiKSB7XG4gIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdICsgYVsyXSAqIGJbMl0gKyBhWzNdICogYlszXVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBsZXJwXG5cbi8qKlxuICogUGVyZm9ybXMgYSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byB2ZWM0J3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gKi9cbmZ1bmN0aW9uIGxlcnAgKG91dCwgYSwgYiwgdCkge1xuICB2YXIgYXggPSBhWzBdLFxuICAgIGF5ID0gYVsxXSxcbiAgICBheiA9IGFbMl0sXG4gICAgYXcgPSBhWzNdXG4gIG91dFswXSA9IGF4ICsgdCAqIChiWzBdIC0gYXgpXG4gIG91dFsxXSA9IGF5ICsgdCAqIChiWzFdIC0gYXkpXG4gIG91dFsyXSA9IGF6ICsgdCAqIChiWzJdIC0gYXopXG4gIG91dFszXSA9IGF3ICsgdCAqIChiWzNdIC0gYXcpXG4gIHJldHVybiBvdXRcbn1cbiIsInZhciB2ZWNOb3JtYWxpemUgPSByZXF1aXJlKCcuL25vcm1hbGl6ZScpXG52YXIgdmVjU2NhbGUgPSByZXF1aXJlKCcuL3NjYWxlJylcblxubW9kdWxlLmV4cG9ydHMgPSByYW5kb21cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gdmVjdG9yIHdpdGggdGhlIGdpdmVuIHNjYWxlXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSBbc2NhbGVdIExlbmd0aCBvZiB0aGUgcmVzdWx0aW5nIHZlY3Rvci4gSWYgb21taXR0ZWQsIGEgdW5pdCB2ZWN0b3Igd2lsbCBiZSByZXR1cm5lZFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiByYW5kb20gKG91dCwgc2NhbGUpIHtcbiAgc2NhbGUgPSBzY2FsZSB8fCAxLjBcblxuICAvLyBUT0RPOiBUaGlzIGlzIGEgcHJldHR5IGF3ZnVsIHdheSBvZiBkb2luZyB0aGlzLiBGaW5kIHNvbWV0aGluZyBiZXR0ZXIuXG4gIG91dFswXSA9IE1hdGgucmFuZG9tKClcbiAgb3V0WzFdID0gTWF0aC5yYW5kb20oKVxuICBvdXRbMl0gPSBNYXRoLnJhbmRvbSgpXG4gIG91dFszXSA9IE1hdGgucmFuZG9tKClcbiAgdmVjTm9ybWFsaXplKG91dCwgb3V0KVxuICB2ZWNTY2FsZShvdXQsIG91dCwgc2NhbGUpXG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gdHJhbnNmb3JtTWF0NFxuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzQgd2l0aCBhIG1hdDQuXG4gKlxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjNH0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHttYXQ0fSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiB0cmFuc2Zvcm1NYXQ0IChvdXQsIGEsIG0pIHtcbiAgdmFyIHggPSBhWzBdLCB5ID0gYVsxXSwgeiA9IGFbMl0sIHcgPSBhWzNdXG4gIG91dFswXSA9IG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzhdICogeiArIG1bMTJdICogd1xuICBvdXRbMV0gPSBtWzFdICogeCArIG1bNV0gKiB5ICsgbVs5XSAqIHogKyBtWzEzXSAqIHdcbiAgb3V0WzJdID0gbVsyXSAqIHggKyBtWzZdICogeSArIG1bMTBdICogeiArIG1bMTRdICogd1xuICBvdXRbM10gPSBtWzNdICogeCArIG1bN10gKiB5ICsgbVsxMV0gKiB6ICsgbVsxNV0gKiB3XG4gIHJldHVybiBvdXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gdHJhbnNmb3JtUXVhdFxuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzQgd2l0aCBhIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWM0fSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge3F1YXR9IHEgcXVhdGVybmlvbiB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzR9IG91dFxuICovXG5mdW5jdGlvbiB0cmFuc2Zvcm1RdWF0IChvdXQsIGEsIHEpIHtcbiAgdmFyIHggPSBhWzBdLCB5ID0gYVsxXSwgeiA9IGFbMl0sXG4gICAgcXggPSBxWzBdLCBxeSA9IHFbMV0sIHF6ID0gcVsyXSwgcXcgPSBxWzNdLFxuXG4gICAgLy8gY2FsY3VsYXRlIHF1YXQgKiB2ZWNcbiAgICBpeCA9IHF3ICogeCArIHF5ICogeiAtIHF6ICogeSxcbiAgICBpeSA9IHF3ICogeSArIHF6ICogeCAtIHF4ICogeixcbiAgICBpeiA9IHF3ICogeiArIHF4ICogeSAtIHF5ICogeCxcbiAgICBpdyA9IC1xeCAqIHggLSBxeSAqIHkgLSBxeiAqIHpcblxuICAvLyBjYWxjdWxhdGUgcmVzdWx0ICogaW52ZXJzZSBxdWF0XG4gIG91dFswXSA9IGl4ICogcXcgKyBpdyAqIC1xeCArIGl5ICogLXF6IC0gaXogKiAtcXlcbiAgb3V0WzFdID0gaXkgKiBxdyArIGl3ICogLXF5ICsgaXogKiAtcXggLSBpeCAqIC1xelxuICBvdXRbMl0gPSBpeiAqIHF3ICsgaXcgKiAtcXogKyBpeCAqIC1xeSAtIGl5ICogLXF4XG4gIG91dFszXSA9IGFbM11cbiAgcmV0dXJuIG91dFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZTogcmVxdWlyZSgnLi9jcmVhdGUnKSxcbiAgY2xvbmU6IHJlcXVpcmUoJy4vY2xvbmUnKSxcbiAgZnJvbVZhbHVlczogcmVxdWlyZSgnLi9mcm9tVmFsdWVzJyksXG4gIGNvcHk6IHJlcXVpcmUoJy4vY29weScpLFxuICBzZXQ6IHJlcXVpcmUoJy4vc2V0JyksXG4gIGFkZDogcmVxdWlyZSgnLi9hZGQnKSxcbiAgc3VidHJhY3Q6IHJlcXVpcmUoJy4vc3VidHJhY3QnKSxcbiAgbXVsdGlwbHk6IHJlcXVpcmUoJy4vbXVsdGlwbHknKSxcbiAgZGl2aWRlOiByZXF1aXJlKCcuL2RpdmlkZScpLFxuICBtaW46IHJlcXVpcmUoJy4vbWluJyksXG4gIG1heDogcmVxdWlyZSgnLi9tYXgnKSxcbiAgc2NhbGU6IHJlcXVpcmUoJy4vc2NhbGUnKSxcbiAgc2NhbGVBbmRBZGQ6IHJlcXVpcmUoJy4vc2NhbGVBbmRBZGQnKSxcbiAgZGlzdGFuY2U6IHJlcXVpcmUoJy4vZGlzdGFuY2UnKSxcbiAgc3F1YXJlZERpc3RhbmNlOiByZXF1aXJlKCcuL3NxdWFyZWREaXN0YW5jZScpLFxuICBsZW5ndGg6IHJlcXVpcmUoJy4vbGVuZ3RoJyksXG4gIHNxdWFyZWRMZW5ndGg6IHJlcXVpcmUoJy4vc3F1YXJlZExlbmd0aCcpLFxuICBuZWdhdGU6IHJlcXVpcmUoJy4vbmVnYXRlJyksXG4gIGludmVyc2U6IHJlcXVpcmUoJy4vaW52ZXJzZScpLFxuICBub3JtYWxpemU6IHJlcXVpcmUoJy4vbm9ybWFsaXplJyksXG4gIGRvdDogcmVxdWlyZSgnLi9kb3QnKSxcbiAgbGVycDogcmVxdWlyZSgnLi9sZXJwJyksXG4gIHJhbmRvbTogcmVxdWlyZSgnLi9yYW5kb20nKSxcbiAgdHJhbnNmb3JtTWF0NDogcmVxdWlyZSgnLi90cmFuc2Zvcm1NYXQ0JyksXG4gIHRyYW5zZm9ybVF1YXQ6IHJlcXVpcmUoJy4vdHJhbnNmb3JtUXVhdCcpXG59XG4iLCJpbXBvcnQgdmVjNCBmcm9tICdnbC12ZWM0J1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3ByaW5nIChzdGlmZm5lc3MsIGRhbXBlbmluZywgdmFsdWUsIHByZWNpc2lvbikge1xuICBwcmVjaXNpb24gPSBwcmVjaXNpb24gPyBwcmVjaXNpb24gKiBwcmVjaXNpb24gOiBOdW1iZXIuRVBTSUxPTlxuICBjb25zdCBpc0lucHV0QXJyYXkgPSBBcnJheS5pc0FycmF5KHZhbHVlKVxuICBjb25zdCB2ZWNDb21wb25lbnRzID0gaXNJbnB1dEFycmF5ID8gdmFsdWUubGVuZ3RoIDogTnVtYmVyLmlzRmluaXRlKHZhbHVlKSA/IDEgOiBudWxsXG5cbiAgaWYgKCFOdW1iZXIuaXNGaW5pdGUoc3RpZmZuZXNzKSB8fCAhTnVtYmVyLmlzRmluaXRlKGRhbXBlbmluZykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYHNwcmluZy1hbmltYXRvcjogZXhwZWN0ZWQgbnVtYmVycyBmb3Igc3RpZmZuZXNzIGFuZCBkYW1wZW5pbmcuIChlLmcuIGNyZWF0ZVNwcmluZygwLjAwMywgMC4xLCBzdGFydGluZ1ZhbHVlKSlgKVxuICB9XG5cbiAgaWYgKCF2ZWNDb21wb25lbnRzIHx8IHZlY0NvbXBvbmVudHMgPiA0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBzcHJpbmctYW5pbWF0b3I6IGV4cGVjdGVkIHZhbHVlIFxcYCR7dmFsdWV9XFxgIHRvIGJlIGEgc2NhbGFyLCB2ZWMyLCB2ZWMzLCBvciB2ZWM0YClcbiAgfVxuXG4gIGZ1bmN0aW9uIG1ha2VWYWx1ZVZlYzQgKG91dCA9IFtdLCB2KSB7XG4gICAgaWYgKGlzSW5wdXRBcnJheSAhPT0gQXJyYXkuaXNBcnJheSh2KSB8fCAoaXNJbnB1dEFycmF5ICYmIHZlY0NvbXBvbmVudHMgIT09IHYubGVuZ3RoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBzcHJpbmctYW5pbWF0b3I6IGRlc3RpbmF0aW9uIHZhbHVlIHR5cGUgbXVzdCBtYXRjaCBpbml0aWFsIHZhbHVlIHR5cGU6ICR7IWlzSW5wdXRBcnJheSA/ICdzY2FsYXInIDogdmVjQ29tcG9uZW50cyArICctY29tcG9uZW50IHZlY3Rvcid9YClcbiAgICB9XG4gICAgaWYgKE51bWJlci5pc0Zpbml0ZSh2KSkge1xuICAgICAgb3V0WzBdID0gdlxuICAgICAgb3V0WzFdID0gb3V0WzJdID0gb3V0WzNdID0gMFxuICAgICAgcmV0dXJuIG91dFxuICAgIH1cbiAgICB2ZWM0LmNvcHkob3V0LCB2KVxuICAgIHdoaWxlIChvdXQubGVuZ3RoIDwgNCkgb3V0LnB1c2goMClcbiAgICByZXR1cm4gb3V0XG4gIH1cblxuICB2YWx1ZSA9IG1ha2VWYWx1ZVZlYzQoW10sIHZhbHVlKVxuICBsZXQgbGFzdFZhbHVlID0gdmVjNC5jb3B5KFtdLCB2YWx1ZSlcbiAgbGV0IGRlc3RpbmF0aW9uVmFsdWUgPSB2ZWM0LmNvcHkoW10sIHZhbHVlKVxuXG4gIC8vIHNldCB1cCBzb21lIHJldXNhYmxlIGFycmF5cyB0byB1c2UgaW4gdGljaygpXG4gIGxldCBuZXh0VmFsdWUgPSBbXVxuICBsZXQgdmVsb2NpdHkgPSBbXVxuICBsZXQgZGVsdGEgPSBbXVxuICBsZXQgc3ByaW5nID0gW11cbiAgbGV0IGRhbXBlciA9IFtdXG4gIGxldCBhY2NlbGVyYXRpb24gPSBbXVxuXG4gIHJldHVybiB7XG4gICAgc2V0RGVzdGluYXRpb24sXG4gICAgZ2V0Q3VycmVudFZhbHVlLFxuICAgIGlzQXREZXN0aW5hdGlvbixcbiAgICB0aWNrXG4gIH1cblxuICBmdW5jdGlvbiBzZXREZXN0aW5hdGlvbiAobmV3VmFsdWUsIHNob3VsZEFuaW1hdGUgPSB0cnVlKSB7XG4gICAgbWFrZVZhbHVlVmVjNChkZXN0aW5hdGlvblZhbHVlLCBuZXdWYWx1ZSlcbiAgICBpZiAoIXNob3VsZEFuaW1hdGUpIHtcbiAgICAgIHZlYzQuY29weSh2YWx1ZSwgZGVzdGluYXRpb25WYWx1ZSlcbiAgICAgIHZlYzQuY29weShsYXN0VmFsdWUsIGRlc3RpbmF0aW9uVmFsdWUpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNBdERlc3RpbmF0aW9uICh0aHJlc2hvbGQpIHtcbiAgICAvLyBzcXVhcmUgdGhpcyBzbyB3ZSBkb24ndCBuZWVkIHRvIHVzZSBNYXRoLnNxcnRcbiAgICB0aHJlc2hvbGQgPSB0aHJlc2hvbGQgPyB0aHJlc2hvbGQgKiB0aHJlc2hvbGQgOiBwcmVjaXNpb25cbiAgICByZXR1cm4gKFxuICAgICAgdmVjNC5zcXVhcmVkRGlzdGFuY2UodmFsdWUsIGRlc3RpbmF0aW9uVmFsdWUpIDw9IHRocmVzaG9sZCAmJlxuICAgICAgdmVjNC5zcXVhcmVkRGlzdGFuY2UodmFsdWUsIGxhc3RWYWx1ZSkgPD0gdGhyZXNob2xkXG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q3VycmVudFZhbHVlIChvdXQgPSBbXSkge1xuICAgIGlmICghaXNJbnB1dEFycmF5KSByZXR1cm4gdmFsdWVbMF1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZlY0NvbXBvbmVudHM7IGkrKykge1xuICAgICAgb3V0W2ldID0gdmFsdWVbaV1cbiAgICB9XG4gICAgcmV0dXJuIG91dFxuICB9XG5cbiAgZnVuY3Rpb24gdGljayAocyA9IHN0aWZmbmVzcywgZCA9IGRhbXBlbmluZykge1xuICAgIHZlYzQuc3VidHJhY3QodmVsb2NpdHksIHZhbHVlLCBsYXN0VmFsdWUpXG4gICAgdmVjNC5zdWJ0cmFjdChkZWx0YSwgZGVzdGluYXRpb25WYWx1ZSwgdmFsdWUpXG4gICAgdmVjNC5zY2FsZShzcHJpbmcsIGRlbHRhLCBzKVxuICAgIHZlYzQuc2NhbGUoZGFtcGVyLCB2ZWxvY2l0eSwgLWQpXG4gICAgdmVjNC5hZGQoYWNjZWxlcmF0aW9uLCBzcHJpbmcsIGRhbXBlcilcbiAgICB2ZWM0LmFkZCh2ZWxvY2l0eSwgdmVsb2NpdHksIGFjY2VsZXJhdGlvbilcbiAgICB2ZWM0LmFkZChuZXh0VmFsdWUsIHZlbG9jaXR5LCB2YWx1ZSlcbiAgICB2ZWM0LmNvcHkobGFzdFZhbHVlLCB2YWx1ZSlcbiAgICB2ZWM0LmNvcHkodmFsdWUsIG5leHRWYWx1ZSlcbiAgICBpZiAoaXNBdERlc3RpbmF0aW9uKCkpIHtcbiAgICAgIHZlYzQuY29weSh2YWx1ZSwgZGVzdGluYXRpb25WYWx1ZSlcbiAgICAgIHZlYzQuY29weShsYXN0VmFsdWUsIGRlc3RpbmF0aW9uVmFsdWUpXG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOlsidmVjTm9ybWFsaXplIiwidmVjU2NhbGUiLCJyZXF1aXJlJCQwIiwicmVxdWlyZSQkMSIsInJlcXVpcmUkJDIiLCJyZXF1aXJlJCQzIiwicmVxdWlyZSQkNCIsInJlcXVpcmUkJDUiLCJyZXF1aXJlJCQ2IiwicmVxdWlyZSQkNyIsInJlcXVpcmUkJDgiLCJyZXF1aXJlJCQ5IiwicmVxdWlyZSQkMTAiLCJyZXF1aXJlJCQxMSIsInJlcXVpcmUkJDEyIiwicmVxdWlyZSQkMTMiLCJyZXF1aXJlJCQxNCIsInJlcXVpcmUkJDE1IiwicmVxdWlyZSQkMTYiLCJyZXF1aXJlJCQxNyIsInJlcXVpcmUkJDE4IiwicmVxdWlyZSQkMTkiLCJyZXF1aXJlJCQyMCIsInJlcXVpcmUkJDIxIiwicmVxdWlyZSQkMjIiLCJyZXF1aXJlJCQyMyIsInJlcXVpcmUkJDI0IiwidmVjNCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0VBQUEsWUFBYyxHQUFHLE9BQU07Ozs7Ozs7RUFPdkIsU0FBUyxNQUFNLElBQUk7SUFDakIsSUFBSSxHQUFHLEdBQUcsSUFBSSxZQUFZLENBQUMsQ0FBQyxFQUFDO0lBQzdCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFDO0lBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUM7SUFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQztJQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFDO0lBQ1YsT0FBTyxHQUFHO0dBQ1g7O0VDZEQsV0FBYyxHQUFHLE1BQUs7Ozs7Ozs7O0VBUXRCLFNBQVMsS0FBSyxFQUFFLENBQUMsRUFBRTtJQUNqQixJQUFJLEdBQUcsR0FBRyxJQUFJLFlBQVksQ0FBQyxDQUFDLEVBQUM7SUFDN0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDYixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUNiLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQ2IsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDYixPQUFPLEdBQUc7R0FDWDs7RUNmRCxnQkFBYyxHQUFHLFdBQVU7Ozs7Ozs7Ozs7O0VBVzNCLFNBQVMsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUMvQixJQUFJLEdBQUcsR0FBRyxJQUFJLFlBQVksQ0FBQyxDQUFDLEVBQUM7SUFDN0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUM7SUFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLEdB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RSxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUM7RUFDcEMsSUFBSUEsTUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQztFQUMxQyxJQUFJQSxNQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFDO0VBQzlDLElBQUlBLE1BQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUM7RUFDeEMsSUFBSUEsTUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFDO0VBQy9CLElBQUlBLE1BQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBQztFQUMvQixJQUFJLElBQUksZUFBZSxFQUFFLEVBQUU7RUFDM0IsTUFBTUEsTUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLEVBQUM7RUFDeEMsTUFBTUEsTUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLEVBQUM7RUFDNUMsS0FBSztFQUNMLEdBQUc7RUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7In0=
