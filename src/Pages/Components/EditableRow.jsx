import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import IconButton from "@mui/material/IconButton";
import moment from "moment";

export default function EditableRow({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  editableFields,
  options,
}) {
  return (
    editFormData && (
      <>
        <tr key={editFormData["_id"]}>
          {editableFields.map((field, key) => {
            return (
              <td key={key}>
                {field.type === "checkbox" ? (
                  <input
                    type={field.type}
                    name={field.name}
                    aria-label={editFormData[field.name]}
                    checked={editFormData[field.name]}
                    onChange={handleEditFormChange}
                  />
                ) : field.type === "date" ? (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    name={field.name}
                    value={moment(editFormData[field.name]).format(
                      "YYYY-MM-DD"
                    )}
                    onChange={handleEditFormChange}
                  />
                ) : field.type === "select" ? (
                  <select
                    name={field.name}
                    value={editFormData[field.name]}
                    onChange={handleEditFormChange}
                  >
                    {options?.map((option) => (
                      <option value={option.value}>{option.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    name={field.name}
                    value={editFormData[field.name]}
                    onChange={handleEditFormChange}
                  />
                )}
              </td>
            );
          })}

          <td>
            <div className="mx-auto d-flex justify-content-end">
              <IconButton type="submit">
                <SaveAsOutlinedIcon color="primary" />
              </IconButton>
              <CancelIcon
                onClick={handleCancelClick}
                color="primary"
                className="my-2"
              />
            </div>
          </td>
        </tr>
      </>
    )
  );
}
