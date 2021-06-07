import React from "react";
import { connect } from "react-redux";
import SingleCard from "./SingleCard";
import "./App.scss";
import { fetchPosts } from "./Redux/Actions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCards: [],
      start: 0,
      posts: "",
      eoc: false,
    };
  }

  componentDidMount() {
    // fetching first 10 post cards on initial render
    this.fetchInitialPosts();
    // adding event listener for scroll action to determine user activity
    // and triggering checkScrollAndLoad function on scroll to fetch more posts
    window.addEventListener("scroll", this.checkScrollAndLoad);
  }

  componentWillUnmount() {
    // Removinng scroll event listener on unmount to avoid unnecessary fetching
    window.removeEventListener("scroll", this.checkScrollAndLoad);
  }

  componentDidUpdate(prevProps) {
    // triggering render on new posts only
    if (this.props.posts !== prevProps.posts) {
      if (!this.props.posts.length) {
        // Removinng scroll event listener on first load of posts
        // to avoid unnecessary fetching posts as it thinks its bottom of screen pre-rendering
        window.removeEventListener("scroll", this.checkScrollAndLoad);
        //If there are no posts to fetch we want to show user its last of them
        this.setState({ eoc: true });
      }
      // If there are new posts fetched updating with fetched ones and
      // adding them to current to number of post cards
      this.setState({ posts: this.props.posts }, () => {
        this.getCardsList();
      });
    }
  }

  checkScrollAndLoad = () => {
    // Checking whether its end/bottom of screen to fetch 10 more posts
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.scrollingElement.scrollHeight &&
      this.state.totalCards.length > 0
    ) {
      this.addMoreCards();
    }
  };

  fetchInitialPosts = () => {
    const { start } = this.state;
    this.props.fetchPosts(start);
  };

  getCardsList = () => {
    const { totalCards, posts } = this.state;
    // Adding newly fetched posts to total post cards to trigger render and display them
    this.setState({ totalCards: totalCards.concat(posts), posts: "" });
    return totalCards.concat(posts);
  };

  addMoreCards = () => {
    const { start } = this.state;
    // Fetching 10 more cards on user scrolled to bottom action
    this.setState({ start: start + 10 }, () => {
      this.props.fetchPosts(start + 10);
    });
  };

  render() {
    const { totalCards, eoc } = this.state;
    if (totalCards.length > 0) {
      return (
        <div>
          <center>
            {/* Iterating over total posts acquired and displaying them in the Single Card format */}
            {totalCards.map((post, index) => {
              return <SingleCard card={post} key={index} />;
            })}
            {/* On loading while fetching posts */}
            <div>
              {this.props.loading ? "loading more content... " : ""}
              {/* Displaying end of content */}
              {eoc ? "No More Content to load" : ""}
            </div>
          </center>
        </div>
      );
    }
    return <center>Loading...</center>;
  }
}

//Providing redux state object to our component in props format
const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    loading: state.loading,
  };
};

// Dispatching Action(trgiggering API call) with mapDispatchToProps
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: (start) => dispatch(fetchPosts(start)),
  };
};

// Connect helps in connecting our component with the redux
// functions and state are accessible from props of component
export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
