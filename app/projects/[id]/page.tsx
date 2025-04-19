import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  // In a real app, you would fetch this data from a database or CMS
  // This is just a placeholder
  const project = {
    id: Number.parseInt(params.id),
    title: "Project " + params.id,
    description:
      "This is a detailed description of the project. It would include information about the technologies used, the challenges faced, and the solutions implemented.",
    image: "/placeholder.svg?height=600&width=1200",
    video: "/placeholder.mp4",
    tags: ["React", "Next.js", "Tailwind CSS"],
    content: `
      <p>This project was built using the latest web technologies to ensure optimal performance and user experience.</p>
      <p>The main features include:</p>
      <ul>
        <li>Responsive design that works on all devices</li>
        <li>Interactive elements that engage users</li>
        <li>Optimized performance for fast loading times</li>
        <li>Accessibility considerations for all users</li>
      </ul>
    `,
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>

          <div className="mb-8 rounded-lg overflow-hidden">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={1200}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
            <p className="text-lg mb-4">{project.description}</p>
            <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: project.content }} />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Demo Video</h2>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <video src={project.video} className="w-full h-full" controls poster={project.image} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
