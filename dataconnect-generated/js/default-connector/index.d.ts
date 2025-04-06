import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface AddTutorData {
  tutor_insert: Tutor_Key;
}

export interface AddTutorVariables {
  name: string;
  tutortype: string;
  gender: string;
  email: string;
  phoneNo: string;
  address: string;
}

export interface ListAllTutorsData {
  tutors: ({
    id: UUIDString;
    name: string;
    tutortype?: string | null;
    gender?: string | null;
    email?: string | null;
    phoneNo?: string | null;
    address?: string | null;
  } & Tutor_Key)[];
}

export interface ListTutorByNameData {
  tutors: ({
    id: UUIDString;
    name: string;
    tutortype?: string | null;
    gender?: string | null;
    email?: string | null;
    phoneNo?: string | null;
    address?: string | null;
  } & Tutor_Key)[];
}

export interface ListTutorByNameVariables {
  name: string;
}

export interface Student_Key {
  id: UUIDString;
  __typename?: 'Student_Key';
}

export interface Tutor_Key {
  id: UUIDString;
  __typename?: 'Tutor_Key';
}

export interface UpdateTutorData {
  tutor_update?: Tutor_Key | null;
}

export interface UpdateTutorVariables {
  id: UUIDString;
  name: string;
  tutortype: string;
  gender: string;
  email: string;
  phoneNo: string;
  address: string;
}

/* Allow users to create refs without passing in DataConnect */
export function listAllTutorsRef(): QueryRef<ListAllTutorsData, undefined>;
/* Allow users to pass in custom DataConnect instances */
export function listAllTutorsRef(dc: DataConnect): QueryRef<ListAllTutorsData, undefined>;

export function listAllTutors(): QueryPromise<ListAllTutorsData, undefined>;
export function listAllTutors(dc: DataConnect): QueryPromise<ListAllTutorsData, undefined>;

/* Allow users to create refs without passing in DataConnect */
export function listTutorByNameRef(vars: ListTutorByNameVariables): QueryRef<ListTutorByNameData, ListTutorByNameVariables>;
/* Allow users to pass in custom DataConnect instances */
export function listTutorByNameRef(dc: DataConnect, vars: ListTutorByNameVariables): QueryRef<ListTutorByNameData, ListTutorByNameVariables>;

export function listTutorByName(vars: ListTutorByNameVariables): QueryPromise<ListTutorByNameData, ListTutorByNameVariables>;
export function listTutorByName(dc: DataConnect, vars: ListTutorByNameVariables): QueryPromise<ListTutorByNameData, ListTutorByNameVariables>;

/* Allow users to create refs without passing in DataConnect */
export function updateTutorRef(vars: UpdateTutorVariables): MutationRef<UpdateTutorData, UpdateTutorVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updateTutorRef(dc: DataConnect, vars: UpdateTutorVariables): MutationRef<UpdateTutorData, UpdateTutorVariables>;

export function updateTutor(vars: UpdateTutorVariables): MutationPromise<UpdateTutorData, UpdateTutorVariables>;
export function updateTutor(dc: DataConnect, vars: UpdateTutorVariables): MutationPromise<UpdateTutorData, UpdateTutorVariables>;

/* Allow users to create refs without passing in DataConnect */
export function addTutorRef(vars: AddTutorVariables): MutationRef<AddTutorData, AddTutorVariables>;
/* Allow users to pass in custom DataConnect instances */
export function addTutorRef(dc: DataConnect, vars: AddTutorVariables): MutationRef<AddTutorData, AddTutorVariables>;

export function addTutor(vars: AddTutorVariables): MutationPromise<AddTutorData, AddTutorVariables>;
export function addTutor(dc: DataConnect, vars: AddTutorVariables): MutationPromise<AddTutorData, AddTutorVariables>;

