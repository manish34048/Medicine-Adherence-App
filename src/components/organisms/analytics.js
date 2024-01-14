import analytics from '@react-native-firebase/analytics';

async function Analytics(name, button) {
  await analytics().logEvent(`${name}`,{name:`${button}`}).then().catch((e)=>{console.log(e,"error")});
}

export default Analytics;
