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
      //Retorna vecino no obstaculo con menor peso
      // o undefined en caso de no existir
    var neighbors = [];

    var top    = grid[index(i, j -1)];
    var right  = grid[index(i+1, j)];
    var bottom = grid[index(i, j+1)];
    var left   = grid[index(i-1, j)];
    var d1     = grid[index(i-1, j-1)];
    var d2     = grid[index(i+1, j-1)];
    var d3     = grid[index(i-1, j+1)];
    var d4     = grid[index(i+1, j+1)];

    if (top  && !top.isObstacule && top !== before) {
      neighbors.push(top);
    }
    if (right && !right.isObstacule && right !== before) {
      neighbors.push(right);
    }
    if (bottom && !bottom.isObstacule && bottom !== before) {
      neighbors.push(bottom);
    }
    if (left && !left.isObstacule && left !== before) {
      neighbors.push(left);
    }if (d1 && !d1.isObstacule && d1 !== before) {
          neighbors.push(d1);
    }if (d2 && !d2.isObstacule && d2 !== before) {
          neighbors.push(d2);
    }if (d3 && !d3.isObstacule && d3 !== before) {
          neighbors.push(d3);
    }if (d4 && !d4.isObstacule && d4 !== before) {
          neighbors.push(d4);
    }

    if (neighbors.length > 0) {
        for(n in neighbors){
            if (neighbors[n] === end){
                return neighbors[n];
            }
        }
      neighbors.sort(function (a,b){return a.weightValue - (b.weightValue-1)});
      return neighbors[0];

    } else {
      return before;
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
          fill(27 +(this.weightValue*10) , 104, 27);
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
