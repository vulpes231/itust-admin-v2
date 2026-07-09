import { useFormik } from "formik";
import React from "react";
import { Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap";

const CreateAsset = ({ isOpen, onClose }) => {
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      assetName: "",
    },
  });
  return (
    <Modal toggle={onClose} centered isOpen={isOpen}>
      <ModalHeader toggle={onClose}>Create Asset</ModalHeader>
      <ModalBody>
        <form action="">
          <div>
            <Label>Asset Name</Label>
            <Input
              type="text"
              name="assetName"
              onChange={validation.handleChange}
              value={validation.values.assetName}
            />
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default CreateAsset;
