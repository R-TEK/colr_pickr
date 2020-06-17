/*!
 * JS Color Picker
 *
 * R-TEK
 *
 * https://github.com/R-TEK/js_color_picker
 *
 * MIT License
 */

/*
 * Set-up
 */

/**
 * All global states and variables needed for reference over the entire project
 *
 * @type {{instance: object | null, boxStatus: boolean, boxStatusTouch: boolean, sliderStatus: boolean, sliderStatusTouch: boolean, opacityStatus: boolean, opacityStatusTouch: boolean, colorTypeStatus: string, hue: number, saturation: number, lightness: number, alpha: number, contextMenuElem: HTMLElement | null, doubleTapTime: number}}
 */
let colorPicker = {
	instance: null,
	boxStatus: false,
	boxStatusTouch: false,
	sliderStatus: false,
	sliderStatusTouch: false,
	opacityStatus: false,
	opacityStatusTouch: false,
	colorTypeStatus: 'HEXA',
	hue: 0,
	saturation: 100,
	lightness: 50,
	alpha: 1,
	contextMenuElem: null,
	doubleTapTime: 0
};

/**
 * Custom colors saved to local storage
 *
 * @type {{0: Array}}
 */
let LSCustomColors = { 0: [] };

// Constructor
function ColorPicker(element, color) {
	// Adding the element to the instance
	this.element = element;

	// Adding the object to the elements object
	element.colorPickerObj = this;

	// Setting color value as a data attribute and changing elements color if color param is given
	element.setAttribute('data-color', color);
	element.style.background = color;

	// Click listener to have the button open the color picker interface
	element.addEventListener('click', function (event) {
		// Applying the items instance to the color picker object
		colorPicker.instance = event.target.colorPickerObj;

		// Displaying the color picker
		document.getElementById('color_picker').style.display = 'block';
		document.getElementById('color_picker_bg').style.display = 'block';

		// Updating the color picker
		if (event.target.getAttribute('data-color') != 'undefined')
			updateColorDisplays(event.target.getAttribute('data-color'));
	});
}

// Function to setup the color picker
(function () {
	// Creating the HTML content
	const HTMLContent = `
		<svg id="color_box" width="348" height="185">
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
			<rect rx="5" ry="5" x="1" y="1" width="348" height="185" stroke="#fff" stroke-width="2" fill="url(#pattern_config)"></rect>
			<svg id="box_dragger" x="336" y="14" style="overflow: visible;">
				<circle r="9" fill="none" stroke="#000" stroke-width="2"></circle>
				<circle r="7" fill="none" stroke="#fff" stroke-width="2"></circle>
			</svg>
		</svg>
		<br>
		<svg id="color_picked_preview" width="40" height="50">
			<circle cx="20" cy="29" r="18" stroke="#a7a7a7" stroke-width="1"></circle>
		</svg>
		<div id="sliders">
			<svg id="color_slider" width="285" height="20">
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
				<rect rx="5" ry="5" x="1" y="1" width="285" height="20" stroke="#fff" stroke-width="2" fill="url(#hue)"></rect>
				<svg id="color_slider_dragger" x="277" y="11" style="overflow: visible;">
					<circle r="7" fill="none" stroke="#000" stroke-width="2"></circle>
					<circle r="5" fill="none" stroke="#fff" stroke-width="2"></circle>
				</svg>
			</svg>
			<svg id="opacity_slider" width="285" height="20">
				<defs>
					<linearGradient id="opacity" x1="100%" y1="0%" x2="0%" y2="0%">
						<stop offset="0%" stop-color="#000"></stop>
						<stop offset="100%" stop-color="#fff"></stop>
					</linearGradient>
				</defs>
				<rect rx="5" ry="5" x="1" y="6" width="285" height="10" stroke="#fff" stroke-width="2" fill="url(#opacity)"></rect>
				<svg id="opacity_slider_dragger" x="277" y="11" style="overflow: visible;">
					<circle r="7" fill="none" stroke="#000" stroke-width="2"></circle>
					<circle r="5" fill="none" stroke="#fff" stroke-width="2"></circle>
				</svg>
			</svg>
		</div>
		<div id="color_text_values">
			<button id="switch_color_type">
				<svg viewBox="0 0 24 24" width="20" height="20">
					<path fill="#555" d="M6 11v-4l-6 5 6 5v-4h12v4l6-5-6-5v4z"/>
				</svg>
			</button>
			<div id="hexa">
				<input id="hex_input" name="hex_input" type="text" maxlength="9" spellcheck="false" />
				<br>
				<label for="hex_input" class="label_text">HEX</label>
			</div>
			<div id="rgba" style="display: none;">
				<div class="rgba_divider">
					<input class="rgba_input" name="r" type="number" min="0" max="255" />
					<br>
					<label for="r" class="label_text">R</label>
				</div>
				<div class="rgba_divider">
					<input class="rgba_input" name="g" type="number" min="0" max="255" />
					<br>
					<label for="g" class="label_text">G</label>
				</div>
				<div class="rgba_divider">
					<input class="rgba_input" name="b" type="number" min="0" max="255" />
					<br>
					<label for="b" class="label_text">B</label>
				</div>
				<div class="rgba_divider">
					<input class="rgba_input" name="a" type="number" step="0.1" min="0" max="1" />
					<br>
					<label for="a" class="label_text">A</label>
				</div>
			</div>
			<div id="hsla" style="display: none;">
				<div class="hsla_divider">
					<input class="hsla_input" name="h" type="number" min="0" max="359" />
					<br>
					<label for="h" class="label_text">H</label>
				</div>
				<div class="hsla_divider">
					<input class="hsla_input" name="s" type="number" min="0" max="100" />
					<br>
					<label for="s" class="label_text">S%</label>
				</div>
				<div class="hsla_divider">
					<input class="hsla_input" name="l" type="number" min="0" max="100" />
					<br>
					<label for="l" class="label_text">L%</label>
				</div>
				<div class="rgba_divider">
					<input class="hsla_input" name="a" type="number" step="0.1" min="0" max="1" />
					<br>
					<label for="a" class="label_text">A</label>
				</div>
			</div>
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

	// Creating a darken background node
	const colorPickerBackground = document.createElement('DIV');
	colorPickerBackground.id = 'color_picker_bg';
	document.getElementsByTagName('BODY')[0].appendChild(colorPickerBackground);

	// Checking if a local storage variable has been set
	if (localStorage.getItem('custom_colors') === null) {
		// If not then I set one
		localStorage.setItem('custom_colors', '{"0": []}');
	} else {
		// If it has then I define the LSCustomColors with the value for this
		LSCustomColors = JSON.parse(localStorage.getItem('custom_colors'));

		// Looping through the data to update the DOM with the custom colors
		for (let x = LSCustomColors[0].length - 1; x >= 0; x--) {
			// Creating the element
			let customColorElem = document.createElement('BUTTON');
			customColorElem.className = 'custom_colors_preview';
			customColorElem.style.background = LSCustomColors[0][x];
			customColorElem.setAttribute('data-custom-color', LSCustomColors[0][x]);
			// Placing the element in the DOM
			document
				.getElementById('custom_colors_box')
				.insertBefore(
					customColorElem,
					document.getElementById('custom_colors_box').children[0]
				);
		}

		// Check whether to display the add color button
		if (LSCustomColors[0].length == 28)
			document.getElementById('custom_colors_add').style.display = 'none';
	}
})();

// Click anywhere to close a pop-up
document.addEventListener('mousedown', function () {
	// Close context menu
	if (event.target.id != 'color_context_menu') {
		document.getElementById('color_context_menu').style.display = 'none';
	}
});

// Click the darken background to close the color picker
document.getElementById('color_picker_bg').addEventListener('click', function () {
	// Hiding elements
	document.getElementById('color_picker').style.display = 'none';
	document.getElementById('color_picker_bg').style.display = 'none';

	// Making changes to the active button
	const activeButton = colorPicker.instance.element;

	// Changing color attributes
	activeButton.setAttribute(
		'data-color',
		`hsl(${colorPicker.hue}, ${colorPicker.saturation}%, ${colorPicker.lightness}%, ${colorPicker.alpha})`
	);
	activeButton.style.background = `hsl(${colorPicker.hue}, ${colorPicker.saturation}%, ${colorPicker.lightness}%, ${colorPicker.alpha})`;

	// Call the colorChange event for any listeners
	colorChange(
		`hsl(${colorPicker.hue}, ${colorPicker.saturation}%, ${colorPicker.lightness}%, ${colorPicker.alpha})`
	);
});

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

/*
 * Color Value Converter
 */

// Convert HSLA to RGBA
let HSLAToRGBA = function (h, s, l, a, toHex) {
	s /= 100;
	l /= 100;

	let c = (1 - Math.abs(2 * l - 1)) * s,
		x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
		m = l - c / 2,
		r = 0,
		g = 0,
		b = 0;

	if (0 <= h && h < 60) {
		r = c;
		g = x;
		b = 0;
	} else if (60 <= h && h < 120) {
		r = x;
		g = c;
		b = 0;
	} else if (120 <= h && h < 180) {
		r = 0;
		g = c;
		b = x;
	} else if (180 <= h && h < 240) {
		r = 0;
		g = x;
		b = c;
	} else if (240 <= h && h < 300) {
		r = x;
		g = 0;
		b = c;
	} else if (300 <= h && h < 360) {
		r = c;
		g = 0;
		b = x;
	}

	r = Math.round((r + m) * 255);
	g = Math.round((g + m) * 255);
	b = Math.round((b + m) * 255);

	if (toHex === true) {
		return RGBAToHexA(r, g, b, a);
	} else {
		return {
			r: r,
			g: g,
			b: b,
			a: a
		};
	}
};

// Convert RGBA to HSLA
let RGBAToHSLA = function (r, g, b, a) {
	r /= 255;
	g /= 255;
	b /= 255;
	a = a == undefined ? 1 : a;

	let cmin = Math.min(r, g, b),
		cmax = Math.max(r, g, b),
		delta = cmax - cmin,
		h = 0,
		s = 0,
		l = 0;

	if (delta == 0) h = 0;
	else if (cmax == r) h = ((g - b) / delta) % 6;
	else if (cmax == g) h = (b - r) / delta + 2;
	else h = (r - g) / delta + 4;

	h = Math.round(h * 60);

	if (h < 0) h += 360;

	l = (cmax + cmin) / 2;

	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);

	console.log(h, s, l, a);

	return {
		h: h,
		s: s,
		l: l,
		a: a
	};
};

// Convert RGBA to HexA
let RGBAToHexA = function (r, g, b, a) {
	r = r.toString(16);
	g = g.toString(16);
	b = b.toString(16);
	a = Math.round(a * 255).toString(16);

	if (r.length == 1) r = '0' + r;
	if (g.length == 1) g = '0' + g;
	if (b.length == 1) b = '0' + b;
	if (a.length == 1) a = '0' + a;

	if (a == 'ff') {
		return '#' + r + g + b;
	} else {
		return '#' + r + g + b + a;
	}
};

// Convert HexA to RGBA
let hexAToRGBA = function (h, toHSL) {
	if (h.length == 7) h += 'ff';
	else if (h.length == 4) h += h.substring(1, 4) + 'ff';

	let r = 0,
		g = 0,
		b = 0,
		a = 1;

	if (h.length == 5) {
		r = '0x' + h[1] + h[1];
		g = '0x' + h[2] + h[2];
		b = '0x' + h[3] + h[3];
		a = '0x' + h[4] + h[4];
	} else if (h.length == 9) {
		r = '0x' + h[1] + h[2];
		g = '0x' + h[3] + h[4];
		b = '0x' + h[5] + h[6];
		a = '0x' + h[7] + h[8];
	}

	a = +(a / 255).toFixed(3);

	if (toHSL === true) {
		console.log(+r, +g, +b, +a + ' - run');
		return RGBAToHSLA(+r, +g, +b, a);
	} else {
		return 'rgba(' + +r + ',' + +g + ',' + +b + ',' + a + ')';
	}
};

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

// Event to update the color when the user leaves the hex value box
document.getElementById('hex_input').addEventListener('blur', function () {
	// Value
	const hexInput = this.value;

	// Check to see if the hex is formatted correctly
	if (hexInput.match(/^#[0-9a-f]{3}([0-9a-f]{3})?([0-9a-f]{2})?$/)) {
		// Updating the picker
		updateColorDisplays(hexInput);
	}
});

// Gathering all the rgba inputs boxes
document.querySelectorAll('.rgba_input').forEach((element) => {
	// Event to update the color when the user changes the value to any of the input boxes
	element.addEventListener('change', function () {
		// Input boxes
		const rgbaInput = document.querySelectorAll('.rgba_input');

		// Checking that the numbers are within the correct boundaries
		if (rgbaInput[0].value > 255) throw 'Value must be below 256';
		if (rgbaInput[1].value > 255) throw 'Value must be below 256';
		if (rgbaInput[2].value > 255) throw 'Value must be below 256';
		if (rgbaInput[3].value > 1) throw 'Value must be equal to or below 1';

		// Updating the picker
		updateColorDisplays(
			`rgba(${rgbaInput[0].value}, ${rgbaInput[1].value}, ${rgbaInput[2].value}, ${rgbaInput[3].value})`
		);
	});
});

// Gathering all the hsla inputs boxes
document.querySelectorAll('.hsla_input').forEach((element) => {
	// Event to update the color when the user changes the value to any of the input boxes
	element.addEventListener('change', function () {
		// Input boxes
		const hslaInput = document.querySelectorAll('.hsla_input');

		// Checking that the numbers are within the correct boundaries
		if (hslaInput[0].value > 359) throw 'Value must be below 360';
		if (hslaInput[1].value > 100) throw 'Value must be below 100';
		if (hslaInput[2].value > 100) throw 'Value must be below 100';
		if (hslaInput[3].value > 1) throw 'Value must be equal to or below 1';

		// Updating the picker
		updateColorDisplays(
			`rgba(${hslaInput[0].value}, ${hslaInput[1].value}%, ${hslaInput[2].value}%, ${hslaInput[3].value})`
		);
	});
});

/*
 * Custom Colors
 */

document.getElementById('custom_colors_box').addEventListener('click', function (event) {
	// Making sure the users has selected a color preview
	if (event.target.className == 'custom_colors_preview') {
		// Color
		const color = event.target.getAttribute('data-custom-color');
		// Updating the picker with that color
		updateColorDisplays(color);
	}
});

// Function to add a new custom color
let addCustomColor = function () {
	// Limiting a custom color to two rows
	if (LSCustomColors[0].length == 27)
		document.getElementById('custom_colors_add').style.display = 'none';

	// Getting the color
	const color = `hsl(${colorPicker.hue}, ${colorPicker.saturation}%, ${colorPicker.lightness}%, ${colorPicker.alpha})`;

	// Creating the element
	let customColorElem = document.createElement('BUTTON');
	customColorElem.className = 'custom_colors_preview';
	customColorElem.style.background = color;
	customColorElem.setAttribute('data-custom-color', color);
	// Placing the element in the DOM
	document
		.getElementById('custom_colors_box')
		.insertBefore(customColorElem, document.getElementById('custom_colors_box').children[0]);

	// Pushing the color to the top of the array
	LSCustomColors[0].unshift(color);

	// Updating the local storage with the new custom color
	localStorage.setItem('custom_colors', JSON.stringify(LSCustomColors));
};
document.getElementById('custom_colors_add').addEventListener('mouseup', function () {
	addCustomColor();
});

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
let clearSingleCustomColor = function (element) {
	console.log(element);
	const elemToRemove = element === null ? colorPicker.contextMenuElem : element;

	// Removing the element
	document.getElementById('custom_colors_box').removeChild(elemToRemove);

	// Clearing the variable
	LSCustomColors = { '0': [] };

	// Looping through the custom colors to repopulate the variable
	for (let x in document.getElementsByClassName('custom_colors_preview')) {
		// Continuing if its a number
		if (isNaN(x) === true) {
			continue;
		}

		// Pushing the colors to the array
		LSCustomColors[0].push(
			document
				.getElementsByClassName('custom_colors_preview')
				[x].getAttribute('data-custom-color')
		);
	}

	// Updating the local storage
	localStorage.setItem('custom_colors', JSON.stringify(LSCustomColors));

	// Making sure the add color button is displaying
	document.getElementById('custom_colors_add').style.display = 'inline-block';
};
document.getElementById('color_clear_single').addEventListener('mousedown', function () {
	clearSingleCustomColor();
});

// Clear single selected color for touch mobile devices
let clearSingleCustomColorTouch = function (event) {
	if (event.target.className == 'custom_colors_preview') {
		const now = new Date().getTime();
		const timeSince = now - colorPicker.doubleTapTime;

		if (timeSince < 200 && timeSince > 0) {
			clearSingleCustomColor(event.target);
		} else {
			colorPicker.doubleTapTime = new Date().getTime();
		}
	}
};
document.getElementById('custom_colors_box').addEventListener('touchstart', function () {
	clearSingleCustomColorTouch(event);
});

// Clears all custom colors
let clearAllCustomColors = function () {
	// Clearing variable
	LSCustomColors = { '0': [] };

	// Looping through the custom colors to repopulate the variable
	while (document.getElementsByClassName('custom_colors_preview').length > 0) {
		document
			.getElementById('custom_colors_box')
			.removeChild(document.getElementsByClassName('custom_colors_preview')[0]);
	}

	// Updating the local storage
	localStorage.setItem('custom_colors', JSON.stringify(LSCustomColors));

	// Making sure the add color button is displaying
	document.getElementById('custom_colors_add').style.display = 'inline-block';
};
document.getElementById('color_clear_all').addEventListener('mousedown', function () {
	clearAllCustomColors();
});

/*
 * Hue Slider
 */

// Function to handle changes to the HUE slider
let colorSliderHandler = function (position) {
	// Defining the slider and dragger
	const sliderContainer = document.getElementById('color_slider');
	const sliderDragger = document.getElementById('color_slider_dragger');

	// Defining the X position
	let eventX = position - sliderContainer.getBoundingClientRect().left;

	// Making conditions so that the user don't drag outside the box
	if (eventX < 11) {
		eventX = 11;
	}

	if (eventX > 277) {
		eventX = 277;
	}

	// Updating the X property of the dragger
	sliderDragger.attributes.x.nodeValue = eventX;

	// Percentage of the dragger on the X axis
	const percent = ((eventX - 11) / 266) * 100;
	// Calculating the color
	// Max number for hue colors is 359, I find the percentage of this, from the percent variable
	// I take it away from the max number because the slider should work backwards
	const HColor = Math.round(359 - (359 / 100) * percent);

	// Updating the Hue value in the data object
	colorPicker.hue = HColor;

	// Full HSLA color
	const HSLA = `hsl(${HColor}, ${colorPicker.saturation}%, ${colorPicker.lightness}%, ${colorPicker.alpha})`;

	// Updating the color for the color preview
	document.getElementById('color_picked_preview').children[0].setAttribute('fill', HSLA);

	// Updating the Hue color in the Saturation and lightness box
	document.getElementById(
		'saturation'
	).children[1].attributes[1].nodeValue = `hsl(${HColor}, 100%, 50%)`;

	// Update the color text values
	updateColorValueInput();
};

/*
 * Mouse Events
 */

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

/*
 * Touch Events
 */

// Start the slider drag on touch
document.getElementById('color_slider').addEventListener('touchstart', function (event) {
	// Updating the status
	colorPicker.sliderStatusTouch = true;
	// Calling the handler function
	colorSliderHandler(event.changedTouches[0].clientX);
});

// Moving the slider drag on touch
document.addEventListener(
	'touchmove',
	function () {
		// Checking that the touch drag has started
		if (colorPicker.sliderStatusTouch === true) {
			// Prevent page scrolling
			event.preventDefault();
			// Calling the handler function
			colorSliderHandler(event.changedTouches[0].clientX);
		}
	},
	{ passive: false }
);

// End the slider drag on touch
document.addEventListener('touchend', function () {
	// Checking that the touch drag has started
	if (colorPicker.sliderStatusTouch === true) {
		// Updating the status
		colorPicker.sliderStatusTouch = false;
	}
});

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
	const HSLA = `hsl(${colorPicker.hue}, ${colorPicker.saturation}%, ${colorPicker.lightness}%, ${alpha})`;

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
document.getElementById('opacity_slider').addEventListener('touchstart', function (event) {
	// Updating the status
	colorPicker.opacityStatusTouch = true;
	// Calling the handler function
	opacitySliderHandler(event.changedTouches[0].clientX);
});

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

/*
 * Saturation and Lightness Box
 */

// Function to handle changes to the saturation and lightness box
let colorBoxHandler = function (positionX, positionY, touch) {
	// Defining the box and dragger
	const boxContainer = document.getElementById('color_box');
	const boxDragger = document.getElementById('box_dragger');

	console.log(document.getElementsByTagName('HTML')[0].scrollTop);

	// Defining X and Y position, Y differently works with scroll so I make conditions for that
	let eventX = positionX - boxContainer.getBoundingClientRect().left;
	let eventY =
		touch === true
			? positionY - boxContainer.getBoundingClientRect().top
			: positionY -
			  boxContainer.getBoundingClientRect().top -
			  document.getElementsByTagName('HTML')[0].scrollTop;

	// Making conditions so that the user don'-t drag outside the box
	if (eventX < 14) {
		eventX = 14;
	}

	if (eventX > 336) {
		eventX = 336;
	}

	if (eventY < 14) {
		eventY = 14;
	}

	if (eventY > 173) {
		eventY = 173;
	}

	// Changes X and Y properties of the dragger
	boxDragger.attributes.y.nodeValue = eventY;
	boxDragger.attributes.x.nodeValue = eventX;

	// Calculating the Saturation Percent value
	// SPercent is just the percent of where the dragger is on the X axis
	// 322 is the max number of pixels the dragger can move
	const SPercent = Math.round(((eventX - 15) / 322) * 100);

	// Calculating the X and Y Percent Values
	const percentX = 100 - SPercent / 2;
	const percentY = 100 - ((eventY - 15) / 159) * 100;

	// Calculating the LPercent
	// LPercent is the the X percentage of the of the Y percentage of the dragger
	let LPercent = Math.floor((percentY / 100) * percentX);

	// Applying the Saturation and Lightness to the data object
	colorPicker.saturation = SPercent;
	colorPicker.lightness = LPercent;

	// Full HSLA color
	const HSLA = `hsl(${colorPicker.hue}, ${SPercent}%, ${LPercent}%, ${colorPicker.alpha})`;

	// Applying the color to the color preview
	document.getElementById('color_picked_preview').children[0].setAttribute('fill', HSLA);

	// Update the color text values
	updateColorValueInput();
};

/*
 * Mouse Events
 */

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

/*
 * Touch Events
 */

// Start the box drag on touch
document.getElementById('color_box').addEventListener('touchstart', function (event) {
	// Updating the status
	colorPicker.boxStatusTouch = true;
	// Calling the handler function
	colorBoxHandler(event.changedTouches[0].clientX, event.changedTouches[0].clientY, true);
});

// Moving the box drag on touch
document.addEventListener(
	'touchmove',
	function () {
		// Checking that the touch drag has started
		if (colorPicker.boxStatusTouch === true) {
			// Prevent page scrolling
			event.preventDefault();
			// Calling the handler function
			colorBoxHandler(event.changedTouches[0].clientX, event.changedTouches[0].clientY, true);
		}
	},
	{ passive: false }
);

// End box drag on touch
document.addEventListener('touchend', function () {
	// Checking that the touch drag has started
	if (colorPicker.boxStatusTouch === true) {
		// Calling the handler function
		colorPicker.boxStatusTouch = false;
	}
});

/*
 * Update Picker
 */

// Function to update color displays
let updateColorDisplays = function (color) {
	// Checking the color type that has been given
	if (color.substring(0, 1) == '#') {
		// Converting the color to HSLA
		color = hexAToRGBA(color, true);
	} else if (color.substring(0, 1) == 'r') {
		// Extracting the values
		const rgb = color.match(/[.?\d]+/g);
		// Making sure there is a alpha value
		rgb[3] = rgb[3] == undefined ? 1 : rgb[3];
		// Converting the color to HSLA
		color = RGBAToHSLA(rgb[0], rgb[1], rgb[2], rgb[3]);
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

	// Updating the data object
	colorPicker.hue = color.h;
	colorPicker.saturation = color.s;
	colorPicker.lightness = color.l;
	colorPicker.alpha = color.a;

	// Updating the input values
	updateColorValueInput();

	// Updating color preview and box hue color initially
	document
		.getElementById('color_picked_preview')
		.children[0].setAttribute('fill', `hsl(${color.h}, ${color.s}%, ${color.l}%, ${color.a}`);
	document.getElementById(
		'saturation'
	).children[1].attributes[1].nodeValue = `hsl(${color.h}, 100%, 50%)`;

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
