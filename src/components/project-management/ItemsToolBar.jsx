import React from "react";
import ItemCreateSelect from "./ItemCreateSelect";
import ItemSort from "./filter-sort/ItemSort";
import ItemSortOrder from "./filter-sort/ItemSortOrder";
import ItemFilter from "./filter-sort/ItemFilter";

function ItemsToolBar(props) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between w-full p-3 border-b bg-background">
      <div className="flex gap-2">
        <ItemFilter
          filterOptions={props.filterOptions}
          setFilterOptions={props.setFilterOptions}
        ></ItemFilter>
        <ItemSort
          filterOptions={props.filterOptions}
          setFilterOptions={props.setFilterOptions}
        />
        <ItemSortOrder
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
