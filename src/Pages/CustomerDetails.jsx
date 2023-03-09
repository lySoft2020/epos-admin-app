import { Tab, Tabs, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import InputLabel from "./Components/InputLabel";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../styles.css";

import customerService from "../features/customerService";
import Workstation from "./Workstation";
import DirectDebit from "./DirectDebit";

export default function CustomerDetails() {
  const { shopid } = useParams();

  const [saved, setSaved] = useState(false);
  const [workstations, setWorkstations] = useState([]);
  const [formData, setFormData] = useState({
    shopname: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
    telephone: "",
    contactName: "",
    websiteUrl: "",
    hasMobileApp: false,
  });

  const {
    shopname,
    address1,
    address2,
    city,
    postcode,
    telephone,
    contactName,
    websiteUrl,
    hasMobileApp,
  } = formData;

  useEffect(() => {
    if (shopid != -1) {
      customerService.getCustomerById(shopid).then((customer) => {
        if (customer) {
          setWorkstations(customer.workstation);
          setFormData(customer);
          setSaved(true);
        }
      });
    }
  }, [shopid]);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleAddCustomer = () => {
    const newCustomer = {
      shopname: "",
      address1: "",
      address2: "",
      city: "",
      postcode: "",
      telephone: "",
      contactName: "",
      websiteUrl: "",
      hasMobileApp: false,
    };

    setFormData(newCustomer);
    window.location = `/addCustomer/${-1}`;
  };

  const handleSaveCustomer = async (e) => {
    e.preventDefault();
    if (shopname === "" || address1 === "") {
      toast.error("shop name and address are required");
    } else {
      try {
        let customer = {};

        if (shopid == -1) {
          customer = await customerService.saveCustomer(formData);
        } else {
          customer = await customerService.updateCustomer(shopid, formData);
        }
        if (customer.response?.status === 409) {
          toast.error(customer.response.data.message);
        } else {
          setSaved(true);
          toast.success(`customer ${formData.shopname} saved`);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      {shopid == -1 ? (
        <h1 className="text-center p-3">{`New Customer Details`}</h1>
      ) : (
        <h1 className="text-center p-3">{`${shopname} Details`}</h1>
      )}
      {/* <pre>{JSON.stringify(formData)}</pre> */}
      <Tabs
        defaultActiveKey="profile"
        id="customer-details-tab"
        className="mb-3"
        justify
      >
        <Tab eventKey="profile" title="Main Details" className="m-3">
          <InputLabel
            label={"shopname"}
            placeholder={"Type the shop name"}
            value={shopname}
            name={"shopname"}
            type={"text"}
            handelChange={handleChange}
          />

          <div className="d-flex">
            <InputLabel
              label={"address"}
              placeholder={"Type the address"}
              name={"address1"}
              value={address1}
              type={"text"}
              handelChange={handleChange}
            />
            <InputLabel
              label={"address"}
              placeholder={"Type the address"}
              name={"address2"}
              value={address2}
              type={"text"}
              handelChange={handleChange}
            />
          </div>
          <div className="d-flex">
            <InputLabel
              label={"city"}
              placeholder={"Type the city"}
              value={city}
              name={"city"}
              type={"text"}
              handelChange={handleChange}
            />
            <InputLabel
              label={"postcode"}
              placeholder={"Type the postcode"}
              value={postcode}
              name={"postcode"}
              type={"text"}
              handelChange={handleChange}
            />
          </div>
          <div className="d-flex">
            <InputLabel
              label={"phone"}
              placeholder={"Type the telephone"}
              value={telephone}
              name={"telephone"}
              type={"text"}
              handelChange={handleChange}
            />
            <InputLabel
              label={"contact"}
              placeholder={"Type the contact name"}
              value={contactName}
              name={"contactName"}
              type={"text"}
              handelChange={handleChange}
            />
          </div>
          <div className="d-flex">
            <InputLabel
              label={"website"}
              placeholder={"Type the website url"}
              name={"websiteUrl"}
              value={websiteUrl}
              type={"text"}
              handelChange={handleChange}
            />

            <InputLabel
              label={"Has Mobile App"}
              placeholder={""}
              name={"hasMobileApp"}
              value={hasMobileApp}
              type={"checkbox"}
              handelChange={handleChange}
            />
          </div>

          <Button
            className="m-2"
            variant="secondary"
            onClick={handleSaveCustomer}
          >
            Save Customer Details
          </Button>
          <Button variant="secondary" onClick={handleAddCustomer}>
            New Customer
          </Button>
        </Tab>

        <Tab eventKey="workstations" title="Workstations" disabled={!saved}>
          <Workstation customerId={shopid} />
        </Tab>
        <Tab eventKey="directDebit" title="Direct Debit" disabled={!saved}>
          <DirectDebit customerId={shopid} />
        </Tab>
      </Tabs>
    </>
  );
}
