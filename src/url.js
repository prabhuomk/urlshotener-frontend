import { useEffect, useState } from "react";

export function Url() {
  const [url, setUrl] = useState("");
  const [details, setDetails] = useState([]);
  const [change, setChange] = useState(false);

  const onShortUrlClick = (shortUrl) => {
    console.log(shortUrl);
    fetch(`https://pk-url-shortner.herokuapp.com/user/myUrl/${shortUrl}`, {
      method: "GET"
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        setChange(!change);
        window.open(data.mylongUrl, "_blank");
        //setAllUrls(data);
      })
      .catch((e) => console.log(e));
  };

  function GetAll() {
    fetch("https://pk-url-shortner.herokuapp.com/user/allUrl", {
      method: "GET"
    })
      .then((data) => data.json())
      .then((result) => {
        setDetails(result);
      });
  }

  useEffect(() => {
    GetAll();
  }, [change]);

  function CreateUrl(event) {
    if (url) {
      event.preventDefault();
      fetch(`https://pk-url-shortner.herokuapp.com/user/urlshorter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ longUrl: url })
      })
        .then((data) => data.json())
        .then((data) => {
          alert(data.shortUrl);
          setUrl("");
          setChange(!change);
        });
    } else {
      alert("enter the field");
    }
  }

  return (
    <div>
      <br />
      <br />
      <h3>URL SHORTENER</h3>
      <br />
      <form className="Myform">
        <div className="form-group">
          <label for="exampleInputPassword1">Paste your Url</label>
          <input
            type="text"
            onChange={(event) => setUrl(event.target.value)}
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="button" className="btn btn-primary" onClick={CreateUrl}>
          Submit
        </button>
      </form>
      <br />
      <br />
      <div className="row">
        {!details.length ? (
          <h2>Loading...</h2>
        ) : (
          details.map((url) => (
            <div className="col-md-4 col-sm-6 col-xs-12">
              <div
                className="card text-dark bg-light mb-3"
                style={{ maxWidth: "18rem", margin: "auto", textAlign: "left" }}
              >
                <div className="card-header">
                  Total clicks : {url.ClickCount}
                </div>
                <div className="card-body">
                  <h6 className="card-title">
                    <p
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => onShortUrlClick(url.shortUrl)}
                    >
                      <b className="text-dark">Short-Url : </b>
                      http://pk/{url.shortUrl}
                    </p>
                  </h6>
                  <p className="card-text">
                    <b className="text-dark">Long-Url : </b>
                    {url.longUrl}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
