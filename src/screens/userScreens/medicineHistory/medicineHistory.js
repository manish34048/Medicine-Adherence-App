import {AddMedicine, getMedicine} from '../../../utils/storage';
import uuid from 'react-native-uuid';
import {useState, useEffect} from 'react';

var weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

function MedicineHistory() {
  const [medData, setMedData] = useState([]);

  useEffect(() => {
    getMedicine().then(data => {
      setMedData(data);
    });
  }, []);

  // console.log(medData, ' medicine Data  ');
  
}

export default MedicineHistory;
