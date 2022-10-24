import renderer from "react-test-renderer";
import GameWrapper from "../Components/GameWrapper";

const mockedId = "Id";
const mockedLanesNum = 3;
const mockdedGameEndHandler = () => {};

it("game wrapper should be rendered correctly", () => {
  const handleGameEnd = () => {};
  const tree = renderer
    .create(
      <GameWrapper
        id={mockedId}
        lanesNum={mockedLanesNum}
        gameEndHandler={mockdedGameEndHandler}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
