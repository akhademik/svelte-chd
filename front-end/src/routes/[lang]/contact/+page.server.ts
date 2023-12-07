import { fail } from '@sveltejs/kit'
import { form_schema } from '$utils/form-schema'
import { message, superValidate } from 'sveltekit-superforms/server'

const URL = 'https://submit-form.com/FDkjl2H3'

export const load = async () => {
	const form = await superValidate(form_schema)
	return { form }
}

export const actions = {
	default: async ({ request }) => {
		const clone_request = request.clone()
		const form = await superValidate(request, form_schema)
		const tags = await clone_request.formData()
		const all_tags = tags.getAll('selected_tag')
		const last_val = { ...form.data, tags: all_tags }

		if (!form.valid) {
			return fail(400, { form })
		}

		// TODO: Do something with the validated form.data

		const response = await fetch(URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(last_val),
		})

		if (!response.ok) {
			console.error('Fetch failed:', response.status, response.statusText)
			return message(form, 'failed')
		} else {
			return message(form, 'success')
		}
	},
}
