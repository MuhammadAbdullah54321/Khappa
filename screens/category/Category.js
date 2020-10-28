import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from '../../resources/styles/styles'


class Category extends React.Component{
    constructor(props){
      super(props)
    }
    render(){
      return (
        <View>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Category Items', {catName: this.props.categoryName})}}>
          <View style={styles.categoryMainView}>
              <Text style={styles.categoryNameText}>{this.props.categoryName}</Text>
          </View>
        </TouchableOpacity>
        </View>
      );
    }
}
export default Category