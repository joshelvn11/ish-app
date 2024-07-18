import React from "react";
import ItemCreateSelect from "@/components/project-management/ItemCreateSelect";
import ItemFilter from "@/components/project-management/filter-sort/ItemFilter";

function ItemsToolBar(props) {
  return (
    <div className="sticky top-0 z-10 flex gap-2 items-center justify-between w-full p-3 border-b bg-background overflow-x-scroll overflow-y-hidden">
      <div className="flex gap-2">
        <ItemFilter
          filterOptions={props.filterOptions}
          setFilterOptions={props.setFilterOptions}
        ></ItemFilter>
      </div>
      <div>
        <ItemCreateSelect />
      </div>
    </div>
  );
}

export default ItemsToolBar;
