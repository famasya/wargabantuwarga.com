import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

export function typesenseSearch(queryBy: Array<String>) {
  const searchAdapter = new TypesenseInstantSearchAdapter({
    server: {
      apiKey: "FByczfHEjsTCihgkkYlq2YbAgUKMoyVP", // Be sure to use the search-only-api-key
      nodes: [
        {
          host: "public-api.trustmedis.id",
          port: "443",
          protocol: "https",
        },
      ],
    },
    additionalSearchParameters: {
      queryBy: queryBy.join(),
    },
  });
  return searchAdapter.searchClient;
}
