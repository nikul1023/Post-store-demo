import React,{ useEffect , useState} from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, FlatList,TouchableOpacity ,View ,ScrollView} from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
 import { useStores } from "../../models"
import { color } from "../../theme"
import { toJS } from "mobx"
import { DataTable} from 'react-native-paper'
import { useNavigation } from "@react-navigation/native"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const TABLE_HEADER: ViewStyle = {
  backgroundColor: color.palette.lightGrey,
  
}


export const PostScreen = observer(function PostScreen() {
  // Pull in one of our MST stores
  const navigation = useNavigation();
   const { postStore } = useStores()
  React.useEffect(() =>{
    postStore.getPosts();
    const interval = setInterval(() => {
      postStore.getMorePosts();

  }, 10000);
  return () => {
      clearInterval(interval);
  }
  },[])
  const PostItem = ({ post }: { post: any }) => {
    return (
      <TouchableOpacity onPress={()=> onPostPressed(post)}>
      <DataTable.Row>
      <DataTable.Cell>{post.title}</DataTable.Cell>
      <DataTable.Cell>{post.url}</DataTable.Cell>
      <DataTable.Cell>{post.created_at}</DataTable.Cell>
      <DataTable.Cell>{post.author}</DataTable.Cell>
    </DataTable.Row>
    </TouchableOpacity>
    )
  
  }
  const onEndReached = () => {

    if (!postStore.isloading) {
        postStore.getMorePosts();
    }

}
const onPostPressed = (post: any) => {
   postStore.setPostData(post);
   navigation.navigate('postData');
}
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} >
           <DataTable>
            <DataTable.Header style={TABLE_HEADER}>
              <DataTable.Title>Title</DataTable.Title>
              <DataTable.Title>URL</DataTable.Title>
              <DataTable.Title>Created</DataTable.Title>
              <DataTable.Title>Author</DataTable.Title>
            </DataTable.Header>
            <FlatList
                    data={toJS(postStore.posts)}
                    renderItem={({ item }) => <PostItem post={item}  />}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={onEndReached}
                    onEndReachedThreshold={0.1}
                />
             
          </DataTable>
    </Screen>
  )
})
