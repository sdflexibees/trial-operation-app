import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { LaunchJob } from "./graphql/types";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LaunchJobUpdateFormInputValues = {
    id?: string;
    notes?: string;
    job_id?: string;
    launch_date?: string;
    termination_date?: string;
    consultant_id?: number;
    created_at?: string;
    updated_at?: string;
    contract_duration?: number;
    client_pricing?: number;
    candidate_pricing?: number;
    status?: string;
};
export declare type LaunchJobUpdateFormValidationValues = {
    id?: ValidationFunction<string>;
    notes?: ValidationFunction<string>;
    job_id?: ValidationFunction<string>;
    launch_date?: ValidationFunction<string>;
    termination_date?: ValidationFunction<string>;
    consultant_id?: ValidationFunction<number>;
    created_at?: ValidationFunction<string>;
    updated_at?: ValidationFunction<string>;
    contract_duration?: ValidationFunction<number>;
    client_pricing?: ValidationFunction<number>;
    candidate_pricing?: ValidationFunction<number>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LaunchJobUpdateFormOverridesProps = {
    LaunchJobUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    id?: PrimitiveOverrideProps<TextFieldProps>;
    notes?: PrimitiveOverrideProps<TextFieldProps>;
    job_id?: PrimitiveOverrideProps<TextFieldProps>;
    launch_date?: PrimitiveOverrideProps<TextFieldProps>;
    termination_date?: PrimitiveOverrideProps<TextFieldProps>;
    consultant_id?: PrimitiveOverrideProps<TextFieldProps>;
    created_at?: PrimitiveOverrideProps<TextFieldProps>;
    updated_at?: PrimitiveOverrideProps<TextFieldProps>;
    contract_duration?: PrimitiveOverrideProps<TextFieldProps>;
    client_pricing?: PrimitiveOverrideProps<TextFieldProps>;
    candidate_pricing?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LaunchJobUpdateFormProps = React.PropsWithChildren<{
    overrides?: LaunchJobUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    launchJob?: LaunchJob;
    onSubmit?: (fields: LaunchJobUpdateFormInputValues) => LaunchJobUpdateFormInputValues;
    onSuccess?: (fields: LaunchJobUpdateFormInputValues) => void;
    onError?: (fields: LaunchJobUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LaunchJobUpdateFormInputValues) => LaunchJobUpdateFormInputValues;
    onValidate?: LaunchJobUpdateFormValidationValues;
} & React.CSSProperties>;
export default function LaunchJobUpdateForm(props: LaunchJobUpdateFormProps): React.ReactElement;
