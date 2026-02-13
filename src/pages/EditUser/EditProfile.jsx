import React from "react";
import { Card, Col, Input, Label, Row } from "reactstrap";
import { useFormik } from "formik";
import { format } from "date-fns";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import * as Yup from "yup";

const EditProfile = ({ user }) => {
  const formattedDob =
    user &&
    user.personalDetails &&
    user.personalDetails.dob &&
    format(user.personalDetails.dob, "MMM dd, yyyy");

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user?.name?.firstName || "",
      lastName: user?.name?.lastName || "",
      email: user?.credentials?.email || "",
      username: user?.credentials?.username || "",
      country: user?.locationDetails?.country?.name || "",
      address: user?.contactInfo?.address?.street || "",
      state: user?.locationDetails?.state?.name || "",
      city: user?.contactInfo?.address?.city || "",
      zip: user?.contactInfo?.address?.zipCode || "",
      dob: formattedDob || user?.personalDetails?.dob || "",
      experience: user?.professionalInfo?.experience || "",
      employment: user?.professionalInfo?.employment || "",
      nationality: user?.locationDetails?.nationality?.name || "",
      currency: user?.locationDetails?.currency?.name || "",
      // isBanned: user?.locationDetails?.nationality?.name || "",
      // isEmailVerified: user?.locationDetails?.nationality?.name || "",
      // isKycVerified: user?.locationDetails?.nationality?.name || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
    }),
  });

  return (
    <Card>
      <Col>
        <h4 className="p-4">Edit Profile</h4>
        <hr />
      </Col>
      <Col className="p-4 d-flex flex-column gap-3">
        <div className="">
          <Row>
            <Col md={6}>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                className="fs-18 fw-light text-capitalize"
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
                className="fs-18 fw-light text-capitalize"
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
        <div className="d-flex flex-column gap-3">
          <Row>
            <Col>
              <Label htmlFor="email">Email</Label>
              <Input
                className="fs-18 fw-light"
                value={validation.values.email}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                invalid={
                  validation.touched && validation.errors.email ? true : false
                }
                name="email"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Label htmlFor="address">Address</Label>
              <Input
                className="fs-18 fw-light text-uppercase"
                value={validation.values.address}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                invalid={
                  validation.touched && validation.errors.address ? true : false
                }
                name="address"
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Label htmlFor="country">Country</Label>
              <Input
                className="fs-18 fw-light text-capitalize"
                value={validation.values.country}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                invalid={
                  validation.touched && validation.errors.country ? true : false
                }
                name="country"
              />
            </Col>
            <Col md={6}>
              <Label htmlFor="state">State</Label>
              <Input
                className="fs-18 fw-light text-capitalize"
                value={validation.values.state}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                invalid={
                  validation.touched && validation.errors.state ? true : false
                }
                name="state"
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Label htmlFor="city">City</Label>
              <Input
                className="fs-18 fw-light text-capitalize"
                value={validation.values.city}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                invalid={
                  validation.touched && validation.errors.city ? true : false
                }
                name="city"
              />
            </Col>
            <Col md={4}>
              <Label htmlFor="zip">Zipcode</Label>
              <Input
                className="fs-18 fw-light"
                value={validation.values.zip}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                invalid={
                  validation.touched && validation.errors.zip ? true : false
                }
                name="zip"
              />
            </Col>
            <Col md={4}>
              <Label htmlFor="dob">DOB</Label>
              <Input
                className="fs-18 fw-light"
                value={validation.values.dob}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                invalid={
                  validation.touched && validation.errors.dob ? true : false
                }
                name="dob"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Label htmlFor="experience">Experience</Label>
              <Input
                className="fs-18 fw-light text-capitalize"
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
            <Col md={6}>
              <Label htmlFor="currency">Currency</Label>
              <Input
                className="fs-18 fw-light"
                value={validation.values.currency}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                invalid={
                  validation.touched && validation.errors.currency
                    ? true
                    : false
                }
                name="currency"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Label htmlFor="employment">Employment</Label>
              <Input
                className="fs-18 fw-light text-capitalize"
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
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                className="fs-18 fw-light text-capitalize"
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
      </Col>
      <hr />
      <div className="d-flex justify-content-end p-3 mb-3">
        <button type="button" className="btn btn-primary">
          Update Profile
        </button>
      </div>
    </Card>
  );
};

export default EditProfile;
