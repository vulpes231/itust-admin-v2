import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import TableContainer from "../../Components/Common/TableContainer";
import { format } from "date-fns";
import { capitalize } from "lodash";
import PathTierModal from "./PatchTierModal";
import NewTierModal from "./NewTierModal";
import numeral from "numeral";

const AllTiers = ({ tiers }) => {
  const navigate = useNavigate();
  const [action, setAction] = useState("");
  const [rowId, setRowId] = useState("");
  const [viewTierModal, setViewTierModal] = useState(false);
  const [addTierModal, setAddTierModal] = useState(false);
  const [editTierModal, setEditTierModal] = useState(false);
  const [data, setData] = useState("");

  const handleAction = (e, id, userData) => {
    setRowId(id);
    setAction(e.target.value);
    setData(userData);
  };

  const resetState = () => {
    setRowId("");
    setAction("");
    setData("");
  };

  useEffect(() => {
    if (action === "edit" && rowId) {
      setEditTierModal(true);
    } else if (action === "view" && rowId) {
      setViewTierModal(true);
    } else if (action === "delete" && rowId) {
      //   const userId = rowId;
      //   setDeleteUserModal(true);
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
        accessorKey: "title",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <div className="d-flex align-items-center">
              <span className="currency_name flex-grow-1 ms-2">
                {capitalize(cell.getValue())}
              </span>
            </div>
          );
        },
      },
      {
        header: "Treshhold",
        accessorKey: "threshold",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <div className="d-flex align-items-center">
              <span className="currency_name flex-grow-1 ms-2">
                {numeral(cell.getValue()).format("$0,0.00")}
              </span>
            </div>
          );
        },
      },
      {
        header: "Minimum Deposit",
        accessorKey: "minDeposit",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <div className="d-flex align-items-center">
              <span className="currency_name flex-grow-1 ms-2">
                {"<"} {numeral(cell.getValue()).format("$0,0.00")}
              </span>
            </div>
          );
        },
      },
      {
        header: "Tag",
        accessorKey: "tag",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <div className="d-flex align-items-center">
              <span className="currency_name flex-grow-1 ms-2">
                {capitalize(cell.getValue())}
              </span>
            </div>
          );
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
                {/* <option value="view">View</option> */}
                <option value="edit">Edit</option>
                {/* <option value="delete">Delete</option> */}
              </select>
            </div>
          );
        },
      },
    ],
    [],
  );

  return (
    <React.Fragment>
      <Col lg={12}>
        <Card>
          <CardHeader className="d-flex align-items-center border-0">
            <h5 className="card-title mb-0 flex-grow-1">All Tiers</h5>
            <span>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => setAddTierModal(true)}
              >
                Create Tier
              </button>
            </span>
          </CardHeader>
          <CardBody>
            <TableContainer
              columns={columns}
              data={tiers || []}
              isGlobalFilter={false}
              isAddUserList={false}
              customPageSize={50}
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
      {editTierModal && (
        <PathTierModal
          isOpen={editTierModal}
          data={data}
          handleToggle={() => {
            resetState();
            setEditTierModal(false);
          }}
        />
      )}
      {addTierModal && (
        <NewTierModal
          isOpen={addTierModal}
          handleToggle={() => {
            resetState();
            setAddTierModal(false);
          }}
        />
      )}
    </React.Fragment>
  );
};

export default AllTiers;
