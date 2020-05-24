import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";
import "./app.css";

export default class App extends Component {
    id = 100;

    state = {
        todoData: [
            this.createTodoItem("Drink Cofee"),
            this.createTodoItem("Build React App"),
            this.createTodoItem("Have a Lunch"),
        ],
        searchData: "",
        filter: "all", //active, all, done
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.id++,
        };
    }

    deleteItem = (id) => {
        console.log("Deleted Item", id);
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newData = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1),
            ];

            return { todoData: newData };
        });
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({ todoData }) => {
            const newData = [...todoData, newItem];
            return { todoData: newData };
        });
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] };
        return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
    }

    onToggleImortant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, "important"),
            };
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, "done"),
            };
        });
    };

    onSearchChange = (searchData) => {
        this.setState({ searchData });
    };

    onFilterChange = (filter) => {
        this.setState({ filter });
    };

    search(items, searchData) {
        if (searchData.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return (
                item.label.toLowerCase().indexOf(searchData.toLowerCase()) > -1
            );
        });
    }

    filter(items, filter) {
        switch (filter) {
            case "all":
                return items;
            case "active":
                return items.filter((item) => !item.done);
            case "done":
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    render() {
        const { todoData, searchData, filter } = this.state;
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        const visibleItems = this.filter(
            this.search(todoData, searchData),
            filter
        );

    render() {
        const { todoData } = this.state;
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;


        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange} />
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange}
                    />
                </div>

                <TodoList
                    todos={visibleItems}
                    todos={todoData}

                    onDeleted={this.deleteItem}
                    onToggleImortant={this.onToggleImortant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onItemAdded={this.addItem} />
            </div>
        );
    }
}
