import { useFormStore } from "../store/formStore";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function AboutYou() {
  const navigate = useNavigate();
  const { formData, updateField } = useFormStore();

  return (
    <div>
      <h2>About You</h2>
      <input
        type="text"
        placeholder="first name"
        value={formData.firstName}
        onChange={(e) => updateField("firstName", e.target.value)}
      />
      <input
        type="text"
        placeholder="last name"
        value={formData.lastName}
        onChange={(e) => updateField("lastName", e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => updateField("email", e.target.value)}
      />
      <Button onClick={() => navigate("/loan-type")}>Next</Button>
    </div>
  );
}
