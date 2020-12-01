import React from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';
import { FaCheck, FaCommentAlt, FaEye, FaEyeSlash, FaRegThumbsUp, FaTimes } from 'react-icons/fa';
import { createUseStyles } from 'react-jss';
import Moment from 'react-moment';

import Tags from './Tags';
import { Item } from '../domain/Item';
import Modal from './ModalContainer';
import Profile from './Profile';

const ImagePreview = ({ src }: { src: string }) => <Image src={src} fluid />;
const ImagePreviewDialog = (name: string, src: string) => (
  <Modal title={name} body={<ImagePreview src={src} />} onClose={() => {}} />
);

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
});

export default function ItemCard({ item }: { item: Item }) {
  const styles = useStyles();

  const openImagePreview = (imageSrc: string) => {};

  return (
    <Card id={item.id}>
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Img variant="top" src={item.thumbnail} />
        <Row className={`box ${styles.properties}`}>
          <Col xs>
            <Card.Link href={item.url}>View online</Card.Link>
          </Col>
          <Col xs>
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
        <Row className={`box ${styles.statistics}`}>
          <Col xs>
            <Card.Text className={styles.icon}>
              {(item.is_private && <FaEye />) || <FaEyeSlash />}
            </Card.Text>
            <Card.Text className={styles.label}>Public</Card.Text>
          </Col>
          <Col xs>
            <Card.Text className={styles.icon}>
              {(item.is_purchased && <FaCheck />) || <FaTimes />}
            </Card.Text>
            <Card.Text className={styles.label}>Purchased</Card.Text>
          </Col>
          <Col xs>
            <Card.Text className={styles.icon}>
              {(item.is_published && <FaCheck />) || <FaTimes />}
            </Card.Text>
            <Card.Text className={styles.label}>Published</Card.Text>
          </Col>
          <Col xs>
            <Card.Text className={styles.icon}>
              <FaCommentAlt />
            </Card.Text>
            <Card.Text className={styles.label}>{item.comment_count}</Card.Text>
          </Col>
          <Col xs>
            <Card.Text className={styles.icon}>
              <FaRegThumbsUp />
            </Card.Text>
            <Card.Text className={styles.label}>{item.like_count}</Card.Text>
          </Col>
        </Row>
        {item?.tags?.length && (
          <Row className={`box ${styles.tags}`}>
            <Col xs>
              <Tags tags={item.tags} />
            </Col>
          </Row>
        )}
        {/* <Card.Img variant="top" src={item.preview_image} /> */}
        {/* <Card.Text>{item.creator}</Card.Text> */}
      </Card.Body>
    </Card>
  );
}
