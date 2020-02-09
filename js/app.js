document.addEventListener('DOMContentLoaded', function () {

    console.log('hy');

     function GameOfLife(boardWidth, boardHeight) {
        this.width = boardWidth;
        this.height = boardHeight;
        this.board = document.querySelector('#board');
        this.cells = [];

        this.createBoard = function () {
            this.board.style.width = (this.width * 10) + 'px';
            this.board.style.height = (this.height * 10) + 'px';
            var numberOfCells = boardWidth * boardHeight;
            for (var i = 0; i < numberOfCells; i++) {
                var div = document.createElement('div');
                this.board.appendChild(div);
                this.cells.push(div);
            }

           console.log(this.cells);
            for (var i = 0; i < this.cells.length; i++) {
                this.cells[i].addEventListener('click', function () {
                    var currentDiv = this;
                    currentDiv.classList.toggle('live');
                });
            }
        };

        this.convertCoordinates = function (x, y) {
            var index = x + y * this.width;
            return this.cells[index];
        };

        this.setCellState = function (x, y, state) {
            var cell = this.convertCoordinates(x, y);
            if (state === 'live' && !cell.classList.contains('live')){
                cell.classList.add('live')
            } else if (state === 'dead' && cell.classList.contains('live')){
                cell.classList.remove('live');
            }
        };

        this.firstGlider = function () {
            this.setCellState(0,1, 'live');
            this.setCellState(1,2, 'live');
            this.setCellState(2,0, 'live');
            this.setCellState(2,1, 'live');
            this.setCellState(2,2, 'live');
        };

        this.validCoordinates = function (x, y) {
            if (x >= 0 && x < this.width && y >=0 && y < this.height) {
                return true;
            }
            return false;
        };

        this.pushNeighbor = function (x, y, neighbors) {
            if (this.validCoordinates(x, y)) {
                neighbors.push(this.convertCoordinates(x, y ));
            }
        };

        this.computeCellNextState = function (x, y) {
            var aliveNeighbors = 0;
            var neighbors = [];

            for(i=-1; i<=1 ;i++){
                for(j=-1; j<=1; j++){
                    if(!(i==0 &&j==0)){
                        this.pushNeighbor(x+i, y+j, neighbors);
                    }
                }
            }

            console.log(neighbors);

            for (var i = 0; i < neighbors.length; i++) {
                if (neighbors[i].classList.contains('live')) {
                    aliveNeighbors = aliveNeighbors +1;
                }
            }
            console.log('counter is ' + aliveNeighbors);
            var cell = this.convertCoordinates(x, y);
            if (cell.classList.contains('live') && aliveNeighbors < 2) {
                return 0;
            }
            if (cell.classList.contains('live') && (aliveNeighbors === 2 || aliveNeighbors === 3)) {
                return 1;
            }
            if (cell.classList.contains('live') && aliveNeighbors > 3) {
                return 0;
            }
            if (!(cell.classList.contains('live')) && aliveNeighbors === 3) {
                return 1;
            }
            return  0;
        };

        this.computeNextGeneration = function () {
            var nextGeneration = [];
            for (var i = 0; i < this.width; i++) {
                for (var j = 0; j < this.height; j++) {
                   nextGeneration.push(this.computeCellNextState(j, i));
                }
            }
            console.log('aici ar fi array de 0 si 1 ' + nextGeneration);
            return nextGeneration;
        };


        this.printNextGeneration = function () {
            var array = this.computeNextGeneration();
            console.log('aici '+ array);
            console.log(this.cells);
            for (var i = 0; i < this.cells.length; i++) {
                var x = i%this.width;
                var y = Math.floor(i/this.height);
                if (array[i] === 0) {
                    this.setCellState(x, y, 'dead');
                } else {
                    this.setCellState(x, y, 'live');
                }
            }
        };

         var buttonPlay = document.querySelector('#play');
         var buttonStop = document.querySelector('#pause');
         var self = this;
         buttonPlay.addEventListener('click', function () {
           self.interval =  setInterval(function () {
                 self.printNextGeneration();
             }, 250);
         });

         buttonStop.addEventListener('click', function () {
            clearInterval(self.interval);
         });

    }

var boardWidth = prompt('Please enter boardWidth');
var boardHeight = prompt('Please enter boardHeight');
    var game = new GameOfLife(boardWidth, boardHeight);
    console.log(game);

     game.createBoard();
     game.firstGlider();


    });