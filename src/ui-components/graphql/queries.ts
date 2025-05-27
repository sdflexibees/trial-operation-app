/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLaunchJob = /* GraphQL */ `
  query GetLaunchJob($id: ID!) {
    getLaunchJob(id: $id) {
      candidate_pricing
      client_id
      client_pricing
      consultant_id
      contract_duration
      createdAt
      created_at
      id
      job_id
      launch_date
      notes
      status
      termination_date
      updatedAt
      updated_at
      __typename
    }
  }
`;
export const listLaunchJobs = /* GraphQL */ `
  query ListLaunchJobs(
    $filter: ModelLaunchJobFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLaunchJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        candidate_pricing
        client_id
        client_pricing
        consultant_id
        contract_duration
        createdAt
        created_at
        id
        job_id
        launch_date
        notes
        status
        termination_date
        updatedAt
        updated_at
        __typename
      }
      nextToken
      __typename
    }
  }
`;
