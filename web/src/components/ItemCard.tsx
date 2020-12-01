import React, { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { createUseStyles } from 'react-jss';
import Moment from 'react-moment';

import { Item } from '../domain/Item';
import ImagePreview from './ImagePreview';
import ItemStatistics from './ItemStatistics';
import Profile from './Profile';
import Tags from './Tags';

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
});

export default function ItemCard({ item }: { item: Item }) {
  const styles = useStyles();
  const [opened, setOpened] = useState(false);
  const onImagePreviewHide = () => setOpened(false);
  const onImagePreviewClose = () => setOpened(false);

  return (
    <>
      <Card id={item.id} className="shadow">
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Img variant="top" src={item.preview_image} />

          <Row className={`box ${styles.properties}`}>
            <Col>
              <Button variant="link" onClick={() => setOpened(true)}>
                View
              </Button>
            </Col>
            <Col xs={9}>
              <Card.Text className={styles.dateTime}>
                Created <Moment format="YY/MM/DD HH:mm">{item.created_at}</Moment>
              </Card.Text>
            </Col>
          </Row>

          <Row>
            <Col xs className="box">
              <Profile creator={item.creator} />
            </Col>
          </Row>

          <ItemStatistics item={item} />

          {item?.tags?.length > 0 && (
            <Row className="box">
              <Col xs>
                <Tags tags={item.tags} />
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>
      <ImagePreview
        title={`${item.name} by ${item.creator.name}`}
        thumbnail={item.thumbnail}
        opened={opened}
        onHide={() => onImagePreviewHide()}
        onClose={() => onImagePreviewClose()}
      />
    </>
  );
}
