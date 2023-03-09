import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import InputLabel from "./Components/InputLabel";
import directDebitService from "../features/directDebitService";
import EditableRow from "./Components/EditableRow";
import ReadOnlyRows from "./Components/ReadOnlyRows";

export default function DirectDebit({ customerId }) {
  const [localDirectDebit, setLocalDirectDebit] = useState([]);
  const [editDirectDebitId, setEditDirectDebitId] = useState(null);

  const fields = [
    { name: "description", placeHolder: "Description", type: "text" },
    { name: "startDate", placeHolder: "Start Date", type: "date" },
    { name: "amount", placeHolder: "Amount", type: "number" },
    { name: "frequency", placeHolder: "Frequency", type: "select" },
    { name: "active", placeHolder: "Active", type: "checkbox" },
  ];

  const [formData, setFormData] = useState({
    description: "",
    startDate: "",
    amount: "",
    frequency: "",
    active: false,
  });

  const [editFormData, setEditFormData] = useState({
    description: "",
    startDate: "",
    amount: "",
    frequency: "",
    active: false,
  });

  const frequencyOptions = [
    {
      label: "weekley",
    },
    {
      label: "monthly",
    },
    {
      label: "yearly",
    },
  ];

  useEffect(() => {
    directDebitService
      .getDirectDebitByCustId(customerId)
      .then((directDebit) => {
        setLocalDirectDebit(directDebit);
      });
  }, []);

  const handleSaveDataClick = async (e) => {
    e.preventDefault();

    console.log("inside the save Direct debit");

    const editedDirectDebit = {
      description: editFormData.description,
      startDate: editFormData.startDate,
      amount: editFormData.amount,
      frequency: editFormData.frequency,
      active: editFormData.active,
    };

    try {
      const result = await directDebitService.updateDirectDebitById(
        editDirectDebitId,
        editedDirectDebit
      );
      console.log("updated Direct debit", result);

      if (result.status === 202) {
        const newDirectDebit = [...localDirectDebit];

        const index = localDirectDebit.findIndex(
          (directDebit) => directDebit._id === editDirectDebitId
        );

        newDirectDebit[index] = editedDirectDebit;
        setLocalDirectDebit(newDirectDebit);
        setEditDirectDebitId(null);
        toast.success(
          `Direct Debit ${editedDirectDebit.description} updated successfully`
        );
      } else {
        if (result.response?.status === 404) {
          toast.error(result.response.data.error.message);
        } else {
          toast.error(result);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handelDeleteDirectDebit = async (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      try {
        const result = await directDebitService.deleteDirectDebit(
          customerId,
          id
        );

        if (result) {
          const newDirectDebit = localDirectDebit.filter(
            (directDebit) => directDebit._id !== result.data.id
          );

          setLocalDirectDebit(newDirectDebit);
        }
      } catch (err) {
        console.log(err);
        toast.error(err);
      }
    }
  };

  const handleEditClick = (e, directDebit) => {
    e.preventDefault();
    setEditDirectDebitId(directDebit._id);

    const formValues = {
      description: directDebit.description,
      startDate: directDebit.startDate,
      amount: directDebit.amount,
      frequency: directDebit.frequency,
      active: directDebit.active,
    };
    setEditFormData(formValues);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setEditDirectDebitId(null);
  };

  const handleEditFormDataChange = (e) => {
    const fieldName = e.target.getAttribute("name");
    const fieldValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    console.log(fieldValue, fieldName);
    const newFormData = { ...editFormData };

    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  const handleChange = (e) => {
    //e.preventDefault();

    const fieldName = e.target.getAttribute("name");
    const fieldValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    console.log(fieldValue, fieldName);
    const newFormData = { ...formData };

    newFormData[fieldName] = fieldValue;
    setFormData(newFormData);
  };

  const handleAddDirectDebit = async (e) => {
    e.preventDefault();
    let newDirectDebit = {
      description: formData.description,
      startDate: formData.startDate,
      amount: formData.amount,
      frequency: formData.frequency,
      active: formData.active,
    };

    try {
      const directDebit = await directDebitService.saveDirectDebit(
        customerId,
        newDirectDebit
      );

      if (directDebit.status === 200) {
        // find the new _id field so that we can use it as a key in the grid
        const newDd = directDebit.data.directDebit.find((dd) => {
          return dd.description === newDirectDebit.description;
        });

        newDirectDebit = { ...newDirectDebit, _id: newDd._id };

        if (directDebit.response?.status === 409) {
          toast.error(directDebit.response.data.message);
        } else if (directDebit.response?.status === 500) {
          toast.error(directDebit.response.data.error.message);
        } else {
          // add the new workstation to the existing workstations
          const newLocalDd = [...localDirectDebit, newDirectDebit];

          setLocalDirectDebit(newLocalDd);

          const blankDirectDebit = {
            description: "",
            startDate: "",
            amount: "",
            frequency: "",
            active: false,
          };
          setFormData(blankDirectDebit);
          toast.success(`Direct Debit ${newDirectDebit.description} saved`);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* <pre>{JSON.stringify(editFormData)}</pre> */}
      <form onSubmit={handleSaveDataClick}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Description</th>
              <th>Start Date</th>
              <th>Amount</th>
              <th>Frequency</th>
              <th>Active</th>
              <th className="text-center">actions</th>
            </tr>
          </thead>
          <tbody>
            {localDirectDebit?.map((directDebit, key) => (
              <>
                {editDirectDebitId === directDebit._id ? (
                  <EditableRow
                    key={key}
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormDataChange}
                    handleCancelClick={handleCancelClick}
                    editableFields={fields}
                    options={frequencyOptions}
                  />
                ) : (
                  <ReadOnlyRows
                    displayData={directDebit}
                    deletedisplayData={handelDeleteDirectDebit}
                    handleEditClick={handleEditClick}
                    key={key}
                    fields={fields}
                  />
                )}
              </>
            ))}
          </tbody>
        </Table>
      </form>
      <form className="m-3" onSubmit={handleAddDirectDebit}>
        <input
          className="m-2"
          type={"text"}
          name="description"
          value={formData.description}
          required="required"
          placeholder={"Direct Debit description"}
          onChange={handleChange}
        />
        <input
          className="m-2"
          type={"date"}
          name="startDate"
          value={formData.startDate}
          placeholder={"Type the Start Date"}
          onChange={handleChange}
        />
        <input
          className="m-2"
          type={"text"}
          name="amount"
          value={formData.amount}
          placeholder={"Type the Amount"}
          onChange={handleChange}
        />
        <input
          className="m-2"
          type={"text"}
          name="frequency"
          value={formData.frequency}
          placeholder={"Type the Frequency"}
          onChange={handleChange}
        />
        <label>Is Active?</label>
        <input
          className="m-2"
          type="checkbox"
          name="active"
          checked={formData.active}
          aria-label={formData.active}
          placeholder={""}
          onChange={handleChange}
        />

        <Button className="m-2" variant="secondary" type="submit">
          Add Workstation
        </Button>
      </form>
    </>
  );
}
