import React, { useEffect } from "react";

function Badge() {
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify([]));
  });

  return <div>최근 본 상품</div>;
}

export default Badge;
