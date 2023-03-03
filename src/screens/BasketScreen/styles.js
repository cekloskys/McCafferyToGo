import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    page: {
        flex: 1,
        width: '100%',
        padding: 10,
    },
    name: {
        fontSize: 30,
        fontWeight: '700',
        marginVertical: 10,
    },
    separator: {
        height: 1,
        backgroundColor: 'lightgrey',
        marginVertical: 10,
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
        marginBottom: 20,
    },
    cancelbutton: {
        backgroundColor: 'red',
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
    quantityContainer: {
        backgroundColor: 'lightgrey',
        paddingHorizontal: 5,
        marginRight: 5,
        paddingVertical: 2,
        borderRadius: 5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    dropdownBtnStyle: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'lightgrey',
        backgroundColor: 'lightgrey',
        marginVertical: 15,
    },
    dropdownBtnTxtStyle: {
        color: '#444',
        textAlign: 'left',
    },
    dropdownDropdownStyle: {
        borderRadius: 10,
    },
    dropdownRowStyle: {
        backgroundColor: '#EFEFEF',
    },
    dropdownRowTxtStyle: {
        color: '#000',
        textAlign: 'left',
    },

});

export default styles;