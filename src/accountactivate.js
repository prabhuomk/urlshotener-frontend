import { useHistory, useParams } from "react-router-dom";

export function Activate() {
  const history = useHistory();
  const { email_id } = useParams();
  const { token } = useParams();

  function Account(event) {
    event.preventDefault();
    fetch(
      `https://pk-url-shortner.herokuapp.com/user/activate_account/${email_id}/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify()
      }
    )
      .then((data) => data.json())
      .then((data) => {
        alert(data.message);
        history.push("/login");
      });
  }

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={Account}>
        Submit
      </button>
    </div>
  );
}
