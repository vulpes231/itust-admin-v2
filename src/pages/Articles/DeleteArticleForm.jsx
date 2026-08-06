import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import { removeArticle } from "../../services/articles";
import ErrorToast from "../../Components/Common/ErrorToast";
import SuccessToast from "../../Components/Common/SuccessToast";

const DeleteArticleForm = ({ isOpen, handleClose, data }) => {
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const deleteArticle = useMutation({
    mutationFn: removeArticle,
    onError: (err) => setError(err.message),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["articles"],
        });

        handleClose();
      }, 2000);
    },
  });

  return (
    <React.Fragment>
      <Modal isOpen={isOpen} toggle={handleClose}>
        <ModalHeader toggle={handleClose}>
          <span>Delete Article</span>
        </ModalHeader>
        <ModalBody>
          <div>
            <p>
              Are you sure you want to delete <b>{data._id}</b> ?
            </p>
            <div className="d-flex align-items-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => {
                  if (!data) {
                    setError("Article ID is required!");
                    return;
                  }

                  deleteArticle.mutate(data._id);
                }}
                className="btn btn-secondary d-flex align-items-center justify-content-center gap-2"
              >
                {deleteArticle.isPending && <Spinner size={"sm"} />} Confirm
              </button>
              <button
                type="button"
                onClick={() => handleClose()}
                className="btn btn-danger"
              >
                Cancel
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {error && (
        <ErrorToast
          isOpen={!!error}
          onClose={() => setError("")}
          errMsg={error}
        />
      )}
      {deleteArticle.isSuccess && (
        <SuccessToast
          isOpen={deleteArticle.isSuccess}
          onClose={() => deleteArticle.reset()}
          errMsg={"Article deleted."}
        />
      )}
    </React.Fragment>
  );
};

export default DeleteArticleForm;
