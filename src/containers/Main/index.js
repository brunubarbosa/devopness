import { useEffect, useState, useContext, Fragment, useCallback } from "react";
import List from "../../components/List";
import Input from "../../components/Input";
import Card from "../../components/Card";
import Sort from "../../components/Sort";
import { UNIT_TIME } from "../../constants/time";
import styles from "./index.module.scss";
import { GlobalContext } from "../../context/Provider";
import getStarships from "../../context/actions/starships/getStarships";
import setViewType from "../../context/actions/starships/setViewType";
import { FaChevronDown } from "react-icons/fa";
import LIST_TYPE from "../../constants/listType";

function App() {
  const [starships, setStarships] = useState([]);
  const [distance, setDistance] = useState('');
  const { starshipsDispatch, starshipsState } = useContext(GlobalContext);
  const [sortData, setSortData] = useState({});

  const mapStringToDaysAmount = (period) => {
    const periodTimeUnit = period.split(" ")[1];
    const timeAmount = parseInt(period.split(" ")[0]);
    const availableTimeUnits = Object.keys(UNIT_TIME);
    const foundTimeUnit = availableTimeUnits.find((key) =>
      periodTimeUnit.includes(key)
    );
    return timeAmount * UNIT_TIME[foundTimeUnit];
  };


  const getResupplyLength = useCallback(({ consumables, MGLT }) => {
      const distanceByHour = distance / parseInt(MGLT);
      const distanceByDay = distanceByHour / 24;
      if (MGLT === "unknown") return "Desconhecido";
      return Math.floor(distanceByDay / mapStringToDaysAmount(consumables));
  }, [distance])

  useEffect(() => {
    (async () => {
      const starshipsWithDistance = starshipsState.starships.data.map((starship) => ({
        ...starship,
        resupply: getResupplyLength(starship),
      }));
      setStarships(starshipsWithDistance);
    })();
  }, [starshipsState, getResupplyLength]);

  useEffect(() => {
    (async () => {
      getStarships(starshipsDispatch, starshipsState.starships.next);
    })();
  }, []);


  useEffect(() => {
    setStarships((starships) =>
      starships.map((starship) => ({
        ...starship,
        resupply: getResupplyLength(starship),
      }))
    );
  }, [distance, getResupplyLength]);

  const onChangeDistance = (event) => {
    const distanceValue = parseInt(event.target.value);
    setDistance(distanceValue ? distanceValue : "");
  };

  const onChangeViewType = (type) => {
    if (type === starshipsState.starships.viewType) return;
    setViewType(starshipsDispatch, type);
  };

  const onOrderData = (isDesc) => {
    const isChangingOrder = isDesc !== sortData.isDesc
    if (!isChangingOrder || !sortData) return;

    const sortedData = starships.sort((a, b) => a.name.localeCompare(b.name));
    setStarships(isDesc ? sortedData : [...sortedData].reverse());
    setSortData({ isDesc: isDesc });
  };

  return (
    <section>
      <div className={styles.listWrapper}>
        <div className={styles.ListHeader}>
          <Input
            onChange={onChangeDistance}
            value={distance}
            type="number"
            label="Duração da viagem"
          />
          <span>MGLT</span>
          <Sort
            showing={starshipsState.starships.data.length}
            amount={starshipsState.starships.count}
            setSortData={onOrderData}
            sortData={sortData}
            onChangeViewType={onChangeViewType}
            viewType={starshipsState.starships.viewType}
          />
        </div>
        {starshipsState.starships.viewType === LIST_TYPE.LIST ? (
          starships.map((starship) => (
            <List>
              <span>{starship.name}</span>
              <span className={styles.resultLabel}>
                Número de paradas:
                <span className={styles.result}> {starship.resupply}</span>
              </span>
            </List>
          ))
        ) : (
          <div className={styles.gridWrapper}>
            {starships.map((starship, index) => (
              <Fragment key={index} >
                <Card
                  title={starship.name}
                  content={`Número de paradas: ${starship.resupply}`}
                />
              </Fragment>
            ))}
          </div>
        )}
        <button
          className={styles.seMoreButton}
          onClick={() => getStarships(starshipsDispatch, starshipsState.starships.next)}
        >
          Ver mais
          <FaChevronDown size={15} />
        </button>
      </div>
    </section>
  );
}

export default App;
