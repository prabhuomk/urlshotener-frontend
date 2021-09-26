import { useState } from "react";
import { useHistory } from "react-router-dom";

export function Login({ setIsToken }) {
  const [emailid, setEmailId] = useState("");

  const [password, setPassword] = useState("");

  const history = useHistory();

  function CreateLogin(event) {
    event.preventDefault();
    if (emailid && password) {
      fetch("https://pk-url-shortner.herokuapp.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email_id: emailid, password: password })
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.email_id) {
            localStorage.setItem("token", data.token);
            setIsToken(data.token);
            alert(data.message);
            setEmailId("");
            setPassword("");
            history.push("/dashboard");
          } else {
            alert(data.message);
          }
        });
    } else {
      alert("enter the field");
    }
  }

  return (
    <div>
      <br />
      <br />
      <form className="Myform">
        <div className="form-group">
          <label for="exampleInputEmail1">Email_Id</label>
          <input
            type="email"
            onChange={(event) => setEmailId(event.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>

        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <h6
          onClick={() => history.push("/forgetpassword")}
          style={{ cursor: " pointer", color: "blue" }}
        >
          Forget Password
        </h6>
        <button type="button" className="btn btn-primary" onClick={CreateLogin}>
          Submit
        </button>
      </form>
    </div>
  );
}
