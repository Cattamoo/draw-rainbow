const CANVAS_W = window.innerWidth;
const CANVAS_H = window.innerHeight;

const DEFAULT_BRUSH_SIZE = 5;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const randomSize = (max = 100) => {
	return Math.round(Math.random() * max)
}
const randomColor = () => {
	return randomSize(255).toString(16).padStart(2, '0');
}

// default //
canvas.width = CANVAS_W;
canvas.height = CANVAS_H;
ctx.lineCap = 'round';
const initSizeAndColor = () => {
	ctx.globalCompositeOperation = 'source-over';
	lineWidth.value = DEFAULT_BRUSH_SIZE;
	ctx.lineWidth = DEFAULT_BRUSH_SIZE;
	document.querySelector('#size label').style.width = `${DEFAULT_BRUSH_SIZE}px`;
	document.querySelector('#size label').style.height = `${DEFAULT_BRUSH_SIZE}px`;
}

// Brush Size //
const lineWidth = document.querySelector('#line-width');
lineWidth.addEventListener('change', ({ target }) => {
	ctx.lineWidth = target.value;
});
lineWidth.addEventListener('input', ({ target }) => {
	document.querySelector('#size label').style.width = `${target.value}px`;
	document.querySelector('#size label').style.height = `${target.value}px`;
});
ctx.lineWidth = lineWidth.value;

// Draw //
let isPainting = false;
let gradient = null;
const handleDrawStart = () => {
	ctx.beginPath();
	isPainting = true;
	gradient = ctx.createLinearGradient(
		randomSize(CANVAS_W),
		randomSize(CANVAS_H),
		randomSize(CANVAS_W),
		randomSize(CANVAS_H)
	);
	gradient.addColorStop(0, `#${randomColor()}${randomColor()}${randomColor()}`);
	gradient.addColorStop(0.5 ,`#${randomColor()}${randomColor()}${randomColor()}`);
	gradient.addColorStop(1.0, `#${randomColor()}${randomColor()}${randomColor()}`);
}
const handleDrawing = (e) => {
	const { clientX: x, clientY: y } = e.touches ? e.touches[0] : e;
	if(isPainting) {
		ctx.strokeStyle = gradient;
		ctx.lineTo(x, y);
		ctx.stroke();
		return;
	}
	ctx.moveTo(x, y);
}
const handleDrawEnd = () => {
	isPainting = false;
}
canvas.addEventListener('mousedown', handleDrawStart);
canvas.addEventListener('touchstart', handleDrawStart);
canvas.addEventListener('mousemove', handleDrawing);
canvas.addEventListener('touchmove', handleDrawing);
document.addEventListener('mouseup', handleDrawEnd);
document.addEventListener('touchend', handleDrawEnd);
document.addEventListener('scroll', (e) => {e.preventDefault()}, {passive: false})

initSizeAndColor();