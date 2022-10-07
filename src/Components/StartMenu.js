import React from "react";
import * as myConstants from "./Constants";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/material";
import { green, purple } from '@mui/material/colors';



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
  
  const theme = createTheme({
    palette: {
      primary: {
        main: '#ffffff',
      },
      secondary: {
        main: '#000000',
      },
    },
  });
  return (
    <div>
      <div
        className="bg-immage d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `url("https://live.staticflickr.com/65535/48701594348_e099758f0c_b.jpg")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat-y",
          height: `100vh`,
        }}
      >
        <div class="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div class="d-flex justify-content-center align-items-center h-100">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-7 col-xl-6">
                  <div
                    class="card"
                    style={{
                      backdropFilter: "blur(15px)",
                      backgroundColor: "rgba(255,255,255,.2)",
                      borderRadius: "3em",
                      border: "2px solid rgba(255,255,255,.1)",
                      backgroundClip: "padding-box",
                      boxShadow: "10px 10px 10px rgba(46, 54, 68, 0.03)",
                    }}
                  >
                    <div class="card-body p-5 text-white">
                      <div class="my-4">
                        <h2 class="text-center mb-5">
                          Wellcome to Kiro the lizard!
                        </h2>
                        <form>
                          <ThemeProvider theme={theme} >
                          <Stack spacing={5} style={{display: "flex", alignItems: "center"}}>
  

                            <TextField
                              sx={{
                                "& .MuiInputLabel-root": { color: "white" },
                              }}
                              style={{ borderColor: "transparent" }}
                              id="outlined-basic"
                              label="Number of lanes"
                              variant="outlined"
                              onChange={handleUsernameInput}
                            />
                            <TextField
                              sx={{
                                "& .MuiInputLabel-root": { color: "white" },
                              }}
                              id="outlined-basic"
                              label="Username"
                              variant="outlined"
                              onChange={handleUsernameInput}
                            />
                            <button type="button" class="btn btn-light" style={{ height: `7vh`, width:'20vh', fontSize:"4vh" }} onClick={clickStart}>Play</button>
                            </Stack>
                          </ThemeProvider>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
