import { Modal, ModalHeader, ModalBody, Card, CardBody, Row } from "reactstrap";

const DetailPhoto = ({ modal, toggle, data, indexPhoto }) => {
  return (
    <>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Detail Photo</ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <Row>
                <img
                  src={data[indexPhoto].url}
                  style={{ textAlign: "center", margin: "auto" }}
                />
              </Row>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </>
  );
};

export default DetailPhoto;
