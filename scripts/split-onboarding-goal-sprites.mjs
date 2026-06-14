/**
 * Splits the 1024×1024 goals sheet into 5 PNGs (2+2+1 layout).
 * Run: node scripts/split-onboarding-goal-sprites.mjs
 */
import sharp from 'sharp'
import { mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const src = join(root, 'public/onboarding-goal-icons.png')
const outDir = join(root, 'public/onboarding-goals')
mkdirSync(outDir, { recursive: true })

const W = 1024
const R1 = 342
const R2 = 342
const R3 = W - R1 - R2 // 340

async function main() {
  const img = sharp(src)

  // Row 1: concern (left), hygiene (right)
  await img.extract({ left: 0, top: 0, width: W / 2, height: R1 }).png().toFile(join(outDir, 'concern.png'))
  await sharp(src)
    .extract({ left: W / 2, top: 0, width: W / 2, height: R1 })
    .png()
    .toFile(join(outDir, 'hygiene.png'))

  // Row 2: anxiety, cost
  await sharp(src)
    .extract({ left: 0, top: R1, width: W / 2, height: R2 })
    .png()
    .toFile(join(outDir, 'anxiety.png'))
  await sharp(src)
    .extract({ left: W / 2, top: R1, width: W / 2, height: R2 })
    .png()
    .toFile(join(outDir, 'cost.png'))

  // Row 3: habits — center crop (typical art has icon in middle band)
  const bw = 560
  const bh = R3
  const bx = Math.floor((W - bw) / 2)
  const by = R1 + R2
  await sharp(src)
    .extract({ left: bx, top: by, width: bw, height: bh })
    .png()
    .toFile(join(outDir, 'habits.png'))

  console.log('Wrote', outDir, '{concern,hygiene,anxiety,cost,habits}.png')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
