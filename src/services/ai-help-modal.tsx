import React, { useState, useEffect } from "react";

interface AIHelpModalProps {
  topicId: string;
  onClose: () => void;
}

const AIHelpModal: React.FC<AIHelpModalProps> = ({ topicId, onClose }) => {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    fetch("/public/topics.json")
      .then((response) => response.json())
      .then((data) => {
        const topic = data.topics.find((t: any) => t.id === topicId);
        setContent(topic ? topic.description : "Content not found.");
      });
  }, [topicId]);

  return (
    <div className="ai-help-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>AI Help</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default AIHelpModal;
