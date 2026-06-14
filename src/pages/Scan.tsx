import { useRef, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ScanHistoryPanel } from '../components/scan/ScanHistoryPanel'
import { ScanOrb } from '../components/scan/ScanOrb'
import { ScanOverviewMetrics } from '../components/scan/ScanOverviewMetrics'
import { ScanPhotoTips } from '../components/scan/ScanPhotoTips'
import { PageHeader } from '../components/layout/PageHeader'
import { PAGE_BODY, PAGE_SHELL } from '../components/layout/pageLayout'
import { GradientScreen, PrimaryButton, SecondaryButton } from '../components/ui/GradientScreen'
import { analyzeOralImage } from '../lib/analyzeOralImage'
import type { ScanRecord } from '../lib/types'
import { loadScans, saveScan } from '../lib/storage'

function makeThumb(dataUrl: string, max = 160): Promise<string | undefined> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ratio = Math.min(max / img.width, max / img.height, 1)
      canvas.width = Math.round(img.width * ratio)
      canvas.height = Math.round(img.height * ratio)
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        resolve(undefined)
        return
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      try {
        resolve(canvas.toDataURL('image/jpeg', 0.72))
      } catch {
        resolve(undefined)
      }
    }
    img.onerror = () => resolve(undefined)
    img.src = dataUrl
  })
}

export function Scan() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [showHistory, setShowHistory] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  const scans = loadScans()
  const lastScan = scans[0]

  useEffect(() => {
    const state = location.state as { showHistory?: boolean } | null
    if (state?.showHistory) {
      setShowHistory(true)
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.pathname, location.state, navigate])

  const orbState = busy ? 'processing' : preview ? 'preview' : 'idle'
  const isIdle = orbState === 'idle'

  function openCamera() {
    if (busy || preview) return
    inputRef.current?.click()
  }

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    setError(null)
    if (!f || !f.type.startsWith('image/')) {
      setError('Please choose a photo from your camera or gallery.')
      return
    }
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setShowHistory(false)
  }

  async function runAnalysis() {
    if (!file) return
    setBusy(true)
    setError(null)
    const started = performance.now()
    try {
      const result = await analyzeOralImage(file)
      const elapsed = performance.now() - started
      const wait = Math.min(5000, Math.max(0, 800 - elapsed))
      if (wait > 0) await new Promise((r) => setTimeout(r, wait))

      let thumb: string | undefined
      if (preview) {
        thumb = await makeThumb(preview)
      }

      const record: ScanRecord = {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        risk: result.risk,
        summary: result.summary,
        explanation: result.explanation,
        steps: result.steps,
        thumbDataUrl: thumb,
      }
      saveScan(record)
      navigate('/results', { state: { record, signalConfidence: result.signalConfidence } })
    } catch {
      setError('We could not read that image. Try another photo with good light.')
    } finally {
      setBusy(false)
    }
  }

  function resetPhoto() {
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    setFile(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  function startNewScan() {
    resetPhoto()
    setShowHistory(false)
  }

  function openLastSnapshot() {
    if (lastScan) navigate('/results', { state: { record: lastScan } })
  }

  return (
    <GradientScreen className="min-h-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={onPick}
      />

      <div className={PAGE_SHELL}>
        {showHistory ? (
          <ScanHistoryPanel
            scans={scans}
            onSelect={(record) => navigate('/results', { state: { record } })}
            onNewScan={startNewScan}
            onClose={() => setShowHistory(false)}
          />
        ) : (
          <>
            <PageHeader
              title="Smile Snapshot"
              trailing={
                <button
                  type="button"
                  onClick={() => setShowHistory(true)}
                  className="flex items-center gap-0.5 text-[14px] font-medium text-[#5E89ED] transition hover:text-[#4A75D9]"
                >
                  History
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M9 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              }
            />

            <div className={PAGE_BODY}>
              <section className="flex flex-col items-center">
                <ScanOrb state={orbState} preview={preview} onTap={openCamera} interactive={isIdle} />

                <div className="mt-2 text-center">
                {busy ? (
                  <div className="space-y-1">
                    <p className="type-body-lg font-semibold text-[#191919]">
                      Creating your snapshot…
                    </p>
                    <p className="type-label text-[#667085]">This takes about 10 seconds.</p>
                  </div>
                ) : preview ? (
                  <p className="type-body-lg font-semibold text-[#191919]">
                    Ready for your snapshot
                  </p>
                ) : (
                  <div className="space-y-0.5">
                    <p className="type-body-lg font-semibold text-[#191919]">Tap to scan</p>
                    <p className="type-label text-[#667085]">Takes about 1 minute</p>
                  </div>
                )}
                </div>

                {preview && !busy && (
                  <div className="mt-3 flex w-full max-w-xs gap-3">
                    <SecondaryButton onClick={resetPhoto} className="flex-1 py-3">
                      Retake
                    </SecondaryButton>
                    <PrimaryButton onClick={runAnalysis} className="flex-1 py-3">
                      Get Snapshot
                    </PrimaryButton>
                  </div>
                )}
              </section>

              {!busy && lastScan && (
                <ScanOverviewMetrics risk={lastScan.risk} onMetricPress={openLastSnapshot} />
              )}

              {error && (
                <p className="rounded-xl bg-[#FEE2E2] px-4 py-3 text-sm text-[#DC2626]" role="alert">
                  {error}
                </p>
              )}

              {!busy && !preview && <ScanPhotoTips />}
            </div>
          </>
        )}
      </div>
    </GradientScreen>
  )
}
