import CollidableObjectFactory from "../Components/CollidableObjectFactory";
import VariableContainer from "../Components/VariableContainer";

const mockedLanesNum = 3;

const mockedInfo = VariableContainer(1000, 1000, mockedLanesNum);

it("factory should be able to create a bird", () => {
  const expectedValue = "bird";
  const obstacle = CollidableObjectFactory.createBird(
    mockedInfo,
    mockedLanesNum
  );

  expect(obstacle.type).toBe(expectedValue);
});

it("factory should be able to create a cactus", () => {
  const expectedValue = "cactus";
  const obstacle = CollidableObjectFactory.createCactus(
    mockedInfo,
    mockedLanesNum
  );

  expect(obstacle.type).toBe(expectedValue);
});

it("factory should be able to create a small cactus", () => {
  const expectedValue = "smallCactus";
  const obstacle = CollidableObjectFactory.createSmallCactus(
    mockedInfo,
    mockedLanesNum
  );

  expect(obstacle.type).toBe(expectedValue);
});

it("factory should be able to create a worm", () => {
  const expectedValue = "worm";
  const obstacle = CollidableObjectFactory.createWorm(
    mockedInfo,
    mockedLanesNum
  );

  expect(obstacle.type).toBe(expectedValue);
});

it("factory should be able to create a disco consumable", () => {
  const expectedValue = "discoConsumable";
  const obstacle = CollidableObjectFactory.createDiscoConsumable(
    mockedInfo,
    mockedLanesNum
  );

  expect(obstacle.type).toBe(expectedValue);
});
