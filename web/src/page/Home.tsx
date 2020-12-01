import { useQuery } from '@apollo/client';
import React from 'react';
import { createUseStyles } from 'react-jss';
import Title from '../components/Title';
import { PopularItems } from '../queries/PopularItems';
import Loading from '../components/Loading';
import Items from '../components/Items';
import ErrorMessage from '../components/ErrorMessage';
import { Col, Row, Container } from 'react-bootstrap';

const useStyles = createUseStyles({
  titleContainer: {
    marginBottom: '8px',
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Home() {
  const styles = useStyles();
  const { loading, error, data } = useQuery(PopularItems);

  return (
    <Container fluid>
      <Container fluid className={`box ${styles.titleContainer}`}>
        <Row>
          <Col>
            <Title title="Home page" />
          </Col>
        </Row>
      </Container>
      <Container fluid className="box">
        <Row>
          {loading && (
            <Col className={styles.loadingContainer} xs>
              <Loading content="Loading data from Thingiverse" />
            </Col>
          )}

          {error && (
            <Col>
              <ErrorMessage message="Error retrieving data from Thingiverse" />
            </Col>
          )}
        </Row>
        {data?.popular && <Items items={data?.popular} />}
      </Container>
    </Container>
  );
}
