import {StyleSheet, Dimensions} from 'react-native'
const WW = Dimensions.get('window').width
const WH = Dimensions.get('window').height
const BR = 5
const PURPLE = '#651fff'
const ORANGE = '#fa9a00'

const styles = StyleSheet.create({
    main:{
      flex: 2,
      backgroundColor: PURPLE,
      paddingTop: 0,
    },
    main1:{
      flexDirection: 'row',
      justifyContent: "center",
      alignContent:'center'
    },
    categoryMainView:{
      backgroundColor: '#fff',
      width: WW/1.1,
      margin: 10,
      padding: 5,
      justifyContent: "center",
      borderRadius: BR
    },
    categoryNameText:{
      fontSize: 20
    },
    catNameView:{
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      borderRadius: BR,
      borderColor: PURPLE,
      borderWidth: 5,
      margin: 10
    },
    catNameText:{
      fontSize: 40,
      color: PURPLE
    },
    cardView:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      backgroundColor: PURPLE, 
      borderRadius: BR,
      margin: 10
    },
    cardItemText:{
      color: '#fff',
      fontSize: 15,
      
    },
    cardPriceText:{
      color: '#fff',
      fontSize: 15,
      
    },
    plusMinusIcon:{
      color: PURPLE,
      fontSize: 30
    },
    iconView:{
      flexDirection: 'row'
    },
    iconTouch:{
      backgroundColor: '#fff',
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 5,
      borderRadius: BR,
      height: 40
    },
    totalText:{
      color: '#fff',
      fontSize: 15
    },
    addItemView:{
      justifyContent: "center",
      alignItems: "center",
    },
    addItemTouch:{
      backgroundColor: ORANGE,
      width: WW/1.2,
      borderRadius: BR,
      height: 50,
      marginBottom: 10,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10
    },
    addCatTouch:{
      backgroundColor: ORANGE,
      width: WW/2.4,
      borderRadius: BR,
      height: 50,
      marginBottom: 10,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10
    },
    addItemText:{
      fontSize: 20,
      color: '#fff'
    },
    modalView: {
      margin: 4,
      marginTop: WH/50,
      backgroundColor: ORANGE,
      borderRadius: BR,
      padding: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 20,
        height: 50
      },
      shadowOpacity: .7,
      shadowRadius: 8.84,
      elevation: 20,
      height: WH/2.2
    },
    submitItemTouch:{
      backgroundColor: PURPLE,
      alignItems: "center",
      justifyContent: "center",
      padding: 5,
      borderRadius: BR,
      marginTop: 10,
      width: WW/2,
      marginRight: 5
    },
    submitCatTouch:{
      backgroundColor: PURPLE,
      alignItems: "center",
      justifyContent: "center",
      padding: 5,
      borderRadius: BR,
      marginTop: 10,
      width: WW/2,
      marginRight: 1
    },
    inputItemName:{
      borderRadius: BR,
      borderColor: PURPLE,
      borderWidth: 4,
      paddingLeft: 20,
      width: WW/1.2,
    },
    submitItemText:{
        fontSize: 22,
        color: '#fff'
    },
    itemPropText:{
        marginTop: WH/50,
        fontSize: 15,
        marginBottom: 0,
        color: '#fff'
    },
    cancelTouch:{
        backgroundColor: 'black',
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: BR,
        marginTop: 10
    },
    addCatView:{
      flexDirection: 'row',  
      backgroundColor: PURPLE,
      justifyContent: 'space-around',
      alignItems: 'center'

    },
    catModalView:{
      margin: 4,
      marginTop: 0,
      marginBottom: 20,
      backgroundColor: ORANGE,
      borderRadius: BR,
      padding: 5,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 20,
        height: 14
      },
      shadowOpacity: .7,
      shadowRadius: 8.84,
      elevation: 20,
      height: WH/1.59
    },
    catModalView2:{
      margin: 4,
      marginTop: WH/12,
      backgroundColor: ORANGE,
      borderRadius: BR,
      padding: 5,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 20,
        height: 50
      },
      shadowOpacity: .7,
      shadowRadius: 8.84,
      elevation: 20,
      height: WH/1.7
    },
    
  })
  export default styles