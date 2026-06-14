/**
 * Flood-fill from image edges to remove outer black background, then trim transparent pixels.
 * Run: node scripts/process-chat-icon.mjs
 */
import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const inputPath = join(root, 'public/chat-guide-icon.png')
const outputPath = inputPath

function idx(x, y, w) {
  return (y * w + x) * 4
}

async function main() {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const w = info.width
  const h = info.height
  const buf = Buffer.from(data)

  const isDark = (r, g, b) => r < 55 && g < 55 && b < 55

  const visited = new Uint8Array(w * h)
  const queue = []

  function tryPush(x, y) {
    if (x < 0 || x >= w || y < 0 || y >= h) return
    const p = y * w + x
    if (visited[p]) return
    const i = idx(x, y, w)
    const r = buf[i],
      g = buf[i + 1],
      b = buf[i + 2]
    if (!isDark(r, g, b)) return
    visited[p] = 1
    queue.push([x, y])
  }

  for (let x = 0; x < w; x++) {
    tryPush(x, 0)
    tryPush(x, h - 1)
  }
  for (let y = 0; y < h; y++) {
    tryPush(0, y)
    tryPush(w - 1, y)
  }

  while (queue.length) {
    const [x, y] = queue.pop()
    const neighbors = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ]
    for (const [nx, ny] of neighbors) {
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue
      const np = ny * w + nx
      if (visited[np]) continue
      const ni = idx(nx, ny, w)
      const r = buf[ni],
        g = buf[ni + 1],
        b = buf[ni + 2]
      if (isDark(r, g, b)) {
        visited[np] = 1
        queue.push([nx, ny])
      }
    }
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (visited[y * w + x]) {
        const i = idx(x, y, w)
        buf[i + 3] = 0
      }
    }
  }

  await sharp(buf, { raw: { width: w, height: h, channels: 4 } })
    .trim()
    .png()
    .toFile(outputPath)

  console.log('Wrote', outputPath, `(${w}x${h} → trimmed)`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
