class LaneSeparator{
    constructor(xPos,yPos,length,width) {
        this.position = {
            x1:xPos,
            y1:yPos,
            x2:xPos,
            y2:yPos+length,
        };
        this.width=width;
    }

    draw(c) {
        c.beginPath();
        c.lineWidth = this.width;
        c.moveTo(this.position.x1, this.position.y1);
        c.lineTo(this.position.x2, this.position.y2);
        c.stroke();
    }

    update(c) {
        this.draw(c)
    }
}

export default LaneSeparator;