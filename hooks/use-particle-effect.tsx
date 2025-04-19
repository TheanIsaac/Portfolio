"use client"

import { create } from "zustand"

interface ParticleEffectState {
  isSwirlActive: boolean
  toggleSwirlEffect: () => void
}

export const useParticleEffect = create<ParticleEffectState>((set) => ({
  isSwirlActive: true,
  toggleSwirlEffect: () => set((state) => ({ isSwirlActive: !state.isSwirlActive })),
}))
