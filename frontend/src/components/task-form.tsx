import { useState } from "react";
import { io } from 'socket.io-client';



export function TaskForm() {
    const apiUrl = "http://api:3002"
    const [taskStatus, setTaskStatus] = useState('');
    const [taskId, setTaskId] = useState('');
    const socket = io(apiUrl)
   
    socket.on("taskstatus", (message) => {
        setTaskStatus(message.status || taskStatus)
    })

    async function postData(url = "", data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        setTaskStatus("RUNNING")
        const form = e.target;
        const formData = new FormData(form);
        console.log(formData)
        const data = await postData(`${apiUrl}/tasks`, {
            numOfTasks: formData.get("numOfTasks")
        });
        console.log(data); // (!) This doesn't include multiple select values
        setTaskStatus(data.status)
        setTaskId(data.id)
    }

    return (
        <div>
            <form name="taskform" onSubmit={handleSubmit} method="post">
                <label >Number of tasks:</label>
                <input type="number" id="numOfTasks" name="numOfTasks" required />
                <button type="submit">Submit</button>
            </form>
            <p>{taskId}: {taskStatus}</p>
        </div>
    )
}