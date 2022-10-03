import Cactus from "./Cactus";
import SmallCactus from "./SmallCactus";
import Worm from "./Worm";
import * as myConstants from "./Constants";
import Bird from "./Bird";
import ApproachingObject from "./ApproachingObject";

const CollidableObjectFactory = {
    "createBird" : (scale, lanesNum) => {
      let col = Math.floor(Math.random() * (lanesNum - 2)) + 1;
      let originX =
        scale.laneOriginX +
        col * scale.laneWidth +
        scale.laneWidth / 2;
      let originY = scale.laneOriginY;
      let bird = new ApproachingObject(originX,originY,scale.bird,col,scale.laneHeight);
      return bird;
    },

    "createWorm" : function(scale, lanesNum) {
        let col = Math.floor(Math.random() * lanesNum);
        let originX =
          scale.laneOriginX +
          col * scale.laneWidth +
          scale.laneWidth / 2;
        let originY = scale.laneOriginY;
        let worm = new ApproachingObject(originX,originY,scale.worm,col,scale.laneHeight);
        return worm;
      },

      "createCactus" : function(scale, lanesNum) {
        
        let col = Math.floor(Math.random() * lanesNum);
        let originX =
          scale.laneOriginX +
          col * scale.laneWidth +
          scale.laneWidth / 2;
        let originY = scale.laneOriginY;
        let cactus = new ApproachingObject(originX,originY,scale.cactus,col,scale.laneHeight);
        return cactus;
      },

      "createSmallCactus" : function(scale, lanesNum) {
        let col = Math.floor(Math.random() * lanesNum);
        let originX =
          scale.laneOriginX +
          col * scale.laneWidth +
          scale.laneWidth / 2;
        let originY = scale.laneOriginY;
        let smallCactus = new ApproachingObject(originX,originY,scale.smallCactus,col,scale.laneHeight);
        return smallCactus;
      }
};

export default CollidableObjectFactory;