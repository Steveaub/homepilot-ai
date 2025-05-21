import React, { useState, useEffect, useMemo } from "react";
import { useOfferContext, OfferWithDeadlines } from "../context/OfferContext"; // Import OfferWithDeadlines type
import EscalationUI from "./escalationUI";
import ActivityTimeline from "./ActivityTimeline";
import OfferReminder from "./OfferReminder";
import { triggerOfferInspection, Issue } from "./OfferInspectorAgent";
import { triggerInspectionWorkflow, InspectionItem } from "./InspectionAgent";

const OfferResponseConfirmation: React.FC<{ offerId: string }> = ({
  offerId,
}) => {
  const { offers, setOffers } = useOfferContext();
  const offer = offers.find((o) => o.id === offerId);

  if (
    !offer ||
    (offer.status !== "Awaiting" && offer.status !== "Escalation Ready")
  ) {
    return null;
  }

  const handleResponse = (responded: boolean) => {
    setOffers((prevOffers: OfferWithDeadlines[]) =>
      prevOffers.map((o: OfferWithDeadlines) =>
        o.id === offerId
          ? {
              ...o,
              responded,
              status: responded ? "Responded" : o.status,
            }
          : o
      )
    );
  };

  return (
    <div className="response-confirmation bg-gray-100 p-4 rounded-md shadow-md">
      <p>
        Did you get a response from the listing agent about your offer on{" "}
        <strong>{offer.propertyAddress}</strong>?
      </p>
      <div className="actions mt-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
          onClick={() => handleResponse(true)}
        >
          Yes — Mark as Responded
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => handleResponse(false)}
        >
          No — Keep Waiting
        </button>
      </div>
    </div>
  );
};

const OfferTracker: React.FC = () => {
  const { offers, setSelectedOffer, selectedOffer, setOffers } =
    useOfferContext();
  const [showEscalationUI, setShowEscalationUI] = useState(false);
  const [actionType, setActionType] = useState<"resend" | "escalate" | null>(
    null
  );
  const [filter, setFilter] = useState(
    () => localStorage.getItem("offerFilterStatus") || "All"
  );
  const [sortOrder, setSortOrder] = useState(
    () => localStorage.getItem("offerSortOrder") || "Newest"
  );
  const [issues, setIssues] = useState<Issue[]>([]);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [inspectionChecklist, setInspectionChecklist] = useState<
    InspectionItem[]
  >([]);
  const [showInspectionModal, setShowInspectionModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("offerFilterStatus", filter);
  }, [filter]);

  useEffect(() => {
    localStorage.setItem("offerSortOrder", sortOrder);
  }, [sortOrder]);

  const handleOfferAction = (
    offerId: string,
    action: "resend" | "escalate"
  ) => {
    const selected = offers.find((offer) => offer.id === offerId);
    if (selected) {
      setSelectedOffer(selected);
      setActionType(action);
      setShowEscalationUI(true);
    }
  };

  const handleOfferSubmission = (offerId: string) => {
    const offer = offers.find((o) => o.id === offerId);
    if (offer) {
      setOffers((prevOffers) =>
        prevOffers.map((o) =>
          o.id === offerId ? { ...o, status: "Drafted" } : o
        )
      );
    }
  };

  const handleStatusUpdate = (offerId: string, newStatus: string) => {
    setOffers((prevOffers: OfferWithDeadlines[]) =>
      prevOffers.map((offer: OfferWithDeadlines) =>
        offer.id === offerId
          ? {
              ...offer,
              status: newStatus as
                | "Responded"
                | "Awaiting"
                | "Escalation Ready"
                | "Accepted", // Ensured valid union type
            }
          : offer
      )
    );

    if (newStatus === "Accepted") {
      const offer = offers.find((o) => o.id === offerId);
      if (offer) {
        triggerInspectionWorkflow(offer, (checklist) => {
          setInspectionChecklist(checklist);
          setShowInspectionModal(true);
        });
      }
    }
  };

  const closeEscalationUI = () => {
    setShowEscalationUI(false);
    setSelectedOffer(null);
    setActionType(null);
  };

  const isStale = (submissionDate: string) => {
    const submissionTime = new Date(submissionDate).getTime();
    const currentTime = Date.now();
    return currentTime - submissionTime > 48 * 60 * 60 * 1000; // 48 hours in milliseconds
  };

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      if (filter === "All") return true;
      return offer.status === filter;
    });
  }, [offers, filter]);

  const sortedOffers = useMemo(() => {
    return [...filteredOffers].sort((a, b) => {
      const dateA = new Date(a.submissionDate).getTime();
      const dateB = new Date(b.submissionDate).getTime();
      return sortOrder === "Newest" ? dateB - dateA : dateA - dateB;
    });
  }, [filteredOffers, sortOrder]);

  return (
    <div className="offer-tracker">
      <h1>Offer Tracker</h1>
      <OfferReminder />

      <div className="filters mb-4">
        <label className="mr-4">
          Filter by Status:
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="ml-2 p-2 border rounded"
          >
            <option value="All">All</option>
            <option value="Awaiting">Awaiting</option>
            <option value="Responded">Responded</option>
            <option value="Escalation Ready">Escalation Ready</option>
          </select>
        </label>

        <label>
          Sort by Date:
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="ml-2 p-2 border rounded"
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
          </select>
        </label>
      </div>

      <ul>
        {sortedOffers.map((offer) => (
          <li key={offer.id} className="relative">
            <div>
              <p>Property: {offer.propertyAddress}</p>
              <p>Submitted: {offer.submissionDate}</p>
              <p>
                Status: <span>{offer.status}</span>
              </p>
            </div>
            <div className="actions">
              <button onClick={() => handleOfferAction(offer.id, "resend")}>
                Resend
              </button>
              <button onClick={() => handleOfferAction(offer.id, "escalate")}>
                Escalate
              </button>
              <button onClick={() => handleOfferSubmission(offer.id)}>
                Inspect
              </button>
              <button onClick={() => handleStatusUpdate(offer.id, "Accepted")}>
                Accept
              </button>
            </div>
            {offer.status === "Awaiting" && isStale(offer.submissionDate) && (
              <div
                className="absolute top-0 right-0 bg-yellow-200 text-yellow-800 p-2 rounded cursor-pointer"
                onClick={() => handleOfferAction(offer.id, "escalate")}
                title="No reply — take action?"
              >
                No reply — take action?
              </div>
            )}
            {offer.status === "Escalation Ready" && (
              <div
                className="absolute top-0 right-0 bg-red-200 text-red-800 p-2 rounded cursor-pointer"
                onClick={() => handleOfferAction(offer.id, "escalate")}
                title="It’s been 48+ hrs with no response"
              >
                Escalation Needed
              </div>
            )}
            <OfferResponseConfirmation offerId={offer.id} />
          </li>
        ))}
      </ul>

      {showEscalationUI && (
        <EscalationUI
          actionType={actionType}
          onClose={closeEscalationUI}
          onEscalationComplete={() => setShowEscalationUI(false)} // Added missing prop
        />
      )}

      {selectedOffer && (
        <div className="activity-timeline">
          <ActivityTimeline offerId={selectedOffer.id} />
        </div>
      )}

      {showIssueModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Offer Review</h3>
            <ul>
              {issues.map((issue) => (
                <li key={issue.type}>
                  <p>{issue.description}</p>
                  {issue.resolutionLink && (
                    <a
                      href={issue.resolutionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resolve
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <button onClick={() => setShowIssueModal(false)}>Dismiss</button>
          </div>
        </div>
      )}

      {showInspectionModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Inspection Checklist</h3>
            <ul>
              {inspectionChecklist.map((item) => (
                <li key={item.type}>
                  <p>{item.description}</p>
                  <button
                    onClick={() => console.log(`Scheduled: ${item.type}`)}
                  >
                    Schedule
                  </button>
                  <button onClick={() => console.log(`Waived: ${item.type}`)}>
                    Waive
                  </button>
                  <button
                    onClick={() => console.log(`Help requested: ${item.type}`)}
                  >
                    Help Me Decide
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={() => setShowInspectionModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferTracker;
