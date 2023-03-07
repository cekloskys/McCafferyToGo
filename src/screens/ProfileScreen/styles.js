import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  page: {
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    marginTop: 60,
    fontSize: 20,
    fontWeight: "500",
    //textAlign: "center",
    margin: 10,
  },
  input: {
    margin: 10,
    backgroundColor: "white",
    padding: 15,
    //borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#fca43a',
    //marginTop: 'auto',
    padding: 15,
    alignItems: 'center',
    //borderRadius: 20,
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: '500',
  },
});

export default styles;