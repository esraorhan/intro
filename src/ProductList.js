import React, { Component } from "react";
import { Table } from "reactstrap";
export default class ProductList extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.info.title}-  {this.props.currentCategory}</h2>

        <Table bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Ürün adı</th>
              <th>Birim fiyat</th>
              <th>Miktar</th>
              <th>Stok</th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((p) => (
              <tr>
                <th key={p.id} scope="row">
                  {p.id}
                </th>
                <td>{p.productName}</td>
                <td>{p.unitPrice}</td>
                <td>{p.quantityPerUnit}</td>
                <td>{p.unitsInStock}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
