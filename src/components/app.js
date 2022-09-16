import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Home from "./Home";
import Content from "./Content";
import NavBar from "./NavBar";
import NewPost from "./NewPost";
import axios from "axios";

import User from "./User";

import PostDetail from "./PostDetail";

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN");
  const [user, setUser] = useState({});
  const [screen, setScreen] = useState(false);
  const [storedPost, setStoredPost] = useState("");
  const [storedSubject, setStoredSubject] = useState("");

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const history = useHistory();

  function checkLoginStatus() {
    axios
      .get("https://radiant-atoll-92288.herokuapp.com/logged_in", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.logged_in && loggedInStatus === "NOT_LOGGED_IN") {
          setLoggedInStatus("LOGGED_IN");
          setUser(response.data.user);
          history.push("/");
        } else if (!response.data.logged_in && loggedInStatus === "LOGGED_IN") {
          setLoggedInStatus("NOT_LOGGED_IN");
          setUser({});
        } else if (!response.data.logged_in) {
          setUser({});
          history.push("/");
        }
      })
      .catch((error) => console.log(error));
  }

  function handleLogin(data) {
    setLoggedInStatus("LOGGED_IN");
    setUser(data);
  }

  function handleLogout() {
    axios
      .delete("https://radiant-atoll-92288.herokuapp.com/logout", {
        withCredentials: true,
      })
      .then(() => {
        setLoggedInStatus("NOT_LOGGED_IN");
        setUser({});
        history.push("/");
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="app d-flex flex-column justify-content-center">
      <NavBar
        loggedInStatus={loggedInStatus}
        setScreen={setScreen}
        handleLogout={handleLogout}
        user={user}
      />
      <Switch>
        <Route exact path={"/"}>
          <Content loggedInStatus={loggedInStatus} user={user} />
        </Route>
        <Route exact path={"/home"}>
          <Home
            screen={screen}
            setScreen={setScreen}
            loggedInStatus={loggedInStatus}
            setLoggedInStatus={setLoggedInStatus}
            handleLogin={handleLogin}
          />
        </Route>

        <Route exact path={"/new"}>
          <NewPost
            user={user}
            storedPost={storedPost}
            setStoredPost={setStoredPost}
            setStoredSubject={setStoredSubject}
            storedSubject={storedSubject}
          />
        </Route>

        <Route exact path={"/user"}>
          <User user={user} setUser={setUser}/>
        </Route>
        <Route exact path="/posts/:id">
          <PostDetail user={user} loggedInStatus={loggedInStatus} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
