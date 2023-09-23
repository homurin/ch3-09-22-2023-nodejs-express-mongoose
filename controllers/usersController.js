const fs = require("fs")

const users = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/users.json`
  )
)

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: "sucess",
    requestTime: req.requestTime,
    data: users,
  })
}

const getUserById = (req, res) => {
  const id = req.params.id
  const user = users.find(
    (user) => user._id === id
  )
  if (!user) {
    return res.status(404).json({
      status: "failed",
      message: `User with id ${id} not found`,
    })
  }
  res.status(200).json({
    status: "sucess",
    data: user,
  })
}

const createUser = (req, res) => {
  // generate id for new data
  const newId = users.length

  const newData = Object.assign(
    { _id: newId.toString() },
    req.body
  )

  users.push(newData)
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          users: newData,
        },
      })
    }
  )
}

const editUser = (req, res) => {
  const id = req.params.id
  const userIndex = tours.findIndex(
    (user) => user._id === id
  )

  if (!userIndex === -1) {
    return res.status(404).json({
      status: "failed",
      message: `Data with id ${id} not found`,
    })
  }
  users[userIndex] = {
    ...users[userIndex],
    ...req.body,
  }
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        status: "success",
        message: `user with id ${id} edited`,
        data: {
          user: users[userIndex],
        },
      })
    }
  )
}

const removeUser = (req, res) => {
  const id = req.params.id
  const userIndex = users.findIndex(
    (user) => user._id === id
  )

  if (!userIndex === -1) {
    return res.status(404).json({
      status: "failed",
      message: `user with id ${id} not found`,
    })
  }

  users.splice(userIndex, 1)
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(404).json({
        status: "Not found",
        message: `user with id ${id} edited`,
        data: null,
      })
    }
  )
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  removeUser,
}
