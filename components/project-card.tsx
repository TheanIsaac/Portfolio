"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, Pause } from "lucide-react"
import Link from "next/link"

interface Project {
  id: number
  title: string
  description: string
  image: string
  video: string
  tags: string[]
}

export default function ProjectCard({ project }: { project: Project }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const toggleVideo = () => {
    setShowVideo(!showVideo)
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl">
      <div className="relative aspect-video">
        {showVideo ? (
          <video
            src={project.video}
            className="w-full h-full object-cover"
            autoPlay={isPlaying}
            loop
            muted
            controls={false}
          />
        ) : (
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            loading="lazy"
          />
        )}

        <button
          onClick={toggleVideo}
          className="absolute bottom-4 right-4 p-2 bg-black/70 rounded-full text-white hover:bg-black transition-colors z-10"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
      </div>

      <div className="p-6">
        <Link href={`/projects/${project.id}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            {project.title}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
