const fetch = require('node-fetch')
const root = 'http://localhost:5000/api/assignments'
var assignmentExample = {
                        	"assignmentID": "1",
                        	"workerID": "1",
                        	"assignmentResult": { "value": "10" }
                        }
const postAssignment = function(assignment){
  return fetch(root, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(assignment)
  })
}

const putAssignment = function(assignmentID){
  var url = root + '/' + assignmentID
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ assignmentResult: { value: "20" } })
  })
}

const getAssignments = function(){
  return fetch(root, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}

const getAssignment = function(assignmentID){
  return fetch(root+'/'+assignmentID, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}

const deleteAssignment = function(assignmentID){
  return fetch(root+'/'+assignmentID, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}


test('test post new assignemnt and get it back', () => {
  return postAssignment(assignmentExample)
    .then(postResponse => { return postResponse.json() })
    .then(postResponseJson => {
        assignmentExample.assignmentID = postResponseJson.assignmentID
        return getAssignment(assignmentExample.assignmentID)
    })
    .then(getResponse => {return getResponse.json()})
    .then(jsonResponse => {expect(jsonResponse.assignmentResult).toEqual(assignmentExample.assignmentResult)})
    //.catch(e => {console.log(e)})
})
test('test put function', () =>{
    return putAssignment(assignmentExample.assignmentID)
    .then(putResponse => { return putResponse.json() })
    .then(putResponseJson => {
        expect(putResponseJson.assignmentResult.value).toEqual('20')
    })
})
test('test delete function', () =>{
    return deleteAssignment(assignmentExample.assignmentID)
    .then(deleteResponse => { return deleteResponse.json() })
    .then(deleteResponseJson => {
        expect(deleteResponseJson.message).toEqual('deleted')
    })
})
