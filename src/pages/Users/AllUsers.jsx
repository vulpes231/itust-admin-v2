import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { Email, Status, Experience, Kyc, Phone, Nationality } from "./UserCol";
import TableContainer from "../../Components/Common/TableContainer";

import { format } from "date-fns";
import { capitalize } from "lodash";
import BanUserModal from "./BanUserModal";

const AllUsers = ({ userList }) => {
  const history = useNavigate();
  const [action, setAction] = useState("");
  const [rowId, setRowId] = useState("");
  const [banModal, setBanModal] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [data, setData] = useState("");

  const handleAction = (e, id, userData) => {
    setRowId(id);
    setAction(e.target.value);
    setData(userData);
  };

  useEffect(() => {
    if (action === "edit" && rowId) {
      const userId = rowId;
      window.location.href = `edituser/${userId}`;
    } else if (action === "ban" && rowId) {
      const userId = rowId;
      setBanModal(true);
    } else if (action === "delete" && rowId) {
      const userId = rowId;
      setDeleteUserModal(true);
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
          const rowData = cell.row.original;
          return (
            <div>
              <select
                name="action"
                onChange={(e) => handleAction(e, cell.getValue(), rowData)}
              >
                <option value="">Select Option</option>
                <option value="edit">View</option>
                <option value="ban">Ban</option>
                <option value="delete">Delete</option>
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
      {banModal && (
        <BanUserModal
          dataId={rowId}
          isOpen={banModal}
          onClose={() => setBanModal(false)}
          data={data}
        />
      )}
    </React.Fragment>
  );
};

export default AllUsers;
