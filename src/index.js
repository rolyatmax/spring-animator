import vec4 from 'gl-vec4'

export function createSpring (stiffness, dampening, value, precision) {
  precision = precision ? precision * precision : Number.EPSILON
  const isInputArray = Array.isArray(value)
  const vecComponents = isInputArray ? value.length : Number.isFinite(value) ? 1 : null

  if (!vecComponents || vecComponents > 4) {
    throw new Error(`spring-animator: expected value \`${value}\` to be a scalar, vec2, vec3, or vec4`)
  }

  function makeValueVec4 (v) {
    if (isInputArray !== Array.isArray(v) || (isInputArray && vecComponents !== v.length)) {
      throw new Error(`spring-animator: destination value type must match initial value type: ${!isInputArray ? 'scalar' : vecComponents + '-component vector'}`)
    }
    if (Number.isFinite(v)) return [v, 0, 0, 0]
    v = v.slice()
    while (v.length < 4) v.push(0)
    return v
  }

  value = makeValueVec4(value)
  let lastValue = vec4.copy([], value)
  let destinationValue = vec4.copy([], value)

  // set up some reusable arrays to use in tick()
  let nextValue = []
  let velocity = []
  let delta = []
  let spring = []
  let damper = []
  let acceleration = []

  return {
    setDestination,
    getCurrentValue,
    isAtDestination,
    tick
  }

  function setDestination (newValue, shouldAnimate = true) {
    newValue = makeValueVec4(newValue)
    destinationValue = newValue
    if (!shouldAnimate) {
      vec4.copy(value, newValue)
      vec4.copy(lastValue, newValue)
    }
  }

  function isAtDestination (threshold) {
    // square this so we don't need to use Math.sqrt
    threshold = threshold ? threshold * threshold : precision
    return (
      vec4.squaredDistance(value, destinationValue) <= threshold &&
      vec4.squaredDistance(value, lastValue) <= threshold
    )
  }

  function getCurrentValue (out = []) {
    if (!isInputArray) return value[0]
    for (let i = 0; i < vecComponents; i++) {
      out[i] = value[i]
    }
    return out
  }

  function tick (out = [], s = stiffness, d = dampening) {
    vec4.subtract(velocity, value, lastValue)
    vec4.subtract(delta, destinationValue, value)
    vec4.scale(spring, delta, s)
    vec4.scale(damper, velocity, -d)
    vec4.add(acceleration, spring, damper)
    vec4.add(velocity, velocity, acceleration)
    vec4.add(nextValue, velocity, value)
    vec4.copy(lastValue, value)
    vec4.copy(value, nextValue)
    if (isAtDestination()) {
      vec4.copy(value, destinationValue)
      vec4.copy(lastValue, destinationValue)
    }
    return getCurrentValue(out)
  }
}
