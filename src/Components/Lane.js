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
    c.renderLane(this);
  }

  update(c) {
    this.draw(c);
  }
}

export default Lane;
