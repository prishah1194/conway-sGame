var gameOfLife = {
    width: 20,
    height: 20,
    stepInterval: null, 
  
    createAndShowBoard: function() {
      var goltable = document.createElement("tbody");
      var tablehtml = "";
      for (var h = 0; h < this.height; h++) {
        tablehtml += "<tr id='row+" + h + "'>";
        for (var w = 0; w < this.width; w++) {
          tablehtml += "<td class='dead' id='" + w + "-" + h + "'></td>";
        }
        tablehtml += "</tr>";
      }
      goltable.innerHTML = tablehtml;
      var board = document.getElementById("board");
      board.appendChild(goltable);
      this.setupBoardEvents();
    },
  
    forEachCell: function(iteratorFunc) {
      for(var i=0;i<this.width;i++){
        for(var j=0;j<this.height;j++){
          var cell=document.getElementById(j +"-"+ i);
          iteratorFunc(cell,i,j)
        }
      }
   },
  
    toggleCell: function(cell) {
      cell.classList.toggle("alive");
      cell.classList.toggle("dead");
    },
  
    setupBoardEvents: function() {
      document.getElementById("board").addEventListener("click", event => this.toggleCell(event.target));
      document.getElementById("step_btn").addEventListener("click", () => this.step());
      document.getElementById("play_btn").addEventListener("click", () => this.enableAutoPlay());
     // document.getElementById('clear_btn').onclick = this.clear.bind(this);
     document.getElementById("clear_btn").addEventListener("click", () => this.clear());
    },
    
    clear: function() {
      // var interclear = function() {
      //     if (this.getAttribute('data-status') === 'alive') {
      //         this.className = "dead";
      //         this.setAttribute('data-status', 'dead');
      //     } else {
      //         return;
      //     }
      // };
      // this.forEachCell(function(cell, x, y) {
      //     // interclear.bind(cell)();
      //     // cals function on arguments provided as array
      //     interclear.apply(cell);
      // });
  },
  
    
  
    getCellByCoords: function(cellX, cellY) {
      return document.getElementById(cellX + "-" + cellY);
    },
  
    isCellAlive: function(cell) {
      return cell !== null && !cell.classList.contains("dead");
    },
  
    countAliveNeighbors: function(cell) {
      const cellCoords = cell.id.split("-");
      const cellX = Number(cellCoords[0]);
      const cellY = Number(cellCoords[1]);
  
      const neighbors = [];
      // sides
      neighbors.push(this.getCellByCoords(cellX - 1, cellY));
      neighbors.push(this.getCellByCoords(cellX + 1, cellY));
  
      //above
      neighbors.push(this.getCellByCoords(cellX - 1, cellY - 1));
      neighbors.push(this.getCellByCoords(cellX, cellY - 1));
      neighbors.push(this.getCellByCoords(cellX + 1, cellY - 1));
  
      //below
      neighbors.push(this.getCellByCoords(cellX - 1, cellY + 1));
      neighbors.push(this.getCellByCoords(cellX, cellY + 1));
      neighbors.push(this.getCellByCoords(cellX + 1, cellY + 1));
  
      const aliveNeighbors = neighbors.filter(cell => this.isCellAlive(cell));
  
      return aliveNeighbors.length;
    },
  
    step: function() {
      // Here is where you want to loop through all the cells
      // on the board and determine, based on it's neighbors,
      // whether the cell should be dead or alive in the next
      // evolution of the game.
  
      const cellsToToggle = [];
  
      this.forEachCell(cell => {
        // First, we will count alive neighbors for all cells
        const aliveNeighbors = this.countAliveNeighbors(cell);
  
        // Next, collect all the cells that will be toggled on the next step
        if (cell.classList.contains("alive")) {
          if (aliveNeighbors < 2 || aliveNeighbors > 3) cellsToToggle.push(cell);
        } else {
          if (aliveNeighbors === 3) cellsToToggle.push(cell);
        }
      });
      cellsToToggle.forEach(cell => this.toggleCell(cell));
    },
  
    enableAutoPlay: function() {
      if (this.stepInterval) {
        clearInterval(this.stepInterval);
        this.stepInterval = null;
      } else {
        this.stepInterval = setInterval(() => this.step(), 250);
      }
    }
  };
  
  
  
  gameOfLife.createAndShowBoard();
  
  
  