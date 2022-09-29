import Cactus from "./Cactus";
import SmallCactus from "./SmallCactus";
import Worm from "./Worm";
import * as myConstants from "./Constants";
import Bird from "./Bird";

const CollidableObjectFactory = {
    "createBird" : (scale, lanesNum) => {
      let col = Math.floor(Math.random() * (lanesNum - 2)) + 1;
      let originX =
        scale.laneOriginX +
        col * scale.laneWidth +
        scale.laneWidth / 2;
      let originY = scale.laneOriginY;
      let bird = new Bird(
        originX,
        originY,
        scale.birdIMGWidth,
        scale.birdIMGHeight,
        scale.birdHitboxWidth,
        scale.birdHitboxHeight,
        col,
        scale.laneHeight
      );
      return bird;
    },

    "createWorm" : function(scale, lanesNum) {
        let col = Math.floor(Math.random() * lanesNum);
        let originX =
          scale.laneOriginX +
          col * scale.laneWidth +
          scale.laneWidth / 2;
        let originY = scale.laneOriginY;
        let worm = new Worm(
          originX,
          originY,
          scale.wormIMGWidth,
          scale.wormIMGHeight,
          scale.wormHitboxWidth,
          scale.wormHitboxHeight,
          col,
          scale.laneHeight
        );
        return worm;
      },

      "createCactus" : function(scale, lanesNum) {
        let col = Math.floor(Math.random() * lanesNum);
        let originX =
          scale.laneOriginX +
          col * scale.laneWidth +
          scale.laneWidth / 2;
        let originY = scale.laneOriginY;
        let cactus = new Cactus(
          originX,
          originY,
          scale.cactusIMGWidth,
          scale.cactusIMGHeight,
          scale.cactusHitboxWidth,
          scale.cactusHitboxHeight,
          col,
          scale.laneHeight
        );
        return cactus;
      },

      "createSmallCactus" : function(scale, lanesNum) {
        let col = Math.floor(Math.random() * lanesNum);
        let originX =
          scale.laneOriginX +
          col * scale.laneWidth +
          scale.laneWidth / 2;
        let originY = scale.laneOriginY;
        let smallCactus = new SmallCactus(
          originX,
          originY,
          scale.smallCactusIMGWidth,
          scale.smallCactusIMGHeight,
          scale.smallCactusHitboxWidth,
          scale.smallCactusHitboxHeight,
          col,
          scale.laneHeight
        );
        return smallCactus;
      }
};

export default CollidableObjectFactory;