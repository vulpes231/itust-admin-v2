import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import {
  Type,
  Status,
  Winrate,
  Duration,
  Minimum,
  TotalReturn,
} from "./PlanCol";
import TableContainer from "../../Components/Common/TableContainer";
import { format } from "date-fns";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { GrOverview } from "react-icons/gr";
import DeletePlan from "./DeletePlan";
import CreatePlan from "./CreatePlan";
import { devServer } from "../../config";
import EditPlan from "./EditPlan";

const AllPlans = ({ planList }) => {
  const [createPlanModal, setCreatePlanModal] = useState(false);
  const [deletePlanModal, setDeletePlanModal] = useState(false);
  const [editPlanModal, setEditPlanModal] = useState(false);
  const [viewPlanModal, setViewPlanModal] = useState(false);
  const [action, setAction] = useState("");
  const [planId, setPlanId] = useState("");
  const [plan, setPlan] = useState("");

  // console.log(planList);

  const handleAction = (id, data, currentAction) => {
    setPlanId(id);
    setPlan(data);
    setAction(currentAction);
  };

  const columns = useMemo(
    () => [
      {
        header: "Date",
        accessorKey: "createdAt",
        enableColumnFilter: false,
        cell: (cell) => (
          <>
            {cell.getValue() !== undefined
              ? format(cell.getValue(), "MMM dd, yyyy")
              : cell.getValue()}
          </>
        ),
      },
      {
        header: "Name",
        accessorKey: "name",
        enableColumnFilter: false,
        cell: (cell) => {
          // const
          return (
            <div className="d-flex align-items-center">
              <img
                src={`${devServer}${cell.row.original?.img}`}
                alt="ppic"
                style={{ width: "30px" }}
                className="bg-light p-1 rounded-circle"
              />
              <Link
                to="#"
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
        accessorKey: "planType",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Type {...cell} />;
        },
      },
      {
        header: "Winrate (%)",
        accessorKey: "performance.winRate",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Winrate {...cell} />;
        },
      },
      {
        header: "Duration",
        accessorKey: "formattedDuration",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Duration {...cell} />;
        },
      },
      {
        header: "Minimum Investment",
        accessorKey: "minInvestment",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Minimum {...cell} />;
        },
      },
      {
        header: "Total return (%)",
        accessorKey: "performance.expectedReturnPercent",
        enableColumnFilter: false,
        cell: (cell) => {
          return <TotalReturn {...cell} />;
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
        header: "Actions",
        accessorKey: "title",
        enableColumnFilter: false,
        cell: (cell) => {
          const data = cell.row.original;
          return (
            <div className="d-flex align-items-center gap-1">
              {/* <button
                onClick={() => handleAction(data._id, data, "view")}
                className="btn btn-info"
              >
                <GrOverview />
              </button> */}
              <button
                onClick={() => handleAction(data._id, data, "edit")}
                className="btn btn-secondary"
              >
                <TiEdit />
              </button>
              <button
                onClick={() => handleAction(data._id, data, "delete")}
                className="btn btn-danger"
              >
                <RiDeleteBin5Line />
              </button>
            </div>
          );
        },
      },
    ],
    [],
  );

  const handleCloseModal = () => {
    setAction("");
    setPlan("");
    setPlanId("");
    if (action === "edit") {
      setEditPlanModal(false);
    } else if (action === "delete") {
      setDeletePlanModal(false);
    } else {
      setViewPlanModal(false);
    }
  };

  useEffect(() => {
    if (action === "edit") {
      console.log(planId, "edit");
      setEditPlanModal(true);
    } else if (action === "view") {
      // console.log(planId, "view");
      setViewPlanModal(true);
    } else if (action === "delete") {
      // console.log(planId, "delete");
      setDeletePlanModal(true);
    }
  }, [action]);
  return (
    <React.Fragment>
      <Col lg={12}>
        <Card>
          <CardHeader className="d-flex align-items-center border-0">
            <h5 className="card-title mb-0 flex-grow-1">All Plans</h5>
            <div className="flex-shrink-0">
              <div className="flax-shrink-0 hstack gap-2">
                <button
                  type="button"
                  onClick={() => setCreatePlanModal(true)}
                  className="btn btn-primary"
                >
                  Create Plan
                </button>
                {/* <button className="btn btn-soft-info">Past Orders</button> */}
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <TableContainer
              columns={columns}
              data={planList || []}
              isGlobalFilter={true}
              isAddUserList={false}
              customPageSize={8}
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
      {createPlanModal && (
        <CreatePlan
          isOpen={createPlanModal}
          onClose={() => setCreatePlanModal(false)}
        />
      )}
      {editPlanModal && (
        <EditPlan
          isOpen={editPlanModal}
          onClose={handleCloseModal}
          data={plan}
        />
      )}
      {deletePlanModal && (
        <DeletePlan
          isOpen={deletePlanModal}
          onClose={handleCloseModal}
          data={plan}
          dataId={planId}
        />
      )}
    </React.Fragment>
  );
};

export default AllPlans;
