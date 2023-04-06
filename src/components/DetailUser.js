import { useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { getAlbums, getPosts } from "../api/api";
import imgAlbum from "../assets/images/album.png";
import imgPosts from "../assets/images/posts.png";
import ViewAlbum from "./ViewAlbum";
import ViewPost from "./ViewPost";

const DetailUser = ({
  user,
  indexItem,
}) => {
  const [album, setAlbum] = useState([]);
  const [posts, setPosts] = useState([]);
  const [viewAlbum, setViewAlbum] = useState(false);
  const [viewPost, setViewPost] = useState(false);

  const toggleAlbum = () => {
    setViewAlbum((prevState) => !prevState);
  };

  const togglePost = () => {
    setViewPost((prevState) => !prevState);
  };

  const hoverOver = (id) => {
    if (typeof id !== "undefined" && id !== null && id !== "") {
      document.getElementById(id).style.boxShadow =
        "0px 8px 8px 0px rgb(154 161 171 / 28%)";
      document.getElementById(id).style.transform = "scale(1.01)";
    }
  };

  const hoverLeave = (id) => {
    if (typeof id !== "undefined" && id !== null && id !== "") {
      document.getElementById(id).style.boxShadow =
        "0px 8px 8px 0px rgb(154 161 171 / 15%)";
      document.getElementById(id).style.transform = "scale(1)";
    }
  };

  const getPost = (id) => {
    const onSuccess = (response) => {
      setPosts(response.data);
    };
    const onFailure = (response) => {
      console.log("error ", response);
    };

    getPosts(id, onSuccess, onFailure);
  };

  const getAlbum = (id) => {
    const onSuccess = (response) => {
      setAlbum(response.data);
    };
    const onFailure = (response) => {
      console.log("error ", response);
    };

    getAlbums(id, onSuccess, onFailure);
  };

  return (
    <>
      <h4 className="mt-2">Detail User</h4>
      <Row>
        <Col className="font-weight-bold">
          <p>Name</p>
        </Col>
        <Col>: {user[indexItem].name}</Col>
      </Row>
      <Row>
        <Col className="font-weight-bold">
          <p>Username</p>
        </Col>
        <Col>: {user[indexItem].username}</Col>
      </Row>
      <Row>
        <Col className="font-weight-bold">
          <p>Email</p>
        </Col>
        <Col>: {user[indexItem].email}</Col>
      </Row>
      <Row>
        <Col className="font-weight-bold">
          <p>Phone</p>
        </Col>
        <Col>: {user[indexItem].phone}</Col>
      </Row>
      <Row>
        <Col className="font-weight-bold">
          <p>Website</p>
        </Col>
        <Col>: {user[indexItem].website}</Col>
      </Row>

      <Row style={{ position: "relative", top: "10%" }}>
        <Col lg="6">
          <Card
            id={"user-album"}
            onMouseEnter={() => {
              hoverOver("user-album");
            }}
            onMouseLeave={() => {
              hoverLeave("user-album");
            }}
            onClick={() => {
              getAlbum(user[indexItem].id);
              toggleAlbum();
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
                <h4 className="text-center mt-2">
                  {user[indexItem].name}'s Album
                </h4>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6">
          <Card
            id={"user-posts"}
            onMouseEnter={() => {
              hoverOver("user-posts");
            }}
            onMouseLeave={() => {
              hoverLeave("user-posts");
            }}
            onClick={() => {
              getPost(user[indexItem].id);
              togglePost();
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
                <h4 className="text-center mt-2">
                  {user[indexItem].name}'s Posts
                </h4>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {viewAlbum && (
        <ViewAlbum modal={viewAlbum} toggle={toggleAlbum} data={album} />
      )}

      {viewPost && (
        <ViewPost modal={viewPost} toggle={togglePost} data={posts} />
      )}
    </>
  );
};

export default DetailUser;
