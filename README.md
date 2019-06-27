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

const stiffness = 0.003
const dampening = 0.1
const startingValue = 10

const spring = createSpring(stiffness, dampening, startingValue)

// must first set a new destination value to animate towards
spring.setDestination(15)

spring.tick() // takes one step towards destination value

// pass custom stiffness and dampening values for just this tick
spring.tick(0.003, 0.1)

const value = spring.getCurrentValue() // returns the current value
```

I personally like these values:

```js
{
  stiffness: 0.003,
  dampening: 0.1
}
```

## To run the example:

```sh
npm install
npm start
```

And then make sure to open example/index.html in a browser!

Or you can just try it out [here](https://rolyatmax.github.io/spring-animator/).

[![NPM](https://nodei.co/npm/spring-animator.png)](https://www.npmjs.com/package/spring-animator)

## License

MIT, see [LICENSE.md](http://github.com/rolyatmax/spring-animator/blob/master/LICENSE.md) for details.
