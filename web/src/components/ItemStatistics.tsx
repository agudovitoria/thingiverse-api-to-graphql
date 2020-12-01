import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FaCheck, FaCommentAlt, FaEye, FaEyeSlash, FaRegThumbsUp, FaTimes } from 'react-icons/fa';
import { createUseStyles } from 'react-jss';
import { Item } from '../domain/Item';

const useStyles = createUseStyles({
  dateTime: {
    textAlign: 'right',
  },
  properties: {
    marginTop: '8px',
    marginBottom: '8px',
  },
  icon: {
    textAlign: 'center',
  },
  label: {
    textAlign: 'center',
  },
  statistics: {
    marginTop: '8px',
    marginBottom: '8px',
  },
  tags: {},
  preview: {
    height: '100%',
    display: 'flex',
    padding: '8px 24px',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function ItemStatistics({
  item: { is_private, is_purchased, is_published, comment_count, like_count },
}: {
  item: Item;
}) {
  const styles = useStyles();

  return (
    <Row className={`box ${styles.statistics}`}>
      <Col xs>
        <Card.Text className={styles.icon}>{(is_private && <FaEye />) || <FaEyeSlash />}</Card.Text>
        <Card.Text className={styles.label}>Public</Card.Text>
      </Col>
      <Col xs>
        <Card.Text className={styles.icon}>
          {(is_purchased && <FaCheck />) || <FaTimes />}
        </Card.Text>
        <Card.Text className={styles.label}>Purchased</Card.Text>
      </Col>
      <Col xs>
        <Card.Text className={styles.icon}>
          {(is_published && <FaCheck />) || <FaTimes />}
        </Card.Text>
        <Card.Text className={styles.label}>Published</Card.Text>
      </Col>
      <Col xs>
        <Card.Text className={styles.icon}>
          <FaCommentAlt />
        </Card.Text>
        <Card.Text className={styles.label}>{comment_count}</Card.Text>
      </Col>
      <Col xs>
        <Card.Text className={styles.icon}>
          <FaRegThumbsUp />
        </Card.Text>
        <Card.Text className={styles.label}>{like_count}</Card.Text>
      </Col>
    </Row>
  );
}
