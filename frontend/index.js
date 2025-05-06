const form  = document.getElementById('taskForm');
const list = document.getElementById('taskList');
const api = 'http://localhost:5000/api/task';
async function fetchTask(){
    try {
        const res = await axios.get(api);
        const task = res.data
        list.innerHTML='';
        task.forEach(task => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <strong> ${task.title}</strong> - ${task.status}<br/>
                    <em> ${task.assignedEmployee} </em> | Priority : ${task.priority} 
                    | DeadLine : ${task.deadline?.split("T")[0]}
                    <button onclick = "deleteTask('${task._id}')">Delete</button>
                `;
                list.appendChild(li);
        });
    } catch (err) {
        console.log("Failed to Fetch Task : ",err);       
    }
}
form.onsubmit =async (e)=>{
    e.preventDefault();
    const  formdata = new FormData(form);
    const task = Object.fromEntries(formdata.entries());
    try {
        await axios.post(api,task);
        form.reset();
        fetchTask();
    } catch (error) {
        console.error('Failed to Create Task  : ',error);   
    }  
}
async function deleteTask(id){
    try {
        await axios.delete(`${api}/${id}`);
        fetchTask();
    } catch (error) {
        console.log('Failed to Delete Task  : ',error);
        
    }
}
fetchTask();