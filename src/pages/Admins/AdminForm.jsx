import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Input, Label, Row, Spinner } from "reactstrap";
import { getAccessToken } from "../../helpers/api_helper";

const AdminForm = ({ mutation, onClose, setError }) => {
  const tk = getAccessToken();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "",
      adminRole: "",
      password: "",
      email: "",
      confirm: "",
    },
    onSubmit: (values) => {
      if (validation.values.password !== validation.values.confirm) {
        setError("Password do not match!");
        return;
      }
      console.log(values);
      mutation.mutate(values);
    },
  });

  return (
    <React.Fragment>
      <form action="">
        <div className="mb-3 mt-3">
          <Row className="mb-3">
            <Col>
              <Label> Email</Label>
              <Input
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.email}
                name="email"
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Label> Username</Label>
              <Input
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.username}
                name="username"
              />
            </Col>
            <Col>
              <Label>Role</Label>
              <Input
                type="select"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.adminRole}
                name="adminRole"
              >
                <option value="">Select Role</option>
                <option value="superuser">Super User</option>
                <option value="admin">Moderator</option>
              </Input>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Label> Password</Label>
              <Input
                type="password"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.password}
                name="password"
              />
            </Col>

            <Col>
              <Label> Confirm Password</Label>
              <Input
                type="password"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.confirm}
                name="confirm"
              />
            </Col>
          </Row>

          <Row>
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-info"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  validation.submitForm();
                }}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <Spinner size="sm" className="me-2">
                    Loading...
                  </Spinner>
                ) : null}
                Create Account
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-danger"
              >
                Cancel
              </button>
            </div>
          </Row>
        </div>
      </form>
    </React.Fragment>
  );
};

export default AdminForm;
