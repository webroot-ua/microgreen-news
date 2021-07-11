import * as FileSystem from 'expo-file-system';
import { LOAD_POSTS, REMOVE_POST, TOGGLE_BOOKED, ADD_POST } from "../types"
import { DB } from '../../db'
// import { DATA } from "../../data"

export const loadPosts = () => {
  return async dispatch => {
    const posts = await DB.getPosts()
    dispatch({
      type: LOAD_POSTS,
      payload: posts
    })
  }
  
}

export const toogleBooked = post => async dispatch => {
  await DB.updatePost(post)
  dispatch({
    type: TOGGLE_BOOKED,
    payload: post.id
  })
}

export const removePost = id => async dispatch => {
  await DB.removePost(id)
  dispatch({
    type: REMOVE_POST,
    payload: id
  })
}

export const addPost = post => async dispatch => {
  // post.id = Date.now().toString()
  const fileName = post.img.split('/').pop()
  const newPath =  FileSystem.documentDirectory + fileName

  try {
    await FileSystem.moveAsync({
      to: newPath,
      from: post.img
    })
  } catch (e) {
    console.log('ErroR: ', e)
  }

  const payload = {...post, img: newPath}

  const id = await DB.createPost(payload)

  payload.id = id

  dispatch({
    type: ADD_POST,
    payload
  })
}