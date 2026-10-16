export type BreathPhase = 'inhale' | 'exhale' | 'hold'
export type BreathStep = { phase: BreathPhase; seconds: number }
export type BreathingExercise = {
  id: string
  name: string
  description: string
  steps: readonly BreathStep[]
}

// Explicit patterns keep names, phase order, and displayed timings in agreement.
export const breathingExercises: readonly BreathingExercise[] = [
  {
    id: 'easy-circle',
    name: 'Easy circle',
    description: 'A short, even rhythm. No holds.',
    steps: [{ phase: 'inhale', seconds: 3 }, { phase: 'exhale', seconds: 3 }],
  },
  {
    id: 'even-circle',
    name: 'Even circle',
    description: 'Equal time breathing in and out. No holds.',
    steps: [{ phase: 'inhale', seconds: 5 }, { phase: 'exhale', seconds: 5 }],
  },
  {
    id: 'longer-exhale',
    name: 'Longer exhale',
    description: 'A little more time breathing out. No holds.',
    steps: [{ phase: 'inhale', seconds: 4 }, { phase: 'exhale', seconds: 6 }],
  },
  {
    id: 'triangle',
    name: 'Triangle rhythm',
    description: 'Breathe in, hold, then breathe out.',
    steps: [
      { phase: 'inhale', seconds: 3 },
      { phase: 'hold', seconds: 3 },
      { phase: 'exhale', seconds: 3 },
    ],
  },
  {
    id: 'box',
    name: 'Box rhythm',
    description: 'Four equal steps, with two holds.',
    steps: [
      { phase: 'inhale', seconds: 4 },
      { phase: 'hold', seconds: 4 },
      { phase: 'exhale', seconds: 4 },
      { phase: 'hold', seconds: 4 },
    ],
  },
]

export const phaseLabels: Record<BreathPhase, string> = {
  inhale: 'Breathe in',
  exhale: 'Breathe out',
  hold: 'Hold gently',
}

export function getBreathingStep(steps: readonly BreathStep[], elapsed: number) {
  const cycle = steps.reduce((sum, step) => sum + step.seconds, 0)
  let remaining = elapsed % cycle
  for (let index = 0; index < steps.length; index++) {
    const step = steps[index]
    if (remaining < step.seconds) {
      return { index, step, progress: remaining / step.seconds }
    }
    remaining -= step.seconds
  }
  return { index: 0, step: steps[0], progress: 0 }
}

export type BreathingClock = { elapsed: number; last: number; multiplier: number }

export function advanceBreathingClock(clock: BreathingClock, now: number) {
  // Store unscaled progress. A pace change then preserves the current step
  // and position instead of leaving an old cycle length in the animation loop.
  clock.elapsed += Math.max(0, now - clock.last) / (1000 * clock.multiplier)
  clock.last = now
  return clock.elapsed
}
