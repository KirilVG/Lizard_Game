import StartMenu from "../Components/StartMenu";
import App from "../App";
import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

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
