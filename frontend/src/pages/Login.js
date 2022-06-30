import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
const initialState = { email: "", password: "" };

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const onStateChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = () => {};
  return (
    <>
      <section>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login</p>
      </section>
      <section>
        <form onSubmit={onSubmit} className="form">
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              id="email"
              name="email"
              value={email}
              onChange={onStateChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              id="password"
              name="password"
              value={password}
              onChange={onStateChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
export default Login;
