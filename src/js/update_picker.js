/*
 * Update Picker
 */

// Function to update color displays
let updateColorDisplays = function (color) {
	// TODO: check what type of value I get from color, then do the correct conversions
	// TODO: Change hue colors for the color box

	color = hexAToRGBA(color, true);

	// Color box (saturation and lightness) config
	// Defining the box and dragger
	const boxDragger = document.getElementById('box_dragger');

	let x, y;

	// Calculating y value
	const percentY = 100 - (color.l / (100 - color.s / 2)) * 100;
	y = (159 / 100) * percentY + 14;

	// Calculating x value
	x = (322 / 100) * color.s + 14;

	// Making changes the the UI
	boxDragger.attributes.x.nodeValue = x;
	boxDragger.attributes.y.nodeValue = y;

	// Hue slider config
	// Defining the hue slider and dragger
	const hueSliderDragger = document.getElementById('color_slider_dragger');

	let percentHue = 100 - (color.h / 359) * 100;
	let hueX = (266 / 100) * percentHue + 11;

	hueSliderDragger.attributes.x.nodeValue = hueX;

	// Alpha slider config
	// Defining the opacity slider and dragger
	const alphaSliderDragger = document.getElementById('opacity_slider_dragger');

	let alphaX = (266 / 100) * (color.a * 100) + 11;

	alphaSliderDragger.attributes.x.nodeValue = alphaX;
};

// Update the color value inputs
let updateColorValueInput = function () {
	// Checking the value color type the user has selected
	if (colorPicker.colorTypeStatus == 'HEXA') {
		// Converting the value
		const hexValue = HSLAToRGBA(
			colorPicker.hue,
			colorPicker.saturation,
			colorPicker.lightness,
			colorPicker.alpha,
			true
		);

		// Applying the value to the input
		document.getElementById('hex_input').value = hexValue;
	} else if (colorPicker.colorTypeStatus == 'RGBA') {
		// Converting the value
		const RGBAValue = HSLAToRGBA(
			colorPicker.hue,
			colorPicker.saturation,
			colorPicker.lightness,
			colorPicker.alpha
		);

		// Applying the value to the inputs
		document.getElementsByClassName('rgba_input')[0].value = RGBAValue.r;
		document.getElementsByClassName('rgba_input')[1].value = RGBAValue.g;
		document.getElementsByClassName('rgba_input')[2].value = RGBAValue.b;
		document.getElementsByClassName('rgba_input')[3].value = RGBAValue.a;
	} else {
		// Applying the value to the inputs
		document.getElementsByClassName('hsla_input')[0].value = colorPicker.hue;
		document.getElementsByClassName('hsla_input')[1].value = colorPicker.saturation;
		document.getElementsByClassName('hsla_input')[2].value = colorPicker.lightness;
		document.getElementsByClassName('hsla_input')[3].value = colorPicker.alpha;
	}
};
