import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ModalSize } from '../domain/ModalSize';

interface ModalProps {
  size: ModalSize;
  opened: boolean;
  title: string;
  onHide: () => void;
  onClose: () => void;
}

export default function ModalContainer(props: any) {
  const { size = ModalSize.sm, opened, title, onHide, onClose }: ModalProps = props;

  return (
    <Modal size={size} show={opened} onHide={onHide} backdrop={true} keyboard={true}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
