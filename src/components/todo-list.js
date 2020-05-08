import React from "react";
import TodoListItem from "./todo-list-item";
import "./todo-list.css";

const TodoList = ({ todos }) => {
    const elements = todos.map((el) => {
        const { id, ...elProps } = el;
        return (
            <li key={id} className="list-group-item">
                <TodoListItem {...elProps} />
            </li>
        );
    });

    return <ul className="list-group todo-list">{elements}</ul>;
};

export default TodoList;
