import Project from "../models/Project";

export async function getProject(req, res) {
  try {
    const projects = await Project.findAll();
    res.json({
      data: projects
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something goes wrong',
      data: {}
    });
  }
}

export async function getOneProject(req, res) {
  const { id } = req.params;
  try {
    const project = await Project.findOne({
      where: {
        id: id
      }
    });
    return res.json({
      data: project
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something goes wrong',
      data: {}
    });    
  }
}

export async function deleteProject(req, res) {
  const { id } = req.params;
  const deleteRowCount = await Project.destroy({
    where: {
      id
    }
  });
  res.json({
    message: 'Project Deletesuccesfully',
    count: deleteRowCount
  });
}

export async function createProject(req, res) {
  const { name, priority, description, deliverydate } = req.body;
  try {
    let newProject = await Project.create({
      name,
      priority,
      description,
      deliverydate
    }, {
      fields: ['name', 'priority', 'description', 'deliverydate']
    });
    if (newProject) {
      return res.status(201).json({
        message: 'Project created successfully',
        data: newProject
      });    
    }
  } catch (error) {
    // console.log(error)
    res.status(500).json({
      message: 'Something goes wrong',
      data: {}
    });
  }
  res.send('recived');
}

export async function updateProject(req, res) {
  const { id } = req.params;
  const { name, priority, description, deliverydate } = req.body;

  const projects = await Project.findAll({
    attributes: ['id', 'name', 'priority', 'description', 'deliverydate'],
    where: {
      id
    }
  });

  if (projects.length > 0) {
    projects.forEach(async theProject => {
      await theProject.update({
        name,
        priority,
        description,
        deliverydate
      });
    });
  }

  return res.json({
    message: 'Project Updated Successfully',
    date: projects
  });
}