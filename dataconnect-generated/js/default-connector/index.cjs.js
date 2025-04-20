const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'tutorhero-db',
  location: 'asia-southeast1'
};
exports.connectorConfig = connectorConfig;

const getTutorRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'getTutor');
}
getTutorRef.operationName = 'getTutor';
exports.getTutorRef = getTutorRef;

exports.getTutor = function getTutor(dc) {
  return executeQuery(getTutorRef(dc));
};

const getTutorByNameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'getTutorByName', inputVars);
}
getTutorByNameRef.operationName = 'getTutorByName';
exports.getTutorByNameRef = getTutorByNameRef;

exports.getTutorByName = function getTutorByName(dcOrVars, vars) {
  return executeQuery(getTutorByNameRef(dcOrVars, vars));
};

const getTutorStudentsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'getTutorStudents');
}
getTutorStudentsRef.operationName = 'getTutorStudents';
exports.getTutorStudentsRef = getTutorStudentsRef;

exports.getTutorStudents = function getTutorStudents(dc) {
  return executeQuery(getTutorStudentsRef(dc));
};

const isUrlValidRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'isUrlValid', inputVars);
}
isUrlValidRef.operationName = 'isUrlValid';
exports.isUrlValidRef = isUrlValidRef;

exports.isUrlValid = function isUrlValid(dcOrVars, vars) {
  return executeQuery(isUrlValidRef(dcOrVars, vars));
};

const updateTutorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTutor', inputVars);
}
updateTutorRef.operationName = 'UpdateTutor';
exports.updateTutorRef = updateTutorRef;

exports.updateTutor = function updateTutor(dcOrVars, vars) {
  return executeMutation(updateTutorRef(dcOrVars, vars));
};

const createTutorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'createTutor', inputVars);
}
createTutorRef.operationName = 'createTutor';
exports.createTutorRef = createTutorRef;

exports.createTutor = function createTutor(dcOrVars, vars) {
  return executeMutation(createTutorRef(dcOrVars, vars));
};

const createStudentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'createStudent', inputVars);
}
createStudentRef.operationName = 'createStudent';
exports.createStudentRef = createStudentRef;

exports.createStudent = function createStudent(dcOrVars, vars) {
  return executeMutation(createStudentRef(dcOrVars, vars));
};

const updateStudentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'updateStudent', inputVars);
}
updateStudentRef.operationName = 'updateStudent';
exports.updateStudentRef = updateStudentRef;

exports.updateStudent = function updateStudent(dcOrVars, vars) {
  return executeMutation(updateStudentRef(dcOrVars, vars));
};

const createRegistrationLinkRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'createRegistrationLink', inputVars);
}
createRegistrationLinkRef.operationName = 'createRegistrationLink';
exports.createRegistrationLinkRef = createRegistrationLinkRef;

exports.createRegistrationLink = function createRegistrationLink(dcOrVars, vars) {
  return executeMutation(createRegistrationLinkRef(dcOrVars, vars));
};
