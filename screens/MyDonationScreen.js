import React from 'react';
import MyHeader from '../components/MyHeader'
import firebase from 'firebase'
import db from '../config'
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View,FlatList } from 'react-native';
import {ListItem,Card,Icon} from 'react-native-elements'

export default class MyDonationScreen extends React.Component{
    static navigationOptions = {header:null}
    constructor(){
        super();
        this.state={
            allDonations: [],
            donorName:"",
            donorId:firebase.auth().currentUser.email,
        }
        this.requestRef=null;
    }
    getDonorDetails=(donorId)=>{
        db.collection("users").where('email_id','==',donorId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    donorName:doc.data().first_name + " "+doc.data().last_name 
                })
            })
        })
    }
    sendBook=(bookDetails)=>{
if(bookDetails.request_status==="Book Sent"){
    var requestStatus="Donor Interested"
    db.collection("all_donations").doc(bookDetails.doc_id).update({
        "request_status":"Donor Interested",
    })
    this.sendNotification(bookDetails,requestStatus);
}
else{
    var requestStatus="Book Sent"
    db.collection("all_donations").doc(bookDetails.doc_id).update({
        "request_status":"Book Sent",
    })
    this.sendNotification(bookDetails,requestStatus);
}
    }
    sendNotification=(bookDetails,requestStatus)=>{
var requestId=bookDetails.request_id;
var donorId=bookDetails.donor_id;
db.collection("all_notifications")
.where("request_id","==",requestId)
.where("donor_id","==",donorId)
.get()
.then((snapshot)=>{
    snapshot.forEach((doc)=>{
        var message=""
        if(requestStatus==="Book Sent"){
            message=this.state.donorName+"Sent You A Book"
        }
        else{
            message=this.state.donorName+"Has shown interest in donating the book"
        }
        db.collection("all_notifications").doc(doc.id).update({
            "message":message,
            "notification_status":"unread",
            "date":firebase.firestore.FieldValue.serverTimestamp(),

        })
    })
})
    }
 getAllDonations=()=>{
    this.requestRef=db.collection("all_donations").where("donor_id","==",this.state.donorId)
    .onSnapshot((snapshot)=>{
        var allDonations= snapshot.docs.map(doc=>doc.data())
        this.setState({
            allDonations:allDonations
        })
    })
 }

 keyExtractor =(item,index)=>index.toString()
 renderItem=({item,i})=>(
     <ListItem
     key={i}
     title={item.book_name}
     subtitle={"Requested By:"+item.requested_by+"\nStatus :"+item.request_status}
     leftElement={<Icon name="Book" type="font-awesome" color='#696969'/>}
     titleStyle={{color:'black',fontWeight:'bold'}}
     rightElement={
         <TouchableOpacity style={[styles.button,
         {backgroundColor:item.request_status==="Book Sent"?"green":"#FF5722"
         }]}
         onPress={()=>{
             this.sendBook(item);
         }}
         >
             <Text style ={{color:'#FFFFFF'}}>
                 {item.request_status==="Book Sent"?"Book Sent":"Send Book"}
             </Text>
         </TouchableOpacity>
     }
     bottomDivider
     />
 )
 componentDidMount(){
     this.getAllDonations();
 }
 componentWillUnmount(){
     this.requestRef();
 }
    render(){
        return(
            <View style ={{flex:1}}>
                <MyHeader navigation={this.props.navigation}
                          title="My Donation"/>
                          <View style={{flex:1}}>
                            {
                                this.state.allDonations.length===0
                                ?
                                (
                                    <View style={styles.subtitle}> 
                                    <Text style={{fontSize:20}}>List of All Book Donations</Text>
                                        </View>
                                )
                                :
                                (
                                    <FlatList
                                    keyExtractor={this.keyExtractor}
                                    data={this.state.allDonations}
                                    renderItem={this.renderItem}
                                    />
                                )
                            }
                          </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       },
      elevation : 16
    },
    subtitle :{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    }
  })