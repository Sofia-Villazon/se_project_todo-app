import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import {
  initialTodos,
  validationConfig,
  addTodoButton,
  addTodoForm,
} from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const counter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  counter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    counter.updateCompleted(false);
  }
}

function updateTotal(complete) {
  if (complete) {
    counter.updateTotal(false);
  } else {
    counter.updateTotal(true);
  }
}

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const defaultTodo = new Section({
  items: initialTodos,
  renderer: (item) => {
    const newTodo = new Todo(
      item,
      "#todo-template",
      handleCheck,
      handleDelete,
      updateTotal
    );
    const todoElement = newTodo.getView();
    defaultTodo.addItem(todoElement);
  },
  container: ".todos__list",
});

defaultTodo.renderItems();

const addTodoPopup = new PopupWithForm(
  {
    popupSelector: "#add-todo-popup",
    handleFormSubmit: (inputValues) => {
      const id = uuidv4();
      const name = inputValues.name;
      const date = inputValues.date;

      const todoData = { name, date, id };

      const newTodo = new Todo(
        todoData,
        "#todo-template",
        handleCheck,
        handleDelete,
        updateTotal
      );
      const todoElement = newTodo.getView();
      defaultTodo.addItem(todoElement);

      newTodoValidator.resetValidation();
      updateTotal(false);
    },
  },
  updateTotal
);

addTodoPopup.setEventListeners();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
