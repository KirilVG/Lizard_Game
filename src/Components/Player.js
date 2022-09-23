class Player{
    constructor(xPos,yPos,width,height,currentLane,LanesNum,stepLength) {
        this.position = {
            x:xPos,
            y:yPos,
        };
        this.width=width;
        this.height=height;
        this.currentLane=currentLane;
        this.LanesNum=LanesNum;
        this.stepLength=stepLength;
    }

    draw(c) {
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(c) {
        this.draw(c)
    }

    handleMovement(direction) {
        switch(direction) {
            case "up":
                console.log("going up");
                break;
            case "down":
                console.log("going down");
                break;
            case "left":
                console.log("going left");
                if(this.currentLane>0) {
                    this.position.x-=this.stepLength;
                    this.currentLane--;
                }
                break;
            case "right":
                console.log("going right");
                if(this.currentLane<this.LanesNum-1) {
                    this.position.x+=this.stepLength;
                    this.currentLane++;
                }
                break;
            default:
                console.log("wrongDirection");
                break;
        }
    }
}

export default Player;