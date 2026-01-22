import React, { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";
import AllAdmins from "./AllAdmins";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { getAccessToken } from "../../helpers/api_helper";
import { useQuery } from "@tanstack/react-query";
import { getAllAdmins } from "../../services/admin";

const Admins = () => {
  document.title = "Admins | Itrust Investment";

  const token = getAccessToken();

  const [adminList, setAdminList] = useState([]);

  const { data: admins } = useQuery({
    queryKey: ["investments"],
    queryFn: getAllAdmins,
    enabled: !!token,
  });

  useEffect(() => {
    if (admins && admins.length > 0) {
      // console.log(admins);
      setAdminList(admins);
    }
  }, [admins]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Admins" pageTitle="Manage Admins" />
          <Row>
            <AllAdmins adminList={adminList} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Admins;
