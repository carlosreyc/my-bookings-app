import React, { useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormInput from "../controls/Input";
import { useForm, FormProvider } from "react-hook-form";
const TableFilter = (props) => {
  const { handleFilter } = props;
  const formMethods = useForm();
  const { handleSubmit, errors, reset } = formMethods;

  const onSubmit = useCallback(
    (data) => {
      handleFilter(data.name);
    },
    [handleFilter]
  );

  const handleClear = useCallback(() => {
    handleFilter(null);
    reset();
  }, [handleFilter, reset]);
  return (
    <Grid container style={{ marginTop: 16 }}>
      <FormProvider {...formMethods}>
        <form style={{ width: "100%" }}>
          <Grid container alignItems="center" justify="flex-start" spacing={1}>
            <Grid item xs={12} lg={3}>
              <FormInput name="name" label="Filter by name" errorobj={errors} />
            </Grid>

            <Grid item xs={12} lg={1} style={{ marginLeft: "auto" }}>
              <Button
                variant="contained"
                style={{ width: "100%" }}
                type="button"
                onClick={handleClear}
              >
                clear
              </Button>
            </Grid>
            <Grid item xs={12} lg={1}>
              <Button
                color="primary"
                variant="contained"
                style={{ width: "100%" }}
                onClick={handleSubmit(onSubmit)}
              >
                Filter
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Grid>
  );
};

export default React.memo(TableFilter);
