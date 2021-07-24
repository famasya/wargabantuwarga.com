import { connectSearchBox } from "react-instantsearch-dom";

function SearchBox({ refine }) {
  return (
    <form action="" role="search">
      <input
        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
        id="algolia_search"
        onChange={(e) => refine(e.currentTarget.value)}
        placeholder=""
        type="search"
      />
    </form>
  );
}

export default connectSearchBox(SearchBox);
