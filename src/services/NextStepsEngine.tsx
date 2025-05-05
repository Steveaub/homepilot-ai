import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DraftOfferModal from "./DraftOfferModal";

interface ParsedOffer {
  address: string;
  price: number;
  beds: number;
  baths: number;
}

interface NextStepsEngineProps {
  parsedOffer: ParsedOffer | null;
  isVisible?: boolean;
}

const NextStepsEngine: React.FC<NextStepsEngineProps> = ({
  parsedOffer,
  isVisible = true,
}) => {
  const [showDraftModal, setShowDraftModal] = useState(false);

  useEffect(() => {
    if (parsedOffer) {
      console.log(
        "NextStepsEngine is now visible with parsedOffer:",
        parsedOffer
      );
    }
  }, [parsedOffer]);

  const handleDraftOffer = () => {
    setShowDraftModal(true);
  };

  const handleScheduleInspection = () => {
    console.log("Schedule an Inspection clicked");
  };

  const handleCompareMortgageRates = () => {
    console.log("Compare Mortgage Rates clicked");
  };

  const handleReviewDisclosures = () => {
    console.log("Review Disclosures clicked");
  };

  if (!parsedOffer || !isVisible) {
    return (
      <p className="text-center text-gray-500">
        Paste a listing to see next steps.
      </p>
    );
  }

  return (
    <motion.section
      className="p-6 bg-gray-50 border border-gray-200 shadow-md rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">What’s Next?</h2>
      <div className="flex flex-col space-y-4">
        <button
          className="rounded-xl bg-white shadow hover:bg-gray-100 p-4 text-left"
          onClick={handleDraftOffer}
        >
          📝 Draft an Offer
        </button>
        <button
          className="rounded-xl bg-white shadow hover:bg-gray-100 p-4 text-left"
          onClick={handleScheduleInspection}
        >
          📅 Schedule an Inspection
        </button>
        <button
          className="rounded-xl bg-white shadow hover:bg-gray-100 p-4 text-left"
          onClick={handleCompareMortgageRates}
        >
          💰 Compare Mortgage Rates
        </button>
        <button
          className="rounded-xl bg-white shadow hover:bg-gray-100 p-4 text-left"
          onClick={handleReviewDisclosures}
        >
          📄 Review Disclosures
        </button>
      </div>
      <DraftOfferModal
        open={showDraftModal}
        onClose={() => setShowDraftModal(false)}
        offer={parsedOffer}
      />
    </motion.section>
  );
};

export default NextStepsEngine;
