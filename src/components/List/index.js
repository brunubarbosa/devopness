
 function List({starships = []}) {
  return (
        <ul>
          {starships.map(starship => <li key={starship.url}>{starship.name}: {starship.distance}</li>)}
        </ul>
  );
}

export default List;
