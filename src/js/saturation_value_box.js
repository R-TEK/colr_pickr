/**
 * Saturation and Value Box
 */

// Function to handle changes to the saturation and lightness box
colorPickerComp.colorBoxHandler = function (positionX, positionY, touch) {
    // Defining the box and dragger
    const boxContainer = document.getElementById('color_box');
    const boxDragger = document.getElementById('box_dragger');

    // Defining X and Y position, Y differently works with scroll so I make conditions for that
    let eventX = positionX - boxContainer.getBoundingClientRect().left;
    let eventY =
        touch === true ?
        positionY - boxContainer.getBoundingClientRect().top :
        positionY -
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

    const s = (eventX - 14) / 238;
    const v = 1 - (eventY - 14) / 105;

    //formulas from https://stackoverflow.com/a/54116681/4228964
    let l = v - v * s / 2;

    // Calculating the LPercent
    const LPercent = l * 100;
    // Calculating the SPercent
    const SPercent = (l == 0 || l == 1 ? 0 : (v - l) / Math.min(l, 1 - l)) * 100;

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
    }, {
        passive: true
    }
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
    }, {
        passive: false
    }
);

// End box drag on touch
document.addEventListener('touchend', function () {
    // Checking that the touch drag has started
    if (colorPickerComp.boxStatusTouch === true) {
        // Calling the handler function
        colorPickerComp.boxStatusTouch = false;
    }
});
