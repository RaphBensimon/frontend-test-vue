var hexToHsl = require('hex-to-hsl')
const setRgbaColors = () => {
	const root = document.querySelector(':root')
	const colorNames = ['primary']
	colorNames.forEach(e => {
		const hexColor = getComputedStyle(root).getPropertyValue('--' + e).replace(' ', '')
		const [h, s, l] = hexToHsl(hexColor)
		console.log(h,s,l)
		root.style.setProperty(`--${e}-light`, `hsla(${h-10},${s+10}%,${l}%, 1)`)
	})
}
export default setRgbaColors