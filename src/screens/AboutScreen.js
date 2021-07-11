import { createMultiStyleIconSet } from '@expo/vector-icons'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { THEME } from '../theme'

export const AboutScreen = ({}) => {
  return <View style={styles.center}>
      <Text>Это приложение для фото-заметок</Text>
      <Text style={styles.accent}>microgreen.news photo-notes</Text>
      <Text style={styles.text}>Если Вас интересует незнакомое растение, сохраните фото-заметку, и мы поможем Вам его вырастить</Text>
      <Text>Версия приложения <Text style={styles.version}>1.0.3</Text></Text>
    </View>
}

AboutScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'О проекте',
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon} >
      <Item 
        title='Toggle Drawer' 
        iconName='ios-menu' 
        onPress={() => navigation.toggleDrawer()} 
      />
    </HeaderButtons>
  )
})

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10
  },
  version: {
    fontFamily: 'open-bold'
  },
  accent: {
    fontWeight: 'bold',
    color: THEME.MAIN_COLOR,
    fontSize: 20
  },
  text: {
    marginVertical: 15,
    textAlign: 'center'
  }
})