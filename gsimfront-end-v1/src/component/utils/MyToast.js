import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

function MyToast({ header, message, setShow, url}) {

const navigate = useNavigate();
const [visible, setVisible]=useState(true);

 const toggleShow = () => {
    setVisible(false);
    setShow(false);
    if(url!=null)
    {
        navigate(url);
    }

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

export default MyToast;