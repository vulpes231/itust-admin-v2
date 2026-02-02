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
} from "./TradeCol";
import TableContainer from "../../Components/Common/TableContainer";
import { format } from "date-fns";
import CreateTrade from "./CreateTrade";
import TradeModal from "./Trademodal";
import CloseTradeModal from "./CloseTradeModal";

const AllTrades = ({ tradeList }) => {
  const [action, setAction] = useState("");
  const [rowId, setRowId] = useState("");
  const [rowData, setRowData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [createTradeModal, setCreateTradeModal] = useState(false);

  const openCreateTradeModal = () => {
    setCreateTradeModal(true);
  };
  const closeCreateTradeModal = () => {
    setCreateTradeModal(false);
  };

  const handleAction = (e, id, data) => {
    setRowId(id);
    setRowData(data);
    setAction(e.target.value);
    setShowModal(true);
  };

  const handleClose = () => {
    setAction("");
    setRowId("");
    setRowData("");

    setShowModal(false);
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
        accessorKey: "execution.amount",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Amount {...cell} />;
        },
      },
      {
        header: "Quantity",
        accessorKey: "execution.quantity",
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
        header: "Today Return (%)",
        accessorKey: "performance.todayReturnPercent",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Roi {...cell} />;
        },
      },
      {
        header: "Price",
        accessorKey: "execution.price",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Price {...cell} />;
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
    []
  );

  // useEffect(() => {
  //   if (tradeList) console.log(tradeList);
  // }, [tradeList]);
  return (
    <React.Fragment>
      <Col lg={12}>
        <Card>
          <CardHeader className="d-flex align-items-center border-0">
            <h5 className="card-title mb-0 flex-grow-1">All Trades</h5>
            <div className="flex-shrink-0">
              <div className="flax-shrink-0 hstack gap-2">
                <button
                  type="button"
                  onClick={openCreateTradeModal}
                  className="btn btn-primary"
                >
                  Create Trade
                </button>
                {/* <button className="btn btn-soft-info">Past Orders</button> */}
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <TableContainer
              columns={columns}
              data={tradeList || []}
              isGlobalFilter={true}
              isAddUserList={false}
              customPageSize={8}
              className="custom-header-css"
              divClass="table-responsive table-card mb-1"
              tableClass="align-middle table-nowrap"
              theadClass="table-light text-muted"
              isCryptoOrdersFilter={true}
              SearchPlaceholder="Search Trades..."
            />
          </CardBody>
        </Card>
      </Col>
      {action === "edit" && showModal && (
        <TradeModal
          dataId={rowId}
          action={action}
          isOpen={showModal}
          onClose={handleClose}
          rowData={rowData}
        />
      )}
      {createTradeModal && (
        <CreateTrade
          isOpen={createTradeModal}
          onClose={closeCreateTradeModal}
        />
      )}
      {action === "close" && (
        <CloseTradeModal
          dataId={rowId}
          action={action}
          isOpen={action === "close"}
          onClose={() => setAction("")}
          rowData={rowData}
        />
      )}
    </React.Fragment>
  );
};

export default AllTrades;
