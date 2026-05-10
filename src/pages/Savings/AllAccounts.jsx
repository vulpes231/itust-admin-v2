import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import {
  Type,
  Interest,
  CanTrade,
  Minimum,
  Status,
  Symbol,
  MaxYearly,
  MaxTotal,
} from "./AccountCol";
import TableContainer from "../../Components/Common/TableContainer";
import { format } from "date-fns";
import CreateSavings from "./CreateSavings";
import AccountFilter from "./AccountFilter";
import { FaDelicious } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { GrOverview } from "react-icons/gr";
import DeleteSavings from "./DeleteSavings";
import ViewSavings from "./ViewSavings";
import EditSavings from "./EditSavings";

const AllAccounts = ({ accountList }) => {
  const [createSavingsModal, setCreateSavingsModal] = useState(false);
  const [deleteSavingsModal, setDeleteSavingsModal] = useState(false);
  const [editSavingsModal, setEditSavingsModal] = useState(false);
  const [viewSavingsModal, setViewSavingsModal] = useState(false);
  const [action, setAction] = useState("");
  const [rowId, setRowId] = useState("");
  const [rowData, setRowData] = useState("");

  const openCreateSavingsModal = () => {
    setCreateSavingsModal(true);
  };
  const closeCreateSavingsModal = () => {
    setCreateSavingsModal(false);
  };

  const handleAction = (id, data, currentAction) => {
    setRowId(id);
    setRowData(data);
    setAction(currentAction);
  };

  const columns = useMemo(
    () => [
      {
        header: "Date",
        accessorKey: "createdAt",
        enableColumnFilter: false,
        cell: (cell) => <>{format(cell.getValue(), "MMM dd, yyyy")}</>,
      },
      {
        header: "Account",
        accessorKey: "name",
        enableColumnFilter: false,
        cell: (cell) => (
          <>
            <div className="d-flex align-items-center">
              <Link
                to="#"
                className="currency_name flex-grow-1 ms-2 text-capitalize"
              >
                {cell.getValue()}
              </Link>
            </div>
          </>
        ),
      },
      {
        header: "Slug",
        accessorKey: "slug",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Symbol {...cell} />;
        },
      },
      {
        header: "Type",
        accessorKey: "tag",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Type {...cell} />;
        },
      },

      {
        header: "APY",
        accessorKey: "yearlyAPY",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Interest {...cell} />;
        },
      },

      {
        header: "Max (yearly)",
        accessorKey: "maxSavings.yearly",
        enableColumnFilter: false,
        cell: (cell) => {
          return <MaxYearly {...cell} />;
        },
      },

      {
        header: "Max (All Time)",
        accessorKey: "maxSavings.total",
        enableColumnFilter: false,
        cell: (cell) => {
          return <MaxTotal {...cell} />;
        },
      },
      {
        header: "Tradeable",
        accessorKey: "canTrade",
        enableColumnFilter: false,
        cell: (cell) => {
          return <CanTrade {...cell} />;
        },
      },

      {
        header: "Status",
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Status {...cell} />;
        },
      },
      {
        header: "Actions",
        accessorKey: "title",
        enableColumnFilter: false,
        cell: (cell) => {
          const data = cell.row.original;
          return (
            <div className="d-flex align-items-center gap-1">
              <button
                onClick={() => handleAction(data._id, data, "view")}
                className="btn btn-info"
              >
                <GrOverview />
              </button>
              <button
                onClick={() => handleAction(data._id, data, "edit")}
                className="btn btn-secondary"
              >
                <TiEdit />
              </button>
              <button
                onClick={() => handleAction(data._id, data, "delete")}
                className="btn btn-danger"
              >
                <RiDeleteBin5Line />
              </button>
            </div>
          );
        },
      },
    ],
    [],
  );

  const handleCloseModal = () => {
    setAction("");
    setRowData("");
    setRowId("");
    if (action === "edit") {
      setEditSavingsModal(false);
    } else if (action === "delete") {
      setDeleteSavingsModal(false);
    } else {
      setViewSavingsModal(false);
    }
  };

  useEffect(() => {
    if (action === "edit") {
      console.log(rowId, "edit");
      setEditSavingsModal(true);
    } else if (action === "view") {
      console.log(rowId, "view");
      setViewSavingsModal(true);
    } else if (action === "delete") {
      console.log(rowId, "delete");
      setDeleteSavingsModal(true);
    }
  }, [action]);

  return (
    <React.Fragment>
      <Col lg={12}>
        <Card>
          <CardHeader className="d-flex align-items-center border-0">
            <h5 className="card-title mb-0 flex-grow-1">All Accounts</h5>
            <div className="flex-shrink-0">
              <div className="flax-shrink-0 hstack gap-2">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={openCreateSavingsModal}
                >
                  Create Account
                </button>
                {/* <button className="btn btn-soft-info">Past Orders</button> */}
              </div>
            </div>
          </CardHeader>
          <AccountFilter />
          <CardBody>
            <TableContainer
              columns={columns}
              data={accountList || []}
              isGlobalFilter={false}
              isAddUserList={false}
              customPageSize={8}
              className="custom-header-css"
              divClass="table-responsive table-card mb-1"
              tableClass="align-middle table-nowrap"
              theadClass="table-light text-muted"
              isCryptoOrdersFilter={false}
              SearchPlaceholder="Search Trades..."
            />
          </CardBody>
        </Card>
      </Col>
      {createSavingsModal && (
        <CreateSavings
          isOpen={createSavingsModal}
          onClose={closeCreateSavingsModal}
        />
      )}
      {deleteSavingsModal && (
        <DeleteSavings
          isOpen={deleteSavingsModal}
          onClose={handleCloseModal}
          data={rowData}
          dataId={rowId}
        />
      )}
      {editSavingsModal && (
        <EditSavings
          isOpen={editSavingsModal}
          onClose={handleCloseModal}
          data={rowData}
          dataId={rowId}
        />
      )}
      {viewSavingsModal && (
        <ViewSavings
          isOpen={viewSavingsModal}
          onClose={handleCloseModal}
          data={rowData}
          dataId={rowId}
        />
      )}
    </React.Fragment>
  );
};

export default AllAccounts;
