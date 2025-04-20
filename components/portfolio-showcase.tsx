"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Code, Play, Pause, X } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Define project type
interface Project {
  id: string
  title: string
  description: string
  thumbnail: string
  video: string
  technologies: string[]
  link?: string
  github?: string
  featured: boolean
  category: "web" | "mobile" | "design" | "other"
}

// Sample projects data
const projects: Project[] = [
  {
    id: "Kaizen",
    title: "Kaizen: Personalized AI Workout Generator",
    description:
      "Creates routines based on biometrics and fitness goals, adjusts difficulty as users progress and analyzes user data to optimize recommendations",
    thumbnail: "/Kaizen.png",
    video: "/KaizenDemo.mov",
    technologies: ["React", "D3.js", "REST", "AWS"],
    link: "https://isaac-thean-whoop.vercel.app/",
    github: "https://github.com/isaacthean/dashboard",
    featured: true,
    category: "web",
  },

  {
    id: "VocaPersona",
    title: "VocaPersona: Speech-Based Personality Analysis",
    description:
      "VocaPersona analyzes spoken responses to determine Big Five personality traits using AI. The application leverages both linguistic content and speech tonality to provide comprehensive personality insights.",
    thumbnail: "/interactive-data-dashboard.png",
    video: "/dashboard-demo.mp4",
    technologies: ["React", "PyTorch", "Machine Learning", "AWS"],
    link: "https://example.com/dashboard",
    github: "https://github.com/isaacthean/dashboard",
    featured: true,
    category: "web",
  
  }
]

export default function PortfolioShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [filter, setFilter] = useState<string>("all")
  const [showControls, setShowControls] = useState(false)
  const [modalShowControls, setModalShowControls] = useState(false)
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)

  // Filter projects based on selected category
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter || (filter === "featured" && project.featured))

  // Handle video play/pause
  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  // Handle project selection
  const openProject = (project: Project) => {
    setSelectedProject(project)
    setIsPlaying(false)
    // Reset controls visibility
    setModalShowControls(false)
  }

  // Close project modal
  const closeProject = () => {
    setSelectedProject(null)
    setIsPlaying(false)
  }

  // Handle mouse enter/leave for controls visibility
  const handleMouseEnter = () => {
    setShowControls(true)
    if (controlsTimeout) {
      clearTimeout(controlsTimeout)
      setControlsTimeout(null)
    }
  }

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowControls(false)
    }, 1500)
    setControlsTimeout(timeout as unknown as NodeJS.Timeout)
  }

  const handleModalMouseEnter = () => {
    setModalShowControls(true)
    if (controlsTimeout) {
      clearTimeout(controlsTimeout)
      setControlsTimeout(null)
    }
  }

  const handleModalMouseLeave = () => {
    const timeout = setTimeout(() => {
      setModalShowControls(false)
    }, 1500)
    setControlsTimeout(timeout as unknown as NodeJS.Timeout)
  }

  const handleModalMouseMove = () => {
    setModalShowControls(true)
    if (controlsTimeout) {
      clearTimeout(controlsTimeout)
    }

    const timeout = setTimeout(() => {
      setModalShowControls(false)
    }, 2500)
    setControlsTimeout(timeout as unknown as NodeJS.Timeout)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        closeProject()
      } else if (e.key === " " && selectedProject) {
        // Space bar toggles play/pause
        e.preventDefault()
        togglePlay()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedProject, isPlaying])

  // Handle video events
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)

    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("ended", handleEnded)
    }
  }, [selectedProject])

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeout) {
        clearTimeout(controlsTimeout)
      }
    }
  }, [controlsTimeout])

  // Intersection Observer for animations
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const projectElements = containerRef.current.querySelectorAll(".project-card")
    projectElements.forEach((el) => observer.observe(el))

    return () => {
      projectElements.forEach((el) => observer.unobserve(el))
    }
  }, [filteredProjects])

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              My Portfolio
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              Explore my latest projects featuring interactive demos and cutting-edge technologies.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <button
              onClick={() => setFilter("all")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                filter === "all"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white dark:from-purple-500 dark:to-pink-500"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700",
              )}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter("featured")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                filter === "featured"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white dark:from-purple-500 dark:to-pink-500"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700",
              )}
            >
              Featured
            </button>
            <button
              onClick={() => setFilter("web")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                filter === "web"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white dark:from-purple-500 dark:to-pink-500"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700",
              )}
            >
              Web
            </button>
            <button
              onClick={() => setFilter("mobile")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                filter === "mobile"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white dark:from-purple-500 dark:to-pink-500"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700",
              )}
            >
              Mobile
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layoutId={`project-${project.id}`}
              className="project-card opacity-0 transition-opacity duration-500 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              onClick={() => openProject(project)}
            >
              <div
                className="relative aspect-video cursor-pointer group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Image
                  src={project.thumbnail || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div
                    className={cn(
                      "bg-white dark:bg-gray-900 rounded-full p-3 transform transition-all duration-300",
                      showControls ? "scale-100 opacity-100" : "scale-0 opacity-0",
                    )}
                  >
                    <Play className="h-6 w-6 text-black dark:text-white" />
                  </div>
                </div>
                {project.featured && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white dark:from-purple-500 dark:to-pink-500 text-xs font-bold px-3 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 md:p-8"
            onClick={closeProject}
          >
            <motion.div
              layoutId={`project-${selectedProject.id}`}
              className="relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button - positioned in the top right corner */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  closeProject()
                }}
                className={cn(
                  "absolute top-4 right-4 z-50 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 transition-all shadow-md",
                  modalShowControls ? "opacity-100" : "opacity-0",
                )}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Video container */}
              <div
                className="relative"
                ref={videoContainerRef}
                onMouseEnter={handleModalMouseEnter}
                onMouseLeave={handleModalMouseLeave}
                onMouseMove={handleModalMouseMove}
              >
                <div className="relative aspect-video">
                  <video
                    ref={videoRef}
                    src={selectedProject.video}
                    poster={selectedProject.thumbnail}
                    className="w-full h-full object-contain bg-black cursor-pointer"
                    controls={false}
                    playsInline
                    onClick={(e) => {
                      e.stopPropagation()
                      togglePlay()
                    }}
                  />

                  {/* Play/Pause button */}
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                      modalShowControls ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        togglePlay()
                      }}
                      className="bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </button>
                  </div>

                  {/* Video progress bar */}
                  <div
                    className={cn(
                      "absolute bottom-0 left-0 right-0 h-1 bg-gray-700 transition-opacity duration-300",
                      modalShowControls ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                      style={{
                        width: videoRef.current
                          ? `${(videoRef.current.currentTime / videoRef.current.duration) * 100}%`
                          : "0%",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Project details with scrollable description */}
              <div className="p-6 overflow-y-auto flex-1">
                <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>

                {/* Scrollable description area */}
                <div
                  ref={descriptionRef}
                  className="text-gray-600 dark:text-gray-300 mb-6 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar"
                >
                  <p>{selectedProject.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all duration-300"
                    >
                      <ExternalLink className="h-4 w-4" /> View Live
                    </a>
                  )}
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Code className="h-4 w-4" /> View Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
