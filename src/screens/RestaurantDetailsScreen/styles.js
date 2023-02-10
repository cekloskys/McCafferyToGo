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
    completeContainer: {
      width: '100%',
      height: 36,
      backgroundColor: 'lightgrey',
      paddingTop: 3,
      paddingLeft: 10,
      flexDirection: 'row',
      zIndex: 100,
      flex: 1,
    },
    outer: {
      height: '100%',
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
    button: {
      backgroundColor: "black",
      marginTop: "auto",
      padding: 20,
      alignItems: "center",
      margin: 10,
    },
    buttonText: {
      color: "white",
      fontWeight: "600",
      fontSize: 18,
    },
  });

  export default styles;