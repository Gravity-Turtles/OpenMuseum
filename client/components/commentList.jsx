import React from 'react';
import { connect } from 'react-redux';


const CommentList = (props)=> {
    console.log('COMMENT LIST PROPS', props);
    const list = props.comments.map((comment,index) => {        
        console.log('in map');
        console.log(comment, index);
        return(
            <li key={index} className="commentList">
                <div className="name" className="listItems">{comment.user}:</div> 
                <div className="comment" className="listItems">{comment.comments}</div>
            </li>
        )
    })

    console.log('LIST', list)


    return (
      <ul className="comment_list">{list}</ul>
    )
}

function mapStateToProps(state){
  return { comments: state.comments };
}

export default connect(mapStateToProps)(CommentList);
