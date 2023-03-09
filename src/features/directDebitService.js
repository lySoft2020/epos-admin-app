import axiosBaseUrl from "../apis/connection";

const API_URL = "/api/customers/";

export const saveDirectDebit = async (id, directDebitData) => {
  try {
    const response = await axiosBaseUrl.post(
      API_URL + id + "/directDebit",
      directDebitData
    );

    return response;
  } catch (error) {
    return error;
  }
};

export const deleteDirectDebit = async (custId, ddId) => {
  try {
    const url = API_URL + custId + "/directDebit/" + ddId;
    const response = await axiosBaseUrl.delete(url);

    return response;
  } catch (error) {
    return error;
  }
};

export const getDirectDebitByCustId = async (id) => {
  try {
    const DirectDebit = await axiosBaseUrl.get(API_URL + id + "/directDebit/");
    if (DirectDebit) {
      return DirectDebit.data;
    } else {
      return {};
    }
  } catch (ex) {
    return null;
  }
};

export const updateDirectDebitById = async (id, directDebitData) => {
  try {
    const url = API_URL + "directDebit/" + id;
    const response = await axiosBaseUrl.patch(url, directDebitData);

    return response;
  } catch (error) {
    return error;
  }
};

const directDebitService = {
  saveDirectDebit,
  deleteDirectDebit,
  getDirectDebitByCustId,
  updateDirectDebitById,
};

export default directDebitService;
