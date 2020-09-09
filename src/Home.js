import React, { Component, useState, useEffect } from "react";

import fire from "./config/fire";

//import Product from "./components/product";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import Post from "./components/Post";

const { Header, Content, Footer } = Layout;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">Home</Menu.Item>

            <Button
              danger
              style={{ float: "right", margin: "10px" }}
              onClick={this.logout}
            >
              Logout
            </Button>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">
            <Post/>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright © 2020 All rights reserved.Design and Developed By Sanchayan
          Das
        </Footer>
      </Layout>
    );
  }
}

export default Home;
