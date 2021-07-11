import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { FontAwesome } from '@expo/vector-icons'
// import { DATA } from '../data'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { PostList } from '../components/PostList'
import { loadPosts } from '../store/actions/post'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { THEME } from '../theme'

export const MainScreen = ({ navigation }) => {
  const openPostHandler = post => {
    navigation.navigate('Post', { 
      postId: post.id, 
      date: post.date, 
      booked: post.booked 
    })
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadPosts())
  }, [dispatch])

  const allPosts = useSelector(state => state.post.allPosts)
  const loading = useSelector(state => state.post.loading)

console.log(loading);

  if (loading) {
    return (
    <View style={styles.center}>
      <ActivityIndicator color={THEME.MAIN_COLOR} size={50} />
    </View>
    )
  }

  return (
    <PostList
      data={allPosts}
      onOpen={openPostHandler}
    />
  )
}

// const leaf = "<FontAwesome name='leaf' size={20} color='white' />"

MainScreen.navigationOptions = ({ navigation, leaf }) => ({
  headerTitle: 'microgreen.news',
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon} >
      {/* <Item iconName='leaf' /> */}
      <Item 
      title='Teke photo' 
      iconName='ios-camera' 
      onPress={() => navigation.push('Create')} 
      />
      {/* <Item 
      title='Teke photo 2' 
      iconName='ios-airplane-outline' 
      onPress={() => console.log('Pressed 2')} 
      /> */}
    </HeaderButtons>
  ),
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
    alignItems: 'center'
  }
})