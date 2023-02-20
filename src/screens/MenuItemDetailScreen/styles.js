import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    page: {
      padding: 10,
    },
    name: {
      fontSize: 30,
      fontWeight: '700',
      marginVertical: 10,
    },
    description: {
      color: 'grey',
    },
    separator: {
      height: 1,
      backgroundColor: 'lightgrey',
      marginVertical: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems:'center',
      justifyContent: 'center',
      marginVertical: 25,
    },
    quantity: {
      fontSize: 25,
      marginHorizontal: 20,
    },
    button: {
      backgroundColor: 'black',        
      marginTop: 'auto',
      padding: 20,
      alignItems: 'center',
      borderRadius: 20,
    },
    buttonText: {
      color: 'white',
      fontWeight: '600',
      fontSize: 18,
    },
  });

  export default styles;