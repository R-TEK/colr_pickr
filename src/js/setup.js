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

// Color Picker data
let colorPicker = {
	boxStatus: false,
	sliderStatus: false,
	opacityStatus: false,
	colorTypeStatus: "HEXA",
	hue: 0,
	saturation: 100,
	lightness: 50,
	alpha: 1,
	contextMenuElem: null,
};

// Local storage variable
let LSCustomColors = { 0: [] };

// Function to open the color picker
let runColorPicker = function (event) {
	// Defining elements
	const target = event.target;
	const colorPicker = document.getElementById("color_picker");
};

// Function to setup the color picker
(function () {
	console.log("dwqdqwd");
	// Looping through each declared color picker
	for (y in document.getElementsByClassName("color_picker")) {
		// Checking the value isnt a number
		if (isNaN(y) === true) {
			continue;
		}

		console.log(document.getElementsByClassName("color_picker")[y]);

		// Assigning the button with a function to run the color picker
		document.getElementsByClassName("color_picker")[y].onclick = runColorPicker;

		// Getting the default data the user set
		let dataColor = document
			.getElementsByClassName("color_picker")
			[y].getAttribute("data-color");
		document.getElementsByClassName("color_picker")[y].style.background = dataColor;
	}

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
				<input id="hex_input" name="hex_input" type="text" value="#ff0000" spellcheck="false" />
				<br>
				<label for="hex_input" class="label_text">HEX</label>
			</div>
			<div id="rgba" style="display: none;">
				<div class="rgba_divider">
					<input class="rgba_input" name="r" type="text" value="255" spellcheck="false" />
					<br>
					<label for="r" class="label_text">R</label>
				</div>
				<div class="rgba_divider">
					<input class="rgba_input" name="g" type="text" value="255" spellcheck="false" />
					<br>
					<label for="g" class="label_text">G</label>
				</div>
				<div class="rgba_divider">
					<input class="rgba_input" name="b" type="text" value="255" spellcheck="false" />
					<br>
					<label for="b" class="label_text">B</label>
				</div>
				<div class="rgba_divider">
					<input class="rgba_input" name="a" type="text" value="1" spellcheck="false" />
					<br>
					<label for="a" class="label_text">A</label>
				</div>
			</div>
			<div id="hsla" style="display: none;">
				<div class="hsla_divider">
					<input class="hsla_input" name="h" type="text" value="0" spellcheck="false" />
					<br>
					<label for="h" class="label_text">H</label>
				</div>
				<div class="hsla_divider">
					<input class="hsla_input" name="s" type="text" value="50" spellcheck="false" />
					<br>
					<label for="s" class="label_text">S%</label>
				</div>
				<div class="hsla_divider">
					<input class="hsla_input" name="l" type="text" value="100" spellcheck="false" />
					<br>
					<label for="l" class="label_text">L%</label>
				</div>
				<div class="rgba_divider">
					<input class="hsla_input" name="a" type="text" value="1" spellcheck="false" />
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
	const colorPickerContainer = document.createElement("ASIDE");
	colorPickerContainer.id = "color_picker";
	colorPickerContainer.innerHTML = HTMLContent;
	document.getElementsByTagName("BODY")[0].appendChild(colorPickerContainer);

	// Creating a darken background node
	const colorPickerBackground = document.createElement("DIV");
	colorPickerBackground.id = "color_picker_bg";
	document.getElementsByTagName("BODY")[0].appendChild(colorPickerBackground);

	// Checking if a local storage variable has been set
	if (localStorage.getItem("custom_colors") === null) {
		// If not then I set one
		localStorage.setItem("custom_colors", '{"0": []}');
	} else {
		// If it has then I define the LSCustomColors with the value for this
		LSCustomColors = JSON.parse(localStorage.getItem("custom_colors"));

		// Looping through the data to update the DOM with the custom colors
		for (let x = LSCustomColors[0].length - 1; x >= 0; x--) {
			// Creating the element
			let customColorElem = document.createElement("BUTTON");
			customColorElem.className = "custom_colors_preview";
			customColorElem.style.background = LSCustomColors[0][x];
			customColorElem.setAttribute("data-color", LSCustomColors[0][x]);
			// Placing the element in the DOM
			document
				.getElementById("custom_colors_box")
				.insertBefore(
					customColorElem,
					document.getElementById("custom_colors_box").children[0]
				);
		}
	}
})();

// Click anywhere to close a pop-up
document.addEventListener("mousedown", function () {
	// Close context menu
	if (event.target.id != "color_context_menu") {
		document.getElementById("color_context_menu").style.display = "none";
	}
});

// Click the darken background to close the color picker
document.getElementById("color_picker_bg").addEventListener("click", function () {
	// Hiding elements
	document.getElementById("color_picker").style.display = "none";
	document.getElementById("color_picker_bg").style.display = "none";
});
