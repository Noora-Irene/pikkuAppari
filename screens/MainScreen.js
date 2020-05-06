import React, {useState, useEffect} from 'react';
import {StatusBar, StyleSheet, View, TouchableOpacity, FlatList, Picker, Text} from 'react-native';
import {Header, Input, ListItem, Overlay, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
import Config from '../environment/Config';

   <Config />

export default function MainScreen(props) {

  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [pcs, setPcs] = useState('');
  const [info, setInfo] = useState('');

  const [addressList, setOnList] = useState([]);

  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);

  const addToList = () => {
    setVisible(!visible);
  };
  /*checked={this.state.checked}
  onPress={() => this.setState({checked: !this.state.checked})}
/>*/
  const markDone = () => {
    setDone({ checked: !done });
  };
  const input1 = text => {   
    setAddress(text);
  };
  const input2 = text => {   
    setZip(text);
  };
  const input3 = text => {   
    setPcs(text);
  };

  useEffect(() => {
    firebase.database().ref('addressList/').on('value', snapshot => {
      const data = snapshot.val();
      const prods = Object.values(data);
      setOnList(prods);
    });
  }, []);

  saveItem = () => {
    firebase.database().ref('addressList/').push(
      {'address': address, 'zip': zip, 'pcs': pcs, 'info': info}
    );
    setAddress('');
    setZip('');
    setPcs('');
    setInfo('');
  }
  const listOrder = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#b22222'
        }}
      />
    );
  };

  return (
    <View style={styles.wholeScreen}>
      <StatusBar hidden={true} />
        <View style={styles.header}>
          <Header
            leftComponent={{ icon: 'menu', color: '#dcdcdc' }}
            centerComponent={{ text: 'pikkuAppari', style: { color: '#dcdcdc' } }}
            rightComponent={
              <Icon
                name='pencil'
                size={20}
                color='coral'
                onPress={addToList}
              /> }
            containerStyle={{
              backgroundColor: '#b22222',
              justifyContent: 'space-around',
            }}
          />
        </View>
      <Overlay isVisible={visible} onBackdropPress={addToList}>
        <Input 
          placeholder= 'Katuosoite & paikkakunta' 
          label='OSOITE' 
          onChangeText={input1} 
          value={address} 
        />
        <Input 
          placeholder= '' 
          label='POSTINRO' 
          keyboardType='numeric' 
          onChangeText={input2} 
          value={zip} 
          />
        <Input 
          placeholder= 'Laatikoiden lukumäärä'
          label='KPL' 
          keyboardType='numeric' 
          onChangeText={input3} 
          value={pcs} 
        />
          <Text
            style={styles.pickerHeader} >
            LAATIKON KOKO
          </Text>
            <Picker
              style={{ height: 80, width: '80%', color: 'grey' }}
              selectedValue={info}
              onValueChange={(itemValue, itemIndex) => 
                setInfo(itemValue)}
            >
              <Picker.Item 
                label="Valitse" 
                itemStyle={{color: 'grey'}}
              /> 
              <Picker.Item
                label="ISO"
                itemStyle={{color: 'grey'}}
                value="ISO" 
              />
              <Picker.Item 
                label="PIENI" 
                value="PIENI"
              />
            </Picker>
            <View style={styles.overlay}>
              <TouchableOpacity style={styles.overlayButton} onPress={saveItem}>
                <Text
                  style={styles.buttonText}>
                  Valmis
                </Text>
              </TouchableOpacity>
            </View>
      </Overlay>
        <View style={styles.listArea}>
            <FlatList
              data={addressList}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={listOrder}
              renderItem={ ({ item }) => 
                <ListItem
                  title= {item.address}
                  subtitle={item.info}
                  rightTitle={item.zip}
                  rightSubtitle={item.pcs}
                  checkBox= { value={done}, checked={done}, onPress={markDone} }
                  rightIcon= {{ type: 'font-awesome', name: 'angle-double-right' }} 
                  onPress={() => {
                      props.navigation.navigate({ routeName: 'l',
                      params: {
                          input: item.address
                      }
                      }) } }
                /> }
            />
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wholeScreen: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  header: {
    flex: 1
  },
  overlay: {
    alignItems: 'center'
  },
  overlayButton: {
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#ff7f50',
    borderColor: '#b22222',
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  },
  pickerHeader: {
    marginLeft: 10,
    marginTop: 10,
    color: '#b22222',
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#ff7f50',
    borderColor: '#b22222',
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff8dc'
  },
  listArea: {
    flex: 4
  }
});