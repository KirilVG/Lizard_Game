import * as myConstants from "./Constants";

class Cactus {
    constructor(xPos,yPos,width,height,currentLane,distancetotravel) {
        this.position = {
            x:xPos,
            y:yPos,
        }
        this.gameOverCauseMessage="Killed by cactus";
        this.width=width;
        this.height=height;
        this.currentLane = currentLane;
        this.distancetotravel = distancetotravel;
        this.colided=false;
    }

    draw(c) {
        c.fillStyle="green";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        c.fillStyle="black";
    }

    update(c, currentSpeed) {
        
        if(this.distancetotravel>0) {
            this.position.y+=currentSpeed;
            this.distancetotravel-=currentSpeed;
            this.draw(c);
        }

        if(this.distancetotravel<=0) return true;
    }

    detectCollision(player) {
        if(player.position.y<=(this.position.y+this.height) && player.currentLane==this.currentLane && player.level==myConstants.levelGround) {
            this.colided=true;
            player.handleDeath(this.gameOverCauseMessage);
        }
        
    }

    terminate() {
        return this.distancetotravel<=0 || this.colided==true ;
    }
}

export default Cactus;