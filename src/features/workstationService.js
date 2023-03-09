import axiosBaseUrl from "../apis/connection";

const API_URL = "/api/customers/";

export const saveWorkstation = async (id, workstationData) => {
  try {
    const response = await axiosBaseUrl.post(
      API_URL + id + "/workstation",
      workstationData
    );

    return response;
  } catch (error) {
    return error;
  }
};

export const deleteWorkstation = async (custId, wsId) => {
  try {
    const url = API_URL + custId + "/workstation/" + wsId;
    const response = await axiosBaseUrl.delete(url);

    return response;
  } catch (error) {
    return error;
  }
};

export const getWorkstationByCustId = async (id) => {
  try {
    const Workstation = await axiosBaseUrl.get(API_URL + id + "/workstation/");
    if (Workstation) {
      return Workstation.data;
    } else {
      return {};
    }
  } catch (ex) {
    return null;
  }
};

export const updateWorkstationById = async (id, workstationData) => {
  try {
    const url = API_URL + "workstation/" + id;
    const response = await axiosBaseUrl.patch(url, workstationData);

    return response;
  } catch (error) {
    return error;
  }
};

const workstationService = {
  saveWorkstation,
  deleteWorkstation,
  getWorkstationByCustId,
  updateWorkstationById,
};

export default workstationService;
