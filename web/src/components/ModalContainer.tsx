import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface ModalProps {
  opened: boolean;
  title: string;
  onHide: () => void;
  onClose: () => void;
}

export default function ModalContainer(props: any) {
  const { opened, title, onHide, onClose }: ModalProps = props;

  return (
    <Modal show={opened} onHide={onHide} backdrop="static" keyboard={true}>
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
