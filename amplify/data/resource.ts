import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  LaunchJob: a
    .model({
      id: a.integer().required(),
      notes: a.string(),
      job_id: a.integer().required(),
      launch_date: a.date().required(),
      termination_date: a.date(),
      consultant_id: a.integer().required(),
      created_at: a.date(),
      updated_at: a.date(),
      client_id: a.string().required(),
      contract_duration: a.integer().required(),
      client_pricing: a.float(),
      candidate_pricing: a.float(),
      status: a.string()
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
