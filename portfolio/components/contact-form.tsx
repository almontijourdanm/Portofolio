"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { submitContactForm, type ContactFormState } from "@/app/actions/contact"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? "Sending..." : "Send Message"}
    </Button>
  )
}

export default function ContactForm() {
  const initialState: ContactFormState = {}
  const [state, formAction] = useActionState(submitContactForm, initialState)

  return (
    <form action={formAction} className="space-y-6">
      {state?.success && (
        <Alert className="bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle className="text-green-800 dark:text-green-400">Success!</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-300">{state.message}</AlertDescription>
        </Alert>
      )}

      {state?.errors?._form && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.errors._form}</AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium dark:text-white">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`w-full p-3 border ${
              state?.errors?.name ? "border-red-500" : "border-gray-300 dark:border-gray-700"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white`}
            placeholder="Your Name"
          />
          {state?.errors?.name && <p className="text-sm text-red-500">{state.errors.name[0]}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium dark:text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`w-full p-3 border ${
              state?.errors?.email ? "border-red-500" : "border-gray-300 dark:border-gray-700"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white`}
            placeholder="your.email@example.com"
          />
          {state?.errors?.email && <p className="text-sm text-red-500">{state.errors.email[0]}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium dark:text-white">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className={`w-full p-3 border ${
            state?.errors?.subject ? "border-red-500" : "border-gray-300 dark:border-gray-700"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white`}
          placeholder="Subject"
        />
        {state?.errors?.subject && <p className="text-sm text-red-500">{state.errors.subject[0]}</p>}
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium dark:text-white">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={`w-full p-3 border ${
            state?.errors?.message ? "border-red-500" : "border-gray-300 dark:border-gray-700"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white`}
          placeholder="Your message here..."
        ></textarea>
        {state?.errors?.message && <p className="text-sm text-red-500">{state.errors.message[0]}</p>}
      </div>
      <SubmitButton />
    </form>
  )
}
