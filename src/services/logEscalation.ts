import fs from "fs";

interface EscalationLog {
  offerId: string;
  type: string;
  timestamp: string;
}

const LOG_FILE = "escalation_logs.json";

export function logEscalation(offerId: string, type: string) {
  const logEntry: EscalationLog = {
    offerId,
    type,
    timestamp: new Date().toISOString(),
  };

  let logs: EscalationLog[] = [];

  if (fs.existsSync(LOG_FILE)) {
    const existingLogs = fs.readFileSync(LOG_FILE, "utf-8");
    logs = JSON.parse(existingLogs);
  }

  logs.push(logEntry);

  if (type === "resend") {
    console.log(`Resend action logged for offer ID: ${offerId}`);
  }

  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
}

export function logDeadlineAction(
  offerId: string,
  deadlineType: string,
  action: "markComplete" | "reminderSent"
) {
  const logEntry = {
    offerId,
    deadlineType,
    action,
    timestamp: new Date().toISOString(),
  };

  let logs = [];

  if (fs.existsSync(LOG_FILE)) {
    const existingLogs = fs.readFileSync(LOG_FILE, "utf-8");
    logs = JSON.parse(existingLogs);
  }

  logs.push(logEntry);

  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
}
