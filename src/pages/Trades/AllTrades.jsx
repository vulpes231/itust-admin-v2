import React, { useEffect, useMemo, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Row,
} from "reactstrap";

import { Type, Quantity, OrderValue, Roi, Amount } from "./TradeCol";

import TableContainer from "../../Components/Common/TableContainer";

import { format } from "date-fns";

import CreateTrade from "./CreateTrade";
import TradeModal from "./TradeModal";
import DeleteTradeModal from "./DeleteTradeModal";

import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/users";

const AllTrades = ({ tradeList }) => {
  const navigate = useNavigate();

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

  const [action, setAction] = useState("");
  const [rowId, setRowId] = useState("");
  const [rowData, setRowData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [createTradeModal, setCreateTradeModal] = useState(false);

  // const [selectedUserId, setSelectedUserId] = useState("");

  const [statusFilter, setStatusFilter] = useState(() => {
    return sessionStorage.getItem("currentTradeStatusFilter") || "all";
  });

  const [acctFilter, setAcctFilter] = useState(() => {
    return sessionStorage.getItem("currentTradeAccountFilter") || "all";
  });

  const [userFilter, setUserFilter] = useState(() => {
    return sessionStorage.getItem("currentUserFilter") || "";
  });
  /**
   * Filter trades
   */
  const filteredTrades = useMemo(() => {
    if (!tradeList) {
      return [];
    }

    let trades = [...tradeList];

    // Status filter
    if (statusFilter !== "all" && statusFilter !== "") {
      trades = trades.filter((trd) => trd.status === statusFilter);
    }

    // Account filter
    if (acctFilter !== "all" && acctFilter !== "") {
      trades = trades.filter((trd) => trd.wallet?.name === acctFilter);
    }

    // User filter
    if (userFilter) {
      trades = trades.filter((trd) => trd.userId === userFilter);
    }

    return trades;
  }, [tradeList, statusFilter, acctFilter, userFilter]);

  // console.log(filteredTrades);

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

  // /**
  //  * Find selected user
  //  */
  // useEffect(() => {
  //   if (!userFIlter) {
  //     setSelectedUserId("");
  //     return;
  //   }

  //   if (!users || users.length === 0) {
  //     return;
  //   }

  //   const searchValue = userFIlter.trim().toLowerCase();

  //   const user = users.find((usr) => {
  //     const email = usr?.contactInfo?.email?.toLowerCase() || "";

  //     const username = usr?.personalInfo?.username?.toLowerCase() || "";

  //     return email === searchValue || username === searchValue;
  //   });

  //   if (!user) {
  //     setSelectedUserId("");
  //     return;
  //   }

  //   setSelectedUserId(user._id);
  // }, [userFIlter, users]);

  useEffect(() => {
    sessionStorage.setItem("currentTradeStatusFilter", statusFilter);

    sessionStorage.setItem("currentTradeAccountFilter", acctFilter);

    sessionStorage.setItem("currentUserFilter", userFilter);
  }, [statusFilter, acctFilter, userFilter]);

  const columns = useMemo(
    () => [
      {
        header: "Date",
        accessorKey: "createdAt",
        enableColumnFilter: false,
        cell: (cell) => {
          const value = cell.getValue();

          return <>{value ? format(new Date(value), "MMM dd, yyyy") : "-"}</>;
        },
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
                {cell.getValue() || "-"}
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
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
              {cell.row.original?.asset?.img && (
                <img
                  src={cell.row.original.asset.img}
                  alt=""
                  className="avatar-xxs"
                />
              )}
            </div>

            <Link to="#" className="currency_name flex-grow-1 ms-2">
              {cell.getValue() || "-"}
            </Link>
          </div>
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
        accessorKey: "wallet.name",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <div className="text-capitalize">{cell.getValue() || "-"}</div>
          );
        },
      },

      {
        header: "Plan",
        accessorKey: "plan.name",
        enableColumnFilter: false,
        cell: ({ row }) => {
          return (
            <div className="text-capitalize">
              {row.original?.plan?.name || "-"}
            </div>
          );
        },
      },

      {
        header: "Today Return",
        accessorKey: "performance.totalReturn",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Roi {...cell} />;
        },
      },
      {
        header: "Leverage",
        accessorKey: "execution.leverage",
        enableColumnFilter: false,
        cell: (cell) => {
          return <div>{cell.getValue() ? `${cell.getValue()}X` : "-"}</div>;
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
                className="form-select"
                defaultValue=""
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
    [navigate],
  );

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
                  className="btn btn-secondary"
                >
                  Create Trade
                </button>
              </div>
            </div>
          </CardHeader>

          <CardBody>
            {/* Filters */}
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
              data={filteredTrades || []}
              isGlobalFilter={false}
              isAddUserList={false}
              customPageSize={50}
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

      {/* Edit trade */}
      {action === "edit" && showModal && (
        <TradeModal
          dataId={rowId}
          action={action}
          isOpen={showModal}
          onClose={handleClose}
          rowData={rowData}
        />
      )}

      {/* Delete trade */}
      {action === "delete" && (
        <DeleteTradeModal
          tradeId={rowId}
          isOpen={action === "delete"}
          onClose={handleClose}
        />
      )}

      {/* Create trade */}
      {createTradeModal && (
        <CreateTrade
          isOpen={createTradeModal}
          onClose={closeCreateTradeModal}
        />
      )}

      {/* Close trade */}
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
