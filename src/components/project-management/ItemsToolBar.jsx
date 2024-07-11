import React from "react";
import ItemCreateSelect from "./ItemCreateSelect";
import StatusSort from "./filter-sort/StatusSort";

function ItemsToolBar() {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between w-full p-3 border-b bg-background">
      <div>
        <StatusSort />
      </div>
      <div>
        <ItemCreateSelect />
      </div>
    </div>
  );
}

export default ItemsToolBar;
