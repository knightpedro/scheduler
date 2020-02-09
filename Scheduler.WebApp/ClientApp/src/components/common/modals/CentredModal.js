import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CentredModal = ({ title, content, handleSuccess, handleHide, ...props }) => {
    return (
        <Modal
            onHide={handleHide}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{content}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleHide}>Cancel</Button>
                <Button variant="primary" onClick={handleSuccess}>Yes</Button>
            </Modal.Footer>
            </Modal>
    );
}

export default CentredModal