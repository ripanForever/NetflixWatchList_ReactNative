import React from 'react';
import {
Text
} from 'react-native';
import{Right,Button,Icon} from 'native-base'

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//all screens
import Home from './Screens/Home';
import Add from './Screens/Add';
import Edit from './Screens/Edit'

const Stack=createStackNavigator();

const App=()=>{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle:{
            backgroundColor:"#0f4c75"
          },
          title:"LCO Netflix App",
          headerTitleStyle:{
            textAlign:"center",
            alignSelf:'center',
            color:'#00b7c2',
            marginLeft:50,
          },
          headerRight:()=>(
            <Right>
            <Button transparent >
              <Icon style={{color:'#bcbcbc',marginTop:12,padding:5,fontSize:19}} name="search" />
            </Button>
          </Right>
          )
        }}>
           
        </Stack.Screen>
        <Stack.Screen
        name="Add"
        component={Add}
        options={{
          headerStyle:{
            backgroundColor:"#0f4c75"
          },
          title:"LCO Netflix App",
          headerTitleStyle:{
            textAlign:'center',
            color:'#00b7c2',
            marginRight:53
          }
        }}>
          
        </Stack.Screen>
        <Stack.Screen
        name="Edit"
        component={Edit}
        options={{
          headerStyle:{
            backgroundColor:"#0f4c75"
          },
          title:"LCO Netflix App",
          headerTitleStyle:{
            textAlign:'center',
            color:'#00b7c2'
          }
        }}>

        </Stack.Screen>

      </Stack.Navigator>

    </NavigationContainer>
  )
}

export default App;
