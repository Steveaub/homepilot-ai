import React from "react";

type MortgageAgentProps = {
  onPreApprovalComplete: () => void;
};

const MortgageAgent: React.FC<MortgageAgentProps> = ({
  onPreApprovalComplete,
}) => {
  const handlePreApproval = () => {
    onPreApprovalComplete();
  };

  return (
    <div>
      <h1>Mortgage Pre-Approval</h1>
      <button onClick={handlePreApproval}>Complete Pre-Approval</button>
    </div>
  );
};

export default MortgageAgent;
