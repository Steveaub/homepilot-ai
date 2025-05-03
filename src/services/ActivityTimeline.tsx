import React from "react";

interface ActivityTimelineProps {
  offerId: string;
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ offerId }) => {
  return (
    <div className="activity-timeline">
      <h3>Activity Timeline</h3>
      <p>Displaying activity for offer ID: {offerId}</p>
    </div>
  );
};

export default ActivityTimeline;
