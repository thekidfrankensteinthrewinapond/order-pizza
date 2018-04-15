import React, { Component } from 'react';
import { host } from './config';
import './Order.css';

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 'Cheese pizza' };
  }

  handleSubmit = ev => {
    ev.preventDefault();
    fetch(`${host}/api/orders`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => res.json()).then(order => {
      this.props.onNewOrder(order);
      this.setState({ value: '' })
    });
  }

  handleChange = ev => {
    this.setState({value: ev.target.value});
  }

  render() {
    return (
      <section className="Order-form---section">
        <h2>New Order</h2>

        <form action="/api/orders" method="POST" className="Order-form" onSubmit={this.handleSubmit}>
          <fieldset>
            <input type="text" value={this.state.value} onChange={this.handleChange}/>
          </fieldset>
          <button type="submit" className="primary">Place order</button>
        </form>
      </section>
    );
  }
}

export default OrderForm;
