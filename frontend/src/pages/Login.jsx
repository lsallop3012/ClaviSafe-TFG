import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./styles/Login.module.css";
import { LOGIN_ENDPOINT } from '../../endpoints.js';

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/contactos");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);


    const { name, password } = data;

    try {
      const loginResult = await fetch(`${LOGIN_ENDPOINT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      if (!loginResult.ok) throw new Error("Username or password incorrect");

      const responseData = await loginResult.json();
      console.log("Login success:", responseData);

      localStorage.setItem("token", responseData.token);
      navigate("/home");

      window.location.reload();
    } catch (err) {

      if (err.message === "Failed to fetch") {
        setError("Network error: connection failed. Please check your internet connection and try again.");
      } else {
        setError(err.message);
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.header}>Log In</h1>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.input}
          type="text"
          placeholder="Username"

          {...register("name", { required: true })}
        />
        {errors.name && <p className={styles.error}>Username is required</p>}
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}

        />
        {errors.password && <p className={styles.error}>Password is required</p>}
        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.boton} type="submit" disabled={loading}>
          {loading ? "Loading..." : "Log In"}
        </button>
      </form>

      <form>
        <button
          type="button"
          className={styles.boton}
          disabled={loading}
          onClick={() => navigate("/forgot-password")}
        >
          ¿Forgot your password?
        </button>
      </form>
    </main>
  );
}

export default Login;
