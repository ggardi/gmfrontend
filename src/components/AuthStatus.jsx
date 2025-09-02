import { useMsal } from "@azure/msal-react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const AuthStatus = ({ onNext }) => {
  const { accounts } = useMsal();
  const user = accounts && accounts[0];

  if (!user) return null;

  // Use claims if available for name/email, fallback to username
  return (
    <Box sx={{ textAlign: "center", p: 3 }}>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Here's the name and email we have on file for you. By clicking next, you
        will be creating an application with this information.
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2">Name</Typography>
        <Typography variant="body2">{user.name || user.username}</Typography>
        <Typography variant="subtitle2" sx={{ mt: 2 }}>
          Email
        </Typography>
        <Typography variant="body2">{user.username}</Typography>
      </Box>
      <Button variant="contained" onClick={onNext}>
        Next
      </Button>
    </Box>
  );
};

export default AuthStatus;
