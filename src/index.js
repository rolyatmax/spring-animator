import vec4 from 'gl-vec4'

export function createSpring (stiffness, dampening, value, precision = Number.EPSILON) {
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
    while (v.length < 4) v.push(0)
    return 0
  }

  value = makeValueVec4(value)
  let lastValue = value
  let destinationValue = value

  // set up some reusable arrays to use in tick()
  let velocity = []
  let delta = []

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
      value = newValue
      lastValue = newValue
    }
  }

  function isAtDestination (threshold = precision) {
    // TODO: use squared distance to save having to do Math.sqrt?
    return (
      vec4.distance(value, destinationValue) <= threshold &&
      vec4.distance(value, lastValue) <= threshold
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
    velocity = vec4.subtract(velocity, value, lastValue)
    delta = vec4.subtract(delta, destinationValue, value)
    const spring = vec4.scale(delta, delta, s)
    const damper = vec4.scale(velocity, velocity, -d)
    const acceleration = vec4.add(delta, spring, damper)
    velocity = vec4.add(velocity, velocity, acceleration)
    // TODO: figure out how to not have to create a new array on every frame
    // maybe implement all vec4 functions with x, y, z, w, instead of arrays?
    const nextValue = vec4.add([], velocity, value)
    lastValue = value
    value = nextValue
    if (isAtDestination()) {
      value = lastValue = destinationValue
    }
    return getCurrentValue(out)
  }
}
