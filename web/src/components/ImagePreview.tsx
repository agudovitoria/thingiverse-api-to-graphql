import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { createUseStyles } from 'react-jss';

import { ModalSize } from '../domain/ModalSize';
import ModalContainer from './ModalContainer';

const useStyles = createUseStyles({
  preview: {
    display: 'flex',
    padding: '8px 24px',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface ImagePreviewProps {
  title: string;
  thumbnail: string;
  opened: boolean;
  onHide: () => void;
  onClose: () => void;
}

export default function ImagePreview({
  title,
  thumbnail,
  opened,
  onHide,
  onClose,
}: ImagePreviewProps) {
  const styles = useStyles();

  return (
    <ModalContainer
      size={ModalSize.xl}
      title={title}
      opened={opened}
      onHide={onHide}
      onClose={onClose}
    >
      <Container fluid className={styles.preview}>
        <Image src={thumbnail} fluid />
      </Container>
    </ModalContainer>
  );
}
