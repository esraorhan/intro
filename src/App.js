import React, { Component } from "react";
import Navi from "./Navi";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";

export default class App extends Component {
  state = { currentCategory: "" };
  changeCatgeory = (category) => {
    this.setState({ currentCategory: category.categoryName });
  };

  render() {
    let prouductInfo = { title: "Ürünler" };
    let categoryInfo = { title: "Kategorilerr" };

    return (
      <div className="App">
        <Container>
          <Row>
            <Navi />
          </Row>
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCatgeory={this.changeCatgeory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <ProductList info={prouductInfo} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
