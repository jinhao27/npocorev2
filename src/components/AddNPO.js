import React, { useState } from 'react';

// COMPONENTS
import Modal from "react-bootstrap/Modal";

function AddNPO() {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={showModal}>Add NPO</button>

      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>Hi</Modal.Header>
        <Modal.Body>asdfasdf</Modal.Body>
        <Modal.Footer>This is the footer</Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddNPO;
