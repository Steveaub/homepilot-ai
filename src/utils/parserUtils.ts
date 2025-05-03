import { jsPDF } from "jspdf";
import { Offer } from "../types";

export function detectSource(url: string): string {
  if (url.includes("zillow.com")) return "zillow";
  // Add more source detection logic as needed
  return "unknown";
}

export function generatePreApprovalPDF(offer: Offer) {
  const doc = new jsPDF();

  // Add the header
  doc.setFontSize(22);
  doc.text("🏡 HomePilot AI", 105, 20, { align: "center" });

  // Add the offer summary
  doc.setFontSize(14);
  doc.text("Offer Summary:", 20, 40);
  doc.setFontSize(12);
  doc.text(`Lender Name: ${offer.lenderName}`, 20, 50);
  doc.text(`Rate: ${offer.rate}%`, 20, 60);
  doc.text(`APR: ${offer.apr}%`, 20, 70);
  doc.text(`Loan Amount: $${offer.loanAmount.toLocaleString()}`, 20, 80);
  doc.text(
    `Monthly Payment: $${offer.monthlyPayment.toLocaleString()}`,
    20,
    90
  );
  doc.text(`Fees: $${offer.fees.toLocaleString()}`, 20, 100);

  // Add the dates
  doc.text(`Offer Date: ${offer.offerDate}`, 20, 120);
  doc.text(`Expiration Date: ${offer.expirationDate}`, 20, 130);

  // Add the footer disclaimer
  doc.setFontSize(10);
  doc.text(
    "This is a simulated pre-approval and not a commitment to lend.",
    20,
    150
  );
  doc.text("Empowering Buyers, Not Commissions.", 20, 160);

  // Save the PDF
  const fileName = `${offer.lenderName.replace(/\s+/g, "_")}_${
    offer.offerDate
  }.pdf`;
  doc.save(fileName);
}
