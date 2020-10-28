import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StatusBar, 
  Alert,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import database from '@react-native-firebase/database'
import NetInfo from '@react-native-community/netinfo'
import styles from '../../resources/styles/styles'
import Category from '../category/Category'

class HomeScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      catArray: [],
      x: 0,
      loaded: false,
      modalVisible: false,
      itemName: '',
      itemPrice: '',
      costPrice: '',
      catName: '',
      catModalView: styles.catModalView,
      viewOpacity: 1,
      disableStatus: false,
      dailyResetOpacity: .5
    } 
    this.handleConnectivityChange = this.handleConnectivityChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkInputFields = this.checkInputFields.bind(this)
    this.setTimer1 = this.setTimer1.bind(this)
    this.setTimer2 = this.setTimer2.bind(this)
    this.handleDailyReset = this.handleDailyReset.bind(this)
    this.timer1 = null
    this.timer2 = null
  }
  setTimer1(){
    this.timer1 = setInterval(() => {
      let date = new Date()
      let hours = date.getHours()
      if(hours > 18 || hours < 10 ){
        this.setState({
          disableStatus: false
        })
      }
      else{
        this.setState({
          disableStatus: true
        })
      }
    }, 10);
  }
  setTimer2(){
    this.timer2 = setInterval(() => {
      let date = new Date()
      let hours = date.getHours()
      if(hours > 18 || hours < 10 ){
        console.log(hours)
        this.setState({
          disableStatus: false
        })
      }
      else{
        this.setState({
          disableStatus: true
        })
      }
      clearInterval(this.timer1)
    }, 1000);
  }
  
  componentDidMount(){
    this.setTimer1()
    this.setTimer2()
    NetInfo.addEventListener(this.handleConnectivityChange); 
  }
  handleConnectivityChange = state => {
    if (state.isConnected) {
      database().ref('/Khappa').on('value', snapshot => {
        var p = snapshot.val()
        var tempArray = []
        for (var key in p) {
          if (p.hasOwnProperty(key)) {
              tempArray.push(key)
          }
        }
        this.setState({
          catArray: tempArray,
          loaded: true
        })
      });
    } else {
      Alert.alert('Please check your internet connection')
      this.setState({connection_Status: 'Offline'});
    }
  }
  handleDailyReset(){
    this.state.catArray.forEach(element => {
      database().ref(`/Khappa/${element}`).once('value', snapshot => {
        var p = snapshot.val()
        var tempArray = []
        for (var key in p) {
          if (p.hasOwnProperty(key)) {
              tempArray.push(key)
          }
        }
        tempArray.forEach(ele => {
          database().ref(`/Khappa/${element}/${ele}`).update({soldCount: 0})
          console.log(ele)
        })
      }) 
    });
    Alert.alert('Sold Count for all the products have been set to zero')
  }
  handleSubmit(){
    var catName = this.state.catName
    var itemName = this.state.itemName
    var sP = this.state.itemPrice
    var cP = this.state.costPrice
    var sC = 0
    database().ref(`/Khappa/${catName}/${itemName}`).update({salePrice: sP, soldCount: sC, costPrice: cP})
    this.setState({
      modalVisible: !this.state.modalVisible,
      viewOpacity: 1
    })
    this.props.navigation.navigate('Home')
  }
  checkInputFields(){
    if(this.state.catName == '' || this.state.itemName == '' || this.state.itemPrice == '' || this.state.costPrice == ''){
      Alert.alert('None of the fields can be left empty')
      this.setState({
        itemName: '', 
        itemPrice: '',
        catName: '',
        costPrice: '',
        modalVisible: !this.state.modalVisible,
        viewOpacity: 1
      })
    }
    else{
      this.handleSubmit()
    }
  }
  render(){
    var temp = <View style={styles.main1}> 
                  <View>
                    {this.state.catArray.map((cat, index, arr) => (<Category key= {index} navigation={this.props.navigation} categoryName={cat}  />))}
                  </View>
                </View>
    var temp1 = <ActivityIndicator size='large' color='#fcb103'/>
    return (
      <View style={{flex: 1, }} opacity={this.state.viewOpacity}>
        <StatusBar backgroundColor='#651fff' />
        <View>
          <Image style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height/3.5}}  source={require('../../Images/Khapa.jpg')}/>
        </View>
        <View style={styles.main}>
          <ScrollView >
            {!this.state.loaded ? temp1 : temp}
          </ScrollView>
        </View>
        <View>
          <View style={styles.addCatView}>
            <TouchableOpacity style={styles.addCatTouch} onPress={() => {this.setState({modalVisible: !this.state.modalVisible, viewOpacity: .1})}}>
              <Text style={styles.addItemText}>
                + Add Category 
              </Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={this.state.disableStatus} style={{...styles.addCatTouch, opacity: this.state.disableStatus ? this.state.dailyResetOpacity : 1}} onPress={this.handleDailyReset}>
              <Text style={styles.addItemText}>
                Daily Reset
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addCatView}>
            <TouchableOpacity style={styles.addCatTouch} onPress={() => {this.props.navigation.navigate('Statistics')}}>
              <Text style={styles.addItemText}>
                Show Statistics 
              </Text>
            </TouchableOpacity>
            <TouchableOpacity   style={styles.addCatTouch} onPress={() => {Alert.alert("You are soo touchy. Don't Touch me again.")}}>
              <Text style={styles.addItemText}>
                Don't Touch Me
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal 
          animationType='slide'
          transparent={true}
          visible={this.state.modalVisible}
          onBackdropPress={() => {this.setState({modalVisible: !this.state.modalVisible, viewOpacity: 1})}}
          onBackButtonPress={() => {this.setState({modalVisible: !this.state.modalVisible, viewOpacity: 1})}}
        >
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center'}}>
          <View style={this.state.catModalView}>
            <View style={{flex: 1}}>
            <ScrollView>
              <View>
                <View style={{alignItems: 'center'}}><Text style={{fontSize: 30, color: '#fff'}}>Lets add a Category !</Text></View>
                <Text style={styles.itemPropText}>Category Name:</Text>
                  <TextInput
                    style={styles.inputItemName}
                    placeholder="Type here"
                    onChangeText={(text) => {this.setState({catName: text})}}
                    //onChangeText={text => setText(text)}
                  />
                <Text style={styles.itemPropText}>You have to add atleast 1 item when adding new category</Text>
                <Text style={styles.itemPropText}>Item Name:</Text>
                <TextInput
                  style={styles.inputItemName}
                  placeholder="Type here"
                  keyboardType='default'
                  onChangeText={(text) => {this.setState({itemName: text})}}
                  onFocus={() => {this.setState({catModalView: styles.catModalView2})}}
                   onSubmitEditing={() => {this.setState({catModalView: styles.catModalView})}}
                  //onChangeText={text => setText(text)}
                />
                <Text style={styles.itemPropText}>Item Price:</Text>
                <TextInput
                  style={styles.inputItemName}
                  keyboardType='numeric'
                  placeholder="Type here"
                  onChangeText={(text) => {this.setState({itemPrice: text})}}
                  onFocus={() => {this.setState({catModalView: styles.catModalView2})}}
                  onSubmitEditing={() => {this.setState({catModalView: styles.catModalView})}}
                  //defaultValue={text}
                />
                <Text style={styles.itemPropText}>Cost Price:</Text>
                <TextInput
                  style={styles.inputItemName}
                  keyboardType='numeric'
                  placeholder="Type here"
                  onChangeText={(text) => {this.setState({costPrice: text})}}
                  onFocus={() => {this.setState({catModalView: styles.catModalView2})}}
                  onSubmitEditing={() => {this.setState({catModalView: styles.catModalView})}}
                  //defaultValue={text}
                />
              </View>
              </ScrollView>
              <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity style={styles.submitCatTouch } onPress={this.checkInputFields}>
                  <Text style={styles.submitItemText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelTouch } onPress={() => {this.setState({modalVisible: !this.state.modalVisible, viewOpacity: 1})}}>
                  <Text style={styles.submitItemText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
            
          </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default HomeScreen