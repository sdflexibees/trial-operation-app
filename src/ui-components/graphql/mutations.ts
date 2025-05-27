/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLaunchJob = /* GraphQL */ `
  mutation CreateLaunchJob(
    $condition: ModelLaunchJobConditionInput
    $input: CreateLaunchJobInput!
  ) {
    createLaunchJob(condition: $condition, input: $input) {
      candidate_pricing
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
export const deleteLaunchJob = /* GraphQL */ `
  mutation DeleteLaunchJob(
    $condition: ModelLaunchJobConditionInput
    $input: DeleteLaunchJobInput!
  ) {
    deleteLaunchJob(condition: $condition, input: $input) {
      candidate_pricing
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
export const updateLaunchJob = /* GraphQL */ `
  mutation UpdateLaunchJob(
    $condition: ModelLaunchJobConditionInput
    $input: UpdateLaunchJobInput!
  ) {
    updateLaunchJob(condition: $condition, input: $input) {
      candidate_pricing
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
