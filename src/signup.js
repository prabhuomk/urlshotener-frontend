import { useState } from "react";
import { useHistory } from "react-router-dom";

export function SignUp() {
  const [emailid, setEmailId] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  function CreateSignup(event) {
    event.preventDefault();
    if (
      !emailid.includes("@") ||
      !emailid.includes(".") ||
      emailid.length < 8 ||
      password.length < 5
    ) {
      alert("Email is not valid or password length is less then 5 ");
    } else if (emailid && password && firstname && lastname) {
      fetch("https://pk-url-shortner.herokuapp.com/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email_id: emailid,
          firstname: firstname,
          lastname: lastname,
          password: password
        })
      })
        .then((data) => data.json())
        .then((data) => {
          alert(data.message);
          setEmailId("");
          setFirstName("");
          setLastName("");
          setPassword("");
          history.push("/");
        });
    } else {
      alert("Please enter the fields");
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
          <label for="exampleInputEmail2">First Name</label>
          <input
            type="text"
            onChange={(event) => setFirstName(event.target.value)}
            className="form-control"
            id="exampleInputEmail2"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail3">Last Name</label>
          <input
            type="text"
            onChange={(event) => setLastName(event.target.value)}
            className="form-control"
            id="exampleInputEmail3"
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

        <button
          type="button"
          className="btn btn-primary"
          onClick={CreateSignup}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
