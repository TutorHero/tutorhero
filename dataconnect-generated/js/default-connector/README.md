# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*getTutor*](#gettutor)
  - [*getTutorByName*](#gettutorbyname)
  - [*getTutorStudents*](#gettutorstudents)
  - [*isUrlValid*](#isurlvalid)
- [**Mutations**](#mutations)
  - [*UpdateTutor*](#updatetutor)
  - [*createTutor*](#createtutor)
  - [*createStudent*](#createstudent)
  - [*updateStudent*](#updatestudent)
  - [*createRegistrationLink*](#createregistrationlink)

# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@firebasegen/default-connector` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## getTutor
You can execute the `getTutor` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getTutor(): QueryPromise<GetTutorData, undefined>;

interface GetTutorRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetTutorData, undefined>;
}
export const getTutorRef: GetTutorRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTutor(dc: DataConnect): QueryPromise<GetTutorData, undefined>;

interface GetTutorRef {
  ...
  (dc: DataConnect): QueryRef<GetTutorData, undefined>;
}
export const getTutorRef: GetTutorRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTutorRef:
```typescript
const name = getTutorRef.operationName;
console.log(name);
```

### Variables
The `getTutor` query has no variables.
### Return Type
Recall that executing the `getTutor` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTutorData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `getTutor`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTutor } from '@firebasegen/default-connector';


// Call the `getTutor()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTutor();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTutor(dataConnect);

console.log(data.tutors);

// Or, you can use the `Promise` API.
getTutor().then((response) => {
  const data = response.data;
  console.log(data.tutors);
});
```

### Using `getTutor`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTutorRef } from '@firebasegen/default-connector';


// Call the `getTutorRef()` function to get a reference to the query.
const ref = getTutorRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTutorRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.tutors);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.tutors);
});
```

## getTutorByName
You can execute the `getTutorByName` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getTutorByName(vars: GetTutorByNameVariables): QueryPromise<GetTutorByNameData, GetTutorByNameVariables>;

interface GetTutorByNameRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTutorByNameVariables): QueryRef<GetTutorByNameData, GetTutorByNameVariables>;
}
export const getTutorByNameRef: GetTutorByNameRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTutorByName(dc: DataConnect, vars: GetTutorByNameVariables): QueryPromise<GetTutorByNameData, GetTutorByNameVariables>;

interface GetTutorByNameRef {
  ...
  (dc: DataConnect, vars: GetTutorByNameVariables): QueryRef<GetTutorByNameData, GetTutorByNameVariables>;
}
export const getTutorByNameRef: GetTutorByNameRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTutorByNameRef:
```typescript
const name = getTutorByNameRef.operationName;
console.log(name);
```

### Variables
The `getTutorByName` query requires an argument of type `GetTutorByNameVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTutorByNameVariables {
  name: string;
}
```
### Return Type
Recall that executing the `getTutorByName` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTutorByNameData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `getTutorByName`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTutorByName, GetTutorByNameVariables } from '@firebasegen/default-connector';

// The `getTutorByName` query requires an argument of type `GetTutorByNameVariables`:
const getTutorByNameVars: GetTutorByNameVariables = {
  name: ..., 
};

// Call the `getTutorByName()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTutorByName(getTutorByNameVars);
// Variables can be defined inline as well.
const { data } = await getTutorByName({ name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTutorByName(dataConnect, getTutorByNameVars);

console.log(data.tutors);

// Or, you can use the `Promise` API.
getTutorByName(getTutorByNameVars).then((response) => {
  const data = response.data;
  console.log(data.tutors);
});
```

### Using `getTutorByName`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTutorByNameRef, GetTutorByNameVariables } from '@firebasegen/default-connector';

// The `getTutorByName` query requires an argument of type `GetTutorByNameVariables`:
const getTutorByNameVars: GetTutorByNameVariables = {
  name: ..., 
};

// Call the `getTutorByNameRef()` function to get a reference to the query.
const ref = getTutorByNameRef(getTutorByNameVars);
// Variables can be defined inline as well.
const ref = getTutorByNameRef({ name: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTutorByNameRef(dataConnect, getTutorByNameVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.tutors);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.tutors);
});
```

## getTutorStudents
You can execute the `getTutorStudents` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getTutorStudents(): QueryPromise<GetTutorStudentsData, undefined>;

interface GetTutorStudentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetTutorStudentsData, undefined>;
}
export const getTutorStudentsRef: GetTutorStudentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTutorStudents(dc: DataConnect): QueryPromise<GetTutorStudentsData, undefined>;

interface GetTutorStudentsRef {
  ...
  (dc: DataConnect): QueryRef<GetTutorStudentsData, undefined>;
}
export const getTutorStudentsRef: GetTutorStudentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTutorStudentsRef:
```typescript
const name = getTutorStudentsRef.operationName;
console.log(name);
```

### Variables
The `getTutorStudents` query has no variables.
### Return Type
Recall that executing the `getTutorStudents` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTutorStudentsData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `getTutorStudents`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTutorStudents } from '@firebasegen/default-connector';


// Call the `getTutorStudents()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTutorStudents();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTutorStudents(dataConnect);

console.log(data.students);

// Or, you can use the `Promise` API.
getTutorStudents().then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

### Using `getTutorStudents`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTutorStudentsRef } from '@firebasegen/default-connector';


// Call the `getTutorStudentsRef()` function to get a reference to the query.
const ref = getTutorStudentsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTutorStudentsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.students);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.students);
});
```

## isUrlValid
You can execute the `isUrlValid` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
isUrlValid(vars: IsUrlValidVariables): QueryPromise<IsUrlValidData, IsUrlValidVariables>;

interface IsUrlValidRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: IsUrlValidVariables): QueryRef<IsUrlValidData, IsUrlValidVariables>;
}
export const isUrlValidRef: IsUrlValidRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
isUrlValid(dc: DataConnect, vars: IsUrlValidVariables): QueryPromise<IsUrlValidData, IsUrlValidVariables>;

interface IsUrlValidRef {
  ...
  (dc: DataConnect, vars: IsUrlValidVariables): QueryRef<IsUrlValidData, IsUrlValidVariables>;
}
export const isUrlValidRef: IsUrlValidRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the isUrlValidRef:
```typescript
const name = isUrlValidRef.operationName;
console.log(name);
```

### Variables
The `isUrlValid` query requires an argument of type `IsUrlValidVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface IsUrlValidVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `isUrlValid` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `IsUrlValidData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `isUrlValid`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, isUrlValid, IsUrlValidVariables } from '@firebasegen/default-connector';

// The `isUrlValid` query requires an argument of type `IsUrlValidVariables`:
const isUrlValidVars: IsUrlValidVariables = {
  id: ..., 
};

// Call the `isUrlValid()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await isUrlValid(isUrlValidVars);
// Variables can be defined inline as well.
const { data } = await isUrlValid({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await isUrlValid(dataConnect, isUrlValidVars);

console.log(data.registrationLinks);

// Or, you can use the `Promise` API.
isUrlValid(isUrlValidVars).then((response) => {
  const data = response.data;
  console.log(data.registrationLinks);
});
```

### Using `isUrlValid`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, isUrlValidRef, IsUrlValidVariables } from '@firebasegen/default-connector';

// The `isUrlValid` query requires an argument of type `IsUrlValidVariables`:
const isUrlValidVars: IsUrlValidVariables = {
  id: ..., 
};

// Call the `isUrlValidRef()` function to get a reference to the query.
const ref = isUrlValidRef(isUrlValidVars);
// Variables can be defined inline as well.
const ref = isUrlValidRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = isUrlValidRef(dataConnect, isUrlValidVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.registrationLinks);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.registrationLinks);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## UpdateTutor
You can execute the `UpdateTutor` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updateTutor(vars: UpdateTutorVariables): MutationPromise<UpdateTutorData, UpdateTutorVariables>;

interface UpdateTutorRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTutorVariables): MutationRef<UpdateTutorData, UpdateTutorVariables>;
}
export const updateTutorRef: UpdateTutorRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTutor(dc: DataConnect, vars: UpdateTutorVariables): MutationPromise<UpdateTutorData, UpdateTutorVariables>;

interface UpdateTutorRef {
  ...
  (dc: DataConnect, vars: UpdateTutorVariables): MutationRef<UpdateTutorData, UpdateTutorVariables>;
}
export const updateTutorRef: UpdateTutorRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTutorRef:
```typescript
const name = updateTutorRef.operationName;
console.log(name);
```

### Variables
The `UpdateTutor` mutation requires an argument of type `UpdateTutorVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTutorVariables {
  name: string;
  type: string;
  gender: string;
  email: string;
  phoneNo: string;
  address: string;
}
```
### Return Type
Recall that executing the `UpdateTutor` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTutorData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTutorData {
  tutor_update?: Tutor_Key | null;
}
```
### Using `UpdateTutor`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTutor, UpdateTutorVariables } from '@firebasegen/default-connector';

// The `UpdateTutor` mutation requires an argument of type `UpdateTutorVariables`:
const updateTutorVars: UpdateTutorVariables = {
  name: ..., 
  type: ..., 
  gender: ..., 
  email: ..., 
  phoneNo: ..., 
  address: ..., 
};

// Call the `updateTutor()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTutor(updateTutorVars);
// Variables can be defined inline as well.
const { data } = await updateTutor({ name: ..., type: ..., gender: ..., email: ..., phoneNo: ..., address: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTutor(dataConnect, updateTutorVars);

console.log(data.tutor_update);

// Or, you can use the `Promise` API.
updateTutor(updateTutorVars).then((response) => {
  const data = response.data;
  console.log(data.tutor_update);
});
```

### Using `UpdateTutor`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTutorRef, UpdateTutorVariables } from '@firebasegen/default-connector';

// The `UpdateTutor` mutation requires an argument of type `UpdateTutorVariables`:
const updateTutorVars: UpdateTutorVariables = {
  name: ..., 
  type: ..., 
  gender: ..., 
  email: ..., 
  phoneNo: ..., 
  address: ..., 
};

// Call the `updateTutorRef()` function to get a reference to the mutation.
const ref = updateTutorRef(updateTutorVars);
// Variables can be defined inline as well.
const ref = updateTutorRef({ name: ..., type: ..., gender: ..., email: ..., phoneNo: ..., address: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTutorRef(dataConnect, updateTutorVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.tutor_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.tutor_update);
});
```

## createTutor
You can execute the `createTutor` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createTutor(vars: CreateTutorVariables): MutationPromise<CreateTutorData, CreateTutorVariables>;

interface CreateTutorRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTutorVariables): MutationRef<CreateTutorData, CreateTutorVariables>;
}
export const createTutorRef: CreateTutorRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTutor(dc: DataConnect, vars: CreateTutorVariables): MutationPromise<CreateTutorData, CreateTutorVariables>;

interface CreateTutorRef {
  ...
  (dc: DataConnect, vars: CreateTutorVariables): MutationRef<CreateTutorData, CreateTutorVariables>;
}
export const createTutorRef: CreateTutorRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTutorRef:
```typescript
const name = createTutorRef.operationName;
console.log(name);
```

### Variables
The `createTutor` mutation requires an argument of type `CreateTutorVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTutorVariables {
  name: string;
  type: string;
  gender: string;
  email: string;
  phoneNo: string;
  address: string;
}
```
### Return Type
Recall that executing the `createTutor` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTutorData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTutorData {
  tutor_insert: Tutor_Key;
}
```
### Using `createTutor`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTutor, CreateTutorVariables } from '@firebasegen/default-connector';

// The `createTutor` mutation requires an argument of type `CreateTutorVariables`:
const createTutorVars: CreateTutorVariables = {
  name: ..., 
  type: ..., 
  gender: ..., 
  email: ..., 
  phoneNo: ..., 
  address: ..., 
};

// Call the `createTutor()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTutor(createTutorVars);
// Variables can be defined inline as well.
const { data } = await createTutor({ name: ..., type: ..., gender: ..., email: ..., phoneNo: ..., address: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTutor(dataConnect, createTutorVars);

console.log(data.tutor_insert);

// Or, you can use the `Promise` API.
createTutor(createTutorVars).then((response) => {
  const data = response.data;
  console.log(data.tutor_insert);
});
```

### Using `createTutor`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTutorRef, CreateTutorVariables } from '@firebasegen/default-connector';

// The `createTutor` mutation requires an argument of type `CreateTutorVariables`:
const createTutorVars: CreateTutorVariables = {
  name: ..., 
  type: ..., 
  gender: ..., 
  email: ..., 
  phoneNo: ..., 
  address: ..., 
};

// Call the `createTutorRef()` function to get a reference to the mutation.
const ref = createTutorRef(createTutorVars);
// Variables can be defined inline as well.
const ref = createTutorRef({ name: ..., type: ..., gender: ..., email: ..., phoneNo: ..., address: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTutorRef(dataConnect, createTutorVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.tutor_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.tutor_insert);
});
```

## createStudent
You can execute the `createStudent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createStudent(vars: CreateStudentVariables): MutationPromise<CreateStudentData, CreateStudentVariables>;

interface CreateStudentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateStudentVariables): MutationRef<CreateStudentData, CreateStudentVariables>;
}
export const createStudentRef: CreateStudentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createStudent(dc: DataConnect, vars: CreateStudentVariables): MutationPromise<CreateStudentData, CreateStudentVariables>;

interface CreateStudentRef {
  ...
  (dc: DataConnect, vars: CreateStudentVariables): MutationRef<CreateStudentData, CreateStudentVariables>;
}
export const createStudentRef: CreateStudentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createStudentRef:
```typescript
const name = createStudentRef.operationName;
console.log(name);
```

### Variables
The `createStudent` mutation requires an argument of type `CreateStudentVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `createStudent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateStudentData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateStudentData {
  student_insert: Student_Key;
}
```
### Using `createStudent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createStudent, CreateStudentVariables } from '@firebasegen/default-connector';

// The `createStudent` mutation requires an argument of type `CreateStudentVariables`:
const createStudentVars: CreateStudentVariables = {
  name: ..., 
  type: ..., 
  gender: ..., 
  dob: ..., 
  school: ..., 
  email: ..., 
  phoneNo: ..., 
  address: ..., 
  status: ..., 
  tuitionLoc: ..., 
};

// Call the `createStudent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createStudent(createStudentVars);
// Variables can be defined inline as well.
const { data } = await createStudent({ name: ..., type: ..., gender: ..., dob: ..., school: ..., email: ..., phoneNo: ..., address: ..., status: ..., tuitionLoc: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createStudent(dataConnect, createStudentVars);

console.log(data.student_insert);

// Or, you can use the `Promise` API.
createStudent(createStudentVars).then((response) => {
  const data = response.data;
  console.log(data.student_insert);
});
```

### Using `createStudent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createStudentRef, CreateStudentVariables } from '@firebasegen/default-connector';

// The `createStudent` mutation requires an argument of type `CreateStudentVariables`:
const createStudentVars: CreateStudentVariables = {
  name: ..., 
  type: ..., 
  gender: ..., 
  dob: ..., 
  school: ..., 
  email: ..., 
  phoneNo: ..., 
  address: ..., 
  status: ..., 
  tuitionLoc: ..., 
};

// Call the `createStudentRef()` function to get a reference to the mutation.
const ref = createStudentRef(createStudentVars);
// Variables can be defined inline as well.
const ref = createStudentRef({ name: ..., type: ..., gender: ..., dob: ..., school: ..., email: ..., phoneNo: ..., address: ..., status: ..., tuitionLoc: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createStudentRef(dataConnect, createStudentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.student_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.student_insert);
});
```

## updateStudent
You can execute the `updateStudent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updateStudent(vars: UpdateStudentVariables): MutationPromise<UpdateStudentData, UpdateStudentVariables>;

interface UpdateStudentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStudentVariables): MutationRef<UpdateStudentData, UpdateStudentVariables>;
}
export const updateStudentRef: UpdateStudentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateStudent(dc: DataConnect, vars: UpdateStudentVariables): MutationPromise<UpdateStudentData, UpdateStudentVariables>;

interface UpdateStudentRef {
  ...
  (dc: DataConnect, vars: UpdateStudentVariables): MutationRef<UpdateStudentData, UpdateStudentVariables>;
}
export const updateStudentRef: UpdateStudentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateStudentRef:
```typescript
const name = updateStudentRef.operationName;
console.log(name);
```

### Variables
The `updateStudent` mutation requires an argument of type `UpdateStudentVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `updateStudent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateStudentData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateStudentData {
  student_update?: Student_Key | null;
}
```
### Using `updateStudent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateStudent, UpdateStudentVariables } from '@firebasegen/default-connector';

// The `updateStudent` mutation requires an argument of type `UpdateStudentVariables`:
const updateStudentVars: UpdateStudentVariables = {
  id: ..., // optional
  name: ..., 
  type: ..., 
  gender: ..., 
  dob: ..., 
  school: ..., 
  email: ..., 
  phoneNo: ..., 
  address: ..., 
  status: ..., 
  tuitionLoc: ..., 
};

// Call the `updateStudent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateStudent(updateStudentVars);
// Variables can be defined inline as well.
const { data } = await updateStudent({ id: ..., name: ..., type: ..., gender: ..., dob: ..., school: ..., email: ..., phoneNo: ..., address: ..., status: ..., tuitionLoc: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateStudent(dataConnect, updateStudentVars);

console.log(data.student_update);

// Or, you can use the `Promise` API.
updateStudent(updateStudentVars).then((response) => {
  const data = response.data;
  console.log(data.student_update);
});
```

### Using `updateStudent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateStudentRef, UpdateStudentVariables } from '@firebasegen/default-connector';

// The `updateStudent` mutation requires an argument of type `UpdateStudentVariables`:
const updateStudentVars: UpdateStudentVariables = {
  id: ..., // optional
  name: ..., 
  type: ..., 
  gender: ..., 
  dob: ..., 
  school: ..., 
  email: ..., 
  phoneNo: ..., 
  address: ..., 
  status: ..., 
  tuitionLoc: ..., 
};

// Call the `updateStudentRef()` function to get a reference to the mutation.
const ref = updateStudentRef(updateStudentVars);
// Variables can be defined inline as well.
const ref = updateStudentRef({ id: ..., name: ..., type: ..., gender: ..., dob: ..., school: ..., email: ..., phoneNo: ..., address: ..., status: ..., tuitionLoc: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateStudentRef(dataConnect, updateStudentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.student_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.student_update);
});
```

## createRegistrationLink
You can execute the `createRegistrationLink` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createRegistrationLink(vars: CreateRegistrationLinkVariables): MutationPromise<CreateRegistrationLinkData, CreateRegistrationLinkVariables>;

interface CreateRegistrationLinkRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateRegistrationLinkVariables): MutationRef<CreateRegistrationLinkData, CreateRegistrationLinkVariables>;
}
export const createRegistrationLinkRef: CreateRegistrationLinkRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createRegistrationLink(dc: DataConnect, vars: CreateRegistrationLinkVariables): MutationPromise<CreateRegistrationLinkData, CreateRegistrationLinkVariables>;

interface CreateRegistrationLinkRef {
  ...
  (dc: DataConnect, vars: CreateRegistrationLinkVariables): MutationRef<CreateRegistrationLinkData, CreateRegistrationLinkVariables>;
}
export const createRegistrationLinkRef: CreateRegistrationLinkRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createRegistrationLinkRef:
```typescript
const name = createRegistrationLinkRef.operationName;
console.log(name);
```

### Variables
The `createRegistrationLink` mutation requires an argument of type `CreateRegistrationLinkVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateRegistrationLinkVariables {
  expiryDate: TimestampString;
}
```
### Return Type
Recall that executing the `createRegistrationLink` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateRegistrationLinkData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateRegistrationLinkData {
  registrationLink_insert: RegistrationLink_Key;
}
```
### Using `createRegistrationLink`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createRegistrationLink, CreateRegistrationLinkVariables } from '@firebasegen/default-connector';

// The `createRegistrationLink` mutation requires an argument of type `CreateRegistrationLinkVariables`:
const createRegistrationLinkVars: CreateRegistrationLinkVariables = {
  expiryDate: ..., 
};

// Call the `createRegistrationLink()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createRegistrationLink(createRegistrationLinkVars);
// Variables can be defined inline as well.
const { data } = await createRegistrationLink({ expiryDate: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createRegistrationLink(dataConnect, createRegistrationLinkVars);

console.log(data.registrationLink_insert);

// Or, you can use the `Promise` API.
createRegistrationLink(createRegistrationLinkVars).then((response) => {
  const data = response.data;
  console.log(data.registrationLink_insert);
});
```

### Using `createRegistrationLink`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createRegistrationLinkRef, CreateRegistrationLinkVariables } from '@firebasegen/default-connector';

// The `createRegistrationLink` mutation requires an argument of type `CreateRegistrationLinkVariables`:
const createRegistrationLinkVars: CreateRegistrationLinkVariables = {
  expiryDate: ..., 
};

// Call the `createRegistrationLinkRef()` function to get a reference to the mutation.
const ref = createRegistrationLinkRef(createRegistrationLinkVars);
// Variables can be defined inline as well.
const ref = createRegistrationLinkRef({ expiryDate: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createRegistrationLinkRef(dataConnect, createRegistrationLinkVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.registrationLink_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.registrationLink_insert);
});
```

