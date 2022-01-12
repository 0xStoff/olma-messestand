import axios from "axios";
export const sendUmfrageResults = async (result) => {
  try {
    const response = await axios({
      url: `http://65.21.188.255:80/api/result`,
      method: `POST`,
      mode: "cors",
      data: result,
      headers: {
        "Content-type": "application/json",
      },
    });
    return response;
  } catch {
    console.log("error");
  }
};

export const getUmfrageResult = async (result) => {
  try {
    const response = await axios({
      url: `http://65.21.188.255:80/api/allresults`,
      method: `GET`,
      mode: "cors",
      data: result,
      headers: {
        "Content-type": "application/json",
      },
    });
    return response;
  } catch {
    console.log("error");
  }
};

export const getUmfrageQuestions = async (result) => {
  try {
    const response = await axios({
      url: `http://65.21.188.255:80/api/umfrage`,
      method: `GET`,
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
    });
    return response;
  } catch {
    console.log("error");
  }
};

export const chartConfig = (props) => {
  // console.log(props);
  const config = {
    options: {
      chart: {
        width: 380,
        type: "polarArea",
      },

      fill: {
        opacity: 1,
      },
      stroke: {
        width: 1,
        colors: "white",
      },
      yaxis: {
        show: false,
      },
      legend: {
        position: "bottom",
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0,
          },
          spokes: {
            strokeWidth: 0,
          },
        },
      },
      theme: {
        monochrome: {
          enabled: true,
          shadeTo: "light",
          color: "#102a43",
          shadeIntensity: 0.6,
        },
      },
    },
  };
  return config;
};
