import React, { useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Image, Button, ScrollView, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { THEME } from '../theme'
import { toogleBooked, removePost } from '../store/actions/post'

export const PostScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const postId = navigation.getParam('postId')
  // const post = DATA.find(p => p.id === postId)
  const post = useSelector(state => 
    state.post.allPosts.find(p => p.id === postId)
  )

  const booked = useSelector(state => 
    state.post.bookedPosts.some(post => post.id === postId)
  )

  useEffect(() => {
    navigation.setParams({ booked })
  }, [booked])

  const toggleHandler = useCallback(() => {
    // console.log(postId)
    dispatch(toogleBooked(post))
  }, [dispatch, post])

  useEffect(() => {
    navigation.setParams({ toggleHandler })
  }, [toggleHandler])

  const removeHandler = () => {
    Alert.alert(
      "Удаление поста",
      "Вы уверены что хотите удалить пост?",
      [
        {
          text: "Отменить",
          style: "cancel"
        },
        { 
          text: "Удалить", 
          style: 'destructive', 
          onPress() {
            navigation.navigate('Main')
            dispatch(removePost(postId))
          }
        }
      ],
      { cancelable: false }
    )
  }

  if (!post) {
    return null
  }

  return (
    <ScrollView>
      <Image source={{uri: post.img}} style={styles.image} />
      <View style={styles.textWrap} >
        <Text style={styles.title} >{post.text}</Text>
      </View>
      <Button title='Удалить' color={THEME.DANGER_COLOR} onPress={removeHandler} />
    </ScrollView>
  )
}

PostScreen.navigationOptions = ({ navigation }) => {
  const postId = navigation.getParam('postId')
  const date = navigation.getParam('date')
  const booked = navigation.getParam('booked')
  const toggleHandler = navigation.getParam('toggleHandler')
  const iconName = booked ? 'ios-star' : 'ios-star-outline'
  return {
    headerTitle: 'Пост id: ' + postId + ' от ' + new Date(date).toLocaleDateString(),
    headerStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.9)'
    },
    headerTintColor: 'white',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon} >
        <Item 
        title='Book post' 
        iconName={iconName} 
        onPress={toggleHandler} 
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 500
  },
  textWrap: {
    padding: 10
  },
  title: {
    fontFamily: 'open-regular'
  }
})