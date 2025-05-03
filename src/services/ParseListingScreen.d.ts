declare module "./ParseListingScreen" {
  import React from "react";

  export interface ParseListingScreenProps {
    onParseComplete: (parsedOffer: any) => void;
  }

  const ParseListingScreen: React.FC<ParseListingScreenProps>;
  export default ParseListingScreen;
}
