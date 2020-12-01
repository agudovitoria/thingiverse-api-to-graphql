import React from 'react';
import { createUseStyles } from 'react-jss';
import { Col, Row, Spinner, Container } from 'react-bootstrap';
import { LoadingProps } from '../domain/LoadingProps';

const useStyles = createUseStyles({
  root: {
    height: '100%',
    display: 'flex',
    padding: '8px 24px',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Loading({ content }: LoadingProps) {
  const styles = useStyles();

  return (
    <Container className={styles.root}>
      <Row>
        <Spinner animation="border" variant="primary" />
        <Col xs>
          <span>{content}</span>
        </Col>
      </Row>
    </Container>
  );
}
