import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import type * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date custom scalar type */
  DateTime: { input: any; output: any; }
};

export type AuthData = {
  __typename?: 'AuthData';
  expiresIn: Scalars['Int']['output'];
  token: Scalars['String']['output'];
  tokenType: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type AuthInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Bookmark = {
  __typename?: 'Bookmark';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdById?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  movieId: Scalars['String']['output'];
  profileId: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedById?: Maybe<Scalars['String']['output']>;
  userId: Scalars['ID']['output'];
};

export type BookmarkInput = {
  movieId: Scalars['String']['input'];
  profileId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBookmark: Bookmark;
  createProfile: Profile;
  createProfiles: Array<Profile>;
  createUser: Scalars['ID']['output'];
  deleteBookmark: Bookmark;
  deleteProfile: Profile;
  deleteUser: User;
  loginUser: AuthData;
  logoutUser: AuthData;
  updateProfile: Profile;
  updateUser: User;
};


export type MutationCreateBookmarkArgs = {
  input: BookmarkInput;
};


export type MutationCreateProfileArgs = {
  input: ProfileInput;
};


export type MutationCreateProfilesArgs = {
  input: Array<ProfileInput>;
};


export type MutationCreateUserArgs = {
  input?: InputMaybe<AuthInput>;
};


export type MutationDeleteBookmarkArgs = {
  input: BookmarkInput;
};


export type MutationDeleteProfileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  ID: Scalars['ID']['input'];
};


export type MutationLoginUserArgs = {
  input?: InputMaybe<AuthInput>;
};


export type MutationLogoutUserArgs = {
  ID: Scalars['ID']['input'];
};


export type MutationUpdateProfileArgs = {
  id: Scalars['ID']['input'];
  input: ProfileInput;
};


export type MutationUpdateUserArgs = {
  ID: Scalars['ID']['input'];
  input?: InputMaybe<UserInput>;
};

export type Profile = {
  __typename?: 'Profile';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdById?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedById?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

export type ProfileInput = {
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  bookmark: Bookmark;
  bookmarks: Array<Bookmark>;
  profile: Profile;
  profiles: Array<Profile>;
  user: User;
  users: Array<User>;
};


export type QueryBookmarkArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBookmarksArgs = {
  where?: InputMaybe<BookmarkFilterInput>;
};


export type QueryProfileArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProfilesArgs = {
  where?: InputMaybe<ProfileFilterInput>;
};


export type QueryUserArgs = {
  ID: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  where?: InputMaybe<UserFilterInput>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdById?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedById?: Maybe<Scalars['String']['output']>;
};

export type UserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type BookmarkFilterInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  movieId?: InputMaybe<Scalars['String']['input']>;
  profileId?: InputMaybe<Scalars['ID']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type ProfileFilterInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UserFilterInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: string };

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'AuthData', userId: string, token: string, expiresIn: number, tokenType: string } };

export type LogoutUserMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: { __typename?: 'AuthData', userId: string } };

export type GetMovieBookmarksQueryVariables = Exact<{
  movieId?: InputMaybe<Scalars['String']['input']>;
  profileId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
}>;


export type GetMovieBookmarksQuery = { __typename?: 'Query', bookmarks: Array<{ __typename?: 'Bookmark', id?: string | null, movieId: string }> };

export type CreateMovieBookmarkMutationVariables = Exact<{
  movieId: Scalars['String']['input'];
  profileId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
}>;


export type CreateMovieBookmarkMutation = { __typename?: 'Mutation', createBookmark: { __typename?: 'Bookmark', id?: string | null, movieId: string, profileId: string, userId: string } };

export type DeleteMovieBookmarkMutationVariables = Exact<{
  movieId: Scalars['String']['input'];
  profileId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
}>;


export type DeleteMovieBookmarkMutation = { __typename?: 'Mutation', deleteBookmark: { __typename?: 'Bookmark', id?: string | null, movieId: string, profileId: string, userId: string } };

export type GetProfilesQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetProfilesQuery = { __typename?: 'Query', profiles: Array<{ __typename?: 'Profile', id?: string | null, name: string, image?: string | null }> };

export type CreateProfileMutationVariables = Exact<{
  input: ProfileInput;
}>;


export type CreateProfileMutation = { __typename?: 'Mutation', createProfile: { __typename?: 'Profile', id?: string | null, name: string, image?: string | null, userId: string } };

export type CreateProfilesMutationVariables = Exact<{
  input: Array<ProfileInput> | ProfileInput;
}>;


export type CreateProfilesMutation = { __typename?: 'Mutation', createProfiles: Array<{ __typename?: 'Profile', id?: string | null, name: string, image?: string | null, userId: string }> };

export type UpdateProfileMutationVariables = Exact<{
  profileId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'Profile', id?: string | null, name: string, image?: string | null, userId: string } };

export type UserFragmentFragment = { __typename?: 'User', id?: string | null, email: string, token?: string | null, createdAt?: any | null, updatedAt?: any | null, createdById?: string | null, updatedById?: string | null };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id?: string | null, email: string, token?: string | null, createdAt?: any | null, updatedAt?: any | null, createdById?: string | null, updatedById?: string | null } };

export type GetUserRoleAsAnonymousQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type GetUserRoleAsAnonymousQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id?: string | null }> };

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  email
  token
  createdAt
  updatedAt
  createdById
  updatedById
}
    `;
export const CreateUserDocument = gql`
    mutation CreateUser($email: String!, $password: String!) {
  createUser(input: {email: $email, password: $password})
}
    `;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateUserMutation({
 *   variables: {
 *     email: // value for 'email'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(options: VueApolloComposable.UseMutationOptions<CreateUserMutation, CreateUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateUserMutation, CreateUserMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
}
export type CreateUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateUserMutation, CreateUserMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($email: String!, $password: String!) {
  loginUser(input: {email: $email, password: $password}) {
    userId
    token
    expiresIn
    tokenType
  }
}
    `;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginUserMutation({
 *   variables: {
 *     email: // value for 'email'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(options: VueApolloComposable.UseMutationOptions<LoginUserMutation, LoginUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LoginUserMutation, LoginUserMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
}
export type LoginUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = gql`
    mutation LogoutUser($userId: ID!) {
  logoutUser(ID: $userId) {
    userId
  }
}
    `;

/**
 * __useLogoutUserMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLogoutUserMutation({
 *   variables: {
 *     userId: // value for 'userId'
 *   },
 * });
 */
export function useLogoutUserMutation(options: VueApolloComposable.UseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, options);
}
export type LogoutUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LogoutUserMutation, LogoutUserMutationVariables>;
export const GetMovieBookmarksDocument = gql`
    query GetMovieBookmarks($movieId: String, $profileId: ID!, $userId: ID!) {
  bookmarks(where: {movieId: $movieId, profileId: $profileId, userId: $userId}) {
    id
    movieId
  }
}
    `;

/**
 * __useGetMovieBookmarksQuery__
 *
 * To run a query within a Vue component, call `useGetMovieBookmarksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMovieBookmarksQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetMovieBookmarksQuery({
 *   movieId: // value for 'movieId'
 *   profileId: // value for 'profileId'
 *   userId: // value for 'userId'
 * });
 */
export function useGetMovieBookmarksQuery(variables: GetMovieBookmarksQueryVariables | VueCompositionApi.Ref<GetMovieBookmarksQueryVariables> | ReactiveFunction<GetMovieBookmarksQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetMovieBookmarksQuery, GetMovieBookmarksQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetMovieBookmarksQuery, GetMovieBookmarksQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetMovieBookmarksQuery, GetMovieBookmarksQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetMovieBookmarksQuery, GetMovieBookmarksQueryVariables>(GetMovieBookmarksDocument, variables, options);
}
export function useGetMovieBookmarksLazyQuery(variables: GetMovieBookmarksQueryVariables | VueCompositionApi.Ref<GetMovieBookmarksQueryVariables> | ReactiveFunction<GetMovieBookmarksQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetMovieBookmarksQuery, GetMovieBookmarksQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetMovieBookmarksQuery, GetMovieBookmarksQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetMovieBookmarksQuery, GetMovieBookmarksQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetMovieBookmarksQuery, GetMovieBookmarksQueryVariables>(GetMovieBookmarksDocument, variables, options);
}
export type GetMovieBookmarksQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetMovieBookmarksQuery, GetMovieBookmarksQueryVariables>;
export const CreateMovieBookmarkDocument = gql`
    mutation CreateMovieBookmark($movieId: String!, $profileId: ID!, $userId: ID!) {
  createBookmark(
    input: {movieId: $movieId, profileId: $profileId, userId: $userId}
  ) {
    id
    movieId
    profileId
    userId
  }
}
    `;

/**
 * __useCreateMovieBookmarkMutation__
 *
 * To run a mutation, you first call `useCreateMovieBookmarkMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateMovieBookmarkMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateMovieBookmarkMutation({
 *   variables: {
 *     movieId: // value for 'movieId'
 *     profileId: // value for 'profileId'
 *     userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateMovieBookmarkMutation(options: VueApolloComposable.UseMutationOptions<CreateMovieBookmarkMutation, CreateMovieBookmarkMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateMovieBookmarkMutation, CreateMovieBookmarkMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateMovieBookmarkMutation, CreateMovieBookmarkMutationVariables>(CreateMovieBookmarkDocument, options);
}
export type CreateMovieBookmarkMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateMovieBookmarkMutation, CreateMovieBookmarkMutationVariables>;
export const DeleteMovieBookmarkDocument = gql`
    mutation DeleteMovieBookmark($movieId: String!, $profileId: ID!, $userId: ID!) {
  deleteBookmark(
    input: {movieId: $movieId, profileId: $profileId, userId: $userId}
  ) {
    id
    movieId
    profileId
    userId
  }
}
    `;

/**
 * __useDeleteMovieBookmarkMutation__
 *
 * To run a mutation, you first call `useDeleteMovieBookmarkMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMovieBookmarkMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteMovieBookmarkMutation({
 *   variables: {
 *     movieId: // value for 'movieId'
 *     profileId: // value for 'profileId'
 *     userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteMovieBookmarkMutation(options: VueApolloComposable.UseMutationOptions<DeleteMovieBookmarkMutation, DeleteMovieBookmarkMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeleteMovieBookmarkMutation, DeleteMovieBookmarkMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<DeleteMovieBookmarkMutation, DeleteMovieBookmarkMutationVariables>(DeleteMovieBookmarkDocument, options);
}
export type DeleteMovieBookmarkMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeleteMovieBookmarkMutation, DeleteMovieBookmarkMutationVariables>;
export const GetProfilesDocument = gql`
    query GetProfiles($userId: String) {
  profiles(where: {userId: $userId}) {
    id
    name
    image
  }
}
    `;

/**
 * __useGetProfilesQuery__
 *
 * To run a query within a Vue component, call `useGetProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfilesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetProfilesQuery({
 *   userId: // value for 'userId'
 * });
 */
export function useGetProfilesQuery(variables: GetProfilesQueryVariables | VueCompositionApi.Ref<GetProfilesQueryVariables> | ReactiveFunction<GetProfilesQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<GetProfilesQuery, GetProfilesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetProfilesQuery, GetProfilesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetProfilesQuery, GetProfilesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetProfilesQuery, GetProfilesQueryVariables>(GetProfilesDocument, variables, options);
}
export function useGetProfilesLazyQuery(variables: GetProfilesQueryVariables | VueCompositionApi.Ref<GetProfilesQueryVariables> | ReactiveFunction<GetProfilesQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<GetProfilesQuery, GetProfilesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetProfilesQuery, GetProfilesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetProfilesQuery, GetProfilesQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetProfilesQuery, GetProfilesQueryVariables>(GetProfilesDocument, variables, options);
}
export type GetProfilesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetProfilesQuery, GetProfilesQueryVariables>;
export const CreateProfileDocument = gql`
    mutation CreateProfile($input: ProfileInput!) {
  createProfile(input: $input) {
    id
    name
    image
    userId
  }
}
    `;

/**
 * __useCreateProfileMutation__
 *
 * To run a mutation, you first call `useCreateProfileMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateProfileMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateProfileMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateProfileMutation(options: VueApolloComposable.UseMutationOptions<CreateProfileMutation, CreateProfileMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateProfileMutation, CreateProfileMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateProfileMutation, CreateProfileMutationVariables>(CreateProfileDocument, options);
}
export type CreateProfileMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateProfileMutation, CreateProfileMutationVariables>;
export const CreateProfilesDocument = gql`
    mutation CreateProfiles($input: [ProfileInput!]!) {
  createProfiles(input: $input) {
    id
    name
    image
    userId
  }
}
    `;

/**
 * __useCreateProfilesMutation__
 *
 * To run a mutation, you first call `useCreateProfilesMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateProfilesMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateProfilesMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateProfilesMutation(options: VueApolloComposable.UseMutationOptions<CreateProfilesMutation, CreateProfilesMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateProfilesMutation, CreateProfilesMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateProfilesMutation, CreateProfilesMutationVariables>(CreateProfilesDocument, options);
}
export type CreateProfilesMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateProfilesMutation, CreateProfilesMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($profileId: ID!, $name: String!, $userId: String!) {
  updateProfile(id: $profileId, input: {name: $name, userId: $userId}) {
    id
    name
    image
    userId
  }
}
    `;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateProfileMutation({
 *   variables: {
 *     profileId: // value for 'profileId'
 *     name: // value for 'name'
 *     userId: // value for 'userId'
 *   },
 * });
 */
export function useUpdateProfileMutation(options: VueApolloComposable.UseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
}
export type UpdateProfileMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const GetUserDocument = gql`
    query GetUser($id: ID!) {
  user(ID: $id) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a Vue component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetUserQuery({
 *   id: // value for 'id'
 * });
 */
export function useGetUserQuery(variables: GetUserQueryVariables | VueCompositionApi.Ref<GetUserQueryVariables> | ReactiveFunction<GetUserQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetUserQuery, GetUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetUserQuery, GetUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetUserQuery, GetUserQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, variables, options);
}
export function useGetUserLazyQuery(variables: GetUserQueryVariables | VueCompositionApi.Ref<GetUserQueryVariables> | ReactiveFunction<GetUserQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetUserQuery, GetUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetUserQuery, GetUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetUserQuery, GetUserQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, variables, options);
}
export type GetUserQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetUserQuery, GetUserQueryVariables>;
export const GetUserRoleAsAnonymousDocument = gql`
    query GetUserRoleAsAnonymous($email: String!) {
  users(where: {email: $email}) {
    id
  }
}
    `;

/**
 * __useGetUserRoleAsAnonymousQuery__
 *
 * To run a query within a Vue component, call `useGetUserRoleAsAnonymousQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserRoleAsAnonymousQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetUserRoleAsAnonymousQuery({
 *   email: // value for 'email'
 * });
 */
export function useGetUserRoleAsAnonymousQuery(variables: GetUserRoleAsAnonymousQueryVariables | VueCompositionApi.Ref<GetUserRoleAsAnonymousQueryVariables> | ReactiveFunction<GetUserRoleAsAnonymousQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetUserRoleAsAnonymousQuery, GetUserRoleAsAnonymousQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetUserRoleAsAnonymousQuery, GetUserRoleAsAnonymousQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetUserRoleAsAnonymousQuery, GetUserRoleAsAnonymousQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetUserRoleAsAnonymousQuery, GetUserRoleAsAnonymousQueryVariables>(GetUserRoleAsAnonymousDocument, variables, options);
}
export function useGetUserRoleAsAnonymousLazyQuery(variables: GetUserRoleAsAnonymousQueryVariables | VueCompositionApi.Ref<GetUserRoleAsAnonymousQueryVariables> | ReactiveFunction<GetUserRoleAsAnonymousQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetUserRoleAsAnonymousQuery, GetUserRoleAsAnonymousQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetUserRoleAsAnonymousQuery, GetUserRoleAsAnonymousQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetUserRoleAsAnonymousQuery, GetUserRoleAsAnonymousQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetUserRoleAsAnonymousQuery, GetUserRoleAsAnonymousQueryVariables>(GetUserRoleAsAnonymousDocument, variables, options);
}
export type GetUserRoleAsAnonymousQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetUserRoleAsAnonymousQuery, GetUserRoleAsAnonymousQueryVariables>;