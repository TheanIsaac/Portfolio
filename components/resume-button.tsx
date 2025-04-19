"use client"

import { useResumeModal } from "@/hooks/use-resume-modal"

export default function ResumeButton() {
  const { openModal } = useResumeModal()

  return (
    <button
      onClick={openModal}
      className="inline-flex items-center gap-2 px-6 py-3 border-2 border-purple-500 dark:border-purple-400 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all duration-300"
    >
      Resume
    </button>
  )
}
