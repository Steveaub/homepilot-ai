import React from "react";
import { useOfferContext, Deadline } from "../context/OfferContext";

const DeadlineTracker: React.FC = () => {
  const { selectedOffer, updateDeadline } = useOfferContext();

  if (!selectedOffer) {
    return <div>No offer selected.</div>;
  }

  const handleMarkComplete = (deadlineType: string) => {
    const updatedDeadline = selectedOffer.deadlines.find(
      (d) => d.type === deadlineType
    );

    if (updatedDeadline) {
      updateDeadline(selectedOffer.id, {
        ...updatedDeadline,
        completed: true,
      });
    }
  };

  return (
    <div className="deadline-tracker">
      <h3>Deadlines for {selectedOffer.propertyAddress}</h3>
      <ul>
        {selectedOffer.deadlines.map((deadline) => (
          <li key={deadline.type}>
            <span>
              {deadline.type} due by {deadline.dueDate}
            </span>
            {deadline.completed ? (
              <span> - Completed</span>
            ) : (
              <button onClick={() => handleMarkComplete(deadline.type)}>
                Mark Complete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeadlineTracker;
