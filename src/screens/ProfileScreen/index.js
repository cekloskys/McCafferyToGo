import { SafeAreaView, Text, TextInput, Button } from 'react-native';
import React, {useState, onSave} from 'react';
import { Auth, DataStore } from 'aws-amplify';
import styles from './styles';
import { User } from '../../models';
import { useAuthContext } from '../../context/AuthContext';

const ProfileScreen = () => {

  const [name, setName] = useState('');
  const [eAddress, setEAddress] = useState('');

  const { sub } = useAuthContext();

  const onSave = () => {
    DataStore.save(new User({ 
      name, 
      email: eAddress, 
      sub }));
  };

  return (
    <SafeAreaView><Text style={styles.title}>Profile</Text><TextInput
      value={name}
      onChangeText={setName}
      placeholder="Name"
      style={styles.input}
    /><TextInput
        value={eAddress}
        onChangeText={setEAddress}
        placeholder="Email Address"
        style={styles.input}
      />
      <Button onPress={onSave} title="Save" /><Text onPress={() => Auth.signOut()} style={{ textAlign: 'center', color: 'red', marginVertical: 10, }}>
        Sign Out</Text></SafeAreaView>
  );
}

export default ProfileScreen;