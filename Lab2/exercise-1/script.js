// Canvas setup
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Canvas dimensions (for alignment calculations)
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

/* ================================
   Aligned Filled Rectangle (Left)
================================ */
const rectX = 40;
const rectY = 50;
const rectWidth = 120;
const rectHeight = 80;

ctx.fillStyle = "#af4c89ff";
ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

/* ================================
   Aligned Filled Circle (Center)
================================ */
const circleX = CANVAS_WIDTH / 2;
const circleY = rectY + rectHeight / 2;
const circleRadius = 40;

ctx.beginPath();
ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
ctx.fillStyle = "#22c8ffff";
ctx.fill();

/* ================================
   Straight Line (Baseline Alignment)
================================ */
const lineY = 190;

ctx.beginPath();
ctx.moveTo(40, lineY);
ctx.lineTo(CANVAS_WIDTH - 40, lineY);
ctx.strokeStyle = "#425464ff";
ctx.lineWidth = 3;
ctx.stroke();

/* ================================
   Centered Text (Bottom)
================================ */
ctx.font = "24px Arial";
ctx.fillStyle = "#000000";

// Center text horizontally
const text = "HTML5 Canvas";
const textWidth = ctx.measureText(text).width;
const textX = (CANVAS_WIDTH - textWidth) / 2;
const textY = 260;

ctx.fillText(text, textX, textY);
