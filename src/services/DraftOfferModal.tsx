import React from "react";
import { motion } from "framer-motion";

interface ParsedOffer {
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
        <p className="mb-2">
          <strong>Address:</strong> {offer.address}
        </p>
        <p className="mb-4">
          <strong>Price:</strong> ${offer.price.toLocaleString()}
        </p>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          onClick={() => console.log("Continue button clicked")}
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
};

export default DraftOfferModal;
