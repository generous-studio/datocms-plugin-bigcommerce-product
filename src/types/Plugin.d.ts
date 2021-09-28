import { DatoCmsPlugin } from "datocms-plugins-sdk";

export type Plugin = DatoCmsPlugin<
  {
    developmentMode: boolean;
    graphqlEndpoint: string;
    authorizationToken: string;
  },
  {}
>;
