import { Instance, SnapshotOut, types ,flow} from "mobx-state-tree"
import { Api } from '../../services/api'
import { omit, length } from "ramda";

const api = new Api();
api.setup();

/**
 * Model description here for TypeScript hints.
 */
export const PostStoreModel = types
  .model("PostStore")
  .props({
    posts: types.optional(types.frozen(), null),
    page : 0,
    isloading : false,
    postdata : types.optional(types.frozen(), null),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    setPostData: flow(function* (post :any) {
      try {
         self.postdata = post;
      } catch (err) {
          
      }
  }),
    getPosts: flow(function* getPosts() {
      try {
          self.isloading = true;
          const data = yield api.getPosts(0);
          self.posts = data.posts.hits;
          self.isloading = false;
      } catch (err) {
          self.isloading = false;
      }
  }),
  getMorePosts: flow(function* () {
    try {
        self.isloading = true;
        self.page = self.page + 1;
        const data = yield api.getPosts(self.page);
        const postList = [...self.posts, ...data.posts.hits];
        self.posts = postList;
        self.isloading = false;
    } catch (err) {
      
    }

})
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .postProcessSnapshot(omit(["page", "posts"]))
  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type PostStoreType = Instance<typeof PostStoreModel>
export interface PostStore extends PostStoreType {}
type PostStoreSnapshotType = SnapshotOut<typeof PostStoreModel>
export interface PostStoreSnapshot extends PostStoreSnapshotType {}
