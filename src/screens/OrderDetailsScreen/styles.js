import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 5/3,
    marginBottom: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',    
  },
  subtitle: {
    color: 'grey',
    fontSize: 15,
    //marginVertical: 10,
    margin: 3,
  },
  container: {
      marginHorizontal: 10,
      marginVertical: 5,
  },
  iconContainer: {
      position: 'absolute',
      top: 40,
      left: 15,
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
  menu: {
    //marginVertical: 10,
    fontSize: 18,
    color: 'black',
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgrey',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

  export default styles;