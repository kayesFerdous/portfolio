import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"

export const metadata = {
  title: "Contact | Fardows Alam Kayes",
  description: "Get in touch with Fardows Alam Kayes for collaboration, project inquiries, or opportunities.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
