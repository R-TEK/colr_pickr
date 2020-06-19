// Manipulating the Color Picker to stay in a certain space for view purposes
document.addEventListener(
	'DOMContentLoaded',
	function () {
		// Defining Picker
		const picker = document.getElementById('color_picker');

		// Displaying the picker
		picker.style.display = 'block';

		// Removing Picker from DOM
		document.getElementsByTagName('BODY')[0].removeChild(picker);

		// Replace Picker in DOM
		document.getElementById('picker_container').appendChild(picker);

		// Necessary style changes
		picker.style.position = 'relative';
		picker.style['text-align'] = 'left';
		document.getElementById('hex_input').value = '#ff0000';
		document.getElementById('custom_colors_box').style['text-align'] = 'left';
		document.getElementById('custom_colors_title').style['text-align'] = 'left';
		document.getElementById('color_picked_preview').style['text-align'] = 'left';
	},
	{ passive: true }
);

// Typeit animation
new TypeIt('#desc', {
	speed: 50
}).go();
