"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { ContactFormData } from "@/types"

const containerVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Honeypot check
    if (formData.honeypot) {
      return
    }

    // Client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all fields.")
      return
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setIsSuccess(true)
      setFormData({
        name: "",
        email: "",
        message: "",
        honeypot: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    } catch (err) {
      setError("Failed to send message. Please try again or email me directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass border border-border rounded-lg p-8 flex flex-col items-center justify-center text-center min-h-[500px]"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
        </motion.div>
        <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
        <p className="text-muted-foreground mb-6">Thank you for reaching out. I'll get back to you soon.</p>
        <Button onClick={() => setIsSuccess(false)} variant="outline">
          Send Another Message
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <form onSubmit={handleSubmit} className="glass border border-border rounded-lg p-6 md:p-8 space-y-6">
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          name="website"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          className="sr-only"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your name"
            required
            className="bg-muted/50 border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="your.email@example.com"
            required
            className="bg-muted/50 border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell me about your project or inquiry..."
            rows={6}
            required
            className="bg-muted/50 border-border resize-none"
          />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
          >
            {error}
          </motion.div>
        )}

        <Button type="submit" size="lg" className="w-full gap-2 group" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="animate-spin">◌</span>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Your information will be kept private and only used to respond to your inquiry.
        </p>
      </form>
    </motion.div>
  )
}
