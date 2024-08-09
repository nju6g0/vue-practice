import axios from "axios";
import { getToken } from "./common";
const API_URL = "https://todolist-api.hexschool.io/todos";

const getTodos = () => {
  return axios.get(API_URL, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken()
    }
  });
};
const addTodo = params => {
  return axios.post(API_URL, {...params}, {    
    headers: {
      'Content-Type': 'application/json',
      Authorization:  getToken()
    }
  });
};
const editTodo = ({id, content}) => {
  return axios.put(`${API_URL}/${id}`, {content}, {    
    headers: {
      'Content-Type': 'application/json',
      Authorization:  getToken()
    }
  });
};
const deleteTodo = id => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization:  getToken()
    }
  });
};
const toggleTodo = id => {
  return axios.patch(`${API_URL}/${id}/toggle`,{}, {
    headers: {
      'Content-Type': 'application/json',
      Authorization:  getToken()
    }
  });
};

const TodosService = {
  getTodos,
  addTodo,
  editTodo,
  deleteTodo,
  toggleTodo
};
export default TodosService;