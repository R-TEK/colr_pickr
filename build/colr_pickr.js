/*!
 * Colr Pickr
 *
 * R-TEK
 *
 * https://github.com/R-TEK/colr_pickr
 *
 * MIT License
 */

/**
 * Set-up
 */

/**
 * @description Creation of the colorPickerComp object
 * @namespace colorPickerComp
 * @type {object}
 */
let colorPickerComp = new Object();

/**
 * @description Colr Pickr Constructor
 * @param {HTMLElement} element - Define the button that you want to open this instance of the color picker
 * @param {string} [color] - The default color that the button and color picker instance will start out as
 *
 * @example
 * const button = document.getElementById('my_button');
 * let picker = new ColorPicker(button, '#ffffff');
 */
function ColorPicker(element, color, options) {
	// Adding the element to the instance
	this.element = element;

	// Adding the object to the elements object
	element.colorPickerObj = this;

	// Setting color value as a data attribute and changing elements color if color param is given
	element.setAttribute('data-color', color);
	element.style.background = color;

	// Click listener to have the button open the color picker interface
	element.addEventListener('click', function () {
		console.log(options);
		// Applying the items instance to the color picker object
		colorPickerComp.instance = this.colorPickerObj;

		// Update state
		colorPickerComp.pickerOpen = true;

		// Define picker
		const picker = document.getElementById('color_picker');

		// Displaying the color picker
		picker.style.display = 'block';

		// Find position of button
		let top = this.getBoundingClientRect().top;
		let left = this.getBoundingClientRect().left;

		// If the picker will go off bottom of screen...
		if (top + picker.offsetHeight > window.innerHeight) {
			// Place it above the button
			top = top - picker.offsetHeight - 2;
		}
		// If the picker will go off top of screen...
		else {
			// Place it beneath the button
			top = top + this.offsetHeight + 2;
		}

		// If the picker will go off the right of screen...
		if (left + picker.offsetWidth > window.innerWidth - 20) {
			// Calculate the difference
			let difference = left + picker.offsetWidth - window.innerWidth;

			// Move the picker back by the difference
			left = left - difference - 20;
		}

		// Reset styles

		// Defining to text values component
		const colorTextValues = document.getElementById('color_text_values');

		// Define custom colors
		const customColors = document.getElementById('custom_colors');

		// Show it
		customColors.style.display = 'block';

		// Show it
		colorTextValues.style.display = 'block';

		if (options !== undefined) {
			// If the color text values components has been hidden...
			if (options.hasNumberValues === false) {
				// Hide it
				colorTextValues.style.display = 'none';
			}

			// If the custom colors components has been hidden...
			if (options.hasColorPallet === false) {
				// Hide it
				customColors.style.display = 'none';
			}
		}

		// Applying the position
		picker.style.top = top + 'px';
		picker.style.left = left + 'px';

		// Updating the color picker
		colorPickerComp.updateColorDisplays(this.getAttribute('data-color'));

		// Focus on a picker item
		document.getElementById('color_text_values').focus();
	});
}

(function () {
	// Adding items to the color picker object
	colorPickerComp.pickerOpen = false;
	colorPickerComp.instance = null;
	colorPickerComp.boxStatus = false;
	colorPickerComp.boxStatusTouch = false;
	colorPickerComp.sliderStatus = false;
	colorPickerComp.sliderStatusTouch = false;
	colorPickerComp.opacityStatus = false;
	colorPickerComp.opacityStatusTouch = false;
	colorPickerComp.colorTypeStatus = 'HEXA';
	colorPickerComp.hue = 0;
	colorPickerComp.saturation = 100;
	colorPickerComp.lightness = 50;
	colorPickerComp.alpha = 1;
	colorPickerComp.contextMenuElem = null;
	colorPickerComp.doubleTapTime = 0;
	colorPickerComp.LSCustomColors = { 0: [] };

	// Creating the HTML content
	const HTMLContent = `
		<svg id="color_box" width="263" height="130">
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
			<rect rx="5" ry="5" x="1" y="1" width="263" height="130" stroke="#fff" stroke-width="2" fill="url(#pattern_config)"></rect>
			<svg id="box_dragger" x="336" y="14" style="overflow: visible;">
				<circle r="9" fill="none" stroke="#000" stroke-width="2"></circle>
				<circle r="7" fill="none" stroke="#fff" stroke-width="2"></circle>
			</svg>
		</svg>
		<br>
		<div id="sliders">
			<svg id="color_slider" width="263" height="20">
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
				<rect rx="5" ry="5" x="1" y="1" width="263" height="20" stroke="#fff" stroke-width="2" fill="url(#hue)"></rect>
				<svg id="color_slider_dragger" x="277" y="11" style="overflow: visible;">
					<circle r="7" fill="none" stroke="#000" stroke-width="2"></circle>
					<circle r="5" fill="none" stroke="#fff" stroke-width="2"></circle>
				</svg>
			</svg>
			<svg id="opacity_slider" width="263" height="20">
				<defs>
					<linearGradient id="opacity" x1="100%" y1="0%" x2="0%" y2="0%">
						<stop offset="0%" stop-color="#000"></stop>
						<stop offset="100%" stop-color="#fff"></stop>
					</linearGradient>
				</defs>
				<rect rx="5" ry="5" x="1" y="6" width="263" height="10" stroke="#fff" stroke-width="2" fill="url(#opacity)"></rect>
				<svg id="opacity_slider_dragger" x="277" y="11" style="overflow: visible;">
					<circle r="7" fill="none" stroke="#000" stroke-width="2"></circle>
					<circle r="5" fill="none" stroke="#fff" stroke-width="2"></circle>
				</svg>
			</svg>
		</div>
		<div id="color_text_values" tabindex="0">
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
			<button id="switch_color_type" class="remove_outline" name="switch-color-type">
				<svg viewBox="0 -2 24 24" width="20" height="20">
					<path fill="#555" d="M6 11v-4l-6 5 6 5v-4h12v4l6-5-6-5v4z"/>
				</svg>
			</button>
		</div>
		<div id="custom_colors">
			<div id="custom_colors_header">
				<svg id="custom_colors_pallet_icon" viewBox="0 0 24 24" width="15" height="18">
					<path fill="#555" d="M4 21.832c4.587.38 2.944-4.493 7.188-4.538l1.838 1.534c.458 5.538-6.315 6.773-9.026 3.004zm14.065-7.115c1.427-2.239 5.847-9.749 5.847-9.749.352-.623-.43-1.273-.976-.813 0 0-6.572 5.714-8.511 7.525-1.532 1.432-1.539 2.086-2.035 4.447l1.68 1.4c2.227-.915 2.868-1.039 3.995-2.81zm-11.999 3.876c.666-1.134 1.748-2.977 4.447-3.262.434-2.087.607-3.3 2.547-5.112 1.373-1.282 4.938-4.409 7.021-6.229-1-2.208-4.141-4.023-8.178-3.99-6.624.055-11.956 5.465-11.903 12.092.023 2.911 1.081 5.571 2.82 7.635 1.618.429 2.376.348 3.246-1.134zm6.952-15.835c1.102-.006 2.005.881 2.016 1.983.004 1.103-.882 2.009-1.986 2.016-1.105.009-2.008-.88-2.014-1.984-.013-1.106.876-2.006 1.984-2.015zm-5.997 2.001c1.102-.01 2.008.877 2.012 1.983.012 1.106-.88 2.005-1.98 2.016-1.106.007-2.009-.881-2.016-1.988-.009-1.103.877-2.004 1.984-2.011zm-2.003 5.998c1.106-.007 2.01.882 2.016 1.985.01 1.104-.88 2.008-1.986 2.015-1.105.008-2.005-.88-2.011-1.985-.011-1.105.879-2.004 1.981-2.015zm10.031 8.532c.021 2.239-.882 3.718-1.682 4.587l-.046.044c5.255-.591 9.062-4.304 6.266-7.889-1.373 2.047-2.534 2.442-4.538 3.258z"/>
				</svg>
				<button id="custom_colors_add" class="remove_outline" name="add-a-custom-color">
					<svg viewBox="0 -2 24 24" width="14" height="16">
						<path fill="#555" d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
					</svg>
				</button>
			</div>
			<div id="custom_colors_box">
			</div>
		</div>
		<div id="color_context_menu" class="color_ctx_menu">
			<button id="color_clear_single" class="color_ctx_menu" name="remove-single-color">Remove</button>
			<button id="color_clear_all" class="color_ctx_menu" name="remove-all-colors">Remove All</button>
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
	} else {
		// If it has then I define the LSCustomColors with the value for this
		colorPickerComp.LSCustomColors = JSON.parse(localStorage.getItem('custom_colors'));

		// Looping through the data to update the DOM with the custom colors
		for (let x = colorPickerComp.LSCustomColors[0].length - 1; x >= 0; x--) {
			// Creating the element
			let customColorElem = document.createElement('BUTTON');
			customColorElem.className = 'custom_colors_preview';
			customColorElem.style.background = colorPickerComp.LSCustomColors[0][x];
			customColorElem.setAttribute('data-custom-color', colorPickerComp.LSCustomColors[0][x]);

			// Placing the element in the DOM
			document.getElementById('custom_colors_box').appendChild(customColorElem);

			// If custom colors have reaches their limit...
			if (x == 19) document.getElementById('custom_colors_add').style.display = 'none'; // Hide add button
		}

		// Check whether to display the add color button
		if (colorPickerComp.LSCustomColors[0].length == 28)
			document.getElementById('custom_colors_add').style.display = 'none';
	}
})();

// Keypress shortcuts
colorPickerComp.keyShortcuts = function (event) {
	// Loop through inputs element
	for (let x in document.getElementsByTagName('INPUT')) {
		// If iteration number is not longer a number...
		if (isNaN(x)) continue; // Move on

		// If input is active...
		if (document.getElementsByTagName('INPUT')[x] === document.activeElement) return; // Stop function
	}

	// Loop through input elements
	for (let y in document.getElementsByTagName('TEXTAREA')) {
		// If iteration number is not longer a number...
		if (isNaN(y)) continue; // Move on

		// If input is active...
		if (document.getElementsByTagName('TEXTAREA')[y] === document.activeElement) return; // Stop function
	}

	// Define key code
	const key = event.keyCode;

	// Check for key code
	switch (key) {
		// Del
		case 46:
			// If focused element is a custom color...
			if (document.activeElement.className == 'custom_colors_preview')
				// Delete it
				colorPickerComp.clearSingleCustomColor(document.activeElement);
			break;
		// Esc
		case 27:
			// If picker is open...
			if (colorPickerComp.pickerOpen) closePicker(); // Close picker
			break;
		// Tab
		case 9:
			// Define outline elements
			let outlineElements = document.getElementsByClassName('remove_outline');

			// Loop through the array of outline element until they are all gone
			while (outlineElements.length > 0) {
				// Add outline
				outlineElements[0].classList.add('add_outline');

				// Remove outline
				outlineElements[0].classList.remove('remove_outline');

				// Update list
				outlineElements = document.getElementsByClassName('remove_outline');
			}
			break;
	}
};
document.addEventListener('keydown', colorPickerComp.keyShortcuts.bind(event));

// Remove outline from tabbing
document.addEventListener('mousedown', function () {
	// Define outline element
	let outlineElements = document.getElementsByClassName('add_outline');

	// Loop through the array of outline element until they are all gone
	while (outlineElements.length > 0) {
		// Remove outline
		outlineElements[0].classList.add('remove_outline');

		// Remove outline class
		outlineElements[0].classList.remove('add_outline');

		// Update list
		outlineElements = document.getElementsByClassName('add_outline');
	}
});

// Click anywhere to close a pop-up
document.addEventListener('mousedown', function () {
	// Close context menu
	if (event.target.id != 'color_context_menu') {
		document.getElementById('color_context_menu').style.display = 'none';
	}
});

// Close the picker
let closePicker = function () {
	// Update state
	colorPickerComp.pickerOpen = false;

	// Hiding elements
	document.getElementById('color_picker').style.display = 'none';

	// Checking if the color for this instance has not been set yet
	if (colorPickerComp.instance.element.getAttribute('data-color') == 'undefined') return;

	// Update
	updatePicker();
};

// Handles updates
let updatePicker = function () {
	// Calling Event to make all the necessary changes
	colorPickerComp.colorChange({
		h: colorPickerComp.hue,
		s: colorPickerComp.saturation,
		l: colorPickerComp.lightness,
		a: colorPickerComp.alpha
	});
};

// Click the darken background to close the color picker
document.addEventListener('mousedown', function () {
	// Define the target
	let target = event.target;

	// If picker is open...
	if (colorPickerComp.pickerOpen) {
		// Looping through the parent to check if we are under the picker of window
		while (target != document.getElementById('color_picker')) {
			// If we are under the window...
			if (target.tagName == 'HTML') {
				// Close the picker
				closePicker();

				break;
			}

			// If not, then go to next parent
			target = target.parentNode;
		}
	}
});

// When scrolling
document.addEventListener('scroll', function () {
	// If picker is open...
	if (colorPickerComp.pickerOpen) closePicker(); // Close picker
});

// When using mouse wheel
window.addEventListener('resize', function () {
	// If picker is open...
	if (colorPickerComp.pickerOpen) closePicker(); // Close picker
});

/**
 * Custom Color Change Event
 */

/**
 * @memberof colorPickerComp
 * @method colorChange
 * @description Function to change the color of an instance via a JavaScript function
 * @param {string} color - The color you are changing the instance to
 * @param {HTMLElement} elem - The button HTMLElement that is a part of the instance
 *
 * @example
 * const button = document.getElementById('my_button');
 * colorPickerComp.colorChange('#ff0000', button);
 */
colorPickerComp.colorChange = function (color, elem) {
	// If the user send a string manually...
	if (typeof color == 'string') {
		// Change it to the expected value of a HSLA object
		color = colorPickerComp.hexAToRGBA(color, true);
	}

	// Defining the RGBA value conversion
	const rgbaValue = colorPickerComp.HSLAToRGBA(color.h, color.s, color.l, color.a);
	const hex = colorPickerComp.HSLAToRGBA(color.h, color.s, color.l, color.a, true);

	/**
	 * @event colorChange
	 * @description Event to fire whenever the color picker is closed for new details on the color instance. Calling event.detail will return an object of the following:
	 * @return {object} color - Object of color values
	 * @return {string} color.hex - Hex value of chosen color
	 * @return {string} color.rgb - RGB value of chosen color
	 * @return {string} color.hsl - HSL value of chosen color
	 * @return {string} color.hexa - HexAlpha value of chosen color
	 * @return {string} color.rgba - RGBA value of chosen color
	 * @return {string} color.hsla - HSLA value of chosen color
	 *
	 * @example
	 * const button = document.getElementById('my_button');
	 * button.addEventListener('colorChange', function () {
	 *   const newColor = event.detail.color.hexa;
	 * });
	 */
	const event = new CustomEvent('colorChange', {
		// Adding the response details
		detail: {
			color: {
				hsl: `hsla(${color.h}, ${color.s}%, ${color.l}%)`,
				rgb: `rgba(${rgbaValue.r}, ${rgbaValue.g}, ${rgbaValue.b})`,
				hex: hex,
				hsla: `hsla(${color.h}, ${color.s}%, ${color.l}%, ${color.a})`,
				rgba: `rgba(${rgbaValue.r}, ${rgbaValue.g}, ${rgbaValue.b}, ${rgbaValue.a})`,
				hexa: hex
			}
		}
	});

	// Defining element
	const element = elem === undefined ? colorPickerComp.instance.element : elem;

	// Defining color

	// Changing color attributes
	element.setAttribute('data-color', hex);
	element.style.background = hex;

	// Dispatching the event for the active object
	element.dispatchEvent(event);
};

/**
 * Color Value Converter
 */

// Convert HSLA to RGBA
colorPickerComp.HSLAToRGBA = function (h, s, l, a, toHex) {
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
		return colorPickerComp.RGBAToHexA(r, g, b, a);
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
colorPickerComp.RGBAToHSLA = function (r, g, b, a) {
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

	return {
		h: h,
		s: s,
		l: l,
		a: a
	};
};

// Convert RGBA to HexA
colorPickerComp.RGBAToHexA = function (r, g, b, a) {
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
colorPickerComp.hexAToRGBA = function (h, toHSL) {
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
		return colorPickerComp.RGBAToHSLA(+r, +g, +b, a);
	} else {
		return 'rgba(' + +r + ',' + +g + ',' + +b + ',' + a + ')';
	}
};

/**
 * Color Text Values
 */

// Function to switch the color type inputs
colorPickerComp.switchColorType = function () {
	// Checking the current selected input color type
	if (colorPickerComp.colorTypeStatus == 'HEXA') {
		// Updating the data object
		colorPickerComp.colorTypeStatus = 'RGBA';

		// Displaying the correct elements
		document.getElementById('hexa').style.display = 'none';
		document.getElementById('rgba').style.display = 'block';

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
	} else if (colorPickerComp.colorTypeStatus == 'RGBA') {
		// Updating the data object
		colorPickerComp.colorTypeStatus = 'HSLA';

		// Displaying the correct elements
		document.getElementById('rgba').style.display = 'none';
		document.getElementById('hsla').style.display = 'block';

		// Applying the value to the inputs
		document.getElementsByClassName('hsla_input')[0].value = colorPickerComp.hue;
		document.getElementsByClassName('hsla_input')[1].value = colorPickerComp.saturation;
		document.getElementsByClassName('hsla_input')[2].value = colorPickerComp.lightness;
		document.getElementsByClassName('hsla_input')[3].value = colorPickerComp.alpha;
	} else if (colorPickerComp.colorTypeStatus == 'HSLA') {
		// Updating the data object
		colorPickerComp.colorTypeStatus = 'HEXA';

		// Displaying the correct elements
		document.getElementById('hsla').style.display = 'none';
		document.getElementById('hexa').style.display = 'block';

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
	}
};
document.getElementById('switch_color_type').addEventListener('click', function () {
	colorPickerComp.switchColorType();
});

// Event to update the color when the user leaves the hex value box
document.getElementById('hex_input').addEventListener('blur', function () {
	// Value
	const hexInput = this.value;

	// Check to see if the hex is formatted correctly
	if (hexInput.match(/^#[0-9a-f]{3}([0-9a-f]{3})?([0-9a-f]{2})?$/)) {
		// Updating the picker
		colorPickerComp.updateColorDisplays(hexInput);

		// Update
		updatePicker();
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
		colorPickerComp.updateColorDisplays(
			`rgba(${rgbaInput[0].value}, ${rgbaInput[1].value}, ${rgbaInput[2].value}, ${rgbaInput[3].value})`
		);

		// Update
		updatePicker();
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
		colorPickerComp.updateColorDisplays(
			`hsla(${hslaInput[0].value}, ${hslaInput[1].value}%, ${hslaInput[2].value}%, ${hslaInput[3].value})`
		);

		// Update
		updatePicker();
	});
});

/**
 * Custom Colors
 */

/**
 * @memberof colorPickerComp
 * @method getCustomColors
 * @description Gets an array of all the saved custom colors
 *
 * @example
 * const savedColor = colorPickerComp.getCustomColors();
 */
colorPickerComp.getCustomColors = function () {
	return colorPickerComp.LSCustomColors();
};

// Click on color listener to update the picker
document.getElementById('custom_colors_box').addEventListener('click', function (event) {
	// Making sure the users has selected a color preview
	if (event.target.className == 'custom_colors_preview') {
		// Color
		const color = event.target.getAttribute('data-custom-color');

		// Updating the picker with that color
		colorPickerComp.updateColorDisplays(color);

		// Update
		updatePicker();
	}
});

// Function to add a new custom color
colorPickerComp.addCustomColor = function () {
	// Limiting a custom color to two rows
	if (colorPickerComp.LSCustomColors[0].length == 19)
		document.getElementById('custom_colors_add').style.display = 'none';

	// Getting the color
	const color = `hsla(${colorPickerComp.hue}, ${colorPickerComp.saturation}%, ${colorPickerComp.lightness}%, ${colorPickerComp.alpha})`;

	// Creating the element
	let customColorElem = document.createElement('BUTTON');
	customColorElem.className = 'custom_colors_preview';
	customColorElem.style.background = color;
	customColorElem.setAttribute('data-custom-color', color);
	// Placing the element in the DOM
	document.getElementById('custom_colors_box').appendChild(customColorElem);

	// Pushing the color to the top of the array
	colorPickerComp.LSCustomColors[0].unshift(color);

	// Updating the local storage with the new custom color
	localStorage.setItem('custom_colors', JSON.stringify(colorPickerComp.LSCustomColors));
};
document.getElementById('custom_colors_add').addEventListener('click', function () {
	colorPickerComp.addCustomColor();
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
		colorPickerComp.contextMenuElem = event.target;
	}
});

// Clears a selected custom color
colorPickerComp.clearSingleCustomColor = function (element) {
	const elemToRemove = element === undefined ? colorPickerComp.contextMenuElem : element;

	// Removing the element
	document.getElementById('custom_colors_box').removeChild(elemToRemove);

	// Clearing the variable
	colorPickerComp.LSCustomColors = { 0: [] };

	// Looping through the custom colors to repopulate the variable
	for (let x in document.getElementsByClassName('custom_colors_preview')) {
		// Continuing if its a number
		if (isNaN(x) === true) {
			continue;
		}

		// Pushing the colors to the array
		colorPickerComp.LSCustomColors[0].push(
			document
				.getElementsByClassName('custom_colors_preview')
				[x].getAttribute('data-custom-color')
		);
	}

	// Updating the local storage
	localStorage.setItem('custom_colors', JSON.stringify(colorPickerComp.LSCustomColors));

	// Making sure the add color button is displaying
	document.getElementById('custom_colors_add').style.display = 'inline-block';
};
document.getElementById('color_clear_single').addEventListener('mousedown', function () {
	colorPickerComp.clearSingleCustomColor();
});

// Clears all custom colors
colorPickerComp.clearAllCustomColors = function () {
	// Clearing variable
	colorPickerComp.LSCustomColors = { 0: [] };

	// Looping through the custom colors to repopulate the variable
	while (document.getElementsByClassName('custom_colors_preview').length > 0) {
		document
			.getElementById('custom_colors_box')
			.removeChild(document.getElementsByClassName('custom_colors_preview')[0]);
	}

	// Updating the local storage
	localStorage.setItem('custom_colors', JSON.stringify(colorPickerComp.LSCustomColors));

	// Making sure the add color button is displaying
	document.getElementById('custom_colors_add').style.display = 'inline-block';
};
document.getElementById('color_clear_all').addEventListener('mousedown', function () {
	colorPickerComp.clearAllCustomColors();
});

/**
 * Hue Slider
 */

// Function to handle changes to the HUE slider
colorPickerComp.colorSliderHandler = function (position) {
	// Defining the slider and dragger
	const sliderContainer = document.getElementById('color_slider');
	const sliderDragger = document.getElementById('color_slider_dragger');

	// Defining the X position
	let eventX = position - sliderContainer.getBoundingClientRect().left;

	// Making conditions so that the user don't drag outside the box
	if (eventX < 11) eventX = 11;

	if (eventX > 255) eventX = 255;

	// Updating the X property of the dragger
	sliderDragger.attributes.x.nodeValue = eventX;

	// Percentage of the dragger on the X axis
	const percent = ((eventX - 11) / 244) * 100;

	// Calculating the color
	// Max number for hue colors is 359, I find the percentage of this, from the percent variable
	// I take it away from the max number because the slider should work backwards
	const HColor = Math.round(359 - (359 / 100) * percent);

	// Updating the Hue value in the data object
	colorPickerComp.hue = HColor;

	// Updating the Hue color in the Saturation and lightness box
	document
		.getElementById('saturation')
		.children[1].setAttribute(
			'stop-color',
			`hsla(${HColor}, 100%, 50%, ${colorPickerComp.alpha})`
		);

	// Update the color text values
	colorPickerComp.updateColorValueInput();

	// Setting the data-color attribute to a color string
	// This is so that the color updates properly on instances where the color has not been set
	colorPickerComp.instance.element.setAttribute('data-color', 'color');

	// Update
	updatePicker();
};

/**
 * Mouse Events
 */

// Start the slider drag
document.getElementById('color_slider').addEventListener('mousedown', function (event) {
	// Updating the status in the data object
	colorPickerComp.sliderStatus = true;
	// Calling handler function
	colorPickerComp.colorSliderHandler(event.pageX);
});

// Moving the slider drag
document.addEventListener('mousemove', function (event) {
	// Checking that the drag has started
	if (colorPickerComp.sliderStatus === true) {
		// Calling handler function
		colorPickerComp.colorSliderHandler(event.pageX);
	}
});

// End the slider drag
document.addEventListener('mouseup', function () {
	// Checking that the drag has started
	if (colorPickerComp.sliderStatus === true) {
		// Updating the status in the data object
		colorPickerComp.sliderStatus = false;
	}
});

/**
 * Touch Events
 */

// Start the slider drag on touch
document.getElementById('color_slider').addEventListener(
	'touchstart',
	function (event) {
		// Updating the status
		colorPickerComp.sliderStatusTouch = true;
		// Calling the handler function
		colorPickerComp.colorSliderHandler(event.changedTouches[0].clientX);
	},
	{ passive: true }
);

// Moving the slider drag on touch
document.addEventListener(
	'touchmove',
	function () {
		// Checking that the touch drag has started
		if (colorPickerComp.sliderStatusTouch === true) {
			// Prevent page scrolling
			event.preventDefault();
			// Calling the handler function
			colorPickerComp.colorSliderHandler(event.changedTouches[0].clientX);
		}
	},
	{ passive: false }
);

// End the slider drag on touch
document.addEventListener('touchend', function () {
	// Checking that the touch drag has started
	if (colorPickerComp.sliderStatusTouch === true) {
		// Updating the status
		colorPickerComp.sliderStatusTouch = false;
	}
});

/**
 * Opacity Slider
 */

// Function to handle changes to the opacity slider
colorPickerComp.opacitySliderHandler = function (position) {
	// Defining the slider and dragger
	const sliderContainer = document.getElementById('opacity_slider');
	const sliderDragger = document.getElementById('opacity_slider_dragger');

	// Defining the X position
	let eventX = position - sliderContainer.getBoundingClientRect().left;

	// Making conditions so that the user don't drag outside the box
	if (eventX < 11) eventX = 11;

	if (eventX > 255) eventX = 255;

	// Update the X property of the dragger
	sliderDragger.attributes.x.nodeValue = eventX;

	// Percentage of the dragger on the X axis
	const percent = ((eventX - 11) / 244) * 100;

	// Finding the value for the percentage of 1
	let alpha = (1 / 100) * percent;
	// Rounding the value to the nearest 2 decimals
	alpha = Number(Math.round(alpha + 'e' + 2) + 'e-' + 2);

	// Updating the data objects
	colorPickerComp.alpha = alpha;

	// Update the color text values
	colorPickerComp.updateColorValueInput();

	// Setting the data-color attribute to a color string
	// This is so that the color updates properly on instances where the color has not been set
	colorPickerComp.instance.element.setAttribute('data-color', 'color');

	// Update
	updatePicker();
};

/**
 * Mouse Events
 */

// Start the slider drag for opacity
document.getElementById('opacity_slider').addEventListener('mousedown', function (event) {
	// Updating the status in the data object
	colorPickerComp.opacityStatus = true;
	// Calling the handler function
	colorPickerComp.opacitySliderHandler(event.pageX);
});

// Moving the slider drag for opacity
document.addEventListener('mousemove', function (event) {
	// Checking that the drag has started
	if (colorPickerComp.opacityStatus === true) {
		// Calling the handler function
		colorPickerComp.opacitySliderHandler(event.pageX);
	}
});

// End the slider drag
document.addEventListener('mouseup', function () {
	// Checking that the drag has started
	if (colorPickerComp.opacityStatus === true) {
		// Updating the status in the data object
		colorPickerComp.opacityStatus = false;
	}
});

/**
 * Touch Events
 */

// Start the slider drag on touch
document.getElementById('opacity_slider').addEventListener(
	'touchstart',
	function (event) {
		// Updating the status
		colorPickerComp.opacityStatusTouch = true;
		// Calling the handler function
		colorPickerComp.opacitySliderHandler(event.changedTouches[0].clientX);
	},
	{ passive: true }
);

// Moving the slider drag on touch
document.addEventListener(
	'touchmove',
	function () {
		// Checking that the touch drag has started
		if (colorPickerComp.opacityStatusTouch === true) {
			// Prevent page scrolling
			event.preventDefault();
			// Calling the handler function
			colorPickerComp.opacitySliderHandler(event.changedTouches[0].clientX);
		}
	},
	{ passive: false }
);

// End the slider drag on touch
document.addEventListener('touchend', function () {
	// Checking that the touch drag has started
	if (colorPickerComp.opacityStatusTouch === true) {
		// Updating the status
		colorPickerComp.opacityStatusTouch = false;
	}
});

/**
 * Saturation and Lightness Box
 */

// Function to handle changes to the saturation and lightness box
colorPickerComp.colorBoxHandler = function (positionX, positionY, touch) {
	// Defining the box and dragger
	const boxContainer = document.getElementById('color_box');
	const boxDragger = document.getElementById('box_dragger');

	// Defining X and Y position, Y differently works with scroll so I make conditions for that
	let eventX = positionX - boxContainer.getBoundingClientRect().left;
	let eventY =
		touch === true
			? positionY - boxContainer.getBoundingClientRect().top
			: positionY -
			  boxContainer.getBoundingClientRect().top -
			  document.getElementsByTagName('HTML')[0].scrollTop;

	// Making conditions so that the user don't drag outside the box
	if (eventX < 14) eventX = 14;

	if (eventX > 252) eventX = 252;

	if (eventY < 14) eventY = 14;

	if (eventY > 119) eventY = 119;

	// Changes X and Y properties of the dragger
	boxDragger.attributes.y.nodeValue = eventY;
	boxDragger.attributes.x.nodeValue = eventX;

	// Calculating the Saturation Percent value
	// SPercent is just the percent of where the dragger is on the X axis
	// 322 is the max number of pixels the dragger can move
	const SPercent = Math.round(((eventX - 15) / 238) * 100);

	// Calculating the X and Y Percent Values
	const percentX = 100 - SPercent / 2;
	const percentY = 100 - ((eventY - 15) / 105) * 100;

	// Calculating the LPercent
	// LPercent is the the X percentage of the of the Y percentage of the dragger
	const LPercent = Math.floor((percentY / 100) * percentX);

	// Applying the Saturation and Lightness to the data object
	colorPickerComp.saturation = SPercent;
	colorPickerComp.lightness = LPercent;

	// Update the color text values
	colorPickerComp.updateColorValueInput();

	// Setting the data-color attribute to a color string
	// This is so that the color updates properly on instances where the color has not been set
	colorPickerComp.instance.element.setAttribute('data-color', 'color');

	// Update
	updatePicker();
};

/**
 * Mouse Events
 */

// Start box drag listener
document.getElementById('color_box').addEventListener('mousedown', function (event) {
	// Updating the status in the data object
	colorPickerComp.boxStatus = true;
	// Calling handler function
	colorPickerComp.colorBoxHandler(event.pageX, event.pageY);
});

// Moving box drag listener
document.addEventListener('mousemove', function (event) {
	// Checking that the drag has started
	if (colorPickerComp.boxStatus === true) {
		// Calling handler function
		colorPickerComp.colorBoxHandler(event.pageX, event.pageY);
	}
});

// End box drag listener
document.addEventListener('mouseup', function (event) {
	// Checking that the drag has started
	if (colorPickerComp.boxStatus === true) {
		// Updating the status in the data object
		colorPickerComp.boxStatus = false;
	}
});

/**
 * Touch Events
 */

// Start the box drag on touch
document.getElementById('color_box').addEventListener(
	'touchstart',
	function (event) {
		// Updating the status
		colorPickerComp.boxStatusTouch = true;
		// Calling the handler function
		colorPickerComp.colorBoxHandler(
			event.changedTouches[0].clientX,
			event.changedTouches[0].clientY,
			true
		);
	},
	{ passive: true }
);

// Moving the box drag on touch
document.addEventListener(
	'touchmove',
	function () {
		// Checking that the touch drag has started
		if (colorPickerComp.boxStatusTouch === true) {
			// Prevent page scrolling
			event.preventDefault();
			// Calling the handler function
			colorPickerComp.colorBoxHandler(
				event.changedTouches[0].clientX,
				event.changedTouches[0].clientY,
				true
			);
		}
	},
	{ passive: false }
);

// End box drag on touch
document.addEventListener('touchend', function () {
	// Checking that the touch drag has started
	if (colorPickerComp.boxStatusTouch === true) {
		// Calling the handler function
		colorPickerComp.boxStatusTouch = false;
	}
});

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

	// Updating the Hue color in the Saturation and lightness box
	document
		.getElementById('saturation')
		.children[1].setAttribute('stop-color', `hsl(${color.h}, 100%, 50%)`);

	// Color box (saturation and lightness) config
	// Defining the box and dragger
	const boxDragger = document.getElementById('box_dragger');

	// Calculating x value
	let x = (238 / 100) * color.s + 14;

	// Calculating y value
	const percentY = 100 - (color.l / (100 - color.s / 2)) * 100;
	let y = (105 / 100) * percentY + 14;

	// Making conditions so that the user don't drag outside the box
	if (x < 14) x = 14;

	if (x > 252) x = 252;

	if (y < 14) y = 14;

	if (y > 119) y = 119;

	// Making changes the the UI
	boxDragger.attributes.x.nodeValue = x;
	boxDragger.attributes.y.nodeValue = y;

	// Hue slider config
	// Defining the hue slider and dragger
	const hueSliderDragger = document.getElementById('color_slider_dragger');

	// Calculating x value
	let percentHue = 100 - (color.h / 359) * 100;
	let hueX = (244 / 100) * percentHue + 11;

	// Making changes the the UI
	hueSliderDragger.attributes.x.nodeValue = hueX;

	// Alpha slider config
	// Defining the opacity slider and dragger
	const alphaSliderDragger = document.getElementById('opacity_slider_dragger');

	// Calculating x value
	let alphaX = (244 / 100) * (color.a * 100) + 11;

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
