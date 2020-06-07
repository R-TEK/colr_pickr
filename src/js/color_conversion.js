/*
 * Color Value Converter
 */

// Function to convert HSL into HEX
let hslToHex = function (h, s, l) {
	let r, g, b, m, c, x;

	if (!isFinite(h)) h = 0;
	if (!isFinite(s)) s = 0;
	if (!isFinite(l)) l = 0;

	h /= 60;
	if (h < 0) h = 6 - (-h % 6);
	h %= 6;

	s = Math.max(0, Math.min(1, s / 100));
	l = Math.max(0, Math.min(1, l / 100));

	c = (1 - Math.abs(2 * l - 1)) * s;
	x = c * (1 - Math.abs((h % 2) - 1));

	if (h < 1) {
		r = c;
		g = x;
		b = 0;
	} else if (h < 2) {
		r = x;
		g = c;
		b = 0;
	} else if (h < 3) {
		r = 0;
		g = c;
		b = x;
	} else if (h < 4) {
		r = 0;
		g = x;
		b = c;
	} else if (h < 5) {
		r = x;
		g = 0;
		b = c;
	} else {
		r = c;
		g = 0;
		b = x;
	}

	m = l - c / 2;
	r = Math.round((r + m) * 255);
	g = Math.round((g + m) * 255);
	b = Math.round((b + m) * 255);

	r = r.toString(16);
	r = r.length == 1 ? "0" + r : r;

	g = g.toString(16);
	g = g.length == 1 ? "0" + g : g;

	b = b.toString(16);
	b = b.length == 1 ? "0" + b : b;

	return "#" + r + g + b;
};

// Function to convert HEX into HSL
let hexToHsl = function (hex, format) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

	r = parseInt(result[1], 16);
	g = parseInt(result[2], 16);
	b = parseInt(result[3], 16);

	let r1 = r / 255;
	let g1 = g / 255;
	let b1 = b / 255;

	let maxColor = Math.max(r1, g1, b1);
	let minColor = Math.min(r1, g1, b1);

	let L = (maxColor + minColor) / 2;
	let S = 0;
	let H = 0;

	if (maxColor != minColor) {
		if (L < 0.5) {
			S = (maxColor - minColor) / (maxColor + minColor);
		} else {
			S = (maxColor - minColor) / (2.0 - maxColor - minColor);
		}

		if (r1 == maxColor) {
			H = (g1 - b1) / (maxColor - minColor);
		} else if (g1 == maxColor) {
			H = 2.0 + (b1 - r1) / (maxColor - minColor);
		} else {
			H = 4.0 + (r1 - g1) / (maxColor - minColor);
		}
	}

	L = L * 100;
	S = S * 100;
	H = H * 60;

	if (H < 0) {
		H += 360;
	}

	if (format == true) {
		return {
			hue: H,
			saturation: S,
			lightness: L,
		};
	} else {
		return `hsl(${H}, ${S}%, ${L}%)`;
	}
};
