/* global requestAnimationFrame */

import { createSpring } from '../src'
import { GUI } from 'dat-gui'

const maxRadius = 100
const minRadius = 5

const settings = {
  stiffness: 0.003,
  dampening: 0.08
}

const gui = new GUI()
gui.add(settings, 'stiffness', 0.001, 0.25).step(0.001)
gui.add(settings, 'dampening', 0.01, 0.5).step(0.01)
gui.add({ clear: setupSprings }, 'clear')

const canvas = document.querySelector('canvas')
const ctx = setupCanvasAndGetContext(canvas)

canvas.addEventListener('click', (e) => {
  if (
    circle.positionSpring.isAtDestination(0.2) &&
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
    positionSpring: createSpring(stiffness, dampening, center)
  }
}

function setPositionAndRadius (position) {
  const newRadius = (maxRadius - minRadius) * Math.random() + minRadius
  circle.radiusSpring.setDestination(newRadius)
  circle.positionSpring.setDestination(position)
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
  const position = circle.positionSpring.tick([], settings.stiffness, settings.dampening)
  const radius = circle.radiusSpring.tick(null, settings.stiffness, settings.dampening)
  lastValues.push([position, radius])
  lastValues.forEach(([pos, rad]) => drawCircle(ctx, pos, rad, 'transparent', 'rgba(94, 126, 178, 0.4)'))
  drawCircle(ctx, position, radius, 'rgb(94, 126, 178)', 'rgba(255, 255, 255, 0.8)')
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
