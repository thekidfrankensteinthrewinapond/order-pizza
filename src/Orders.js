import React, { Component } from 'react';

class Orders extends Component {
  render() {
    let {orders} = this.props;

    return (
      <div>
        <h2>Orders</h2>
        <ol className="Orders-list">
          {orders.map(order => (
            <li id={order.id} key={order.id}>{order.value}</li>
          ))}
        </ol>
      </div>
    )
  }
}

export default Orders;
