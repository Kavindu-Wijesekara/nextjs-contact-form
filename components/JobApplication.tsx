'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "./ui/use-toast"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { RefObject, useRef } from "react"
import ReCAPTCHA from "react-google-recaptcha"

export function JobApplication() {
    const { toast } = useToast()
    const recaptcha: RefObject<ReCAPTCHA> = useRef(null)


    const JobApplicationSchema = z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().email("Invalid email address").min(1, "Email is required").trim(),
        phone: z.string().regex(/^(\+\d{1,3})?(\d{10})$/, "Invalid phone number").min(1, "Phone is required").trim(),
        city: z.string().min(1, "City is required"),
        edu: z.string().min(1, "Education is required"),
        resume: z
            .any()
            .refine((file) => file?.length == 1, "Resume is required.")
            .refine((file) => file?.size <= 3000000, `Max file size is 3MB.`)
            .refine(
                (file) => file?.type === "application/pdf",
                "PDF file is required."
            )
        ,
        recaptcha: z.string().min(1, "Recaptcha is required").trim(),
    })

    const form = useForm<z.infer<typeof JobApplicationSchema>>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            city: "",
            edu: "",
            resume: "",
            recaptcha: "",
        },
        mode: "onChange",
        resolver: zodResolver(JobApplicationSchema),
    })

    const onSubmit = () => {
        toast({
            description: "Successfully updated your profile",
            variant: "destructive",
        })
    }

    const onCaptchaChange = (token: string | null) => {
        if (token) {
            form.setValue("recaptcha", token)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen no-scrollbar"}>
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
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
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                        <Input placeholder="Current City" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="edu"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                        <Input placeholder="Highest Education Qualification" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="resume"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                        <Input type="file" accept=".pdf" placeholder="" {...field} />
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
                        <DialogFooter>
                            <Button className="mt-4 w-full bg-primary hover:ring-2 ring-primary hover:bg-transparent" type="submit" onClick={onSubmit}>Submit</Button>
                        </DialogFooter>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
