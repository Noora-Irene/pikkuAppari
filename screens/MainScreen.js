import React, { useState, useEffect} from 'react';
import { StatusBar, StyleSheet, View, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { ThemeProvider, Input, Button, ListItem } from 'react-native-elements';

const db = SQLite.openDatabase('addressdb.db');

export default function MainScreen(props) {

  const [address, setAddress] = useState('');
  const [addressList, setOnList] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists address (id integer primary key not null, address text);');
    }, null, updateList);    
  }, []);

  const input1 = text => {   
    setAddress(text);
  };
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from address;', [], (_, { rows }) =>
        setOnList(rows._array)
      ); 
    });
  }
  const addOnList = () => {
    db.transaction(tx => {
      tx.executeSql('insert into address (address) values (?);', [address]);
    }, null, updateList
    )
    setAddress('');
  }
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql('delete from address where id = ?;', [id]);
      }, null, updateList
    )    
  }
  // const deleteall = (id) => {  }
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: "midnightblue"
        }}
      />
    );
  };

  return (
    <View style={styles.wholeScreen}>
    <ThemeProvider theme={theme}>
      <StatusBar hidden={true} />
        <View style={styles.inputArea}>
          <Input placeholder= 'Type address' label='ADDRESS' onChangeText={input1} value={address}
          />
            <Button title="ADD" onPress={addOnList} />
        </View>
        <View style={styles.listArea}>
            <FlatList
              data={addressList}
              keyExtractor={item => item.id.toString()}
              ItemSeparatorComponent={listSeparator}
              renderItem={ ({ item }) => 
              <ListItem
                title= {item.address}
                onLongPress={() => deleteItem(item.id) }
                rightSubtitle='Show on map' 
                onPress={() => {
                    props.navigation.navigate({ routeName: 'Map',
                    params: {
                        input: item.address
                    }
                    }) } }
                /> }
            />
        </View>
        </ThemeProvider>
    </View>
  );
}
MainScreen.navigationOptions={
    headerTitle: 'tehtävä 14'
  };
const theme = {
  Button: {
    containerStyle: {
    marginTop: 20
    },
    titleStyle: {
      color: '#fffafa'
    },
  },
};
const styles = StyleSheet.create({
  wholeScreen: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  inputArea: {
    flex: 1
  },
  listArea: {
    flex: 3
  }
});