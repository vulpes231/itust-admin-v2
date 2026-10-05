import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
import { Card, Col, Input, Label, Row, Spinner } from "reactstrap";
import { FiEdit } from "react-icons/fi";
import { updateUserTier } from "../../services/tier";
import UpdateTier from "./UpdateTier";

const AccountTier = ({ tiers, tierInfo }) => {
  const [selectedTier, setSelectedTier] = useState("");
  const [editTierModal, setEditTierModal] = useState(false);

  return (
    <Card className="p-4">
      <h4>User Account Tiers</h4>

      <Col>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Threshold</th>
                <th className="px-4 py-3">Minimum Deposit</th>
                <th className="px-4 py-3 text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              {tiers && tiers.length > 0 ? (
                tiers.map((tier) => (
                  <tr key={tier._id}>
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
                          style={{
                            width: "36px",
                            height: "36px",
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          {tier.title?.charAt(0)?.toUpperCase()}
                        </div>

                        <div>
                          <div className="fw-semibold text-dark text-capitalize">
                            {tier.title}
                          </div>

                          <small className="text-muted">{tier.tag}</small>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span className="fw-medium">{tier.threshold}</span>
                    </td>

                    <td className="px-4 py-3">
                      <span className="fw-medium">{tier.minDeposit}</span>
                    </td>

                    <td className="px-4 py-3 text-end">
                      <button
                        type="button"
                        onClick={() => {
                          console.log(tier);
                          setSelectedTier(tier);
                          setEditTierModal(true);
                        }}
                        className="btn btn-sm bg-secondary-subtle text-secondary border-0"
                        title="Edit tier"
                      >
                        <FiEdit size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-5 text-muted">
                    No tiers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Col>

      {editTierModal && (
        <UpdateTier
          isOpen={editTierModal}
          handleToggle={() => setEditTierModal(false)}
          tier={selectedTier}
          tierInfo={tierInfo}
        />
      )}
    </Card>
  );
};

export default AccountTier;
