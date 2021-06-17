import React from "react";
import Grid from "@material-ui/core/Grid";
import RadioGroup from "../shared/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import { Field } from "redux-form";
import renderField from "../shared/TextField";
import CreatableSelect from 'react-select/creatable';
import * as Core from "@material-ui/core";
import Flash from '../shared/Alert';

const useStyles = makeStyles({
  root: {
    "&:not(.Mui-disabled)::before": {
      borderColor: "grey",
    },
  },
});

export default function Infos(props) {
  const classes = useStyles();
  const { handleSubmit, selectLoading, selectTags, selectError, createTag } = props;

  const handleCreate = (value) => {
    createTag(value);
  }

  const selectField = ({ input, meta: { touched, error } }) => (
    <div>
      <CreatableSelect
        {...input}
        isMulti
        isDisabled={selectLoading}
        isLoading={selectLoading}
        isClearable={false}
        options={selectTags}
        onBlur={() => input.onBlur(input.value)}
        onChange={(value) => { input.onChange(value) }}
        onCreateOption={handleCreate}
      />

      <div>{(touched && error) &&
        <div style={{ 'fontSize': '12px', 'color': 'rgb(244, 67, 54)' }}>{error}</div>}
      </div>
    </div>
  );
  return (
    <div className="infosContainer">
      {selectError && <Flash variant="error" msg={selectError} />}
      <Grid container spacing={10}>
        <Grid item container sm={12}>
          <Grid item sm={5}>
            <Field
              name="first_name"
              label="First Name"
              color="secondary"
              component={renderField}
              InputProps={{
                classes: {
                  root: classes.root,
                },
                className: "loginInput"
              }}
              InputLabelProps={{ className: "loginInputLabel" }}
            />
          </Grid>
          <Grid item sm={2} />
          <Grid item sm={5}>
            <Field
              name="last_name"
              label="Last Name"
              color="secondary"
              component={renderField}
              InputProps={{
                classes: {
                  root: classes.root,
                },
                className: "loginInput"
              }}
              InputLabelProps={{ className: "loginInputLabel" }}
            />
          </Grid>
        </Grid>
        <Grid item container sm={12}>
          <Field
            name="bio"
            label="Bio"
            color="secondary"
            component={renderField}
            InputProps={{
              classes: {
                root: classes.root,
              },
              className: "loginInput"
            }}
            InputLabelProps={{ className: "loginInputLabel" }}
          />
        </Grid>

        <Grid item container sm={12}>
          <Grid item sm={4}>
            <FormControl style={{ color: "grey" }}>
              <FormLabel color="secondary">
                Gender
              </FormLabel>
              <Field
                component={RadioGroup}
                name="gender"
                options={[
                  { title: "Male ", value: "male" },
                  { title: "Female", value: "female" },
                  { title: "Non-Binary", value: "non_binary" },
                ]}
                InputProps={{ className: "loginInput" }}
              />
            </FormControl>
          </Grid>
          <Grid item sm={4}>
            <FormControl style={{ color: "grey" }}>
              <FormLabel color="secondary" >
                Interested In
              </FormLabel>
              <Field
                component={RadioGroup}
                name="intrest"
                options={[
                  { title: "Men ", value: "men" },
                  { title: "Women", value: "women" },
                  { title: "Both", value: "both" },
                ]}
                InputProps={{ className: "loginInput" }}
              />
            </FormControl>
          </Grid>
          <Grid item container sm={4}>
            <Grid item sm={12}>
              <Field
                id="date"
                label="Birthday"
                name="birth"
                type="date"
                component={renderField}
                color="secondary"
                InputLabelProps={{
                  shrink: true,
                  className: "loginInputLabel",
                }}
                InputProps={{ className: "loginInput" }}
              />
            </Grid>
            <Grid item sm={12}>
              <Grid
                item
                container
                sm={12}
                justify="center"
                alignItems="center"
                className="tagsCont"
              >
                <Field name="tags" component={selectField} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item container justify="center" xs={12}>
            <Core.Button onClick={handleSubmit} variant="contained" type="submit" className={classes.button} name="submit" value="ok" >Next</Core.Button>
          </Grid>
        </Grid>
      </Grid>
      
    </div>
  );
}
