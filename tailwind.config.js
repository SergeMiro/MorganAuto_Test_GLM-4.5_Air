/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./catalogue.html",
		"./admin.html",
		"./blog.html",
		"./**/*.html",
	],
	theme: {
		extend: {
			colors: {
				primary: "#1a1a1a",
				secondary: "#ff6b35",
				lightGray: "#f5f5f5",
				text: "#333",
			},
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif'],
			},
			animation: {
				'rain-fall': 'rain-fall linear infinite',
			},
			keyframes: {
				'rain-fall': {
					'0%': {
						transform: 'translateY(-100px) rotateX(0deg) rotateY(0deg)',
						opacity: '0',
					},
					'10%': {
						opacity: '1',
					},
					'90%': {
						opacity: '1',
					},
					'100%': {
						transform: 'translateY(calc(100vh + 100px)) rotateX(360deg) rotateY(360deg)',
						opacity: '0',
					},
				},
			},
		},
	},
	plugins: [],
}