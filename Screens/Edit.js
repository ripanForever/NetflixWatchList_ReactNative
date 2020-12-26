import React,{useState,useEffect} from 'react';
import {ScrollView,StyleSheet} from 'react-native';
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
} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';


const Edit=({navigation,route})=>{

  const [name, setName] = useState("");
  const [totalNoSeason, setTotalNoSeason] = useState("");
  const [id, setId] = useState(null);


 
  

  const update=async ()=>{
    try {

        if(!name || !totalNoSeason)
        {
          return Snackbar.show({
            text: 'Please fill values',
            backgroundColor: '#EA7773',
            textColor: '#000000',
          });
          
        }
        const seasonToUpdate={
          id,
          name,
          totalNoSeason,
          isWatched:false
        };

        const storedValue=await AsyncStorage.getItem("@season_list");
        const list=await JSON.parse(storedValue);

        list.map((singleSeason)=>{
          if(singleSeason.id == id)
          {
            singleSeason.name=name;
            singleSeason.totalNoSeason=totalNoSeason;
          }
          return singleSeason;
        })

        await AsyncStorage.setItem('@season_list',JSON.stringify(list));

        navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  }

   //first it gets reloaded and fill the values with previous values(name,totalNoSeason)
  useEffect(() => {
    const {season}=route.params;
    const {id,name,totalNoSeason}=season;

    setId(id);
    setName(name);
    setTotalNoSeason(totalNoSeason)
  }, [])
 

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
                onPress={update} 
                style={{marginTop:20}}>
                    <Text>Update</Text>
                </Button>
            </Form>
        </ScrollView>
    </Container>
)
}

export default Edit;
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
      marginBottom: 20,
    },
    formItem: {
      marginBottom: 20,
    },
  });