/*
 * Opacity Slider
 */

// Function to handle changes to the opacity slider
let opacitySliderHandler = function (position) {
	// Defining the slider and dragger
	const sliderContainer = document.getElementById('opacity_slider');
	const sliderDragger = document.getElementById('opacity_slider_dragger');

	// Defining the X position
	let eventX = position - sliderContainer.getBoundingClientRect().left;

	// Making conditions so that the user don't drag outside the box
	if (eventX < 11) {
		eventX = 11;
	}

	if (eventX > 277) {
		eventX = 277;
	}

	// Update the X property of the dragger
	sliderDragger.attributes.x.nodeValue = eventX;

	// Percentage of the dragger on the X axis
	const percent = ((eventX - 11) / 266) * 100;

	// Finding the value for the percentage of 1
	let alpha = (1 / 100) * percent;
	// Rounding the value to the nearest 2 decimals
	alpha = Number(Math.round(alpha + 'e' + 2) + 'e-' + 2);

	// Updating the data objects
	colorPicker.alpha = alpha;

	// Full HSLA color
	const HSLA = `hsla(${colorPicker.hue}, ${colorPicker.saturation}%, ${colorPicker.lightness}%, ${alpha})`;

	// Updating the color for the color preview
	document.getElementById('color_picked_preview').children[0].setAttribute('fill', HSLA);

	// Update the color text values
	updateColorValueInput();
};

/*
 * Mouse Events
 */

// Start the slider drag for opacity
document.getElementById('opacity_slider').addEventListener('mousedown', function (event) {
	// Updating the status in the data object
	colorPicker.opacityStatus = true;
	// Calling the handler function
	opacitySliderHandler(event.pageX);
});

// Moving the slider drag for opacity
document.addEventListener('mousemove', function (event) {
	// Checking that the drag has started
	if (colorPicker.opacityStatus === true) {
		// Calling the handler function
		opacitySliderHandler(event.pageX);
	}
});

// End the slider drag
document.addEventListener('mouseup', function () {
	// Checking that the drag has started
	if (colorPicker.opacityStatus === true) {
		// Updating the status in the data object
		colorPicker.opacityStatus = false;
	}
});

/*
 * Touch Events
 */

// Start the slider drag on touch
document.getElementById('opacity_slider').addEventListener(
	'touchstart',
	function (event) {
		// Updating the status
		colorPicker.opacityStatusTouch = true;
		// Calling the handler function
		opacitySliderHandler(event.changedTouches[0].clientX);
	},
	{ passive: true }
);

// Moving the slider drag on touch
document.addEventListener(
	'touchmove',
	function () {
		// Checking that the touch drag has started
		if (colorPicker.opacityStatusTouch === true) {
			// Prevent page scrolling
			event.preventDefault();
			// Calling the handler function
			opacitySliderHandler(event.changedTouches[0].clientX);
		}
	},
	{ passive: false }
);

// End the slider drag on touch
document.addEventListener('touchend', function () {
	// Checking that the touch drag has started
	if (colorPicker.opacityStatusTouch === true) {
		// Updating the status
		colorPicker.opacityStatusTouch = false;
	}
});
