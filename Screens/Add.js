import React,{useState} from 'react';
import {ScrollView,StyleSheet} from 'react-native'
import {
    Text,
    Container,
    Content,
    Form,
    H1,
    Item,
    Input,
    Label,
    Button
} from 'native-base';


import shortId from 'shortid'
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar'

const Add=({navigation})=>{

    const [name,setName]=useState('');
    const [totalNoSeason, setTotalNoSeason]=useState('')

    const addToList=async ()=>{
        try {
            if(!name || !totalNoSeason)
            {
               return Snackbar.show({
                    text: 'Please fill values',
                    backgroundColor: '#EA7773',
                    textColor: '#000000',
                  });
            }

            const seasonToAdd={
                id: shortId.generate(),
                name: name,
                totalNoSeason: totalNoSeason,
                isWatched: false
            }
            
            const storedValue=await AsyncStorage.getItem('@season_list');
            const prevList=await JSON.parse(storedValue);

            if(!prevList)
            {
                const newList=[seasonToAdd];
                await AsyncStorage.setItem('@season_list',JSON.stringify(newList));
            }
            else
            {
                prevList.push(seasonToAdd);
                await AsyncStorage.setItem("@season_list",JSON.stringify(prevList));

            }

            
            navigation.navigate('Home');

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <H1 style={styles.heading}>Add to Watch List</H1>
                <Form>
                <Item rounded style={styles.formItem} floatingLabel >
                    <Label style={{marginHorizontal:20,color:'#00b7c2'}}>Season Name*</Label>
                        <Input
                        style={{color: "#eee",marginBottom:20,marginHorizontal:20}}
                        value={name}
                        onChangeText={(text)=>setName(text)}
                        />
                    </Item>
                    <Item rounded style={styles.formItem} floatingLabel>
                    <Label style={{marginHorizontal:20,color:'#00b7c2'}}>Total No of seasons*</Label>
                        <Input
                        style={{color: "#eee",marginBottom:20,marginHorizontal:20}}
                        value={totalNoSeason}
                        onChangeText={(text)=>setTotalNoSeason(text)}
                        />
                    </Item>

                    <Button 
                    rounded 
                    block
                    onPress={addToList} 
                    style={{marginTop:20}}>
                        <Text>Add</Text>
                    </Button>
                </Form>
            </ScrollView>
        </Container>
    )
}

export default Add;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'flex-start',
    },
    heading: {
      textAlign: 'center',
      color: '#00b7c2',
      marginHorizontal: 5,
      marginTop: 50,
      marginBottom: 30,
    },
    formItem: {
      marginBottom: 20,
      marginRight:20
    },
  });