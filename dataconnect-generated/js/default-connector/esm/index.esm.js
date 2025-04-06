import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default',
  service: 'tutorhero-db',
  location: 'asia-southeast1'
};

export function updateTutorRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTutor', inputVars);
}

export function updateTutor(dcOrVars, vars) {
  return executeMutation(updateTutorRef(dcOrVars, vars));
}

export function addTutorRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddTutor', inputVars);
}

export function addTutor(dcOrVars, vars) {
  return executeMutation(addTutorRef(dcOrVars, vars));
}

export function listAllTutorsRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllTutors');
}

export function listAllTutors(dc) {
  return executeQuery(listAllTutorsRef(dc));
}

export function listTutorByNameRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTutorByName', inputVars);
}

export function listTutorByName(dcOrVars, vars) {
  return executeQuery(listTutorByNameRef(dcOrVars, vars));
}

