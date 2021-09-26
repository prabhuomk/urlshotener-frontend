import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export function Header({ isToken, setIsToken }) {
  const history = useHistory();

  const Logout = () => {
    localStorage.setItem("token", "");
    setIsToken("");
    alert("logged-out-successfully");
    //history.push("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div>
          <a className="navbar-brand" href="##">
            URL SHORTNER
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/" className="nav-link active">
                  HOME
                </Link>
              </li>
              {isToken === "" ? (
                <>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link active">
                      SIGNUP
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link active">
                      LOGIN
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link active">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/url" className="nav-link active">
                      URL
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/" onClick={Logout} className="nav-link active">
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
