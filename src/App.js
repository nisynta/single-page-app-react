import "./App.css";
import { Card, CardBody, Col, Media, Row } from "reactstrap";
import { getUsers } from "./api/api";
import React, { useEffect, useState } from "react";
import DetailUser from "./components/DetailUser";
import { CircularProgress } from "@mui/material";

const App = () => {
  const [listUser, setListUser] = useState([]);
  const [indexItem, setIndexItem] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    setLoading(true);
    const onSuccess = (response) => {
      setLoading(false);
      setListUser(response.data);
    };

    const onFailure = (response) => {
      setLoading(false);
      console.log("error", response);
    };

    getUsers(onSuccess, onFailure);
  };

  return (
    <React.Fragment>
      <div style={{ margin: "10px" }}>
        <Row>
          <Col lg="4">
            <h4 className="mt-2">Users</h4>
            {listUser.length !== 0 && !loading ? (
              listUser.map((user, index) => {
                return (
                  <>
                    <Media
                      className="text-body"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        setSelectedItem(e);
                        setIndexItem(index);
                      }}
                    >
                      <Card
                        className="mt-2 p-1 mr-3"
                        style={{ position: "relative" }}
                      >
                        <CardBody>
                          <h5>{user.name}</h5>
                          <p>{user.username}</p>
                          <span>
                            {user.email} - {user.phone}
                          </span>
                        </CardBody>
                      </Card>
                    </Media>
                  </>
                );
              })
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "150px",
                }}
              >
                <CircularProgress />
              </div>
            )}
          </Col>
          <Col lg="8">
            {selectedItem ? (
              <DetailUser user={listUser} indexItem={indexItem} />
            ) : (
              <h5
                style={{
                  backgroundColor: "#edebe4",
                  textAlign: "center",
                  padding: "10px 0px",
                  borderRadius: "10px 10px",
                  width: "40%",
                  margin: "auto",
                  color: "dimgrey",
                  position: "relative",
                  top: "20%",
                }}
              >
                No user selected
              </h5>
            )}
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default App;
