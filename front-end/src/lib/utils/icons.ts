// NOTE:
// get the icons from https://icones.js.org/ or https://www.svgrepo.com/
// make sure to edit the BOX to have correct display

type Icon = {
	box_width: number
	box_height?: number
	svg: string
}

interface Icons {
	[key: string]: Icon
}

export const icons: Icons = {
	hamburger: {
		box_width: 15,
		svg: `<path d="M1.5 3a.5.5 0 0 0 0 1h12a.5.5 0 0 0 0-1h-12ZM1 7.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5Zm0 4a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5Z" "></path>`,
	},
	flag_vn: {
		box_width: 32,
		box_height: 24,
		svg: `<defs><path id="flagpackVn0" fill="#fff" d="M0 0h32v24H0z"/></defs><g fill="none"><g clip-path="url(#flagpackVn2)"><use href="#flagpackVn0"/><path fill="#F7FCFF" fill-rule="evenodd" d="M0 0h32v24H0V0Z" clip-rule="evenodd"/><path fill="#E31D1C" fill-rule="evenodd" d="M0 0v24h32V0H0Z" clip-rule="evenodd"/><mask id="flagpackVn1" width="32" height="24" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:luminance"><path fill="#fff" fill-rule="evenodd" d="M0 0v24h32V0H0Z" clip-rule="evenodd"/></mask><g mask="url(#flagpackVn1)"><path fill="#FFD221" fill-rule="evenodd" d="m16.062 15.98l-5.15 3.275l1.727-5.733l-3.674-3.746l5.065-.11l2.241-5.66l2.042 5.734l5.053.089l-3.797 3.814l1.773 5.454l-5.28-3.117Z" clip-rule="evenodd"/></g></g><defs><clipPath id="flagpackVn2"><use href="#flagpackVn0"/></clipPath></defs></g>
    `,
	},
	flag_fr: {
		box_width: 32,
		box_height: 24,
		svg: `<defs><path id="flagpackFr0" fill="#fff" d="M0 0h32v24H0z"/></defs><g fill="none"><g clip-path="url(#flagpackFr1)"><use href="#flagpackFr0"/><path fill="#F50100" fill-rule="evenodd" d="M22 0h10v24H22V0Z" clip-rule="evenodd"/><path fill="#2E42A5" fill-rule="evenodd" d="M0 0h12v24H0V0Z" clip-rule="evenodd"/><path fill="#F7FCFF" fill-rule="evenodd" d="M10 0h12v24H10V0Z" clip-rule="evenodd"/></g><defs><clipPath id="flagpackFr1"><use href="#flagpackFr0"/></clipPath></defs></g>
    `,
	},
	flag_en: {
		box_width: 32,
		box_height: 24,
		svg: `<defs><path id="flagpackGbNir0" fill="#fff" d="M0 0h32v24H0z"/></defs><g fill="none"><g clip-path="url(#flagpackGbNir3)"><use href="#flagpackGbNir0"/><path fill="#2E42A5" fill-rule="evenodd" d="M0 0v24h32V0H0Z" clip-rule="evenodd"/><mask id="flagpackGbNir1" width="32" height="24" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:luminance"><path fill="#fff" fill-rule="evenodd" d="M0 0v24h32V0H0Z" clip-rule="evenodd"/></mask><g mask="url(#flagpackGbNir1)"><path fill="#fff" d="m-3.563 22.285l7.041 2.979L32.16 3.238l3.714-4.426l-7.53-.995l-11.698 9.491l-9.416 6.396l-10.793 8.581Z"/><path fill="#F50100" d="M-2.6 24.372L.989 26.1L34.54-1.599h-5.037l-32.102 25.97Z"/><path fill="#fff" d="m35.563 22.285l-7.042 2.979L-.159 3.238l-3.715-4.426l7.53-.995l11.698 9.491l9.416 6.396l10.793 8.581Z"/><path fill="#F50100" d="m35.323 23.783l-3.588 1.728l-14.286-11.86l-4.236-1.324l-17.445-13.5H.806l17.434 13.18l4.631 1.588l12.452 10.188Z"/><mask id="flagpackGbNir2" fill="#fff"><path fill-rule="evenodd" d="M19.778-2h-7.556V8H-1.973v8h14.195v10h7.556V16h14.25V8h-14.25V-2Z" clip-rule="evenodd"/></mask><path fill="#F50100" fill-rule="evenodd" d="M19.778-2h-7.556V8H-1.973v8h14.195v10h7.556V16h14.25V8h-14.25V-2Z" clip-rule="evenodd"/><path fill="#fff" d="M12.222-2v-2h-2v2h2Zm7.556 0h2v-2h-2v2ZM12.222 8v2h2V8h-2ZM-1.973 8V6h-2v2h2Zm0 8h-2v2h2v-2Zm14.195 0h2v-2h-2v2Zm0 10h-2v2h2v-2Zm7.556 0v2h2v-2h-2Zm0-10v-2h-2v2h2Zm14.25 0v2h2v-2h-2Zm0-8h2V6h-2v2Zm-14.25 0h-2v2h2V8Zm-7.556-8h7.556v-4h-7.556v4Zm2 8V-2h-4V8h4Zm-16.195 2h14.195V6H-1.973v4Zm2 6V8h-4v8h4Zm12.195-2H-1.973v4h14.195v-4Zm2 12V16h-4v10h4Zm5.556-2h-7.556v4h7.556v-4Zm-2-8v10h4V16h-4Zm16.25-2h-14.25v4h14.25v-4Zm-2-6v8h4V8h-4Zm-12.25 2h14.25V6h-14.25v4Zm-2-12V8h4V-2h-4Z" mask="url(#flagpackGbNir2)"/></g></g><defs><clipPath id="flagpackGbNir3"><use href="#flagpackGbNir0"/></clipPath></defs></g>
    `,
	},
	elephant: {
		box_width: 48,
		svg: `<g><g><ellipse cx="25.5" cy="44" fill="#45413c" opacity=".15" rx="20.5" ry="1.5"></ellipse><path fill="#c0dceb" d="M34 10.3h-5l1.2-5.4c.3-1.2-.6-2.4-1.8-2.4-3.3 0-6.6.9-9.4 2.6h-8.4C5.8 5.1 2 8.9 2 13.6v15c0 4.2 3 7.6 7 8.3.8.1 1.5-.5 1.5-1.3v-1c0-.4-.2-.9-.6-1.1-1.6-.9-2.6-2.6-2.6-4.5v-1.7c0-.8.5-1.5 1.2-1.7l5.1-2 .1.4c.4 2.5 1.8 4.7 3.6 6.2.3.3.5.6.5 1v11.2c0 .7.6 1.3 1.3 1.3h5.2c.7 0 1.3-.6 1.3-1.3v-8.5c0-.7.6-1.3 1.3-1.3H38v9.8c0 .7.6 1.3 1.3 1.3h5.2c.7 0 1.3-.6 1.3-1.3V22c-.1-6.5-5.4-11.7-11.8-11.7z"></path><g><path fill="#daedf7" d="M10.6 8H19c2.8-1.7 6.1-2.6 9.4-2.6.7 0 1.2.3 1.5.8l.3-1.4c.3-1.2-.6-2.4-1.8-2.4-3.3 0-6.6.9-9.4 2.6h-8.4C5.8 5.1 2 8.9 2 13.6v2.9C2 11.8 5.8 8 10.6 8zM34 10.3h-5l-.7 2.9H34c6.5 0 11.7 5.2 11.7 11.7V22c0-6.5-5.3-11.7-11.7-11.7z"></path></g><path fill="none" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M34 10.3h-5l1.2-5.4c.3-1.2-.6-2.4-1.8-2.4-3.3 0-6.6.9-9.4 2.6h-8.4C5.8 5.1 2 8.9 2 13.6v15c0 4.2 3 7.6 7 8.3.8.1 1.5-.5 1.5-1.3v-1c0-.4-.2-.9-.6-1.1-1.6-.9-2.6-2.6-2.6-4.5v-1.7c0-.8.5-1.5 1.2-1.7l5.1-2 .1.4c.4 2.5 1.8 4.7 3.6 6.2.3.3.5.6.5 1v11.2c0 .7.6 1.3 1.3 1.3h5.2c.7 0 1.3-.6 1.3-1.3v-8.5c0-.7.6-1.3 1.3-1.3H38v9.8c0 .7.6 1.3 1.3 1.3h5.2c.7 0 1.3-.6 1.3-1.3V22c-.1-6.5-5.4-11.7-11.8-11.7z"></path><path fill="none" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M35.9 20.1c-1.2 3.2-.7 6.9 1.4 9.7.4.5.6 1.1.6 1.7v1M14.4 8.3l3-2.2c3.1-2.3 6.9-3.6 10.9-3.6 1.3 0 2.2 1.2 1.9 2.4l-2.5 11.5c-.5 2.2-2.4 3.8-4.7 3.8h-5.1c-1.9 0-3.4-1.5-3.4-3.4"></path><path fill="#fcd" d="M17.8 20.1h5.1c2.2 0 4.2-1.6 4.7-3.8L29.7 7c-.4-.4-.9-.6-1.4-.6-3.9 0-7.7 1.3-10.9 3.6l-3 2.2v4.4c0 1.9 1.5 3.5 3.4 3.5z"></path><path fill="#ffb0ca" d="M28.3 9.7c.3 0 .6.1.8.2l.6-2.9c-.4-.4-.9-.6-1.4-.6-3.9 0-7.7 1.3-10.9 3.6l-3 2.2v3.3l3-2.2c3.1-2.3 6.9-3.6 10.9-3.6z"></path><path fill="none" stroke="#45413c" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M17.8 20.1h5.1c2.2 0 4.2-1.6 4.7-3.8L29.7 7c-.4-.4-.9-.6-1.4-.6-3.9 0-7.7 1.3-10.9 3.6l-3 2.2v4.4c0 1.9 1.5 3.5 3.4 3.5zM2 20.7h2.6M2 23.3h2.6M2 25.9h2M13.5 23.4s3.2-1.2 2.9-3.7"></path><circle cx="7.9" cy="16.2" r="1.3" fill="#45413c" transform="rotate(-76.798 7.886 16.159)"></circle><path fill="#ffb0ca" d="M13.1 19.6c-.2.5-.9.9-1.6.7-.7-.1-1.1-.7-1-1.2.2-.5.9-.9 1.6-.7.7.2 1.1.7 1 1.2z"></path></g></g>`,
	},
	stripes: {
		box_width: 39,
		box_height: 27,
		svg: `<g fill-rule="evenodd"><path d="M13.898 0L0 26.554h8.023L20.339 0zM32.542 0L18.643 26.554h8.023L38.982 0z"/></g>`,
	},
	whatsapp: {
		box_width: 512,
		svg: `<path fill="currentColor" fill-rule="evenodd" d="M414.73 97.1A222.14 222.14 0 0 0 256.94 32C134 32 33.92 131.58 33.87 254a220.61 220.61 0 0 0 29.78 111L32 480l118.25-30.87a223.63 223.63 0 0 0 106.6 27h.09c122.93 0 223-99.59 223.06-222A220.18 220.18 0 0 0 414.73 97.1ZM256.94 438.66h-.08a185.75 185.75 0 0 1-94.36-25.72l-6.77-4l-70.17 18.32l18.73-68.09l-4.41-7A183.46 183.46 0 0 1 71.53 254c0-101.73 83.21-184.5 185.48-184.5a185 185 0 0 1 185.33 184.64c-.04 101.74-83.21 184.52-185.4 184.52Zm101.69-138.19c-5.57-2.78-33-16.2-38.08-18.05s-8.83-2.78-12.54 2.78s-14.4 18-17.65 21.75s-6.5 4.16-12.07 1.38s-23.54-8.63-44.83-27.53c-16.57-14.71-27.75-32.87-31-38.42s-.35-8.56 2.44-11.32c2.51-2.49 5.57-6.48 8.36-9.72s3.72-5.56 5.57-9.26s.93-6.94-.46-9.71s-12.54-30.08-17.18-41.19c-4.53-10.82-9.12-9.35-12.54-9.52c-3.25-.16-7-.2-10.69-.2a20.53 20.53 0 0 0-14.86 6.94c-5.11 5.56-19.51 19-19.51 46.28s20 53.68 22.76 57.38s39.3 59.73 95.21 83.76a323.11 323.11 0 0 0 31.78 11.68c13.35 4.22 25.5 3.63 35.1 2.2c10.71-1.59 33-13.42 37.63-26.38s4.64-24.06 3.25-26.37s-5.11-3.71-10.69-6.48Z"/>`,
	},
	facebook: {
		box_width: 15,
		svg: `<path fill="none" stroke="currentColor" d="M7.5 14.5a7 7 0 1 1 0-14a7 7 0 0 1 0 14Zm0 0v-8a2 2 0 0 1 2-2h.5m-5 4h5"/>`,
	},
	duration: {
		box_width: 24,
		svg: `<path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12h-8V4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Z"/>`,
	},
}
