import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import * as z from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export const handleApiCall = async (endpoint: string, data: any) => {
  const resp = await fetch(`api/${endpoint}`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(data)
  });
  return resp;
}

export const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").trim(),
  lastName: z.string().min(1, "Last name is required").trim(),
  company: z.string().trim().optional(),
  email: z.string().email("Invalid email address").min(1, "Email is required").trim(),
  phone: z.string().regex(/^(\+\d{1,3})?(\d{10})$/, "Invalid phone number").min(1, "Phone is required").trim(),
  subject: z.string().max(100, "Subject is too long").trim().optional(),
  message: z.string().min(1, "Message is required").trim(),
  recaptcha: z.string().min(1, "Recaptcha is required").trim(),
})


export const formSchema = z.object({
  // company info
  companyName: z.string().min(1, 'Company Name is required.').trim(),
  companyRegistrationNumber: z.string().min(1, 'Company Registration Number is required').trim(),
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
  tier: z.enum(["Tier 1", "Tier 2", "Tier 3", "Tier 4"],
    { required_error: 'Please select a Tier.' }),

  forcusedProducts: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'At least one forcused product is required.'
  }),

  // user info
  fullName: z
    .string()
    .min(1, 'Name is required.').trim()
    .refine((value) => {
      const nameParts = value.split(' ')
      return nameParts.length >= 2
    }, 'Enter last name.'),

  email: z.string().min(1, "Email is required.").email({ message: 'Invalid email.' }).trim(),
  phone: z.string().min(1, "Phone is required.").regex(/^(\+\d{1,3})?(\d{10})$/, "Invalid phone number.").trim(),
  message: z.string().trim().optional(),


  // sales/marketing lead
  salesName: z.string().trim().refine(value => !value || value.split(' ').length >= 2, { message: 'Enter last name.' }).optional(),
  salesEmail: z.string().refine(value => !value || /^\S+@\S+\.\S+$/.test(value), { message: 'Invalid email.' }).optional(),
  salesPhone: z.string().refine(value => !value || /^(\+\d{1,3})?(\d{10})$/.test(value), { message: 'Invalid phone number.' }).optional(),

  // tech lead
  techName: z.string().trim().refine(value => !value || value.split(' ').length >= 2, { message: 'Enter last name.' }).optional(),
  techEmail: z.string().refine(value => !value || /^\S+@\S+\.\S+$/.test(value), { message: 'Invalid email.' }).optional(),
  techPhone: z.string().refine(value => !value || /^(\+\d{1,3})?(\d{10})$/.test(value), { message: 'Invalid phone number.' }).optional(),

  // billing lead
  billingName: z.string().trim().refine(value => !value || value.split(' ').length >= 2, { message: 'Enter last name.' }).optional(),
  billingEmail: z.string().refine(value => !value || /^\S+@\S+\.\S+$/.test(value), { message: 'Invalid email.' }).optional(),
  billingPhone: z.string().refine(value => !value || /^(\+\d{1,3})?(\d{10})$/.test(value), { message: 'Invalid phone number.' }).optional(),

  recaptcha: z.string().min(1, "Recaptcha is required").trim(),

  accept: z.boolean().refine(value => value === true, {
    message: 'You must accept the terms and privacy policy.'
  }),

})

export const unionSchema = z.discriminatedUnion("businessType", [
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