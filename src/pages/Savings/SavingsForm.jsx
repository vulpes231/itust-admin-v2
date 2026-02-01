import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Input, Label, Row, Spinner } from "reactstrap";
import { getAccessToken } from "../../helpers/api_helper";
import { searchCountry } from "../../services/generic";

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const SavingsForm = ({ mutation, onClose }) => {
  const tk = getAccessToken();

  const [noteInput, setNoteInput] = useState("");

  const [assetSearch, setAssetSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const addNote = () => {
    const note = noteInput.trim();
    const notes = validation.values.notes;

    if (!note) return;
    if (notes.includes(note)) return;
    if (notes.length >= 3) return;

    validation.setFieldValue("notes", [...notes, note]);
    setNoteInput("");
  };

  const debouncedSearch = useDebounce(assetSearch, 500);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      notes: [],
      title: "",
      subTitle: "",
      canTrade: "",
      category: "",
      symbol: "",
      interestRate: "",
      eligibleCountries: [],
    },
    onSubmit: (values) => {
      console.log(values);
      mutation.mutate(values);
    },
  });

  const { data: searchResult = [] } = useQuery({
    queryKey: ["searchAsset", debouncedSearch],
    queryFn: () => searchCountry(debouncedSearch),
    enabled: !!tk && debouncedSearch.length > 3,
  });

  return (
    <React.Fragment>
      <form action="">
        <div className="mb-3 mt-3">
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
              <Label>Category</Label>
              <Input
                type="select"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.category}
                name="category"
              >
                <option value="">Select Category</option>
                <option value="savings">Savings</option>
                <option value="retirement">Retirement</option>
              </Input>
            </Col>
            <Col>
              <Label> Tradeable</Label>
              <Input
                type="select"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.canTrade}
                name="canTrade"
              >
                <option value="">Select Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Input>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Label>Subtitle</Label>
              <Input
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.subTitle}
                name="subTitle"
              />
            </Col>
            <Col>
              <Label>Symbol</Label>
              <Input
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.symbol}
                name="symbol"
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Label>Interest Rate (%)</Label>
              <Input
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.interestRate}
                name="interestRate"
              />
            </Col>
          </Row>
          <Row className="mb-3 position-relative">
            <Col>
              <Label>Select Countries</Label>
              <Input
                type="text"
                value={assetSearch}
                onChange={(e) => {
                  setAssetSearch(e.target.value);
                  setShowDropdown(true);
                }}
                onBlur={() => {
                  setTimeout(() => setShowDropdown(false), 150);
                }}
                placeholder="Search Countries..."
              />

              {showDropdown && searchResult.length > 0 && (
                <div
                  className="border rounded bg-white position-absolute w-100"
                  style={{
                    zIndex: 1000,
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  {searchResult.map((country) => (
                    <div
                      key={country._id}
                      className="p-2 dropdown-item"
                      style={{ cursor: "pointer" }}
                      onMouseDown={() => {
                        const current = validation.values.eligibleCountries;

                        if (!current.includes(country._id)) {
                          validation.setFieldValue("eligibleCountries", [
                            ...current,
                            country._id,
                          ]);
                        }

                        setAssetSearch("");
                        setShowDropdown(false);
                      }}
                    >
                      <span className="d-flex align-items-center gap-2">
                        <span> {country.name}</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {validation.values.eligibleCountries.length > 0 && (
                <div className="mt-2 d-flex flex-wrap gap-2">
                  {validation.values.eligibleCountries.map((id) => {
                    const country = searchResult.find((c) => c._id === id);

                    return (
                      <span
                        key={id}
                        className="badge bg-info d-flex align-items-center gap-2"
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
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Label>Notes (max 3)</Label>
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
                  disabled={validation.values.notes.length >= 3}
                >
                  Add
                </button>
              </div>

              {validation.values.notes.length > 0 && (
                <div className="mt-2 d-flex flex-wrap gap-2">
                  {validation.values.notes.map((note, idx) => (
                    <span
                      key={idx}
                      className="badge bg-dark d-flex align-items-center gap-2"
                    >
                      {note}
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          validation.setFieldValue(
                            "notes",
                            validation.values.notes.filter((n) => n !== note)
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

export default SavingsForm;
