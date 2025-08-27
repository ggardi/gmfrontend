import { useNavigate } from "react-router-dom";

export default function CreatePassword() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Create Password</h2>
      <button onClick={() => navigate("/create-passwordCreate Password")}>
        Next
      </button>
    </div>
  );
}
