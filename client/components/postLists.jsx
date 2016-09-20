import React, { Component } from 'react';
import { Link } from 'react-router';

export default class PostLists extends Component {
  render() {
    return (
      <main>
        <h1>ArtMap</h1>
        <div>list here</div>
        <div><Link to="/posts/id">Art 1</Link></div>
        <div><Link to="/posts/id">Art 2</Link></div>
      </main>
    );
  }
}


// import React, { Component } from 'react';
// import { Link } from 'react-router';

// export default class PostLists extends Component {

//   renderPost(post, i) {
//     return (
//       <div key={i}>
//         <p>
//           <strong>{post.title}</strong>
//           {post.description}
//         </p>
//       </div>
//     );
//   }

//   render() {
//     if (!this.props.posts.length === 0) {
//       return <div>loading</div>
//     }
//     return (
//       <main>
//         <h1>ArtMap</h1>
//         <div>
//           {this.props.posts[0].map(this.renderPost)}
//         </div>
        
//       </main>
//     );
//   }
// }
