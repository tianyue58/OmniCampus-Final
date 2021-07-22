import * as React from 'react';
import { StyleSheet, Text, View, Linking, SafeAreaView, TouchableOpacity } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import Colors from '../constants/Colors';


const ResourceScreen = () => {
  return (
    <View>
      {/* NUSMods */}
      <View style={styles.container} backgroundColor="#d0ecea">
      
      <Hyperlink
        linkDefault
        linkStyle={{color: Colors.light.tint, fontSize: 20}}
        linkText={(url) =>
          url === 'https://nusmods.com/timetable/sem-1' ? 'NUSMods' : url
        }>  
        <View>
        <Text style={styles.text}>
          https://nusmods.com/timetable/sem-1
      </Text>
      <Text style={{color: 'grey', paddingTop: 10}}>
      
      Plan Modules in Future Semesters
      </Text>
          </View> 
      
      </Hyperlink>
      </View>

      {/* edurec */}
      <View style={styles.container} backgroundColor="#fffcdd">
      
      <Hyperlink
        linkDefault
        linkStyle={{color: Colors.light.tint, fontSize: 20}}
        linkText={(url) =>
          url === 'https://myedurec.nus.edu.sg/psp/cs90prd/?cmd=login' ? 'EduRec' : url
        }>  
        <View>
        <Text style={styles.text}>
        https://myedurec.nus.edu.sg/psp/cs90prd/?cmd=login
      </Text>
      <Text style={{color: 'grey', paddingTop: 10}}>
        View Academic and Financial-Related Information
      </Text>
        </View> 
      
      </Hyperlink>
      </View>

        {/* LumiNus */}
      <View style={styles.container} backgroundColor="#dcedc2">
      
      <Hyperlink
        linkDefault
        linkStyle={{color: Colors.light.tint, fontSize: 20}}
        linkText={(url) =>
          url === 'https://luminus.nus.edu.sg/?r=%2Fdashboard' ? 'LumiNUS' : url
        }>  
        <View>
        <Text style={styles.text}>
        https://luminus.nus.edu.sg/?r=%2Fdashboard
      </Text>
      <Text style={{color: 'grey', paddingTop: 10}}>
        View your Enrolled Module here
      </Text>
          </View> 
      
      </Hyperlink>
      </View>

      {/* Coursemology */}
      <View style={styles.container} backgroundColor="#dce4f7">
      
      <Hyperlink
        linkDefault
        linkStyle={{color: Colors.light.tint, fontSize: 20}}
        linkText={(url) =>
          url === 'https://coursemology.org' ? 'Coursemology' : url
        }>  
        <View>
        <Text style={styles.text}>
        https://coursemology.org
      </Text>
      <Text style={{color: 'grey', paddingTop: 10}}>
        Gamified Online Education Platform
      </Text>
          </View> 
      
      </Hyperlink>
      </View>

      {/* NUSWebmail */}
      <View style={styles.container} backgroundColor="#f7d7cd">
      
      <Hyperlink
        linkDefault
        linkStyle={{color: Colors.light.tint, fontSize: 20}}
        linkText={(url) =>
          url === 'https://exchange.nus.edu.sg/owa/auth/logon.aspx?url=https://exchange.nus.edu.sg/owa/&reason=0' ? 'NUS Webmail' : url
        }>  
        <View>
        <Text style={styles.text}>
        https://exchange.nus.edu.sg/owa/auth/logon.aspx?url=https://exchange.nus.edu.sg/owa/&reason=0
      </Text>
      <Text style={{color: 'grey', paddingTop: 10}}>
      Access your NUSmail here
      </Text>
          </View> 
      
      </Hyperlink>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a8e6ce',
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 18,
  },
  link: {
    color: Colors.light.tint,

  }
});

export default ResourceScreen;
