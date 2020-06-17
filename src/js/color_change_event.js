/*
 * Custom Color Change Event
 */

// Custom color change event function
function colorChange(color) {
	// Creating the event
	const event = new CustomEvent('colorChange', {
		// Adding the response details
		detail: {
			color: color
		}
	});

	// Dispatching the event for the active object
	colorPicker.instance.element.dispatchEvent(event);
}
