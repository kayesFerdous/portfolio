import Link from "next/link"
import { Github, Linkedin, Mail, Globe } from "lucide-react"

const socialLinks = [
  { icon: Github, href: "https://github.com/kayesFerdous", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/kayees-ferdous", label: "LinkedIn" },
  { icon: Mail, href: "mailto:kayesfardows@gmail.com", label: "Email" },
  { icon: Globe, href: "https://kayees.me", label: "Website" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Fardows Alam Kayes. Built with Next.js & Framer Motion.
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
