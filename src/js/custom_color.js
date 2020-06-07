/*
 * Custom Colors
 */

// Function to add a new custom color
let addCustomColor = function () {
	// Getting the color
	const color = `hsl(${colorPicker.hue}, ${colorPicker.saturation}%, ${colorPicker.lightness}%)`;

	// Creating the element
	let customColorElem = document.createElement("BUTTON");
	customColorElem.className = "custom_colors_preview";
	customColorElem.style.background = color;
	customColorElem.setAttribute("data-color", color);
	// Placing the element in the DOM
	document
		.getElementById("custom_colors_box")
		.insertBefore(customColorElem, document.getElementById("custom_colors_box").children[0]);

	// Pushing the color to the top of the array
	LSCustomColors[0].unshift(color);

	// Updating the local storage with the new custom color
	localStorage.setItem("custom_colors", JSON.stringify(LSCustomColors));
};
document.getElementById("custom_colors_add").addEventListener("click", function () {
	addCustomColor();
});

// Event to fire for a context menu
document.getElementById("custom_colors_box").addEventListener("contextmenu", function (event) {
	// Making sure the users has selected a color preview
	if (event.target.className == "custom_colors_preview") {
		// Preventing default
		event.preventDefault();

		// Defining the context menu
		const contextMenu = document.getElementById("color_context_menu");

		// Updating the styling of the menu
		contextMenu.style.display = "block";
		contextMenu.style.top = event.target.getBoundingClientRect().top + 25 + "px";
		contextMenu.style.left = event.target.getBoundingClientRect().left + "px";

		// Defining the color selected
		colorPicker.contextMenuElem = event.target;
	}
});

// Clears a selected custom color
let clearSingleCustomColor = function () {
	console.log("wef");
	// Removing the element
	document.getElementById("custom_colors_box").removeChild(colorPicker.contextMenuElem);

	// Clearing the variable
	LSCustomColors = { "0": [] };

	// Looping through the custom colors to repopulate the variable
	for (x in document.getElementsByClassName("custom_colors_preview")) {
		// Continuing if its a number
		if (isNaN(x) === true) {
			continue;
		}

		// Pushing the colors to the array
		LSCustomColors[0].push(
			document.getElementsByClassName("custom_colors_preview")[x].getAttribute("data-color")
		);
	}

	// Updating the local storage
	localStorage.setItem("custom_colors", JSON.stringify(LSCustomColors));
};
document.getElementById("color_clear_single").addEventListener("mousedown", function () {
	clearSingleCustomColor();
});

// Clears all custom colors
let clearAllCustomColors = function () {
	// Clearing variable
	LSCustomColors = { "0": [] };

	// Looping through the custom colors to repopulate the variable
	while (document.getElementsByClassName("custom_colors_preview").length > 0) {
		document
			.getElementById("custom_colors_box")
			.removeChild(document.getElementsByClassName("custom_colors_preview")[0]);
	}

	// Updating the local storage
	localStorage.setItem("custom_colors", JSON.stringify(LSCustomColors));
};
document.getElementById("color_clear_all").addEventListener("mousedown", function () {
	clearAllCustomColors();
});
