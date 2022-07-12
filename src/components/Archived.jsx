import styles from "../styles/notes.module.css";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import axios from "axios";
import NoteTemplate from "./NoteTemplate";

const Archived = () => {
  const { upload, setUpload } = useContext(UserContext);

  useEffect(() => {
    const axiosData = async () => {
      const URI = "https://notes-ensolvers.herokuapp.com/archived";
      const res = await axios.get(URI);
      setData(res.data);
      setUpload(false);
    };
    axiosData();
  }, [upload]);

  const [data, setData] = useState([]);

  return (
    <>
      <div className={`${styles["body"]}`}>
        <div className="row pb-5">
          <div className="col-7 col-md-8 col-lg-10">
            <h2 className={`${styles.title}`}>Archived Notes</h2>
          </div>
        </div>

        <NoteTemplate data={data} />
      </div>
    </>
  );
};

export default Archived;
