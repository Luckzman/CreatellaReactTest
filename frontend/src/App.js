import React from 'react';
import AsciiFacesPage from './Component/AsciiFacesPage';
import NavBar from './Component/NavBar';
import './App.css';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      sort: "id",
      page: 0,
      reset: false,
      loading: false,
    };
  }

  handleReset = () => {
    this.setState({reset: false, page: 0})
  }

  setLoading = (loading) => {
    this.setState({loading});
  }

  handleSort = (sort) => {
    this.setState({ sort, page: 0, reset: true })
  }

  handleScroll = () => {
    const {loading} = this.state;
    if (window.pageYOffset + window.innerHeight + 200 > document.body.offsetHeight && !loading) {
      this.setState({ page: this.state.page + 1 });
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const { page, sort, reset, loading } = this.state;
    return (
      <div className="App">
        <NavBar handleSort={this.handleSort} />
        <header className="container">
            <h1>Products Grid</h1>
            <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>
            <p>But first, a word from our sponsors:</p>
            <img class="ad" src={`/ads/?r=${Math.floor(Math.random()*1000)}`} alt="advert from sponsors" />
        </header>
        <div className="main">
          <AsciiFacesPage
            page={page}
            sort={sort}
            resetList={reset}
            loading={loading}
            setLoading={this.setLoading}
            handleReset={this.handleReset}
          />
        </div>
      </div>
    );
  }
}

export default App;
