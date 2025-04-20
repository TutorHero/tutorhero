import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface CreateRegistrationLinkData {
  registrationLink_insert: RegistrationLink_Key;
}

export interface CreateRegistrationLinkVariables {
  expiryDate: TimestampString;
}

export interface CreateStudentData {
  student_insert: Student_Key;
}

export interface CreateStudentVariables {
  name: string;
  type: string;
  gender: string;
  dob: DateString;
  school: string;
  email: string;
  phoneNo: string;
  address: string;
  status: string;
  tuitionLoc: string;
}

export interface CreateTutorData {
  tutor_insert: Tutor_Key;
}

export interface CreateTutorVariables {
  name: string;
  type: string;
  gender: string;
  email: string;
  phoneNo: string;
  address: string;
}

export interface GetTutorByNameData {
  tutors: ({
    id: string;
    name: string;
    type?: string | null;
    gender?: string | null;
    email?: string | null;
    phoneNo?: string | null;
    address?: string | null;
  } & Tutor_Key)[];
}

export interface GetTutorByNameVariables {
  name: string;
}

export interface GetTutorData {
  tutors: ({
    id: string;
    name: string;
    type?: string | null;
    gender?: string | null;
    email?: string | null;
    phoneNo?: string | null;
    address?: string | null;
  } & Tutor_Key)[];
}

export interface GetTutorStudentsData {
  students: ({
    id: UUIDString;
    name: string;
    type: string;
    gender: string;
    dob: DateString;
    email: string;
    phoneNo: string;
    address: string;
    status: string;
    tuitionLoc: string;
  } & Student_Key)[];
}

export interface IsUrlValidData {
  registrationLinks: ({
    id: UUIDString;
    submitted: boolean;
    expiryDate: TimestampString;
    tutor: {
      id: string;
      name: string;
      type?: string | null;
    } & Tutor_Key;
  } & RegistrationLink_Key)[];
}

export interface IsUrlValidVariables {
  id: UUIDString;
}

export interface RegistrationLink_Key {
  id: UUIDString;
  __typename?: 'RegistrationLink_Key';
}

export interface Student_Key {
  id: UUIDString;
  __typename?: 'Student_Key';
}

export interface Tutor_Key {
  id: string;
  __typename?: 'Tutor_Key';
}

export interface UpdateStudentData {
  student_update?: Student_Key | null;
}

export interface UpdateStudentVariables {
  id?: UUIDString | null;
  name: string;
  type: string;
  gender: string;
  dob: DateString;
  school: string;
  email: string;
  phoneNo: string;
  address: string;
  status: string;
  tuitionLoc: string;
}

export interface UpdateTutorData {
  tutor_update?: Tutor_Key | null;
}

export interface UpdateTutorVariables {
  name: string;
  type: string;
  gender: string;
  email: string;
  phoneNo: string;
  address: string;
}

interface GetTutorRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetTutorData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetTutorData, undefined>;
  operationName: string;
}
export const getTutorRef: GetTutorRef;

export function getTutor(): QueryPromise<GetTutorData, undefined>;
export function getTutor(dc: DataConnect): QueryPromise<GetTutorData, undefined>;

interface GetTutorByNameRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTutorByNameVariables): QueryRef<GetTutorByNameData, GetTutorByNameVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTutorByNameVariables): QueryRef<GetTutorByNameData, GetTutorByNameVariables>;
  operationName: string;
}
export const getTutorByNameRef: GetTutorByNameRef;

export function getTutorByName(vars: GetTutorByNameVariables): QueryPromise<GetTutorByNameData, GetTutorByNameVariables>;
export function getTutorByName(dc: DataConnect, vars: GetTutorByNameVariables): QueryPromise<GetTutorByNameData, GetTutorByNameVariables>;

interface GetTutorStudentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetTutorStudentsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetTutorStudentsData, undefined>;
  operationName: string;
}
export const getTutorStudentsRef: GetTutorStudentsRef;

export function getTutorStudents(): QueryPromise<GetTutorStudentsData, undefined>;
export function getTutorStudents(dc: DataConnect): QueryPromise<GetTutorStudentsData, undefined>;

interface IsUrlValidRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: IsUrlValidVariables): QueryRef<IsUrlValidData, IsUrlValidVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: IsUrlValidVariables): QueryRef<IsUrlValidData, IsUrlValidVariables>;
  operationName: string;
}
export const isUrlValidRef: IsUrlValidRef;

export function isUrlValid(vars: IsUrlValidVariables): QueryPromise<IsUrlValidData, IsUrlValidVariables>;
export function isUrlValid(dc: DataConnect, vars: IsUrlValidVariables): QueryPromise<IsUrlValidData, IsUrlValidVariables>;

interface UpdateTutorRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTutorVariables): MutationRef<UpdateTutorData, UpdateTutorVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTutorVariables): MutationRef<UpdateTutorData, UpdateTutorVariables>;
  operationName: string;
}
export const updateTutorRef: UpdateTutorRef;

export function updateTutor(vars: UpdateTutorVariables): MutationPromise<UpdateTutorData, UpdateTutorVariables>;
export function updateTutor(dc: DataConnect, vars: UpdateTutorVariables): MutationPromise<UpdateTutorData, UpdateTutorVariables>;

interface CreateTutorRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTutorVariables): MutationRef<CreateTutorData, CreateTutorVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTutorVariables): MutationRef<CreateTutorData, CreateTutorVariables>;
  operationName: string;
}
export const createTutorRef: CreateTutorRef;

export function createTutor(vars: CreateTutorVariables): MutationPromise<CreateTutorData, CreateTutorVariables>;
export function createTutor(dc: DataConnect, vars: CreateTutorVariables): MutationPromise<CreateTutorData, CreateTutorVariables>;

interface CreateStudentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateStudentVariables): MutationRef<CreateStudentData, CreateStudentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateStudentVariables): MutationRef<CreateStudentData, CreateStudentVariables>;
  operationName: string;
}
export const createStudentRef: CreateStudentRef;

export function createStudent(vars: CreateStudentVariables): MutationPromise<CreateStudentData, CreateStudentVariables>;
export function createStudent(dc: DataConnect, vars: CreateStudentVariables): MutationPromise<CreateStudentData, CreateStudentVariables>;

interface UpdateStudentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStudentVariables): MutationRef<UpdateStudentData, UpdateStudentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateStudentVariables): MutationRef<UpdateStudentData, UpdateStudentVariables>;
  operationName: string;
}
export const updateStudentRef: UpdateStudentRef;

export function updateStudent(vars: UpdateStudentVariables): MutationPromise<UpdateStudentData, UpdateStudentVariables>;
export function updateStudent(dc: DataConnect, vars: UpdateStudentVariables): MutationPromise<UpdateStudentData, UpdateStudentVariables>;

interface CreateRegistrationLinkRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateRegistrationLinkVariables): MutationRef<CreateRegistrationLinkData, CreateRegistrationLinkVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateRegistrationLinkVariables): MutationRef<CreateRegistrationLinkData, CreateRegistrationLinkVariables>;
  operationName: string;
}
export const createRegistrationLinkRef: CreateRegistrationLinkRef;

export function createRegistrationLink(vars: CreateRegistrationLinkVariables): MutationPromise<CreateRegistrationLinkData, CreateRegistrationLinkVariables>;
export function createRegistrationLink(dc: DataConnect, vars: CreateRegistrationLinkVariables): MutationPromise<CreateRegistrationLinkData, CreateRegistrationLinkVariables>;

