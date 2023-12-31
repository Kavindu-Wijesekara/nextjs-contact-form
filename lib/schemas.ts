import * as z from 'zod'

export const contactFormSchema = z.object({
    firstName: z.string().min(1, "First name is required.").trim(),
    lastName: z.string().min(1, "Last name is required.").trim(),
    company: z.string().trim().optional(),
    email: z.string().email("Invalid email address").min(1, "Email is required.").trim(),
    phone: z.string().regex(/^(\+\d{1,3})?(\d{10})$/, "Invalid phone number.").min(1, "Phone is required.").trim(),
    subject: z.string().max(100, "Subject is too long.").trim().optional(),
    message: z.string().min(1, "Message is required.").trim(),
    recaptcha: z.string().min(1, "Recaptcha is required.").trim(),
})

const nameSchema = z
    .string()
    .min(1, 'Name is required.').trim()
    .refine((value) => {
        const nameParts = value.split(' ')
        return nameParts.length >= 2
    }, 'Enter last name.')

const emailSchema = z.string().min(1, "Email is required.").email({ message: 'Invalid email.' }).trim()

const phoneSchema = z.string().min(1, "Phone is required.").regex(/^(\+\d{1,3})?(\d{10})$/, "Invalid phone number.").trim()


export const formSchema = z.object({
    // company info
    companyName: z.string().min(1, 'Company Name is required.').trim(),
    companyRegistrationNumber: z.string().min(1, 'Company Registration Number is required.').trim(),
    businessType: z.enum(["PVT Ltd", "Partnership", "Sole Proprietor"],
        { required_error: 'Business Type is required.' }),

    address: z.string().min(1, 'Address is required.').trim(),
    city: z.string().min(1, 'City is required.').trim(),
    state: z.string().min(1, 'State/Province is required.').trim(),
    country: z.string().optional(),
    postalCode: z.string().min(1, 'Postal Code is required.').trim(),

    brc: z
        .any()
        .refine((file) => file?.length == 1, 'BR is required.')
        .refine((file) => file[0]?.type === 'application/pdf', 'Must be a PDF.')
        .refine((file) => file[0]?.size <= 5000000, `Max file size is 5MB.`),
    ids: z
        .any()
        .refine((file) => file?.length == 1, 'ID copies are required.')
        .refine((file) => file[0]?.type === 'application/pdf', 'Must be a PDF.')
        .refine((file) => file[0]?.size <= 10000000, `Max file size is 10MB.`),
    form120: z
        .any()
        .optional()
        .refine(file => file.length == 1 ? file[0]?.type === 'application/pdf' ? true : false : true, 'Must be a PDF.')
        .refine(file => file.length == 1 ? file[0]?.size <= 5000000 ? true : false : true, 'Max file size is 5MB.'),

    // tier info
    tier: z.enum(["Tier 1", "Tier 2", "Tier 3", "Tier 4", "Custom"],
        { required_error: 'Please select a Tier.', invalid_type_error: "Please select a Tier", }),

    customTarget: z.string().trim().optional(),

    forcusedProducts: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: 'At least one forcused product is required.'
    }),

    // user info
    fullName: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    message: z.string().trim().optional(),


    // sales/marketing lead
    salesName: nameSchema,
    salesEmail: emailSchema,
    salesPhone: phoneSchema,

    // tech lead
    techName: nameSchema,
    techEmail: emailSchema,
    techPhone: phoneSchema,

    // billing lead
    billingName: nameSchema,
    billingEmail: emailSchema,
    billingPhone: phoneSchema,

    recaptcha: z.string().min(1, "Recaptcha is required.").trim(),

    accept: z.boolean().refine(value => value === true, {
        message: 'You must accept the terms and privacy policy.'
    }),

})

export const businessSchema = z.discriminatedUnion("businessType", [
    z.object({
        businessType: z.literal("PVT Ltd"),
        form120: z
            .any()
            .refine((file) => file?.length == 1, 'Form 1/20 is required for PVT Ltd business.')
            .refine((file) => file[0]?.type === 'application/pdf', 'Must be a PDF.')
            .refine((file) => file[0]?.size <= 5000000, `Max file size is 5MB.`),
    }),
    z.object({
        businessType: z.literal("Partnership"),
    }),
    z.object({
        businessType: z.literal("Sole Proprietor"),
    }),
]).and(formSchema)

export const fullSchema = z.discriminatedUnion("tier", [
    z.object({
        tier: z.literal("Tier 1"),
    }),
    z.object({
        tier: z.literal("Tier 2"),
    }),
    z.object({
        tier: z.literal("Tier 3"),
    }),
    z.object({
        tier: z.literal("Tier 4"),
    }),
    z.object({
        tier: z.literal("Custom"),
        customTarget: z.string().min(1, "Custom sales target is required.").trim(),
    }),
]).and(businessSchema)