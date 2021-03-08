import styles from "./index.module.scss";
import {
  FaThLarge,
  FaList,
  FaSortNumericDownAlt,
  FaSortNumericUpAlt,
} from "react-icons/fa";
import listType from "../../constants/listType";
import { useMemo } from "react";

function Sort({
  showing,
  amount,
  setSortData,
  sortData,
  onChangeViewType,
  viewType,
}) {
  const onChangeView = (type) => {
    onChangeViewType(type);
  };

  const getOrderColor = useMemo(() => {
    return {
      down: sortData?.isDesc ? "white" : "gray",
      up: sortData?.isDesc ? "gray" : "white",
    };
  }, [sortData]);
  return (
    <div className={styles.sortWrapper}>
      <span className={styles.listSize}>
        {showing} de {amount}
      </span>
      <div>
        <button onClick={() => setSortData(true)}>
          <FaSortNumericDownAlt color={getOrderColor.down} />
        </button>
        <button onClick={() => setSortData(false)}>
          {<FaSortNumericUpAlt color={getOrderColor.up} />}
        </button>
      </div>
      <div>
        <button onClick={() => onChangeView(listType.GRID)}>
          <FaThLarge color={viewType === listType.GRID ? "white" : "gray"} />
        </button>
        <button onClick={() => onChangeView(listType.LIST)}>
          <FaList color={viewType === listType.GRID ? "gray" : "white"} />
        </button>
      </div>
    </div>
  );
}

export default Sort;
