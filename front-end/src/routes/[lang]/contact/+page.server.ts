import { superValidate } from 'sveltekit-superforms/server'
import { z } from 'zod'

const phone_check = /^(?:\(\+\d+\)|\+\d+)?[-.\s\d]+$/

const schema = z.object({
	name: z.string().min(3, 'form_name'),
	email: z.string().email({ message: 'form_email' }),
	phone: z.string().min(10, 'form_phone').regex(phone_check, 'form_phone'),
	langs: z.string().min(2, 'form_langs'),
	msg: z.string().min(2, 'form_msg'),
})

export const load = async () => {
	// Server API:
	const form = await superValidate(schema)

	// Unless you throw, always return { form } in load and form actions.
	return { form }
}
