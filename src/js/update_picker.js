/**
 * Update Picker
 */

// Function to update color displays
colorPickerComp.updateColorDisplays = function (color) {
	// Checking if color picker has not been set
	if (color == 'undefined') {
		// Setting the default color positioning of the player to red
		color = {
			h: 0,
			s: 100,
			l: 50,
			a: 1
		};
	} else {
		// Checking the color type that has been given
		if (color.substring(0, 1) == '#') {
			// Converting the color to HSLA
			color = colorPickerComp.hexAToRGBA(color, true);
		} else if (color.substring(0, 1) == 'r') {
			// Extracting the values
			const rgb = color.match(/[.?\d]+/g);

			// Making sure there is a alpha value
			rgb[3] = rgb[3] == undefined ? 1 : rgb[3];

			// Converting the color to HSLA
			color = colorPickerComp.RGBAToHSLA(rgb[0], rgb[1], rgb[2], rgb[3]);
		} else {
			// Extracting the values
			const hsl = color.match(/[.?\d]+/g);

			// Making sure there is a alpha value
			hsl[3] = hsl[3] == undefined ? 1 : hsl[3];

			// Formatting the value properly
			color = {
				h: hsl[0],
				s: hsl[1],
				l: hsl[2],
				a: hsl[3]
			};
		}
	}

	// Updating the data object
	colorPickerComp.hue = color.h;
	colorPickerComp.saturation = color.s;
	colorPickerComp.lightness = color.l;
	colorPickerComp.alpha = color.a;

	// Updating the input values
	colorPickerComp.updateColorValueInput();

	// Updating color preview and box hue color initially
	document
		.getElementById('color_picked_preview')
		.children[0].setAttribute('fill', `hsla(${color.h}, ${color.s}%, ${color.l}%, ${color.a}`);

	// Updating the Hue color in the Saturation and lightness box
	document
		.getElementById('saturation')
		.children[1].setAttribute('stop-color', `hsl(${color.h}, 100%, 50%)`);

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

	// Calculating x value
	let percentHue = 100 - (color.h / 359) * 100;
	let hueX = (266 / 100) * percentHue + 11;

	// Making changes the the UI
	hueSliderDragger.attributes.x.nodeValue = hueX;

	// Alpha slider config
	// Defining the opacity slider and dragger
	const alphaSliderDragger = document.getElementById('opacity_slider_dragger');

	// Calculating x value
	let alphaX = (266 / 100) * (color.a * 100) + 11;

	// Making changes the the UI
	alphaSliderDragger.attributes.x.nodeValue = alphaX;
};

// Update the color value inputs
colorPickerComp.updateColorValueInput = function () {
	// Checking the value color type the user has selected
	if (colorPickerComp.colorTypeStatus == 'HEXA') {
		// Converting the value
		const hexValue = colorPickerComp.HSLAToRGBA(
			colorPickerComp.hue,
			colorPickerComp.saturation,
			colorPickerComp.lightness,
			colorPickerComp.alpha,
			true
		);

		// Applying the value to the input
		document.getElementById('hex_input').value = hexValue;
	} else if (colorPickerComp.colorTypeStatus == 'RGBA') {
		// Converting the value
		const RGBAValue = colorPickerComp.HSLAToRGBA(
			colorPickerComp.hue,
			colorPickerComp.saturation,
			colorPickerComp.lightness,
			colorPickerComp.alpha
		);

		// Applying the value to the inputs
		document.getElementsByClassName('rgba_input')[0].value = RGBAValue.r;
		document.getElementsByClassName('rgba_input')[1].value = RGBAValue.g;
		document.getElementsByClassName('rgba_input')[2].value = RGBAValue.b;
		document.getElementsByClassName('rgba_input')[3].value = RGBAValue.a;
	} else {
		// Applying the value to the inputs
		document.getElementsByClassName('hsla_input')[0].value = colorPickerComp.hue;
		document.getElementsByClassName('hsla_input')[1].value = colorPickerComp.saturation;
		document.getElementsByClassName('hsla_input')[2].value = colorPickerComp.lightness;
		document.getElementsByClassName('hsla_input')[3].value = colorPickerComp.alpha;
	}
};
