import GameLogic from "../Components/GameLogic";
import ApproachingObject from "../Components/ApproachingObject";
import Player from "../Components/Player";

const demoWidth = 1000;

const demoHeight = 1000;

const demoLanesNum = 3;

const mockedHandleGameEnd = () => {};

const mockedRenderer = {
  clearScreen() {},
  renderApproachingObject() {},
  renderPlayer() {},
  displayScoreAndFuel() {},
  renderLaneSeparator() {},
  renderLane() {},
};

const createNewGameLogic = () => {
  const gameLogic = new GameLogic(
    demoWidth,
    demoHeight,
    demoLanesNum,
    mockedRenderer,
    mockedHandleGameEnd
  );

  return gameLogic;
};

const createNewPlayerObject = () => {
  const playerObject = new Player(
    0,
    1000,
    100,
    100,
    100,
    100,
    1,
    3,
    100,
    800,
    800,
    1.2,
    function () {
      this.dead = true;
    }
  );

  return playerObject;
};

it("game logic executes", () => {
  const gameLogic = createNewGameLogic();

  expect(gameLogic).not.toBe(undefined);
});

it("game logic sets player on the correct lane", () => {
  const expectedValue = 1;
  const gameLogic = createNewGameLogic();

  expect(gameLogic.player.currentLane).toBe(expectedValue);
});

it("game logic moves player in an adjacent lane(leftLane)", () => {
  const expectedValue = 0;
  const code = "ArrowLeft";
  const event = {
    code: code,
  };
  const gameLogic = createNewGameLogic();

  gameLogic.WindowKeyDown(event);

  expect(gameLogic.player.currentLane).toBe(expectedValue);
});

it("game logic moves player in an adjacent lane(rightLane)", () => {
  const expectedValue = 2;
  const code = "ArrowRight";
  const event = {
    code: code,
  };
  const gameLogic = createNewGameLogic();

  gameLogic.WindowKeyDown(event);

  expect(gameLogic.player.currentLane).toBe(expectedValue);
});

it("game logic does not let player go out of bounds", () => {
  const expectedValue = 2;
  const code = "ArrowRight";
  const event = {
    code: code,
  };
  const gameLogic = createNewGameLogic();

  gameLogic.WindowKeyDown(event);
  gameLogic.WindowKeyDown(event);
  gameLogic.WindowKeyDown(event);

  expect(gameLogic.player.currentLane).toBe(expectedValue);
});

it("game logic handles player jump", () => {
  const expectedValue = "air";
  const code = "ArrowUp";
  const event = {
    code: code,
  };
  const gameLogic = createNewGameLogic();

  gameLogic.WindowKeyDown(event);

  expect(gameLogic.player.level).toBe(expectedValue);
});

it("game logic handles player burrow", () => {
  const expectedValue = "underground";
  const code = "ArrowDown";
  const event = {
    code: code,
  };
  const gameLogic = createNewGameLogic();

  gameLogic.WindowKeyDown(event);

  expect(gameLogic.player.level).toBe(expectedValue);
});

it("game logic sets initial speed", () => {
  const expectedValue = 4.15;
  const gameLogic = createNewGameLogic();

  expect(gameLogic.speed).toBe(expectedValue);
});

it("game logic speeds up", () => {
  const expectedValue = 4.565;
  const gameLogic = createNewGameLogic();

  gameLogic.speedUp();

  expect(gameLogic.speed).toBe(expectedValue);
});

it("game logic executes speed up based on score", () => {
  const expectedValue = 4.565;
  const gameLogic = createNewGameLogic();

  gameLogic.player.score = 100;
  gameLogic.animate();

  expect(gameLogic.speed).toBe(expectedValue);
});

it("game logic sets day/night cycle", () => {
  const expectedValue = false;
  const gameLogic = createNewGameLogic();

  expect(gameLogic.day).toBe(expectedValue);
});

it("game logic executes day/night cycle", () => {
  const expectedValue = true;
  const gameLogic = createNewGameLogic();

  gameLogic.switchDayNightCycle();

  expect(gameLogic.day).toBe(expectedValue);
});

it("game logic executes day/night cycle based on score", () => {
  const expectedValue = true;
  const gameLogic = createNewGameLogic();

  gameLogic.player.score = 500;
  gameLogic.animate();

  expect(gameLogic.day).toBe(expectedValue);
});

it("game logic creates a consumable item", () => {
  const expectedValue = 1;
  const gameLogic = createNewGameLogic();

  gameLogic.createConsumableObject();

  expect(gameLogic.consumableObjects.length).toBe(expectedValue);
});

it("game logic creates an obstacle item", () => {
  const expectedValue = 1;
  const gameLogic = createNewGameLogic();

  gameLogic.createApproachingObstacleObject();

  expect(
    gameLogic.groundObstacleObjects.length ||
      gameLogic.aerialObstacleObjects.length
  ).toBe(expectedValue);
});

it("player object should be created", () => {
  const playerObject = createNewPlayerObject();

  expect(playerObject).not.toBe(undefined);
});

it("game logic should create object at a certain time", () => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.9);
  jest.useFakeTimers();
  const gameLogic = createNewGameLogic();
  jest.advanceTimersByTime(2000);


  expect(expect(gameLogic.aerialObstacleObjects.length + gameLogic.groundObstacleObjects.length).toBe(1));
})

it("game logic should create a consumable object at a certain time", () => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.9);
  jest.useFakeTimers();
  const gameLogic = createNewGameLogic();
  jest.advanceTimersByTime(4000);

  expect(expect(gameLogic.consumableObjects.length).toBe(1));
})
