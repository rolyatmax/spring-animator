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
gui.add({ clear }, 'clear')

function clear () {
  lastValues = []
}

const canvas = document.querySelector('canvas')
const ctx = setupCanvasAndGetContext(canvas)

canvas.addEventListener('click', (e) => {
  if (
    circle.xSpring.isAtDestination(0.2) &&
    circle.ySpring.isAtDestination(0.2) &&
    circle.radiusSpring.isAtDestination(0.2)
  ) {
    lastValues = []
  }
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
  const x = circle.xSpring.tick(2)
  const y = circle.ySpring.tick()
  const radius = circle.radiusSpring.tick(2)
  lastValues.push([[x, y], radius])
  lastValues.forEach(([pos, rad]) => drawCircle(ctx, pos, rad, 'transparent', 'rgba(94, 126, 178, 0.4)'))
  drawCircle(ctx, [x, y], radius, 'rgb(94, 126, 178)', 'rgba(255, 255, 255, 0.8)')
}

function drawCircle (ctx, position, radius, fillColor = 'transparent', strokeColor = 'transparent') {
  if (radius < 0) return
  ctx.beginPath()
  ctx.strokeStyle = strokeColor
  ctx.fillStyle = fillColor
  ctx.arc(position[0], position[1], radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()
}

function clearRect (ctx, color) {
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.fill()
}
