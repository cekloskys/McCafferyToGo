import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    restaurantContainer: {
      width: '100%',
      marginVertical: 10,
    },
    fitImage: {
      //width: '100%',
      //aspectRatio: 3/2,
      marginBottom: 5,
      //resizeMode: 'contain',
    },
    title: {
      fontSize: 15,
      fontWeight: '500',    
    },
    subtitle: {
      color: 'grey',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        marginLeft: 'auto',
        backgroundColor: 'lightgrey',
        width: 30,
        height: 30,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
  });

  export default styles;