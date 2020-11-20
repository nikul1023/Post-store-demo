import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View ,Text} from "react-native"
import { Screen } from "../../components"
 import { useNavigation ,useRoute }from "@react-navigation/native"
 import { useStores } from "../../models"
import { color } from "../../theme"
import { toJS } from "mobx"


const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const PostdataScreen = observer(function PostdataScreen() {
  const route = useRoute();

  // Pull in one of our MST stores
   const { postStore } = useStores();
  
  
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <View>
      <Text>title :{postStore.postdata.title}</Text>
      <Text>created_at :{postStore.postdata.created_at}</Text>
      <Text>url :{postStore.postdata.url}</Text>
      <Text>author :{postStore.postdata.author}</Text>
      <Text>points :{postStore.postdata.points}</Text>
      <Text>story_text :{postStore.postdata.story_text}</Text>
      <Text>comment_text :{postStore.postdata.comment_text}</Text>
      <Text>num_comment :{postStore.postdata.num_comment}</Text>
      <Text>story_id :{postStore.postdata.story_id}</Text>
      <Text>story_title :{postStore.postdata.story_title}</Text>
      <Text>story_url :{postStore.postdata.story_url}</Text>
      <Text>parent_id :{postStore.postdata.parent_id}</Text>
      <Text>created_at_i :{postStore.postdata.created_at_i}</Text>
      <Text>_tags :{postStore.postdata._tags}</Text>
      <Text>objectID :{postStore.postdata.objectID}</Text>
      <Text>_highlightResult title :{postStore.postdata._highlightResult.title.value}</Text>
      <Text> url :{postStore.postdata._highlightResult.url.value}</Text>
      <Text>author :{postStore.postdata._highlightResult.author.value}</Text>
      </View>
    </Screen>
  )
})
