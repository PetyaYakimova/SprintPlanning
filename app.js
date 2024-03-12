window.addEventListener('load', solve);

function solve() {
    let allInputFields = [];
    let titleField = document.getElementById('title');
    allInputFields.push(titleField);
    let descriptionField = document.getElementById('description');
    allInputFields.push(descriptionField);
    let labelField = document.getElementById('label');
    allInputFields.push(labelField);
    let pointField = document.getElementById('points');
    allInputFields.push(pointField);
    let assigneeField = document.getElementById('assignee');
    allInputFields.push(assigneeField);
    let idField = document.getElementById('task-id');
    let currentNumber = 1;
    let totalPointsField = document.getElementById('total-sprint-points');
    let totalPoints = 0;

    let createTaskButton = document.getElementById('create-task-btn');
    let deleteTaskButton = document.getElementById('delete-task-btn');
    let tasksSectionElement = document.getElementById('tasks-section');

    createTaskButton.addEventListener('click', e=>addTask());
    deleteTaskButton.addEventListener('click', e=>deleteTask());
    

    function addTask(){
        if (allInputFields.find(f=>!f.value)){
            return;
        }

        idField.value = `task-${currentNumber}`;
        let articleElement = document.createElement("article");
        articleElement.setAttribute('id', idField.value);
        articleElement.classList.add('task-card');

        let labelElement = document.createElement('div');
        labelElement.classList.add('task-card-label');
        switch(labelField.value){
            case 'Feature': 
                labelElement.classList.add('feature');
                labelElement.innerHTML = `Feature &#8865;`;
                break;
            case 'Low Priority Bug': 
                labelElement.classList.add('low-priority');
                labelElement.innerHTML = `Low Priority Bug &#9737;`;
                break;
            case 'High Priority Bug': 
                labelElement.classList.add('high-priority');
                labelElement.innerHTML = `High Priority Bug &#9888;`;
                break;
        }
        articleElement.appendChild(labelElement);

        let titleElement = document.createElement('h3');
        titleElement.classList.add('task-card-title');
        titleElement.textContent= titleField.value;
        articleElement.appendChild(titleElement);

        let descriptionElement = document.createElement('p');
        descriptionElement.classList.add('task-card-description');
        descriptionElement.textContent = descriptionField.value;
        articleElement.appendChild(descriptionElement);

        let pointsElement = document.createElement('div');
        pointsElement.classList.add('task-card-points');
        pointsElement.textContent = `Estimated at ${pointField.value} pts`;
        articleElement.appendChild(pointsElement);

        let assigneeElement = document.createElement('div');
        assigneeElement.classList.add('task-card-assignee');
        assigneeElement.textContent = `Assigned to: ${assigneeField.value}`;
        articleElement.appendChild(assigneeElement);

        let actionsElement = document.createElement('div');
        actionsElement.classList.add('task-card-actions');
        let deleteButtonElement = document.createElement('button');
        deleteButtonElement.textContent = 'Delete';
        deleteButtonElement.addEventListener('click', e=>loadTask(e));
        actionsElement.appendChild(deleteButtonElement);
        articleElement.appendChild(actionsElement);

        tasksSectionElement.appendChild(articleElement);
        totalPoints+=Number(pointField.value);
        totalPointsField.textContent = `Total Points ${totalPoints}pts`;
        currentNumber++;

        allInputFields.forEach(f=>f.value=null);
    }

    function loadTask(e){
        let parentArticleElement = e.target.parentNode.parentNode;
        let id = parentArticleElement.getAttribute('id');
        idField.value = id;
        titleField.value = parentArticleElement.querySelector('.task-card-title').textContent;
        descriptionField.value = parentArticleElement.querySelector('.task-card-description').textContent;
        let label = parentArticleElement.querySelector('.task-card-label').innerHTML.split(' ')[0];
        if (label==="Low" || label ==="High"){
            label +=" Priority Bug";
        }
        labelField.value = label;
        pointField.value = parentArticleElement.querySelector('.task-card-points').textContent.split(' ')[2];
        assigneeField.value = parentArticleElement.querySelector('.task-card-assignee').textContent.split(': ')[1];

        allInputFields.forEach(f=>f.disabled = true);
        createTaskButton.disabled = true;
        deleteTaskButton.disabled = false;
    }

    function deleteTask(){
        let id = idField.value;

        let points = Number(pointField.value);
        totalPoints-=points;
        totalPointsField.textContent = `Total Points ${totalPoints}pts`;
        
        document.getElementById(id).remove();

        allInputFields.forEach(f=>f.value=null);
        allInputFields.forEach(f=>f.disabled = false);
        createTaskButton.disabled = false;
        deleteTaskButton.disabled = true;
    }
}