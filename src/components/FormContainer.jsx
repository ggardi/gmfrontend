import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

const FormContainer = ({ children, sx = {}, ...props }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: theme.palette.grey[50],
        borderBottom: `16px solid ${theme.palette.primary.main}`,
        px: 4,
        py: 4,
        width: 686,
        minHeight: 404,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default FormContainer;
