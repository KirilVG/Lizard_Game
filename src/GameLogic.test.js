import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import App from "./App";
import StartMenu from "./Components/StartMenu";
import Canvas from "./Components/Canvas";
import GameOverMenu from "./Components/GameOverMenu";
import GameWrapper from "./Components/GameWrapper";
import GameLogic from "./Components/GameLogic";
import ApproachingObject from "./Components/ApproachingObject";
import Player from "./Components/Player";

const demoId = "demoId";

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

const mockedGameOverInf = {
  score: 100,
  cause: "killed by sth",
  username: "Person",
  lanesNum: 3,
};

const mockedOnClick = () => {};

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

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
};

test("start menu renders title element", () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to run Kiro the lizard!/i);

  expect(linkElement).toBeInTheDocument();
});

test("start menu renders lanes input", () => {
  render(<App />);
  const lanesInput = screen.getByLabelText(/Number of lanes/i);

  expect(lanesInput).toBeInTheDocument();
});

test("start menu renders username input", () => {
  render(<App />);
  const usernameInput = screen.getByLabelText(/Username/i);

  expect(usernameInput).toBeInTheDocument();
});

test("start menu renders button", () => {
  render(<App />);
  const buttonEl = screen.getByRole("button");

  expect(buttonEl).toBeInTheDocument();
});

test("lanes input should change", () => {
  render(<App />);
  const testValue = "a";
  const lanesInput = screen.getByLabelText(/Number of lanes/i);

  fireEvent.change(lanesInput, { target: { value: testValue } });

  expect(lanesInput.value).toBe(testValue);
});

test("lanes input should set error prop to true when play button is pressed and Lanes input does not contain a number", () => {
  render(<App />);
  const lanesInput = screen.getByLabelText(/Number of lanes/i);
  const testValue = "a";
  const buttonEl = screen.getByRole("button");

  fireEvent.change(lanesInput, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  const linkElement = screen.getByText(/lanes should be a number/i);

  expect(linkElement).toBeInTheDocument();
});

test("lanes input should set error prop to true when play button is pressed and Lanes input contains a number less than the minimum", () => {
  render(<App />);
  const lanesInput = screen.getByLabelText(/Number of lanes/i);
  const testValue = "2";
  const buttonEl = screen.getByRole("button");

  fireEvent.change(lanesInput, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  const linkElement = screen.getByText(/lanes should not be less than 3/i);

  expect(linkElement).toBeInTheDocument();
});

test("lanes input should set error prop to true when play button is pressed and Lanes input contains a number more than the maximum", () => {
  render(<App />);
  const lanesInput = screen.getByLabelText(/Number of lanes/i);
  const testValue = "102";
  const buttonEl = screen.getByRole("button");

  fireEvent.change(lanesInput, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  const linkElement = screen.getByText(/lanes should not be more than 100/i);

  expect(linkElement).toBeInTheDocument();
});

test("username input should change", () => {
  render(<App />);
  const usernameInput = screen.getByLabelText(/Username/i);
  const testValue = "User";

  fireEvent.change(usernameInput, { target: { value: testValue } });

  expect(usernameInput.value).toBe(testValue);
});

it("start menu renders correctly", () => {
  const lanesNum = null;
  const username = null;
  const onClick = () => {};
  const tree = renderer
    .create(
      <StartMenu onClick={onClick} lanesNum={lanesNum} username={username} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("game end renders correctly", () => {
  global.localStorage = new LocalStorageMock;

  const tree = renderer
    .create(<GameOverMenu onClick={mockedOnClick} end={mockedGameOverInf} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("game end should be able to save score", () => {
  global.localStorage = new LocalStorageMock;
  const expectedValue=1;
  render(<GameOverMenu onClick={mockedOnClick} end={mockedGameOverInf} />);
  const buttonEl = screen.getByRole('button', {
    name: /save Score/i
  });
  
  fireEvent.click(buttonEl);

  expect(JSON.parse(global.localStorage.getItem("scoreboard"))['3'].length).toBe(expectedValue);
});

it("game end should save only 10 scores per game mode", () => {
  global.localStorage = new LocalStorageMock;
  const scoreBoard = {};
  const currentScores = [];
  const expectedValue=10;
  render(<GameOverMenu onClick={mockedOnClick} end={mockedGameOverInf} />);
  const buttonEl = screen.getByRole('button', {
    name: /save Score/i
  });
  for(let i=0;i<10;i++) {
    currentScores.push({
      username: "joko",
      lanesNum: 3,
      score: 500,
      causeOfDeath: "IDK",
      discMode: false,
    });
  }
  scoreBoard['3'] = currentScores;
  global.localStorage.setItem("scoreboard",JSON.stringify(scoreBoard));

  fireEvent.click(buttonEl);

  expect(JSON.parse(global.localStorage.getItem("scoreboard"))['3'].length).toBe(expectedValue);
});

it("game end should execute the given parameter function when play again is pressed", () => {
  global.localStorage = new LocalStorageMock;
  let val = false;
  const expectedValue=true;
  const givenF = () => { val=true;}
  render(<GameOverMenu onClick={givenF} end={mockedGameOverInf} />);
  const buttonEl = screen.getByRole('button', {
    name: /play again/i
  });
  
  fireEvent.click(buttonEl);

  expect(val).toBe(expectedValue);
});

it("canvas should be rendered correctly", () => {
  const tree = renderer.create(<Canvas canvasID={demoId} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("game wrapper should be rendered correctly", () => {
  const handleGameEnd = () => {};
  const tree = renderer
    .create(
      <GameWrapper
        id={demoId}
        lanesNum={demoLanesNum}
        gameEndHandler={mockedHandleGameEnd}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

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

it("player object should be created", () => {
  const playerObject = createNewPlayerObject();

  expect(playerObject).not.toBe(undefined);
});

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

it("player object should not be able to change it's lane when handleMovement is executed and it's level is air", () => {
  const expectedOutput = 1;
  const jumpDirection = "up";
  const movementDirection = "left";
  const playerObject = createNewPlayerObject();

  playerObject.handleMovement(jumpDirection);
  playerObject.handleMovement(movementDirection);

  expect(playerObject.currentLane).toBe(expectedOutput);
});
