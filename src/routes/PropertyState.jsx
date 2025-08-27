import { useNavigate } from "react-router-dom";

export default function PropertyState() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Property State</h2>
      <button onClick={() => navigate("/loan-officer")}>Next</button>
    </div>
  );
}
