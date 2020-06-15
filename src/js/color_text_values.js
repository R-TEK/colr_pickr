/*
 * Color Text Values
 */

// Function to switch the color type inputs
let switchColorType = function () {
	// Checking the current selected input color type
	if (colorPicker.colorTypeStatus == 'HEXA') {
		// Updating the data object
		colorPicker.colorTypeStatus = 'RGBA';

		// Displaying the correct elements
		document.getElementById('hexa').style.display = 'none';
		document.getElementById('rgba').style.display = 'block';

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
	} else if (colorPicker.colorTypeStatus == 'RGBA') {
		// Updating the data object
		colorPicker.colorTypeStatus = 'HSLA';

		// Displaying the correct elements
		document.getElementById('rgba').style.display = 'none';
		document.getElementById('hsla').style.display = 'block';

		// Applying the value to the inputs
		document.getElementsByClassName('hsla_input')[0].value = colorPicker.hue;
		document.getElementsByClassName('hsla_input')[1].value = colorPicker.saturation;
		document.getElementsByClassName('hsla_input')[2].value = colorPicker.lightness;
		document.getElementsByClassName('hsla_input')[3].value = colorPicker.alpha;
	} else if (colorPicker.colorTypeStatus == 'HSLA') {
		// Updating the data object
		colorPicker.colorTypeStatus = 'HEXA';

		// Displaying the correct elements
		document.getElementById('hsla').style.display = 'none';
		document.getElementById('hexa').style.display = 'block';

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
	}
};
document.getElementById('switch_color_type').addEventListener('click', function () {
	switchColorType();
});

// TODO: Make Comments for the below

document.getElementById('hex_input').addEventListener('blur', function (event) {
	// TODO: Find a HEXA Regex
});

document.querySelectorAll('.rgba_input').forEach((element) => {
	element.addEventListener('change', function () {
		const rgbaInput = document.querySelectorAll('.rgba_input');

		if (rgbaInput[0].value > 255) throw 'Value must be below 256';
		if (rgbaInput[1].value > 255) throw 'Value must be below 256';
		if (rgbaInput[2].value > 255) throw 'Value must be below 256';
		if (rgbaInput[3].value > 1) throw 'Value must be equal to or below 1';

		updateColorDisplays(
			`rgba(${rgbaInput[0].value}, ${rgbaInput[1].value}, ${rgbaInput[2].value}, ${rgbaInput[3].value})`
		);
	});
});

document.querySelectorAll('.hsla_input').forEach((element) => {
	element.addEventListener('change', function () {
		const hslaInput = document.querySelectorAll('.hsla_input');

		if (hslaInput[0].value > 359) throw 'Value must be below 360';
		if (hslaInput[1].value > 100) throw 'Value must be below 100';
		if (hslaInput[2].value > 100) throw 'Value must be below 100';
		if (hslaInput[3].value > 1) throw 'Value must be equal to or below 1';

		updateColorDisplays(
			`rgba(${hslaInput[0].value}, ${hslaInput[1].value}%, ${hslaInput[2].value}%, ${hslaInput[3].value})`
		);
	});
});
