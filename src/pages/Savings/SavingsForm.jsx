import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Input, Label, Row, Spinner } from "reactstrap";
import { getAccessToken } from "../../helpers/api_helper";
import { getCountries } from "../../services/generic";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";

const SavingsForm = ({ mutation, onClose }) => {
  const tk = getAccessToken();

  const [noteInput, setNoteInput] = useState("");

  const addNote = () => {
    const note = noteInput.trim();
    const notes = validation.values.details;

    if (!note) return;
    if (notes.includes(note)) return;
    if (notes.length >= 3) return;

    validation.setFieldValue("details", [...notes, note]);
    setNoteInput("");
  };

  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
    enabled: !!tk,
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      details: [],
      title: "",
      information: "",
      canTrade: false,
      tag: "",
      apy: "",
      designTag: "",
      maxSavingsYearly: "",
      maxSavingsTotal: "",
      jointMaxSelection: "",
      slug: "",
      interestRate: "",
      eligibleCountries: [],
    },
    onSubmit: (values) => {
      // console.log(values);s
      mutation.mutate(values);
    },
  });

  const toggleTrade = () => {
    validation.setFieldValue("canTrade", !validation.values.canTrade);
  };

  return (
    <React.Fragment>
      <form action="">
        <div className="mb-3 mt-3">
          <Row className="mb-3">
            <Col>
              <Label>Tag</Label>
              <Input
                type="select"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.tag}
                name="tag"
              >
                <option value="">Select Tag</option>
                <option value="savings">Savings</option>
                <option value="retirement">Retirement</option>
                {/* <option value="investment">Investment</option> */}
              </Input>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Label> Name</Label>
              <Input
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.name}
                name="name"
              />
            </Col>
            <Col>
              <Label> Title</Label>
              <Input
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.title}
                name="title"
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Label className="text-capitalize">information</Label>
              <Input
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.information}
                name="information"
              />
            </Col>
            <Col>
              <Label>Slug</Label>
              <Input
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.slug}
                name="slug"
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Label className="text-capitalize">design tag</Label>
              <Input
                type="select"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.designTag}
                name="designTag"
              >
                <option value="">Select Design Tag</option>
                <option value="savings 1">Savings 1</option>
                <option value="savings 2">Savings 2</option>
                <option value="savings 3">Savings 3</option>
                <option value="retirement 1">Retirement 1</option>
                <option value="retirement 2">Retirement 2</option>
                <option value="retirement 3">Retirement 3</option>
                {/* <option value="investment1">Investment</option> */}
              </Input>
            </Col>
          </Row>
          {validation.values.tag === "retirement" && (
            <Col>
              <Row className="mb-3">
                <Col>
                  <Label className="text-capitalize">
                    joint maximum selection
                  </Label>
                  <Input
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.designTag}
                    name="designTag"
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Label className="text-capitalize">maximum yearly</Label>
                  <Input
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.designTag}
                    name="designTag"
                  />
                </Col>
                <Col>
                  <Label className="text-capitalize">maximum all time</Label>
                  <Input
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.designTag}
                    name="designTag"
                  />
                </Col>
              </Row>
            </Col>
          )}
          {validation.values.tag === "savings" && (
            <Row className="mb-3">
              <Col>
                <Label>Annual APY</Label>
                <Input
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.apy}
                  name="apy"
                />
              </Col>
            </Row>
          )}
          <Row className="mb-3 position-relative">
            <Col>
              <Label>Select Countries</Label>
              {validation.values.eligibleCountries.length > 0 && (
                <div className="my-2 d-flex flex-wrap gap-2 ">
                  {validation.values.eligibleCountries.map((id) => {
                    const country = countries.find((c) => c._id === id);

                    return (
                      <span
                        key={id}
                        className="badge bg-secondary d-flex align-items-center gap-2 text-capitalize"
                      >
                        {country?.name || id}
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            validation.setFieldValue(
                              "eligibleCountries",
                              validation.values.eligibleCountries.filter(
                                (cid) => cid !== id
                              )
                            );
                          }}
                        >
                          ✕
                        </span>
                      </span>
                    );
                  })}
                </div>
              )}
              <Input
                type="select"
                className="text-capitalize"
                value=""
                onChange={(e) => {
                  const selectedId = e.target.value;
                  if (!selectedId) return;

                  if (
                    !validation.values.eligibleCountries.includes(selectedId)
                  ) {
                    validation.setFieldValue("eligibleCountries", [
                      ...validation.values.eligibleCountries,
                      selectedId,
                    ]);
                  }
                }}
              >
                <option value="">Select Eligible Countries</option>
                {countries &&
                  countries
                    .filter(
                      (ctr) =>
                        !validation.values.eligibleCountries.includes(ctr._id)
                    )
                    .map((ctr) => (
                      <option key={ctr._id} value={ctr._id}>
                        {ctr.name}
                      </option>
                    ))}
              </Input>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Label>Details (max 3)</Label>
              <div className="d-flex gap-2">
                <Input
                  type="text"
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addNote();
                    }
                  }}
                  placeholder="Type note and press Enter"
                />
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={addNote}
                  disabled={validation.values.details.length >= 3}
                >
                  Add
                </button>
              </div>

              {validation.values.details.length > 0 && (
                <div className="mt-2 d-flex flex-wrap gap-2">
                  {validation.values.details.map((note, idx) => (
                    <span
                      key={idx}
                      className="badge bg-dark d-flex align-items-center gap-2"
                    >
                      {note}
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          validation.setFieldValue(
                            "details",
                            validation.values.details.filter((n) => n !== note)
                          );
                        }}
                      >
                        ✕
                      </span>
                    </span>
                  ))}
                </div>
              )}
            </Col>
          </Row>
          <Col className="d-flex align-items-center justify-content-between mt-3">
            <Label> Tradeable</Label>
            <span onClick={toggleTrade}>
              {!validation.values.canTrade ? (
                <FaToggleOff style={{ color: "grey" }} size={28} />
              ) : (
                <FaToggleOn className="text-secondary" size={28} />
              )}
            </span>
          </Col>
          <Row>
            <div className="d-flex align-items-center gap-2 mt-4">
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

export default SavingsForm;
