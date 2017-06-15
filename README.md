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

const stiffness = 0.03
const dampening = 0.28
const startingValue = 10

const spring = createSpring(stiffness, dampening, startingValue)

// spring starts at initial value
spring.tick() // returns 10 (because we have not set a destination to animate towards)

// set a new destination value to animate towards
spring.setDestination(15)

spring.tick() // takes one step towards destination value and returns the new value

// pass custom stiffness and dampening values for just this tick
spring.tick(0.1, 0.5)

spring.getCurrentValue() // returns the current value
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
