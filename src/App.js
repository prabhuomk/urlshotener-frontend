import "./styles.css";
import { Header } from "./header.js";
import { SignUp } from "./signup.js";
import { Switch, Route } from "react-router-dom";

import { Login } from "./login.js";
import { ForgetPassword } from "./forgetpassword.js";
import { Reset } from "./resetpassword.js";
import { Activate } from "./accountactivate.js";
import { Url } from "./url.js";
import { HomePage } from "./homepage.js";
import { DashBoard } from "./Dashboard.js";
import { useState } from "react";
export default function App() {
  const tkn = !localStorage.getItem("token") && "";
  const [isToken, setIsToken] = useState(tkn);

  return (
    <div className="App">
      <Header isToken={isToken} setIsToken={setIsToken} />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login setIsToken={setIsToken} />
        </Route>
        <Route path="/url">
          <Url />
        </Route>
        <Route path="/dashboard">
          <DashBoard />
        </Route>
        <Route path="/forgetpassword">
          <ForgetPassword />
        </Route>
        <Route path="/account-activation/:email_id/:token">
          <Activate />
        </Route>
        <Route path="/password-reset/:id/:token">
          <Reset />
        </Route>
      </Switch>
    </div>
  );
}
