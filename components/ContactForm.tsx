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
import { contactFormSchema } from "@/lib/utils"

const ContactForm = () => {
  const { toast } = useToast()
  const recaptchaRef: RefObject<ReCAPTCHA> = useRef(null)

  const form = useForm<z.infer<typeof contactFormSchema>>({
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
    resolver: zodResolver(contactFormSchema),
  })

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {

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
    <div className="p-5 bg-blue-300 rounded-md w-full lg:w-[20rem]">
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
                  <Input type="email" placeholder="Email" {...field} autoComplete="on" />
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
                  <Input type="tel" placeholder="Phone number" {...field} autoComplete="on" />
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
                    ref={recaptchaRef}
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