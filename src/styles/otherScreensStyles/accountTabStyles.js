import {StyleSheet} from 'react-native';
import {colorPallete} from '../../components/atoms/colorPalette';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../components/atoms/constant';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colorPallete.greyColor},
  profile: {
    flexDirection: 'row',
    padding: moderateScale(20),
    margin: verticalScale(10),
    width:'95%',
    backgroundColor:'white',
    borderRadius:20,
  },
  profileView:{
    justifyContent:'center',
    alignItems:'center',
   
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  heading: {
    justifyContent: 'center',
    marginLeft: verticalScale(18),
  },
  title: {
    fontSize: 20,
    color: colorPallete.mainColor,
    fontWeight: '600',
  },
  subTitle: {
    fontSize: 16,
    color: 'grey',
    fontWeight: '500',
  },
  card: {
    alignItems: 'center',
    backgroundColor:"white",
    marginHorizontal:verticalScale(10),
    
  },
  divider: {height: 4, width: '100%',
backgroundColor:colorPallete.grey
  },
  btnStyles: {
    borderRadius: 5,
    padding: 12,
    backgroundColor: colorPallete.mainColor,
    width: '40%',
    alignItems: 'center',
    marginVertical: 40,
  },
  contStyles: {alignItems: 'center', marginTop: verticalScale(16)},
});
