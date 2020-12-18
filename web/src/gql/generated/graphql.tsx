import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  me: User;
  listMessagesOfSpecificContact: Array<Message>;
  listFirstMessageOfAllYourConversations: Array<ContactWithLastMessage>;
};

export type QueryListMessagesOfSpecificContactArgs = {
  contact_id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  about?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['Float']>;
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  to: Scalars['String'];
  from: Scalars['String'];
  text: Scalars['String'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export type ContactWithLastMessage = {
  __typename?: 'ContactWithLastMessage';
  user: User;
  message: Message;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: User;
  login: LoginResponse;
  updateUser: User;
  sendMessage: Message;
};

export type MutationRegisterArgs = {
  about?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type MutationUpdateUserArgs = {
  password?: Maybe<Scalars['String']>;
  old_password?: Maybe<Scalars['String']>;
  avatar: Scalars['Float'];
  about: Scalars['String'];
  username: Scalars['String'];
};

export type MutationSendMessageArgs = {
  text: Scalars['String'];
  to: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  user: User;
  token: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
};

export type SubscriptionNewMessageArgs = {
  topic: Scalars['String'];
};

export type RegisterMutationVariables = Exact<{
  about?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
}>;

export type RegisterMutation = { __typename?: 'Mutation' } & {
  register: { __typename?: 'User' } & Pick<User, 'id'>;
};

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  username: Scalars['String'];
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'LoginResponse' } & Pick<LoginResponse, 'token'> & {
      user: { __typename?: 'User' } & Pick<
        User,
        'id' | 'username' | 'about' | 'avatar'
      >;
    };
};

export type UpdateUserMutationVariables = Exact<{
  password?: Maybe<Scalars['String']>;
  old_password?: Maybe<Scalars['String']>;
  avatar: Scalars['Float'];
  about: Scalars['String'];
  username: Scalars['String'];
}>;

export type UpdateUserMutation = { __typename?: 'Mutation' } & {
  updateUser: { __typename?: 'User' } & Pick<
    User,
    'username' | 'about' | 'avatar'
  >;
};

export type SendMessageMutationVariables = Exact<{
  text: Scalars['String'];
  to: Scalars['String'];
}>;

export type SendMessageMutation = { __typename?: 'Mutation' } & {
  sendMessage: { __typename?: 'Message' } & Pick<
    Message,
    'id' | 'to' | 'from' | 'text' | 'created_at'
  >;
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = { __typename?: 'Query' } & {
  users: Array<
    { __typename?: 'User' } & Pick<User, 'id' | 'username' | 'about' | 'avatar'>
  >;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & Pick<User, 'username' | 'about' | 'avatar'>;
};

export type ListMessagesOfSpecificContactQueryVariables = Exact<{
  contact_id: Scalars['String'];
}>;

export type ListMessagesOfSpecificContactQuery = { __typename?: 'Query' } & {
  listMessagesOfSpecificContact: Array<
    { __typename?: 'Message' } & Pick<
      Message,
      'id' | 'to' | 'from' | 'text' | 'created_at'
    >
  >;
};

export type ListFirstMessageOfAllYourConversationsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type ListFirstMessageOfAllYourConversationsQuery = {
  __typename?: 'Query';
} & {
  listFirstMessageOfAllYourConversations: Array<
    { __typename?: 'ContactWithLastMessage' } & {
      message: { __typename?: 'Message' } & Pick<
        Message,
        'created_at' | 'text'
      >;
      user: { __typename?: 'User' } & Pick<User, 'id' | 'username' | 'avatar'>;
    }
  >;
};

export type NewMessageSubscriptionVariables = Exact<{
  topic: Scalars['String'];
}>;

export type NewMessageSubscription = { __typename?: 'Subscription' } & {
  newMessage: { __typename?: 'Message' } & Pick<
    Message,
    'to' | 'from' | 'text' | 'created_at'
  >;
};

export const RegisterDocument = gql`
  mutation Register($about: String, $password: String!, $username: String!) {
    register(about: $about, password: $password, username: $username) {
      id
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      about: // value for 'about'
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    baseOptions,
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($password: String!, $username: String!) {
    login(username: $username, password: $password) {
      user {
        id
        username
        about
        avatar
      }
      token
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions,
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation UpdateUser(
    $password: String
    $old_password: String
    $avatar: Float!
    $about: String!
    $username: String!
  ) {
    updateUser(
      password: $password
      old_password: $old_password
      avatar: $avatar
      about: $about
      username: $username
    ) {
      username
      about
      avatar
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      password: // value for 'password'
 *      old_password: // value for 'old_password'
 *      avatar: // value for 'avatar'
 *      about: // value for 'about'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) {
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    baseOptions,
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const SendMessageDocument = gql`
  mutation SendMessage($text: String!, $to: String!) {
    sendMessage(text: $text, to: $to) {
      id
      to
      from
      text
      created_at
    }
  }
`;
export type SendMessageMutationFn = Apollo.MutationFunction<
  SendMessageMutation,
  SendMessageMutationVariables
>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      text: // value for 'text'
 *      to: // value for 'to'
 *   },
 * });
 */
export function useSendMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendMessageMutation,
    SendMessageMutationVariables
  >,
) {
  return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(
    SendMessageDocument,
    baseOptions,
  );
}
export type SendMessageMutationHookResult = ReturnType<
  typeof useSendMessageMutation
>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<
  SendMessageMutation,
  SendMessageMutationVariables
>;
export const UsersDocument = gql`
  query Users {
    users {
      id
      username
      about
      avatar
    }
  }
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions,
  );
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions,
  );
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<
  UsersQuery,
  UsersQueryVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      username
      about
      avatar
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>,
) {
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>,
) {
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions,
  );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ListMessagesOfSpecificContactDocument = gql`
  query ListMessagesOfSpecificContact($contact_id: String!) {
    listMessagesOfSpecificContact(contact_id: $contact_id) {
      id
      to
      from
      text
      created_at
    }
  }
`;

/**
 * __useListMessagesOfSpecificContactQuery__
 *
 * To run a query within a React component, call `useListMessagesOfSpecificContactQuery` and pass it any options that fit your needs.
 * When your component renders, `useListMessagesOfSpecificContactQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListMessagesOfSpecificContactQuery({
 *   variables: {
 *      contact_id: // value for 'contact_id'
 *   },
 * });
 */
export function useListMessagesOfSpecificContactQuery(
  baseOptions: Apollo.QueryHookOptions<
    ListMessagesOfSpecificContactQuery,
    ListMessagesOfSpecificContactQueryVariables
  >,
) {
  return Apollo.useQuery<
    ListMessagesOfSpecificContactQuery,
    ListMessagesOfSpecificContactQueryVariables
  >(ListMessagesOfSpecificContactDocument, baseOptions);
}
export function useListMessagesOfSpecificContactLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListMessagesOfSpecificContactQuery,
    ListMessagesOfSpecificContactQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    ListMessagesOfSpecificContactQuery,
    ListMessagesOfSpecificContactQueryVariables
  >(ListMessagesOfSpecificContactDocument, baseOptions);
}
export type ListMessagesOfSpecificContactQueryHookResult = ReturnType<
  typeof useListMessagesOfSpecificContactQuery
>;
export type ListMessagesOfSpecificContactLazyQueryHookResult = ReturnType<
  typeof useListMessagesOfSpecificContactLazyQuery
>;
export type ListMessagesOfSpecificContactQueryResult = Apollo.QueryResult<
  ListMessagesOfSpecificContactQuery,
  ListMessagesOfSpecificContactQueryVariables
>;
export const ListFirstMessageOfAllYourConversationsDocument = gql`
  query ListFirstMessageOfAllYourConversations {
    listFirstMessageOfAllYourConversations {
      message {
        created_at
        text
      }
      user {
        id
        username
        avatar
      }
    }
  }
`;

/**
 * __useListFirstMessageOfAllYourConversationsQuery__
 *
 * To run a query within a React component, call `useListFirstMessageOfAllYourConversationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListFirstMessageOfAllYourConversationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListFirstMessageOfAllYourConversationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListFirstMessageOfAllYourConversationsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ListFirstMessageOfAllYourConversationsQuery,
    ListFirstMessageOfAllYourConversationsQueryVariables
  >,
) {
  return Apollo.useQuery<
    ListFirstMessageOfAllYourConversationsQuery,
    ListFirstMessageOfAllYourConversationsQueryVariables
  >(ListFirstMessageOfAllYourConversationsDocument, baseOptions);
}
export function useListFirstMessageOfAllYourConversationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListFirstMessageOfAllYourConversationsQuery,
    ListFirstMessageOfAllYourConversationsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    ListFirstMessageOfAllYourConversationsQuery,
    ListFirstMessageOfAllYourConversationsQueryVariables
  >(ListFirstMessageOfAllYourConversationsDocument, baseOptions);
}
export type ListFirstMessageOfAllYourConversationsQueryHookResult = ReturnType<
  typeof useListFirstMessageOfAllYourConversationsQuery
>;
export type ListFirstMessageOfAllYourConversationsLazyQueryHookResult = ReturnType<
  typeof useListFirstMessageOfAllYourConversationsLazyQuery
>;
export type ListFirstMessageOfAllYourConversationsQueryResult = Apollo.QueryResult<
  ListFirstMessageOfAllYourConversationsQuery,
  ListFirstMessageOfAllYourConversationsQueryVariables
>;
export const NewMessageDocument = gql`
  subscription NewMessage($topic: String!) {
    newMessage(topic: $topic) {
      to
      from
      text
      created_at
    }
  }
`;

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *      topic: // value for 'topic'
 *   },
 * });
 */
export function useNewMessageSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    NewMessageSubscription,
    NewMessageSubscriptionVariables
  >,
) {
  return Apollo.useSubscription<
    NewMessageSubscription,
    NewMessageSubscriptionVariables
  >(NewMessageDocument, baseOptions);
}
export type NewMessageSubscriptionHookResult = ReturnType<
  typeof useNewMessageSubscription
>;
export type NewMessageSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscription>;
