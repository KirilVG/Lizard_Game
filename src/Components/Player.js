class Player{
    constructor(xPos,yPos,width,height) {
        this.position = {
            x:xPos,
            y:yPos,
        };
        this.width=width;
        this.height=height;
    }

    draw(c) {
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

export default Player;