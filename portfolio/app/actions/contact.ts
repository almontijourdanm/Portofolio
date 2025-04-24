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
  try {
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

    // Safely handle database operations
    try {
      const client = await clientPromise
      const db = client.db(process.env.MONGODB_DB || "portfolio")
      await db.collection("contact_messages").insertOne({
        name,
        email,
        subject,
        message,
        createdAt: new Date()
      })
    } catch (dbError) {
      console.error("Database error:", dbError)
      // Continue execution - we'll try email even if DB fails
    }

    // Safely handle email
    let emailSent = false;
    try {
      emailSent = await sendEmail({
        name,
        email,
        subject,
        message
      })
    } catch (emailError) {
      console.error("Email error:", emailError)
      // Continue execution - at least we tried
    }

    return {
      success: true,
      message: "Thank you for reaching out! Your message has been received. I typically respond within 24-48 hours during business days."
    }
  } catch (error) {
    console.error("Form submission error:", error)
    return {
      errors: {
        _form: ["There was an issue submitting your message. Please try again or contact me directly at almontimanuputty@gmail.com"],
      },
      success: false,
    }
  }
}
