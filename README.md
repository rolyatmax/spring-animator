# spring-animator

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

A little tool for easing values with spring forces for animations.

Here's [an example](https://rolyatmax.github.io/spring-animator/).

## Install

Use [npm](https://npmjs.com/) to install.

```sh
npm install spring-animator --save
```

## Usage

```js
import { createSpring } from 'spring-animator'

const dampening = 0.28
const stiffness = 0.03
const startingValue = 10

const spring = createSpring(stiffness, dampening, startingValue)

// spring starts at initial value
spring.tick() // returns 10

// set a new end value to animate towards
spring.updateValue(15)

spring.tick() // takes one step towards end value and returns the new value

spring.tick(5) // takes five steps towards end value and returns the new value

spring.tick(1, false) // takes one step towards end value and returns that value without updating the internal value - useful for calculating values for future steps
```

### To animate 2D vectors, for example:

```js
const xSpring = createSpring(stiffness, dampening, 50)
const ySpring = createSpring(stiffness, dampening, 50)

document.body.addEventListener('click', (e) => {
  xSpring.updateValue(e.clientX)
  ySpring.updateValue(e.clientY)
})

loop()
function loop () {
  requestAnimationFrame(loop)
  const x = xSpring.tick()
  const y = ySpring.tick()
  renderObjectAtPosition([x, y])
}
```

## To run the example:

```sh
cd example
npm install
npm start
```

Or try it out [here](https://rolyatmax.github.io/spring-animator/).

[![NPM](https://nodei.co/npm/spring-animator.png)](https://www.npmjs.com/package/spring-animator)

## License

MIT, see [LICENSE.md](http://github.com/rolyatmax/spring-animator/blob/master/LICENSE.md) for details.
