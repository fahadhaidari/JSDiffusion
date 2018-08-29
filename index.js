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
  const grid = [];
  const colors = ["red", "cyan", "teal", "maroon"];
  let count = 0;

  const frame = function() {
    if (quads.length) {
      animate();
    }
    requestAnimationFrame(frame);
  }

  const init = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (var i = 0; i < 60; i++) {
      grid[i] = [];
      for (var j = 0; j < 60; j++) {
        var quad = new Quad(200 + i * (size + 5), 150 + j * (size + 5), size, size);
        grid[i][j] = quad;
        quads.push(quad);
      }
    }
    randomize();
  }

  const randomize = function() {
    target.x = Math.random() * grid[gridWidth - 1][0].x;
    target.y = Math.random() * grid[0][gridHeight - 1].y;
  }

  const animate = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    count ++;

    if (count % 5 === 0) {
      count = 0;
      randomize();
    }

    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[i].length; j++) {
        const activeGrid = grid[i][j];
        const dx = activeGrid.x - target.x;
        const dy = activeGrid.y - target.y;
        const radius = 40;
        const angle = Math.atan2(dy, dx);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const xVel = Math.cos(angle) * (10 / distance) * radius;
        const yVel = Math.sin(angle) * (10 / distance) * radius;

        activeGrid.x += xVel;
        activeGrid.y += yVel;
        activeGrid.draw();
      }
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

    this.draw = function() {
      const factor = (canvas.height - this.y) * 0.008;
      context.fillStyle = color;
      context.fillRect(this.x, this.y, width * factor, height * factor);
    }

    this.init(x, y, width, height);
  }

  requestAnimationFrame(frame);

  init();
}
