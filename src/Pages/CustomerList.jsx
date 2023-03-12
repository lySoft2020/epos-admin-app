import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

import { getCustomers, deleteCustomer } from "../features/customerService";

export default function CustomerList() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    console.log("working", "/see");
    getCustomers().then((res) => {
      setCustomers(res);
    });
  }, []);

  const handelEditCustomer = (id) => {
    navigate(`/addCustomer/${id}`);
  };

  const handelDeleteCustomer = (id) => {
    if (window.confirm("Are you sure you want to delete this customer")) {
      deleteCustomer(id)
        .then((res) => {
          const newcustomers = customers.filter(
            (customer) => customer._id !== res.id
          );

          setCustomers(newcustomers);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleAddCustomer = (e) => {
    navigate(`/addCustomer/${-1}`); // -1 = new customer
  };

  return (
    <>
      <h1 className="text-center p-3">Customer List</h1>

      <Button
        variant="secondary"
        size="lg"
        className="m-3"
        onClick={handleAddCustomer}
      >
        Add Customer
      </Button>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Shop Name</th>
            <th>Address 1</th>
            <th>Address 2</th>
            <th>Postcode</th>
            <th>City</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {customers &&
            customers.map((customer) => {
              return (
                <tr key={customer._id}>
                  <td>{customer.shopname}</td>
                  <td>{customer.address1}</td>
                  <td>{customer.address2}</td>
                  <td>{customer.postcode}</td>
                  <td>{customer.city}</td>
                  <td>
                    <div className="mx-auto d-flex justify-content-end">
                      <EditIcon
                        onClick={() => handelEditCustomer(customer._id)}
                      />
                      <DeleteForeverIcon
                        onClick={() => handelDeleteCustomer(customer._id)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}
