import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import {
  Type,
  Quantity,
  OrderValue,
  Roi,
  Price,
  Status,
  Amount,
  Leverage,
  Extra,
} from "./PositionCol";
import TableContainer from "../../Components/Common/TableContainer";
import { format } from "date-fns";
import ClosePositionForm from "./ClosePositionForm";
import EditPosition from "./EditPosition";

const AllPositions = ({ positions }) => {
  const [selectedAction, setSelectedAction] = useState(null); // Track which row's action is selected
  const [rowId, setRowId] = useState("");
  const [rowData, setRowData] = useState(null);

  const [closePositionModal, setClosePositionModal] = useState(false);
  const [editPositionModal, setEditPositionModal] = useState(false);

  const handleAction = (e, id, data) => {
    e.preventDefault();
    const actionValue = e.target.value;

    if (!actionValue) {
      // If "Select Option" is chosen, do nothing
      return;
    }

    setRowId(id);
    setRowData(data);
    setSelectedAction(actionValue);

    // Open appropriate modal immediately
    if (actionValue === "close") {
      setClosePositionModal(true);
    } else if (actionValue === "edit") {
      setEditPositionModal(true);
    }

    // Reset the select dropdown value after opening modal
    e.target.value = "";
  };

  const handleClose = () => {
    setSelectedAction(null);
    setRowId("");
    setRowData(null);
    setClosePositionModal(false);
    setEditPositionModal(false);
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
        header: "Name",
        accessorKey: "fullname",
        enableColumnFilter: false,
        cell: (cell) => {
          const userId = cell.row.original.userId;
          return (
            <div className="d-flex align-items-center">
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `/edituser/${userId}`;
                }}
                className="currency_name flex-grow-1 ms-2 text-capitalize"
              >
                {cell.getValue()}
              </Link>
            </div>
          );
        },
      },
      {
        header: "Asset",
        accessorKey: "asset.name",
        enableColumnFilter: false,
        cell: (cell) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <img
                  src={cell.row.original.asset.img}
                  alt=""
                  className="avatar-xxs"
                />
              </div>
              <Link to="#" className="currency_name flex-grow-1 ms-2">
                {cell.getValue()}
              </Link>
            </div>
          </>
        ),
      },
      {
        header: "Type",
        accessorKey: "orderType",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Type {...cell} />;
        },
      },
      {
        header: "Cost",
        accessorKey: "amountInvested",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Amount {...cell} />;
        },
      },
      {
        header: "Quantity",
        accessorKey: "quantity",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Quantity {...cell} />;
        },
      },
      {
        header: "Current Value",
        accessorKey: "performance.currentValue",
        enableColumnFilter: false,
        cell: (cell) => {
          return <OrderValue {...cell} />;
        },
      },
      {
        header: "Account",
        accessorKey: "wallet.name",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Price {...cell} />;
        },
      },
      {
        header: "Orders",
        accessorKey: "tradeIds",
        enableColumnFilter: false,
        cell: (cell) => {
          const orderCount = cell.row.original.tradeIds?.length;
          return (
            <span>
              <b>{orderCount}</b> {orderCount > 1 ? "Orders" : "Order"}
            </span>
          );
        },
      },
      {
        header: "Total Return",
        accessorKey: "performance.totalReturn",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Roi {...cell} />;
        },
      },
      {
        header: "Extra Profit",
        accessorKey: "performance.extra",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Extra {...cell} />;
        },
      },
      {
        header: "Action",
        accessorKey: "_id",
        enableColumnFilter: false,
        cell: (cell) => {
          const id = cell.getValue();
          const rowData = cell.row.original;

          return (
            <div>
              <select
                name="action"
                defaultValue="" // Use defaultValue instead of value
                onChange={(e) => handleAction(e, id, rowData)}
              >
                <option value="">Select Option</option>
                <option value="edit">Edit</option>
                <option value="close">Close</option>
              </select>
            </div>
          );
        },
      },
    ],
    [], // Remove action from dependencies
  );

  // Remove useEffect since we're handling modals directly in handleAction

  return (
    <React.Fragment>
      <Col lg={12}>
        <Card>
          <CardHeader className="d-flex align-items-center border-0">
            <h5 className="card-title mb-0 flex-grow-1">All Positions</h5>
            <div className="flex-shrink-0"></div>
          </CardHeader>
          <CardBody>
            <TableContainer
              columns={columns}
              data={positions || []}
              isGlobalFilter={true}
              isAddUserList={false}
              customPageSize={8}
              className="custom-header-css"
              divClass="table-responsive table-card mb-1"
              tableClass="align-middle table-nowrap"
              theadClass="table-light text-muted"
              isCryptoOrdersFilter={true}
              SearchPlaceholder="Search Positions..."
            />
          </CardBody>
        </Card>
      </Col>

      {closePositionModal && rowData && (
        <ClosePositionForm
          isOpen={closePositionModal}
          rowData={rowData}
          handleClose={handleClose}
        />
      )}

      {editPositionModal && rowData && (
        <EditPosition
          rowData={rowData}
          isOpen={editPositionModal}
          handleClose={handleClose}
        />
      )}
    </React.Fragment>
  );
};

export default AllPositions;
