import axios from "axios";

export const getQuestionsFunctions = async () => {
  try {
    const response = await axios({
      url: `http://65.21.188.255:80/api/questions`,
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

/* drop table / delete table from database, nodejs api */
export const dropTableFunction = async () => {
  try {
    const response = await axios({
      url: `http://65.21.188.255:80/api/delete`,
      method: `POST`,
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

export const queryDataFunction = async () => {
  try {
    const response = await axios({
      url: `http://65.21.188.255:80/api/get`,
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

export const getRandomUsersFunction = async (teilnehmerInput) => {
  try {
    const size = parseInt(teilnehmerInput);
    const responseRandomUser = await axios.get(
      `https://random-data-api.com/api/users/random_user?size=${size}`
    );
    let cleanTeilnehmer = [];
    for (let i = 0; i < responseRandomUser.data.length; i++) {
      const teilnehmerBirth = responseRandomUser.data[i].date_of_birth
        .split("-")
        .reverse()
        .join(".");

      const randomPhoneNumber = await axios({
        url: "https://random-data-api.com/api/phone_number/random_phone_number",
        method: "GET",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
      });

      const {
        first_name: vorname,
        last_name: name,
        address: { street_address: adresse },
        id: plz,
        email,
      } = responseRandomUser.data[i];

      cleanTeilnehmer[i] = {
        id: i,
        vorname,
        name,
        geburtstag: teilnehmerBirth,
        adresse,
        plz,
        telefonnummer: randomPhoneNumber.data.cell_phone_in_e164,
        email,
        winnerId: 0,
        selfie: 0,
        questions: 1,
      };
    }

    return cleanTeilnehmer;
  } catch (err) {
    console.log("error: ", err);
  }
};

export const luckyDrawFunction = (participants) => {
  try {
    let winnersId = [];
    let winnersObj = [];
    let uniqueWinners = [];
    let participantSelfie = [];

    for (let i = 0; i < participants.length; i++) {
      if (participants[i].selfie != 0) {
        participantSelfie = [
          ...participantSelfie,
          participants[i],
          participants[i],
          participants[i],
        ];
      }

      if (participants[i].gewinnspiel == 0) {
        participants.splice(i, 1);
      }
    }

    participants.push(...participantSelfie);
    for (let i = 0; uniqueWinners.length < 32; i++) {
      winnersId[i] = Math.round(Math.random() * (participants.length - 1));
      winnersObj[i] = participants[winnersId[i]];
      uniqueWinners = [...new Set(winnersObj)];
    }

    return uniqueWinners;
  } catch {
    console.log("error");
  }
};
