/**
 * Custom Color Change Event
 */

// Custom color change event function
colorPickerComp.colorChange = function (color, elem) {
	// Defining the RGBA value conversion
	const rgbaValue = colorPickerComp.HSLAToRGBA(color.h, color.s, color.l, color.a);
	const hex = colorPickerComp.HSLAToRGBA(color.h, color.s, color.l, color.a, true);

	// Creating the event
	const event = new CustomEvent('colorChange', {
		// Adding the response details
		detail: {
			color: {
				hsl: `hsla(${color.h}, ${color.s}%, ${color.l}%)`,
				rgb: `rgba(${rgbaValue.r}, ${rgbaValue.g}, ${rgbaValue.b})`,
				hex: hex,
				hsla: `hsla(${color.h}, ${color.s}%, ${color.l}%, ${color.a})`,
				rgba: `rgba(${rgbaValue.r}, ${rgbaValue.g}, ${rgbaValue.b}, ${rgbaValue.a})`,
				hexa: hex
			}
		}
	});

	// Defining element
	const element = elem === undefined ? colorPickerComp.instance.element : elem;

	// Defining color

	// Changing color attributes
	element.setAttribute('data-color', hex);
	element.style.background = hex;

	// Dispatching the event for the active object
	element.dispatchEvent(event);
};
