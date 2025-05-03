export interface ListingData {
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  lotSize: number;
  yearBuilt: number;
  propertyType: string;
  description: string;
}

export interface Offer {
  lenderName: string;
  rate: number;
  apr: number;
  loanAmount: number;
  monthlyPayment: number;
  fees: number;
  offerDate: string;
  expirationDate: string;
}
