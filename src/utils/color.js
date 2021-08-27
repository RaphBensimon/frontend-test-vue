var hexToHsl = require('hex-to-hsl')
const setRgbaColors = () => {
	const root = document.querySelector(':root')
	const colorNames = ['primary']
	colorNames.forEach(e => {
		const hexColor = getComputedStyle(root).getPropertyValue('--' + e).replace(' ', '')
		const [h, s, l] = hexToHsl(hexColor)
		root.style.setProperty(`--${e}-light`, `hsla(${h-10},${s+10}%,${l}%, 1)`)

		const [r, g, b] = hexColor.match(/\w\w/g).map(x => parseInt(x, 16))
		root.style.setProperty(`--${e}-opacity-25`, `rgba(${r},${g},${b}, 0.25)`)
	})
}
export default setRgbaColors