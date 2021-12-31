import axios from "axios";
import React from "react";

const App = () => {
  const getData = async () => {
    try {
      const response = await axios({
        url: `http://65.21.60.19:4000/getAll`,
        method: `GET`,
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
      });

      console.log(response);
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div>
      <h1>Hello World React Client</h1>
      <button onClick={getData}>Test Click</button>
    </div>
  );
};

export default App;
