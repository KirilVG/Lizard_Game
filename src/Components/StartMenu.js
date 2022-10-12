import React from "react";
import * as myConstants from "./Constants";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/material";



function StartMenu(props) {
  const [inputText, setInputText] = React.useState(myConstants.minLanesNum);
  const [inputUsername, setInputUsername] = React.useState(myConstants.defaultName);
  const [lanesValidation, setLanesValidation] = React.useState({valid:true,msg:""});
  const [usernameValidation, setUsernameValidation] = React.useState({valid:true,msg:""});

  const handleInput = (event) => {
    setInputText(event.target.value);
  };

  const handleUsernameInput = (event) => {
    setInputUsername(event.target.value);
  };

  const clickStart = () => {
    let lanesNum = Number(inputText);

    if (!lanesNum) {
      setLanesValidation({ valid: false, msg: "lanes should be a number" });
    } else if (lanesNum % 1 !== 0) {
      setLanesValidation({
        valid: false,
        msg: "lanes should be a whole number",
      });
    } else if (lanesNum < myConstants.minLanesNum) {
      setLanesValidation({
        valid: false,
        msg: `lanes should not be less than ${myConstants.minLanesNum}`,
      });
    } else if (lanesNum > myConstants.maxLanesNum) {
      setLanesValidation({
        valid: false,
        msg: `lanes should not be more than ${myConstants.maxLanesNum}`,
      });
    } else {
      props.onClick({ lanesNum: lanesNum, username: inputUsername });
    }
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
          backgroundImage: `url("${myConstants.startMenuBackgroundIMGUrl}")`,
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
                  <div class="card glassCard">
                    <div class="card-body p-5 text-white">
                      <div class="my-4">
                        <h2 class="text-center mb-5">
                          Welcome to Kiro the lizard!
                        </h2>
                        <form>
                          <ThemeProvider theme={theme}>
                            <Stack
                              spacing={5}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <TextField
                                sx={{
                                  "& .MuiInputLabel-root": { color: "white" },
                                  input: { color: "white" },
                                }}
                                error={!lanesValidation.valid}
                                helperText={!lanesValidation.valid && lanesValidation.msg}
                                id="outlined-basic"
                                label="Number of lanes"
                                variant="outlined"
                                onChange={handleInput}
                              />

                              <TextField
                                sx={{
                                  "& .MuiInputLabel-root": { color: "white" },
                                  input: { color: "white" },
                                }}
                                error={!usernameValidation.valid}
                                helperText={!usernameValidation.valid && usernameValidation.msg}
                                id="outlined-basic"
                                label="Username"
                                variant="outlined"
                                onChange={handleUsernameInput}
                              />

                              <button
                                type="button"
                                class="btn btn-light playButton"
                                onClick={clickStart}
                              >
                                Play
                              </button>
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