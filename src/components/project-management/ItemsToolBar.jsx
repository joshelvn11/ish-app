import PropTypes from "prop-types";
import ItemCreateSelect from "@/components/project-management/ItemCreateSelect";
import ItemFilter from "@/components/project-management/filter-sort/ItemFilter";

ItemsToolBar.propTypes = {
  filterOptions: PropTypes.object.isRequired,
  setFilterOptions: PropTypes.func.isRequired,
};

/**
 * ItemsToolBar Component
 *
 * This component server as a wrapper for tool bar items.
 *
 */

function ItemsToolBar(props) {
  return (
    <div
      id="items-toolbar"
      className="sticky top-0 z-10 flex items-center justify-between w-full gap-2 p-3 overflow-x-scroll overflow-y-hidden border-b bg-background"
    >
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
