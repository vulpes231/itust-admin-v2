import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Button,
  Row,
} from "reactstrap";
import { Type, Account, Email, Memo, Price, Status } from "./TransactionCol";
import TableContainer from "../../Components/Common/TableContainer";
import { format } from "date-fns";
import TransactionModal from "./TransactionModal";
import { upperCase } from "lodash";
import CreateTransaction from "./CreateTransaction";

const AllTransactions = ({ transactionList }) => {
  const [action, setAction] = useState("");
  const [rowId, setRowId] = useState("");
  const [rowData, setRowData] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [searchUser, setSearchUser] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [acctFilter, setAcctFilter] = useState("all");

  const [createTransactionModal, setCreateTransactionModal] = useState(false);

  const openCreateTransactionModal = () => {
    setCreateTransactionModal(true);
  };
  const closeCreateTransactionModal = () => {
    setCreateTransactionModal(false);
  };

  const filteredTransactions = useMemo(() => {
    if (!transactionList) return [];

    let transactions = transactionList;

    if (currentTab !== "all") {
      transactions = transactions.filter((trnx) => trnx.type === currentTab);
    }

    if (statusFilter !== "all" && statusFilter !== "") {
      transactions = transactions.filter(
        (trnx) => trnx.status === statusFilter,
      );
    }

    if (acctFilter !== "all" && acctFilter !== "") {
      transactions = transactions.filter((trnx) => trnx.account === acctFilter);
    }

    return transactions;
  }, [transactionList, currentTab, statusFilter, acctFilter]);

  const handleAction = (e, id, transaction) => {
    setRowId(id);
    setRowData(transaction);
    setAction(e.target.value);
    setShowModal(true);
  };

  // console.log(filteredTransactions);

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
        header: "Type",
        accessorKey: "type",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Type {...cell} />;
        },
      },
      {
        header: "Method",
        accessorKey: "method.mode",
        enableColumnFilter: false,
        cell: (cell) => (
          <>
            <div className="d-flex align-items-center">
              <Link to="#" className="currency_name flex-grow-1 ms-2">
                {upperCase(cell.getValue())}
              </Link>
            </div>
          </>
        ),
      },
      {
        header: "Account",
        accessorKey: "account",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Account {...cell} />;
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
      // {
      //   header: "Memo",
      //   accessorKey: "memo",
      //   enableColumnFilter: false,
      //   cell: (cell) => {
      //     return <Memo {...cell} />;
      //   },
      // },
      {
        header: "Amount",
        accessorKey: "amount",
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
          const method = cell.row.original.method.mode;
          const status = cell.row.original.status;
          const data = cell.row.original;
          return (
            <div>
              <select
                name="action"
                onChange={(e) => handleAction(e, cell.getValue(), data)}
              >
                <option value="">Select Option</option>
                {status !== "processed" && (
                  <option value="approve">Approve</option>
                )}
                {status !== "processed" && (
                  <option value="reject">Reject</option>
                )}
                <option value="edit">Edit</option>
                <option value="view">View</option>
                {/* {method === "bank" && } */}
              </select>
            </div>
          );
        },
      },
    ],
    [],
  );

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const showButton =
    currentTab === "deposit" ||
    currentTab === "withdraw" ||
    currentTab === "transfer";

  // console.log(filteredTransactions);
  return (
    <React.Fragment>
      <Col lg={12}>
        <Card>
          <CardHeader className="d-flex align-items-center border-0">
            <h5 className="card-title mb-0 flex-grow-1 text-capitalize">
              {currentTab} Transactions
            </h5>
            <div className="flex-shrink-0">
              <div className="flax-shrink-0 hstack gap-2">
                {showButton && (
                  <button
                    className="btn btn-secondary text-capitalize"
                    type="button"
                    onClick={openCreateTransactionModal}
                  >
                    Create {currentTab}
                  </button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardBody>
            {/* Tabs */}
            <div className="d-flex flex-wrap gap-2 mb-4">
              {["all", "deposit", "withdraw", "transfer", "savings"].map(
                (tab) => (
                  <Button
                    key={tab}
                    // outline={currentTab === tab}
                    onClick={() => handleTabChange(tab)}
                    className={`text-capitalize p-2 ${currentTab === tab ? "text-white bg-secondary" : "bg-light text-muted "}`}
                    style={{ width: "90px" }}
                  >
                    {tab === "all" ? "All" : tab}
                  </Button>
                ),
              )}
            </div>
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
                  <option value="pending">Pending</option>
                  <option value="processed">Processed</option>
                  <option value="cancelled">Cancelled</option>
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
              data={filteredTransactions || []}
              isGlobalFilter={false}
              isAddUserList={false}
              customPageSize={8}
              className="custom-header-css"
              divClass="table-responsive table-card mb-1"
              tableClass="align-middle table-nowrap"
              theadClass="table-light text-muted"
              isCryptoOrdersFilter={true}
              SearchPlaceholder="Search Transactions..."
            />
          </CardBody>
        </Card>
      </Col>
      {action && showModal && (
        <TransactionModal
          dataId={rowId}
          data={rowData}
          action={action}
          isOpen={showModal}
          onClose={() => {
            setAction("");
            setRowId("");
            setRowData("");
            setShowModal(false);
          }}
        />
      )}
      {createTransactionModal && (
        <CreateTransaction
          isOpen={createTransactionModal}
          onClose={closeCreateTransactionModal}
          currentTab={currentTab}
        />
      )}
    </React.Fragment>
  );
};

export default AllTransactions;
