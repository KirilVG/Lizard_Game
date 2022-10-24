import Game from "../Components/Game";
import renderer from "react-test-renderer";

it("game renders correctly", () => {
    const tree = renderer
      .create(
        <Game />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });