import React from "react";
import * as myConstants from "./Constants";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import "bootstrap/dist/css/bootstrap.min.css";
import FormControl from "@mui/material/FormControl";

function StartMenu(props) {
  const [inputText, setInputText] = React.useState(props.lanesNum);
  const [inputUsername, setInputUsername] = React.useState(props.username);
  const [lanesValidation, setLanesValidation] = React.useState({
    valid: true,
    msg: "",
  });
  const [usernameValidation, setUsernameValidation] = React.useState({
    valid: true,
    msg: "",
  });

  const handleInput = (event) => {
    setInputText(event.target.value);
  };

  const handleUsernameInput = (event) => {
    setInputUsername(event.target.value);
  };

  const validateLanesNum = () => {
    let lanesNum = Number(inputText);

    let res = { valid: true, val: lanesNum };

    if (!inputText) {
      res.valid = false;

      setLanesValidation({ valid: false, msg: "input should not be empty" });
    } else if (!lanesNum) {
      res.valid = false;

      setLanesValidation({ valid: false, msg: "lanes should be a number" });
    } else if (lanesNum % 1 !== 0) {
      res.valid = false;

      setLanesValidation({
        valid: false,
        msg: "lanes should be a whole number",
      });
    } else if (lanesNum < myConstants.minLanesNum) {
      res.valid = false;

      setLanesValidation({
        valid: false,
        msg: `lanes should not be less than ${myConstants.minLanesNum}`,
      });
    } else if (lanesNum > myConstants.maxLanesNum) {
      res.valid = false;

      setLanesValidation({
        valid: false,
        msg: `lanes should not be more than ${myConstants.maxLanesNum}`,
      });
    }

    return res;
  };

  const validateUsernameInput=()=>{
    let username = inputUsername;

    let res = { valid: true, val: username };

    (!username && (username = myConstants.defaultName))

    return res;
  };

  const clickStart = () => {
    let validLanesInput=validateLanesNum();

    let validUsernameInput=validateUsernameInput();

    (validLanesInput.valid && validUsernameInput.valid && props.onClick({ lanesNum: validLanesInput.val, username: validUsernameInput.val }));
    
  };

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
                        <FormControl>
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
                              helperText={
                                !lanesValidation.valid && lanesValidation.msg
                              }
                              defaultValue={props.lanesNum}
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
                              helperText={
                                !usernameValidation.valid &&
                                usernameValidation.msg
                              }
                              defaultValue={props.username}
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
                        </FormControl>
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
