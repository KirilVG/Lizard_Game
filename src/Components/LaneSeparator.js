import * as myConstants from "./Constants";

class LaneSeparator {
  constructor(xPos, yPos, length, width) {
    this.position = {
      x1: xPos,
      y1: yPos,
      x2: xPos,
      y2: yPos + length,
    };

    this.width = width;
  }

  draw(c) {
    c.renderLaneSeparator(this);
  }

  update(c) {
    this.draw(c);
  }
}

export default LaneSeparator;
