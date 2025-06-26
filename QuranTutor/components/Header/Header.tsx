import React from 'react';
import { View,Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons } from "@expo/vector-icons"; 
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';

 
type HeaderProps = {
  firstname: string;
};
export default function Header({ firstname }: HeaderProps){

    const router = useRouter();

    const navigateToProfilePage = () => {
      router.replace('/(auth)/ProfilePage');  
    };
    return(
    <>
        <View style={styles.header}>
          <Ionicons name='menu' size={24} color="#8789A3" />
          <Text style={styles.headerText}>Quran Tutor</Text>
          <TouchableOpacity onPress={navigateToProfilePage}>
          <Image 
              source={require('@/assets/images/profile.jpg')} 
              style={styles.profile} 
          />
          </TouchableOpacity>

        </View>
  
        <View style={styles.subheader}>
          <Text style={styles.subheaderText2}>Asslamualaikum {firstname || 'Guest'},</Text>
           <Text style={styles.subheaderText}>Keep improving your recitation!</Text>
           <View style={styles.imageContainer}>
             <Image 
              source={require('@/assets/images/frame.png')} 
              style={styles.frame} 
             />
             <View style={styles.overlay}>
             <View style={styles.row}>
             <Entypo 
               name="open-book" 
               size={20} 
               color="#fff" 
               style={{ marginRight: 6, transform: [{ rotate: '-342deg' }] }} 
             />
               <Text style={styles.overlayText}>Last Read</Text>
             </View>
              <Text style={styles.surahTitle}>Al-Faatiha</Text>
              <Text style={styles.ayaText}>Aya No: 01</Text>
              <Text style={styles.accuracyText}>Accuracy: 80%</Text>
             </View>
           </View>

        </View>
    </>
    );
 }

 const styles= StyleSheet.create({
    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
    marginLeft:12,
  },
  subheader: {
    flexDirection:'column', 
    alignItems: 'center',
    justifyContent: 'space-between', 
    width: '100%',
    paddingVertical: 15,
  },
  headerText: {
    textAlign: 'left', 
    width: '85%',
    marginLeft:12,
    fontSize: 20,
    fontWeight: 'bold',
    color: "#672CBC",
    
  },
  subheaderText:{
    textAlign: 'left', 
    width: '100%', 
    marginLeft:35,
    color: '#240F4F',
    fontSize: 18,
    fontWeight:'semibold',
    marginBottom: 15,
  },
  subheaderText2:{
    textAlign: 'left', 
    width: '100%', 
    marginLeft:35,
    color: '#8789A3',
    fontSize: 18,
    fontWeight:'medium',
    marginBottom: 10,
  },
  frame:{
    width: 360  , 
    height: 360*0.402 , 
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: 360,
    height: 360 * 0.402,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  overlay: {
    position: 'absolute',
    top: '5%',
    left: '5%',
    padding: 12,
    alignItems: 'flex-start',
  },
  
  overlayText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'medium',
  },
  
  surahTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 6,
  },
  
  ayaText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  
  accuracyText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#672CBC",
  }
  
 });
