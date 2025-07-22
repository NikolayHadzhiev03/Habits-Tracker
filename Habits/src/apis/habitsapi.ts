import request from "../utils/request";

const  Habit_URL = "http://localhost:5000/api/data";


export const getAllHabits = () => {
    const  getAll = async () => {
        return await request.get(`${Habit_URL}/`)
    }
    return {
        getAll,
    }
}

export const createHabit = () => {
  const create = async (title: string, userId: string) => {
    const response = await request.post(`${Habit_URL}/`, {
      title,
      done: false,
      userId,
    });
    return response.data;
  };

  return {
     create ,
     
    };
};