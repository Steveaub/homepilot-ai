import React, { useState } from "react";
import { generatePreApprovalPDF } from "../utils/parserUtils";

interface Offer {
  lenderName: string;
  rate: number;
  apr: number;
  downPayment: number;
  monthlyPayment: number;
  fees: number;
  expirationDate: string;
}

const MortgageAgent: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [initialOffer, setInitialOffer] = useState<Offer | null>(null);

  const generateOffer = (): Offer => {
    const lenders = ["Sunrise Bank", "NextHome Lending", "Prime Mortgage"];
    const lenderName = lenders[Math.floor(Math.random() * lenders.length)];
    const rate = (Math.random() * 2 + 3).toFixed(2);
    const apr = (parseFloat(rate) + 0.5).toFixed(2);
    const downPayment = 20000;
    const monthlyPayment = 1500 + Math.random() * 500;
    const fees = 3000 + Math.random() * 2000;
    const expirationDate = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toLocaleDateString();

    return {
      lenderName,
      rate: parseFloat(rate),
      apr: parseFloat(apr),
      downPayment,
      monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
      fees: parseFloat(fees.toFixed(2)),
      expirationDate,
    };
  };

  const handleInitialOffer = () => {
    const offer = generateOffer();
    setInitialOffer(offer);
  };

  const handleShopAround = () => {
    const newOffers = Array.from({ length: 3 }, generateOffer);
    setOffers(newOffers);
  };

  const handleDownloadPDF = (offer: Offer) => {
    generatePreApprovalPDF({
      lenderName: offer.lenderName,
      rate: offer.rate,
      apr: offer.apr,
      loanAmount: offer.downPayment + offer.monthlyPayment * 12,
      monthlyPayment: offer.monthlyPayment,
      fees: offer.fees,
      offerDate: new Date().toLocaleDateString(),
      expirationDate: offer.expirationDate,
    });
  };

  return (
    <div className="mortgage-agent">
      <h2>Mortgage Rate Shopping</h2>
      {!initialOffer ? (
        <button onClick={handleInitialOffer}>Get Pre-Approval</button>
      ) : (
        <div>
          <h3>Initial Offer</h3>
          <p>Lender: {initialOffer.lenderName}</p>
          <p>Rate: {initialOffer.rate}%</p>
          <p>APR: {initialOffer.apr}%</p>
          <p>Down Payment: ${initialOffer.downPayment}</p>
          <p>Monthly Payment: ${initialOffer.monthlyPayment}</p>
          <p>Fees: ${initialOffer.fees}</p>
          <p>Expires on: {initialOffer.expirationDate}</p>
          <button onClick={handleShopAround}>Can anyone beat this?</button>
          <button onClick={() => handleDownloadPDF(initialOffer)}>
            Download Pre-Approval PDF
          </button>
        </div>
      )}

      {offers.length > 0 && (
        <div>
          <h3>Comparison Offers</h3>
          {offers.map((offer, index) => (
            <div key={index} className="offer">
              <p>Lender: {offer.lenderName}</p>
              <p>Rate: {offer.rate}%</p>
              <p>APR: {offer.apr}%</p>
              <p>Down Payment: ${offer.downPayment}</p>
              <p>Monthly Payment: ${offer.monthlyPayment}</p>
              <p>Fees: ${offer.fees}</p>
              <p>Expires on: {offer.expirationDate}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MortgageAgent;
