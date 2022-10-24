import renderer from "react-test-renderer";
import Canvas from "../Components/Canvas";

const mockedId = "Id";

it("canvas should be rendered correctly", () => {
  const tree = renderer.create(<Canvas canvasID={mockedId} />).toJSON();
  expect(tree).toMatchSnapshot();
});
