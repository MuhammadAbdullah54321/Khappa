import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import database from '@react-native-firebase/database'
import styles from '../../resources/styles/styles'
import ItemCard from '../itemcards/ItemCard'

class CategoryItems extends React.Component{
    constructor(){
      super()
      this.state = {
        itemsArray: [],
        catName: '',
        modalVisible: false,
        itemName: '',
        itemPrice: '',
        costPrice: '',
        viewOpacity: 1
      }
      this.setModal = this.setModal.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.checkInputFields = this.checkInputFields.bind(this)
    }
    componentDidMount(){
      var catName = this.props.route.params.catName
      this.setState({
        catName: catName
      })
      database().ref(`/Khappa/${catName}`).on('value', snapshot => {
        var p = snapshot.val()
        var tempArray = []
        for (var key in p) {
          if (p.hasOwnProperty(key)) {
              tempArray.push(key)
          }
        }
        this.setState({
          itemsArray: tempArray
        })
      });
    }
    setModal(){
      this.setState({
        modalVisible: !this.state.modalVisible,
        viewOpacity: .1
      })
    }
    checkInputFields(){
      if( this.state.itemName == '' || this.state.itemPrice == '' || this.state.costPrice == ''){
        
        Alert.alert('None of the fields can be left empty')
        this.setState({ 
          itemName: '', 
          itemPrice: '',
          costPrice: '',
          catName: '',
          modalVisible: !this.state.modalVisible,
          viewOpacity: 1
        })
      }
      else{
        this.handleSubmit()
      }
    }
    handleSubmit(){
      var catName = this.state.catName
      var itemName = this.state.itemName
      var sP = this.state.itemPrice
      var cP = this.state.costPrice
      var sC = 0
      console.log(typeof(itemName))
      console.log(typeof(salePrice))
      database().ref(`/Khappa/${catName}/${itemName}`).update({salePrice: sP, soldCount: sC, costPrice: cP})
      this.setState({
        modalVisible: !this.state.modalVisible,
        viewOpacity: 1
      })
      this.props.navigation.navigate('Home')
    }
    render(){
      const catName = this.props.route.params.catName
      const itemsAr = []
      this.state.itemsArray.map((itemName, index) => itemsAr.push(<ItemCard key={index} itemName={itemName} catName={catName} />))
      return (
        <View style={{flex: 1}} opacity={this.state.viewOpacity}>
          <View style={styles.catNameView}>
            <Text style={styles.catNameText}>{catName}</Text>
          </View>
          <ScrollView>
            <View style={{flexDirection: 'column'}}>
              {itemsAr}
            </View>
          </ScrollView>
          <View style={styles.addItemView}>
            <TouchableOpacity style={styles.addItemTouch} onPress={this.setModal}>
              <Text style={styles.addItemText}>
                + Add Item 
              </Text>
            </TouchableOpacity>
          </View>
          <Modal 
            animationType='slide'
            transparent={true}
            visible={this.state.modalVisible}
            backdropColor="black"
            onBackdropPress={() => {this.setState({modalVisible: !this.state.modalVisible, viewOpacity: 1})}}
            onBackButtonPress={() => {this.setState({modalVisible: !this.state.modalVisible, viewOpacity: 1})}}
          >
            <View style={styles.modalView}>
              <View style={{flex: 1}}>
                <ScrollView>
                <View>
                  <View style={{alignItems: 'center'}}><Text style={{fontSize: 35, color: '#fff'}}>Lets add an Item !</Text></View>
                  <Text style={styles.itemPropText}>Item Name:</Text>
                  <TextInput
                    style={styles.inputItemName}
                    placeholder="Type here"
                    onChangeText={(text) => {this.setState({itemName: text})}}
                    //onChangeText={text => setText(text)}
                    //defaultValue={text}
                  />
                
                  <Text style={styles.itemPropText}>Item Price:</Text>
                  <TextInput
                    style={styles.inputItemName}
                    keyboardType='numeric'
                    placeholder="Type here"
                    onChangeText={(text) => {this.setState({itemPrice: text})}}
                    //defaultValue={text}
                  />
                  <Text style={styles.itemPropText}>Cost Price:</Text>
                  <TextInput
                    style={styles.inputItemName}
                    keyboardType='numeric'
                    placeholder="Type here"
                    onChangeText={(text) => {this.setState({costPrice: text})}}
                    //defaultValue={text}
                  />
                </View>
                </ScrollView>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                  <TouchableOpacity style={styles.submitItemTouch } onPress={this.checkInputFields}>
                    <Text style={styles.submitItemText}>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelTouch } onPress={() => {this.setState({modalVisible: !this.state.modalVisible, viewOpacity: 1})}}>
                    <Text style={styles.submitItemText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      );
    }
  }
export default CategoryItems  