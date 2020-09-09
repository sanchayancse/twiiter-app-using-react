import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import fire from "../config/fire";
import Moment from "moment";
import "../Home.css";

import {  Card, Avatar, Row, Col } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  RetweetOutlined,
  
} from "@ant-design/icons";

const { Meta } = Card;

const Post = () => {
  const getMode = () => {
    return JSON.parse(localStorage.getItem("mode")) || false;
  };

  const [dark, setMode] = useState(getMode);
  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(dark));
  }, [dark]);

  var [productObjects, setProductObjects] = useState({});
  var [currentId, setCurrentId] = useState("");

  useEffect(() => {
    fire
      .database()
      .ref()
      .child("messages")
      .on("value", (snapshot) => {
        if (snapshot.val() != null) {
          setProductObjects({
            ...snapshot.val(),
          });
        } else setProductObjects({});
      });
  }, []);
  const addOrEdit = (obj) => {
    if (currentId == "")
      fire
        .database()
        .ref()
        .child("messages")
        .push(obj, (err) => {
          if (err) console.log(err);
          else setCurrentId("");
        });
    else
      fire
        .database()
        .ref()
        .child(`messages/${currentId}`)
        .set(obj, (err) => {
          if (err) console.log(err);
          else setCurrentId("");
        });
  };

  const onDelete = (key) => {
    if (window.confirm("Are You sure to delete this record?")) {
      fire
        .database()
        .ref()
        .child(`messages/${key}`)
        .remove((err) => {
          if (err) console.log(err);
          else setCurrentId("");
        });
    }
  };

  window.onload = function deleteDta() {
    const timeNow = Moment(new Date().toDateString()).format("YYYY-MM-DD");
    console.log(timeNow);
    const messagesRef = fire.database().ref().child("messages");
    messagesRef.once("value", (snapshot) => {
      snapshot.forEach((child) => {
        if (Moment(child.val()["deleteDate"]).format("YYYY-MM-DD") <= timeNow) {
          // child.ref.set(null);
          console.log("this is " + child.val()["deleteDate"]);
          child.ref.remove();
        }
      });
    });

    setTimeout(deleteDta, 20000);
  };

 
  return (
    <>
      <div className={dark ? "dark-mode" : "white-mode"}>
        <div className="jumbotron jumbotron-fluid">
          <div className="container" align="center">
            <label class="switch">
              <input
                type="checkbox"
                checked={dark}
                onChange={() => setMode(!dark)}
              />
              <span class="slider round"></span>
            </label>
            <h1 className="display" align="center">
              Welcome To dashboard
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <PostForm {...{ addOrEdit, currentId, productObjects }} />
          </div>
        </div>

        <Row>
          <Col span={12} offset={8}>
            {Object.keys(productObjects).map((id) => {
              return (
                <tr key={id}>
                  <Card
                    style={{ width: 400 }}
                    actions={[
                      
                      <RetweetOutlined key="retweet" />,
                      <EditOutlined
                        key="edit"
                        onClick={() => {
                          setCurrentId(id);
                        }}
                      />,
                      <DeleteOutlined
                        key="delete"
                        className="delbtn"
                        onClick={() => {
                          onDelete(id);
                        }}
                      />,
                    ]}
                  >
                    <Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={productObjects[id].tweetName}
                      description={productObjects[id].tweetDesc}
                    />
                  </Card>
                  <br></br>
                </tr>
              );
            })}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Post;
