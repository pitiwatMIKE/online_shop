import { Modal } from "react-bootstrap";

export default function ConfirmDelete(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="confirm-delete">
          <i className="bi bi-exclamation-triangle"></i>
          <h2>Do you want to delete it?</h2>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="btn-confirm-delete">
          <button
            className="button-primary"
            onClick={() => {
              props.deleteHandle(props.deleteId);
              props.onHide();
            }}
          >
            Delete
          </button>
          <button className="button-secondary" onClick={props.onHide}>
            Close
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
