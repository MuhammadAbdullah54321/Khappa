import React from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import database from '@react-native-firebase/database'

class Statistics extends React.Component{
    constructor(){
        super()
        this.state = {
            totalCount: 0,
            totalCash: 0,
            totalInvestment: 0.0,
        }
        this.getDataForStats()
    }
    async getDataForStats(){
        var tempArray = []
        var tempArray2 = []
        var tempArray3 = []
         database().ref(`/Khappa`).on('value', snapshot => {
            var p = snapshot.val()
            
            Object.keys(p).forEach(ele =>{
                tempArray.push(ele)
            })
            tempArray.forEach(element => {
                tempArray2.push(p[element]) 
            });
            
            console.log('Temp Array 22:', tempArray2)
            tempArray2.forEach( (obj, i) => {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        tempArray3.push(tempArray2[i][key])

                    }
                    this.setState({
                        totalCash: this.state.totalCash + (tempArray2[i][key].salePrice * tempArray2[i][key].soldCount),
                        totalInvestment: this.state.totalInvestment + (tempArray2[i][key].soldCount * tempArray2[i][key].costPrice)
                        
                    })
                    console.log('Cost Price:', this.state.totalInvestment)
                  }
            })
            tempArray3.forEach(y => {
                var w = y.soldCount
                this.setState({
                    totalCount: this.state.totalCount + w
                })
                console.log(this.state.totalCount)
            })
        })
    }
    render(){
        var S = this.state
        return (
            <View style={styles.main}>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>Daily Satatistics of This day</Text>
                </View>
                <View style={styles.statDetails}>
                    <View style={styles.detailTextView}>
                        <Text style={styles.detailText}>Total # of items Sold ----- </Text><View style={styles.figuresView}><Text style={styles.figures}>{S.totalCount}</Text></View>
                    </View>
                    <View style={styles.detailTextView}>
                        <Text style={styles.detailText}>Cash from Total Sale ----- </Text><View style={styles.figuresView}><Text style={styles.figures}>{S.totalCash}</Text></View>
                    </View>
                    <View style={styles.detailTextView}>
                        <Text style={styles.detailText}>Profit ----- </Text><View style={styles.figuresView}><Text style={styles.figures}> {(S.totalCash - S.totalInvestment).toFixed(2)}</Text></View>
                    </View>
                </View>
            </View>
        );
    }
}
var WW = Dimensions.get('window').width
var WH = Dimensions.get('window').height

const styles = StyleSheet.create({
    main:{
        flex: 1,
    },
    heading:{
        justifyContent: "center",
        alignItems: "center",
        padding: WW/20,
        backgroundColor: '#ff770f',
        borderRadius: 5,
        margin: WW/30,
        marginBottom: 1
    },
    headingText:{
        fontSize: 20
    },
    statDetails:{
        justifyContent: "center",
        padding: WW/20,
        backgroundColor: '#651fff',
        borderRadius: 5,
        margin: WW/30,
        marginTop: 5
    },
    detailText:{
        fontSize: 20,
        color: '#fff'
    },
    detailTextView:{
        flexDirection: "row", 
        borderRadius: 5,
        borderBottomWidth: 2,
        borderColor: '#fff',
        marginTop: 10
    },
    figures:{
        fontSize: 20,
    },
    figuresView:{
        backgroundColor: '#fff',
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        width: WH/10,
    }
})
export default Statistics