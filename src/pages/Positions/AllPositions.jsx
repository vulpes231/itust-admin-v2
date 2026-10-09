import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Input,
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
} from "./PositionCol";

import Select from "react-select";
import TableContainer from "../../Components/Common/TableContainer";
import { format } from "date-fns";
import ClosePositionForm from "./ClosePositionForm";
import EditPosition from "./EditPosition";
import DeletePositionModal from "./DeletePositionModal";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/users";

const AllPositions = ({ positions }) => {
  const navigate = useNavigate();

  // console.log(positions);

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const userOptions = useMemo(() => {
    if (!users?.length) {
      return [];
    }

    return users.map((user) => ({
      value: user._id,
      label: `${user?.personalInfo?.username || "Unknown User"}${
        user?.contactInfo?.email ? ` - ${user.contactInfo.email}` : ""
      }`,
    }));
  }, [users]);

  const [selectedAction, setSelectedAction] = useState(null);
  const [rowId, setRowId] = useState("");
  const [rowData, setRowData] = useState(null);

  const [closePositionModal, setClosePositionModal] = useState(false);
  const [editPositionModal, setEditPositionModal] = useState(false);
  const [deletePositionModal, setDeletePositionModal] = useState(false);

  const [statusFilter, setStatusFilter] = useState(() => {
    return sessionStorage.getItem("currentPositionStatusFilter") || "all";
  });

  const [acctFilter, setAcctFilter] = useState(() => {
    return sessionStorage.getItem("currentPositionAccountFilter") || "all";
  });

  const [userFilter, setUserFilter] = useState(() => {
    return sessionStorage.getItem("currentPositionUserFilter") || "";
  });

  const filteredPositions = useMemo(() => {
    if (!positions) {
      return [];
    }

    let trades = [...positions];

    if (statusFilter !== "all" && statusFilter !== "") {
      trades = trades.filter((trd) => trd.status === statusFilter);
    }

    if (acctFilter !== "all" && acctFilter !== "") {
      trades = trades.filter((trd) => trd.wallet?.name === acctFilter);
    }

    if (userFilter) {
      trades = trades.filter((trd) => trd.userId === userFilter);
    }

    return trades;
  }, [positions, statusFilter, acctFilter, userFilter]);

  const handleAction = (e, id, data) => {
    e.preventDefault();
    const actionValue = e.target.value;

    if (!actionValue) {
      return;
    }

    setRowId(id);
    setRowData(data);
    setSelectedAction(actionValue);

    if (actionValue === "close") {
      setClosePositionModal(true);
    } else if (actionValue === "edit") {
      setEditPositionModal(true);
    } else if (actionValue === "delete") {
      setDeletePositionModal(true);
    }

    e.target.value = "";
  };

  const handleClose = () => {
    setSelectedAction(null);
    setRowId("");
    setRowData(null);
    setClosePositionModal(false);
    setEditPositionModal(false);
    setDeletePositionModal(false);
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
                  navigate(`/edituser/${userId}`);
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
        accessorKey: "performance.currentBaseValue",
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
                defaultValue=""
                onChange={(e) => handleAction(e, id, rowData)}
              >
                <option value="">Select Option</option>
                <option value="edit">Edit</option>
                <option value="close">Close</option>
                <option value="delete">Delete</option>
              </select>
            </div>
          );
        },
      },
    ],
    [], // Remove action from dependencies
  );

  useEffect(() => {
    sessionStorage.setItem("currentPositionStatusFilter", statusFilter);

    sessionStorage.setItem("currentPositionAccountFilter", acctFilter);

    sessionStorage.setItem("currentPositionUserFilter", userFilter);
  }, [statusFilter, acctFilter, userFilter]);

  return (
    <React.Fragment>
      <Col lg={12}>
        <Card>
          <CardHeader className="d-flex align-items-center border-0">
            <h5 className="card-title mb-0 flex-grow-1">All Positions</h5>
            <div className="flex-shrink-0"></div>
          </CardHeader>
          <CardBody>
            <Row className="g-3 align-items-center pb-4">
              <Col lg={4} md={12}>
                <Select
                  options={userOptions}
                  isClearable
                  isSearchable
                  placeholder="Search user..."
                  value={
                    userOptions.find((option) => option.value === userFilter) ||
                    null
                  }
                  onChange={(option) => setUserFilter(option?.value || "")}
                />
              </Col>

              {/* Status filter */}
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

              {/* Account filter */}
              <Col lg={3} md={4}>
                <Input
                  type="select"
                  value={acctFilter}
                  onChange={(e) => setAcctFilter(e.target.value)}
                >
                  <option value="all">All Accounts</option>

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
                <Button color="secondary" className="w-100">
                  Filter
                </Button>
              </Col>
            </Row>
            <TableContainer
              columns={columns}
              data={filteredPositions || []}
              isGlobalFilter={false}
              isAddUserList={false}
              customPageSize={50}
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
      {deletePositionModal && (
        <DeletePositionModal
          positionId={rowId}
          isOpen={deletePositionModal}
          handleToggle={handleClose}
        />
      )}
    </React.Fragment>
  );
};

export default AllPositions;
