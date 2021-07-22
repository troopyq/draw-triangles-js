const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = document.body.offsetWidth;
canvas.height = document.body.offsetHeight;

const SETTINGS = {
	canvas: {
		width: canvas.width,
		height: canvas.height,
	},

	setCanvasSize({ width: w, height: h }) {
		w = +w;
		h = +h;
		if (w >= 0 && h >= 0) {
			this.canvas.width = w;
			this.canvas.height = h;
		}
	},

	getCanvasSize() {
		return this.canvas;
	},
};

window.addEventListener('resize', (e) => {
	SETTINGS.setCanvasSize({
		width: canvas.offsetWidth,
		height: canvas.offsetHeight,
	});
});
