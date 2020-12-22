/*!
 * Colr Pickr
 *
 * R-TEK
 *
 * https://github.com/R-TEK/colr_pickr
 *
 * MIT License
 */


//TODO: make sure to change the logic after ive just changed to width and position of the picker

/**
 * Set-up
 */

/**
 * @description Creation of the picker object
 * @namespace picker
 * @type {object}
 */
let picker = new Object();

// TODO: add jsdoc for options

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
		picker.instance = this.colorPickerObj;

		// Update state
		picker.pickerOpen = true;

		// Define picker
		const colorPicker = document.getElementById('color_picker');

		// Displaying the color picker
		colorPicker.style.display = 'block';

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

		// Position

		// Find position of button
		let top = this.getBoundingClientRect().top;
		let left = this.getBoundingClientRect().left;

		// If theres no room for the picker to go above the button...
		if (colorPicker.offsetHeight > top) {
			// Place it beneath the button
			top = top + this.offsetHeight + 2;
		}
		// If the picker will go off bottom of screen...
		else if (top + colorPicker.offsetHeight > window.innerHeight) {
			// Place it above the button
			top = top - colorPicker.offsetHeight - 2;
		}
		// If the picker will go off top of screen...
		else {
			// Place it beneath the button
			top = top + this.offsetHeight + 2;
		}

		// If the picker will go off the right of screen...
		if (left + colorPicker.offsetWidth > window.innerWidth) {
			// Calculate the difference
			let difference = left + colorPicker.offsetWidth - window.innerWidth;

			// Move the picker back by the difference
			left = left - difference - 20;
		}

		// Applying the position
		colorPicker.style.top = top + 'px';
		colorPicker.style.left = left + 'px';

		// Updating the color picker
		picker.updateColorDisplays(this.getAttribute('data-color'));

		// Focus on a picker item
		document.getElementById('color_text_values').focus();
	});
}

//TODO: check if all these are needed to be predefined

(function () {
	// Adding items to the color picker object
	picker.pickerOpen = false;
	picker.instance = null;
	picker.boxStatus = false;
	picker.boxStatusTouch = false;
	picker.sliderStatus = false;
	picker.sliderStatusTouch = false;
	picker.opacityStatus = false;
	picker.opacityStatusTouch = false;
	picker.colorTypeStatus = 'HEXA';
	picker.hue = 0;
	picker.saturation = 100;
	picker.lightness = 50;
	picker.alpha = 1;
	picker.contextMenuElem = null;
	picker.doubleTapTime = 0;
	picker.LSCustomColors = { 0: [] };

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
			<rect rx="5" ry="5" x="0" y="2" width="263" height="130" stroke="#fff" stroke-width="2" fill="url(#pattern_config)"></rect>
			<svg id="box_dragger" x="336" y="14">
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
				<rect rx="5" ry="5" x="2" y="1" width="262" height="20" stroke="#fff" stroke-width="2" fill="url(#hue)"></rect>
				<svg id="color_slider_dragger" x="277" y="11">
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
				<rect rx="5" ry="5" x="2" y="6" width="262" height="10" stroke="#fff" stroke-width="2" fill="url(#opacity)"></rect>
				<svg id="opacity_slider_dragger" x="277" y="11">
					<circle r="7" fill="none" stroke="#000" stroke-width="2"></circle>
					<circle r="5" fill="none" stroke="#fff" stroke-width="2"></circle>
				</svg>
			</svg>
		</div>
		<div id="color_text_values" tabindex="0">
			<div id="hexa">
				<input id="hex_input" name="hex_input" type="text" maxlength="9" spellcheck="false" />
				<br>
				<label for="hex_input">HEX</label>
			</div>
			<div id="rgba">
				<div>
					<input class="rgba_input" name="r" type="number" min="0" max="255" />
					<br>
					<label for="r">R</label>
				</div>
				<div>
					<input class="rgba_input" name="g" type="number" min="0" max="255" />
					<br>
					<label for="g">G</label>
				</div>
				<div>
					<input class="rgba_input" name="b" type="number" min="0" max="255" />
					<br>
					<label for="b">B</label>
				</div>
				<div>
					<input class="rgba_input" name="a" type="number" step="0.1" min="0" max="1" />
					<br>
					<label for="a">A</label>
				</div>
			</div>
			<div id="hsla">
				<div>
					<input class="hsla_input" name="h" type="number" min="0" max="359" />
					<br>
					<label for="h">H</label>
				</div>
				<div>
					<input class="hsla_input" name="s" type="number" min="0" max="100" />
					<br>
					<label for="s">S%</label>
				</div>
				<div>
					<input class="hsla_input" name="l" type="number" min="0" max="100" />
					<br>
					<label for="l">L%</label>
				</div>
				<div>
					<input class="hsla_input" name="a" type="number" step="0.1" min="0" max="1" />
					<br>
					<label for="a">A</label>
				</div>
			</div>
			<button id="switch_color_type" class="remove_outline" name="switch-color-type">
				<svg viewBox="0 0 24 24" width="20" height="24">
					<path fill="#555" d="M6 11v-4l-6 5 6 5v-4h12v4l6-5-6-5v4z"/>
				</svg>
			</button>
		</div>
		<div id="custom_colors">
			<div id="custom_colors_header">
				<svg class="pallet_icon" viewBox="0 0 24 24" width="15" height="18">
					<path fill="#555" d="M4 21.832c4.587.38 2.944-4.493 7.188-4.538l1.838 1.534c.458 5.538-6.315 6.773-9.026 3.004zm14.065-7.115c1.427-2.239 5.847-9.749 5.847-9.749.352-.623-.43-1.273-.976-.813 0 0-6.572 5.714-8.511 7.525-1.532 1.432-1.539 2.086-2.035 4.447l1.68 1.4c2.227-.915 2.868-1.039 3.995-2.81zm-11.999 3.876c.666-1.134 1.748-2.977 4.447-3.262.434-2.087.607-3.3 2.547-5.112 1.373-1.282 4.938-4.409 7.021-6.229-1-2.208-4.141-4.023-8.178-3.99-6.624.055-11.956 5.465-11.903 12.092.023 2.911 1.081 5.571 2.82 7.635 1.618.429 2.376.348 3.246-1.134zm6.952-15.835c1.102-.006 2.005.881 2.016 1.983.004 1.103-.882 2.009-1.986 2.016-1.105.009-2.008-.88-2.014-1.984-.013-1.106.876-2.006 1.984-2.015zm-5.997 2.001c1.102-.01 2.008.877 2.012 1.983.012 1.106-.88 2.005-1.98 2.016-1.106.007-2.009-.881-2.016-1.988-.009-1.103.877-2.004 1.984-2.011zm-2.003 5.998c1.106-.007 2.01.882 2.016 1.985.01 1.104-.88 2.008-1.986 2.015-1.105.008-2.005-.88-2.011-1.985-.011-1.105.879-2.004 1.981-2.015zm10.031 8.532c.021 2.239-.882 3.718-1.682 4.587l-.046.044c5.255-.591 9.062-4.304 6.266-7.889-1.373 2.047-2.534 2.442-4.538 3.258z"/>
				</svg>
				<button id="custom_colors_add" class="remove_outline" name="add-a-custom-color">
					<svg viewBox="0 0 24 24" width="14" height="16">
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

	// Set up custom colors variables
	let customColors = null;

	// Try get the saved colors from local storage
	try {
		customColors = localStorage.getItem('custom_colors');
	}
	catch {}

	// Checking if a local storage variable has been set
	if (customColors === null) {
		// If not then try I set one
		try {
			localStorage.setItem('custom_colors', '{"0": []}');
		}
		catch {}
	} else {
		// If it has then I define the LSCustomColors with the value for this
		picker.LSCustomColors = JSON.parse(customColors);

		// Looping through the data to update the DOM with the custom colors
		for (let x = picker.LSCustomColors[0].length - 1; x >= 0; x--) {
			// Creating the element
			let customColorElem = document.createElement('BUTTON');
			customColorElem.className = 'custom_colors_preview';
			customColorElem.style.background = picker.LSCustomColors[0][x];
			customColorElem.setAttribute('data-custom-color', picker.LSCustomColors[0][x]);

			// Placing the element in the DOM
			document.getElementById('custom_colors_box').appendChild(customColorElem);

			// If custom colors have reaches their limit...
			if (x == 19) document.getElementById('custom_colors_add').style.display = 'none'; // Hide add button
		}

		// Check whether to display the add color button
		if (picker.LSCustomColors[0].length == 28)
			document.getElementById('custom_colors_add').style.display = 'none';
	}
})();

// Keypress shortcuts
picker.keyShortcuts = function (event) {
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
				picker.clearSingleCustomColor(document.activeElement);
			break;
		// Esc
		case 27:
			// If picker is open...
			if (picker.pickerOpen) picker.closePicker(); // Close picker
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
document.addEventListener('keydown', picker.keyShortcuts.bind(event));

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
picker.closePicker = function () {
	// Update state
	picker.pickerOpen = false;

	// Hiding elements
	document.getElementById('color_picker').style.display = 'none';

	// Checking if the color for this instance has not been set yet
	if (picker.instance.element.getAttribute('data-color') == 'undefined') return;

	// Update
	updatePicker();
};

// Handles updates
let updatePicker = function () {
	// Calling Event to make all the necessary changes
	picker.colorChange({
		h: picker.hue,
		s: picker.saturation,
		l: picker.lightness,
		a: picker.alpha
	});
};

// Click the darken background to close the color picker
document.addEventListener('mousedown', function () {
	// Define the target
	let target = event.target;

	// If picker is open...
	if (picker.pickerOpen) {
		// Looping through the parent to check if we are under the picker of window
		while (target != document.getElementById('color_picker')) {
			// If we are under the window...
			if (target.tagName == 'HTML') {
				// Close the picker
				picker.closePicker();

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
	if (picker.pickerOpen) picker.closePicker(); // Close picker
});

// When using mouse wheel
window.addEventListener('resize', function () {
	// If picker is open...
	if (picker.pickerOpen) picker.closePicker(); // Close picker
});
