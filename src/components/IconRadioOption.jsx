import React from "react";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import PropTypes from "prop-types";

const IconRadioOption = ({
  value,
  label,
  icon,
  imgMb = 1,
  checked,
  onChange,
  name,
  ...rest
}) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    border={1}
    borderColor={"border.main"}
    borderRadius={1}
    p={2}
    mx={1}
  >
    {typeof icon === "string" ? (
      <Box sx={{ mb: imgMb }} component="img" src={icon} />
    ) : (
      <Box sx={{ mb: imgMb }}>{icon}</Box>
    )}
    <FormControlLabel
      value={value}
      control={<Radio checked={checked} onChange={onChange} name={name} />}
      label={label}
      labelPlacement="top"
      {...rest}
    />
  </Box>
);

IconRadioOption.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  imgMb: PropTypes.number,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
};

export default IconRadioOption;
