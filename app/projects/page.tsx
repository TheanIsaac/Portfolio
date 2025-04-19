import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ProjectCard from "@/components/project-card"

export default function Projects() {
  // Sample project data - in a real app, this would come from a database or CMS
  const projects = [
    {
      id: 1,
      title: "Interactive Data Visualization",
      description: "A dashboard with interactive charts and data visualization using D3.js",
      image: "/placeholder.svg?height=400&width=600",
      video: "/placeholder.mp4",
      tags: ["React", "D3.js", "Data Visualization"],
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "A fully responsive e-commerce platform with cart functionality and payment integration",
      image: "/placeholder.svg?height=400&width=600",
      video: "/placeholder.mp4",
      tags: ["Next.js", "Stripe", "Tailwind CSS"],
    },
    {
      id: 3,
      title: "Physics Simulation",
      description: "Advanced particle physics simulation with verlet integration",
      image: "/placeholder.svg?height=400&width=600",
      video: "/placeholder.mp4",
      tags: ["p5.js", "Physics", "Simulation"],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8">My Projects</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </div>
  )
}
