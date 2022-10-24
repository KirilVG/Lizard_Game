import ApproachingObject from "../Components/ApproachingObject";
import Player from "../Components/Player";

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

const approachingObjectInfo = {
  hitBoxHeight: 100,
  hitBoxWidth: 100,
  IMGHeight: 100,
  IMGWidth: 100,
  pathAsString: "",
  speedMultiplier: 1.0,
  pathWidth: 100,
  pathHeight: 100,
  occupiedLanes: [0],
  occupiedLevels: ["ground"],
  deathMessage: "killed by sth",
  collisionHandler() {
    this.collided = true;
  },
};

const createNewApproachingObject = () => {
  const approachingObject = new ApproachingObject(
    0,
    0,
    approachingObjectInfo,
    1,
    1000
  );

  return approachingObject;
};

it("approaching object should be created", () => {
  const approachingObject = createNewApproachingObject();

  expect(approachingObject).not.toBe(undefined);
});

it("approaching object should have its position Y set", () => {
  const expectedOutput = 0;
  const approachingObject = createNewApproachingObject();

  expect(approachingObject.position.y).toBe(expectedOutput);
});

it("approaching object should change its position Y on update", () => {
  const expectedOutput = 50;
  const currentSpeed = 50;
  const approachingObject = createNewApproachingObject();

  approachingObject.update(mockedRenderer, currentSpeed);

  expect(approachingObject.position.y).toBe(expectedOutput);
});

it("approaching object terminate should return false by default", () => {
  const expectedOutput = false;
  const approachingObject = createNewApproachingObject();

  expect(approachingObject.terminate()).toBe(expectedOutput);
});

it("approaching object terminate should return true if it has traveled all it's given distance", () => {
  const expectedOutput = true;
  const currentSpeed = 1000;
  const approachingObject = createNewApproachingObject();

  approachingObject.update(mockedRenderer, currentSpeed);

  expect(approachingObject.terminate()).toBe(expectedOutput);
});

it("approaching object should detect collision if the player intersects with it", () => {
  const expectedOutput = true;
  const approachingObject = createNewApproachingObject();
  const playerObject = createNewPlayerObject();
  const currentSpeed = 900;

  approachingObject.update(mockedRenderer, currentSpeed);
  approachingObject.handleCollision(playerObject);

  expect(approachingObject.collided).toBe(expectedOutput);
});

it("approaching object should not detect collision if the player does not intersect with it", () => {
  const expectedOutput = false;
  const approachingObject = createNewApproachingObject();
  const playerObject = createNewPlayerObject();

  approachingObject.handleCollision(playerObject);

  expect(approachingObject.collided).toBe(expectedOutput);
});

it("approaching object should not detect collision if the player intersects with it but are on different levels", () => {
  const expectedOutput = false;
  const approachingObject = createNewApproachingObject();
  const playerObject = createNewPlayerObject();
  playerObject.level = "air";

  approachingObject.handleCollision(playerObject);

  expect(approachingObject.collided).toBe(expectedOutput);
});

it("approaching object should not detect collision if the player is on the same pos Y with, but they are on different lanes", () => {
  const expectedOutput = false;
  const approachingObject = createNewApproachingObject();
  const playerObject = createNewPlayerObject();
  playerObject.lane = 0;

  approachingObject.handleCollision(playerObject);

  expect(approachingObject.collided).toBe(expectedOutput);
});

it("approaching object terminate should return false by default", () => {
  const expectedOutput = false;
  const approachingObject = createNewApproachingObject();

  expect(approachingObject.terminate()).toBe(expectedOutput);
});

it("approaching object terminate should return true if it has has traveled all it's given distance", () => {
  const expectedOutput = true;
  const approachingObject = createNewApproachingObject();
  const currentSpeed = 1000;

  approachingObject.update(mockedRenderer, currentSpeed);

  expect(approachingObject.terminate()).toBe(expectedOutput);
});

it("approaching object terminate should return true if it has collided", () => {
  const expectedOutput = true;
  const approachingObject = createNewApproachingObject();
  const playerObject = createNewPlayerObject();
  const currentSpeed = 900;

  approachingObject.update(mockedRenderer, currentSpeed);
  approachingObject.handleCollision(playerObject);

  expect(approachingObject.terminate()).toBe(expectedOutput);
});
