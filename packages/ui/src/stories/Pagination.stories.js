import Pagination from "../../lib/styled/Pagination";
import { useState } from "react";

export default {
  title: "Pagination",
  component: Pagination,
};

export const primary = () => {
  const [page, setPage] = useState(1);

  return <Pagination page={page} pageSize={10} total="128" setPage={setPage} />;
};
