import * as myConstants from "./Constants";
import WormIcon from "../Images/WormIcon.svg";

class Worm {
    constructor(xPos,yPos,width,height,currentLane,distancetotravel) {
        this.position = {
            x:xPos,
            y:yPos,
        }
        this.width=width;
        this.height=height;
        this.currentLane = currentLane;
        this.distancetotravel = distancetotravel;
        this.colided=false;
        this.image=new Image();
        this.image.src=WormIcon;
    }

    draw(c) {
        c.drawImage(this.image,this.position.x, this.position.y, this.width, this.height);
    }

    update(c, currentSpeed) {
        
        if(this.distancetotravel>0) {
            let calculatedSpeed = currentSpeed*myConstants.wormSpeedMultiplier;
            this.position.y+=calculatedSpeed;
            this.distancetotravel-=calculatedSpeed;
            this.draw(c);
        }
    }

    detectCollision(player) {
        if(player.position.y<=(this.position.y+this.height) && player.currentLane==this.currentLane && player.level==myConstants.levelGround) {
            this.colided=true;
            player.fuel=myConstants.maxfuel;
        }
        
    }

    terminate() {
        return this.distancetotravel<=0 || this.colided==true ;
    }
}

export default Worm;