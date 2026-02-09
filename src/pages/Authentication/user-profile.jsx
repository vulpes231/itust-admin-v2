import React, { useState, useEffect } from "react";
import { capitalize, isEmpty } from "lodash";

import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";

import * as Yup from "yup";
import { useFormik } from "formik";

import avatar from "../../assets/images/users/avatar-1.jpg";

import { useQuery } from "@tanstack/react-query";
import { getAdminInfo } from "../../services/settings";
import { getAccessToken } from "../../helpers/api_helper";

const UserProfile = () => {
  const [error, setError] = useState("");
  const token = getAccessToken();

  const { data: user } = useQuery({
    queryKey: ["admin"],
    queryFn: getAdminInfo,
    enabled: !!token,
  });

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      first_name: user?.username || "",
      idx: user?._id || "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Please Enter Your UserName"),
    }),
    onSubmit: (values) => {
      dispatch(editProfile(values));
    },
  });

  document.title = "Admin Profile | Itrust Investment";

  useEffect(() => {
    if (user) console.log(user);
  }, [user]);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="mx-3">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{capitalize(user?.username)}</h5>
                        <p className="mb-1">Email Id : {user?.email}</p>
                        <p className="mb-0">Id No : {user?._id}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change User Name</h4>

          <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <div className="form-group">
                  <Label className="form-label">User Name</Label>
                  <Input
                    name="first_name"
                    // value={name}
                    className="form-control"
                    placeholder="Enter User Name"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.first_name || ""}
                    invalid={
                      validation.touched.first_name &&
                      validation.errors.first_name
                        ? true
                        : false
                    }
                  />
                  {validation.touched.first_name &&
                  validation.errors.first_name ? (
                    <FormFeedback type="invalid">
                      {validation.errors.first_name}
                    </FormFeedback>
                  ) : null}
                  <Input name="idx" value={1} type="hidden" />
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Update User Name
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
