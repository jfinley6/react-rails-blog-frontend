import React, { useState, useEffect } from "react";
import { Switch, Route, BrowserRouter, useHistory } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import axios from "axios";

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN");
  const [user, setUser] = useState({});

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const history = useHistory()

  function checkLoginStatus() {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in && loggedInStatus === "NOT_LOGGED_IN") {
          setLoggedInStatus("LOGGED_IN")
          setUser(response.data.user)
          history.push("/dashboard")
        }
      })
      .catch((error) => console.log(error));
  }

  function handleLogin(data) {
    setLoggedInStatus("LOGGED_IN");
    setUser(data);
  }

  console.log(user);

  return (
    <div className="app d-flex justify-content-center">
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"}>
            <Home
              loggedInStatus={loggedInStatus}
              setLoggedInStatus={setLoggedInStatus}
              handleLogin={handleLogin}
            />
          </Route>
          <Route exact path={"/dashboard"}>
            <Dashboard loggedInStatus={loggedInStatus} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
