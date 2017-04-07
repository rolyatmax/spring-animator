export function createScalarSpring (stiffness, dampening, value, lastValue = null) {
  lastValue = lastValue || value
  let destinationValue = value

  return {
    updateValue,
    isAtDestination,
    tick
  }

  function updateValue (newValue, shouldAnimate = true) {
    destinationValue = newValue
    if (!shouldAnimate) {
      value = newValue
      lastValue = newValue
    }
  }

  function isAtDestination (threshold = Number.EPSILON) {
    // making sure we're near the destination and that velocity is below threshold
    // NOTE: we could be doing this a better way perhaps?
    return (
      Math.abs(value - destinationValue) <= threshold &&
      Math.abs(value - lastValue) <= threshold
    )
  }

  function tick (steps = 1, shouldUpdateInternally = true) {
    if (steps < 1) throw new Error('tick() expects `steps` to be greater than 0')
    if (!Number.isInteger(steps)) throw new Error('tick() expects `steps` to be an integer')

    let _value = value
    let _lastValue = lastValue
    while (steps--) {
      const velocity = _value - _lastValue
      const spring = (destinationValue - _value) * stiffness
      const damper = velocity * -dampening
      const acceleration = spring + damper
      const nextValue = acceleration + velocity + _value
      _lastValue = _value
      _value = nextValue
    }

    if (shouldUpdateInternally) {
      lastValue = _lastValue
      value = _value
    }

    return _value
  }
}
