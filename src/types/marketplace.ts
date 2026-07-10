export type ListingType = "channel" | "group";

export type ListingStatus = "active" | "inactive" | "pending";

export interface MarketplaceListing {
  id: string;
  username: string;
  publicLink: string;
  type: ListingType;
  memberCount: number;
  averageViewCount: number;
  creationYear: number;
  price: number;
  description?: string;
  category?: string;
  status?: ListingStatus;
}

export interface CreateListingRequest {
  type: ListingType;
  username?: string;
  publicLink?: string;
  memberCount: number;
  averageViewCount?: number;
  creationYear: number;
  description?: string;
}

export interface CreateListingResponse {
  id: string;
  status: string;
}

export interface PurchaseListingResponse {
  orderId: string;
  orderNumber: string;
  status: string;
  price: number;
}
