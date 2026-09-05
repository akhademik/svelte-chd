import { z } from 'zod'

const phone_check = /^(?:\(\+\d+\)|\+\d+)?[-.\s\d]+$/

export const form_schema = z.object({
	name: z.string().min(3, 'form_name'),
	email: z.string().email('form_email'),
	phone: z.string().min(10, 'form_phone').regex(phone_check, 'form_phone'),
	langs: z.string().min(2, 'form_langs'),
	msg: z.string().min(2, 'form_msg'),
})

export type FormSchema = z.infer<typeof form_schema>
