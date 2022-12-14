class LaneSeparator{
    constructor(xPos,yPos,length) {
        this.position = {
            x1:xPos,
            y1:yPos,
            x2:xPos,
            y2:yPos+length,
        };
    }

    draw(c) {
        c.beginPath();
        c.moveTo(this.position.x1, this.position.y1);
        c.lineTo(this.position.x2, this.position.y2);
        c.stroke();
    }
}

export default LaneSeparator;