import { useNavigate } from "react-router-dom";

export default function LoanOfficer() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Loan Officer</h2>
      <button onClick={() => navigate("/review-submit")}>Next</button>
    </div>
  );
}
