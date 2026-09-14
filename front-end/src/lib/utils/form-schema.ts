import { z } from 'zod'

const phoneCheck = /^(?:\(\+\d+\)|\+\d+)?[-.\s\d]+$/

export const formSchema = z.object({
	name: z.string().min(3, 'form_name').max(100),
	email: z.string().email('form_email'),
	phone: z.string().min(10, 'form_phone').regex(phoneCheck, 'form_phone'),
	langs: z.string().min(2, 'form_langs'),
	msg: z.string().min(2, 'form_msg').max(3000),
})

export type FormSchema = z.infer<typeof formSchema>

export const bookingApiSchema = z.object({
	name: z.string().trim().min(2, 'form_name_min').max(100, 'form_name_max'),
	contact: z
		.string()
		.trim()
		.min(5, 'form_contact_min')
		.max(100, 'form_contact_max')
		.refine(
			val => z.string().email().safeParse(val).success || phoneCheck.test(val),
			'form_contact_invalid'
		),
	tour: z.string().trim().max(200).optional().default(''),
	date: z.string().trim().max(50).optional().default(''),
	guests: z.coerce.number().int().min(1).max(999).optional().default(1),
	note: z.string().trim().max(3000).optional().default(''),
	langs: z.string().trim().max(10).optional().default('vi'),
	fax: z.string().optional(),
	website: z.string().optional(),
})

export type BookingApiSchema = z.infer<typeof bookingApiSchema>
