import React from "react";
import {Button, Grid} from "@material-ui/core";
import {Field, Form, Formik, FormikErrors} from "formik";

import {
    DiagnosisSelection,
    EntryTypeOption,
    HealthRatingOption,
    SelectField,
    TextField
} from "../AddPatientModal/FormField";
import {EntryType, HealthCheckRating} from "../types";

import {isValidDate} from "../utils";
import {useStateValue} from "../state";

export interface EntryFormValues {
    date: string,
    description: string,
    specialist: string,
    diagnosisCodes?: string[],
    type: EntryType,
    healthCheckRating: HealthCheckRating,
    discharge: { date: string, criteria: string },
    employerName: string,
    sickLeave: { startDate: string, endDate: string }
}

const healthRatingOption: HealthRatingOption[] = [
    { value: HealthCheckRating.Healthy, label: "Healthy" },
    { value: HealthCheckRating.LowRisk, label: "Low risk" },
    { value: HealthCheckRating.HighRisk, label: "High risk" },
    { value: HealthCheckRating.CriticalRisk, label: "Critical risk" },
];

const entryTypeOption: EntryTypeOption[] = [
    { value: EntryType.HealthCheck, label: "Health check" },
    { value: EntryType.Hospital, label: "Hospital" },
    { value: EntryType.OccupationalHealthcare, label: "Occupational healthcare" },
];

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: "",
        description: "",
        specialist: "",
        type: EntryType.HealthCheck,
        healthCheckRating: HealthCheckRating.Healthy,
        discharge: { date: "", criteria: "" },
        employerName: "",
        sickLeave: { startDate: "", endDate: "" },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const invalidDateError = "Invalid date or format";
        const errors: FormikErrors<EntryFormValues> = {};

        if (!values.date) {
          errors.date = requiredError;
        }
        if (!isValidDate(values.date)) {
            errors.date = invalidDateError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }

        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        // without if condition, all fields (incl. hidden!) will be validated despite which entry type I am choosing
        if (values.type === EntryType.Hospital) {
            if (!values.discharge.date) {
                errors.discharge = {...errors.discharge, date: requiredError};
            }

            if (!isValidDate(values.discharge.date)) {
                errors.discharge = {...errors.discharge, date: invalidDateError};
            }

            if (!values.discharge.criteria) {
                errors.discharge = {...errors.discharge, criteria: requiredError};
            }
        }

        if (values.type === EntryType.OccupationalHealthcare) {
            if (!values.employerName) {
                errors.employerName = requiredError;
            }

            if (values.sickLeave.startDate && !isValidDate(values.sickLeave.startDate)) {
                errors.sickLeave = {...errors.sickLeave, startDate: invalidDateError};
            }
            if (values.sickLeave.endDate && !isValidDate(values.sickLeave.endDate)) {
                errors.sickLeave = {...errors.sickLeave, endDate: invalidDateError};
            }
        }

        return errors;
      }}
    >
      {({ isValid, dirty , setFieldValue, setFieldTouched, values}) => {
        return (
          <Form className="form ui">
            <SelectField label="Type of entry" name="type" options={entryTypeOption} />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              diagnoses={Object.values(diagnoses)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched} />

            {
              values.type === EntryType.HealthCheck &&
              <SelectField label="Health rating" name="healthCheckRating" options={healthRatingOption} />
            }
            {
              values.type === EntryType.Hospital &&
              <div style = {{ display: "flex", paddingRight: 15 }}>
                <Field
                  label="Discharge date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge criteria"
                  placeholder="Discharge criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </div>
            }
            {
              values.type === EntryType.OccupationalHealthcare &&
                <>
                  <Field
                    label="Employer name"
                    placeholder="Employer name"
                    name="employerName"
                    component={TextField}
                  />
                  <div>
                    <Field
                      label="Sick leave start date"
                      placeholder="YYYY-MM-DD"
                      name="sickLeave.startDate"
                      component={TextField}
                    />
                    <Field
                      label="Sick leave end date"
                      placeholder="YYYY-MM-DD"
                      name="sickLeave.endDate"
                      component={TextField}
                    />
                  </div>
                </>
              }
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
