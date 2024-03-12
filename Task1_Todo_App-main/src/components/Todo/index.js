import { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import TodoItem from '../TodoItem';
import "./index.css";

class Todo extends Component {
    state = {
        inputText: "",
        isEdit: false,
        todoList: [],
        changeEditTextValue: "",
        toEditItemId: ""
    };

    onChangeInputText = event => {
        this.setState({ inputText: event.target.value });
    };

    onClickAddTodo = () => {
        const { inputText } = this.state;
        const text = inputText.slice(0, -2);
        const repetition = parseInt(inputText.slice(-1));
        const updatedTodoList = [...this.state.todoList];

        for (let i = 1; i <= repetition; i++) {
            updatedTodoList.push({ id: uuidv4(), text: text, update: 0, changed: 0 });
        }

        this.setState({ todoList: updatedTodoList, inputText: "" });
    };

    onChangeUpdateItemText = event => {
        this.setState({ changeEditTextValue: event.target.value });
    };

    saveChanges = () => {
        const { todoList, toEditItemId, changeEditTextValue } = this.state;
        const updatedTodoList = todoList.map(item => {
            if (item.id === toEditItemId) {
                return {
                    ...item,
                    text: changeEditTextValue,
                    update: item.update + 1
                };
            }
            return item;
        });

        this.setState({ todoList: updatedTodoList, isEdit: false, changeEditTextValue: "" });
    };

    toEditTheText = id => {
        this.setState({ isEdit: true, toEditItemId: id });
    };

    toDeleteItem = id => {
        this.setState(prevState => ({
            todoList: prevState.todoList.filter(item => item.id !== id)
        }));
    };

    render() {
        const { inputText, isEdit, changeEditTextValue, todoList } = this.state;
        const reversedTodoList = [...todoList].reverse();

        return (
            <div className="todo-container">
                <div className="card-container">
                    <h1 className="card-title">Day Goals!</h1>
                    <div className="inner-container">
                        <div className="input-button-container">
                            <input type="text" className="add-todo-input" placeholder="Add Todo" value={inputText} onChange={this.onChangeInputText} />
                            <button className="add-todo-button" type="button" onClick={this.onClickAddTodo}>Add Todo</button>
                        </div>
                        <ul className="todo-items-container">
                            {isEdit && (
                                <>
                                    <input className="change-item-text" type="text" placeholder="Change Item Text" value={changeEditTextValue} onChange={this.onChangeUpdateItemText} />
                                    <button className="save-button" type="button" onClick={this.saveChanges}>Save</button>
                                </>
                            )}
                            {reversedTodoList.map(eachItem => (
                                <TodoItem key={eachItem.id} itemDetails={eachItem} toEditTheText={() => this.toEditTheText(eachItem.id)} toDeleteItem={() => this.toDeleteItem(eachItem.id)} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Todo;
