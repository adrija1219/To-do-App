document.addEventListener('DOMContentLoaded', ()=>{
    const taskInput=document.getElementById('task-input');
    const addTaskBtn=document.getElementById('add-task-btn');
    const taskList=document.getElementById('task-list');
    const emptyImage=document.querySelector('.empty-image');
    const todosContainer=document.querySelector('.todos-container');
    const progressBar = document.getElementById('progress');
    const progresNumbers = document.getElementById('numbers');
    const taskForm = document.querySelector('.input-area');

    const toggleEmptyState= () => {
        emptyImage.style.display = taskList.children.length === 0? 'block' : 'none';
        todosContainer.style.width=taskList.children.length > 0 ? '100%' : '50%';  //it will rwsize size dymanically
    };

    const updateProgress = (checkCompletion = true) => {
        const totalTasks = taskList.children.length;
        const completedTasks= taskList.querySelectorAll('.checkbox:checked').length;
        progressBar.style.width = totalTasks? `${(completedTasks / totalTasks) *100}% ` : '0%';
        progresNumbers.textContent = `${completedTasks} / ${totalTasks}`;
    };
    const addTask=(text, completed = false, checkCompletion= true) => {
        
        const taskText = text || taskInput.value.trim();  //trim method will remove extra space
        if(!taskText){
            return;      //jdi kono task add na theke or if the taskarea is empty
        }

        const li=document.createElement('li');
        li.innerHTML=`
        <div class="task-info">
        <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>
        <span>${taskText}</span>
        </div>
        <div class="task-buttons">
           <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
           <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>  
        </div>         
        `;
       
        const checkbox=li.querySelector('.checkbox');
        const editbtn=li.querySelector('.edit-btn');
        const deleteBtn =li.querySelector('.delete-btn')

        if(completed){
           li.classList.add('completed');
           editbtn.disabled = true;
           editbtn.style.opacity = 8.5;
           editbtn.style.pointerEvents = 'none'; 
        }

        checkbox.addEventListener('change', ()=>{
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);
            editbtn.disabled = isChecked;
            editbtn.style.opacity = isChecked ? '0.5' : '1';
            editbtn.style.pointerEvents = isChecked ? 'none' : 'auto';
            updateProgress();
        });


        editbtn.addEventListener('click', ()=>{
            if(!checkbox.checked){
                taskInput.value=li.querySelector('span').textContent;
                li.remove();
                toggleEmptyState();
                updateProgress(false);
            }
        })
        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            toggleEmptyState();
            updateProgress();    //when all tasks are deleted
        });

        taskList.appendChild(li);
        taskInput.value='';
        toggleEmptyState();
        updateProgress(checkCompletion);
    };

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault(); // <--- THIS LINE STOPS THE REFRESH
        addTask();
    });

    
})