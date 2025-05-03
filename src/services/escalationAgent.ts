import { setTimeout } from "timers";

interface Offer {
  id: string;
  property: string;
  timestamp: number;
  responded: boolean;
}

const offers: Offer[] = []; // This would be replaced with a database or API call in a real application

const ESCALATION_WINDOW = 48 * 60 * 60 * 1000; // 48 hours in milliseconds

export function submitOffer(offer: Offer) {
  offer.timestamp = Date.now();
  offer.responded = false;
  offers.push(offer);

  // Schedule escalation check
  setTimeout(() => checkEscalation(offer.id), ESCALATION_WINDOW);
}

function checkEscalation(offerId: string) {
  const offer = offers.find((o) => o.id === offerId);
  if (offer && !offer.responded) {
    // Trigger escalation prompt
    promptUserForEscalation(offer);
  }
}

function promptUserForEscalation(offer: Offer) {
  console.log(
    `You haven’t received a reply to your offer on ${offer.property}.`
  );
  console.log("Would you like to:");
  console.log("1. Resend offer with read receipt");
  console.log("2. Escalate to broker");
  console.log("3. View escalation rights and template");
}

export function markOfferAsResponded(offerId: string) {
  const offer = offers.find((o) => o.id === offerId);
  if (offer) {
    offer.responded = true;
  }
}
