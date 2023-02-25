import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'

function VendorToast({ header, message}) {
const [visible, setVisible]=useState(true);

 const toggleShow = () => {
    setVisible(false)

 };

  return (
      <ToastContainer position="top-end" className="p-3">
        <Toast show={visible} onClose={toggleShow}>
          <Toast.Header>
            <FontAwesomeIcon icon={faUser} />
            <strong className="me-auto">&nbsp;{header}</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>

      </ToastContainer>

  );
}

export default VendorToast;