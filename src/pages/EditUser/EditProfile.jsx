import React, { useEffect, useMemo, useState } from "react";
import { Card, Col, Input, Label, Row, Spinner } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { configureUser } from "../../services/userSettings";
import ErrorToast from "../../Components/Common/ErrorToast";
import SuccessToast from "../../Components/Common/SuccessToast";

const EditProfile = ({
  user,
  countries = [],
  states = [],
  currencies = [],
  nationalities = [],
}) => {
  const [error, setError] = useState("");
  const initialValues = useMemo(
    () => ({
      firstName: user?.name?.firstName || "",
      lastName: user?.name?.lastName || "",
      email: user?.credentials?.email || "",
      address: user?.contactInfo?.address?.street || "",
      city: user?.contactInfo?.address?.city || "",
      zip: user?.contactInfo?.address?.zipCode || "",
      dob: user?.personalDetails?.dob
        ? new Date(user.personalDetails.dob).toISOString()
        : "",
      experience: user?.professionalInfo?.experience || "",
      employment: user?.professionalInfo?.employment || "",
      countryId: user?.locationDetails?.country?.countryId || "",
      stateId: user?.locationDetails?.state?.stateId || "",
      currencyId: user?.locationDetails?.currency?.id || "",
      nationalityId: user?.locationDetails?.nationality?.id || "",
    }),
    [user]
  );

  const mutation = useMutation({
    mutationFn: configureUser,
    onError: (err) => setError(err.message),
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
    }),
    onSubmit: async (values) => {
      const changedFields = {};

      Object.keys(values).forEach((key) => {
        if (values[key] !== initialValues[key]) {
          changedFields[key] = values[key];
        }
      });

      if (Object.keys(changedFields).length === 0) {
        console.log("No changes made");
        return;
      }

      const formData = { userId: user._id, ...changedFields };

      console.log(formData);
      mutation.mutate(formData);
    },
  });

  const countryStates =
    states && states.length > 0
      ? states.filter(
          (state) => state.countryId === validation.values.countryId
        )
      : [];

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

  useEffect(() => {
    if (user) console.log(user.locationDetails);
  }, [user]);
  return (
    <Card>
      <form onSubmit={validation.handleSubmit}>
        <Col>
          <h4 className="p-4">Edit Profile</h4>
          <hr style={{ border: "1px solid #dedede" }} />
        </Col>

        <Col className="p-4 d-flex flex-column gap-3">
          <Row>
            <Col md={6}>
              <Label>First Name</Label>
              <Input
                name="firstName"
                value={validation.values.firstName}
                onChange={validation.handleChange}
              />
            </Col>

            <Col md={6}>
              <Label>Last Name</Label>
              <Input
                name="lastName"
                value={validation.values.lastName}
                onChange={validation.handleChange}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Label>Email</Label>
              <Input
                name="email"
                value={validation.values.email}
                onChange={validation.handleChange}
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Label>Country</Label>
              <Input
                type="select"
                name="countryId"
                value={validation.values.countryId}
                onChange={validation.handleChange}
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </Input>
            </Col>

            <Col md={6}>
              <Label>State</Label>
              <Input
                type="select"
                name="stateId"
                value={validation.values.stateId}
                onChange={validation.handleChange}
              >
                <option value="">Select State</option>
                {countryStates.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </Input>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Label>Currency</Label>
              <Input
                type="select"
                name="currencyId"
                value={validation.values.currencyId}
                onChange={validation.handleChange}
              >
                <option value="">Select Currency</option>
                {currencies.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </Input>
            </Col>

            <Col md={6}>
              <Label>Nationality</Label>
              <Input
                type="select"
                name="nationalityId"
                value={validation.values.nationalityId}
                onChange={validation.handleChange}
              >
                <option value="">Select Nationality</option>
                {nationalities.map((n) => (
                  <option key={n._id} value={n._id}>
                    {n.name}
                  </option>
                ))}
              </Input>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Label>City</Label>
              <Input
                name="city"
                value={validation.values.city}
                onChange={validation.handleChange}
              />
            </Col>

            <Col md={6}>
              <Label>Zip</Label>
              <Input
                name="zip"
                value={validation.values.zip}
                onChange={validation.handleChange}
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Label>Employment</Label>
              <Input
                name="employment"
                value={validation.values.employment}
                onChange={validation.handleChange}
              />
            </Col>

            <Col md={6}>
              <Label>Experience</Label>
              <Input
                name="experience"
                value={validation.values.experience}
                onChange={validation.handleChange}
              />
            </Col>
          </Row>
        </Col>

        <hr style={{ border: "1px solid #dedede" }} />

        <div className="d-flex justify-content-end p-3 mb-3">
          <button
            disabled={mutation.isPending}
            type="submit"
            className="btn btn-primary"
          >
            {mutation.isPending ? (
              <Spinner>Loading...</Spinner>
            ) : (
              "Update Profile"
            )}
          </button>
        </div>
      </form>
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
          msg={"User Information Updated."}
          onClose={() => mutation.reset()}
        />
      )}
    </Card>
  );
};

export default EditProfile;
