(function() {
  var throttle = function(type, name, obj) {
    obj = obj || window;
    var running = false;
    var func = function() {
        if (running) { return; }
        running = true;
         requestAnimationFrame(function() {
            obj.dispatchEvent(new CustomEvent(name));
            running = false;
        });
    };
    obj.addEventListener(type, func);
  };

  throttle("resize", "optimizedResize");
})();

(function () {
  const boardSign = document.querySelector('.main-board-sign');
  const baseSizing = { width: 1600, height: 1000 };
  const ratio = baseSizing.width / baseSizing.height;
  const boardSignSize = 603;
  const originalCoords = { x: 0.4125, y: 0.08  };

  const setBoardSize = () => {
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const currentRatio = innerWidth / innerHeight;
    let currentWidth, currentHeight, currentBoardSize;

    if (currentRatio > ratio) {
      currentWidth = innerWidth;
      currentHeight = innerWidth / ratio;
    } else {
      currentWidth = innerHeight * ratio;
      currentHeight = innerHeight;
    }

    currentBoardSize = (currentWidth * boardSignSize) / baseSizing.width;

    boardSign.style.top = currentHeight * originalCoords.y + 'px';
    boardSign.style.left = currentWidth * originalCoords.x + 'px';
    boardSign.style.width = currentBoardSize + 'px';
    boardSign.style.height = currentBoardSize + 'px';
  };


  setBoardSize();

  window.addEventListener("optimizedResize", setBoardSize);

})();
