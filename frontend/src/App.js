import React from 'react';
import AsciiFacesPage from './Component/AsciiFacesPage';
import './App.css';


class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      sort: "id",
      page: 1,
    };
  }

  handleScroll = () => {
    if (window.pageYOffset + window.innerHeight + 220 > document.body.offsetHeight) {
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
    const { page } = this.state;
    return (
      <div className="App">
        <div>
          <AsciiFacesPage
            page={page}
          />
        </div>
      </div>
    );
  }
}

export default App;
