import styles from "../styles/notes.module.css";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import NoteTemplate from "./NoteTemplate";
import AddNote from "./AddNote";

const Notes = () => {
  const { upload, setUpload } = useContext(UserContext);

  useEffect(() => {
    const axiosData = async () => {
      const URI = "https://notes-ensolvers.herokuapp.com/";
      const res = await axios.get(URI);
      setData(res.data);
      setUpload(false);
    };
    axiosData();
  }, [upload]);
  const [data, setData] = useState([]);

  return (
    <div className={`${styles["body"]}`}>
      <div className="row pb-5">
        <div className="col-7 col-md-8 col-lg-10">
          <h2 className={`${styles.title}`}>Notes</h2>
        </div>
        <div className="col-5 col-md-4 col-lg-2 position-relative ">
          <button
            className="btn btn-success me-3 w-50 position-absolute top-0 end-0"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            <span>Add </span>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
      <NoteTemplate data={data} />

      <AddNote />
    </div>
  );
};

export default Notes;
