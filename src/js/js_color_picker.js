/*!
 * Color picker
 * v1.0.0
 */

/*
 * Set-up
 */

// Color Picker data
let colorPicker = {
	boxStatus: false,
	sliderStatus: false,
	hue: 0,
	saturation: 100,
	lightness: 50,
	buttonElem: null,
	contextMenuElem: null
}

// Local storage variable
let LSCustomColors = {0: []};

// Function to open the color picker
let runColorPicker = function (event) {
	// Defining elements
	const target = event.target;
	const colorPicker = document.getElementById('color_picker');

	// Updating the color picker element
	colorPicker.style.left = target.getBoundingClientRect().left + 'px';
	colorPicker.style.top = target.getBoundingClientRect().top + target.offsetHeight + 5 + 'px';
	colorPicker.style.display = 'block';

	// Updating the data object
	colorPicker.buttonElem = target;
};

// Function to setup the color picker
(function () {
	console.log('dwqdqwd')
	// Looping through each declared color picker
	for (y in document.getElementsByClassName('color_picker')) {
		// Checking the value isnt a number
		if (isNaN(y) === true) {
			continue;
		}

		console.log(document.getElementsByClassName('color_picker')[y])

		// Assigning the button with a function to run the color picker
		document.getElementsByClassName('color_picker')[y].onclick = runColorPicker;

		// Getting the default data the user set
		let dataColor = document.getElementsByClassName('color_picker')[y].getAttribute('data-color');
		document.getElementsByClassName('color_picker')[y].style.background = dataColor;
	}

	// Creating the HTML content
	const HTMLContent = `
		<svg id="color_box" width="250" height="150">
			<defs>
				<linearGradient id="saturation" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stop-color="#fff"></stop>
					<stop offset="100%" stop-color="hsl(0,100%,50%)"></stop>
				</linearGradient>
				<linearGradient id="brightness" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stop-color="rgba(0,0,0,0)"></stop>
					<stop offset="100%" stop-color="#000"></stop>
				</linearGradient>
				<pattern id="pattern_config" width="100%" height="100%">
					<rect x="0" y="0" width="100%" height="100%" fill="url(#saturation)"></rect> }
					<rect x="0" y="0" width="100%" height="100%" fill="url(#brightness)"></rect>
				</pattern>
			</defs>
			<rect rx="5" ry="5" x="1" y="1" width="250" height="150" stroke="#fff" stroke-width="2" fill="url(#pattern_config)"></rect>
			<svg id="box_dragger" x="238" y="14" style="overflow: visible;">
				<circle r="9" fill="none" stroke="#000" stroke-width="2"></circle>
				<circle r="7" fill="none" stroke="#fff" stroke-width="2"></circle>
			</svg>
		</svg>
		<br>
		<svg id="color_picked_preview" width="30" height="30">
			<circle cx="15" cy="15" r="15" stroke="#a7a7a7" stroke-width="1"></circle>
		</svg>
		<svg id="color_slider" width="207" height="20">
			<defs>
				<linearGradient id="hue" x1="100%" y1="0%" x2="0%" y2="0%">
					<stop offset="0%" stop-color="#f00"></stop>
					<stop offset="16.666%" stop-color="#ff0"></stop>
					<stop offset="33.333%" stop-color="#0f0"></stop>
					<stop offset="50%" stop-color="#0ff"></stop>
					<stop offset="66.666%" stop-color="#00f"></stop>
					<stop offset="83.333%" stop-color="#f0f"></stop>
					<stop offset="100%" stop-color="#f00"></stop>
				</linearGradient>
			</defs>
			<rect rx="5" ry="5" x="1" y="1" width="201" height="20" stroke="#fff" stroke-width="2" fill="url(#hue)"></rect>
			<svg id="slider_dragger" x="11" y="11" style="overflow: visible;">
				<circle r="7" fill="none" stroke="#000" stroke-width="2"></circle>
				<circle r="5" fill="none" stroke="#fff" stroke-width="2"></circle>
			</svg>
		</svg>
		<div id="hex_box">
			<input id="hex_input" type="text" max="7" />
			<br>
			<label id="hex_text">HEX</label>
		</div>
		<div id="custom_colors">
			<h6 id="custom_colors_title">Custom Colors:</h6>
			<div id="custom_colors_box">
				<button id="custom_colors_add">+</button>
			</div>
		</div>
		<div id="color_context_menu" class="color_ctx_menu">
			<button id="color_clear_single" class="color_ctx_menu">Remove Color</button>
			<button id="color_clear_all" class="color_ctx_menu">Remove All</button>
		</div>
	`;

	// Creating a node to store the data HTML in
	const colorPickerContainer = document.createElement('ASIDE');
	colorPickerContainer.id = 'color_picker';
	colorPickerContainer.innerHTML = HTMLContent;
	document.getElementsByTagName('BODY')[0].appendChild(colorPickerContainer);

	// Checking if a local storage variable has been set
	if (localStorage.getItem('custom_colors') === null) {
		// If not then I set one
		localStorage.setItem('custom_colors', '{"0": []}');
	}
	else {
		// If it has then I define the LSCustomColors with the value for this
		LSCustomColors = JSON.parse(localStorage.getItem('custom_colors'));

		// Looping through the data to update the DOM with the custom colors
		for (let x = LSCustomColors[0].length - 1; x >= 0; x--) {
			// Creating the element
			let customColorElem = document.createElement('BUTTON');
			customColorElem.className = 'custom_colors_preview';
			customColorElem.style.background = LSCustomColors[0][x];
			customColorElem.setAttribute('data-color', LSCustomColors[0][x]);
			// Placing the element in the DOM
			document.getElementById('custom_colors_box').insertBefore(
				customColorElem,
				document.getElementById('custom_colors_box').children[0]
			);
		}
	}
})();

// Click anywhere to close a pop-up
document.addEventListener('mousedown', function () {
	// Close context menu
	if (event.target.id != 'color_context_menu') {
		document.getElementById('color_context_menu').style.display = 'none';
	}

	console.log(event.target.offsetParent)
	// Close color picker
	if (event.target.offsetParent != document.getElementById('color_picker') &&
		event.target.parentNode.tagName != 'svg' &&
		event.target.className != 'color_ctx_menu') {
		if (event.target.className != 'color_picker') {
			document.getElementById('color_picker').style.display = 'none';
		}
	}
});

/*
 * Color Value Converter
 */

// Function to convert HSL into HEX
let hslToHex = function (h, s, l) {
	let r, g, b, m, c, x

	if (!isFinite(h)) h = 0
	if (!isFinite(s)) s = 0
	if (!isFinite(l)) l = 0

	h /= 60
	if (h < 0) h = 6 - (-h % 6)
	h %= 6

	s = Math.max(0, Math.min(1, s / 100))
	l = Math.max(0, Math.min(1, l / 100))

	c = (1 - Math.abs((2 * l) - 1)) * s
	x = c * (1 - Math.abs((h % 2) - 1))

	if (h < 1) {
		r = c
		g = x
		b = 0
	}
	else if (h < 2) {
		r = x
		g = c
		b = 0
	}
	else if (h < 3) {
		r = 0
		g = c
		b = x
	}
	else if (h < 4) {
		r = 0
		g = x
		b = c
	}
	else if (h < 5) {
		r = x
		g = 0
		b = c
	}
	else {
		r = c
		g = 0
		b = x
	}

	m = l - c / 2
	r = Math.round((r + m) * 255)
	g = Math.round((g + m) * 255)
	b = Math.round((b + m) * 255)

	r = r.toString(16);
	r = r.length == 1 ? '0' + r : r;

	g = g.toString(16);
	g = g.length == 1 ? '0' + g : g;

	b = b.toString(16);
	b = b.length == 1 ? '0' + b : b;

	return "#" + r + g + b;
}

// Function to convert HEX into HSL
let hexToHsl = function (hex, format) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

	r = parseInt(result[1], 16);
	g = parseInt(result[2], 16);
	b = parseInt(result[3], 16);

	let r1 = r / 255;
	let g1 = g / 255;
	let b1 = b / 255;

	let maxColor = Math.max(r1,g1,b1);
	let minColor = Math.min(r1,g1,b1);

	let L = (maxColor + minColor) / 2 ;
	let S = 0;
	let H = 0;

	if (maxColor != minColor) {
		if (L < 0.5) {
			S = (maxColor - minColor) / (maxColor + minColor);
		}
		else {
			S = (maxColor - minColor) / (2.0 - maxColor - minColor);
		}

		if (r1 == maxColor) {
			H = (g1-b1) / (maxColor - minColor);
		}
		else if (g1 == maxColor) {
			H = 2.0 + (b1 - r1) / (maxColor - minColor);
		}
		else {
			H = 4.0 + (r1 - g1) / (maxColor - minColor);
		}
	}

	L = L * 100;
	S = S * 100;
	H = H * 60;

	if (H < 0) {
		H += 360;
	}

	if (format == true) {
		return {
			hue: H,
			saturation: S,
			lightness: L
		}
	}
	else {
		return `hsl(${H}, ${S}%, ${L}%)`;
	}
}

/*
 * Hue, Saturation and Lightness Box
 */

// Function to handle changes to the saturation and lightness box
let colorBoxHandler = function (positionX, positionY) {
	// Defining the box and dragger
	const boxContainer = document.getElementById('color_box');
	const boxDragger = document.getElementById('box_dragger');

	// Defining X and Y position
	let eventX = positionX - boxContainer.getBoundingClientRect().left;
	let eventY = positionY - boxContainer.getBoundingClientRect().top;

	// Making conditions so that the user dont drag outside the box
	if (eventX < 14) {
		eventX = 14;
	}

	if (eventX > 238) {
		eventX = 238;
	}

	if (eventY < 14) {
		eventY = 14;
	}

	if (eventY > 138) {
		eventY = 138;
	}

	// Changes X and Y properties of the dragger
	boxDragger.attributes.y.nodeValue = eventY;
	boxDragger.attributes.x.nodeValue = eventX;

	// Calculating the Saturation Percent value
	// SPercent is just the percent of where the dragger is on the X axis
	// 224 is the max number of pixels the dragger can move
	const SPercent = Math.round(((eventX - 15) / 224) * 100);

	// Calculating the X and Y Percent Values
	const percentX = 100 - (SPercent / 2);
	const percentY = 100 - (((eventY - 15) / 124) * 100);

	// Calculating the LPercent
	// LPercent is the the X percentage of the of the Y percentage of the dragger
	const LPercent = Math.round((percentY / 100) * percentX);

	// Applying the Saturation and Lightnesss to the data object
	colorPicker.saturation = SPercent;
	colorPicker.lightness = LPercent;

	// Full HSL color
	const HSL = `hsl(${colorPicker.hue}, ${SPercent}%, ${LPercent}%)`;
document.getElementsByClassName('color_picker')[0].innerHTML = HSL;

	// Applying the equivilant HEX value to the input
	let hexValue = hslToHex(colorPicker.hue, SPercent, LPercent);
	document.getElementById('hex_input').value = hexValue;

	// Applying the color to the color preview
	document.getElementById('color_picked_preview').children[0].setAttribute('fill', HSL);
}

// Start box drag listener
document.getElementById('color_box').addEventListener('mousedown', function (event) {
	// Updating the status in the data object
	colorPicker.boxStatus = true;
	// Calling handler function
	colorBoxHandler(event.pageX, event.pageY);
});

// Moving box drag listener
document.addEventListener('mousemove', function (event) {
	// Checking that the drag has started
	if (colorPicker.boxStatus === true) {
	// Calling handler function
		colorBoxHandler(event.pageX, event.pageY);
	}
});

// End box drag listener
document.addEventListener('mouseup', function (event) {
	// Checking that the drag has started
	if (colorPicker.boxStatus === true) {
		// Updating the status in the data object
		colorPicker.boxStatus = false;
	}
});

// Function to handle changes to the HUE slider
let colorSliderHandler = function (position) {
	// Defining the slider and dragger
	const sliderContainer = document.getElementById('color_slider');
	const sliderDragger = document.getElementById('slider_dragger');

	// Defining the X position
	let eventX = position - sliderContainer.getBoundingClientRect().left;

	// Making conditions so that the user dont drag outside the box
	if (eventX < 11) {
		eventX = 11;
	}

	if (eventX > 192) {
		eventX = 192;
	}

	// Updating the X property of the dragger
	sliderDragger.attributes.x.nodeValue = eventX;

	// Percentage of the dragger on the X axis
	const percent = ((eventX - 11) / 181) * 100;
	// Calculating the color
	// Max number for hue colors is 359, I find the percentage of that, taken from the percent variable
	// I take it away from the max number because the slider should work backwards
	const HColor = Math.round(359 - (359 / 100) * percent);

	// Updating the Hue value in the data object
	colorPicker.hue = HColor;

	// Full HSL color
	const HSL = `hsl(${HColor}, ${colorPicker.saturation}%, ${colorPicker.lightness}%)`;

	// Applying the equivilant HEX value to the input
	let hexValue = hslToHex(HColor, colorPicker.saturation, colorPicker.lightness);
	document.getElementById('hex_input').value = hexValue;

	// Updating the color for the color preview
	document.getElementById('color_picked_preview').children[0].setAttribute('fill', HSL);

	// Updating the Hue color in the Saturation and lightness box
	document.getElementById('saturation').children[1].attributes[1].nodeValue = `hsl(${HColor}, 100%, 50%)`;
}

// Start the slider drag
document.getElementById('color_slider').addEventListener('mousedown', function (event) {
	// Updating the status in the data object
	colorPicker.sliderStatus = true;
	// Calling handler function
	colorSliderHandler(event.pageX);
});

// Moving the slider drag
document.addEventListener('mousemove', function (event) {
	// Checking that the drag has started
	if (colorPicker.sliderStatus === true) {
		// Calling handler function
		colorSliderHandler(event.pageX);
	}
});

// End the slider drag
document.addEventListener('mouseup', function () {
	// Checking that the drag has started
	if (colorPicker.sliderStatus === true) {
		// Updating the status in the data object
		colorPicker.sliderStatus = false;
	}
});

// Function to update color displays
let updateColorDisplays = function (color) {
	color = hexToHsl(color, true);
	console.log(color)

	// Defining the box and dragger
	const boxContainer = document.getElementById('color_box');
	const boxDragger = document.getElementById('box_dragger');

	// Defining the slider and dragger
	const sliderContainer = document.getElementById('color_slider');
	const sliderDragger = document.getElementById('slider_dragger');

	let x, y;

	x = (224 / 100) * color.saturation + 14;
	y = 100 - ((color.lightness * 100) / color.saturation * 2);
	console.log(y)
	// y = ((124 / 100) * y) + 14;

	boxDragger.attributes.x.nodeValue = x;
	boxDragger.attributes.y.nodeValue = y;

}

/*
 * HEX Value Handlers
 */

document.getElementById('hex_input').addEventListener('blur', function () {
	console.log('leave')
});

/*
 * Custom Colors
 */

// Function to add a new custom color
let addCustomColor = function () {
	// Getting the color
	const color = `hsl(${colorPicker.hue}, ${colorPicker.saturation}%, ${colorPicker.lightness}%)`;

	// Creating the element
	let customColorElem = document.createElement('BUTTON');
	customColorElem.className = 'custom_colors_preview';
	customColorElem.style.background = color;
	customColorElem.setAttribute('data-color', color);
	// Placing the element in the DOM
	document.getElementById('custom_colors_box').insertBefore(
		customColorElem,
		document.getElementById('custom_colors_box').children[0]
	);

	// Pushing the color to the top of the array
	LSCustomColors[0].unshift(color);

	// Updating the local storage with the new custom color
	localStorage.setItem('custom_colors', JSON.stringify(LSCustomColors));
}
document.getElementById('custom_colors_add').addEventListener('click', function () {addCustomColor()});

// Event to fire for a context menu
document.getElementById('custom_colors_box').addEventListener('contextmenu', function (event) {
	// Making sure the users has selected a color preview
	if (event.target.className == 'custom_colors_preview') {
		// Preventing default
		event.preventDefault();

		// Defining the context menu
		const contextMenu = document.getElementById('color_context_menu');

		// Updating the styling of the menu
		contextMenu.style.display = 'block';
		contextMenu.style.top = event.target.getBoundingClientRect().top + 25 + 'px';
		contextMenu.style.left = event.target.getBoundingClientRect().left + 'px';

		// Defining the color selected
		colorPicker.contextMenuElem = event.target;
	}
});

// Clears a selected custom color
let clearSingleCustomColor = function () {
	console.log('wef')
	// Removing the element
	document.getElementById('custom_colors_box').removeChild(colorPicker.contextMenuElem);

	// Clearing the variable
	LSCustomColors = {"0": []};

	// Looping through the custom colors to repopulate the variable
	for (x in 	document.getElementsByClassName('custom_colors_preview')) {
		// Continuing if its a number
		if (isNaN(x) === true) {
			continue;
		}

		// Pushing the colors to the array
		LSCustomColors[0].push(document.getElementsByClassName('custom_colors_preview')[x].getAttribute('data-color'));
	}

	// Updating the local storage
	localStorage.setItem('custom_colors', JSON.stringify(LSCustomColors));
}
document.getElementById('color_clear_single').addEventListener('mousedown', function () {clearSingleCustomColor()});

// Clears all custom colors
let clearAllCustomColors = function () {
	// Clearing variable
	LSCustomColors = {"0": []};

	// Looping through the custom colors to repopulate the variable
	while (document.getElementsByClassName('custom_colors_preview').length > 0) {
		document.getElementById('custom_colors_box').removeChild(document.getElementsByClassName('custom_colors_preview')[0]);
	}

	// Updating the local storage
	localStorage.setItem('custom_colors', JSON.stringify(LSCustomColors));
}
document.getElementById('color_clear_all').addEventListener('mousedown', function () {clearAllCustomColors()});
