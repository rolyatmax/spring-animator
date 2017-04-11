(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.SpringAnimator = global.SpringAnimator || {})));
}(this, (function (exports) { 'use strict';

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

exports.createSpring = createSpring;

Object.defineProperty(exports, '__esModule', { value: true });

})));
