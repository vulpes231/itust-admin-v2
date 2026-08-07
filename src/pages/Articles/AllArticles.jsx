import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import TableContainer from "../../Components/Common/TableContainer";
import { capitalize } from "lodash";
import CreateArticleForm from "./CreateArticleForm";
import DeleteArticleForm from "./DeleteArticleForm";
import EditArticleForm from "./EditArticleForm";
import { Category, Identity, Info, Title } from "./ArticleCol";

const AllArticles = ({ articles }) => {
  const [createArticleModal, setCreateArticleModal] = useState(false);
  const [updateArticleModal, setUpdateArticleModal] = useState(false);
  const [deleteArticleModal, setDeleteArticleModal] = useState(false);

  const [currentTab, setCurrentTab] = useState(() => {
    return sessionStorage.getItem("currentAssetTab") || "all";
  });

  const [action, setAction] = useState("");
  const [data, setData] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAction = (e, value) => {
    setData(value);
    setAction(e.target.value);
    setShowModal(true);
  };

  const filteredArticles = useMemo(() => {
    if (!articles?.length) return [];

    return currentTab === "all"
      ? articles
      : articles.filter((art) => art.topic === currentTab);
  }, [articles, currentTab]);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "img",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Identity {...cell} />;
        },
      },
      {
        header: "Title",
        accessorKey: "title",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Title {...cell} />;
        },
      },
      {
        header: "Category",
        accessorKey: "topic",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Category {...cell} />;
        },
      },
      {
        header: "Content",
        accessorKey: "content",
        enableColumnFilter: false,
        cell: (cell) => {
          return <Info {...cell} />;
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
                {/* <option value="view">View</option> */}
                <option value="edit">Edit</option>
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
    sessionStorage.setItem("currentArticleTab", currentTab);
  }, [currentTab]);

  return (
    <React.Fragment>
      <Col lg={12}>
        <Card>
          <CardHeader className="d-flex align-items-center border-0">
            <h5 className="card-title mb-0 flex-grow-1">All Articles</h5>
            <div className="flex-shrink-0">
              <div className="flax-shrink-0 hstack gap-2">
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => {
                    console.log("button clicked");
                    setCreateArticleModal(true);
                  }}
                >
                  Add Article
                </button>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <div className="pb-4 d-flex align-items-center gap-2">
              {[
                "all",
                "business",
                "investment",
                "savings",
                "retirement",
                "trends",
                "technology",
                "news",
              ].map((asset, index) => {
                return (
                  <button
                    onClick={() => setCurrentTab(asset)}
                    key={index}
                    className={`btn text-capitalize ${asset === currentTab ? "bg-secondary text-white" : "bg-light"} `}
                    style={{ width: "110px" }}
                  >
                    {asset}
                  </button>
                );
              })}
            </div>
            <TableContainer
              columns={columns}
              data={filteredArticles || []}
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
      {createArticleModal && (
        <CreateArticleForm
          isOpen={createArticleModal}
          onClose={() => {
            setCreateArticleModal(false);
          }}
        />
      )}
      {action === "delete" && (
        <DeleteArticleForm
          isOpen={action === "delete"}
          handleClose={() => {
            setData("");
            setAction("");
          }}
          data={data}
        />
      )}
      {action === "edit" && (
        <EditArticleForm
          isOpen={action === "edit"}
          onClose={() => setAction("")}
          articleData={data}
        />
      )}
    </React.Fragment>
  );
};

export default AllArticles;
