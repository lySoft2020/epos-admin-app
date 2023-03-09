import axiosBaseUrl from "../apis/connection";

const API_URL = "/api/customers/";

export const getCustomers = async () => {
  try {
    const customers = await axiosBaseUrl.get(API_URL);
    if (customers) {
      return customers.data;
    } else {
      return [];
    }
  } catch (ex) {
    return null;
  }
};

export const getCustomerById = async (id) => {
  try {
    const customer = await axiosBaseUrl.get(API_URL + id);
    if (customer) {
      return customer.data;
    } else {
      return {};
    }
  } catch (ex) {
    return null;
  }
};

export const saveCustomer = async (customerData) => {
  try {
    const response = await axiosBaseUrl.post(API_URL, customerData);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateCustomer = async (id, customerData) => {
  try {
    const response = await axiosBaseUrl.put(API_URL + id, customerData);

    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteCustomer = async (id) => {
  try {
    const response = await axiosBaseUrl.delete(API_URL + id);

    return response.data;
  } catch (error) {
    return error;
  }
};

const customerService = {
  getCustomers,
  saveCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};

export default customerService;
