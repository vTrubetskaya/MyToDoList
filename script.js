const ToDoList = function () {
    let toDoListArr = [
        {
            taskName: 'Выучить JS',
            id: "1",
            isDone: false,
        },
        {
            taskName: 'Выучить CSS',
            id: "2",
            isDone: true,
        }
    ];

    this.init = () => {
        const element = document.querySelector('.app');
        const toDoList = document.createElement('div');
        toDoList.classList.add('todolist');

        toDoList.innerHTML = `<div class="todolist__wrapper">
                                <div class="todolist__header">
                                    <h2 class="todolist__title">MY TO DO LIST</h2>
                                    <input type="text" placeholder="...🖊" class="todolist__input">
                                </div>
                                <div class="todolist__content">
                                    <ul class="todolist_items"></ul>
                                </div>        
                            </div>`
        element.appendChild(toDoList);
        this.addEventListenerInput();
        this.show();
    }

    this.delete = (id) => {
        toDoListArr = toDoListArr.filter(todo => {
            if(todo.id != id) return todo;
        });
        
        this.show();
    }

    this.editModal = (idTodo) => {
        const todo = toDoListArr.find(({id}) => id === idTodo);
        const { taskName, id } = todo;

        const elemModal = document.createElement('div');
        elemModal.classList.add('modal');

        elemModal.innerHTML = `<div class="modal__container">
                                    <div class="modal_wrapper">
                                        <h2>Edit ToDo</h2>
                                        <input type="text" class="input__edit" value="${taskName}">
                                        <button class="modal__save">Save</button>
                                    </div>
                                </div>`;
        
        document.body.appendChild(elemModal);

        elemModal.addEventListener('click', (event) => {
            if(event.target.classList[0] === 'modal__container') {
            elemModal.remove();
            }
        })
        const saveBtn = document.querySelector('.modal__save');
        saveBtn.addEventListener('click', () => {
            const input = document.querySelector('.input__edit');
            this.edit(input.value, id)
            elemModal.remove();
        })
    }

    this.edit = (editTaskName, id) => {
        toDoListArr = toDoListArr.map(todo => {
            if(todo.id === id){
                todo.taskName = editTaskName;
            }
            return todo;
        });

        this.show();
    }

    this.addEventListenerInput = () => {
        const input = document.querySelector('.todolist__input');
        input.addEventListener('keypress', (event) => {
            if(event.key ===  "Enter" && event.target.value != "") {
                this.addToDo(event.target.value);
                event.target.value = '';
            }
        })
    }

    this.addToDo = (task) => {
        toDoListArr.push({
            taskName: task,
            id: `${Math.round(performance.now())}`,
            isDone: false,
        })

        this.show();
    }
    
    this.checkedEvent = () => {
        const checkboxs = document.querySelectorAll('.checkbox');
        checkboxs.forEach((checkbox) => {
            checkbox.addEventListener('click', (event) => {
                const id = event.target.id;
                const isChecked = event.target.checked;
                toDoListArr = toDoListArr.map(todo => {
                    if(todo.id === id) {
                        todo.isDone = isChecked;
                    }
                    return todo;
                })                
            this.show();
            });
        })

    }

    this.editEvent = () => {
        const editBtns = document.querySelectorAll('.btn__edit');
        editBtns.forEach((editBtn) => {
            editBtn.addEventListener('click', (event) => {
                this.editModal(event.target.dataset.edit);
            })
        })
    }

    this.deleteEvent = () => {
        const deleteBtns = document.querySelectorAll('.btn__delete');
        deleteBtns.forEach((deleteBtn) => {
            deleteBtn.addEventListener('click', (event) => {
                this.delete(event.target.dataset.delete);
            })
        })
    }

    this.show = () => {
        const ul = document.querySelector('.todolist_items');
        let li = '';

        toDoListArr.forEach(({taskName, id, isDone}) => {
            li += `<li class="todolist_item">
            <label class="${isDone ? "todolist__task done" : "todolist__task"}">
            <input id="${id}" type="checkbox" ${isDone ? 'checked' : ''} class="checkbox">
            ${taskName}
            </label>
            <button class="btn btn__edit" data-edit="${id}">Edit</button>
            <button class="btn btn__delete" data-delete="${id}">Delete</button>
            </li>`
        })

        ul.innerHTML = li;
        this.checkedEvent();
        this.editEvent();
        this.deleteEvent();
    }
}

window.addEventListener('load', () => {
    const toDoList = new ToDoList();
    toDoList.init();
})

