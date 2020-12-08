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
