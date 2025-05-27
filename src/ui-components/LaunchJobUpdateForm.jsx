/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getLaunchJob } from "./graphql/queries";
import { updateLaunchJob } from "./graphql/mutations";
const client = generateClient();
export default function LaunchJobUpdateForm(props) {
  const {
    id: idProp,
    launchJob: launchJobModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    notes: "",
    job_id: "",
    launch_date: "",
    termination_date: "",
    consultant_id: "",
    created_at: "",
    updated_at: "",
    client_id: "",
    contract_duration: "",
    client_pricing: "",
    candidate_pricing: "",
    status: "",
  };
  const [notes, setNotes] = React.useState(initialValues.notes);
  const [job_id, setJob_id] = React.useState(initialValues.job_id);
  const [launch_date, setLaunch_date] = React.useState(
    initialValues.launch_date
  );
  const [termination_date, setTermination_date] = React.useState(
    initialValues.termination_date
  );
  const [consultant_id, setConsultant_id] = React.useState(
    initialValues.consultant_id
  );
  const [created_at, setCreated_at] = React.useState(initialValues.created_at);
  const [updated_at, setUpdated_at] = React.useState(initialValues.updated_at);
  const [client_id, setClient_id] = React.useState(initialValues.client_id);
  const [contract_duration, setContract_duration] = React.useState(
    initialValues.contract_duration
  );
  const [client_pricing, setClient_pricing] = React.useState(
    initialValues.client_pricing
  );
  const [candidate_pricing, setCandidate_pricing] = React.useState(
    initialValues.candidate_pricing
  );
  const [status, setStatus] = React.useState(initialValues.status);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = launchJobRecord
      ? { ...initialValues, ...launchJobRecord }
      : initialValues;
    setNotes(cleanValues.notes);
    setJob_id(cleanValues.job_id);
    setLaunch_date(cleanValues.launch_date);
    setTermination_date(cleanValues.termination_date);
    setConsultant_id(cleanValues.consultant_id);
    setCreated_at(cleanValues.created_at);
    setUpdated_at(cleanValues.updated_at);
    setClient_id(cleanValues.client_id);
    setContract_duration(cleanValues.contract_duration);
    setClient_pricing(cleanValues.client_pricing);
    setCandidate_pricing(cleanValues.candidate_pricing);
    setStatus(cleanValues.status);
    setErrors({});
  };
  const [launchJobRecord, setLaunchJobRecord] =
    React.useState(launchJobModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getLaunchJob.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getLaunchJob
        : launchJobModelProp;
      setLaunchJobRecord(record);
    };
    queryData();
  }, [idProp, launchJobModelProp]);
  React.useEffect(resetStateValues, [launchJobRecord]);
  const validations = {
    notes: [],
    job_id: [{ type: "Required" }],
    launch_date: [{ type: "Required" }],
    termination_date: [],
    consultant_id: [{ type: "Required" }],
    created_at: [],
    updated_at: [],
    client_id: [{ type: "Required" }],
    contract_duration: [{ type: "Required" }],
    client_pricing: [],
    candidate_pricing: [],
    status: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          notes: notes ?? null,
          job_id,
          launch_date,
          termination_date: termination_date ?? null,
          consultant_id,
          created_at: created_at ?? null,
          updated_at: updated_at ?? null,
          client_id,
          contract_duration,
          client_pricing: client_pricing ?? null,
          candidate_pricing: candidate_pricing ?? null,
          status: status ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateLaunchJob.replaceAll("__typename", ""),
            variables: {
              input: {
                id: launchJobRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "LaunchJobUpdateForm")}
      {...rest}
    >
      <TextField
        label="Notes"
        isRequired={false}
        isReadOnly={false}
        value={notes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              notes: value,
              job_id,
              launch_date,
              termination_date,
              consultant_id,
              created_at,
              updated_at,
              client_id,
              contract_duration,
              client_pricing,
              candidate_pricing,
              status,
            };
            const result = onChange(modelFields);
            value = result?.notes ?? value;
          }
          if (errors.notes?.hasError) {
            runValidationTasks("notes", value);
          }
          setNotes(value);
        }}
        onBlur={() => runValidationTasks("notes", notes)}
        errorMessage={errors.notes?.errorMessage}
        hasError={errors.notes?.hasError}
        {...getOverrideProps(overrides, "notes")}
      ></TextField>
      <TextField
        label="Job id"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={job_id}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              notes,
              job_id: value,
              launch_date,
              termination_date,
              consultant_id,
              created_at,
              updated_at,
              client_id,
              contract_duration,
              client_pricing,
              candidate_pricing,
              status,
            };
            const result = onChange(modelFields);
            value = result?.job_id ?? value;
          }
          if (errors.job_id?.hasError) {
            runValidationTasks("job_id", value);
          }
          setJob_id(value);
        }}
        onBlur={() => runValidationTasks("job_id", job_id)}
        errorMessage={errors.job_id?.errorMessage}
        hasError={errors.job_id?.hasError}
        {...getOverrideProps(overrides, "job_id")}
      ></TextField>
      <TextField
        label="Launch date"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={launch_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              notes,
              job_id,
              launch_date: value,
              termination_date,
              consultant_id,
              created_at,
              updated_at,
              client_id,
              contract_duration,
              client_pricing,
              candidate_pricing,
              status,
            };
            const result = onChange(modelFields);
            value = result?.launch_date ?? value;
          }
          if (errors.launch_date?.hasError) {
            runValidationTasks("launch_date", value);
          }
          setLaunch_date(value);
        }}
        onBlur={() => runValidationTasks("launch_date", launch_date)}
        errorMessage={errors.launch_date?.errorMessage}
        hasError={errors.launch_date?.hasError}
        {...getOverrideProps(overrides, "launch_date")}
      ></TextField>
      <TextField
        label="Termination date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={termination_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              notes,
              job_id,
              launch_date,
              termination_date: value,
              consultant_id,
              created_at,
              updated_at,
              client_id,
              contract_duration,
              client_pricing,
              candidate_pricing,
              status,
            };
            const result = onChange(modelFields);
            value = result?.termination_date ?? value;
          }
          if (errors.termination_date?.hasError) {
            runValidationTasks("termination_date", value);
          }
          setTermination_date(value);
        }}
        onBlur={() => runValidationTasks("termination_date", termination_date)}
        errorMessage={errors.termination_date?.errorMessage}
        hasError={errors.termination_date?.hasError}
        {...getOverrideProps(overrides, "termination_date")}
      ></TextField>
      <TextField
        label="Consultant id"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={consultant_id}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              notes,
              job_id,
              launch_date,
              termination_date,
              consultant_id: value,
              created_at,
              updated_at,
              client_id,
              contract_duration,
              client_pricing,
              candidate_pricing,
              status,
            };
            const result = onChange(modelFields);
            value = result?.consultant_id ?? value;
          }
          if (errors.consultant_id?.hasError) {
            runValidationTasks("consultant_id", value);
          }
          setConsultant_id(value);
        }}
        onBlur={() => runValidationTasks("consultant_id", consultant_id)}
        errorMessage={errors.consultant_id?.errorMessage}
        hasError={errors.consultant_id?.hasError}
        {...getOverrideProps(overrides, "consultant_id")}
      ></TextField>
      <TextField
        label="Created at"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={created_at}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              notes,
              job_id,
              launch_date,
              termination_date,
              consultant_id,
              created_at: value,
              updated_at,
              client_id,
              contract_duration,
              client_pricing,
              candidate_pricing,
              status,
            };
            const result = onChange(modelFields);
            value = result?.created_at ?? value;
          }
          if (errors.created_at?.hasError) {
            runValidationTasks("created_at", value);
          }
          setCreated_at(value);
        }}
        onBlur={() => runValidationTasks("created_at", created_at)}
        errorMessage={errors.created_at?.errorMessage}
        hasError={errors.created_at?.hasError}
        {...getOverrideProps(overrides, "created_at")}
      ></TextField>
      <TextField
        label="Updated at"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={updated_at}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              notes,
              job_id,
              launch_date,
              termination_date,
              consultant_id,
              created_at,
              updated_at: value,
              client_id,
              contract_duration,
              client_pricing,
              candidate_pricing,
              status,
            };
            const result = onChange(modelFields);
            value = result?.updated_at ?? value;
          }
          if (errors.updated_at?.hasError) {
            runValidationTasks("updated_at", value);
          }
          setUpdated_at(value);
        }}
        onBlur={() => runValidationTasks("updated_at", updated_at)}
        errorMessage={errors.updated_at?.errorMessage}
        hasError={errors.updated_at?.hasError}
        {...getOverrideProps(overrides, "updated_at")}
      ></TextField>
      <TextField
        label="Client id"
        isRequired={true}
        isReadOnly={false}
        value={client_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              notes,
              job_id,
              launch_date,
              termination_date,
              consultant_id,
              created_at,
              updated_at,
              client_id: value,
              contract_duration,
              client_pricing,
              candidate_pricing,
              status,
            };
            const result = onChange(modelFields);
            value = result?.client_id ?? value;
          }
          if (errors.client_id?.hasError) {
            runValidationTasks("client_id", value);
          }
          setClient_id(value);
        }}
        onBlur={() => runValidationTasks("client_id", client_id)}
        errorMessage={errors.client_id?.errorMessage}
        hasError={errors.client_id?.hasError}
        {...getOverrideProps(overrides, "client_id")}
      ></TextField>
      <TextField
        label="Contract duration"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={contract_duration}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              notes,
              job_id,
              launch_date,
              termination_date,
              consultant_id,
              created_at,
              updated_at,
              client_id,
              contract_duration: value,
              client_pricing,
              candidate_pricing,
              status,
            };
            const result = onChange(modelFields);
            value = result?.contract_duration ?? value;
          }
          if (errors.contract_duration?.hasError) {
            runValidationTasks("contract_duration", value);
          }
          setContract_duration(value);
        }}
        onBlur={() =>
          runValidationTasks("contract_duration", contract_duration)
        }
        errorMessage={errors.contract_duration?.errorMessage}
        hasError={errors.contract_duration?.hasError}
        {...getOverrideProps(overrides, "contract_duration")}
      ></TextField>
      <TextField
        label="Client pricing"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={client_pricing}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              notes,
              job_id,
              launch_date,
              termination_date,
              consultant_id,
              created_at,
              updated_at,
              client_id,
              contract_duration,
              client_pricing: value,
              candidate_pricing,
              status,
            };
            const result = onChange(modelFields);
            value = result?.client_pricing ?? value;
          }
          if (errors.client_pricing?.hasError) {
            runValidationTasks("client_pricing", value);
          }
          setClient_pricing(value);
        }}
        onBlur={() => runValidationTasks("client_pricing", client_pricing)}
        errorMessage={errors.client_pricing?.errorMessage}
        hasError={errors.client_pricing?.hasError}
        {...getOverrideProps(overrides, "client_pricing")}
      ></TextField>
      <TextField
        label="Candidate pricing"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={candidate_pricing}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              notes,
              job_id,
              launch_date,
              termination_date,
              consultant_id,
              created_at,
              updated_at,
              client_id,
              contract_duration,
              client_pricing,
              candidate_pricing: value,
              status,
            };
            const result = onChange(modelFields);
            value = result?.candidate_pricing ?? value;
          }
          if (errors.candidate_pricing?.hasError) {
            runValidationTasks("candidate_pricing", value);
          }
          setCandidate_pricing(value);
        }}
        onBlur={() =>
          runValidationTasks("candidate_pricing", candidate_pricing)
        }
        errorMessage={errors.candidate_pricing?.errorMessage}
        hasError={errors.candidate_pricing?.hasError}
        {...getOverrideProps(overrides, "candidate_pricing")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              notes,
              job_id,
              launch_date,
              termination_date,
              consultant_id,
              created_at,
              updated_at,
              client_id,
              contract_duration,
              client_pricing,
              candidate_pricing,
              status: value,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || launchJobModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || launchJobModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
