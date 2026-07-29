export type Product = {
  id: string;
  entityId: number;
  name: string;
  plainTextDescription?: string;
  defaultImage?: {
    url: string;
    altText: string;
  } | null;
  availabilityV2: {
    status: string;
  };
  prices: {
    price: {
      value: number;
      currencyCode: string;
    };
  };
};


export type ProductIdKey = "id" | "entityId"
