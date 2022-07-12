import styles from "../styles/register.module.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { formValidate } from "../utils/formValidate";
import FormError from "../components/FormError";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const URI = "https://notes-ensolvers.herokuapp.com/users/create";
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const {
    required,
    patternEmail,
    minLength,
    validateTrim,
    validateEquals,
    patternPassword,
  } = formValidate();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await axios.post(URI, data);
      toast.success(`The account has been successfully created`, {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: false,
        theme: "colored",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(`${error.response.data}`, {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: false,
        theme: "colored",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.wrapper}>
        <h2 className={styles["titulo-h2"]}>Register Account</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["input-box"]}>
            <input
              className={styles.input}
              type="text"
              placeholder="Email"
              name="email"
              {...register("email", {
                required,
                pattern: patternEmail,
              })}
            />
          </div>
          {errors.correo && <FormError error={errors.correo} />}
          <div className={styles["input-box"]}>
            <input
              className={styles.input}
              type="password"
              placeholder="Paswword"
              name="password"
              {...register("password", {
                minLength,
                validate: validateTrim,
                pattern: patternPassword,
              })}
            />
          </div>
          {errors.password && <FormError error={errors.password} />}

          <div className={styles["input-box"]}>
            <input
              className={styles.input}
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              {...register("confirmPassword", {
                validate: validateEquals(getValues),
              })}
            />
          </div>
          {errors.confirmPassword && (
            <FormError error={errors.confirmPassword} />
          )}

          <div className={styles["input-box"]}>
            <button className={styles.button}>Register</button>
          </div>
        </form>
        <p className="d-inline-block mb-0 ">Do you already have an account?</p>
        <Link to="/" className={styles["text-a"]}>
          {" "}
          Sign In
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
