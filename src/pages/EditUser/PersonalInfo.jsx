import React, { useEffect, useState } from "react";

import { Col, Input, Label, Row } from "reactstrap";
import { useFormik } from "formik";
import { format } from "date-fns";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import * as Yup from "yup";

const PersonalInfo = ({ user }) => {
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showOtherInfo, setShowOtherInfo] = useState(false);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user?.name?.firstName || "",
      lastName: user?.name?.lastName || "",
      email: user?.credentials?.email || "",
      username: user?.credentials?.username || "",
      country: user?.locationDetails?.country?.name || "",
      state: user?.locationDetails?.state?.name || "",
      city: user?.contactInfo?.address?.city || "",
      zip: user?.contactInfo?.address?.zipCode || "",
      dob: user?.personalDetails?.dob || "",
      experience: user?.professionalInfo?.experience || "",
      employment: user?.professionalInfo?.employment || "",
      nationality: user?.locationDetails?.nationality?.name || "",
      // status: user?.locationDetails?.nationality?.name || "",
      // isBanned: user?.locationDetails?.nationality?.name || "",
      // isEmailVerified: user?.locationDetails?.nationality?.name || "",
      // isKycVerified: user?.locationDetails?.nationality?.name || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
    }),
  });

  return (
    <React.Fragment>
      <div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setShowPersonalInfo(!showPersonalInfo)}
          className="d-flex align-items-center justify-content-between w-100 bg-light px-4 py-2"
        >
          <h5 className="fs-20">Personal </h5>
          <span>
            {" "}
            {showPersonalInfo ? (
              <SlArrowUp className="fw-bold" size={20} />
            ) : (
              <SlArrowDown className="fw-bold" size={20} />
            )}
          </span>
        </div>
        {showPersonalInfo && (
          <Col className="p-2">
            <div className="mb-3 mt-4 ">
              <Row>
                <Col md={6}>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    value={validation.values.firstName}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={
                      validation.touched && validation.errors.firstName
                        ? true
                        : false
                    }
                    name="firstName"
                  />
                </Col>
                <Col md={6}>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    value={validation.values.lastName}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={
                      validation.touched && validation.errors.lastName
                        ? true
                        : false
                    }
                    name="lastName"
                  />
                </Col>
              </Row>
            </div>
            <div className="mb-3">
              <Row>
                <Col md={6}>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    value={validation.values.username}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={
                      validation.touched && validation.errors.username
                        ? true
                        : false
                    }
                    name="username"
                  />
                </Col>
                <Col md={6}>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    value={validation.values.email}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={
                      validation.touched && validation.errors.email
                        ? true
                        : false
                    }
                    name="email"
                  />
                </Col>
              </Row>
            </div>
          </Col>
        )}
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setShowContactInfo(!showContactInfo)}
          className="d-flex align-items-center justify-content-between w-100 bg-light px-4 py-2"
        >
          <h5 className="fs-20">Contact</h5>
          <span>
            {" "}
            {showContactInfo ? (
              <SlArrowUp className="fw-bold" size={20} />
            ) : (
              <SlArrowDown className="fw-bold" size={20} />
            )}
          </span>
        </div>

        {showContactInfo && (
          <Col className="p-2">
            <div className="mb-3 mt-4">
              <Row>
                <Col md={6}>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    value={validation.values.country}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={
                      validation.touched && validation.errors.username
                        ? true
                        : false
                    }
                    name="country"
                  />
                </Col>
                <Col md={6}>
                  <Label htmlFor="state">State</Label>
                  <Input
                    value={validation.values.state}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={
                      validation.touched && validation.errors.email
                        ? true
                        : false
                    }
                    name="state"
                  />
                </Col>
              </Row>
            </div>
            <div className="mb-3">
              <Row>
                <Col md={6}>
                  <Label htmlFor="country">City</Label>
                  <Input
                    value={validation.values.city}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={
                      validation.touched && validation.errors.city
                        ? true
                        : false
                    }
                    name="country"
                  />
                </Col>
                <Col md={6}>
                  <Label htmlFor="state">Zip</Label>
                  <Input
                    value={validation.values.zip}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={
                      validation.touched && validation.errors.zip ? true : false
                    }
                    name="state"
                  />
                </Col>
              </Row>
            </div>
          </Col>
        )}
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setShowOtherInfo(!showOtherInfo)}
          className="d-flex align-items-center justify-content-between w-100 bg-light px-4 py-2"
        >
          <h5 className="fs-20">Other</h5>
          <span>
            {" "}
            {showOtherInfo ? (
              <SlArrowUp className="fw-bold" size={20} />
            ) : (
              <SlArrowDown className="fw-bold" size={20} />
            )}
          </span>
        </div>

        {showOtherInfo && (
          <Col className="p-2">
            <div className="mb-3 mt-4">
              <Row>
                <Col md={6}>
                  <Label htmlFor="dob">Dob</Label>
                  <Input
                    value={
                      validation.values.dob &&
                      format(validation.values.dob, "MMM dd, yyyy")
                    }
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={
                      validation.touched && validation.errors.dob ? true : false
                    }
                    name="dob"
                  />
                </Col>
                <Col md={6}>
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    value={validation.values.nationality}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={
                      validation.touched && validation.errors.nationality
                        ? true
                        : false
                    }
                    name="nationality"
                  />
                </Col>
              </Row>
            </div>
            <div className="mb-3">
              <Row>
                <Col md={6}>
                  <Label htmlFor="employment">Employment</Label>
                  <Input
                    value={validation.values.employment}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={
                      validation.touched && validation.errors.employment
                        ? true
                        : false
                    }
                    name="employment"
                  />
                </Col>
                <Col md={6}>
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    value={validation.values.experience}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    invalid={
                      validation.touched && validation.errors.experience
                        ? true
                        : false
                    }
                    name="experience"
                  />
                </Col>
              </Row>
            </div>
          </Col>
        )}
      </div>
    </React.Fragment>
  );
};

export default PersonalInfo;
