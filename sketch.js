var cols, rows;
var w = 60;     //ancho casilla
var grid = [];  //mapa
var current;    //casilla actual
var end;        //casilla final
//var stack = [];
var en_kibus = false;
var en_end   = true;
var locked   = false;

function setup() {
  background(19, 63, 12);
  fill(19, 63, 12);
  createCanvas(600, 600);
  cols = floor(width/w);
  rows = floor(height/w);
  //frameRate(5);

  for (var   j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  //control
  var   factorObstaculos = 0.40;
  if(getParameterByName('obs') !== null) {
      factorObstaculos = getParameterByName('obs') * 0.01;
  }
    //generar obtaculos
    for( i = 0; i <= Math.floor(factorObstaculos * grid.length); i++ ) {
        var r1 = randomIntFromInterval(0, rows - 1);
        var r2 = randomIntFromInterval(0, cols - 1);
        grid[index(r1, r2)].isObstacule = true;
    }
    setCurrent(0,0);
    setEnd(rows-1,cols-1);

} //!setup()


function mousePressed() {
   if(locked === false){
       clc_x = parseInt(mouseX/w);
       clc_y = parseInt(mouseY/w);
       if(en_kibus) {
           setCurrent(clc_x, clc_y);
       }if(en_end){
           setEnd(clc_x,clc_y);
       }
   }
}

function draw() {
  background(61, 150, 34);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }
} //!draw()

///HEURISTIC
function Heuristic() {
    if(Bresenham() !== null){
        B = Bresenham();
    }else{
        B = BlindSearch();
    }
    setCurrent(B.i,B.j);
}

function Bresenham() {
    
}

function BlindSearch() {

}


////AUX FUNCTIONS ////
function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return -1;
  }
  return i + j * cols;
}

function setCurrent(x,y){

        before = current;

    for(g in grid){
        grid[g].current = false;
    }
    grid[index(x,y)].current = true;
    current = grid[index(x,y)];
    current.weightValue++;
    current.visited = true;
    current.isObstacule = false;
    en_kibus = false;
}

function setEnd(x,y){
    for(g in grid){
        grid[g].end = false;
    }
    grid[index(x,y)].end = true;
    end = grid[index(x,y)];
    end.isObstacule = false;
    en_end = false;
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}




function supercover_line(p0, p1) {
    var dx = p1.x-p0.x, dy = p1.y-p0.y;
    var nx = Math.abs(dx), ny = Math.abs(dy);
    var sign_x = dx > 0? 1 : -1, sign_y = dy > 0? 1 : -1;

    var p = new Point(p0.x, p0.y);
    var points = [new Point(p.x, p.y)];
    for (var ix = 0, iy = 0; ix < nx || iy < ny;) {
        if ((0.5+ix) / nx == (0.5+iy) / ny) {
            // next step is diagonal
            p.x += sign_x;
            p.y += sign_y;
            ix++;
            iy++;
        } else if ((0.5+ix) / nx < (0.5+iy) / ny) {
            // next step is horizontal
            p.x += sign_x;
            ix++;
        } else {
            // next step is vertical
            p.y += sign_y;
            iy++;
        }
        points.push(new Point(p.x, p.y));
    }
    return points;
}