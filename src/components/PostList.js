import React from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import { Post } from './Post'

export const PostList = ({ data = [], onOpen }) => {
  // data = {
  //   id: '',
  //   img:
  //     '',
  //   text: '',
  //   date: new Date().toJSON(),
  //   booked: false
  // }

  // console.log(data)
  // console.log(data.length)
  
  // if (!data.lenght) {
  //   return <View style={styles.wrapper}>
  //     <Text style={styles.noitems}>Постов в базе нет</Text>
  //   </View>
  // }

  return (
    <View style={styles.wrapper}>
      <FlatList 
        data={data}
        keyExtractor={post => post.id.toString()}
        renderItem={({ item }) => <Post post={item} onOpen={onOpen} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  },
  noitems: {
    fontFamily: 'open-regular',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18
  }
})