import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import styled from 'styled-components';
import gql from 'graphql-tag';
import formatMoney from '../lib/formatMoney';
import OrderItemStyles from './styles/OrderItemStyles';
import Order from './Order';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      createdAt
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`;

const OrderUL = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(autofit, minmax(40%, 1fr));
`;

class OrderList extends Component {
  render() {
    return (
      <Query query={USER_ORDERS_QUERY}>
        {({ data: { orders }, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Error error={error} />;
          return (
            <div>
              <h2>You have {orders.length} orders!</h2>
              <OrderUL>
                {orders.map(order => (
                  <OrderItemStyles key={order.id}>
                    <Link
                      href={{
                        pathname: '/order',
                        query: { id: order.id },
                      }}
                    >
                      <a>
                        <div className="roder-meta">
                          <p>
                            {order.items.reduce((a, b) => a + b.quantity, 0)}{' '}
                            Items
                          </p>
                          <p>{order.items.length} Products</p>
                          <p>{formatDistance(order.createdAt, new Date())}</p>
                          <p>{formatMoney(order.total)}</p>
                          <div className="images">
                            {order.items.map(item => (
                              <img
                                src={item.image}
                                alt={item.title}
                                key={item.id}
                              />
                            ))}
                          </div>
                        </div>
                      </a>
                    </Link>
                  </OrderItemStyles>
                ))}
              </OrderUL>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default OrderList;
