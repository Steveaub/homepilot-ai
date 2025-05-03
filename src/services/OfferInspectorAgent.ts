import { OfferWithDeadlines, Deadline } from "../context/OfferContext";

export interface Issue {
  type: string;
  description: string;
  resolutionLink?: string;
}

export function analyzeOffer(offer: OfferWithDeadlines): Issue[] {
  const issues: Issue[] = [];

  // Check for missing earnest money
  const earnestMoneyDeadline = offer.deadlines.find(
    (d) => d.type === "earnestMoney"
  );
  if (!earnestMoneyDeadline) {
    issues.push({
      type: "earnestMoney",
      description: "Earnest money not uploaded",
      resolutionLink: "/resolve/earnest-money",
    });
  }

  // Check for financing contingency
  const financingDeadline = offer.deadlines.find((d) => d.type === "financing");
  if (!financingDeadline) {
    issues.push({
      type: "financing",
      description: "No mention of financing contingency",
      resolutionLink: "/resolve/financing-contingency",
    });
  }

  // Check for inspection deadline
  const inspectionDeadline = offer.deadlines.find(
    (d) => d.type === "inspection"
  );
  if (!inspectionDeadline) {
    issues.push({
      type: "inspection",
      description: "Inspection deadline not confirmed",
      resolutionLink: "/resolve/inspection-deadline",
    });
  }

  return issues;
}

export function triggerOfferInspection(
  offer: OfferWithDeadlines,
  callback: (issues: Issue[]) => void
) {
  setTimeout(() => {
    const issues = analyzeOffer(offer);
    callback(issues);
  }, 3000); // Trigger after 3 seconds
}
