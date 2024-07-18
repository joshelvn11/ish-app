import React from "react";
import ItemCreateSelect from "@/components/project-management/ItemCreateSelect";
import ItemFilter from "@/components/project-management/filter-sort/ItemFilter";

function ItemsToolBar(props) {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleTouchStart = () => {
      clearTimeout(isScrolling);
    };

    const handleTouchMove = () => {
      setIsScrolling(true);
    };

    const handleTouchEnd = () => {
      setIsScrolling(
        setTimeout(() => {
          setIsScrolling(false);
        }, 200)
      );
    };

    const scrollableDiv = document.getElementById("items-toolbar");
    scrollableDiv.addEventListener("touchstart", handleTouchStart);
    scrollableDiv.addEventListener("touchmove", handleTouchMove);
    scrollableDiv.addEventListener("touchend", handleTouchEnd);

    return () => {
      scrollableDiv.removeEventListener("touchstart", handleTouchStart);
      scrollableDiv.removeEventListener("touchmove", handleTouchMove);
      scrollableDiv.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isScrolling]);

  return (
    <div
      id="items-toolbar"
      className="sticky top-0 z-10 flex gap-2 items-center justify-between w-full p-3 border-b bg-background overflow-x-scroll overflow-y-hidden"
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
