import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { addPost, deletePost, editPost, savePost } from "./features/Posts";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const postList = useSelector((state) => state.posts.value);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      addPost({
        id: postList.length + 1,
        name: name,
        content: content,
      })
    );

    setName("");
    setContent("");
  };
  return (
    <div className="App">
      <div>
        <h1>掲示板</h1>
      </div>
      <div className="addPost">
        <input
          type="text"
          placeholder="お名前"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="text"
          placeholder="投稿内容"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <button onClick={() => handleClick()}>投稿</button>
        <hr />
      </div>
      <div className="displayPosts">
        {postList.map((post) => (
          <div key={post.id} className="post">
            <h1 className="postName">{post.name}</h1>
            <h1 className="postContent">{post.content}</h1>
            <div className="rowContainer">
              {post.isEditing ? (
                // 編集モードのUI
                <div>
                  <input type="text" /> {/* 編集用の入力フィールドなど */}
                  <button
                    onClick={() => {
                      dispatch(savePost({ id: post.id }));
                    }}
                  >
                    保存
                  </button>
                </div>
              ) : (
                // 通常モードのUI
                <div>
                  <button
                    className="editButton"
                    onClick={() => {
                      dispatch(editPost({ id: post.id }));
                    }}
                  >
                    編集
                  </button>
                </div>
              )}
              <button onClick={() => dispatch(deletePost({ id: post.id }))}>
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
