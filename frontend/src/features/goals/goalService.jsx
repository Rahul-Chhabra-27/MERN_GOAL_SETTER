import axios from "axios";

const API_URL = '/api/goals/';
const addGoal = async(goal,token) => {
    const config = {
        headers : {
            Authorization:`Bearer ${token}`,
        }
    }
    const response = await axios.post(API_URL,goal,config);
    return response.data;
}
const getAll = async(token) => {
     const config = {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     };
     const response = await axios.get(API_URL, config);
     return response.data;
}
const deleteGoal = async(token,id) => {
 const config = {
   headers: {
     Authorization: `Bearer ${token}`,
   },
 };
 const response = await axios.delete(API_URL+id, config);
 return response.data;
}
export const goalService = {
    addGoal,
    getAll,
    deleteGoal
}