import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  Col,
  CardBody,
  CardHeader,
  Row,
  Input,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

import TableContainer from "../../Components/Common/TableContainer";

import {
  EndDate,
  PlanBalance,
  PlanName,
  PlanReturn,
  PlanStatus,
  StartDate,
} from "./UserplanCol";

const Planlist = ({ plans = [] }) => {
  const navigate = useNavigate();

  const [searchUser, setSearchUser] = useState("");
  const [statusFilter, setStatusFilter] = useState(
    () => sessionStorage.getItem("currentPlansStatusFilter") || "all",
  );

  // Filters currently applied to the table.
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedStatus, setAppliedStatus] = useState(statusFilter);

  useEffect(() => {
    sessionStorage.setItem("currentPlansStatusFilter", statusFilter);
  }, [statusFilter]);

  const filteredPlans = useMemo(() => {
    const search = appliedSearch.trim().toLowerCase();

    return (plans || []).filter((plan) => {
      const username = plan.userData?.username || "";
      const fullName = plan.userData?.fullName || "";
      const email = plan.userData?.email || "";
      const planName = plan.name || "";

      const matchesSearch =
        !search ||
        [username, fullName, email, planName].some((value) =>
          String(value).toLowerCase().includes(search),
        );

      // Normalize the status for filtering.
      const status = String(plan.status || "").toLowerCase();

      const matchesStatus =
        appliedStatus === "all" || status === appliedStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [plans, appliedSearch, appliedStatus]);

  const handleFilter = () => {
    setAppliedSearch(searchUser);
    setAppliedStatus(statusFilter);
  };

  const handleReset = () => {
    setSearchUser("");
    setStatusFilter("all");
    setAppliedSearch("");
    setAppliedStatus("all");
  };

  const handleAction = (action, plan) => {
    if (!plan?._id) return;

    switch (action) {
      case "view":
        // Update this route if your application uses a different URL.
        // navigate(`/plans/${plan._id}`, {
        //   state: { plan },
        // });
        break;

      case "close":
        if (plan.status !== "active") return;

        // Connect your close-plan API mutation here.
        console.log("Close plan:", plan._id, plan);
        break;

      default:
        break;
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "User",
        accessorKey: "userData.username",
        enableColumnFilter: false,
        cell: (cell) => (
          <div className="text-capitalize">{cell.getValue() || "N/A"}</div>
        ),
      },
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
          const plan = cell.row.original;

          return (
            <Input
              type="select"
              name={`action-${plan._id}`}
              bsSize="sm"
              defaultValue=""
              aria-label={`Actions for ${plan.name || "plan"}`}
              onChange={(e) => {
                const selectedAction = e.target.value;

                if (selectedAction) {
                  handleAction(selectedAction, plan);
                  e.target.value = "";
                }
              }}
            >
              <option value="">Select Option</option>
              <option value="view">View</option>
              {plan.status === "active" && <option value="close">Close</option>}
            </Input>
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
            <h5 className="card-title mb-0 flex-grow-1">All Plans</h5>
          </CardHeader>

          <CardBody>
            <Row className="g-3 align-items-center pb-4">
              <Col lg={4} md={12}>
                <Input
                  type="text"
                  placeholder="Search by name, username, email..."
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleFilter();
                  }}
                />
              </Col>

              <Col lg={3} md={4}>
                <Input
                  type="select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="closed">Closed</option>
                </Input>
              </Col>

              <Col lg={2} md={4}>
                <Button
                  color="secondary"
                  className="w-100"
                  onClick={handleFilter}
                >
                  Filter
                </Button>
              </Col>

              <Col lg={2} md={4}>
                <Button color="light" className="w-100" onClick={handleReset}>
                  Reset
                </Button>
              </Col>
            </Row>

            <TableContainer
              columns={columns}
              data={filteredPlans}
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
