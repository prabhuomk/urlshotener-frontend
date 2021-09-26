import { useEffect, useMemo, useState } from "react";
import { Chart } from "./Chart";

export function DashBoard() {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    []
  );

  const [urlCount, setUrlCount] = useState([]);
  useEffect(() => {
    fetch("https://pk-url-shortner.herokuapp.com/user/countUrl", {
      method: "GET"
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //console.log(data);
        const urlList = data.sort(function (a, b) {
          return a._id - b._id;
        });
        urlList.map((item) =>
          setUrlCount((prev) => [
            ...prev,
            {
              name: MONTHS[item._id - 1],
              "New Url": item.total,
              count: item.total
            }
          ])
        );
      })
      .catch((e) => console.log(e));
  }, [MONTHS]);

  return (
    <div className="dashboard">
      <Chart
        data={urlCount}
        title="Short Url Generated per Month"
        grid
        dataKey="New Url"
      />
    </div>
  );
}
