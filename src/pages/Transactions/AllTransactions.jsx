import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import { Type, Account, Email, Memo, Price, Status } from "./TransactionCol";
import TableContainer from "../../Components/Common/TableContainer";
import { format } from "date-fns";
import TransactionModal from "./TransactionModal";
import { upperCase } from "lodash";
import CreateTransaction from "./CreateTransaction";

const AllTransactions = ({ transactionList }) => {
  const [action, setAction] = useState("");
  const [rowId, setRowId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [createTransactionModal, setCreateTransactionModal] = useState(false);

  const openCreateTransactionModal = () => {
    setCreateTransactionModal(true);
  };
  const closeCreateTransactionModal = () => {
    setCreateTransactionModal(false);
  };

  const handleAction = (e, id) => {
    setRowId(id);
    setAction(e.target.value);
    setShowModal(true);
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
      {
        header: "Memo",
        accessorKey: "memo",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Memo {...cell} />;
        },
      },
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
          return (
            <div>
              <select
                name="action"
                onChange={(e) => handleAction(e, cell.getValue())}
              >
                <option value="">Select Option</option>
                <option value="approve">Approve</option>
                <option value="reject">Reject</option>
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
            <h5 className="card-title mb-0 flex-grow-1">All Transactions</h5>
            <div className="flex-shrink-0">
              <div className="flax-shrink-0 hstack gap-2">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={openCreateTransactionModal}
                >
                  Create Transaction
                </button>
                {/* <button className="btn btn-soft-info">Past Orders</button> */}
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <TableContainer
              columns={columns}
              data={transactionList || []}
              isGlobalFilter={true}
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
          action={action}
          isOpen={showModal}
          onClose={() => {
            setAction("");
            setRowId("");
            setShowModal(false);
          }}
        />
      )}
      {createTransactionModal && (
        <CreateTransaction
          isOpen={createTransactionModal}
          onClose={closeCreateTransactionModal}
        />
      )}
    </React.Fragment>
  );
};

export default AllTransactions;
