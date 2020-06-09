/*
 * Update Picker
 */

// Function to update color displays
let updateColorDisplays = function (color) {
	color = hexToHsl(color, true);
	console.log(color);

	// Defining the box and dragger
	const boxContainer = document.getElementById("color_box");
	const boxDragger = document.getElementById("box_dragger");

	// Defining the slider and dragger
	const sliderContainer = document.getElementById("color_slider");
	const sliderDragger = document.getElementById("slider_dragger");

	let x, y;

	x = (224 / 100) * color.saturation + 14;
	y = 100 - ((color.lightness * 100) / color.saturation) * 2;
	console.log(y);
	// y = ((124 / 100) * y) + 14;

	boxDragger.attributes.x.nodeValue = x;
	boxDragger.attributes.y.nodeValue = y;
};

// Update the color value inputs
let updateColorValueInput = function () {
	// Checking the value color type the user has selected
	if (colorPicker.colorTypeStatus == "HEXA") {
		// Converting the value
		const hexValue = HSLAToRGBA(
			colorPicker.hue,
			colorPicker.saturation,
			colorPicker.lightness,
			colorPicker.alpha,
			true
		);

		// Applying the value to the input
		document.getElementById("hex_input").value = hexValue;
	} else if (colorPicker.colorTypeStatus == "RGBA") {
		// Converting the value
		const RGBAValue = HSLAToRGBA(
			colorPicker.hue,
			colorPicker.saturation,
			colorPicker.lightness,
			colorPicker.alpha
		);

		// Applying the value to the inputs
		document.getElementsByClassName("rgba_input")[0].value = RGBAValue.r;
		document.getElementsByClassName("rgba_input")[1].value = RGBAValue.g;
		document.getElementsByClassName("rgba_input")[2].value = RGBAValue.b;
		document.getElementsByClassName("rgba_input")[3].value = RGBAValue.a;
	} else {
		// Applying the value to the inputs
		document.getElementsByClassName("hsla_input")[0].value = colorPicker.hue;
		document.getElementsByClassName("hsla_input")[1].value = colorPicker.saturation;
		document.getElementsByClassName("hsla_input")[2].value = colorPicker.lightness;
		document.getElementsByClassName("hsla_input")[3].value = colorPicker.alpha;
	}
};
