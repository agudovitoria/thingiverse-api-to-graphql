import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ItemCard from './ItemCard';
import { Item } from '../domain/Item';

export default function Items({ items }: { items: Item[] }) {
  return (
    <Row>
      {items.map((item: Item) => (
        <Col xs={3} key={item.id}>
          <ItemCard item={item} />
        </Col>
      ))}
    </Row>
  );
}
