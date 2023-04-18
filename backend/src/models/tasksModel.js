const connection = require('./connection')

const getAll = async () => {
    const [ tasks ] = await connection.execute('SELECT * FROM tasks');
    return tasks;
};

const createTasks = async (task) => {
    const { title } = task;
    const dateUTC = new Date(Date.now()).toUTCString();

    const query = 'INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)';

    const [ createdTasks ] = await connection.execute(query, [title, 'pedente', dateUTC]);

    return {insertId:createdTasks.insertId};
};

const deleteTask = async (id) => {
    const removedTask = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return removedTask;
}

const updateTask = async (id, task) => {
    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?'
    
    const { title, status } = task

    const updateTask = await connection.execute(query, [title, status, id]);
    return updateTask;
}

module.exports = {
    getAll,
    createTasks,
    deleteTask,
    updateTask
}