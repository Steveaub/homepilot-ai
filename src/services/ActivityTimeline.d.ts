declare module "./ActivityTimeline" {
  import React from "react";

  export interface ActivityTimelineProps {
    offerId: string;
  }

  const ActivityTimeline: React.FC<ActivityTimelineProps>;
  export default ActivityTimeline;
}
