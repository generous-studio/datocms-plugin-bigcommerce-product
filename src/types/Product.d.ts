export type Product = {
  id: string;
  name: string;
  plainTextDescription?: string;
  defaultImage: {
    urlOriginal: string;
    altText: string;
  };
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
