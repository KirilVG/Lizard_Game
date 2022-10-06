import React from "react";
import * as myConstants from "./Constants";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';
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

  const style = {
    backgroundImage: `linear-gradient(0deg, black 2px, rgba(0, 150, 136, 0) 0),
      linear-gradient(0deg, rgba(0, 0, 0, 0.26) 1px, transparent 0)`
  };
  

  return (
    <div class="container">
      <h1>Welcome to Run Kiro the Lizard.</h1>
      <form>
      <MDBInput className='mb-4' type='number' id='form5Example1' label='Number of lanes' />
      <MDBInput className='mb-4' type='text' style={style} id='form5Example2' label='Username' />

      <MDBBtn type='button' block>
        Play
      </MDBBtn>
      </form>
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
