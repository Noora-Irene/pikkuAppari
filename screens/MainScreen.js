import React, { useState, useEffect} from 'react';
import { StatusBar, StyleSheet, View, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { ThemeProvider, Input, Button, ListItem, Overlay, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const db = SQLite.openDatabase('servicetargets.db');

export default function MainScreen(props) {

  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [pcs, setPcs] = useState('');
  const [info, setInfo] = useState('');
  const [addressList, setOnList] = useState([]);
  const [visible, setVisible] = useState(false);

  const openOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists target (id integer primary key not null, address text, zip text, pcs text, info text);');
    }, null, updateList);    
  }, []);

  const input1 = text => {   
    setAddress(text);
  };
  const input2 = text => {   
    setZip(text);
  };
  const input3 = text => {   
    setPcs(text);
  };
  const input4 = text => {   
    setInfo(text);
  };

  const addOnList = () => {
    db.transaction(tx => {
      tx.executeSql('insert into target (address, zip, pcs, info) values (?, ?, ?, ?);', [address, zip, pcs, info]);
    }, null, updateList
    )
    setAddress('');
    setZip('');
    setPcs('');
    setInfo('');
  }
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql('delete from target where id = ?;', [id]);
      }, null, updateList
    )    
  }
  // const deleteall = (id) => {  }
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from target;', [], (_, { rows }) =>
        setOnList(rows._array)
      ); 
    });
  }

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
        <View style={styles.operationArea}>
          <Button
              icon={ <Icon
                        name="pencil"
                        size={25}
                        color="white"
                      />
                    }
                      iconRight
                      title="Lisää kohde"
                      onPress={openOverlay}
                      />
              <Overlay isVisible={visible} onBackdropPress={openOverlay}>
                <View style={styles.inputAreaOverlay}>
                  <Input placeholder= 'Katuosoite & paikkakunta' label='OSOITE' onChangeText={input1} value={address} 
                  />
                  <Input placeholder= '' label='POSTINRO' onChangeText={input2} value={zip} 
                  />
                  <Input placeholder= 'Laatikoiden lukumäärä' label='KPL' onChangeText={input3} value={pcs} 
                  />
                  <Input placeholder= 'Lisätiedot kohteesta' label='INFO' onChangeText={input4} value={info} 
                  />
                     <Button
                        icon={ <Icon
                                  name="arrow-circle-o-right"
                                  size={25}
                                  color="white"
                                />
                              }
                              iconRight
                              title="Valmis"
                              onPress={addOnList}
                      />
                </View>
              </Overlay>
        </View>
        <View style={styles.listArea}>
            <FlatList
              data={addressList}
              keyExtractor={item => item.id.toString()}
              ItemSeparatorComponent={listSeparator}
              renderItem={ ({ item }) => 
              <ListItem
                title= {item.address}
                subtitle={item.info}
                onLongPress={() => deleteItem(item.id) }
                rightTitle={item.zip}
                rightSubtitle={item.pcs}
                rightIcon= {{ type: 'font-awesome', name: 'angle-double-right' }} 
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
    headerTitle: 'pikkuAppari'
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
  operationArea: {
    flex: 1,
  },
  inputAreaOverlay: {
    
  },
  listArea: {
    flex: 4
  }
});