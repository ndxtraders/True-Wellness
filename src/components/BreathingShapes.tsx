'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import {
  advanceBreathingClock,
  breathingExercises,
  getBreathingStep,
  phaseLabels,
  type BreathPhase,
  type BreathStep,
} from '@/lib/breathing'

const colors: Record<BreathPhase, string> = {
  inhale: '#2563eb',
  exhale: '#b83e40',
  hold: '#2b2130',
}

function subscribeToMotionPreference(callback: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)')
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function formatSeconds(seconds: number) {
  return Number(seconds.toFixed(2)).toString()
}

function Shape({ steps, index = 0, progress = 0, showDot = false }: {
  steps: readonly BreathStep[]
  index?: number
  progress?: number
  showDot?: boolean
}) {
  const isCircle = steps.length === 2
  const points = steps.length === 4
    ? [{ x: 65, y: 65 }, { x: 255, y: 65 }, { x: 255, y: 255 }, { x: 65, y: 255 }]
    : [{ x: 160, y: 40 }, { x: 270, y: 250 }, { x: 50, y: 250 }]
  const from = points[index]
  const to = points[(index + 1) % points.length]
  const angle = -Math.PI / 2 + (index + progress) * Math.PI
  const dot = isCircle
    ? { x: 160 + 110 * Math.cos(angle), y: 160 + 110 * Math.sin(angle) }
    : { x: from.x + (to.x - from.x) * progress, y: from.y + (to.y - from.y) * progress }

  return (
    <svg viewBox="0 0 320 320" aria-hidden="true" className="h-full w-full">
      {steps.map((step, i) => isCircle ? (
        <path
          key={i}
          d={i === 0 ? 'M160 50 A110 110 0 0 1 160 270' : 'M160 270 A110 110 0 0 1 160 50'}
          fill="none" stroke={colors[step.phase]} strokeWidth="5" strokeLinecap="round"
        />
      ) : (
        <line key={i} x1={points[i].x} y1={points[i].y}
          x2={points[(i + 1) % points.length].x} y2={points[(i + 1) % points.length].y}
          stroke={colors[step.phase]} strokeWidth="5" strokeLinecap="round" />
      ))}
      {showDot && (
        <g>
          <circle cx={dot.x} cy={dot.y} r="16" fill={colors[steps[index].phase]} opacity="0.15" />
          <circle cx={dot.x} cy={dot.y} r="8" fill={colors[steps[index].phase]} stroke="var(--color-bg)" strokeWidth="3" />
        </g>
      )}
    </svg>
  )
}

export default function BreathingShapes() {
  const [exerciseId, setExerciseId] = useState(breathingExercises[0].id)
  const [multiplier, setMultiplier] = useState(1)
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [motionOverride, setMotionOverride] = useState<boolean | null>(null)
  const reducedMotion = useSyncExternalStore(subscribeToMotionPreference, prefersReducedMotion, () => false)
  const showMotion = motionOverride ?? !reducedMotion
  const clock = useRef({ elapsed: 0, last: 0, multiplier: 1 })
  const exercise = breathingExercises.find((item) => item.id === exerciseId)!
  const current = getBreathingStep(exercise.steps, elapsed)
  const remaining = Math.max(1, Math.ceil((current.step.seconds * (1 - current.progress) * multiplier) - 0.001))
  const cycleSeconds = exercise.steps.reduce((sum, step) => sum + step.seconds, 0) * multiplier
  const started = elapsed > 0 || running

  useEffect(() => {
    if (!running) return
    let frame: number
    clock.current.last = performance.now()
    const tick = (now: number) => {
      setElapsed(advanceBreathingClock(clock.current, now))
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [running])

  useEffect(() => {
    // Returning from a hidden tab should never skip someone through a hold.
    const pauseWhenHidden = () => {
      if (document.hidden) setRunning(false)
    }
    document.addEventListener('visibilitychange', pauseWhenHidden)
    return () => document.removeEventListener('visibilitychange', pauseWhenHidden)
  }, [])

  function changePace(value: number, now: number) {
    if (running) setElapsed(advanceBreathingClock(clock.current, now))
    clock.current.multiplier = value
    setMultiplier(value)
  }

  function reset() {
    setRunning(false)
    clock.current.elapsed = 0
    setElapsed(0)
  }

  function toggleRunning() {
    if (running) setElapsed(advanceBreathingClock(clock.current, performance.now()))
    setRunning(!running)
  }

  return (
    <div>
      <section aria-labelledby="pace-heading" className="rounded-(--radius-card) border border-line bg-surface p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 id="pace-heading" className="text-h4">Set your pace</h2>
            <p id="pace-help" className="mt-1 text-small text-ink-muted">Use the buttons or control bar to set the time for each step.</p>
          </div>
          <div role="group" aria-label="Pace presets" className="flex flex-wrap gap-2">
            {[{ value: 1, label: 'Regular' }, { value: 1.5, label: 'Slower' }, { value: 2, label: 'Extra slow' }].map((preset) => (
              <button key={preset.value} type="button" aria-pressed={multiplier === preset.value}
                onClick={(event) => changePace(preset.value, event.timeStamp)}
                className={`min-h-11 rounded-pill border px-4 py-2 text-small font-medium ${multiplier === preset.value ? 'border-plum bg-plum text-bg' : 'border-line-strong bg-bg text-ink'}`}>
                {preset.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-5 grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1">
          <label htmlFor="breathing-pace" className="text-small font-medium">Step length</label>
          <output htmlFor="breathing-pace" className="text-right font-semibold text-plum">{multiplier}×</output>
          <input id="breathing-pace" type="range" min="0.5" max="3" step="0.25" value={multiplier}
            onChange={(event) => changePace(Number(event.target.value), event.timeStamp)}
            aria-describedby="pace-help" aria-valuetext={`${multiplier} times the base duration`}
            className="col-span-2 h-11 w-full min-w-0 cursor-pointer accent-plum" />
        </div>
      </section>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_1.15fr]">
        <section aria-labelledby="pattern-heading" className="order-2 lg:order-1">
          <h2 id="pattern-heading" className="text-h4">Choose a pattern</h2>
          <p className="mt-2 text-small text-ink-muted">New to this? Start with the easy circle.</p>
          <div role="group" aria-label="Breathing patterns" className="mt-5 grid gap-3">
            {breathingExercises.map((item) => (
              <button key={item.id} type="button" aria-pressed={exerciseId === item.id}
                onClick={() => { reset(); setExerciseId(item.id) }}
                className={`flex items-center gap-4 rounded-(--radius-card) border p-4 text-left ${exerciseId === item.id ? 'border-plum bg-surface ring-1 ring-plum' : 'border-line-strong bg-bg hover:bg-surface'}`}>
                <span className="h-14 w-14 shrink-0"><Shape steps={item.steps} /></span>
                <span className="min-w-0">
                  <span className="block font-semibold text-plum">{item.name}</span>
                  <span className="mt-1 block text-small text-ink-muted">{item.description}</span>
                  <span className="mt-1 block text-caption text-ink-muted">
                    {item.steps.map((step) => formatSeconds(step.seconds * multiplier)).join(' · ')} seconds
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section aria-labelledby="guide-heading" className="order-1 rounded-(--radius-card) border border-line bg-bg p-5 sm:p-8 lg:order-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="guide-heading" className="text-h4 text-plum">{exercise.name}</h2>
            <span className="text-small text-ink-muted">{formatSeconds(cycleSeconds)}s per round</span>
          </div>
          <p role="status" aria-atomic="true" className="mt-2 min-h-7 text-small text-ink-muted">
            {running ? phaseLabels[current.step.phase] : started ? 'Paused. Continue when you’re ready.' : 'Ready when you are.'}
          </p>
          <div className="relative mx-auto aspect-square w-full max-w-80">
            <Shape steps={exercise.steps} index={current.index} progress={current.progress} showDot={showMotion && started} />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1">
              <span className="text-small font-medium">{phaseLabels[current.step.phase]}</span>
              <span className="font-display text-5xl tabular-nums text-plum">{started ? remaining : formatSeconds(current.step.seconds * multiplier)}</span>
              <span className="text-caption text-ink-muted">{started ? 'seconds left' : 'Press Start'}</span>
            </div>
          </div>
          <ol aria-label="Steps at the current pace" className="flex flex-wrap justify-center gap-2">
            {exercise.steps.map((step, index) => (
              <li key={index} aria-current={started && current.index === index ? 'step' : undefined}
                className={`rounded-md border px-3 py-2 text-small ${started && current.index === index ? 'border-plum bg-surface font-semibold' : 'border-line'}`}>
                <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: colors[step.phase] }} />
                {phaseLabels[step.phase]} · {formatSeconds(step.seconds * multiplier)}s
              </li>
            ))}
          </ol>
          <div className="mt-7 flex gap-3">
            <button type="button" onClick={toggleRunning}
              className="min-h-12 flex-1 rounded-pill bg-plum px-5 py-3 font-semibold text-bg hover:opacity-90">
              {running ? 'Pause' : started ? 'Resume' : 'Start breathing'}
            </button>
            <button type="button" onClick={reset} disabled={!started}
              className="min-h-12 rounded-pill border border-line-strong px-5 py-3 font-medium disabled:cursor-not-allowed disabled:opacity-40">
              Stop
            </button>
          </div>
          <label className="mt-5 flex min-h-11 cursor-pointer items-center justify-center gap-3 text-small text-ink-muted">
            <input type="checkbox" checked={showMotion} onChange={(event) => setMotionOverride(event.target.checked)}
              className="h-4 w-4 accent-plum" />
            Show moving guide
          </label>
          <p className="mt-2 text-center text-caption text-ink-muted">You can pause or stop at any time.</p>
        </section>
      </div>
    </div>
  )
}
