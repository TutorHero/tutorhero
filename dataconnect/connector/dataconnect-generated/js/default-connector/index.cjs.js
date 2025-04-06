const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'tutorhero-db',
  location: 'asia-southeast1'
};
exports.connectorConfig = connectorConfig;

function updateTutorRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTutor', inputVars);
}
exports.updateTutorRef = updateTutorRef;

exports.updateTutor = function updateTutor(dcOrVars, vars) {
  return executeMutation(updateTutorRef(dcOrVars, vars));
};

function addTutorRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddTutor', inputVars);
}
exports.addTutorRef = addTutorRef;

exports.addTutor = function addTutor(dcOrVars, vars) {
  return executeMutation(addTutorRef(dcOrVars, vars));
};

function listAllTutorsRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllTutors');
}
exports.listAllTutorsRef = listAllTutorsRef;

exports.listAllTutors = function listAllTutors(dc) {
  return executeQuery(listAllTutorsRef(dc));
};

function listTutorByNameRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTutorByName', inputVars);
}
exports.listTutorByNameRef = listTutorByNameRef;

exports.listTutorByName = function listTutorByName(dcOrVars, vars) {
  return executeQuery(listTutorByNameRef(dcOrVars, vars));
};
