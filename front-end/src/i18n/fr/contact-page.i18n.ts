export const contact_page = {
	success:
		'Merci ! Votre soumission a été envoyée. Nous sommes impatients de commencer à créer un circuit qui reflète vos désirs',
	page: {
		contact_us: 'Votre voyage commence ici',
		have_question: `Vous avez une question ? Juste curieux ? Vous n'avez pas besoin de connaître toutes les réponses pour nous envoyer un message.`,
		chose_tag: 'Veuillez choisir le service qui vous intéresse :',
		submit: 'Soumettre',
		get_directions: 'Itinéraire sur Google Maps ↗',
	},
	tags: {
		day_tour: `visite d'une journée`,
		highland_tour: 'tour des hautes terres',
		coffee: 'café',
		adventure: 'aventure',
		trek: 'randonnée',
		ethnic: 'ethnique',
		guide: 'guide',
		transport: 'transport',
		translate: 'traduction',
	},
	inquiry_template:
		'Je souhaite avoir plus d’informations sur {tour}... Merci de me communiquer les détails et le tarif pour notre groupe.',
	err: {
		form_all: 'Veuillez remplir tous les champs.',
		form_name: 'Le nom doit contenir au moins 3 caractères.',
		form_email: 'Votre e-mail est invalide',
		form_phone: "Votre numéro de téléphone n'est pas valide",
		form_langs: 'Les langues ne doivent pas être vides',
		form_msg: 'Les messages ne doivent pas être vides',
		err_submit: "Échec de l'envoi du message. Veuillez réessayer !",
	},
	placeholder: {
		name: 'VOTRE NOM *',
		email: 'E-MAIL *',
		phone: 'TÉLÉPHONE *',
		langs: 'LANGUES *',
		msg: `MESSAGES *`,
	},
} as const
