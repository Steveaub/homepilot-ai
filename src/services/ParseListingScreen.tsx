import React, { useState } from "react";

type ParseListingScreenProps = {
  onParseComplete: (parsedOffer: any) => void;
};

const ParseListingScreen: React.FC<ParseListingScreenProps> = ({
  onParseComplete,
}) => {
  const [input, setInput] = useState("");

  const handleParse = () => {
    const parsedOffer = { id: 1, name: input }; // Simulated parsed offer
    onParseComplete(parsedOffer);
  };

  return (
    <div>
      <h1>Parse Listing Screen</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter listing details"
      />
      <button onClick={handleParse}>Parse</button>
    </div>
  );
};

export default ParseListingScreen;
