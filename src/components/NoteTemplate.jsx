import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faFolderPlus,
  faFolderMinus,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import styles from "../styles/noteTemplate.module.css";
import { UserContext } from "../context/UserProvider";
import DeleteNote from "./DeleteNote";
import UpdateNote from "./UpdateNote";
import axios from "axios";
import { useState, useContext } from "react";

const NoteTemplate = ({ data }) => {
  const [id, setId] = useState(0);
  const { setUpload } = useContext(UserContext);

  const handleArchive = async (idNote, title, content, archived) => {
    try {
      const user = {
        title,
        content,
        archived: archived === 0 ? 1 : 0,
      };
      await axios.put(
        `https://notes-ensolvers.herokuapp.com/update/${idNote}`,
        user
      );
      setUpload(true);
    } catch (error) {
      console.log(error);
    }
    setId(idNote);
  };

  return (
    <>
      <div className="row">
        {data.map((note) => (
          <div className="col-12 col-md-6 col-lg-4" key={note.ID_note}>
            <div className="card text-white bg-dark mb-3">
              <div className={`card-header ${styles.card}`}>
                &#60;Note /&#62;
                <FontAwesomeIcon
                  icon={faXmark}
                  className={`${styles.xmark}`}
                  onClick={() => setId(note.ID_note)}
                  data-bs-toggle={`modal`}
                  data-bs-target="#exampleModal"
                />
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className={`${styles.edit}`}
                  onClick={() => setId(note.ID_note)}
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop2"
                />
                <FontAwesomeIcon
                  icon={note.archived === 0 ? faFolderPlus : faFolderMinus}
                  className={`${styles.archived}`}
                  onClick={() =>
                    handleArchive(
                      note.ID_note,
                      note.title,
                      note.content,
                      note.archived
                    )
                  }
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* {activeDelete && <DeleteNote id={id} />} */}
      <DeleteNote id={id} />
      <UpdateNote id={id} />
    </>
  );
};

export default NoteTemplate;
