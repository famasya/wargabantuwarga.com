import { connectStateResults } from "react-instantsearch-dom";

type searchState = {
  query: string;
  page: number;
};

type FAQ = {
  id: string;
  pertanyaan: string;
  jawaban: string;
};

type searchResults = {
  hits: Array<FAQ>;
};

function Hits({
  searchState,
  searchResults,
}: {
  searchState: searchState;
  searchResults: searchResults;
}) {
  let results: searchResults["hits"];
  const validQuery =
    "query" in searchState ? searchState.query.length >= 3 : true;

  try {
    results = searchResults.hits;
  } catch (e) {
    results = [];
  }
  return (
    <>
      {results.length === 0 && validQuery && (
        <p>Aw snap! No search results were found.</p>
      )}
      {results.length > 0 && validQuery && (
        <ol>
          {results.map((hit) => (
            <li key={hit.id}>{hit.pertanyaan}</li>
          ))}
        </ol>
      )}
    </>
  );
}

export default connectStateResults(Hits);
