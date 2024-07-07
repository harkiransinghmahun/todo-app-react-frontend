import { apiClient } from "./ApiClient";

const retreiveAllTodosForUser = (username) => apiClient.get(`/users/${username}/todos`);

const deleteTodoForUser = (username, id) => apiClient.delete(`/users/${username}/todos/${id}`);

const retrieveTodoForUser = (username, id) => apiClient.get(`/users/${username}/todos/${id}`);

const updateTodoForUser = (username, id, todo) => apiClient.put(`/users/${username}/todos/${id}`, todo);

const createTodoForUser = (username, todo) => apiClient.post(`/users/${username}/todos`, todo);


export {retreiveAllTodosForUser, deleteTodoForUser, retrieveTodoForUser, updateTodoForUser, createTodoForUser}