/*
 * Color Value Converter
 */

// Convert HSLA to RGBA
let HSLAToRGBA = function (h, s, l, a, toHex) {
	// Must be fractions of 1
	s /= 100;
	l /= 100;

	let c = (1 - Math.abs(2 * l - 1)) * s,
		x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
		m = l - c / 2,
		r = 0,
		g = 0,
		b = 0;

	if (0 <= h && h < 60) {
		r = c;
		g = x;
		b = 0;
	} else if (60 <= h && h < 120) {
		r = x;
		g = c;
		b = 0;
	} else if (120 <= h && h < 180) {
		r = 0;
		g = c;
		b = x;
	} else if (180 <= h && h < 240) {
		r = 0;
		g = x;
		b = c;
	} else if (240 <= h && h < 300) {
		r = x;
		g = 0;
		b = c;
	} else if (300 <= h && h < 360) {
		r = c;
		g = 0;
		b = x;
	}

	r = Math.round((r + m) * 255);
	g = Math.round((g + m) * 255);
	b = Math.round((b + m) * 255);

	if (toHex === true) {
		return RGBAToHexA(r, g, b, a);
	} else {
		return {
			r: r,
			g: g,
			b: b,
			a: a,
		};
	}
};

// Convert RGBA to HSLA
let RGBAToHSLA = function (r, g, b, a) {
	console.log(r, g, b, a);
	// Make r, g, and b fractions of 1
	r /= 255;
	g /= 255;
	b /= 255;

	// Find greatest and smallest channel values
	let cmin = Math.min(r, g, b),
		cmax = Math.max(r, g, b),
		delta = cmax - cmin,
		h = 0,
		s = 0,
		l = 0;

	// Calculate hue
	if (delta == 0) h = 0;
	// Red is max
	else if (cmax == r) h = ((g - b) / delta) % 6;
	// Green is max
	else if (cmax == g) h = (b - r) / delta + 2;
	// Blue is max
	else h = (r - g) / delta + 4;

	h = Math.round(h * 60);

	// Make negative hues positive behind 360°
	if (h < 0) h += 360;

	// Calculate lightness
	l = (cmax + cmin) / 2;

	// Calculate saturation
	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

	// Multiply l and s by 100
	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);

	console.log(h, s, l, a);

	return "hsla(" + h + "," + s + "%," + l + "%," + a + ")";
};

// Convert RGBA to HexA
let RGBAToHexA = function (r, g, b, a) {
	r = r.toString(16);
	g = g.toString(16);
	b = b.toString(16);
	a = Math.round(a * 255).toString(16);

	if (r.length == 1) r = "0" + r;
	if (g.length == 1) g = "0" + g;
	if (b.length == 1) b = "0" + b;
	if (a.length == 1) a = "0" + a;

	if (a == "ff") {
		return "#" + r + g + b;
	} else {
		return "#" + r + g + b + a;
	}
};

// Convert HexA to RGBA
let hexAToRGBA = function (h, toHSL) {
	let r = 0,
		g = 0,
		b = 0,
		a = 1;

	if (h.length == 5) {
		r = "0x" + h[1] + h[1];
		g = "0x" + h[2] + h[2];
		b = "0x" + h[3] + h[3];
		a = "0x" + h[4] + h[4];
	} else if (h.length == 9) {
		r = "0x" + h[1] + h[2];
		g = "0x" + h[3] + h[4];
		b = "0x" + h[5] + h[6];
		a = "0x" + h[7] + h[8];
	}

	a = +(a / 255).toFixed(3);

	if (toHSL === true) {
		return RGBAToHSLA(+r, +g, +b, a);
	} else {
		return "rgba(" + +r + "," + +g + "," + +b + "," + a + ")";
	}
};
