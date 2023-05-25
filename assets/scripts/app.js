import Task from "./Task.js";

const taskBox = document.getElementById('task');
const doingBox = document.getElementById('doing');
const completeBox = document.getElementById('complete');


const title = document.getElementById('title');
const description = document.getElementById('description');
const startTime = document.getElementById('startDate');
const endTime = document.getElementById('endDate');
const sub = document.getElementById('sub');


const task = new Task({
    baseURL: "https://646521939c09d77a62e4a2ef.mockapi.io/Todos/task",
    headers: { "Content-type": "application/json" }
});

const getTask = async () => {
    const response = await task.get();

    creatBoxItems(response.reverse());
}

const postTask = async () => {
    const obj = {
        title: title.value,
        description: description.value,
        startTime: startTime.value,
        endTime: endTime.value,
        status: 'task'
    }
    await task.post(undefined, obj);
}

const deleteTask = async endpoint => {
    await task.delete(endpoint);
    getTask();
}

const editTask = async (endpoint,item) => {
    await task.edit(endpoint,item);
    getTask();
}

getTask();

sub.addEventListener('click', () => {
    postTask();
    getTask();
});

function creatBoxItems(list) {
    taskBox.querySelector('.body').innerHTML = "";
    doingBox.querySelector('.body').innerHTML = "";
    completeBox.querySelector('.body').innerHTML = "";

    taskBox.querySelector('.body').append(...list.filter(item => item.status === "task").map(item => createItem(item)));
    doingBox.querySelector('.body').append(...list.filter(item => item.status === "doing").map(item => createItem(item)));
    completeBox.querySelector('.body').append(...list.filter(item => item.status === "complete").map(item => createItem(item)));
}

function createItem(item) {
    const section = document.createElement("section");
    section.classList = "boxitem";
    section.dataset.id = item.id;
    section.innerHTML = `
    <header class="pb-6 flex justify-between ">
        <h4 class="text-lg font-bold">${item.title}</h4>
        <span>X</span>
    </header>
    <div class="text-left">
        <div>
            <span>Start:</span> <span>${item.startTime}</span>
        </div>
        <div class="mt-2">
            <span>End:</span> <span>${item.endTime}</span>
        </div>
    </div>
    <div class="flex justify-between items-center gap-1 mt-8">
        <label for="my-modal-3" id="delete" class="boxbutton  btn-warning">-</label>
        <label for="my-modal-4"  id="edit" class="boxbutton   btn-info lowercase " style="text-transform: lowercase;">i</label>
        <a id="tick" class="boxbutton  btn-success " style=" ${item.status === "complete" ? 'display:none;':""}"  >✓</a>
    </div>`;


    section.querySelector('#delete').addEventListener('click', () => {
        generateDeleteModal(section, item);
    });
    section.querySelector('#edit').addEventListener('click', () => {
        generatInfoModal(item)
    });
    section.querySelector('#tick').addEventListener('click', () => {
        if (item.status === "task")
            item.status = "doing";
        else if (item.status === "doing")
            item.status = "complete";

        editTask(`/${section.dataset.id}`,item);
    });
    return section;
}


function generateDeleteModal(elem, item) {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <input type="checkbox" id="my-modal-3" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box relative">
                <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 class="text-lg font-bold text-orange-500">DELETE !!!!!!!!!!!!!!</h3>
                <p class="py-4">You Want Delete ${item.title}</p>
                <label id="delete" for="my-modal-3" class="btn ">YES</label>
            </div>
        </div>`;
    modal.querySelector('#delete').addEventListener('click', () => {
        deleteTask(`/${elem.dataset.id}`);
    });
    document.body.append(modal);

}

function generatInfoModal(item) {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <input type="checkbox" id="my-modal-4" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box relative">
                <label for="my-modal-4" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 class="text-lg font-bold text-info">Information</h3>
                <p class="py-4">${item.description}</p>
                <label id="delete" for="my-modal-4" class="btn ">YES</label>
            </div>
        </div>`;
    document.body.append(modal);
}