import nodemailer from 'nodemailer'

export async function sendEmail(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  // Create a more detailed error if config is missing
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error("Email configuration is incomplete")
    return false
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',  // Using 'gmail' instead of custom host/port
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Portofolio Message Subject: ${data.subject}`,
      html: `
        <h2>New message from your portfolio</h2>
        <p><strong>From:</strong> ${data.name} (${data.email})</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    })
    return true
  } catch (error) {
    console.error("Failed to send email:", error)
    return false
  }
}

export async function handleContactFormSubmission(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  const { name, email, subject, message } = data

  try {
    // MongoDB code...
    
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
        ? "Thank you! Your message has been saved and notification sent."
        : "Your message was saved, but we couldn't send an email notification.",
    }
  } catch (error) {
    // Error handling...
  }
}