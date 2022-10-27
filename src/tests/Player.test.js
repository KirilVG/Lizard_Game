import Player from "../Components/Player";
import * as myConstants from "../Components/Constants";
const mockedRenderer = {
  clearScreen() {},
  renderApproachingObject() {},
  renderPlayer() {},
  displayScoreAndFuel() {},
  renderLaneSeparator() {},
  renderLane() {},
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

it("player object should set it's fuel", () => {
  const expectedOutput = 100;
  const playerObject = createNewPlayerObject();

  expect(playerObject.fuel).toBe(expectedOutput);
});

it("player object should reduce it's fuel on update", () => {
  const expectedOutput = 100;
  const playerObject = createNewPlayerObject();

  playerObject.update(mockedRenderer);

  expect(playerObject.fuel).toBeLessThan(expectedOutput);
});

it("player object should set it's score", () => {
  const expectedOutput = 0;
  const playerObject = createNewPlayerObject();

  expect(playerObject.score).toBe(expectedOutput);
});

it("player object should increase it's score on update", () => {
  const expectedOutput = 0;
  const playerObject = createNewPlayerObject();

  playerObject.update(mockedRenderer);

  expect(playerObject.score).toBeGreaterThan(expectedOutput);
});

it("player object should increase it's score by twice the amount on update, when disco mode is on", () => {
  const expectedOutput = 0.1;
  const playerObject = createNewPlayerObject();
  myConstants.setDiscoMode(true);
  
  playerObject.update(mockedRenderer);

  expect(playerObject.score).toBeGreaterThan(expectedOutput);
});

it("player object should decrease it's fuel on update", () => {
  const expectedOutput = 100;
  const playerObject = createNewPlayerObject();

  playerObject.update(mockedRenderer);

  expect(playerObject.score).toBeLessThan(expectedOutput);
});

it("player object be killed when it's fuel has ended", () => {
  const expectedOutput = true;
  const playerObject = createNewPlayerObject();

  playerObject.fuel=0;

  playerObject.update(mockedRenderer);

  expect(playerObject.isDead).toBe(expectedOutput);
});

it("player object is not dead by default", () => {
  const expectedOutput = false;
  const playerObject = createNewPlayerObject();

  expect(playerObject.isDead).toBe(expectedOutput);
});

it("player object is killed when handle death is executed", () => {
  const expectedOutput = true;
  const playerObject = createNewPlayerObject();

  playerObject.handleDeath("cause");

  expect(playerObject.isDead).toBe(expectedOutput);
});

it("player object should be able to switch to adjacent lane when handleMovement is executed(left)", () => {
  const expectedOutput = 0;
  const direction = "left";
  const playerObject = createNewPlayerObject();

  playerObject.handleMovement(direction);

  expect(playerObject.currentLane).toBe(expectedOutput);
});

it("player object should be able to switch to adjacent lane when handleMovement is executed(right)", () => {
  const expectedOutput = 2;
  const direction = "right";
  const playerObject = createNewPlayerObject();

  playerObject.handleMovement(direction);

  expect(playerObject.currentLane).toBe(expectedOutput);
});

it("player object should be able to change it's level when handleMovement is executed(up)", () => {
  const expectedOutput = "air";
  const direction = "up";
  const playerObject = createNewPlayerObject();

  playerObject.handleMovement(direction);

  expect(playerObject.level).toBe(expectedOutput);
});

it("player object should be able to change it's level when handleMovement is executed(down)", () => {
  const expectedOutput = "underground";
  const direction = "down";
  const playerObject = createNewPlayerObject();

  playerObject.handleMovement(direction);

  expect(playerObject.level).toBe(expectedOutput);
});

it("player object should return to ground level after it has borrowed", () => {
  const expectedOutput = "ground";
  const direction = "down";
  const playerObject = createNewPlayerObject();
  jest.useFakeTimers();

  playerObject.handleMovement(direction);
  jest.advanceTimersByTime(800);


  expect(playerObject.level).toBe(expectedOutput);
});

it("player object should not be able to change it's lane when handleMovement is executed and it's level is air", () => {
  const expectedOutput = 1;
  const jumpDirection = "up";
  const movementDirection = "left";
  const playerObject = createNewPlayerObject();

  playerObject.handleMovement(jumpDirection);
  playerObject.handleMovement(movementDirection);

  expect(playerObject.currentLane).toBe(expectedOutput);
});

it("player object should return to ground level after it has borrowed", () => {
  const expectedOutput = "ground";
  const direction = "up";
  const playerObject = createNewPlayerObject();
  jest.useFakeTimers();

  playerObject.handleMovement(direction);
  jest.advanceTimersByTime(800);


  expect(playerObject.level).toBe(expectedOutput);
});
