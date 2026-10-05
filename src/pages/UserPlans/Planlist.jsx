import React, { useEffect, useMemo, useState } from "react";
import { Card, Col, CardBody, CardHeader } from "reactstrap";
import TableContainer from "../../Components/Common/TableContainer";

import {
  EndDate,
  PlanBalance,
  PlanName,
  PlanReturn,
  PlanStatus,
  StartDate,
} from "./UserplanCol";
import { useNavigate } from "react-router-dom";

const Planlist = ({ plans }) => {
  const navigate = useNavigate();
  const [action, setAction] = useState("");
  const [rowId, setRowId] = useState("");
  const [closePlanModal, setClosePlanModal] = useState(false);
  //   const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [data, setData] = useState("");

  const handleAction = (e, id, planData) => {
    setRowId(id);
    setAction(e.target.value);
    setData(planData);
  };

  useEffect(() => {
    if (action === "close" && rowId) {
      console.log("Close plan", rowId);
    }
  }, [action, rowId]);

  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        enableColumnFilter: false,
        cell: (cell) => <PlanName cell={cell} />,
      },
      {
        header: "Balance",
        accessorKey: "balance.total",
        enableColumnFilter: false,
        cell: (cell) => <PlanBalance cell={cell} />,
      },
      {
        header: "Return",
        accessorKey: "performance.totalReturn",
        enableColumnFilter: false,
        cell: (cell) => <PlanReturn cell={cell} />,
      },
      {
        header: "Start Date",
        accessorKey: "start",
        enableColumnFilter: false,
        cell: (cell) => <StartDate cell={cell} />,
      },
      {
        header: "End Date",
        accessorKey: "end",
        enableColumnFilter: false,
        cell: (cell) => <EndDate cell={cell} />,
      },
      {
        header: "Status",
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cell) => <PlanStatus cell={cell} />,
      },
      {
        header: "Action",
        accessorKey: "_id",
        enableColumnFilter: false,
        cell: (cell) => {
          const rowData = cell.row.original;

          const status = cell.row.original.status;
          return (
            <div>
              <select
                name="action"
                onChange={(e) => handleAction(e, cell.getValue(), rowData)}
              >
                <option value="">Select Option</option>
                <option value="view">View</option>
                {status === "active" && <option value="close">Close</option>}
                {/* <option value="ban">Ban</option> */}
                {/* <option value="delete">Delete</option> */}
              </select>
            </div>
          );
        },
      },
    ],
    [],
  );

  //   console.log(plans);
  return (
    <React.Fragment>
      <Col lg={12}>
        <Card>
          <CardHeader className="d-flex align-items-center border-0">
            <h5 className="card-title mb-0 flex-grow-1">All Plans</h5>
          </CardHeader>
          <CardBody>
            <TableContainer
              columns={columns}
              data={plans || []}
              isGlobalFilter={false}
              isAddUserList={false}
              customPageSize={10}
              className="custom-header-css"
              divClass="table-responsive table-card mb-1"
              tableClass="align-middle table-nowrap"
              theadClass="table-light text-muted"
              isCryptoOrdersFilter={true}
              SearchPlaceholder="Search Plans..."
            />
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Planlist;
