import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders title element', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to run Kiro the lizard!/i);

  expect(linkElement).toBeInTheDocument();
});

test('renders lanes input', () => {
  render(<App />);
  const lanesInput = screen.getByLabelText(/Number of lanes/i);

  expect(lanesInput).toBeInTheDocument();
});

test('renders username input', () => {
  render(<App />);
  const usernameInput = screen.getByLabelText(/Username/i);

  expect(usernameInput).toBeInTheDocument();
});

test('button should be rendered', () => {
  render(<App/>);
  const buttonEl=screen.getByRole("button");

  expect(buttonEl).toBeInTheDocument();
});

test('lanes input should change', () => {
  render(<App />);
  const lanesInput = screen.getByLabelText(/Number of lanes/i);
  const testValue="2";

  fireEvent.change(lanesInput,{target:{value:testValue}});

  expect(lanesInput.value).toBe(testValue);
});

test('lanes input should set error prop to true when play button is pressed and Lanes input does not contain a number', () => {
  render(<App />);
  const lanesInput = screen.getByLabelText(/Number of lanes/i);
  const testValue="a";
  const buttonEl=screen.getByRole("button");

  fireEvent.change(lanesInput,{target:{value:testValue}});
  fireEvent.click(buttonEl);

  const linkElement = screen.getByText(/lanes should be a number/i);

  expect(linkElement).toBeInTheDocument();
});

test('lanes input should set error prop to true when play button is pressed and Lanes input contains a number less than the minimum', () => {
  render(<App />);
  const lanesInput = screen.getByLabelText(/Number of lanes/i);
  const testValue="2";
  const buttonEl=screen.getByRole("button");

  fireEvent.change(lanesInput,{target:{value:testValue}});
  fireEvent.click(buttonEl);

  const linkElement = screen.getByText(/lanes should not be less than 3/i);

  expect(linkElement).toBeInTheDocument();
});

test('lanes input should set error prop to true when play button is pressed and Lanes input contains a number more than the maximum', () => {
  render(<App />);
  const lanesInput = screen.getByLabelText(/Number of lanes/i);
  const testValue="102";
  const buttonEl=screen.getByRole("button");

  fireEvent.change(lanesInput,{target:{value:testValue}});
  fireEvent.click(buttonEl);

  const linkElement = screen.getByText(/lanes should not be more than 100/i);

  expect(linkElement).toBeInTheDocument();
});

test('username should change', () => {
  render(<App />);
  const usernameInput = screen.getByLabelText(/Username/i);
  const testValue="User";

  fireEvent.change(usernameInput,{target:{value:testValue}});

  expect(usernameInput.value).toBe(testValue);
});


