import { useNavigate } from "react-router-dom";

export default function LoanType() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Loan Type</h2>
      <button onClick={() => navigate("/property-state")}>Next</button>
    </div>
  );
}
