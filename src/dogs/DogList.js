import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DogListItem from './DogListItem';

const DogList = ({ dogs = [] }) => {
  const [myDogs, setMyDogs] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    (async function fetchDogs() {
      const response = await fetch('http://localhost:8080/dogs?size=100', {
        headers: {
          Accept: 'application/json'
        }
      });
      const json = await response.json();
      console.log(json);
    })();
  }, [dogs]);

  return (
  <div className="list-wrapper">
    {dogs.map(dog => <DogListItem dog={dog} />)}
  </div>
  );
};

export default DogList;