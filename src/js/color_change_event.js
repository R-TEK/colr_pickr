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
