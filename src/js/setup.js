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
		colorPickerComp.instance = event.target.colorPickerObj;

		// Displaying the color picker
		document.getElementById('color_picker').style.display = 'block';
		document.getElementById('color_picker_bg').style.display = 'block';

		// Updating the color picker
		colorPickerComp.updateColorDisplays(event.target.getAttribute('data-color'));
	});
}

(function () {
	// Adding items to the color picker object
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
			<button id="switch_color_type" name="switch-color-type">
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
				<button id="custom_colors_add" name="add-a-custom-color">
				<svg viewBox="0 0 24 24" width="12" height="14">
					<path fill="#555" d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
				</svg>
				</button>
			</div>
		</div>
		<div id="color_context_menu" class="color_ctx_menu">
			<button id="color_clear_single" class="color_ctx_menu" name="remove-single-color">Remove Color</button>
			<button id="color_clear_all" class="color_ctx_menu" name="remove-all-colors">Remove All</button>
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
		}

		// Check whether to display the add color button
		if (colorPickerComp.LSCustomColors[0].length == 28)
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

	// Checking if the color for this instance has not been set yet
	if (colorPickerComp.instance.element.getAttribute('data-color') == 'undefined') return;

	// Calling Event to make all the necessary changes
	colorPickerComp.colorChange({
		h: colorPickerComp.hue,
		s: colorPickerComp.saturation,
		l: colorPickerComp.lightness,
		a: colorPickerComp.alpha
	});
});
