/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
		'./node_modules/@shadcn/ui/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			container: {
				center: true, // Centers the container horizontally
				padding: '2rem', // Adds padding on the sides
				screens: {
					sm: '100%', // Full width on small screens
					md: '100%', // Full width on medium screens
					lg: '100%', // Full width on large screens
					xl: '100%', // Full width on extra-large screens
					'2xl': '100%', // Full width on 2xl screens
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			colors: {},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
