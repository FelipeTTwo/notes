import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "../context/UserProvider";
import { useState, useContext } from "react";

const AddNote = () => {
  const initialState = {
    title: "",
    content: "",
  };

  const [note, setNote] = useState(initialState);
  const { setUpload } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { title, content } = note;
      if (!title.trim() || !content.trim()) {
        toast.warning(`Fill all fields`, {
          position: toast.POSITION.TOP_RIGHT,
          closeOnClick: false,
          theme: "colored",
          autoClose: 3000,
        });
        return;
      } else {
        await axios.post("https://notes-ensolvers.herokuapp.com/create", note);
        setUpload(true);
        setNote(initialState);
        toast.success(`Note created successful`, {
          position: toast.POSITION.TOP_RIGHT,
          closeOnClick: false,
          theme: "colored",
          autoClose: 3000,
        });
      }
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
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title" id="staticBackdropLabel">
              Add note
            </h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={note.title}
                  onChange={handleChange}
                  id="exampleFormControlInput1"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Content
                </label>
                <textarea
                  className="form-control"
                  name="content"
                  value={note.content}
                  onChange={handleChange}
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className={`btn btn-primary w-50`}>
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddNote;
