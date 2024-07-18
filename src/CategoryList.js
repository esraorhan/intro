import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

export default class CategoryList extends Component {
  state = {
    categories: [
      { categoryId: 1, categoryName: "Beverages" },
      { categoryId: 2, categoryName: "Condiments" },
      { categoryId: 3, categoryName: "Coffee" },
    ]
  };

 
  render() {
    return (
      <div>
        <h2>{this.props.info.title}</h2>

        <ListGroup>
          {this.state.categories.map((c) => (
            <ListGroupItem
              onClick={() => this.props.changeCatgeory(c)}
              key={c.categoryId}
            >
              {c.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
        <h4>{this.props.currentCategory}</h4>
      </div>
    );
  }
}
