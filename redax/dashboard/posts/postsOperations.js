import { postSlice } from "./postsReaducer";

const { addPost, addCommitsPost, addCommits } = postSlice.actions;

const addAllPosts = (data) => async (dispatch, getStatte) => {
  try {
    data.map((item) => {
      const comments = { comments: [] };
      Object.assign(item, comments);
    });
    dispatch(addPost(data));

    // let json = JSON.stringify(data);
    // console.log(json);
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

const addCommintsInPost = (commets) => async (dispatch, getStatte) => {
  //   console.log(commets, Id, "temp");
  try {
    dispatch(addCommitsPost(commets));
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

const addCommitsToState = (commets) => async (dispatch, getStatte) => {
  try {
    dispatch(addCommits(commets));
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

export { addAllPosts, addCommintsInPost, addCommitsToState };
