/*
 * Custom Color Change Event
 */

// Custom color change event function
function colorChange(color, elem) {
	console.log(color);
	// Defining the RGBA value conversion
	let rgbaValue = HSLAToRGBA(color.h, color.s, color.l, color.a);

	// Creating the event
	const event = new CustomEvent('colorChange', {
		// Adding the response details
		detail: {
			color: {
				hsla: `hsla(${color.h}, ${color.s}%, ${color.l}%, ${color.a})`,
				rgba: `rgba(${rgbaValue.r}, ${rgbaValue.g}, ${rgbaValue.b}, ${rgbaValue.a})`,
				hexa: HSLAToRGBA(color.h, color.s, color.l, color.a, true)
			}
		}
	});

	// Defining element
	const element = elem === undefined ? colorPicker.instance.element : elem;

	// Changing color attributes
	element.setAttribute('data-color', color);
	element.style.background = color;

	// Dispatching the event for the active object
	element.dispatchEvent(event);
}
