# Table of Contents
- [**Overview**](#generated-typescript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListAllTutors*](#listalltutors)
  - [*ListTutorByName*](#listtutorbyname)
- [**Mutations**](#mutations)
  - [*UpdateTutor*](#updatetutor)
  - [*AddTutor*](#addtutor)

# Generated TypeScript README
This README will guide you through the process of using the generated TypeScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@firebasegen/default-connector` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```javascript
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

## ListAllTutors
You can execute the `ListAllTutors` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```javascript
listAllTutors(): QueryPromise<ListAllTutorsData, undefined>;

listAllTutorsRef(): QueryRef<ListAllTutorsData, undefined>;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```javascript
listAllTutors(dc: DataConnect): QueryPromise<ListAllTutorsData, undefined>;

listAllTutorsRef(dc: DataConnect): QueryRef<ListAllTutorsData, undefined>;
```

### Variables
The `ListAllTutors` query has no variables.
### Return Type
Recall that executing the `ListAllTutors` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllTutorsData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```javascript
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
```
### Using `ListAllTutors`'s action shortcut function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllTutors } from '@firebasegen/default-connector';


// Call the `listAllTutors()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllTutors();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllTutors(dataConnect);

console.log(data.tutors);

// Or, you can use the `Promise` API.
listAllTutors().then((response) => {
  const data = response.data;
  console.log(data.tutors);
});
```

### Using `ListAllTutors`'s `QueryRef` function

```javascript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllTutorsRef } from '@firebasegen/default-connector';


// Call the `listAllTutorsRef()` function to get a reference to the query.
const ref = listAllTutorsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllTutorsRef(dataConnect);

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

## ListTutorByName
You can execute the `ListTutorByName` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```javascript
listTutorByName(vars: ListTutorByNameVariables): QueryPromise<ListTutorByNameData, ListTutorByNameVariables>;

listTutorByNameRef(vars: ListTutorByNameVariables): QueryRef<ListTutorByNameData, ListTutorByNameVariables>;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```javascript
listTutorByName(dc: DataConnect, vars: ListTutorByNameVariables): QueryPromise<ListTutorByNameData, ListTutorByNameVariables>;

listTutorByNameRef(dc: DataConnect, vars: ListTutorByNameVariables): QueryRef<ListTutorByNameData, ListTutorByNameVariables>;
```

### Variables
The `ListTutorByName` query requires an argument of type `ListTutorByNameVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```javascript
export interface ListTutorByNameVariables {
  name: string;
}
```
### Return Type
Recall that executing the `ListTutorByName` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTutorByNameData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```javascript
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
```
### Using `ListTutorByName`'s action shortcut function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTutorByName, ListTutorByNameVariables } from '@firebasegen/default-connector';

// The `ListTutorByName` query requires an argument of type `ListTutorByNameVariables`:
const listTutorByNameVars: ListTutorByNameVariables = {
  name: ..., 
};

// Call the `listTutorByName()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTutorByName(listTutorByNameVars);
// Variables can be defined inline as well.
const { data } = await listTutorByName({ name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTutorByName(dataConnect, listTutorByNameVars);

console.log(data.tutors);

// Or, you can use the `Promise` API.
listTutorByName(listTutorByNameVars).then((response) => {
  const data = response.data;
  console.log(data.tutors);
});
```

### Using `ListTutorByName`'s `QueryRef` function

```javascript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTutorByNameRef, ListTutorByNameVariables } from '@firebasegen/default-connector';

// The `ListTutorByName` query requires an argument of type `ListTutorByNameVariables`:
const listTutorByNameVars: ListTutorByNameVariables = {
  name: ..., 
};

// Call the `listTutorByNameRef()` function to get a reference to the query.
const ref = listTutorByNameRef(listTutorByNameVars);
// Variables can be defined inline as well.
const ref = listTutorByNameRef({ name: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTutorByNameRef(dataConnect, listTutorByNameVars);

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
```javascript
updateTutor(vars: UpdateTutorVariables): MutationPromise<UpdateTutorData, UpdateTutorVariables>;

updateTutorRef(vars: UpdateTutorVariables): MutationRef<UpdateTutorData, UpdateTutorVariables>;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```javascript
updateTutor(dc: DataConnect, vars: UpdateTutorVariables): MutationPromise<UpdateTutorData, UpdateTutorVariables>;

updateTutorRef(dc: DataConnect, vars: UpdateTutorVariables): MutationRef<UpdateTutorData, UpdateTutorVariables>;
```

### Variables
The `UpdateTutor` mutation requires an argument of type `UpdateTutorVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```javascript
export interface UpdateTutorVariables {
  id: UUIDString;
  name: string;
  tutortype: string;
  gender: string;
  email: string;
  phoneNo: string;
  address: string;
}
```
### Return Type
Recall that executing the `UpdateTutor` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTutorData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```javascript
export interface UpdateTutorData {
  tutor_update?: Tutor_Key | null;
}
```
### Using `UpdateTutor`'s action shortcut function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTutor, UpdateTutorVariables } from '@firebasegen/default-connector';

// The `UpdateTutor` mutation requires an argument of type `UpdateTutorVariables`:
const updateTutorVars: UpdateTutorVariables = {
  id: ..., 
  name: ..., 
  tutortype: ..., 
  gender: ..., 
  email: ..., 
  phoneNo: ..., 
  address: ..., 
};

// Call the `updateTutor()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTutor(updateTutorVars);
// Variables can be defined inline as well.
const { data } = await updateTutor({ id: ..., name: ..., tutortype: ..., gender: ..., email: ..., phoneNo: ..., address: ..., });

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

```javascript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTutorRef, UpdateTutorVariables } from '@firebasegen/default-connector';

// The `UpdateTutor` mutation requires an argument of type `UpdateTutorVariables`:
const updateTutorVars: UpdateTutorVariables = {
  id: ..., 
  name: ..., 
  tutortype: ..., 
  gender: ..., 
  email: ..., 
  phoneNo: ..., 
  address: ..., 
};

// Call the `updateTutorRef()` function to get a reference to the mutation.
const ref = updateTutorRef(updateTutorVars);
// Variables can be defined inline as well.
const ref = updateTutorRef({ id: ..., name: ..., tutortype: ..., gender: ..., email: ..., phoneNo: ..., address: ..., });

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

## AddTutor
You can execute the `AddTutor` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```javascript
addTutor(vars: AddTutorVariables): MutationPromise<AddTutorData, AddTutorVariables>;

addTutorRef(vars: AddTutorVariables): MutationRef<AddTutorData, AddTutorVariables>;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```javascript
addTutor(dc: DataConnect, vars: AddTutorVariables): MutationPromise<AddTutorData, AddTutorVariables>;

addTutorRef(dc: DataConnect, vars: AddTutorVariables): MutationRef<AddTutorData, AddTutorVariables>;
```

### Variables
The `AddTutor` mutation requires an argument of type `AddTutorVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```javascript
export interface AddTutorVariables {
  name: string;
  tutortype: string;
  gender: string;
  email: string;
  phoneNo: string;
  address: string;
}
```
### Return Type
Recall that executing the `AddTutor` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddTutorData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```javascript
export interface AddTutorData {
  tutor_insert: Tutor_Key;
}
```
### Using `AddTutor`'s action shortcut function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addTutor, AddTutorVariables } from '@firebasegen/default-connector';

// The `AddTutor` mutation requires an argument of type `AddTutorVariables`:
const addTutorVars: AddTutorVariables = {
  name: ..., 
  tutortype: ..., 
  gender: ..., 
  email: ..., 
  phoneNo: ..., 
  address: ..., 
};

// Call the `addTutor()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addTutor(addTutorVars);
// Variables can be defined inline as well.
const { data } = await addTutor({ name: ..., tutortype: ..., gender: ..., email: ..., phoneNo: ..., address: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addTutor(dataConnect, addTutorVars);

console.log(data.tutor_insert);

// Or, you can use the `Promise` API.
addTutor(addTutorVars).then((response) => {
  const data = response.data;
  console.log(data.tutor_insert);
});
```

### Using `AddTutor`'s `MutationRef` function

```javascript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addTutorRef, AddTutorVariables } from '@firebasegen/default-connector';

// The `AddTutor` mutation requires an argument of type `AddTutorVariables`:
const addTutorVars: AddTutorVariables = {
  name: ..., 
  tutortype: ..., 
  gender: ..., 
  email: ..., 
  phoneNo: ..., 
  address: ..., 
};

// Call the `addTutorRef()` function to get a reference to the mutation.
const ref = addTutorRef(addTutorVars);
// Variables can be defined inline as well.
const ref = addTutorRef({ name: ..., tutortype: ..., gender: ..., email: ..., phoneNo: ..., address: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addTutorRef(dataConnect, addTutorVars);

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

