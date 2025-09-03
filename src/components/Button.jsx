import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { useTheme } from "@mui/material/styles";

const GuildButton = ({ children, loading, disabled, color, sx, ...props }) => {
  const theme = useTheme();
  return (
    <Button
      color={color}
      disabled={disabled || loading}
      sx={{
        ...sx,
        ...(disabled || loading
          ? { color: theme.palette.text.primary + " !important" }
          : {}),
      }}
      startIcon={
        loading ? <CircularProgress color="inherit" size={20} /> : null
      }
      {...props}
    >
      {children}
    </Button>
  );
};

GuildButton.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  sx: PropTypes.object,
};

GuildButton.defaultProps = {
  loading: false,
  disabled: false,
  color: "inherit",
  sx: {},
};

export default GuildButton;
