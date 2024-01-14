import AsyncStorage from '@react-native-async-storage/async-storage';

export const AddMedicine = async data => {
  try {
    await AsyncStorage.setItem('AddMedicine', JSON.stringify(data));
    const res = JSON.parse(await AsyncStorage.getItem('AddMedicine'));
  } catch (error) {
    console.log(error);
  }
};

export const getMedicine = async () => {
  try {
    const response = JSON.parse(await AsyncStorage.getItem('AddMedicine'));
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const savePrescription = async data => {
  try {
    await AsyncStorage.setItem('SavePrescription', JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const getPrescription = async () => {
  try {
    const response = JSON.parse(await AsyncStorage.getItem('SavePrescription'));
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getPercentageDetails = async () =>{
  try{
    const response = JSON.parse(await AsyncStorage.getItem('Percentage'));
    return response
  }catch(error){
    console.log(error);
  }
}

export const savePercentageDetails = async (data) =>{
  try{
    await AsyncStorage.setItem('Percentage', JSON.stringify(data));
  }catch(error){
    console.log(error);
  }
}

export const getId=async()=>{
  try{
    const id = await AsyncStorage.getItem('user_id');
    return id
  }
  catch(err)
  {
    console.log(err)
  }
}


export const getToken=async()=>{
  try{
    const token = await AsyncStorage.getItem('accessToken');
    return token 
  }
  catch(err) 
  {
    console.log(err)
  }
}
