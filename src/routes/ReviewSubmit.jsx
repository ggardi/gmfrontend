import { useNavigate } from "react-router-dom";

export default function ReviewSubmit() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Review Submit</h2>
      <button onClick={() => navigate("/summary")}>Next</button>
    </div>
  );
}
