import { useState } from "react";
import {
  CardBody,
  Card,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  Button,
} from "reactstrap";
import { getPhotos } from "../api/api";
import imgAlbum from "../assets/images/album.png";
import DetailPhoto from "./DetailPhoto";

const ViewAlbum = ({ modal, toggle, data }) => {
  const [indexAlbum, setIndexAlbum] = useState(0);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [listPhoto, setListPhoto] = useState([]);
  const [detailPhoto, setDetailPhoto] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [indexPhoto, setIndexPhoto] = useState(0);

  const getPhoto = (id) => {
    const onSuccess = (response) => {
      setListPhoto(response.data);
    };

    const onFailure = (response) => {
      console.log("error ", response);
    };

    getPhotos(id, onSuccess, onFailure);
  };

  const toggleDetail = (e) => {
    setDetailPhoto((prevState) => !prevState);
  };

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>List Album</ModalHeader>
        <ModalBody>
          {selectedAlbum ? (
            <>
              <Row style={{ justifyContent: "space-between" }}>
                <Col md={6}>
                  <Button
                    color="outline-secondary"
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      setSelectedAlbum(false);
                    }}
                  >
                    Back
                  </Button>
                </Col>
              </Row>
              {listPhoto.map((data, i) => {
                return (
                  <>
                    <Card className="mt-2">
                      <CardBody>
                        <Row>
                          <Col xs="auto" className="d-block my-auto">
                            <div
                              className="align-items-center"
                              style={{ width: "35px", height: "35px" }}
                            >
                              <img
                                src={data.thumbnailUrl}
                                width="45px"
                                style={{ marginLeft: "30px" }}
                              />
                            </div>
                            <br />
                            <Button
                              color="outline-secondary"
                              onClick={(e) => {
                                setSelectedPhoto(e);
                                setIndexPhoto(i);
                                toggleDetail()
                              }}
                            >
                              Detail Photo
                            </Button>
                          </Col>
                          <Col>
                            <p>{data.title}</p>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </>
                );
              })}
            </>
          ) : (
            data.map((album, i) => {
              return (
                <>
                  <Card
                    className="mt-2"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      setSelectedAlbum(e);
                      setIndexAlbum(i);
                      getPhoto(album.id);
                    }}
                  >
                    <CardBody>
                      <Row>
                        <img
                          src={imgAlbum}
                          style={{
                            width: "25%",
                            textAlign: "center",
                            margin: "auto",
                          }}
                        />
                      </Row>
                      <Row>
                        <p className="text-center">{album.title}</p>
                      </Row>
                    </CardBody>
                  </Card>
                </>
              );
            })
          )}
        </ModalBody>
      </Modal>

      {selectedPhoto && (
        <DetailPhoto
          modal={detailPhoto}
          toggle={toggleDetail}
          data={listPhoto}
          indexPhoto={indexPhoto}
        />
      )}
    </>
  );
};

export default ViewAlbum;
