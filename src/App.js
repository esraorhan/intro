import React, { Component } from "react";
import Navi from "./Navi";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";

export default class App extends Component {
  state = { currentCategory: "", products: [], card: [] };
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
  addToCart = (product) => {
    let newCard = this.state.card;
    var addedItem = newCard.find((c) => c.product.id === product.id);
    debugger;
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCard.push({ product: product, quantity: 1 });
    }

    this.setState({ card: newCard });
  };

  removeFromCart=(product) =>{
    let newCard =this.state.card.filter(c=>c.product.id !== product.id);
    this.setState({ card: newCard });
  }

  render() {
    let prouductInfo = { title: "Ürünler" };
    let categoryInfo = { title: "Kategorilerr" };

    return (
      <div className="App">
        <Container>
          <Navi removeFromCart={this.removeFromCart}  cart={this.state.card} />

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
                addToCart={this.addToCart}
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
