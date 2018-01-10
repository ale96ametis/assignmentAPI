const express = require('express'),
    bodyParser = require('body-parser');
const assignments = express.Router()

var uuid = require('uuid-v4');

const arrayAssignments = []

assignments.route('/')
  .get((req, res) => {
    res.status(200)
    res.json({message: 'Welcome to Assignment API'})
  });
assignments.route('/assignments')
  .get((req, res) => {
    res.status(200)
    res.json(arrayAssignments)
  })
  .post((req, res) => {
    var assignment = {}
    assignment.taskID = uuid()
    if (req.body.assignmentID) assignment.assignmentID = req.body.assignmentID
    if (req.body.workerID) assignment.workerID = req.body.workerID
    if (req.body.assignmentResult) assignment.assignmentResult = req.body.assignmentResult
    arrayAssignments.push(assignment)
    res.status(200)
    res.json(assignment)
  });
assignments.route('/assignments/:assignmentID')
  .put((req, res) => {
    var assignmentID = req.params.assignmentID
    const i = arrayAssignments.findIndex(item => {return item.assignmentID === assignmentID})
    if (i==-1) res.sendStatus(404)
    else {
        if (req.body.assignmentID) arrayAssignments[i].assignmentID = req.body.assignmentID
        if (req.body.workerID) arrayAssignments[i].workerID = req.body.workerID
        if (req.body.assignmentResult) arrayAssignments[i].assignmentResult = req.body.assignmentResult
        res.status(200)
        res.json(arrayAssignments[i])
    }
  })
  .delete((req, res) => {
    var assignmentID = req.params.assignmentID
    const i = arrayAssignments.findIndex(item => {return item.assignmentID === assignmentID})
    if (i==-1) res.sendStatus(404)
    else {
        arrayAssignments.splice(i,1)
        res.status(200)
        res.json({message: 'deleted'})
    }
  })
  .get((req, res) => {
    var assignmentID = req.params.assignmentID
    const i = arrayAssignments.findIndex(item => {return item.assignmentID === assignmentID})
    if (i==-1) res.sendStatus(404)
    else{
      res.status(200)
      res.json(arrayAssignments[i])
    }
  });

module.exports = assignments
