import React from "react";
import { connect } from "react-redux";
import SingleCard from "./SingleCard";
import "./App.scss";
import { fetchPosts } from './Redux/Actions';

class App extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        totalCards: [],
        start: 0,
        posts: '',
        eoc: false
    } 
  }

  componentDidMount() {
    this.fetchMorePosts();
    window.addEventListener('scroll', this.checkScrollAndLoad);
  }
  
  componentWillUnmount(){
      window.removeEventListener('scroll', this.checkScrollAndLoad);
  }

  componentDidUpdate(prevProps) {
    if(this.props.posts !== prevProps.posts){
      if(!this.props.posts.length) {
        window.removeEventListener('scroll', this.checkScrollAndLoad);
        this.setState({eoc: true});
      }
       this.setState({posts: this.props.posts}, () =>{
        this.getCardsList()})
    }
  }

  checkScrollAndLoad =() => {
    if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight && this.state.totalCards.length >0) {
      this.addMoreCards();
  }
  }

  fetchMorePosts =() => {
    const { start } = this.state;
    this.props.fetchPosts(start);
  }

  getCardsList = () => {
    const {totalCards, posts } = this.state;
    this.setState({ totalCards: totalCards.concat(posts), posts: ''});
    return totalCards.concat(posts)
  };

  addMoreCards = () => {
    const { start } = this.state;
    this.setState({ start: start + 10 },() =>{ this.props.fetchPosts(start+10)});
  }

  render() {
    const {totalCards, eoc } = this.state;
    console.log(this.state);
    if (totalCards.length > 0) {
      return (
        <div>
          <center>
            {totalCards.map((post, index) => {
              return <SingleCard card={post} key={index} />;
            })}
            <div>{this.props.loading ? 'loading more content... ': ''}
            {eoc ? 'No More Content to load' : ''}</div>
          </center>
        </div>
      );
    }
    return <center>Loading...</center>;
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: (start) => dispatch(fetchPosts(start))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
// export default App;
