const canvas = document.querySelector("#draw");
const context = canvas.getContext("2d");
const inputs = document.querySelectorAll(".controls input");
const inputWidth = document.getElementById("line");

function handleUpdate() {
  const suffix = this.dataset.sizing || "";
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
};

function handleWidth(size) {
  context.lineWidth = size;
};

function handleColor(color) {
  context.strokeStyle = color;
  console.log(context.strokeStyle);
}

inputs.forEach(input => input.addEventListener("change", handleUpdate));
inputs.forEach(input => input.addEventListener("mousemove", handleUpdate));


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.lineJoin = "round";
context.lineCap = "round";
context.strokeStyle = "#3A47E7";

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return;
  console.log(e);
  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineTo(e.offsetX, e.offsetY);
  context.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY]; //destructuring an array

};

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);