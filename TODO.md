# TODO

- [X] pull out a getCurrentValue() method from tick()
- [x] allow users to pass in different stiffness and dampening to tick()
- [X] use isAtDestination in tick() to set at destination and make velocity 0
- [X] support scalars _and_ up to vec4
- [X] remove `step` arg from tick()
- [X] fix example (`stiffness`, _then_ `dampening`)
- [X] rename `updateValue` to `setDestination`
- [X] update demo to choose better ranges for `stiffness` and `dampening`
- [ ] add console.log suggesting spring/dampen vals when none are provided? link to example?
- [ ] what if dampening increased as you got closer to target?
- [-] implement vec4 fns with just x, y, z, w (no arrays)?
- [ ] rewrite docs & README
- [ ] merge package.jsons from example and root
- [ ] write some tests
- [ ] add other types of physics based animators?
