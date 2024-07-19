import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

export default class CategoryList extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => this.setState({ categories: data }));
  };

  render() {
    return (
      <div>
        <h2>{this.props.info.title}</h2>

        <ListGroup>
          {this.state.categories.map((c) => (
            <ListGroupItem
              active={
                c.categoryName === this.props.currentCategory ? true : false
              }
              onClick={() => this.props.changeCatgeory(c)}
              key={c.categoryId}
            >
              {c.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}
