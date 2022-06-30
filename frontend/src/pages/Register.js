import { useState } from "react";
import { FaUser } from "react-icons/fa";
const initialState = { name: "", email: "", password: "", password2: "" };

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, password2 } = formData;

  const onStateChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]:e.target.value
    }))
  };

  const onSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <>
      <section>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please register yourself</p>
      </section>
      <section>
        <form onSubmit={onSubmit} className="form">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              id="name"
              name="name"
              value={name}
              onChange={onStateChange}
            />
          </div>
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
            <input
              type="password"
              className="form-control"
              placeholder="Enter password again"
              id="password2"
              name="password2"
              value={password2}
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
export default Register;
