import VariableContainer from "../Components/VariableContainer";

it("variable container calculates variables", () => {
  const varContainer = VariableContainer(1000, 1000, 3);
  expect(varContainer).toBeInstanceOf(Object);
});
