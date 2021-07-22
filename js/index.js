const canvas = document.getElementById('canvas');
const speed = document.getElementById('speed');
const ctx = canvas.getContext('2d');

canvas.width = document.body.offsetWidth;
canvas.height = document.body.offsetHeight;

const SETTINGS = {
	canvas: {
		width: canvas.width,
		height: canvas.height,
	},

	vertex: {
		a: {
			x: {
				per: 50,

				px() {
					return (this.canvas.width / 100) * this.vertex.a.x.per;
				},
			},
			y: {
				per: 10,
				px() {
					return (this.canvas.height / 100) * this.vertex.a.y.per;
				},
			},
		},
		b: {
			x: {
				per: 80,
				px() {
					return (this.canvas.width / 100) * this.vertex.b.x.per;
				},
			},
			y: {
				per: 70,
				px() {
					return (this.canvas.height / 100) * this.vertex.b.y.per;
				},
			},
		},
		c: {
			x: {
				per: 20,
				px() {
					return (this.canvas.width / 100) * this.vertex.c.x.per;
				},
			},
			y: {
				per: 70,
				px() {
					return (this.canvas.height / 100) * this.vertex.c.y.per;
				},
			},
		},
	},

	fps: speed.value || 60,

	countDots: 0,

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

const randDots = [];

speed.addEventListener('input', (e) => {
	if (e) {
		SETTINGS.fps = +e.target.value;
	}
});

init();

function init() {
	// window.requestAnimationFrame(draw);
	draw();
}

function draw() {
	const cnv = SETTINGS.getCanvasSize();
	const ver = SETTINGS.vertex;

	if (randDots.length === 0) {
		randDots.push({
			x: {
				per: random(0, 100, false),
				px() {
					return (this.canvas.height / 100) * this.x.per;
				},
			},
			y: {
				per: random(0, 100, false),
				px() {
					return (this.canvas.height / 100) * this.x.per;
				},
			},
		});
	} else {
		switch (goTo()) {
			case 'A':
				randDots.push(calcNewDot(ver.a));
				break;
			case 'B':
				randDots.push(calcNewDot(ver.b));
				break;
			case 'C':
				randDots.push(calcNewDot(ver.c));
				break;

			default:
				break;
		}
	}

	ctx.globalCompositeOperation = 'destination-over';
	ctx.clearRect(0, 0, cnv.width, cnv.height);

	// ctx.fillStyle = 'rgb(47, 56, 71)';
	ctx.fillStyle = 'rgba(240,240,255,0.9)';
	ctx.strokeStyle = 'rgba(220,220,255,0.8)';
	ctx.save();
	// рисуем позиции A, B, C

	// A
	ctx.font = '100 25px serif';
	ctx.fillText('A', (cnv.width / 100) * 49.5, (cnv.height / 100) * 8);
	arc(ver.a.x.per, ver.a.y.per, 3);
	// B
	ctx.fillText('B', (cnv.width / 100) * 81.5, (cnv.height / 100) * 72);
	arc(ver.b.x.per, ver.b.y.per, 3);
	// c
	ctx.fillText('C', (cnv.width / 100) * 17, (cnv.height / 100) * 72);
	arc(ver.c.x.per, ver.c.y.per, 3);

	// рисуем рандомные точки
	randDots.forEach((dot) => {
		arc(dot.x.per, dot.y.per);
	});
	// console.log(1000 / SETTINGS.fps);
	setTimeout(draw, 1000 / SETTINGS.fps);
	// window.requestAnimationFrame(draw);
}

function calcNewDot(ver) {
	const dot = randDots[randDots.length - 1];

	const pos = {
		x: {
			per: +dot.x.per + (ver.x.per - +dot.x.per) / 2,
			px() {
				return (canvas.width / 100) * this.x.per;
			},
		},
		y: {
			per: +dot.y.per + (ver.y.per - +dot.y.per) / 2,
			px() {
				return (canvas.height / 100) * this.y.per;
			},
		},
	};

	return pos;
}

function arc(x, y, r = 1) {
	const cnv = SETTINGS.getCanvasSize();
	let xx = (cnv.width / 100) * x;
	let yy = (cnv.height / 100) * y;
	ctx.beginPath();
	ctx.arc(xx.toFixed(2), yy.toFixed(2), r, 0, Math.PI * 2);
	ctx.fill();
}

function rand() {
	return Math.floor(Math.random() * 6 + 1);
}

function random(a, b, fixed = true) {
	if (fixed) {
		return Math.floor(Math.random() * b + a);
	}
	return +(Math.random() * b + a).toFixed(2);
}

function goTo() {
	const n = rand();

	if (n === 1 || n === 2) {
		return 'A';
	} else if (n === 3 || n === 4) {
		return 'B';
	} else if (n === 5 || n === 6) {
		return 'C';
	} else {
		console.warn('rand is error: not finded variant');
	}
}

window.addEventListener('resize', (e) => {
	SETTINGS.setCanvasSize({
		width: canvas.offsetWidth,
		height: canvas.offsetHeight,
	});
});
