import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export function Reset() {
  const [password, setPassword] = useState("");

  const history = useHistory();
  const { id } = useParams();
  const { token } = useParams();

  function CreateReset(event) {
    event.preventDefault();
    if (password.length >= 5) {
      fetch(
        `https://pk-url-shortner.herokuapp.com/user/resetpassword/${id}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ password: password })
        }
      )
        .then((data) => data.json())
        .then((data) => {
          alert(data.message);

          setPassword("");
          history.push("/login");
        });
    } else {
      alert("password length should be greater or equal to 5");
    }
  }

  return (
    <div>
      <br />
      <br />
      <form className="Myform">
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="button" className="btn btn-primary" onClick={CreateReset}>
          Submit
        </button>
      </form>
    </div>
  );
}
