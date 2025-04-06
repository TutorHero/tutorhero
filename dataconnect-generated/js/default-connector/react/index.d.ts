import { UpdateTutorData, UpdateTutorVariables, AddTutorData, AddTutorVariables, ListAllTutorsData, ListTutorByNameData, ListTutorByNameVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useUpdateTutor(options?: useDataConnectMutationOptions<UpdateTutorData, FirebaseError, UpdateTutorVariables>): UseDataConnectMutationResult<UpdateTutorData, UpdateTutorVariables>;
export function useUpdateTutor(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTutorData, FirebaseError, UpdateTutorVariables>): UseDataConnectMutationResult<UpdateTutorData, UpdateTutorVariables>;

export function useAddTutor(options?: useDataConnectMutationOptions<AddTutorData, FirebaseError, AddTutorVariables>): UseDataConnectMutationResult<AddTutorData, AddTutorVariables>;
export function useAddTutor(dc: DataConnect, options?: useDataConnectMutationOptions<AddTutorData, FirebaseError, AddTutorVariables>): UseDataConnectMutationResult<AddTutorData, AddTutorVariables>;

export function useListAllTutors(options?: useDataConnectQueryOptions<ListAllTutorsData>): UseDataConnectQueryResult<ListAllTutorsData, undefined>;
export function useListAllTutors(dc: DataConnect, options?: useDataConnectQueryOptions<ListAllTutorsData>): UseDataConnectQueryResult<ListAllTutorsData, undefined>;

export function useListTutorByName(vars: ListTutorByNameVariables, options?: useDataConnectQueryOptions<ListTutorByNameData>): UseDataConnectQueryResult<ListTutorByNameData, ListTutorByNameVariables>;
export function useListTutorByName(dc: DataConnect, vars: ListTutorByNameVariables, options?: useDataConnectQueryOptions<ListTutorByNameData>): UseDataConnectQueryResult<ListTutorByNameData, ListTutorByNameVariables>;
