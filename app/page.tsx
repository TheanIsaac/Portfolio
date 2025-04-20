import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import ParticleSimulation from "@/components/particle-simulation"
import PortfolioShowcase from "@/components/portfolio-showcase"
import Image from "next/image"
import ResumeButton from "@/components/resume-button"
import ClientResumeModal from "@/components/client-resume-modal"

export default function Home() {

 const email = "thean.i@northeastern.edu"
  const github = "https://github.com/TheanIsaac"
  const linkedin = "https://www.linkedin.com/in/isaacthean/"
  
  return (
    <div className="relative">
      {/* Particle background - fixed position */}
      <div className="fixed inset-0 -z-10">
        <ParticleSimulation />
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto backdrop-blur-md bg-white/60 dark:bg-black/60 p-8 rounded-lg shadow-lg border border-purple-500/30 dark:border-purple-400/30 relative overflow-hidden">
              {/* Gradient accent */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-blue-500/20 to-teal-500/20 rounded-full blur-xl"></div>
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6 relative">
                <div className="flex-1">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                    Isaac Thean
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6">
                    Full Stack Software Developer
                  </p>

                  <div className="flex gap-4 mb-6">
                    <a
                      href={github}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Github className="h-6 w-6" />
                      <span className="sr-only">GitHub</span>
                    </a>
                    <a
                      href={linkedin}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Linkedin className="h-6 w-6" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                    <a
                      href={email}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Mail className="h-6 w-6" />
                      <span className="sr-only">Email</span>
                    </a>
                  </div>
                </div>

                <div className="profile-image-container md:ml-4 relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-purple-500 dark:border-purple-400 shadow-lg transition-all duration-300 hover:border-pink-500 dark:hover:border-pink-400 group">
                  <Image src="/profile-photo.jpeg" alt="Isaac Thean" fill className="object-cover" priority />
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-300"></div>
                </div>
              </div>

              <p className="text-lg mb-8 text-gray-700 dark:text-gray-300 relative skill-description">
                I'm an aspiring developer focused on building <span className="skill-highlight">beautiful</span> and{" "}
                <span className="skill-highlight">optimized</span> digital experiences. My skills include{" "}
                <span className="skill-highlight">front-end programming</span> with{" "}
                <span className="skill-highlight">React</span> and <span className="skill-highlight">JavaScript</span>{" "}
                and <span className="skill-highlight">backend development</span> with{" "}
                <span className="skill-highlight">Java</span> and <span className="skill-highlight">AWS</span>. I'm a{" "}
                <span className="skill-highlight">go-getter</span> who thrives on{" "}
                <span className="skill-highlight">learning new technologies</span> and turning concepts into products
                that users genuinely <span className="skill-highlight">love</span>.
              </p>

              <div className="flex flex-wrap gap-4 relative">
                <a
                  href="#portfolio"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  View My Work <ArrowRight className="h-4 w-4" />
                </a>

                <ResumeButton />
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-16 min-h-screen">
          <PortfolioShowcase />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-white/90 dark:bg-gray-900/90">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Get In Touch
              </h2>
              <p className="text-lg mb-8">
                Interested in working together? Feel free to reach out to discuss your project or just say hello.
              </p>

              <a
                href={email}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-lg"
              >
                Contact Me <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-gray-100/90 dark:bg-gray-950/90">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
                © {new Date().getFullYear()} Isaac Thean. All rights reserved.
              </p>

              <div className="flex gap-4">
                <a
                  href={github}
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/isaacthean"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href="mailto:thean.i@northeastern.edu"
                  className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </a>
              </div>
            </div>
          </div>
        </footer>

        {/* Resume Modal */}
        <ClientResumeModal />
      </main>
    </div>
  )
}
