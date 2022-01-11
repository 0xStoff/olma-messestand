import axios from "axios";
import { queryDataFunction } from "../_services/tableFunctions";

export const insertImage = async (data, successSwal, setIsSubmitted) => {
  let bodyFormData = new FormData();
  bodyFormData.append("file", data.file);

  await axios({
    method: "POST",
    url: "http://65.21.188.255:80/api/upload",
    data: bodyFormData,

    mode: "cors",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => {
      setIsSubmitted(() => false);
      successSwal("Bild erfolgreich eingesendet!");
    })
    .catch((response) => {
      console.log(response);
    });
};

export const setImageId = async (data) => {
  await axios({
    method: "POST",
    mode: "cors",
    url: "http://65.21.188.255:80/api/setid",
    data: { id: data.id, file: data.file.name },
  }).catch((response) => {
    console.log(response);
  });
};

export const validateInputLength = async (values) => {
  const response = await queryDataFunction();

  let inputMaxLength = response.data.length;
  if (values.id >= inputMaxLength) return false;
  else return true;
};

export const validateDoubleInputs = async (values) => {
  const response = await queryDataFunction();
  if (response.data[values.id].selfie != 0) return false;
  else return true;
};
