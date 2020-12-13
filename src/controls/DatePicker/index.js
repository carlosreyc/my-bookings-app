import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import MomentUtils from "@date-io/moment";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

function FormDatePicker(props) {
  const { control } = useFormContext();
  const { name, label } = props;

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Controller
        as={
          <KeyboardDatePicker
            fullWidth
            autoOk
            inputVariant="standard"
            variant="inline"
            format="DD/MM/YYYY"
            label={label}
          />
        }
        control={control}
        name={name}
        placeholder={label}
      />
    </MuiPickersUtilsProvider>
  );
}

export default FormDatePicker;
