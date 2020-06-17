/*
 * Custom Color Change Event
 */

// Custom color change event function
function colorChange(color, elem) {
	// Creating the event
	const event = new CustomEvent('colorChange', {
		// Adding the response details
		detail: {
			color: color
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
