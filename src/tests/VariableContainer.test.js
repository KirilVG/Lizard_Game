import VariableContainer from "../Components/VariableContainer";

const creaateMockedPlayer = () => {
  return {
    fuel: 0,
    dead: false,
    handleDeath: function () {
      this.dead = true;
    }
  }
}
const createMockedObstacle = (info) => {
  return {
    info: info,
    collided: false,
    collisionHandler: info.collisionHandler,
  }
}

it("variable container calculates variables", () => {
  const varContainer = VariableContainer(1000, 1000, 3);
  expect(varContainer).toBeInstanceOf(Object);
});

it("variable container kill player should execute the players handle death function", () => {
  const expectedValue = true;
  const varContainer = VariableContainer(1000, 1000, 3);
  const mockedPlayer = creaateMockedPlayer();
  const mockedObstacle = createMockedObstacle(varContainer.bird)

  mockedObstacle.collisionHandler(mockedPlayer);

  expect(mockedPlayer.dead).toBe(expectedValue);
});

it("variable container restore fuel should max the player'f fuel", () => {
  const expectedValue = 100;
  const varContainer = VariableContainer(1000, 1000, 3);
  const mockedPlayer = creaateMockedPlayer();

  varContainer.worm.collisionHandler(mockedPlayer);

  expect(mockedPlayer.fuel).toBe(expectedValue);
});

it("variable container consume disco consumable should max the player's fuel", () => {
  const expectedValue = 100;
  const varContainer = VariableContainer(1000, 1000, 3);
  const mockedPlayer = creaateMockedPlayer();

  varContainer.discoConsumable.collisionHandler(mockedPlayer);

  expect(mockedPlayer.fuel).toBe(expectedValue);
});
