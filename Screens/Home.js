import React,{useState,useEffect} from 'react';
import {StyleSheet,ScrollView} from 'react-native'

import {Fab,
  Icon,
  List,
  ListItem,
  Text,
  Button,
  Body,
  Right,
  Left,
  CheckBox,
  Title,
  H1,
  Subtitle,
  Container,
  Spinner
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native'

const Home=({navigation,route})=>{

    const [listOfSeasons, setListOfSeasons] = useState([]);
    const [loading, setLoading] = useState(false);

    const isFocused=useIsFocused();

    const getList=async  ()=>{
      setLoading(true);

      const storedValue=await AsyncStorage.getItem('@season_list');

      if(!storedValue)
      {
        setListOfSeasons([]);
      };

      const list=JSON.parse(storedValue);
      setListOfSeasons(list);
      

      setLoading(false);
    };

    const deleteSeason=async (id)=>{
       
        const newList= await listOfSeasons.filter((list)=> list.id != id);

        await AsyncStorage.setItem('@season_list',JSON.stringify(newList));
        setListOfSeasons(newList);
    }

    const markComplete=async (id)=>{
      
        const newList=await listOfSeasons.map((list)=>{
          if(list.id == id)
          {
            list.isWatched= !list.isWatched;
          }
          return list;
        })

        await AsyncStorage.setItem('@season_list',JSON.stringify(newList));
        setListOfSeasons(newList);
    }

    useEffect(() => {
      getList();
    }, [isFocused]);

    if(loading){
      return(
        <Container style={styles.container}>
          <Spinner color="#00b7c2"/>
        </Container>
      )
    }


    return (
     <ScrollView contentContainerStyle={styles.container}> 
        {listOfSeasons.length==0 ? (
          <Container style={styles.container}>
            <H1 style={styles.heading}>
              WatchList is empty. Please add a Season.
            </H1>
          </Container>
        ):(
          <ScrollView>
          <H1 style={styles.heading}>Next series to Watch..</H1>
          <List>
            {listOfSeasons.map((season)=>(
              <ListItem key={season.id} style={styles.listItem}>
              <Left>
                  <Button style={styles.actionButton} 
                  danger 
                  onPress={()=>deleteSeason(season.id)}
                  >
                    <Icon style={styles.icon} name="trash" active/>
                  </Button>
                  <Button style={styles.actionButton} onPress={()=>navigation.navigate('Edit',{season})}>
                    <Icon style={styles.icon} name="edit" type="Feather"/>
                  </Button>
                </Left>
                <Body style={styles.body}>
                  <Title style={styles.seasonName}>{season.name}</Title>
                  <Text note style={{textAlign:"left"}}>{season.totalNoSeason} seasons to watch</Text>
                </Body>
                
                <Right>
                  <CheckBox
                  checked={season.isWatched}
                  onPress={()=>markComplete(season.id)}
                  style={{marginRight:8}}/>
                </Right>
                
              </ListItem>
            ))}
          </List>
          </ScrollView>
        )}
         <Fab
         containerStyle={{padding:20,marginBottom:20}}
         style={{backgroundColor:'#5067FF'}}
         position='bottomRight'
         onPress={()=>navigation.navigate('Add')}>
             <Icon name="add"/>
         </Fab>
     </ScrollView>
    
    )
}

export default Home;

const styles = StyleSheet.create({
    emptyContainer: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      
    },
    heading: {
      textAlign: 'center',
      color: '#00b7c2',
      marginVertical: 15,
      marginHorizontal: 1,
      marginRight:20
    },
    actionButton: {
      padding:1,
      width:30,
      height:30 ,
      marginLeft:8
    },
    icon:{
      width:25,
      margin:4,
      marginLeft:2

    },
    body:{
      marginRight:5,
      flex:0,
      flexWrap:'wrap',
      alignItems:'center',
      justifyContent:'center'

    },
    seasonName: {
      color: '#fdcb9e',
      padding:1,
      textAlign:'center',
      alignItems:'center',
      justifyContent:'center'
    },
    listItem: {
      marginLeft:0,
      marginBottom: 20,
     alignItems:'center',
     justifyContent:'center'
    },
  });