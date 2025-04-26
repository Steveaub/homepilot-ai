export function detectSource(url: string): string {
  if (url.includes("zillow.com")) return "zillow";
  // Add more source detection logic as needed
  return "unknown";
}
