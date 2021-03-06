import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/goalForm";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalItem from "../components/GoalItem";


const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals,isLoading,isError,message } = useSelector(state => state.goals);

  useEffect(() => {
    if(isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/register");
    }
    dispatch(getGoals());

    return () => dispatch(reset());

  }, [user, navigate,isError,dispatch,message]);

  if(isLoading) {
    <Spinner />
  }
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className="content">
        {goals.length ? (
          <div className="goals">
            {goals.map((goal) => <GoalItem key={goal._id} goal={goal} />)};
          </div>
        ): (<h3>You do not have goals</h3>)}
      </section>
    </>
  );
};
export default Dashboard;
