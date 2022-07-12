import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "../context/UserProvider";
import { useContext } from "react";

const DeleteNote = ({ id }) => {
  const { setUpload } = useContext(UserContext);
  const handleDeleteNote = async () => {
    try {
      await axios.delete(`https://notes-ensolvers.herokuapp.com/remove/${id}`);
      setUpload(true);
    } catch (error) {
      toast.error(`${error}`, {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: false,
        theme: "colored",
        autoClose: 3000,
      });
    }
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      data-bs-backdrop="static"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title" id="exampleModalLabel">
              Delete note
            </h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete this note?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              No
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss={"modal"}
              onClick={handleDeleteNote}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DeleteNote;
