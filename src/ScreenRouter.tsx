import React, { useState } from "react";
import ParseListingScreen from "./services/ParseListingScreen"; // Adjusted for case sensitivity
import MortgageAgent from "./services/FinancingAgent"; // Ensure consistent import naming
import EscalationUI from "./services/escalationUI";
import OfferTracker from "./services/OfferTracker";
import { useOfferContext } from "./context/OfferContext";

const ScreenRouter: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState("ParseListingScreen");
  const { selectedOffer, setSelectedOffer } = useOfferContext();

  const handleParseComplete = (parsedOffer: any) => {
    setSelectedOffer(parsedOffer);
    setCurrentScreen("MortgageAgent");
  };

  const handlePreApprovalComplete = () => {
    setCurrentScreen("EscalationUI");
  };

  const handleEscalationComplete = () => {
    setCurrentScreen("OfferTracker");
  };

  return (
    <div>
      {currentScreen === "ParseListingScreen" && (
        <ParseListingScreen onParseComplete={handleParseComplete} />
      )}
      {currentScreen === "MortgageAgent" && (
        <MortgageAgent onPreApprovalComplete={handlePreApprovalComplete} />
      )}
      {currentScreen === "EscalationUI" && (
        <EscalationUI
          actionType="escalate"
          onClose={() => setCurrentScreen("MortgageAgent")}
          onEscalationComplete={handleEscalationComplete}
        />
      )}
      {currentScreen === "OfferTracker" && <OfferTracker />}
    </div>
  );
};

export default ScreenRouter;
