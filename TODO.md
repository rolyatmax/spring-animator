# TODO

- [X] pull out a getCurrentValue() method from tick()
- [x] allow users to pass in different stiffness and dampening to tick()
- [X] use isAtDestination in tick() to set at destination and make velocity 0
- [X] support scalars _and_ up to vec4
- [X] remove `step` arg from tick()
- [X] fix example (`stiffness`, _then_ `dampening`)
- [X] rename `updateValue` to `setDestination`
- [ ] implement vec4 fns with just x, y, z, w (no arrays)?
- [ ] merge package.jsons from example and root
- [ ] write some tests
- [ ] update demo to choose better ranges for `stiffness` and `dampening`
- [ ] add other types of physics based animators?
