var menu = new Vue({
	el: '#app',
	data: {},
	methods: {},
	mounted() { }
});

let c = document.createElement('canvas'), pat = document.querySelector('.canvas-pat'), container = document.querySelector('.canvas-container')
pat.style.height = window.getComputedStyle(pat).getPropertyValue('width')
c.classList = 'canvas'
c.setAttribute('width', parseInt(window.getComputedStyle(pat).getPropertyValue('width')))
c.setAttribute('height', parseInt(window.getComputedStyle(pat).getPropertyValue('height')))
pat.after(c)
pat.remove()

let canvas = document.querySelector('.canvas');

document.addEventListener('DOMContentLoaded', () => {
	mainFunc();
})

let ctx = canvas.getContext('2d');
let pi = Math.PI;

function clean() {
	ctx.fillStyle = window.getComputedStyle(canvas).getPropertyValue('background-color');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var mas = [];
var mas2 = [];
var generalMass = [];
var Sw = 10,
	Sh = 10,
	nw = canvas.width / Sw,
	nh = canvas.height / Sh,
	count = 0,
	timer,
	logString = '',
	number = 1,
	writtenMessage = false;


function cleanField() {
	for (let i = 0; i < Sh; i++) {
		for (let j = 0; j < Sw; j++) {
			if (mas[i][j] == 1) {
				ctx.fillStyle = '#ffffff';
				ctx.fillRect(j * nw, i * nh, nw, nh);
				mas[i][j] = 0;
			}
		}
	}
	clean();
	document.querySelector('.count').innerHTML = 0;
	count = 0;
	number = 1;
	clearTimeout(timer);
	generalMass = [];
	document.querySelector('.answer').innerHTML = '<span style="color: #000000">Not answer.</span>';
	writtenMessage = false;
}

function cloneMass(massInput, massOutput) {
	massOutput = [];
	for (let i = 0; i < massInput.length; i++) {
		massOutput[i] = [];
		for (let j = 0; j < massInput[i].length; j++) {
			massOutput[i][j] = massInput[i][j];
		}
	}
}

function startLife() {
	document.querySelector('.answer').innerHTML = '<span style="color: #000000">Not answer.</span>';

	mas2 = [];
	for (let i = 0; i < Sh; i++) {
		mas2[i] = [];
		for (let j = 0; j < Sw; j++) {
			var neighbors = 0;
			if (mas[checkTop(i) - 1][j] == 1) neighbors++;	//top
			if (mas[i][checkRight(j) + 1] == 1) neighbors++;	//right
			if (mas[checkBottom(i) + 1][j] == 1) neighbors++;	//bottom
			if (mas[i][checkLeft(j) - 1] == 1) neighbors++;	//left

			if (mas[checkTop(i) - 1][checkRight(j) + 1]) neighbors++;	//up-right
			if (mas[checkBottom(i) + 1][checkRight(j) + 1]) neighbors++;	//bottom-right
			if (mas[checkBottom(i) + 1][checkLeft(j) - 1]) neighbors++;	//bottom-left
			if (mas[checkTop(i) - 1][checkLeft(j) - 1]) neighbors++;	//top-left

			switch (neighbors) {
				case 2:
					if (mas[i][j] == 0) {
						mas2[i][j] = 0;
					} else {
						mas2[i][j] = 1;
					}
					break;

				case 3:
					mas2[i][j] = 1;
					break;

				default:
					mas2[i][j] = 0
					break;
			}

			// switch (neighbors) {
			// 	case 2:
			// 		mas2[i][j] = 1;
			// 		break;
			// 	case 3:
			// 		mas2[i][j] = 1;
			// 		break;
			// 	default:
			// 		mas2[i][j] = 0;
			// 		break;
			// };
		};
	};


	mas = mas2;
	drawField();

	if (isNullMass(generalMass[generalMass.length - 1])) {
		document.querySelector('.answer').innerHTML = 'Stoped. The Life is dead.';
		clearTimeout(timer);
		return;
	};

	if (!writtenMessage) {
		for (let l = 0; l < generalMass.length; l++) {
			if (equalMass(generalMass[l], mas)) {
				writtenMessage = true;
				document.querySelector('.answer').innerHTML = 'Stoped. Pattern repeated. Click Play to continue.';
				count++;
				clearTimeout(timer);
				return;
			}
		};
	}


	count++;
	generalMass[count] = mas;
	document.querySelector('.count').innerHTML = count;

	timer = setTimeout(startLife, 100);
}

function checkTop(i) {
	if (i == 0) {
		return Sh;
	} else {
		return i;
	}
}
function checkRight(i) {
	if (i == Sw - 1) {
		return -1;
	} else {
		return i;
	}
}
function checkBottom(i) {
	if (i == Sh - 1) {
		return -1;
	} else {
		return i;
	}
}
function checkLeft(i) {
	if (i == 0) {
		return Sw;
	} else {
		return i;
	}
}

function drawField() {
	clean();
	for (let i = 0; i < Sh; i++) {
		for (let j = 0; j < Sw; j++) {
			if (mas[i][j] == 1) {
				ctx.fillStyle = '#000000';
				ctx.fillRect(j * nw, i * nh, nw, nh);
			}
		}
	}
}

function equalMass(mass1, mass2) {
	if (mass1.length == mass2.length) {
		for (let i = 0; i < mass1.length; i++) {
			if (mass1[i].length == mass2[i].length) {
				for (let j = 0; j < mass1[i].length; j++) {
					if (mass1[i][j] != mass2[i][j]) return false;;
				};
			} else return false;
		};
	} else return false;
	return true;
}

function isNullMass(mass) {
	for (let i = 0; i < mass.length; i++) {
		for (let j = 0; j < mass[i].length; j++) {
			if (mass[i][j] != 0) return false;
		}
	}
	return true;
}

function randomLife() {
	for (let i = 0; i < Sh; i++) {
		mas[i] = [];
		for (let j = 0; j < Sw; j++) {
			mas[i][j] = Math.round(Math.random());
		}
	}
	drawField();
	generalMass[0] = mas;

}





function mainFunc() {
	for (let i = 0; i < Sh; i++) {
		mas[i] = [];
		for (let j = 0; j < Sw; j++) {
			mas[i][j] = 0;
		}
	}

	canvas.onclick = function (event) {
		var x = event.offsetX,
			y = event.offsetY;
		x = Math.floor(x / nw);
		y = Math.floor(y / nh);
		if (mas[y][x] == 1) {
			mas[y][x] = 0;
		} else {
			mas[y][x] = 1;
		}
		drawField();
		generalMass[0] = mas;
	}
};

