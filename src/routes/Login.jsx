import styles from "../styles/login.module.css";
import "../styles/style.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { formValidate } from "../utils/formValidate";
import FormError from "../components/FormError";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const URI = "https://notes-ensolvers.herokuapp.com/users/login";
  const { required } = formValidate();
  const { online, setOnline } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    provideAccess();
  }, [online]);

  const onSubmit = async (data) => {
    try {
      const res = await axios({
        method: "post",
        url: URI,
        data,
        withCredentials: true,
      });

      setOnline(res.data.results.isOnline);
    } catch (error) {
      toast.error(`${error.response.data}`, {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: false,
        theme: "colored",
        autoClose: 3000,
      });
    }
  };

  const provideAccess = () => {
    if (online) {
      navigate("/dashboard");
      console.log("usuario online");
    } else {
      console.log("usuario offline");
    }
  };

  return (
    <>
      <div className="row g-0">
        <div className="col-lg-7 d-none d-lg-block">
          <div
            id="carouselExampleDark"
            className="carousel carousel-dark slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div
                className="carousel-item img-1 min-vh-100 active"
                data-bs-interval="3000"
              >
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="fw-bold">Descubre algo sorprendete</h5>
                </div>
              </div>
              <div
                className="carousel-item img-2 min-vh-100"
                data-bs-interval="3000"
              >
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="font-weight-bold">
                    Descubre algo sorprendete
                  </h5>
                </div>
              </div>
              <div
                className="carousel-item img-3 min-vh-100"
                data-bs-interval="3000"
              >
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="font-weight-bold">
                    Descubre algo sorprendete
                  </h5>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className="col-lg-5 d-flex flex-column align-items-end min-vh-100">
          <div className="px-lg-5 pt-lg-4 pb-lg-3 p-2  w-100 ">
            <FontAwesomeIcon
              icon={faBookOpen}
              className={`${styles["icon-logo"]}`}
            />
          </div>

          <div className="px-lg-5 py-lg-4 p-sm-4 p-2  w-100 align-self-center">
            <h1 className="font-weight-bold py-5 pt-sm-5  text-dark">
              Welcome back!
            </h1>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="exampleInputEmail1" className={styles.text}>
                Email
              </label>

              <div className={styles["input-box"]}>
                <input
                  className={styles.input}
                  type="text"
                  id="exampleInputEmail1"
                  placeholder="Enter your email"
                  name="email"
                  {...register("email", {
                    required,
                  })}
                />
              </div>
              {errors.email && <FormError error={errors.email} />}
              <label htmlFor="exampleInputEmail2" className={styles.text}>
                Password
              </label>
              <div className={styles["input-box"]}>
                <input
                  className={styles.input}
                  type="password"
                  id="exampleInputEmail2"
                  placeholder="Enter your password"
                  name="password"
                  {...register("password", {
                    required,
                  })}
                />
              </div>
              {errors.password && <FormError error={errors.password} />}

              <div className={styles["input-box"]}>
                <button className={styles.button}>Sign In</button>
              </div>
            </form>
          </div>

          <div className="text-center px-lg-5 pt-lg-4  pb-lg-4 p-sm-4 p-3  w-100 ">
            <p className={`d-inline-block mb-0 ${styles.link}`}>
              Not a member?
            </p>
            <Link to="/register" className={styles["text-a"]}>
              {" "}
              Register now
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
