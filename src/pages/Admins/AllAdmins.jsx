import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { Status, Role, Email } from "./AdminCol";
import TableContainer from "../../Components/Common/TableContainer";
import { capitalize } from "lodash";
import CreateAdmin from "./CreateAdmin";

const AllAdmins = ({ adminList }) => {
  const [createAdminModal, setCreateAdminModal] = useState(false);

  const [action, setAction] = useState("");
  const [rowId, setRowId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAction = (e, id) => {
    setRowId(id);
    setAction(e.target.value);
    setShowModal(true);
  };

  const openCreateAdminModal = () => {
    setCreateAdminModal(true);
  };
  const closeCreateAdminModal = () => {
    setCreateAdminModal(false);
  };

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "__v",
        enableColumnFilter: false,
        cell: (cell) => (
          <>
            {cell.getValue()}{" "}
            <small className="text-muted">{cell.row.original.time}</small>
          </>
        ),
      },
      {
        header: "Username",
        accessorKey: "username",
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
        header: "Role",
        accessorKey: "role",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Role {...cell} />;
        },
      },
      {
        header: "Email",
        accessorKey: "email",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Email {...cell} />;
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
                <option value="">Select Action</option>
                <option value="edit">Edit</option>
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
            <h5 className="card-title mb-0 flex-grow-1">All Admins</h5>
            <div className="flex-shrink-0">
              <div className="flax-shrink-0 hstack gap-2">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={openCreateAdminModal}
                >
                  Add Admin
                </button>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <TableContainer
              columns={columns}
              data={adminList || []}
              isGlobalFilter={true}
              isAddUserList={false}
              customPageSize={8}
              className="custom-header-css"
              divClass="table-responsive table-card mb-1"
              tableClass="align-middle table-nowrap"
              theadClass="table-light text-muted"
              isCryptoOrdersFilter={true}
              SearchPlaceholder="Search Admins..."
            />
          </CardBody>
        </Card>
      </Col>
      {createAdminModal && (
        <CreateAdmin
          isOpen={createAdminModal}
          onClose={closeCreateAdminModal}
        />
      )}
    </React.Fragment>
  );
};

export default AllAdmins;
