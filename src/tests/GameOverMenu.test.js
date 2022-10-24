import { fireEvent, render, screen } from "@testing-library/react";
import GameOverMenu from "../Components/GameOverMenu";
import renderer from "react-test-renderer";

const mockedGameOverInf = {
  score: 100,
  cause: "killed by sth",
  username: "Person",
  lanesNum: 3,
};

const mockedOnClick = () => {};

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
}

it("game end renders correctly", () => {
  global.localStorage = new LocalStorageMock();

  const tree = renderer
    .create(<GameOverMenu onClick={mockedOnClick} end={mockedGameOverInf} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("game end should be able to save score", () => {
  global.localStorage = new LocalStorageMock();
  const expectedValue = 1;
  render(<GameOverMenu onClick={mockedOnClick} end={mockedGameOverInf} />);
  const buttonEl = screen.getByRole("button", {
    name: /save Score/i,
  });

  fireEvent.click(buttonEl);

  expect(
    JSON.parse(global.localStorage.getItem("scoreboard"))["3"].length
  ).toBe(expectedValue);
});

it("game end should save only 10 scores per game mode", () => {
  global.localStorage = new LocalStorageMock();
  const scoreBoard = {};
  const currentScores = [];
  const expectedValue = 10;
  render(<GameOverMenu onClick={mockedOnClick} end={mockedGameOverInf} />);
  const buttonEl = screen.getByRole("button", {
    name: /save Score/i,
  });
  for (let i = 0; i < 10; i++) {
    currentScores.push({
      username: "joko",
      lanesNum: 3,
      score: 500,
      causeOfDeath: "IDK",
      discMode: false,
    });
  }
  scoreBoard["3"] = currentScores;
  global.localStorage.setItem("scoreboard", JSON.stringify(scoreBoard));

  fireEvent.click(buttonEl);

  expect(
    JSON.parse(global.localStorage.getItem("scoreboard"))["3"].length
  ).toBe(expectedValue);
});

it("game end should execute the given parameter function when play again is pressed", () => {
  global.localStorage = new LocalStorageMock();
  let val = false;
  const expectedValue = true;
  const givenF = () => {
    val = true;
  };
  render(<GameOverMenu onClick={givenF} end={mockedGameOverInf} />);
  const buttonEl = screen.getByRole("button", {
    name: /play again/i,
  });

  fireEvent.click(buttonEl);

  expect(val).toBe(expectedValue);
});
