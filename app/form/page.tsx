'use client'

import { useForm } from "react-hook-form"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { cleanAndUppercase, cn, handleApiCall } from "@/lib/utils"
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
import { fullSchema } from "@/lib/schemas";
import TiersProducts from "@/components/widgets/forms/TiersProducts";


const PartnerRegistration = () => {

    const { toast } = useToast()
    const [isSubmitingDone, setIsSubmitingDone] = useState(false)
    const recaptchaRef: RefObject<ReCAPTCHA> = useRef(null)


    const form = useForm<z.infer<typeof fullSchema>>({
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
            customTarget: '',
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
        resolver: zodResolver(fullSchema)
    })

    const onSubmit = async (values: z.infer<typeof fullSchema>) => {
        const modifiedRegistrationNumber = cleanAndUppercase(values.companyRegistrationNumber)

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
                setIsSubmitingDone(false);
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
                    handleApiCall('send-conf-email', values)
                        .then(confMailResponse => {
                            setIsSubmitingDone(false);
                            // form.reset();
                            toast({
                                variant: "success",
                                title: "Form submitted successfully!, We will get back to you soon after reviewing your application.",
                            });
                        })
                        .catch(async error => {
                            fetch('/api/delete-uploaded-data', {
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
                                title: "Something went wrong. Please try again later.",
                            })
                        });
                } else {
                    fetch('/api/delete-uploaded-data', {
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
                        title: "Something went wrong. Please try again later.",
                    })
                }
            } else {
                fetch('/api/delete-uploaded-data', {
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
                    title: "Something went wrong. Please try again later.",
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

    const formSubmit = async (values: z.infer<typeof fullSchema>) => {

        const req = await fetch('/api/form-submit', {
            method: 'POST',
            body: JSON.stringify(values),
        })
        const reqJson = await req.json()

        console.log(reqJson);

        const res = await fetch(`/api/form-submit/${reqJson.id}`);
        const resJson = await res.json();

        console.log(resJson);

        // fetchDataWithDelay(5000, reqJson.id);
    }

    // function fetchDataWithDelay(delay: any, id: string) {
    //     setTimeout(async () => {
    //         let state = '';

    //         do {
    //             const res = await fetch(`/api/form-submit/${id}`);
    //             const resJson = await res.json();
    //             state = resJson.state;

    //             console.log(resJson);

    //             // Add a delay before making the next request
    //             await new Promise(resolve => setTimeout(resolve, delay));
    //         } while (state !== 'succeed' && state !== 'failed');
    //     }, delay);
    // }

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

                            <div className="border border-primary rounded-[2.3rem] relative">
                                <h2 className="text-base lg:text-xl text-primary leading-tight capitalize mb-4 inline-block absolute -mt-6 ml-8 p-2 bg-background">Company Information</h2>
                                <CompanyDetails form={form} />
                            </div>

                            <div className="border border-primary rounded-[2.3rem] relative mt-8">
                                <h2 className="text-base lg:text-xl text-primary leading-tight capitalize mb-4 inline-block absolute -mt-6 ml-8 p-2 bg-background">Tier & Forcused Products</h2>
                                <TiersProducts form={form} />
                            </div>

                            <div className="border border-primary rounded-[2.3rem] relative mt-8">
                                <h2 className="text-base lg:text-xl text-primary leading-tight capitalize mb-4 inline-block absolute -mt-6 ml-8 p-2 bg-background">Applicant Infomation</h2>
                                <ApplicatInfo form={form} />
                            </div>

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