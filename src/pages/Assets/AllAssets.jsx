import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import TableContainer from "../../Components/Common/TableContainer";
import { capitalize } from "lodash";
import CreateAsset from "./CreateAsset";
import {
  AssetName,
  ChangePercent,
  CurrentPrice,
  DailyChange,
  Symbol,
} from "./AssetCol";
import DeleteAssetModal from "./DeleteAssetModal";

const AllAssets = ({ assetList }) => {
  const [createAssetModal, setCreateAssetModal] = useState(false);
  const [currentTab, setCurrentTab] = useState(() => {
    return sessionStorage.getItem("currentAssetTab") || "all";
  });
  const [deleteModal, setDeleteModal] = useState(false);

  const [action, setAction] = useState("");
  const [data, setData] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAction = (e, value) => {
    setData(value);
    setAction(e.target.value);
    setShowModal(true);
  };

  const filteredAssets = useMemo(() => {
    if (!assetList?.length) return [];

    return currentTab === "all"
      ? assetList
      : assetList.filter((asset) => asset.type === currentTab);
  }, [assetList, currentTab]);

  const columns = useMemo(
    () => [
      {
        header: "AssetName",
        accessorKey: "name",
        enableColumnFilter: false,
        cell: (cell) => {
          return <AssetName {...cell} />;
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
        header: "Price",
        accessorKey: "priceData.current",
        enableColumnFilter: false,
        cell: (cell) => {
          return <CurrentPrice {...cell} />;
        },
      },
      {
        header: "Daily Change",
        accessorKey: "priceData.change",
        enableColumnFilter: false,
        cell: (cell) => {
          return <DailyChange {...cell} />;
        },
      },
      {
        header: "Change %",
        accessorKey: "priceData.changePercent",
        enableColumnFilter: false,
        cell: (cell) => {
          return <ChangePercent {...cell} />;
        },
      },

      {
        header: "Action",
        accessorKey: "_id",
        enableColumnFilter: false,
        cell: (cell) => {
          const data = cell.row.original;
          return (
            <div>
              <select name="action" onChange={(e) => handleAction(e, data)}>
                <option value="">Select Action</option>
                <option value="view">View</option>
                <option value="delete">Delete</option>
              </select>
            </div>
          );
        },
      },
    ],
    [],
  );

  useEffect(() => {
    console.log("currentTab:", currentTab);
  }, [currentTab]);

  useEffect(() => {
    sessionStorage.setItem("currentAssetTab", currentTab);
  }, [currentTab]);

  // console.log(currentTab);
  return (
    <React.Fragment>
      <Col lg={12}>
        <Card>
          <CardHeader className="d-flex align-items-center border-0">
            <h5 className="card-title mb-0 flex-grow-1">All Assets</h5>
            <div className="flex-shrink-0">
              <div className="flax-shrink-0 hstack gap-2">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    console.log("button clicked");
                    setCreateAssetModal(true);
                  }}
                >
                  Add Asset
                </button>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <div className="pb-4 d-flex align-items-center gap-2">
              {["all", "stock", "etf", "crypto"].map((asset, index) => {
                return (
                  <button
                    onClick={() => setCurrentTab(asset)}
                    key={index}
                    className={`btn text-capitalize ${asset === currentTab ? "bg-secondary text-white" : "bg-light"} `}
                    style={{ width: "90px" }}
                  >
                    {asset}
                  </button>
                );
              })}
            </div>
            <TableContainer
              columns={columns}
              data={filteredAssets || []}
              isGlobalFilter={false}
              isAddUserList={false}
              customPageSize={8}
              className="custom-header-css"
              divClass="table-responsive table-card mb-1"
              tableClass="align-middle table-nowrap"
              theadClass="table-light text-muted"
              isCryptoOrdersFilter={true}
              SearchPlaceholder="Search Admins..."
              // isLoa
            />
          </CardBody>
        </Card>
      </Col>
      {createAssetModal && (
        <CreateAsset
          isOpen={createAssetModal}
          onClose={() => {
            setCreateAssetModal(false);
          }}
        />
      )}
      {action === "delete" && (
        <DeleteAssetModal
          isOpen={action === "delete"}
          handleClose={() => setAction("")}
          asset={data}
        />
      )}
    </React.Fragment>
  );
};

export default AllAssets;
