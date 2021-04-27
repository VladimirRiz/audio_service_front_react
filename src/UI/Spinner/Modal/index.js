import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function ModalWindow(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {props.text}
      </Button>

      <Modal show={show} onHide={handleClose}>
        {props.children}
      </Modal>
    </>
  );
}

export default ModalWindow;
