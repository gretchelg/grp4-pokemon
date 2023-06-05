import React from "react";
import { useState } from "react";

export default function Pagination({ setPage, page }) {
  return (
    <div className="gallery_pagination">
      <button
        className="pagination_buttons"
        onClick={setPage((prev) => prev - 1)}
      >
        Previous
      </button>
      <button
        className="pagination_buttons"
        onClick={setPage((prev) => prev + 1)}
      >
        Next
      </button>
    </div>
  );
}
