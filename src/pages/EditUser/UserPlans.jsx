import React, { useState } from "react";
import { Card, CardBody, CardHeader, Table } from "reactstrap";
import { format } from "date-fns"; // Install: npm install date-fns
import { devServer, liveServer } from "../../config";
import EditPlanModal from "./EditPlanModal";

const UserPlans = ({ plans, onEdit, onView }) => {
  const [action, setAction] = useState("");
  const [rowData, setRowData] = useState("");
  const [editPlanModal, setEditPlanModal] = useState(false);
  const [viewPlanModal, setViewPlanModal] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount || 0);
  };

  const handleClick = (action, item) => {
    console.log(action, item);
    setAction(action);
    setRowData(item);

    if (action === "edit") {
      setEditPlanModal(true);
    } else if (action === "view") {
      setViewPlanModal(true);
    }
  };

  const handleClose = () => {
    setAction("");
    setRowData("");

    setEditPlanModal(false);
    setViewPlanModal(false);
  };

  return (
    <React.Fragment>
      <Card className="w-100">
        <CardHeader>
          <strong>User Active Plans</strong>
        </CardHeader>
        <CardBody className="p-0">
          <div className="table-responsive">
            <Table striped bordered hover className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Min Investment</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Total Amount</th>
                  <th>Available Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans && plans.length > 0 ? (
                  plans.map((plan) => (
                    <tr key={plan._id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={`${liveServer}${plan.image}`}
                            alt={plan.name}
                            width={30}
                            height={30}
                            // style={{ objectFit: "contain" }}
                            //   onError={(e) => {
                            //     e.target.style.display = "none";
                            //   }}
                          />
                          <div>
                            <div className="fw-semibold text-capitalize">
                              {plan.name}
                            </div>
                            {plan.title && (
                              <small className="text-muted">{plan.title}</small>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>{formatCurrency(parseFloat(plan.min))}</td>
                      <td>{formatDate(plan.start)}</td>
                      <td>{formatDate(plan.end)}</td>
                      <td>{formatCurrency(plan.balance?.total || 0)}</td>
                      <td>{formatCurrency(plan.balance?.available || 0)}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-info"
                            onClick={() => handleClick("view", plan)}
                            title="View Plan"
                          >
                            <i className="bi bi-eye"></i> View
                          </button>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleClick("edit", plan)}
                            title="Edit Plan"
                          >
                            <i className="bi bi-pencil"></i> Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      <div className="text-muted">No active plans found.</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
      {editPlanModal && (
        <EditPlanModal
          plan={rowData}
          isOpen={editPlanModal}
          onClose={handleClose}
        />
      )}
    </React.Fragment>
  );
};

export default UserPlans;
