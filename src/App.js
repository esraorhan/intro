import React, { Component } from "react";
import Navi from "./Navi";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";
import alertify from "alertifyjs";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";

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

    alertify.success(product.productName + " sepete eklendi.", 2);
  };

  removeFromCart = (product) => {
    let newCard = this.state.card.filter((c) => c.product.id !== product.id);
    this.setState({ card: newCard });

    alertify.warning(product.productName + " sepetten kaldırıldı.", 2);
  };

  render() {
    let prouductInfo = { title: "Ürünler" };
    let categoryInfo = { title: "Kategorilerr" };

    return (
      <div className="App">
        <Container>
          <Navi removeFromCart={this.removeFromCart} cart={this.state.card} />

          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCatgeory={this.changeCatgeory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
            {/* son sürümlerdeki Route kullanımı bu şekilde imiş. */}
              <Routes> 
                <Route
                  exact
                  path="/"
                  element={
                    <ProductList
                      products={this.state.products}
                      addToCart={this.addToCart}
                      currentCategory={this.state.currentCategory}
                      info={prouductInfo}
                    />
                  }
                />
                <Route
                  exact
                  path="/cart"
                  element={
                    <CartList
                     
                      cart={this.state.card}
                      removeFromCart={this.removeFromCart}
                    />
                  }
                />
                <Route path="*" Component={NotFound} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
