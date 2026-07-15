import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Row,
} from "reactstrap";
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
} from "./TradeCol";
import TableContainer from "../../Components/Common/TableContainer";
import { format } from "date-fns";
import CreateTrade from "./CreateTrade";
import CloseTradeModal from "./CloseTradeModal";
import TradeModal from "./TradeModal";
import DeleteTradeModal from "./DeleteTradeModal";

const AllTrades = ({ tradeList }) => {
  const [action, setAction] = useState("");
  const [rowId, setRowId] = useState("");
  const [rowData, setRowData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [createTradeModal, setCreateTradeModal] = useState(false);

  const [statusFilter, setStatusFilter] = useState(() => {
    return sessionStorage.getItem("currentTradeStatusFilter") || "all";
  });
  const [acctFilter, setAcctFilter] = useState(() => {
    return sessionStorage.getItem("currentTradeAccountFilter") || "all";
  });

  const filteredTrades = useMemo(() => {
    if (!tradeList) return [];

    let trades = tradeList;

    if (statusFilter !== "all" && statusFilter !== "") {
      trades = trades.filter((trd) => trd.status === statusFilter);
    }

    if (acctFilter !== "all" && acctFilter !== "") {
      trades = trades.filter((trd) => trd.wallet.name === acctFilter);
    }

    return trades;
  }, [tradeList, statusFilter, acctFilter]);

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

  // console.log(filteredTrades);

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
        header: "Account",
        accessorKey: "wallet.slug",
        enableColumnFilter: false,
        cell: (cell) => {
          return;
          <div>{cell.getValue()}</div>;
        },
      },

      {
        header: "Plan",
        accessorKey: "plan.name",
        enableColumnFilter: false,
        cell: (cell) => {
          return;
          <div>{cell.getValue()}</div>;
        },
      },

      {
        header: "Today Return (%)",
        accessorKey: "performance.totalReturnPercent",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Roi {...cell} />;
        },
      },
      // {
      //   header: "Price",
      //   accessorKey: "performance.currentPrice",
      //   enableColumnFilter: false,
      //   cell: (cell) => {
      //     return <Price {...cell} />;
      //   },
      // },
      // {
      //   header: "Status",
      //   accessorKey: "status",
      //   enableColumnFilter: false,
      //   cell: (cell) => {
      //     return <Status {...cell} />;
      //   },
      // },
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
                <option value="delete">Delete</option>
                <option value="close">Close</option>
              </select>
            </div>
          );
        },
      },
    ],
    [],
  );

  useEffect(() => {
    sessionStorage.setItem("currentTradeStatusFilter", statusFilter);
    sessionStorage.setItem("currentTradeAccountFilter", acctFilter);
  }, [statusFilter, acctFilter]);
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
            {/* Filters */}
            <Row className="g-3 align-items-center pb-4">
              <Col lg={4} md={12}>
                <Input type="text" placeholder="Search by name, email..." />
              </Col>

              <Col lg={3} md={4}>
                <Input
                  type="select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </Input>
              </Col>

              <Col lg={3} md={4}>
                <Input
                  type="select"
                  value={acctFilter}
                  onChange={(e) => setAcctFilter(e.target.value)}
                >
                  <option value="">All Accounts</option>
                  <option value="cash account">Cash</option>
                  <option value="traditional ira">Traditional IRA</option>
                  <option value="automated investing">
                    Automated Investing
                  </option>
                  <option value="individual brokerage">Brokerage</option>
                  <option value="hsa">Health Savings</option>
                </Input>
              </Col>

              <Col lg={2} md={4}>
                <Button color="primary" className="w-100">
                  Filter
                </Button>
              </Col>
            </Row>
            <TableContainer
              columns={columns}
              data={filteredTrades || []}
              isGlobalFilter={false}
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
      {action === "delete" && (
        <DeleteTradeModal
          tradeId={rowId}
          isOpen={action === "delete"}
          onClose={handleClose}
        />
      )}
      {createTradeModal && (
        <CreateTrade
          isOpen={createTradeModal}
          onClose={closeCreateTradeModal}
        />
      )}
      {action === "close" && (
        <CreateTrade
          orderData={rowData}
          isOpen={action === "close"}
          action={action}
          onClose={() => {
            setAction("");
            closeCreateTradeModal();
          }}
        />
      )}
    </React.Fragment>
  );
};

export default AllTrades;
