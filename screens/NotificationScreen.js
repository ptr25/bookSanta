import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView} from 'react-native';
    import firebase from 'firebase';
    import db from '../config';
    import MyHeader from '../components/MyHeader';
    import {ListItem,Icon} from 'react-native-elements'
    import SwipableFlatList from '../components/SwipableFlatList'

export default class NotificationScreen extends React.Component{
constructor(props){
super(props);
this.state={
userId:firebase.auth().currentUser.email,
allNotifications:[]
}
this.notificationRef=null
}
getNotifications=()=>{
    this.notificationRef=db.collection("all_notifications")
    .where("notification_status","==","unread")
    .where("targetted_user_id","==",this.state.userId)
    .onSnapshot((snapshot)=>{
        var allNotifications=[]
        snapshot.docs.map((doc)=>{
            var notification= doc.data()
            notification["doc_id"]=doc.id
            allNotifications.push(notification)
        })
        this.setState({allNotifications:allNotifications})
    })
}
componentDidMount(){
    this.getNotifications();
}
componentWillUnmount(){
    this.notificationRef();
}
keyExtractor=({item,index})=>{
    return(
        <ListItem
        key = {index}
        leftElement={<Icon
        name="book"
        type="font-awesome"
        color="#696969"
        />}
        title = {item.book_name}
        titleStyle= {{color:"black",fontWeight:"bold"}}
        subtitle={item.message}
        bottomDivider
        />

    )
}
render(){
    return(
        <View style={styles.container}>
<View style ={{flex:0.1}}>
        <MyHeader
        title={"Notifications"}
        navigation={this.props.navigation}
        />
</View>
<View style = {{flex:0.9}}>
{
    this.state.allNotifications===0
    ?
    (
        <View style={{justifyContent:'center' ,flex:1 ,alignItems:'center'}}>
            <Text style={{fontSize:25}}>You Have No Notifications</Text>
        </View>
    )
    :
(
    <SwipableFlatList allNotifications={this.state.allNotifications}/>
)
}
</View>
        </View>
    )
}
}    
const styles = StyleSheet.create({
    container:{
        flex:1
    }
})