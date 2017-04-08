/* global requestAnimationFrame */

import { createSpring } from '../index'
import { GUI } from 'dat-gui'

const maxRadius = 100
const minRadius = 5

const settings = {
  dampening: 0.28,
  stiffness: 0.03
}

const gui = new GUI()
gui.add(settings, 'dampening', 0, 1.0).step(0.01).onChange(setupSprings)
gui.add(settings, 'stiffness', 0, 1.0).step(0.01).onChange(setupSprings)

const canvas = document.querySelector('canvas')
const ctx = setupCanvasAndGetContext(canvas)

canvas.addEventListener('click', (e) => {
  lastValues = []
  setPositionAndRadius([e.offsetX, e.offsetY])
})

const center = [canvas.width / 2, canvas.height / 2]
let lastValues = []

let circle
setupSprings()
setPositionAndRadius(center)
requestAnimationFrame(loop)

function setupSprings () {
  const dampening = settings.dampening
  const stiffness = settings.stiffness
  lastValues = []
  circle = {
    radiusSpring: createSpring(stiffness, dampening, 10),
    xSpring: createSpring(stiffness, dampening, center[0]),
    ySpring: createSpring(stiffness, dampening, center[1])
  }
}

function setPositionAndRadius (position) {
  const newRadius = (maxRadius - minRadius) * Math.random() + minRadius
  circle.radiusSpring.updateValue(newRadius)
  circle.xSpring.updateValue(position[0])
  circle.ySpring.updateValue(position[1])
}

function setupCanvasAndGetContext (canvas) {
  let { width, height } = canvas.parentElement.getBoundingClientRect()
  height *= 2
  canvas.width = width
  canvas.height = height
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  return canvas.getContext('2d')
}

function loop () {
  requestAnimationFrame(loop)
  clearRect(ctx, 'rgb(248, 245, 250)')
  const x = circle.xSpring.tick()
  const y = circle.ySpring.tick()
  const radius = circle.radiusSpring.tick(2)
  lastValues.push([[x, y], radius])
  lastValues.forEach(([pos, rad]) => drawCircle(ctx, pos, rad, false))
  drawCircle(ctx, [x, y], radius)
}

function drawCircle (ctx, position, radius, shouldFill = true) {
  if (radius < 0) return
  ctx.beginPath()
  ctx.strokeStyle = 'rgba(94, 126, 178, 0.4)'
  ctx.fillStyle = 'rgb(94, 126, 178)'
  ctx.arc(position[0], position[1], radius, 0, Math.PI * 2)
  if (shouldFill) ctx.fill()
  ctx.stroke()
}

function clearRect (ctx, color) {
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.fill()
}
