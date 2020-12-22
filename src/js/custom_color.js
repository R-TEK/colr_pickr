/**
 * Custom Colors
 */

/**
 * @memberof picker
 * @method getCustomColors
 * @description Gets an array of all the saved custom colors
 *
 * @example
 * const savedColor = picker.getCustomColors();
 */
picker.getCustomColors = function () {
	return picker.LSCustomColors[0];
};

// Click on color listener to update the picker
document.getElementById('custom_colors_box').addEventListener('click', function (event) {
	// Making sure the users has selected a color preview
	if (event.target.className == 'custom_colors_preview') {
		// Color
		const color = event.target.getAttribute('data-custom-color');

		// Updating the picker with that color
		picker.updateColorDisplays(color);

		// Update
		updatePicker();
	}
});

// Function to add a new custom color
picker.addCustomColor = function () {
	// Limiting a custom color to two rows
	if (picker.LSCustomColors[0].length == 19)
		document.getElementById('custom_colors_add').style.display = 'none';

	// Getting the color
	const color = `hsla(${picker.hue}, ${picker.saturation}%, ${picker.lightness}%, ${picker.alpha})`;

	// Creating the element
	let customColorElem = document.createElement('BUTTON');
	customColorElem.className = 'custom_colors_preview';
	customColorElem.style.background = color;
	customColorElem.setAttribute('data-custom-color', color);

	// Placing the element in the DOM
	document.getElementById('custom_colors_box').appendChild(customColorElem);

	// Pushing the color to the top of the array
	picker.LSCustomColors[0].unshift(color);

	// Try updating the local storage with the new custom color
	try {
		localStorage.setItem('custom_colors', JSON.stringify(picker.LSCustomColors));
	}
	catch {}
};
document.getElementById('custom_colors_add').addEventListener('click', function () {
	picker.addCustomColor();
});

// Event to fire for a context menu
document.getElementById('custom_colors_box').addEventListener('contextmenu', function (event) {
	// Making sure the users has selected a color preview
	if (event.target.className == 'custom_colors_preview') {
		// Preventing default
		event.preventDefault();

		// Defining the context menu
		const colorPicker = document.getElementById('color_picker');
		const contextMenu = document.getElementById('color_context_menu');

		// Defining position
		let top = event.target.getBoundingClientRect().top - 62;
		let left = event.target.getBoundingClientRect().left;

		// If the context menu will show up offscreen...
		if (left + 115 > colorPicker.getBoundingClientRect().left + colorPicker.offsetWidth)
			// Move it back
			left = event.target.getBoundingClientRect().left - 96;

		// Updating the styling of the menu
		contextMenu.style.display = 'block';
		contextMenu.style.top = top + 'px';
		contextMenu.style.left = left + 'px';

		// Defining the color selected
		picker.contextMenuElem = event.target;
	}
});

// Clears a selected custom color
picker.clearSingleCustomColor = function (element) {
	const elemToRemove = element === undefined ? picker.contextMenuElem : element;

	// Removing the element
	document.getElementById('custom_colors_box').removeChild(elemToRemove);

	// Clearing the variable
	picker.LSCustomColors = { 0: [] };

	// Looping through the custom colors to repopulate the variable
	for (let x in document.getElementsByClassName('custom_colors_preview')) {
		// Continuing if its a number
		if (isNaN(x) === true) {
			continue;
		}

		// Pushing the colors to the array
		picker.LSCustomColors[0].push(
			document
				.getElementsByClassName('custom_colors_preview')
				[x].getAttribute('data-custom-color')
		);
	}

	// Try updating the local storage
	try {
		localStorage.setItem('custom_colors', JSON.stringify(picker.LSCustomColors));
	}
	catch {}

	// Making sure the add color button is displaying
	document.getElementById('custom_colors_add').style.display = 'inline-block';
};
document.getElementById('color_clear_single').addEventListener('mousedown', function () {
	picker.clearSingleCustomColor();
});

// Clears all custom colors
picker.clearAllCustomColors = function () {
	// Clearing variable
	picker.LSCustomColors = { 0: [] };

	// Looping through the custom colors to repopulate the variable
	while (document.getElementsByClassName('custom_colors_preview').length > 0) {
		document
			.getElementById('custom_colors_box')
			.removeChild(document.getElementsByClassName('custom_colors_preview')[0]);
	}

	// Try updating the local storage
	try {
		localStorage.setItem('custom_colors', JSON.stringify(picker.LSCustomColors));
	}
	catch {}

	// Making sure the add color button is displaying
	document.getElementById('custom_colors_add').style.display = 'inline-block';
};
document.getElementById('color_clear_all').addEventListener('mousedown', function () {
	picker.clearAllCustomColors();
});
