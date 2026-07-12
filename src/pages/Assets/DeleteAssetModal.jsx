import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { removeAsset } from "../../services/asset";

const DeleteAssetModal = ({ isOpen, handleClose, asset }) => {
  const deleteAssetMutation = useMutation({
    mutationFn: removeAsset,
    onSuccess: () => {
      setTimeout(() => {
        handleClose();
        window.location.reload();
      }, 2000);
    },
  });
  return (
    <Modal toggle={handleClose} isOpen={isOpen}>
      <ModalBody className="d-flex flex-column gap-2">
        <span>
          Delete <b>{asset?.name}</b> permanently?
        </span>
        <div className="d-flex gap-2">
          <button
            type="button"
            onClick={() => {
              if (!asset) return;
              console.log(asset._id);
              deleteAssetMutation.mutate(asset._id);
            }}
            className="btn btn-danger d-flex align-items-center justify-content-center gap-2"
          >
            {deleteAssetMutation.isPending && <Spinner size={"sm"} />} Delete
          </button>
          <button className="btn btn-light" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteAssetModal;
