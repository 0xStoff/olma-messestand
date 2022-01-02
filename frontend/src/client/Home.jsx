import axios from "axios";
import React, { useState } from "react";
import { Card, Table, InputGroup, FormControl } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  dropTableFunction,
  queryDataFunction,
  getRandomUsersFunction,
  luckyDrawFunction,
} from "./services/tableFunctions";

import ButtonsTest from "./components/Buttons";
import List from "./components/List";

/* Home-Site Component */
const Home = (props) => {
  /* define different states */

  /* any state modified direytly? try console with setState */
  const [query, setQuery] = useState(0);
  const [errorServer, setErrorServer] = useState(false);
  const [teilnehmerInput, setTeilnehmerInput] = useState(false);
  const [winnersObj, setWinnersObj] = useState([]);

  // ajax calls in componentDidMount = useEffect in hooks
  // mounting order: constructor > render > mounted

  const queryData = async () => {
    const response = await queryDataFunction();
    setQuery((state) => {
      return { ...state, response };
    });
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
    const uniqueWinners = luckyDrawFunction(query.response.data);
    setWinnersObj(() => {
      return uniqueWinners;
    });
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

    queryData();
  };

  const { errorSwal, successSwal, confirmSwal } = props;
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
    <div>
      <ButtonsTest
        queryData={queryData}
        dropTable={dropTable}
        getRandomUsers={getRandomUsers}
        query={query}
        luckyDraw={luckyDraw}
        teilnehmerInput={teilnehmerInput}
        errorSwal={errorSwal}
        successSwal={successSwal}
        confirmSwal={confirmSwal}
      />

      <InputGroup size="sm" className="generateUsers m-3">
        <FormControl type="number" placeholder="number" onChange={onChange} />
      </InputGroup>
      <div className="mt-5 m-3 w-50">
        <h2>Gewinner</h2>
        <Card className="participants">
          <Card.Body>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Vorname</th>
                  <th>Nachname</th>
                </tr>
              </thead>
              <tbody className="winners">
                {winnersObj.map((winner, i) => {
                  return (
                    <tr key={i}>
                      <td>{winner.winnerId}</td>
                      <td>{winner.vorname}</td>
                      <td>{winner.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>{" "}
        </Card>
      </div>
      <h2 className="mt-5 m-3">Teilnehmer</h2>

      <List query={query} />
      <div> {errorServer}</div>
    </div>
  );
};

export default Home;
