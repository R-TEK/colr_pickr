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
