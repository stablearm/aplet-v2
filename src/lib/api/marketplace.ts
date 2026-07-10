import { apiRequest } from "@/lib/api-client";
import type {
  MarketplaceListing,
  CreateListingRequest,
  CreateListingResponse,
  PurchaseListingResponse,
  PaginationParams,
} from "@/types";

export const marketplaceApi = {
  listChannels: (params?: PaginationParams) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", String(params.page));
    if (params?.limit) searchParams.set("limit", String(params.limit));
    const query = searchParams.toString();
    return apiRequest<MarketplaceListing[]>(
      `/api/v1/marketplace/channels${query ? `?${query}` : ""}`
    );
  },

  listGroups: (params?: PaginationParams) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", String(params.page));
    if (params?.limit) searchParams.set("limit", String(params.limit));
    const query = searchParams.toString();
    return apiRequest<MarketplaceListing[]>(
      `/api/v1/marketplace/groups${query ? `?${query}` : ""}`
    );
  },

  getListing: (id: string) =>
    apiRequest<MarketplaceListing>(`/api/v1/marketplace/listings/${id}`),

  createListing: (data: CreateListingRequest) =>
    apiRequest<CreateListingResponse>("/api/v1/marketplace/listings", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  deleteListing: (id: string) =>
    apiRequest<void>(`/api/v1/marketplace/listings/${id}`, {
      method: "DELETE",
    }),

  purchase: (id: string) =>
    apiRequest<PurchaseListingResponse>(
      `/api/v1/marketplace/purchase/${id}`,
      { method: "POST" }
    ),
};
