import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";

export default function ReadOnlyRows({
  displayData,
  deletedisplayData,
  handleEditClick,
  fields,
}) {
  return (
    displayData && (
      <>
        <tr key={displayData["_id"]}>
          {fields.map((field, key) => {
            return field.type === "date" ? (
              <td key={key}>
                {moment(displayData[field.name]).format("DD/MM/YYYY")}
              </td>
            ) : field.type === "checkbox" ? (
              <td key={key}>
                {displayData[field.name] === true ? "true" : "false"}
              </td>
            ) : (
              <td key={key}>{displayData[field.name]}</td>
            );
          })}

          <td>
            <div className="mx-auto d-flex justify-content-end">
              <EditIcon onClick={(e) => handleEditClick(e, displayData)} />
              <DeleteForeverIcon
                onClick={() => deletedisplayData(displayData._id)}
              />
            </div>
          </td>
        </tr>
      </>
    )
  );
}
