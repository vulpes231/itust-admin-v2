import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

import { format } from "date-fns";
import numeral from "numeral";

const TopPages = ({ transactions }) => {
  const [isTopPageDropdown, setTopPageDropdown] = useState(false);
  const toggleDropdown = () => {
    setTopPageDropdown(!isTopPageDropdown);
  };

  // useEffect(() => {
  //   if (transactions) console.log(transactions);
  // }, [transactions]);
  return (
    <React.Fragment>
      <Col>
        <Card className="card-height-100">
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Recent Transactions</h4>
            <div className="flex-shrink-0">
              <Dropdown
                isOpen={isTopPageDropdown}
                toggle={toggleDropdown}
                className="card-header-dropdown"
              >
                <DropdownToggle
                  tag="a"
                  className="text-reset dropdown-btn"
                  role="button"
                >
                  <span className="text-muted fs-16">
                    <i className="mdi mdi-dots-vertical align-middle"></i>
                  </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem>Today</DropdownItem>
                  <DropdownItem>Last Week</DropdownItem>
                  <DropdownItem>Last Month</DropdownItem>
                  <DropdownItem>Current Year</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </CardHeader>
          <CardBody>
            <div className="table-responsive table-card">
              <table className="table align-middle table-borderless table-centered table-nowrap mb-0">
                <thead className="text-muted table-light">
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Name</th>
                    {/* style={{ width: "62" }} */}
                    <th scope="col">Type</th>
                    <th scope="col">Account</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(transactions || []).map((item) => {
                    const userId = item.userId;
                    return (
                      <tr key={item._id}>
                        <td>
                          <span className="d-flex flex-column">
                            <span className="fw-normal fs-14">
                              {format(item.createdAt, "MMM dd, yyyy ")}
                            </span>
                            <span className="fw-light fs-12">
                              {format(item.createdAt, "hh:mm a")}
                            </span>
                          </span>
                        </td>
                        <td>
                          <Link
                            to="#"
                            onClick={(e) => {
                              e.preventDefault();
                              window.location.href = `/edituser/${userId}`;
                            }}
                            className="text-capitalize"
                          >
                            {item.fullname}
                          </Link>
                        </td>
                        <td>
                          <span
                            className={`fs-13 text-capitalize ${
                              item.type === "deposit"
                                ? "text-success bg-success-subtle py-1 px-3 rounded-pill"
                                : item.type === "transfer"
                                ? "text-warning bg-warning-subtle py-1 px-3 rounded-pill"
                                : item.type === "withdrawal"
                                ? "text-danger bg-danger-subtle py-1 px-3 rounded-pill"
                                : null
                            }`}
                          >
                            {item.type}
                          </span>
                        </td>
                        <td className="text-capitalize">{item.account}</td>
                        <td>
                          {" "}
                          <span
                            className={`fs-13 ${
                              item.type === "deposit"
                                ? "text-success "
                                : item.type === "transfer"
                                ? "text-warning"
                                : item.type === "withdrawal"
                                ? "text-danger"
                                : null
                            }`}
                          >
                            {item.type === "deposit"
                              ? "+ "
                              : item.type === "transfer"
                              ? ""
                              : item.type === "withdrawal"
                              ? "-"
                              : null}
                            {numeral(item.amount).format("$0,0.00")}
                          </span>{" "}
                        </td>
                        <td>
                          <span
                            className={`fs-13 text-capitalize ${
                              item.status === "completed"
                                ? "text-success bg-success-subtle py-1 px-3 rounded-pill"
                                : item.status === "pending"
                                ? "text-warning bg-warning-subtle py-1 px-3 rounded-pill"
                                : item.status === "failed"
                                ? "text-danger bg-danger-subtle py-1 px-3 rounded-pill"
                                : null
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default TopPages;
