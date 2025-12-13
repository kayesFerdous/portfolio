import { ContactForm } from "@/components/contact-form"
import { Github, Linkedin, Mail, Globe } from "lucide-react"

export const metadata = {
  title: "Contact | Fardows Alam Kayes",
  description: "Get in touch with Fardows Alam Kayes for collaboration, project inquiries, or opportunities.",
}

const contactLinks = [
  { icon: Mail, label: "Email", value: "kayesfardows@gmail.com", href: "mailto:kayesfardows@gmail.com" },
  { icon: Github, label: "GitHub", value: "github.com/kayesFerdous", href: "https://github.com/kayesFerdous" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/kayees-ferdous", href: "https://linkedin.com/in/kayees-ferdous" },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-4 group"
                      >
                        <div className="p-3 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{link.label}</p>
                          <p className="text-muted-foreground group-hover:text-foreground transition-colors">{link.value}</p>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
