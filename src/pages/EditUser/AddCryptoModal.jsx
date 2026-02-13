import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
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
import { configureWallet } from "../../services/userSettings";
import ErrorToast from "../../Components/Common/ErrorToast";
import SuccessToast from "../../Components/Common/SuccessToast";
import { useParams } from "react-router-dom";

const AddCryptoModal = ({ handleToggle, isOpen, settings }) => {
  const { userId } = useParams();
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: configureWallet,
    onError: (err) => setError(err.message),
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      label: settings?.cryptoWallets?.label || "",
      btc: settings?.cryptoWallets?.btc || "",
      eth: settings?.cryptoWallets?.eth || "",
      usdtErc: settings?.cryptoWallets?.usdtErc || "",
      usdtTrc: settings?.cryptoWallets?.usdtTrc || "",
    },
    onSubmit: (values) => {
      const formData = { ...values, userId };
      console.log(formData);
      mutation.mutate(formData);
    },
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
        window.location.reload();
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [mutation.isSuccess]);

  return (
    <React.Fragment>
      <Modal toggle={handleToggle} isOpen={isOpen}>
        <ModalHeader toggle={handleToggle}>Update Wallet Addresses</ModalHeader>
        <hr />
        <ModalBody>
          <form
            action=""
            className="d-flex flex-column gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              validation.submitForm();
            }}
          >
            <Row>
              <Col>
                <Label>Label (Optional)</Label>
                <Input
                  type="text"
                  onChange={validation.handleChange}
                  value={validation.values.label}
                  onBlur={validation.handleBlur}
                  name="label"
                  placeholder="Main Wallet"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>Bitcoin</Label>
                <Input
                  type="text"
                  onChange={validation.handleChange}
                  value={validation.values.btc}
                  onBlur={validation.handleBlur}
                  name="btc"
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <Label>Ethereum</Label>
                <Input
                  type="text"
                  onChange={validation.handleChange}
                  value={validation.values.eth}
                  onBlur={validation.handleBlur}
                  name="eth"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>Tether (ERC20)</Label>
                <Input
                  type="text"
                  onChange={validation.handleChange}
                  value={validation.values.usdtErc}
                  onBlur={validation.handleBlur}
                  name="usdtErc"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>Tether (TRC20)</Label>
                <Input
                  type="text"
                  onChange={validation.handleChange}
                  value={validation.values.usdtTrc}
                  onBlur={validation.handleBlur}
                  name="usdtTrc"
                />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <button type="submit" className="btn btn-success w-100">
                  {mutation.isPending ? (
                    <Spinner>Loading...</Spinner>
                  ) : (
                    "Update Wallet"
                  )}
                </button>
              </Col>
              <Col>
                <button
                  type="button"
                  onClick={handleToggle}
                  className="btn btn-danger w-100"
                >
                  Cancel
                </button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
      {error && (
        <ErrorToast
          errMsg={error}
          isOpen={!!error}
          onClose={() => setError("")}
        />
      )}
      {mutation.isSuccess && (
        <SuccessToast
          isOpen={mutation.isSuccess}
          msg={"Wallet Information Updated."}
          onClose={() => mutation.reset()}
        />
      )}
    </React.Fragment>
  );
};

export default AddCryptoModal;
