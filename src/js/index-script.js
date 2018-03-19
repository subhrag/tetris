  var canvas = document.getElementById("testCanvas");
  var ctx = canvas.getContext("2d");
  var canvas_width = 300;
  var canvas_height = 400;
  canvas.height = canvas_height;
  canvas.width = canvas_width;
  var blockSize = 10;
  var speedX = 2;
  var speedY = 5;
  var shapes = [];
  var fps;
  var shapesArray = [
      [
          [0, 0, 0],
          [1, 1, 1],
          [0, 1, 0]
      ],
      [
          [1, 1, 0],
          [1, 0, 0],
          [1, 0, 0]
      ],
      [
          [0, 0, 0],
          [1, 1, 0],
          [1, 1, 0]
      ]
  ];

  var grid = [];

  for (r = 0; r < canvas_width; r += 10) {
      grid[r] = [];
      for (c = 0; c < canvas_height; c += 10) {
          grid[r][c] = "";
          //  console.log(gameBoard[r][c]);
      }
  }

  function createGrid() {
      var fs = ctx.fillStyle;
      for (r = 0; r < canvas_width; r += 10) {
          grid[r] = [];
          for (c = 0; c < canvas_height; c += 10) {
              grid[r][c] = "rgb(113, 184, 172)";
              ctx.fillStyle = grid[r][c];
              ctx.fillRect(r, c, blockSize, blockSize);
              ctx.strokeStyle = "rgb(194, 204, 202)";
              ctx.strokeRect(r, c, blockSize, blockSize);

          }
      }
      // ctx.fillStyle = fs;
  }

  var game = {
      start: function() {
          update();
          createNewShape();
      }
  }

  function createNewShape() {

      var shape = new Shape();
      shapes.push(shape);
      // console.log('last of createNewShape');
  }

  function randomNum(max, min) {
      return Math.floor(Math.random() * (max - min)) + min;
  }

  var Shape = function() {
      this.width = blockSize * 3;
      this.height = blockSize * 3;
      this.posY = 0;
      this.posX = canvas_width / 2;
      this.min = 0;
      this.max = shapesArray.length;
      this.color = "red";
      this.random = randomNum(this.max, this.min);
      this.shapeOrder = shapesArray[this.random];
      this.active = true;
      this.painted = false;
      this.collided = false;
      //var that = this;

      this.update = function() {
          //  console.log('in shape this.update');
          if (this.active) {
              this.posY += speedY;
          }

          var touchedBottom = isCollideCanvas(this, canvas);

          if (touchedBottom) {
              this.posY = canvas.height - this.height;

              if (this.active) {
                  createNewShape();
                  this.active = false;
              }
          }

      }

      this.draw = function() {
          //  console.log('in shape this.draw');
          var posX = this.posX;
          var posY = this.posY;
          var color = this.color;
          this.shapeOrder.forEach(function(shapeItem, shapeIndex) {
              shapeItem.forEach(function(block, blockIndex) {
                  if (block !== 0) {
                      drawRect((blockIndex * blockSize) + posX, (shapeIndex * blockSize) + posY, blockSize, blockSize, color);
                  }
              });
          });
      };


  }

  function drawRect(x, y, width, height, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);

  }

  // check if object a and b colide
  function isCollideCanvas(a, b) {
      return (a.posY + a.height >= b.height);
  }

  function isCollideBlock(a, b) {
      return (a.posY + a.height >= b.posY);
  }

  var shapeLength, lastItem;

  function update() {
      // console.log('in update');
      shapeLength = shapes.length - 1;
      lastItem = shapes[shapeLength];
      var collided = false;
      shapes.forEach(function(aShape, index) {
          if (index != shapeLength) {
              collided = isCollideBlock(lastItem, aShape);
          }
          if (collided) {
              lastItem.posY = aShape.posY - lastItem.height;
              createNewShape();

              lastItem.active = false;

          }
          aShape.update();

          //
          window.addEventListener('keydown', function(evnt) {
              if (evnt.keyCode == 37) {
                  lastItem.posX--;
                  //  aShape.update();
                  draw();
              }
              if (evnt.keyCode == 38) {
                  lastItem.posY--;
                  // aShape.update();
                  draw();
              }
              if (evnt.keyCode == 39) {
                  lastItem.posX++;
                  //   aShape.update();
                  draw();
              }
              if (evnt.keyCode == 40) {
                  lastItem.posY++;
                  // aShape.update();
                  draw();
              }
          });
      });

      draw();
      fps = window.requestAnimationFrame(update);
  }

  function draw() {
      // console.log('in func draw');
      clearContext();
      createGrid();
      shapes.forEach(function(shape) {
          shape.draw();
      });
  }

  function clearContext() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  game.start();