import React from "react";
import ItemCreateSelect from "./ItemCreateSelect";

function ItemsToolBar() {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between w-full p-3 border-b bg-background">
      <div>Filter & Sorting</div>
      <div>
        <ItemCreateSelect />
      </div>
    </div>
  );
}

export default ItemsToolBar;
