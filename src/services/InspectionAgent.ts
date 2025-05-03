import { OfferWithDeadlines, Deadline } from "../context/OfferContext";

export interface InspectionItem {
  type: string;
  description: string;
  scheduled: boolean;
  waived: boolean;
  helpRequested: boolean;
}

export function generateInspectionChecklist(
  offer: OfferWithDeadlines
): InspectionItem[] {
  const checklist: InspectionItem[] = [
    {
      type: "general",
      description: "General home inspection",
      scheduled: false,
      waived: false,
      helpRequested: false,
    },
    {
      type: "sewer",
      description: "Sewer scope",
      scheduled: false,
      waived: false,
      helpRequested: false,
    },
    {
      type: "termite",
      description: "Termite inspection",
      scheduled: false,
      waived: false,
      helpRequested: false,
    },
  ];

  // Add region-specific or listing-specific inspections
  if (offer.property?.includes("radon")) {
    checklist.push({
      type: "radon",
      description: "Radon inspection",
      scheduled: false,
      waived: false,
      helpRequested: false,
    });
  }

  if (offer.property?.includes("roof")) {
    checklist.push({
      type: "roof",
      description: "Roof specialist inspection",
      scheduled: false,
      waived: false,
      helpRequested: false,
    });
  }

  return checklist;
}

export function triggerInspectionWorkflow(
  offer: OfferWithDeadlines,
  callback: (checklist: InspectionItem[]) => void
) {
  if (offer.status === "Accepted") {
    const checklist = generateInspectionChecklist(offer);
    callback(checklist);
  }
}
