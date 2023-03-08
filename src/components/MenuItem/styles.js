import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        paddingVertical: 10,
        flexDirection: 'row',
    },
    name: {
        fontWeight: '600',
        fontSize: 18,
    },
    description: {
        color: 'grey',
        marginVerticalTop: 5,
        marginBottom: 2,
    },
    price: {
        fontSize: 16,
    },
    image: {
        height: 75,
        aspectRatio: 1,
        alignSelf: 'center',
    }
});

  export default styles;