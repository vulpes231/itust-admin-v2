import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import {
  Type,
  Interest,
  CanTrade,
  Minimum,
  Status,
  Symbol,
} from "./AccountCol";
import TableContainer from "../../Components/Common/TableContainer";
import { format } from "date-fns";

const AllAccounts = ({ accountList }) => {
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
              <Link to="#" className="currency_name flex-grow-1 ms-2">
                {cell.getValue()}
              </Link>
            </div>
          </>
        ),
      },
      {
        header: "Type",
        accessorKey: "category",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Type {...cell} />;
        },
      },
      {
        header: "Interest(%)",
        accessorKey: "interestRate",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Interest {...cell} />;
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
        header: "Minimum",
        accessorKey: "contributionLimits.min",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Minimum {...cell} />;
        },
      },
      {
        header: "Symbol",
        accessorKey: "symbol",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Symbol {...cell} />;
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
    ],
    []
  );
  return (
    <React.Fragment>
      <Col lg={12}>
        <Card>
          <CardHeader className="d-flex align-items-center border-0">
            <h5 className="card-title mb-0 flex-grow-1">All Accounts</h5>
            <div className="flex-shrink-0">
              <div className="flax-shrink-0 hstack gap-2">
                <button className="btn btn-primary">Create Account</button>
                {/* <button className="btn btn-soft-info">Past Orders</button> */}
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <TableContainer
              columns={columns}
              data={accountList || []}
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
    </React.Fragment>
  );
};

export default AllAccounts;
