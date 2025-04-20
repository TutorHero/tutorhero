import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default',
  service: 'tutorhero-db',
  location: 'asia-southeast1'
};

export const getTutorRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'getTutor');
}
getTutorRef.operationName = 'getTutor';

export function getTutor(dc) {
  return executeQuery(getTutorRef(dc));
}

export const getTutorByNameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'getTutorByName', inputVars);
}
getTutorByNameRef.operationName = 'getTutorByName';

export function getTutorByName(dcOrVars, vars) {
  return executeQuery(getTutorByNameRef(dcOrVars, vars));
}

export const getTutorStudentsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'getTutorStudents');
}
getTutorStudentsRef.operationName = 'getTutorStudents';

export function getTutorStudents(dc) {
  return executeQuery(getTutorStudentsRef(dc));
}

export const isUrlValidRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'isUrlValid', inputVars);
}
isUrlValidRef.operationName = 'isUrlValid';

export function isUrlValid(dcOrVars, vars) {
  return executeQuery(isUrlValidRef(dcOrVars, vars));
}

export const updateTutorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTutor', inputVars);
}
updateTutorRef.operationName = 'UpdateTutor';

export function updateTutor(dcOrVars, vars) {
  return executeMutation(updateTutorRef(dcOrVars, vars));
}

export const createTutorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'createTutor', inputVars);
}
createTutorRef.operationName = 'createTutor';

export function createTutor(dcOrVars, vars) {
  return executeMutation(createTutorRef(dcOrVars, vars));
}

export const createStudentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'createStudent', inputVars);
}
createStudentRef.operationName = 'createStudent';

export function createStudent(dcOrVars, vars) {
  return executeMutation(createStudentRef(dcOrVars, vars));
}

export const updateStudentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'updateStudent', inputVars);
}
updateStudentRef.operationName = 'updateStudent';

export function updateStudent(dcOrVars, vars) {
  return executeMutation(updateStudentRef(dcOrVars, vars));
}

export const createRegistrationLinkRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'createRegistrationLink', inputVars);
}
createRegistrationLinkRef.operationName = 'createRegistrationLink';

export function createRegistrationLink(dcOrVars, vars) {
  return executeMutation(createRegistrationLinkRef(dcOrVars, vars));
}

