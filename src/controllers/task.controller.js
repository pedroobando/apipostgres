import Task from '../models/Task';

export async function getTask(req, res) {
  try {
    const tasks = await Task.findAll({
      attributes: ['id', 'projectid', 'name', 'done'],
      order: [
        ['id', 'DESC']
      ]
    });
    res.status(200).json({
      data: tasks
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something goes wrong',
      data: {}
    });
  }
}

export async function getOneTask(req, res) {
  const { id } = req.params;
  try {
    const task = await Task.findOne({
      attributes: ['id', 'projectid', 'name', 'done'],
      where: {
        id: id
      }
    });
    return res.json({
      data: task
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: 'Something goes wrong',
      data: {}
    });    
  }
}

export async function getTaskByProject(req, res) {
  const { id } = req.params;
  try {
    const tasks = await Task.findAll({
      attributes: ['id', 'projectid', 'name', 'done'],
      where: {
        projectid: id
      }
    });
    return res.json({
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something goes wrong',
      data: {}
    });    
  }
}

export async function createTask(req, res) {
  const { projectid } = req.params;
  const { name, done, deliverydate } = req.body;
  try {
    let newTask = await Task.create({
      name,
      done,
      projectid
    }, {
      fields: ['name', 'done', 'projectid']
    });
    if (newTask) {
      return res.status(201).json({
        message: 'Task created successfully',
        data: newTask
      });    
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Something goes wrong',
      data: {}
    });
  }
  res.send('Created.-');
}

export async function deleteTask(req, res) {
  const { id } = req.params;
  const deleteRowCount = await Task.destroy({
    where: {
      id
    }
  });
  res.status(200).json({
    message: 'Task Delete succesfully',
    count: deleteRowCount
  });
}

export async function updateTask(req, res) {
  const { id } = req.params;
  const { name, done, projectid } = req.body;

  const tasks = await Task.findAll({
    attributes: ['id', 'name', 'done', 'projectid'],
    where: {
      id
    }
  });

  if (tasks.length > 0) {
    tasks.forEach(async theTask => {
      await theTask.update({
        name,
        done,
        projectid
      });
    });
  }

  return res.status(200).json({
    message: 'Project Updated Successfully',
    date: tasks
  });  
}