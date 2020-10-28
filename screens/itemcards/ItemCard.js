import React from 'react';
import {View,Text,TouchableOpacity,} from 'react-native';
import database from '@react-native-firebase/database'
import styles from '../../resources/styles/styles'

class ItemCard extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        count: 0,
        catName: '',
        itemName: '',
        salePrice: 0
      }
      this.handlePlusPress = this.handlePlusPress.bind(this)
      this.handleMinusPress = this.handleMinusPress.bind(this) 
    }
    componentDidMount(){
      console.log("in DID MOUNT before catName")
      var catName = this.props.catName
       var itemName = this.props.itemName
       database().ref(`/Khappa/${catName}/${itemName}`).on('value', snapshot => {
         var p = snapshot.val()
         var soldCount = p.soldCount
         var salePrice = p.salePrice
         console.log("soldCount:",soldCount)
         console.log("salePRice:",salePrice)
         this.setState({
           count: soldCount,
           catName: catName,
           itemName: itemName,
           salePrice: salePrice
         })
       });
    }
  
    handlePlusPress(){
      var catName = this.state.catName
      var itemName = this.state.itemName
      var count = this.state.count + 1
      database().ref(`/Khappa/${catName}/${itemName}/`).update({'soldCount': count})
    }
    handleMinusPress(){
      if(this.state.count == 0){
      }
      else{
        var catName = this.state.catName
        var itemName = this.state.itemName
        var count = this.state.count - 1
        database().ref(`/Khappa/${catName}/${itemName}/`).update({'soldCount': count})
      }
    }
    render(){
      const name = this.props.itemName
      const salePrice = this.state.salePrice
      return (
        <View style={styles.cardView}>
          <View>
            <Text style={styles.cardItemText}>{name} </Text>
            <Text style={styles.cardPriceText}>Price: {salePrice} </Text>
          </View>
          <View style={styles.iconView}>
            <TouchableOpacity style={styles.iconTouch} onPress={this.handleMinusPress}>
              <Text style={styles.plusMinusIcon}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconTouch} onPress={this.handlePlusPress}>
              <Text style={styles.plusMinusIcon}>+</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.totalText}>Total: {this.state.count}</Text>
          </View>
        </View>
      );
    }
}
export default ItemCard