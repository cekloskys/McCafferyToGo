import { Text, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth, DataStore } from 'aws-amplify';
import styles from './styles';
import { User } from '../../models';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const validator = require('validator');

const ProfileScreen = () => {
  const { dbUser } = useAuthContext();
  const [name, setName] = useState(dbUser?.name || "");
  const [eAddress, setEAddress] = useState(dbUser?.email || "");

  const { sub, setDBUser } = useAuthContext();

  const navigation = useNavigation();

  const onSave = async () => {
    if (!name) {
      alert('Please enter your fullname.');
      return;
    }
    if (!eAddress || !validator.isEmail(eAddress)) {
      alert('Please enter your valid email address.')
      return;
    }

    if (dbUser) {
      await updateUser();
    } else {
      await createUser();
    }
    navigation.navigate('Restaurants');
  };

  const updateUser = async () => {
    const user = await DataStore.save(
      User.copyOf(dbUser, (updated) => {
        updated.name = name;
        updated.email = eAddress;
      })
    );
    setDBUser(user);
  };

  const createUser = async () => {
    try {
      const user = await DataStore.save(new User({
        name,
        email: eAddress,
        sub
      }));
      setDBUser(user);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter your fullname"
        style={styles.input}
      />
      <TextInput
        value={eAddress}
        onChangeText={setEAddress}
        placeholder="Enter your valid email address"
        style={styles.input}
        keyboardType='email-address'
      />
      <Pressable onPress={onSave} style={styles.button}>
        <Text style={styles.buttonText}>SAVE</Text>
      </Pressable>
      <Pressable onPress={() => Auth.signOut()} style={styles.button}>
        <Text style={styles.buttonText}>SIGN OUT</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default ProfileScreen;