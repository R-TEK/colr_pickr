### Features:

-   Drag interactive color picker allowing for easy use of finding colors, including a Saturation and Lightness box, Hue slider and Opacity slider
-   Reads and outputs HEX(with Alpha), RGBA and HSLA color values
-   Save custom colors to re-use on return to the color picker (saved to local storage)
-   Full Touch Support
-   ~4kb file size, meaning a super fast component of your application
-   Flat and modern design interface, inspired by google-chrome-dev tools color picker

### Examples:

-   https://r-tek.github.io/colr_pickr/
-   https://codepen.io/TEK-Projects/pen/mdVRPZa#unsupported-modal

### Getting Started:

###### Installation

-   Install with NPM:
    ```javascript
    Available Soon
    ```

<br />

-   Using the CDN via jsDelivr:
    ```html
    <script
    	type="text/javascript"
    	src="https://cdn.jsdelivr.net/npm/js_color_pickr@1.0.1/build/color_pickr_min.js"
    ></script>
    ```
    ```html
    <link
    	rel="stylesheet"
    	type="text/css"
    	href="https://cdn.jsdelivr.net/npm/js_color_pickr@1.0.1/build/color_pickr_min.css"
    />
    ```

<br />

-   Alternatively, you could clone/download the zip. Under the /build directory, include the `colr_pickr_min.js` and the `colr_pickr_min.css` in your project.

###### Usage

```html
<!-- Add a button to your HTML document and give it any ID -->

<button id="my_picker"></button>

<!-- The rest is in your JavaScript file, or in this case a script tag -->

<script type="text/javascript">
	/*
	 * Create a new ColorPicker instance, which takes 2 parameters
	 *
	 * Parameter 1 [HTMLElement]: the button you want to launch the editor
	 * Parameter 2 [String] (Optional): A color
	 */

	const button = document.getElementById('my_picker');
	let picker = new ColorPicker(button, '#ff0000');

	/*
	 * What do you want to do after you have chosen the color?
	 *
	 * You can specify this in an EventListener, assigned to your button
	 */

	button.addEventListener('colorChange', function (event) {
		// This will give you the color you selected
		const color = event.detail.color;

		// Code to do what you want with that color...
	});

	/*
	 * You can also change the color yourself via JavaScript
	 *
	 * If you want to change the selected color for an instance without using the picker
	 * You can call the following function
	 *
	 * Parameter 1 [String]: Color
	 * Parameter 2 [HTMLElement]: The button that holds the instance / picker launch button
	 */

	colorChange('#ff00ff', button);
</script>
```

### Color Value Information:

When you give the Color Picker a color value to read, it has to be a supported value format.
Colr Pickr support all the popular choices, the table below show all supported value formats:

| Format Name | Example Format              |
| :---------- | :-------------------------- |
| `hex`       | `"#ff0000"`                 |
| `hexAlpha`  | `"#ff0000ff"`               |
| `rgb`       | `"rgb(255, 0, 0)"`          |
| `rgba`      | `"rgb(255, 0, 0, 1)"`       |
| `hsl`       | `"hsl(360, 100%, 50%)"`     |
| `hsla`      | `"hsla(360, 100%, 50%, 1)"` |

### Change Log

You can check out the change log for information on latest updates here:
https://github.com/R-TEK/colr_pickr/blob/master/CHANGELOG.md

### License

The MIT License - see the link below for more details:
https://github.com/R-TEK/colr_pickr/blob/master/LICENSE

---

&copy; [R-TEK](https://github.com/R-TEK)
