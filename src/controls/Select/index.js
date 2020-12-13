import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

const RHFSelect = React.forwardRef((props, ref) => {
  const { label, name, options, required, errorobj } = props;
  let isError = false;
  let errorMessage = "";
  if (errorobj && errorobj.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errorobj[name].message;
  }

  return (
    <FormControl fullWidth={true} error={isError}>
      <InputLabel id={`${name}-label`}>
        {label} {required ? <span className="req-label">*</span> : null}
      </InputLabel>
      <Select
        ref={ref}
        variant="standard"
        labelId={`${name}-label`}
        id={name}
        {...props}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
});

const FormSelect = (props) => {
  const { control } = useFormContext();
  const { name, label } = props;

  return (
    <Controller
      as={RHFSelect}
      control={control}
      name={name}
      label={label}
      defaultValue=""
      {...props}
    />
  );
};

export default FormSelect;
