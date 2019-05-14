(function () {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const quads = [];
  const size = 2;
  const gridWidth = 60;
  const gridHeight = 60;
  const target = { x: 0, y: 0 };
  const startPos = { x: 0, y: 0 };
  const colors = ["red", "cyan", "teal", "maroon"];
  const offset = 5;
  let updateCount = 0;

  const init = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    startPos.x = canvas.width / 4;
    startPos.y = canvas.height / 4 - 50;

    for (let i = 0; i < gridWidth; i++) {
      for (let j = 0; j < gridHeight; j++) {
        let quad = new Quad(startPos.x + i * (size + 5), startPos.y + j * (size + 5), size, size);
        quads.push(quad);
      }
    }
  };

  const animate = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    updateCount++;

    if (updateCount >= offset) {
      updateCount = 0;
      target.x = Math.random() * (gridWidth * (size + 5)) + startPos.x;
      target.y = Math.random() * (gridHeight * (size + 5)) + startPos.y;
    }

    for (let i = 0; i < quads.length; i++) {
      const quad = quads[i];
      const dx = quad.x - target.x;
      const dy = quad.y - target.y;
      const radius = 40;
      const angle = Math.atan2(dy, dx);
      const distance = Math.sqrt(dx * dx + dy * dy);
      const xVel = Math.cos(angle) * (10 / distance) * radius;
      const yVel = Math.sin(angle) * (10 / distance) * radius;

      quad.draw(xVel, yVel);
    }
  };

  const frame = function () {
    animate();
    requestAnimationFrame(frame);
  };

  function Quad(x, y, width, height) {
    this.x = x;
    this.y = y;
    let color = undefined;

    color = colors[Math.round(Math.random() * colors.length)];
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
    context.stroke();

    this.draw = function (xVel, yVel) {
      const factor = (canvas.height - this.y) * 0.008;
      context.fillStyle = color;
      this.x += xVel;
      this.y += yVel;
      context.fillRect(this.x, this.y, width * factor, height * factor);
    };
  }

  init();
  frame();
})();