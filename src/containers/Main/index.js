import {useEffect, useState} from 'react';
import {getStarships} from '../../services/starshipService';
import List from '../../components/List';
import Input from '../../components/Input';
import {UNIT_TIME} from '../../constants/time';
import './index.css';

function App() {
  const [starships, setStarships] = useState([])
  const [distance, setDistance] = useState(0)

  const mapStringToDaysAmount = (period) => {
    const periodTimeUnit = period.split(' ')[1]
    const timeAmount = parseInt(period.split(' ')[0])
    const availableTimeUnits = Object.keys(UNIT_TIME)
    const foundTimeUnit = availableTimeUnits.find((key) => periodTimeUnit.includes(key))
    return timeAmount * UNIT_TIME[foundTimeUnit]
  }

  useEffect(() => {
    (async () => {
      const {data} = await getStarships();
      const starshipsWithDistance = data.results.map((starship) => ({...starship, distance: 0}))
      setStarships(starshipsWithDistance)
    })()
  }, [])
  
  const getResupplyLength = ({consumables, MGLT}) => {
    const distanceByHour = distance / parseInt(MGLT);
    const distanceByDay = distanceByHour / 24;
    return distanceByDay /  mapStringToDaysAmount(consumables);

}
useEffect(() => {
  setStarships(starships.map(starship => ({
    ...starship,
    distance: Math.floor(getResupplyLength(starship))
  })));
}, [distance])

const onChangeDistance = (event) => {
  const distanceValue = parseInt(event.target.value)
  setDistance(distanceValue ? distanceValue : '');
}
  return (
      <section className="content">
        <Input
          onChange={onChangeDistance}
          value={distance}
          type="number"
          label="Duração da viagem"
        />
        <List starships={starships} />
      </section>
  );
}

export default App;
