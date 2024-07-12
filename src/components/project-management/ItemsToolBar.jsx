import React from "react";
import ItemCreateSelect from "./ItemCreateSelect";
import ItemSort from "./filter-sort/ItemSort";

function ItemsToolBar(props) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between w-full p-3 border-b bg-background">
      <div>
        <ItemSort
          filterOptions={props.filterOptions}
          setFilterOptions={props.setFilterOptions}
        />
      </div>
      <div>
        <ItemCreateSelect />
      </div>
    </div>
  );
}

export default ItemsToolBar;
