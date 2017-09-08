function Cell(i, j) {
  this.current = false;
  this.end = false;
  this.i = i;
  this.j = j;
  this.visited = false;
  this.weightValue = 0;
  this.isObstacule = false;

  //assets
    kibus_img = loadImage("./assets/kibus.png");
    obst_img  = loadImage("./assets/obstaculo.png");
    flag_img  = loadImage("./assets/flag.png");
    house_img = loadImage("./assets/house.png");

  this.checkNeighbors = function() {
      //Retorna vecino no obstaculo aleatorio
      // o undefined en caso de no existir
    var neighbors = [];

    var top    = grid[index(i, j -1)];
    var right  = grid[index(i+1, j)];
    var bottom = grid[index(i, j+1)];
    var left   = grid[index(i-1, j)];

    if (top && !top.visited && !top.isObstacule) {
      neighbors.push(top);
    }
    if (right && !right.visited && !right.isObstacule) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited && !bottom.isObstacule) {
      neighbors.push(bottom);
    }
    if (left && !left.visited && !left.isObstacule) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }


  }
  this.highlight = function() {
    var x = this.i*w;
    var y = this.j*w;
    noStroke();
    fill(200, 0, 255, 100);
    rect(x, y, w, w);

  }

  this.show = function() {
      var x = this.i*w;
      var y = this.j*w;

      if(this.isObstacule){
          fill(27, 104, 27);
          stroke(30,0,255,0);
          rect(x, y, w, w);
          image(obst_img,x,y);

      }else if(this.current){
          fill(27, 104, 27);
          stroke(30,0,255,0);
          rect(x, y, w, w);
          image(kibus_img,x,y);

      }else if(this.end){
        fill(27, 104, 27);
        stroke(30,0,255,0);
        rect(x, y, w, w);
        image(house_img,x,y);

    }else if(this.visited){
          //si fue visitado pintar bandera y valor
          fill(27 +(this.weightValue*5) , 104, 27);
          stroke(30,0,255,0);
          rect(x, y, w, w);
          image(flag_img,x,y);
          textSize(15);
          fill(30,30,30);
          text(this.weightValue,x+w/2,y+w/2);

      }else {
          fill(27, 104, 27);
          stroke(30,0,255,0);
          rect(x, y, w, w);
      }
  }
}
