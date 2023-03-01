import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, Pressable } from 'react-native';
import styles from './styles';
import { DataStore } from "aws-amplify";
import { User } from '../../models';
import { useAuthContext } from '../../context/AuthContext';

const MenuItem = ({ dish }) => {

  const navigation = useNavigation();

  const { sub, setDBUser, dbUser } = useAuthContext();

  const onPress = () => {
    DataStore.query(User, (user) => user.sub.eq(sub)).then((users) =>
      setDBUser(users[0]));
    if (!dbUser) {
      alert('You must create a profile before creating a basket!')
      navigation.navigate("Profile")
    } else {
      const id = dish.id;
      navigation.navigate('Menu Item', { id: id })
    }

  };

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={{ flex: 1, }}>
        <Text style={styles.name}>{dish.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{dish.description}</Text>
        <Text style={styles.description}>Calories: {dish.calories}</Text>
        <Text style={styles.description}>Gluten Free: {dish.glutenFree ? 'Yes' : 'No'}</Text>
        <Text style={styles.price}>$ {dish.price.toFixed(2)}</Text>
      </View>
      {dish.image && (<Image source={{ uri: dish.image }} style={styles.image} />)}
    </Pressable>
  );
};

export default MenuItem;