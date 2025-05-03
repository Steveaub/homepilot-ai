import React, { createContext, useContext, useState, useEffect } from "react";

// Define the Offer type
export type Offer = {
  id: string;
  propertyAddress: string;
  submissionDate: string;
  status: "Responded" | "Awaiting" | "Escalation Ready" | "Accepted"; // Added "Accepted" as a valid status
  agentEmail?: string;
  brokerEmail?: string;
  sellerEmail?: string;
  property?: string;
  timestamp?: number;
  responded?: boolean;
};

// Define the Deadline type
export type Deadline = {
  type: "earnestMoney" | "inspection" | "financing";
  dueDate: string;
  completed: boolean;
};

// Extend Offer type to include deadlines
export type OfferWithDeadlines = Offer & {
  deadlines: Deadline[];
};

// Define the context type
interface OfferContextType {
  offers: OfferWithDeadlines[];
  getOfferById: (id: string) => OfferWithDeadlines | undefined;
  addOffer: (offer: OfferWithDeadlines) => void;
  selectedOffer: OfferWithDeadlines | null;
  setSelectedOffer: (offer: OfferWithDeadlines | null) => void;
  reminderOffer: OfferWithDeadlines | null;
  setReminderOffer: (offer: OfferWithDeadlines | null) => void;
  updateDeadline: (offerId: string, deadline: Deadline) => void;
  setOffers: React.Dispatch<React.SetStateAction<OfferWithDeadlines[]>>; // Added setOffers property
}

const OfferContext = createContext<OfferContextType | undefined>(undefined);

export const OfferProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [offers, setOffers] = useState<OfferWithDeadlines[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<OfferWithDeadlines | null>(
    null
  );
  const [reminderOffer, setReminderOffer] = useState<OfferWithDeadlines | null>(
    null
  );

  // Helper function to check if an offer is stale
  const isStaleOffer = (submissionDate: string): boolean => {
    const submissionTime = new Date(submissionDate).getTime();
    const currentTime = Date.now();
    return currentTime - submissionTime > 48 * 60 * 60 * 1000; // 48 hours in milliseconds
  };

  // Load offers from localStorage on mount
  useEffect(() => {
    const storedOffers = localStorage.getItem("homepilot_offers");
    if (storedOffers) {
      try {
        setOffers(JSON.parse(storedOffers));
      } catch (error) {
        console.error("Failed to parse offers from localStorage:", error);
      }
    }
  }, []);

  // Save offers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("homepilot_offers", JSON.stringify(offers));
  }, [offers]);

  // Auto-flag stale offers as "Escalation Ready" on mount
  useEffect(() => {
    const now = Date.now();
    setOffers((prevOffers) =>
      prevOffers.map((offer) => {
        if (
          !offer.responded &&
          now - new Date(offer.timestamp || offer.submissionDate).getTime() >
            48 * 60 * 60 * 1000 &&
          offer.status !== "Escalation Ready"
        ) {
          return { ...offer, status: "Escalation Ready" };
        }
        return offer;
      })
    );
  }, []);

  // Daily or session-based check for stale offers
  useEffect(() => {
    setOffers((prevOffers) =>
      prevOffers.map((offer) => {
        if (!offer.responded && isStaleOffer(offer.submissionDate)) {
          return { ...offer, status: "Escalation Ready" };
        }
        return offer;
      })
    );
  }, []);

  // Check for offers approaching escalation window (36–48 hours)
  useEffect(() => {
    const now = Date.now();
    const eligibleOffer = offers.find(
      (offer) =>
        !offer.responded &&
        now - new Date(offer.timestamp || offer.submissionDate).getTime() >
          36 * 60 * 60 * 1000 &&
        now - new Date(offer.timestamp || offer.submissionDate).getTime() <=
          48 * 60 * 60 * 1000
    );
    if (eligibleOffer) {
      setReminderOffer(eligibleOffer);
    }
  }, [offers]);

  const getOfferById = (id: string) => offers.find((offer) => offer.id === id);

  const addOffer = (offer: OfferWithDeadlines) => {
    setOffers((prevOffers) => [...prevOffers, offer]);
  };

  const updateDeadline = (offerId: string, deadline: Deadline) => {
    setOffers((prevOffers) =>
      prevOffers.map((offer) => {
        if (offer.id === offerId) {
          const updatedDeadlines = offer.deadlines.map((d) =>
            d.type === deadline.type ? deadline : d
          );
          return { ...offer, deadlines: updatedDeadlines };
        }
        return offer;
      })
    );
  };

  return (
    <OfferContext.Provider
      value={{
        offers,
        getOfferById,
        addOffer,
        selectedOffer,
        setSelectedOffer,
        reminderOffer,
        setReminderOffer,
        updateDeadline,
        setOffers,
      }}
    >
      {children}
    </OfferContext.Provider>
  );
};

export const useOfferContext = () => {
  const context = useContext(OfferContext);
  if (!context) {
    throw new Error("useOfferContext must be used within an OfferProvider");
  }
  return context;
};
