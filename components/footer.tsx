import Link from "next/link"
import { Github, Linkedin, Mail, Globe } from "lucide-react"

const socialLinks = [
  { icon: Github, href: "https://github.com/kayesFerdous", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/kayees-ferdous", label: "LinkedIn" },
  { icon: Mail, href: "mailto:kayesfardows@gmail.com", label: "Email" },
  // { icon: Globe, href: "https://kayees.me", label: "Website" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            © {new Date().getFullYear()} Fardows Alam Kayes.
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
