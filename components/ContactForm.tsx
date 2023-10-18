'use client'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { useToast } from "./ui/use-toast"
import ReCAPTCHA from "react-google-recaptcha"
import { RefObject, useRef } from "react"

const ContactForm = () => {
  const { toast } = useToast()
  const recaptcha: RefObject<ReCAPTCHA> = useRef(null)


  const formScehema = z.object({
    firstName: z.string().min(1, "First name is required").trim(),
    lastName: z.string().min(1, "Last name is required").trim(),
    company: z.string().trim().optional(),
    email: z.string().email("Invalid email address").min(1, "Email is required").trim(),
    phone: z.string().regex(/^(\+\d{1,3})?(\d{10})$/, "Invalid phone number").min(1, "Phone is required").trim(),
    subject: z.string().max(100, "Subject is too long").trim().optional(),
    message: z.string().min(1, "Message is required").trim(),
    recaptcha: z.string().min(1, "Recaptcha is required").trim(),
  })

  const form = useForm<z.infer<typeof formScehema>>({
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      recaptcha: "",
    },
    mode: "onChange",
    resolver: zodResolver(formScehema),
  })

  async function onSubmit(values: z.infer<typeof formScehema>) {

    const response = await fetch('/api/contact-form', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    })

    if (response.ok) {

      const data = await response.json()

      toast({
        description: data.message,
        variant: "success",
      })
      form.reset()
    } else {
      const data = await response.json()

      toast({
        description: data.message,
        variant: "destructive",
      })
    }
  }

  const onCaptchaChange = (token: string | null) => {
    if (token) {
      form.setValue("recaptcha", token)
    }
  }

  return (
    <div className="p-5 bg-blue-300 rounded-md w-[30rem]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} autoComplete="on" autoCapitalize="on" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} autoComplete="on" autoCapitalize="on" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input placeholder="Company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} autoComplete="on" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input placeholder="Phone number" {...field} autoComplete="on" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input placeholder="Subject" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Textarea rows={4} placeholder="Message" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recaptcha"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ReCAPTCHA
                    size="normal"
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                    onChange={onCaptchaChange}
                    ref={recaptcha}
                    className="w-full mt-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-4 w-full bg-primary hover:ring-2 ring-primary hover:bg-transparent" type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default ContactForm