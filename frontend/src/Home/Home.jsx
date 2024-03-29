import axios from "axios";
import React, { useState } from "react";
import {
  Tooltip,
  OverlayTrigger,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import * as all from "../_services/tableFunctions";
import QueryButton from "../_components/buttons/QueryButton";
import DropButton from "../_components/buttons/DropButton";
import GenerateButton from "../_components/buttons/GenerateButton";
import LuckyDrawButton from "../_components/buttons/LuckyDrawButton";
import List from "./List";
import TooltipComponent from "../_components/common/tooltip";

/* Home-Site Component */
const Home = (props) => {
  /* define different states */
  const { swalAlerts } = props;
  const { errorSwal } = props.swalAlerts;
  const {
    dropTableFunction,
    queryDataFunction,
    getRandomUsersFunction,
    luckyDrawFunction,
  } = all;

  /* any state modified direytly? try console with setState */
  const [query, setQuery] = useState(0);
  const [teilnehmerInput, setTeilnehmerInput] = useState(false);
  const [winnersObj, setWinnersObj] = useState([]);

  const queryData = async () => {
    const response = await queryDataFunction();

    if (response.data.length == 0) {
      errorSwal("Generate Data First!");
    } else {
      setQuery((state) => {
        return { ...state, response };
      });
    }
    return response;
  };

  const dropTable = async () => {
    const response = await dropTableFunction();
    if (response) {
      setQuery(() => {
        return 0;
      });
      setWinnersObj(() => {
        return [];
      });
    } else {
      console.log("err");
    }
  };

  const getRandomUsers = async () => {
    const responseUsers = await getRandomUsersFunction(teilnehmerInput);
    for (let i = 0; i < responseUsers.length; i++) {
      const teilnehmerJson = JSON.stringify(responseUsers[i]);

      await axios({
        url: `http://65.21.188.255:80/api/post`,
        method: `POST`,
        mode: "cors",
        data: teilnehmerJson,
        headers: {
          "Content-type": "application/json",
        },
      });
    }
  };

  const luckyDraw = async () => {
    // console.log(query.response.data);
    let uniqueWinners = luckyDrawFunction(query.response.data);

    for (let i = 0; i < uniqueWinners.length; i++) {
      uniqueWinners[i].winnerId = i + 1;
    }

    await axios({
      url: `http://65.21.188.255:80/api/winners`,
      method: `POST`,
      mode: "cors",
      data: uniqueWinners,
      headers: {
        "Content-type": "application/json",
      },
    });
    setWinnersObj(() => {
      return uniqueWinners;
    });
    queryData();
  };

  /* error handling for input field */
  const onChange = (event) => {
    if (parseInt(event.target.value) > 100) {
      event.target.value = 100;
      errorSwal("Can't fetch more than 100!");
    }
    if (parseInt(event.target.value) < 1) {
      event.target.value = 1;
      errorSwal("Fetch more than 1!");
    }

    setTeilnehmerInput(() => {
      return event.target.value;
    });
  };

  return (
    /* pass Home instead, use onDelete/handleDelete, destructure arguments */
    <div className="mt-5">
      <div className="d-flex">
        <QueryButton queryData={queryData} />
        <DropButton
          query={query}
          dropTable={dropTable}
          swalAlerts={swalAlerts}
        />

        <LuckyDrawButton
          query={query}
          queryData={queryData}
          errorSwal={swalAlerts.errorSwal}
          luckyDraw={luckyDraw}
        />
      </div>

      <div className="d-flex">
        <GenerateButton
          queryData={queryData}
          getRandomUsers={getRandomUsers}
          query={query}
          teilnehmerInput={teilnehmerInput}
          swalAlerts={swalAlerts}
        />
        <InputGroup className="generateUsers m-2">
          <FormControl type="number" placeholder="number" onChange={onChange} />
        </InputGroup>
        <TooltipComponent
          text={`Generiere zwischen 1 und 100 zufälligen Teilnehmern. Daten werden von
      https://random-data-api.com/ abgerufen und in die MySQL Datenbank
      geschrieben.`}
        />
      </div>
      <List query={query} winnersObj={winnersObj} />
    </div>
  );
};

export default Home;
