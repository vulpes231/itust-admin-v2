import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { Email, Status, Experience, Kyc, Phone, Nationality } from "./UserCol";
import TableContainer from "../../Components/Common/TableContainer";

import { format } from "date-fns";
import { capitalize } from "lodash";

const AllUsers = ({ userList }) => {
  const [action, setAction] = useState("");
  const [rowId, setRowId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAction = (e, id) => {
    setRowId(id);
    setAction(e.target.value);
  };

  useEffect(() => {
    if (action && rowId) {
      console.log(action, rowId);
    }
  }, [action, rowId]);

  const columns = useMemo(
    () => [
      {
        header: "Date",
        accessorKey: "createdAt",
        enableColumnFilter: false,
        cell: (cell) => <>{format(cell.getValue(), "MMM dd, yyyy")} </>,
      },
      {
        header: "Name",
        accessorKey: "credentials.username",
        enableColumnFilter: false,
        cell: (cell) => (
          <>
            <div className="d-flex align-items-center">
              <Link to="#" className="currency_name flex-grow-1 ms-2">
                {capitalize(cell.getValue())}
              </Link>
            </div>
          </>
        ),
      },
      {
        header: "Experience",
        accessorKey: "professionalInfo.experience",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Experience {...cell} />;
        },
      },
      {
        header: "KYC",
        accessorKey: "identityVerification.kycStatus",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Kyc {...cell} />;
        },
      },
      {
        header: "Email",
        accessorKey: "credentials.email",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Email {...cell} />;
        },
      },
      {
        header: "Phone",
        accessorKey: "contactInfo.phone",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Phone {...cell} />;
        },
      },
      {
        header: "Nationality",
        accessorKey: "locationDetails.nationality.name",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Nationality {...cell} />;
        },
      },
      {
        header: "Status",
        accessorKey: "accountStatus.status",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Status {...cell} />;
        },
      },
      {
        header: "Action",
        accessorKey: "_id",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <div>
              <select
                name="action"
                onChange={(e) => handleAction(e, cell.getValue())}
              >
                <option value="">Select Option</option>
                <option value="edit">Edit</option>
                <option value="delete">Delete</option>
                <option value="ban">Ban</option>
              </select>
            </div>
          );
        },
      },
    ],
    []
  );
  return (
    <React.Fragment>
      <Col lg={12}>
        <Card>
          <CardHeader className="d-flex align-items-center border-0">
            <h5 className="card-title mb-0 flex-grow-1">All Users</h5>
            <div className="flex-shrink-0">
              <div className="flax-shrink-0 hstack gap-2">
                {/* <button className="btn btn-primary">Today's Orders</button> */}
                {/* <button className="btn btn-soft-info">Past Orders</button> */}
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <TableContainer
              columns={columns}
              data={userList || []}
              isGlobalFilter={true}
              isAddUserList={false}
              customPageSize={8}
              className="custom-header-css"
              divClass="table-responsive table-card mb-1"
              tableClass="align-middle table-nowrap"
              theadClass="table-light text-muted"
              isCryptoOrdersFilter={true}
              SearchPlaceholder="Search Users..."
            />
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default AllUsers;
