"use server"

import { z } from "zod"
import clientPromise from "@/lib/mongodb"
import { sendEmail } from "@/lib/email"

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

export type ContactFormState = {
  errors?: {
    name?: string[]
    email?: string[]
    subject?: string[]
    message?: string[]
    _form?: string[]
  }
  success?: boolean
  message?: string
}

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  // Validate form data
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  })

  // Return errors if validation fails
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
      message: "Please fix the errors in the form.",
    }
  }

  const { name, email, subject, message } = validatedFields.data;

  try {
    // 1. Save to MongoDB
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "portfolio")
    await db.collection("contact_messages").insertOne({
      name,
      email,
      subject,
      message,
      createdAt: new Date()
    })

    // Send email with better error handling
    const emailSent = await sendEmail({
      name,
      email,
      subject,
      message
    })

    return {
      success: true,
      message: emailSent
        ? "Thank you for reaching out! Your message has been successfully saved and delivered to Almonti. I typically respond within 24-48 hours during business days. I appreciate your patience and look forward to connecting with you soon!"
        : "Your message has been saved to our database, but there was an issue sending the email notification. I'll still receive your message and will get back to you as soon as possible.",
    }
  } catch (error) {
    console.error("Form submission error:", error)
    return {
      errors: {
        _form: ["Failed to send message. Please try again later."],
      },
      success: false,
    }
  }
}
