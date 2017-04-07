/* global requestAnimationFrame */

import { createScalarSpring } from '../index'

const maxRadius = 100
const minRadius = 5

const dampening = 0.1
const stiffness = 0.06

const canvas = document.querySelector('canvas')
const ctx = setupCanvasAndGetContext(canvas)

canvas.addEventListener('click', setRandomRadius)

const circle = {
  radiusSpring: createScalarSpring(stiffness, dampening, 10),
  position: [canvas.width / 2, canvas.height / 2]
}

setRandomRadius()
requestAnimationFrame(loop)

function setRandomRadius () {
  const newRadius = (maxRadius - minRadius) * Math.random() + minRadius
  circle.radiusSpring.updateValue(newRadius)
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
  const { position, radiusSpring } = circle
  drawCircle(ctx, position, radiusSpring.tick())
}

function drawCircle (ctx, position, radius) {
  if (radius < 0) return
  ctx.beginPath()
  ctx.fillStyle = 'rgb(94, 126, 178)'
  ctx.arc(position[0], position[1], radius, 0, Math.PI * 2)
  ctx.fill()
}

function clearRect (ctx, color) {
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.fill()
}
