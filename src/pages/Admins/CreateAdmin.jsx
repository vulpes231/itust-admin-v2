import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Card, Modal, ModalBody, ModalHeader } from "reactstrap";
import { ErrorToast, SuccessToast } from "../../Components";
import AdminForm from "./AdminForm";
import { addNewAdmin } from "../../services/admin";

const CreateAdmin = ({ isOpen, onClose }) => {
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: addNewAdmin,
    onError: (err) => setError(err.message),
  });

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(tmt);
    }
  }, [error]);

  useEffect(() => {
    if (mutation.isSuccess) {
      const tmt = setTimeout(() => {
        mutation.reset();
        onClose();
        window.location.reload();
      }, 3000);

      return () => clearTimeout(tmt);
    }
  }, [mutation.isSuccess]);
  return (
    <React.Fragment>
      <Card>
        <Modal toggle={onClose} isOpen={isOpen}>
          <ModalHeader toggle={onClose}>Add New Admin</ModalHeader>
          <ModalBody className="d-flex flex-column gap-4">
            <AdminForm
              mutation={mutation}
              onClose={onClose}
              setError={setError}
            />
          </ModalBody>
        </Modal>
      </Card>
      {error && (
        <ErrorToast
          errMsg={error}
          isOpen={error !== undefined}
          onClose={() => setError("")}
        />
      )}
      {mutation.isSuccess && (
        <SuccessToast
          msg={"Admin created successfully."}
          isOpen={mutation.isSuccess}
          onClose={() => mutation.reset()}
        />
      )}
    </React.Fragment>
  );
};

export default CreateAdmin;
