"use client"

import ResumeModal from "@/components/resume-modal"
import { useResumeModal } from "@/hooks/use-resume-modal"

export default function ClientResumeModal() {
  const { isOpen, closeModal } = useResumeModal()

  return <ResumeModal isOpen={isOpen} onClose={closeModal} />
}
