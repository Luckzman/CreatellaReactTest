import React, {Component} from 'react';
import AsciiFacesCard from '../AsciiFacesCard';
import Ads from '../Ads'
import randomNumber from '../../utils/randomAdsFunc';
import './AsciiFacesPage.css';

let recentListing = [];
let nextListings = [];

class AsciiFacesPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      productList: [],
      nextListings: [],
      isLastItem: false
    };
  }

  setLoading = (loading) => {
    this.setState({loading})
  }

  getProduct = async(page, initial) => {
    const { isLastItem } = this.state;
    if (!initial && nextListings[1]) {
      recentListing.push(...nextListings);
      nextListings = [];
      this.setLoading(true);
    }
    if (!isLastItem) {
      try {
        const url = `http://localhost:3000/api/products?_page=${page}&_limit=100&_sort=" + sortMode`;
        const response = await fetch(url)
        const result = await response.json();
        if (result.length) {
          result.forEach(product => {
            if (product && initial) {
              recentListing.push(product);
            } else if (product) {
              nextListings.push(product);
            }
          });
          this.setState({ nextListings });
        } else {
          recentListing.push("last");
          this.setState({ isLastItem: true });
        }
        if (initial) {
          this.setState({ productList: recentListing });
        } else if (result.length) {
          nextListings.unshift(randomNumber());
          this.setState({ nextListings });
        }
        this.setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  componentDidMount() {
    const { page } = this.props;
    this.getProduct(page, true);
    this.getProduct(page + 1, false);
  }
  
  componentDidUpdate(prevProps) {
    const { page } = this.props;
    const { loading } = this.state;
    if (page !== prevProps.page && !loading) {
      this.setLoading(true);
      this.getProduct(page + 1, false);
    }
  }
  
  render(){
    const {productList} = this.state;
    const { loading, isLastItem } = this.state;
    return(
      <>
      <div className="product" >
        <div className="container">
          <div className="product-grid">
            {
              productList.map((product, index) => {
                if (product === "last") {
                  return <p key={index}>... No more Product ...</p>;
                } else if (product.ad === "ads") {
                  return <Ads key={index} src={product.adsUrl} />
                } else {
                  return (
                    <AsciiFacesCard 
                      key={index}
                      id={product.id} 
                      face={product.face} 
                      size={product.size} 
                      price={product.price} 
                      date={product.date}
                    />
                  );
                }
              })
            }
          </div>
          {loading && !isLastItem && <p className="loading"> loading More Items..</p>}
        </div>
      </div>
    </>
    );
  }
}

export default AsciiFacesPage;
