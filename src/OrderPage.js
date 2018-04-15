import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { host } from './config';
import Orders from './Orders';
import OrderForm from './OrderForm';
import { PageCacheProvider } from 'react-renderhare';

export default class extends Component {
  onNewOrder = order => {
    this.setState({
      orders: this.state.orders.concat([order])
    });
  }

  fetchOrders = () => {
    return fetch(`${host}/api/orders`).then(r => r.json());
  }

  constructor() {
    super();
    this.state = {
      orders: []
    };
  }

  allOrders(fetchOrders) {
    return this.state.orders.length ? fetchOrders.concat(this.state.orders) : fetchOrders;
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Order Pizza</title>
          <meta name="description" content="Order your favorite pizza pie" />
        </Helmet>

        <PageCacheProvider
          cacheKey="orders"
          fetch={this.fetchOrders}
          render={(orders) => (
            <div>
              <Orders orders={this.allOrders(orders)} />

              <OrderForm onNewOrder={this.onNewOrder} />
            </div>
          )}
        />
      </div>
    );
  }
}
