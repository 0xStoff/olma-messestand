import axios from "axios";
import React, { useState } from "react";
import { Card, Table, InputGroup, FormControl } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  dropTableFunction,
  queryDataFunction,
  getRandomUsersFunction,
  luckyDrawFunction,
} from "./functions/tableFunctions";
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

  /* query Data from database with passed arguments (Post or get), nodeJS api */
  const queryData = async (method, data) => {
    try {
      const response = await axios({
        url: `http://65.21.188.255:80/api/${method}`,
        method: `${method}`,
        mode: "cors",
        data: `${data}`,
        headers: {
          "Content-type": "application/json",
        },
      });
      setQuery((state) => {
        return { ...state, response };
      });
    } catch {
      setErrorServer(() => {
        return (
          <h1>Error, Server nicht verbunden. Starte Node.js und MySQL.</h1>
        );
      });
    }
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
      await queryData("post", teilnehmerJson);
    }
  };

  /* get a winner from teilnehmer and write into database */
  // const luckyDraw = async () => {
  //   const response = await axios({
  //     url: `http://65.21.188.255:80/api/resetwinners`,
  //     method: `POST`,
  //     mode: "cors",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //   });

  //   const teilnehmer = query.response.data.length;
  //   if (teilnehmer < 32) {
  //     props.errorSwal("At least 32 participants for lottery");
  //   } else {
  //     Swal.fire({
  //       title: `Gewinner werden ermittelt und in DB gespeichert`,
  //       timerProgressBar: true,
  //       customClass: {
  //         confirmButton: "btn",
  //         cancelButton: "btn btn-danger m-2",
  //       },
  //       buttonsStyling: false,
  //       preConfirm: async () => {
  //         Swal.showLoading();
  //         try {
  //           const participants = query.response.data;
  //           let winnersId = [];
  //           let winnersObj = [];
  //           let uniqueWinners = [];
  //           let participantSelfie = [];

  //           for (let i = 0; i < participants.length; i++) {
  //             if (participants[i].selfie == 1) {
  //               participantSelfie = [
  //                 ...participantSelfie,
  //                 participants[i],
  //                 participants[i],
  //                 participants[i],
  //               ];
  //             }
  //           }

  //           participants.push(...participantSelfie);
  //           for (let i = 0; uniqueWinners.length < 32; i++) {
  //             winnersId[i] = Math.round(
  //               Math.random() * (participants.length - 1)
  //             );
  //             winnersObj[i] = participants[winnersId[i]];
  //             uniqueWinners = [...new Set(winnersObj)];
  //           }

  //           for (let i = 0; i < uniqueWinners.length; i++) {
  //             uniqueWinners[i].winnerId = i + 1;
  //             const uniqueWinnersJson = JSON.stringify(uniqueWinners[i]);
  //             await axios({
  //               url: `http://65.21.188.255:80/api/winners`,
  //               method: `POST`,
  //               mode: "cors",
  //               data: uniqueWinnersJson,
  //               headers: {
  //                 "Content-type": "application/json",
  //               },
  //             });
  //           }
  //           await queryData("get");

  //           setWinnersObj(() => {
  //             return uniqueWinners;
  //           });
  //         } catch {
  //           console.log("error");
  //         }
  //       },
  //     })
  //       .then((result) => {
  //         if (result.isConfirmed) {
  //           props.successSwal("Gewinner erfolgreich in DB gespeicher");
  //         }
  //       })
  //       .catch((error) => {
  //         Swal.showValidationMessage(`Request failed: ${error}`);
  //       });
  //   }
  // };

  const luckyDraw = async () => {
    const uniqueWinners = await luckyDrawFunction(query.response.data);
    let uniqueWinnersJson = [];
    setWinnersObj(() => {
      return uniqueWinners;
    });
    for (let i = 0; i < uniqueWinners.length; i++) {
      uniqueWinners[i].winnerId = i + 1;
      uniqueWinnersJson[i] = JSON.stringify(uniqueWinners[i]);
    }

    await axios({
      url: `http://65.21.188.255:80/api/winners`,
      method: `POST`,
      mode: "cors",
      data: uniqueWinnersJson,
      headers: {
        "Content-type": "application/json",
      },
    });

    await queryData("get");
  };

  /* error handling for input field */
  const onChange = (event) => {
    if (parseInt(event.target.value) > 100) {
      event.target.value = 100;
      props.errorSwal("Can't fetch more than 100!");
    }
    if (parseInt(event.target.value) < 1) {
      event.target.value = 1;
      props.errorSwal("Fetch more than 1!");
    }

    setTeilnehmerInput(() => {
      return event.target.value;
    });
  };

  return (
    /* pass Home instead, use onDelete/handleDelete, destructure arguments */
    <div>
      {/* <button className="btn btn-primary">Test</button> */}
      <Buttons
        queryData={queryData}
        dropTable={dropTable}
        getRandomUsers={getRandomUsers}
        query={query}
        luckyDraw={luckyDraw}
        teilnehmerInput={teilnehmerInput}
        errorSwal={props.errorSwal}
        successSwal={props.successSwal}
        confirmSwal={props.confirmSwal}
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

/* destructure arguments 
instead of passing props and calling props.method()
pass a destructured argument like {queryData},
you can use the function only with queryData later.
*/
const Buttons = (props) => {
  const buttonClass = "btn btn-outline-dark m-2 buttonTheme";
  const {
    queryData,
    query,
    successSwal,
    dropTable,
    errorSwal,
    getRandomUsers,
    luckyDraw,
    confirmSwal,
    teilnehmerInput,
  } = props;

  return (
    <div className="mt-5">
      <button
        onClick={async () => {
          try {
            await queryData("get");
          } catch {
            if (query.response == undefined) {
              errorSwal("Generate Data First!");
            }
          }
        }}
        type="button"
        className={buttonClass}
      >
        Query{" "}
      </button>
      <button
        onClick={async () => {
          if (query.response == undefined || query.response.data.length == 0) {
            errorSwal("Nothing to drop, generate first!");
          } else {
            const confirm = await confirmSwal("Are you Sure?");

            if (confirm.isConfirmed) {
              successSwal(`Database dropped successfully`);
              dropTable();
            }
          }
        }}
        type="button"
        className={buttonClass}
      >
        Drop{" "}
      </button>
      <button
        onClick={() => {
          if (!teilnehmerInput) {
            errorSwal("No Input");
          } else {
            if (
              query.response == undefined ||
              query.response.data.length == 0
            ) {
              Swal.fire({
                title: "Loading Data into Database?",
                showCancelButton: true,
                showLoaderOnConfirm: true,
                allowOutsideClick: false,
                customClass: {
                  confirmButton: "btn",
                  cancelButton: "btn btn-danger m-2",
                },
                buttonsStyling: false,
                preConfirm: async () => {
                  document.getElementsByClassName(
                    "swal2-cancel"
                  )[0].style.display = "none";

                  Swal.showLoading();
                  try {
                    await getRandomUsers();
                    await queryData("get");
                  } catch (err) {
                    Swal.showValidationMessage(`Request failed: ${err}`);
                  }
                },
              })
                .then((result) => {
                  if (result.isConfirmed) {
                    successSwal("Participants successfully load");
                  }
                })
                .catch((error) => {
                  Swal.showValidationMessage(`Request failed: ${error}`);
                });
            } else {
              errorSwal("Drop Database first!");
            }
          }
        }}
        type="button"
        className={buttonClass}
      >
        Generate{" "}
      </button>
      <button
        onClick={() => {
          if (query == 0) {
            errorSwal("Generate and Query Data first");
          } else {
            queryData("get");
            luckyDraw();
          }
        }}
        type="button"
        className={buttonClass}
      >
        Lucky Draw{" "}
      </button>
    </div>
  );
};

const List = (props) => {
  let clients = props.query.response;
  let mapClients;

  if (clients !== undefined && clients.data.length > 0) {
    clients = clients.data;
    mapClients = clients.map((client, i) => {
      return (
        <tr key={i}>
          {/* <td>{client.id}</td> */}
          <td>{client.vorname}</td>
          <td>{client.name}</td>
          <td>{client.geburtsdatum}</td>
          <td>{client.adresse}</td>
          <td>{client.plz}</td>
          <td>{client.telefonnummer}</td>
          <td>{client.email}</td>
          {/* <td>{client.winnerId}</td>
          <td>{client.selfie}</td> */}
        </tr>
      );
    });
  }

  return (
    <div className="m-3">
      <Card className="participants">
        <Card.Body>
          <Table>
            <thead>
              <tr>
                {/* <th>#</th> */}
                <th>Vorname</th>
                <th>Nachname</th>
                <th>Geburtsdatum</th>
                <th>Adresse</th>
                <th>PLZ</th>
                <th>Telefon</th>
                <th>E-Mail</th>
                {/* <th>Gewinner</th>
                <th>Selfie</th> */}
              </tr>
            </thead>
            <tbody>{mapClients}</tbody>
          </Table>
        </Card.Body>{" "}
      </Card>
    </div>
  );
};

export default Home;

/* drop table / delete table from database, nodejs api */
// const dropTable = async () => {
//   try {
//     const response = await axios({
//       url: `http://65.21.188.255:80/api/delete`,
//       method: `POST`,
//       mode: "cors",
//       headers: {
//         "Content-type": "application/json",
//       },
//     });

//     setQuery((state) => {
//       return 0;
//     });
//     setWinnersObj(() => {
//       return [];
//     });
//     return response;
//   } catch {
//     console.log("error");
//   }
// };

/* get dummy-users from external api, only save the data we need */
// const getRandomUsers = async () => {
//   try {
//     const size = parseInt(teilnehmerInput);
//     const responseRandomUser = await axios.get(
//       `https://random-data-api.com/api/users/random_user?size=${size}`
//     );
//     let cleanTeilnehmer = [];
//     for (let i = 0; i < responseRandomUser.data.length; i++) {
//       const teilnehmerBirth = responseRandomUser.data[i].date_of_birth
//         .split("-")
//         .reverse()
//         .join(".");

//       const randomPhoneNumber = await axios({
//         url: "https://random-data-api.com/api/phone_number/random_phone_number",
//         method: "GET",
//         mode: "cors",
//         headers: {
//           "Content-type": "application/json",
//         },
//       });

//       const {
//         first_name: vorname,
//         last_name: name,
//         address: { street_address: adresse },
//         id: plz,
//         email,
//       } = responseRandomUser.data[i];

//       cleanTeilnehmer[i] = {
//         id: i,
//         vorname,
//         name,
//         geburtstag: teilnehmerBirth,
//         adresse,
//         plz,
//         telefonnummer: randomPhoneNumber.data.cell_phone_in_e164,
//         email,
//         winnerId: 0,
//         selfie: 0,
//       };
//     }

//     for (let i = 0; i < cleanTeilnehmer.length; i++) {
//       const teilnehmerJson = JSON.stringify(cleanTeilnehmer[i]);
//       await queryData("post", teilnehmerJson);
//     }
//     return cleanTeilnehmer;
//   } catch (err) {
//     console.log("error: ", err);
//   }
// };
