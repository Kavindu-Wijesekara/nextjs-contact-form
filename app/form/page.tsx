'use client'

import { useForm } from "react-hook-form"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { cn, handleApiCall, unionSchema } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { RefObject, useRef, useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import ReCAPTCHA from "react-google-recaptcha"
import { checkDocumentExists, uploadFile } from "@/firebase/firebaseClientFunctions";
import CompanyDetails from "@/components/widgets/forms/CompanyDetails";
import ApplicatInfo from "@/components/widgets/forms/ApplicatInfo";
import OthersInfo from "@/components/widgets/forms/OthersInfo";



const PartnerRegistration = () => {

    const { toast } = useToast()
    const [isSubmitingDone, setIsSubmitingDone] = useState(false)
    const recaptchaRef: RefObject<ReCAPTCHA> = useRef(null)


    const form = useForm<z.infer<typeof unionSchema>>({
        defaultValues: {
            companyName: '',
            companyRegistrationNumber: '',
            businessType: undefined,
            address: '',
            city: '',
            state: '',
            country: '',
            postalCode: '',
            brc: undefined,
            ids: undefined,
            form120: undefined,
            tier: undefined,
            forcusedProducts: [],
            fullName: '',
            email: '',
            phone: '',
            message: '',
            salesName: '',
            salesEmail: '',
            salesPhone: '',
            techName: '',
            techEmail: '',
            techPhone: '',
            billingName: '',
            billingEmail: '',
            billingPhone: '',
            recaptcha: '',
            accept: false
        },
        mode: 'onChange',
        resolver: zodResolver(unionSchema)
    })

    const onSubmit = async (values: z.infer<typeof unionSchema>) => {
        const modifiedRegistrationNumber = values.companyRegistrationNumber.replace("/", "_")

        const brcFileName = `${modifiedRegistrationNumber}_BR.pdf`
        const idsFileName = `${modifiedRegistrationNumber}_ID.pdf`
        const form120FileName = `${modifiedRegistrationNumber}_Form1-20.pdf`


        setIsSubmitingDone(true)

        const checkDoc = await checkDocumentExists(modifiedRegistrationNumber)

        if (checkDoc) {
            setIsSubmitingDone(false)
            return toast({
                variant: "warn",
                title: "Sorry!",
                description: "A company already registered with this business registration number.",
            })
        }

        const recaptchaResponse = await handleApiCall(
            'verify-recaptcha', values.recaptcha
        )

        const recaptchaResponseJson = await recaptchaResponse.json()
        if (recaptchaResponse.ok) {
            try {
                toast({
                    variant: "default",
                    title: "Uploading files...",
                })
                values.brc = await uploadFile(values.brc[0], brcFileName, modifiedRegistrationNumber)
                values.ids = await uploadFile(values.ids[0], idsFileName, modifiedRegistrationNumber)
                if (values.form120.length > 0) {
                    values.form120 = await uploadFile(values.form120[0], form120FileName, modifiedRegistrationNumber)
                } else {
                    values.form120 = ""
                }
            } catch (error) {
                return toast({
                    variant: "destructive",
                    title: "Error occured",
                    description: "Something went wrong while uploading files. Please try again later.",
                })
            }

            const dataUploadResponse = await handleApiCall(
                'formdata-upload', values
            )

            const dataUploadResponseJson = await dataUploadResponse.json()

            if (dataUploadResponse.ok) {

                const regMailsResponse = await handleApiCall(
                    'send-reg-email', values
                )

                const regMailsResponseJson = await regMailsResponse.json()

                if (regMailsResponse.ok) {

                    const confMailResponse = await handleApiCall(
                        'send-conf-email', values
                    )

                    const confMailResponseJson = await confMailResponse.json()

                    setIsSubmitingDone(false)
                    // form.reset()
                    return toast({
                        variant: "success",
                        title: regMailsResponseJson.message,
                    })
                } else {
                    const deleteData = await fetch('/api/delete-uploaded-data', {
                        method: 'DELETE',
                        body: JSON.stringify(dataUploadResponseJson.docId),
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'DELETE',
                            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                        }
                    })
                    setIsSubmitingDone(false)
                    return toast({
                        variant: "destructive",
                        title: regMailsResponseJson.message,
                    })
                }
            } else {
                await fetch('/api/delete-uploaded-data', {
                    method: 'DELETE',
                    body: JSON.stringify(dataUploadResponseJson.docId),
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'DELETE',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    }
                })
                setIsSubmitingDone(false)
                return toast({
                    variant: "destructive",
                    title: dataUploadResponseJson.message,
                })
            }
        } else {
            setIsSubmitingDone(false)

            return toast({
                variant: "destructive",
                title: recaptchaResponseJson.message,
            })
        }
    }

    const formSubmit = (values: z.infer<typeof unionSchema>) => {
        console.log(values);
    }

    const onCaptchaExpired = () => {
        form.setValue("recaptcha", "")
    }

    const onCaptchaChange = (token: string | null) => {
        if (token) {
            form.setValue("recaptcha", token)
        } else {
            form.setValue("recaptcha", "")
        }
    }

    return (

        <div className="my-2 py-6 md:py-16 rounded-[2.3rem] relative bg-white">
            <div className="container mx-auto">
                <div className="text-center md:text-start">
                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight capitalize">
                        Partner <span className="text-primary">regisration</span>
                    </h1>
                </div>
                <div className="mt-12">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <h2 className="text-xl md:text-2xl font-bold leading-tight capitalize mt-3 mb-4 underline decoration-primary">Company Information</h2>

                            <CompanyDetails form={form} />
                            <ApplicatInfo form={form} />
                            <OthersInfo form={form} />


                            <FormField
                                control={form.control}
                                name="accept"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-3 space-y-0 my-3">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel className="space-y-1 leading-none">By checking the box and submitting this form, I acknowledge and accept the terms of the privacy policy.</FormLabel>

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
                                                onExpired={onCaptchaExpired}
                                                ref={recaptchaRef}
                                                className="w-full mt-2"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <Button
                                className={cn(
                                    "mt-4 w-full bg-primary hover:ring-2 ring-primary hover:bg-transparent hover:text-primary",
                                    isSubmitingDone ? "cursor-wait" : "cursor-pointer"
                                )}
                                type="submit"
                                disabled={isSubmitingDone}
                            >
                                {
                                    isSubmitingDone ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit"
                                }
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default PartnerRegistration