import React, { useState } from "react";
import { motion } from "framer-motion";
import { useOfferContext } from "../context/OfferContext";

interface ParsedOffer {
  id: string; // Assuming id is a string, change if it's a different type
  address: string;
  price: number;
  beds: number;
  baths: number;
}

interface DraftOfferModalProps {
  open: boolean;
  onClose: () => void;
  offer: ParsedOffer;
}

const DraftOfferModal: React.FC<DraftOfferModalProps> = ({
  open,
  onClose,
  offer,
}) => {
  const { logTaskCompletion } = useOfferContext();
  const [price, setPrice] = useState(offer.price);
  const [contingencies, setContingencies] = useState("");
  const [closingDate, setClosingDate] = useState("");
  const [legalReview, setLegalReview] = useState(false);

  const handleSubmit = () => {
    const offerLetter = `
      Offer Letter
      -------------
      Address: ${offer.address}
      Price: $${price.toLocaleString()}
      Contingencies: ${contingencies || "None"}
      Closing Date: ${closingDate || "TBD"}
      Legal Review: ${legalReview ? "Requested" : "Not Requested"}
    `;
    console.log("Generated Offer Letter:", offerLetter);
    logTaskCompletion(offer.id); // Log task completion
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 relative z-10 w-11/12 max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Draft Offer</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Contingencies
          </label>
          <textarea
            value={contingencies}
            onChange={(e) => setContingencies(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Closing Date
          </label>
          <input
            type="date"
            value={closingDate}
            onChange={(e) => setClosingDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={legalReview}
              onChange={(e) => setLegalReview(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Request Legal Review ($99)
            </span>
          </label>
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Generate Offer Letter
        </button>
      </motion.div>
    </div>
  );
};

export default DraftOfferModal;
