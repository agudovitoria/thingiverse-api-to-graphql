import { useQuery } from '@apollo/client';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { PopularItems } from '../queries/PopularItems';
import Loading from '../components/Loading';
import Items from '../components/Items';
import ErrorMessage from '../components/ErrorMessage';
import { Col, Row, Container } from 'react-bootstrap';

const useStyles = createUseStyles({
  root: {
    margin: '8px',
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
      <div className={`box ${styles.root}`}>
        {loading && (
          <div>
            <Row>
              <Col>
                <Loading content="Loading data from Thingiverse" />
              </Col>
            </Row>
          </div>
        )}

        {error && (
          <div className="box">
            <Row>
              <Col>
                <ErrorMessage message="Error retrieving data from Thingiverse" />
              </Col>
            </Row>
          </div>
        )}

        {data?.popular && (
          <div className="box">
            <Items items={data?.popular} />
          </div>
        )}
      </div>
    </Container>
  );
}
