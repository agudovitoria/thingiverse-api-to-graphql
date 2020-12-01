import React, { useState } from 'react';
import { Button, Col, Image, Row, Badge } from 'react-bootstrap';
import { createUseStyles } from 'react-jss';

import { ItemCreator } from '../domain/ItemCreator';
import ModalContainer from './ModalContainer';

const useStyles = createUseStyles({
  userData: {
    textAlign: 'right',
  },
});

export default function Profile({ creator }: { creator: ItemCreator }) {
  const styles = useStyles();
  const [opened, setOpened] = useState(false);
  const getFullName = () => {
    let fullName = creator.name;
    if (creator.first_name || creator.last_name) {
      const names = [creator.first_name, creator.last_name].join(' ');
      if (!!names) {
        fullName += `(${names})`;
      }
    }
    return fullName;
  };

  return (
    <>
      <Row>
        <Col xs={2}>
          <Image fluid roundedCircle src={creator.thumbnail} />
        </Col>
        <Col xs className={styles.userData}>
          <Button variant="link" onClick={() => setOpened(true)}>
            {getFullName()}
          </Button>
        </Col>
      </Row>
      <ModalContainer
        opened={opened}
        title="User Profile"
        onHide={() => {
          setOpened(false);
        }}
        onClose={() => {
          setOpened(false);
        }}
      >
        <Row>
          <Col xs={3}>
            <Image fluid roundedCircle src={creator.thumbnail} />
          </Col>
          <Col xs>
            <Row>
              <Col xs={4}>
                <Badge variant="warning">user name</Badge>
              </Col>
              <Col xs>{creator.name}</Col>
            </Row>
            <Row>
              <Col xs={4}>
                <Badge variant="warning">first name</Badge>
              </Col>
              <Col xs>{creator.first_name || '-'}</Col>
            </Row>
            <Row>
              <Col xs={4}>
                <Badge variant="warning">last name</Badge>
              </Col>
              <Col xs>{creator.last_name || '-'}</Col>
            </Row>
          </Col>
        </Row>
      </ModalContainer>
    </>
  );
}
