/*
 * Saturation and Lightness Box
 */

// Function to handle changes to the saturation and lightness box
let colorBoxHandler = function (positionX, positionY) {
	// Defining the box and dragger
	const boxContainer = document.getElementById("color_box");
	const boxDragger = document.getElementById("box_dragger");

	// Defining X and Y position
	let eventX = positionX - boxContainer.getBoundingClientRect().left;
	let eventY = positionY - boxContainer.getBoundingClientRect().top;

	// Making conditions so that the user don't drag outside the box
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
	const LPercent = Math.round((percentY / 100) * percentX);

	// Applying the Saturation and Lightness to the data object
	colorPicker.saturation = SPercent;
	colorPicker.lightness = LPercent;

	// Full HSLA color
	const HSLA = `hsl(${colorPicker.hue}, ${SPercent}%, ${LPercent}%)`;
	document.getElementsByClassName("color_picker")[0].innerHTML = HSLA;

	// Applying the color to the color preview
	document.getElementById("color_picked_preview").children[0].setAttribute("fill", HSLA);

	// Update the color text values
	updateColorValueInput();
};

// Start box drag listener
document.getElementById("color_box").addEventListener("mousedown", function (event) {
	// Updating the status in the data object
	colorPicker.boxStatus = true;
	// Calling handler function
	colorBoxHandler(event.pageX, event.pageY);
});

// Moving box drag listener
document.addEventListener("mousemove", function (event) {
	// Checking that the drag has started
	if (colorPicker.boxStatus === true) {
		// Calling handler function
		colorBoxHandler(event.pageX, event.pageY);
	}
});

// End box drag listener
document.addEventListener("mouseup", function (event) {
	// Checking that the drag has started
	if (colorPicker.boxStatus === true) {
		// Updating the status in the data object
		colorPicker.boxStatus = false;
	}
});
