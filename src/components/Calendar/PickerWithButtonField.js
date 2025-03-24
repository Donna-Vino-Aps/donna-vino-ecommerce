import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function ButtonField(props) {
  const {
    setOpen,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props;

  return (
    <Button
      variant="none"
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
      style={{
        padding: 0,
        minWidth: "auto",
      }}
    >
      <img
        src="/icons/calender-alt-1-gray.svg" // Path to your image
        alt="Calendar Icon"
        className="h-5 w-5 lg:h-[36px] lg:w-[33px]" // Adjust the size to fit as needed
      />
    </Button>
  );
}

ButtonField.propTypes = {
  setOpen: PropTypes.func.isRequired,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  InputProps: PropTypes.shape({
    ref: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  inputProps: PropTypes.shape({
    "aria-label": PropTypes.string,
  }),
};

function ButtonDatePicker({
  value,
  onChange,
  open,
  onClose,
  onOpen,
  ...props
}) {
  return (
    <DatePicker
      value={value}
      onChange={onChange}
      slots={{ ...props.slots, field: ButtonField }}
      slotProps={{ ...props.slotProps, field: { setOpen: onOpen } }}
      {...props}
      open={open}
      onClose={onClose}
      onOpen={onOpen}
    />
  );
}

ButtonDatePicker.propTypes = {
  slots: PropTypes.object,
  slotProps: PropTypes.object,
  label: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
};

export default function PickerWithButtonField({
  value,
  onChange,
  open,
  setOpen,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ButtonDatePicker
        label={value == null ? null : value.format("MM/DD/YYYY")}
        value={value}
        onChange={onChange}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      />
    </LocalizationProvider>
  );
}

PickerWithButtonField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  setOpen: PropTypes.func.isRequired,
};
