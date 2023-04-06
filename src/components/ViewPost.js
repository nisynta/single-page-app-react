import { useState } from "react";
import {
  CardBody,
  Card,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Button,
  Col,
} from "reactstrap";
import { deleteComment, getComments, updateComment } from "../api/api";
import imgPosts from "../assets/images/posts.png";

const ViewPost = ({ modal, toggle, data }) => {
  const [indexPost, setIndexPost] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comment, setComment] = useState([]);

  const getComment = (id) => {
    const onSuccess = (response) => {
      setComment(response.data);
    };

    const onFailure = (response) => {
      console.log("error ", response);
    };

    getComments(id, onSuccess, onFailure);
  };

  const updatedComment = (id) => {
    let data = {
      id: "",
      body: "",
      email: "",
      name: "",
      postId: "",
    };

    const onSuccess = (response) => {
      console.log("res ", response);
    };

    const onFailure = (response) => {
      console.log("error ", response);
    };

    updateComment(id, data, onSuccess, onFailure);
  };

  const deletedComment = (id) => {
    const onSuccess = (response) => {
      console.log("res ", response);
    };

    const onFailure = (response) => {
      console.log("error ", response);
    };

    deleteComment(id, onSuccess, onFailure);
  };

  return (
    <>
      <Modal isOpen={modal} toggle={toggle} size={selectedPost ? "lg" : ""}>
        <ModalHeader toggle={toggle}>
          {selectedPost ? "Comments" : "List Posts"}
        </ModalHeader>
        <ModalBody>
          {selectedPost ? (
            <>
              <Row style={{ justifyContent: "space-between" }}>
                <Col md={6}>
                  <Button
                    color="outline-secondary"
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      setSelectedPost(false);
                    }}
                  >
                    Back
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button color="primary">Add Comment</Button>
                </Col>
              </Row>

              {comment.map((data, i) => {
                return (
                  <>
                    <Card className="mt-2">
                      <CardBody>
                        <Row>
                          <Col lg={9}>
                            <Row>
                              <h4>{data.name}</h4>
                              <p>{data.email}</p>

                              <p>{data.body}</p>
                            </Row>
                          </Col>
                          <Col lg={3}>
                            <span>
                              <Button
                                color="primary"
                                style={{ marginRight: "10px" }}
                              >
                                Edit
                              </Button>
                              <Button
                                color="outline-danger"
                                onClick={() => deletedComment(data.id)}
                              >
                                Delete
                              </Button>
                            </span>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </>
                );
              })}
            </>
          ) : (
            data.map((post, i) => {
              return (
                <>
                  <Card
                    className="mt-2"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      setSelectedPost(e);
                      setIndexPost(i);
                      getComment(post.id);
                    }}
                  >
                    <CardBody>
                      <Row>
                        <img
                          src={imgPosts}
                          style={{
                            width: "25%",
                            textAlign: "center",
                            margin: "auto",
                          }}
                        />
                      </Row>
                      <Row>
                        <p className="text-center">{post.title}</p>
                      </Row>
                    </CardBody>
                  </Card>
                </>
              );
            })
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export default ViewPost;
