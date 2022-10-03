import * as myConstants from "./Constants";
class Lane {
  constructor(xPos, yPos, width, height) {
    this.position = {
      x: xPos,
      y: yPos,
    };
    this.width = width;
    this.height = height;
  }

  draw(c) {
    if (myConstants.useDiscoMode) {
      let ind = Math.round(Math.random() * myConstants.colors.length);
      c.fillStyle = myConstants.colors[ind];
    } else {
      c.fillStyle = "white";
    }
    
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(c) {
    this.draw(c);
  }
}

export default Lane;
