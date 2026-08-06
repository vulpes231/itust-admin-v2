import React from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Container, Row } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../../services/articles";
import AllArticles from "./AllArticles";

const Articles = () => {
  const { data: articles, isLoading: getArticlesLoading } = useQuery({
    queryFn: getArticles,
    queryKey: ["articles"],
  });

  // console.log(articles);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Articles" pageTitle="Manage Articles" />
          <Row>
            <AllArticles articles={articles} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Articles;
