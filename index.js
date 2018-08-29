window.onload = function() {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const quads = [];
  const size = 2;
  const gridWidth = 60;
  const gridHeight = 60;
  const target = {
    x: 0,
    y: 0
  };
  const startPos = {
    x: 200,
    y: 150
  }
  const colors = ["red", "cyan", "teal", "maroon"];
  let count = 0;

  const frame = function() {
    if (quads.length) animate();
    requestAnimationFrame(frame);
  }

  const init = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < gridWidth; i++) {
      for (let j = 0; j < gridHeight; j++) {
        let quad = new Quad(startPos.x + i * (size + 5), startPos.y + j * (size + 5), size, size);
        quads.push(quad);
      }
    }
    randomize();
  }

  const randomize = function() {
    target.x = Math.random() * (gridWidth * (size + 5)) + startPos.x;
    target.y = Math.random() * (gridHeight * (size + 5)) + startPos.y;
  }

  const animate = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    count ++;

    if (count % 5 === 0) {
      count = 0;
      randomize();
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
  }

  function Quad(x, y, width, height) {
    this.x = x;
    this.y = y;
    let color = undefined;

    this.init = function(x, y, width, height) {
      color = colors[Math.round(Math.random() * colors.length)];
      context.fillStyle = color;
      context.fillRect(x, y, width, height);
      context.stroke();
    }

    this.draw = function(xVel, yVel) {
      const factor = (canvas.height - this.y) * 0.008;
      context.fillStyle = color;
      this.x += xVel;
      this.y += yVel;
      context.fillRect(this.x, this.y, width * factor, height * factor);
    }

    this.init(x, y, width, height);
  }

  requestAnimationFrame(frame);

  init();
}
