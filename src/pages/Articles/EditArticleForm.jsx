import React from "react";
import {
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

const EditArticleForm = ({ isOpen, onClose, article }) => {
  return (
    <React.Fragment>
      <Modal isOpen={isOpen} toggle={onClose}>
        <ModalHeader toggle={onClose}>
          <span>Update Article</span>
        </ModalHeader>
        <ModalBody>
          <form action="">
            <Row>
              <Col>
                <div>
                  <Label>Title</Label>
                  <Input />
                </div>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default EditArticleForm;
