import React, { Component } from "react";
import Navi from "./Navi";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";

export default class App extends Component {
  state = { currentCategory: "", products: [] };
  componentDidMount() {
    this.getProudcts();
  }
  changeCatgeory = (category) => {
    this.setState({ currentCategory: category.categoryName });
   // console.log(category);
    this.getProudcts(category.id);
  };
 
  getProudcts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
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
              <ProductList
                products={this.state.products}
                currentCategory={this.state.currentCategory}
                info={prouductInfo}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
