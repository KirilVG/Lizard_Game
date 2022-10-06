import React from "react";
import * as myConstants from "./Constants";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'

function StartMenu(props) {
  const [inputText, setInputText] = React.useState("3");
  const [inputUsername, setInputUsername] = React.useState("Noname");

  const handleInput = (event) => {
    setInputText(event.target.value);
  };

  const handleUsernameInput = (event) => {
    setInputUsername(event.target.value);
  };

  const clickStart = () => {
    let lanesNum = Number(inputText);

    if (!lanesNum) {
      alert("lanes should be a number");
    } else if (lanesNum % 1 !== 0) {
      alert("lanes should be a whole number");
    } else if (lanesNum < myConstants.minLanesNum) {
      alert(`lanes should not be less than ${myConstants.minLanesNum}`);
    } else if (lanesNum > myConstants.maxLanesNum) {
      alert(`lanes should not be more than ${myConstants.maxLanesNum}`);
    } else {
      props.onClick({ lanesNum: lanesNum, username: inputUsername });
    }
  };

  return (
    <div class="container">
      <h1>Welcome to Run Kiro the Lizard.</h1>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Lanes</Form.Label>
        <Form.Control variant="dark" type="number" placeholder="Enter the number of lanes you want to play on" onChange={handleInput}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="fromBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control variant="dark" type="text" placeholder="Enter your username" onChange={handleUsernameInput }/>
      </Form.Group>
      
      <Button variant="dark" type="button" onClick={clickStart}>
        Start
      </Button>
    </Form>
    </div>
  );
}

export default StartMenu;

/*
<div>
          <div class="nameField">Lanes:</div>
          <div class="inputField">
            <input size="30" maxlength="2048"  onChange={handleInput} />
          </div>
        </div>
        <div>
          <div class="nameField">Username:</div>
          <div class="inputField">
            <input size="30" maxlength="2048"  onChange={handleUsernameInput} />
          </div>
        </div>
      </div>
      <div class="nameField"></div>
      <button class="buttonStart" onClick={clickStart}>Start</button>
      */
