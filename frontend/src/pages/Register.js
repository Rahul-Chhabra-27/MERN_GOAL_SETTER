import { useState,useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { register, reset } from "../features/auth/authSlice";

const initialState = { name: "", email: "", password: "", password2: "" };

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, message, user, isError } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if(isError) {
      toast.error(message);
    }
    if(isSuccess || user) {
      navigate('/');
    }
    dispatch(reset());

  },[message,isSuccess,isError,isLoading,user,navigate,dispatch]);
  const onStateChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if(password !== password2) {
      toast.error('Passwords do not match');
    }
    else {
      const userData = {
        name,
        password,
        email,
      }
      dispatch(register(userData));
    }
  };
  if (isLoading) {
    <Spinner />;
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
