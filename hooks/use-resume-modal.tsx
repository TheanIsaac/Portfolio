"use client"

import { create } from "zustand"

interface ResumeModalState {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const useResumeModal = create<ResumeModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}))
