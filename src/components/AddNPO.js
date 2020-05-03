import React, { useState } from 'react';

// COMPONENTS
import Modal from "react-bootstrap/Modal";

function AddNPO() {
  const [isOpen, setIsOpen] = useState(false); // MODAL VARIABLES

  // FORM VARIABLES
  const [orgName, setOrgName] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [orgDescription, setOrgDescription] = useState("");

  // MODAL FUNCTIONS
  const showModal = () => { setIsOpen(true); };
  const hideModal = () => { setIsOpen(false); };

  // FORM FUNCTIONS
  const onOrgNameChange = (event) => { setOrgName(event.target.value); }
  const onOrgEmailChange = (event) => { setOrgEmail(event.target.value); }
  const onOrgDescriptionChange = (event) => { setOrgDescription(event.target.value); }

  const addNPO = (event) => {
    event.preventDefault();

    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={showModal}>Add NPO</button>

      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>Hi</Modal.Header>
        <form onSubmit={addNPO}>
          <Modal.Body>
            <input type="text" placeholder="Organization Name" onChange={onOrgNameChange} required />
            <input type="email" placeholder="Organization Email" onChange={onOrgEmailChange} required />
            <textarea row="5" placeholder="Organization Description" onChange={onOrgDescriptionChange} required />
          </Modal.Body>
          <Modal.Footer>
            <input type="submit" value="Submit"/>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  )
}

export default AddNPO;
