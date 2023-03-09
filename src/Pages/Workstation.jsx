import { Table, Button } from "react-bootstrap";
import ReadOnlyRows from "./Components/ReadOnlyRows";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import EditableRow from "./Components/EditableRow";
import workstationService from "../features/workstationService";

export default function Workstation({ customerId }) {
  const [localWorkstations, setLocalWorkstations] = useState([]);
  const [editWorkstationId, setEditWorkstationId] = useState(null);

  const fields = [
    { name: "workstationName", placeholder: "Workstation Name", type: "text" },
    { name: "anydeskId", placeholder: "Anydesk Id", type: "text" },
    { name: "teamviewerId", placeholder: "Teamviewer Id", type: "text" },
    { name: "keyNumber", placeholder: "Key Number", type: "text" },
    {
      name: "licenseExpiryDate",
      placeholder: "License Expiry Date",
      type: "date",
    },
  ];

  const [formData, setFormData] = useState({
    workstationName: "",
    anydeskId: "",
    teamviewerId: "",
    keyNumber: "",
  });

  const [editFormData, setEditFormData] = useState({
    workstationName: "",
    anydeskId: "",
    teamviewerId: "",
    keyNumber: "",
    licenseExpiryDate: "",
  });

  //   const { workstationName, anydeskId, teamviewerId, keyNumber } = formData;

  useEffect(() => {
    workstationService
      .getWorkstationByCustId(customerId)
      .then((workstation) => {
        setLocalWorkstations(workstation);
      });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    const newFormData = { ...formData };
    newFormData[fieldName] = fieldValue;

    setFormData(newFormData);
  };

  const handleEditFormDataChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddWorkstation = async (e) => {
    e.preventDefault();
    let newWorkstation = {
      workstationName: formData.workstationName,
      anydeskId: formData.anydeskId,
      teamviewerId: formData.teamviewerId,
      keyNumber: formData.keyNumber,
    };

    try {
      const workstation = await workstationService.saveWorkstation(
        customerId,
        newWorkstation
      );

      if (workstation.status === 200) {
        // find the new _id field so that we can use it as a key in the grid
        const newWs = workstation.data.workstation.find((ws) => {
          return ws.workstationName === newWorkstation.workstationName;
        });

        newWorkstation = { ...newWorkstation, _id: newWs._id };

        if (workstation.response?.status === 409) {
          toast.error(workstation.response.data.message);
        } else if (workstation.response?.status === 500) {
          toast.error(workstation.response.data.error.message);
        } else {
          // add the new workstation to the existing workstations
          const newLocalWs = [...localWorkstations, newWorkstation];

          setLocalWorkstations(newLocalWs);

          const blankWorkstation = {
            workstationName: "",
            anydeskId: "",
            teamviewerId: "",
            keyNumber: "",
            licenseExpiryDate: "",
          };
          setFormData(blankWorkstation);
          toast.success(`Workstation ${newWorkstation.workstationName} saved`);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handelDeleteWorkstation = async (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      try {
        const result = await workstationService.deleteWorkstation(
          customerId,
          id
        );

        if (result) {
          const newWorkstation = localWorkstations.filter(
            (workstation) => workstation._id !== result.data.id
          );

          setLocalWorkstations(newWorkstation);
        }
      } catch (err) {
        console.log(err);
        toast.error(err);
      }
    }
  };

  const handleEditClick = (e, workstation) => {
    e.preventDefault();
    setEditWorkstationId(workstation._id);
    const formValues = {
      workstationName: workstation.workstationName,
      anydeskId: workstation.anydeskId,
      teamviewerId: workstation.teamviewerId,
      keyNumber: workstation.keyNumber,
      licenseExpiryDate: workstation.licenseExpiryDate,
    };
    setEditFormData(formValues);
    console.log("workstation inside handleEditClick", editFormData);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setEditWorkstationId(null);
  };

  const handleSaveDataClick = async (e) => {
    e.preventDefault();

    const editedWorkstation = {
      workstationName: editFormData.workstationName,
      anydeskId: editFormData.anydeskId,
      teamviewerId: editFormData.teamviewerId,
      keyNumber: editFormData.keyNumber,
      licenseExpiryDate: editFormData.licenseExpiryDate,
    };
    try {
      const result = await workstationService.updateWorkstationById(
        editWorkstationId,
        editedWorkstation
      );

      if (result.status === 202) {
        const newWorkstation = [...localWorkstations];

        const index = localWorkstations.findIndex(
          (workstation) => workstation._id === editWorkstationId
        );

        newWorkstation[index] = editedWorkstation;
        setLocalWorkstations(newWorkstation);
        setEditWorkstationId(null);
        toast.success(
          `Workstation ${editedWorkstation.workstationName} updated successfully`
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

  return (
    <>
      {/* <pre>{JSON.stringify(editFormData)}</pre> */}
      <form onSubmit={handleSaveDataClick}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr key={99}>
              <th>workstation Name</th>
              <th>Anydesk Id</th>
              <th>Teamviewer Id</th>
              <th>Key Number</th>
              <th>Expiry Date</th>
              <th className="text-center">actions</th>
            </tr>
          </thead>
          <tbody>
            {localWorkstations?.map((workstation, key) => (
              <>
                {editWorkstationId === workstation._id ? (
                  <EditableRow
                    key={key}
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormDataChange}
                    handleCancelClick={handleCancelClick}
                    editableFields={fields}
                  />
                ) : (
                  <ReadOnlyRows
                    displayData={workstation}
                    deletedisplayData={handelDeleteWorkstation}
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
      <form className="m-3" onSubmit={handleAddWorkstation}>
        <input
          className="m-2"
          type={"text"}
          name="workstationName"
          value={formData.workstationName}
          required="required"
          placeholder={"Type the workstation name"}
          onChange={handleChange}
        />
        <input
          className="m-2"
          type={"text"}
          name="anydeskId"
          value={formData.anydeskId}
          placeholder={"Type the anydesk id"}
          onChange={handleChange}
        />
        <input
          className="m-2"
          type={"text"}
          name="teamviewerId"
          value={formData.teamviewerId}
          placeholder={"Type the Teamviewer id"}
          onChange={handleChange}
        />
        <input
          className="m-2"
          type={"text"}
          name="keyNumber"
          value={formData.keyNumber}
          placeholder={"Type the key number"}
          onChange={handleChange}
        />

        <Button className="m-2" variant="secondary" type="submit">
          Add Workstation
        </Button>
      </form>
    </>
  );
}
