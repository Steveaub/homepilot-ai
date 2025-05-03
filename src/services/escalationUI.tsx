import React, { useState, useEffect } from "react";
import { logEscalation } from "./logEscalation";
import { useOfferContext } from "../context/OfferContext";
import ActivityTimeline from "./ActivityTimeline";

const messageTemplates = {
  resend:
    "Dear [Seller/Agent],\n\nI am following up on my offer for {propertyAddress}, submitted on {offerDate}. Please confirm receipt at your earliest convenience.\n\nThank you,\n{buyerName}",
  escalate:
    "Dear [Broker],\n\nI am escalating my offer for {propertyAddress}, submitted on {offerDate}, as I have not received a response. Please ensure it is presented to the seller.\n\nThank you,\n{buyerName}",
};

const deliveryMethods = [
  { id: "email", label: "Personal email (Gmail, Outlook)" },
  { id: "inApp", label: "In-app with Boomerang or Mailtrack" },
  { id: "pdf", label: "Save as PDF" },
];

interface EscalationUIProps {
  actionType: "resend" | "escalate" | null;
  onClose: () => void;
  onEscalationComplete: () => void; // Added prop
}

const EscalationUI: React.FC<EscalationUIProps> = ({
  actionType,
  onClose,
  onEscalationComplete,
}) => {
  const { selectedOffer } = useOfferContext();
  const [editableMessage, setEditableMessage] = useState("");
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (selectedOffer && actionType) {
      const template = messageTemplates[actionType]
        .replace("{propertyAddress}", selectedOffer.propertyAddress)
        .replace(
          "{offerDate}",
          new Date(selectedOffer.submissionDate).toLocaleDateString()
        )
        .replace("{buyerName}", "[Your Name]");
      setEditableMessage(template);
      logEscalation(selectedOffer.id, actionType);
    }
  }, [selectedOffer, actionType]);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(editableMessage);
    alert("Message copied to clipboard!");
  };

  const resendOffer = (deliveryMethod: string) => {
    if (selectedOffer) {
      logEscalation(selectedOffer.id, "resend");
      alert(`Offer resent via ${deliveryMethod}`);
    }
  };

  const handleEscalation = () => {
    if (selectedOffer) {
      logEscalation(selectedOffer.id, "escalate");
      alert("Escalation process completed!");
      onEscalationComplete(); // Trigger the completion callback
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h3>{actionType === "resend" ? "Resend Offer" : "Escalate Offer"}</h3>
        <textarea
          value={editableMessage}
          onChange={(e) => setEditableMessage(e.target.value)}
          rows={10}
          cols={50}
        />
        <div className="delivery-method-section">
          <h4>Select Delivery Method</h4>
          {deliveryMethods.map((method) => (
            <label key={method.id}>
              <input
                type="radio"
                name="deliveryMethod"
                value={method.id}
                onChange={() => setSelectedDeliveryMethod(method.id)}
              />
              {method.label}
            </label>
          ))}
        </div>
        <button
          onClick={() => resendOffer(selectedDeliveryMethod!)}
          disabled={!selectedDeliveryMethod}
        >
          Resend Offer
        </button>
        <button onClick={handleCopyMessage}>Copy Message</button>
        <button onClick={handleEscalation}>Complete Escalation</button>
        <button onClick={onClose}>Close</button>
        {selectedOffer && (
          <div className="timeline-section">
            <h3>Escalation Timeline</h3>
            <ActivityTimeline offerId={selectedOffer.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EscalationUI;
