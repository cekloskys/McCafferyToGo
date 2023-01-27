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
  },
  container: {
      margin: 10,
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
    marginVertical: 10,
    fontSize: 18,
    color: 'grey',
  },
});

  export default styles;