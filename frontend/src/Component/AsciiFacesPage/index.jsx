import React, {Component} from 'react';
import AsciiFacesCard from '../AsciiFacesCard';
import {ReactComponent as LoadingIcon} from './Gear-0.2s-101px.svg'
import Ads from '../Ads';
import randomNumber from '../../utils/randomAdsFunc';
import './AsciiFacesPage.css';

let recentListing = [];
let nextListings = [];

class AsciiFacesPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      productList: [],
      nextListings: [],
      isLastItem: false
    };
  }


  getProduct = async(page, initial, sort) => {
    const { isLastItem } = this.state;
    const {handleReset, resetList, setLoading} = this.props;
    if (!initial && nextListings[1]) {
      recentListing.push(...nextListings);
      nextListings = [];
      setLoading(true);
    }
    if (!isLastItem) {
      try {
        const url = `http://localhost:3000/api/products?_page=${page}&_limit=20&_sort=${sort}`;
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
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  componentDidMount() {
    const { page, sort } = this.props;
    this.getProduct(page, true, sort);
    this.getProduct(page + 1, false, sort);
  }
  
  componentDidUpdate(prevProps) {
    const { page, sort, resetList, handleReset, setLoading, loading } = this.props;
    if(resetList){
      recentListing = [];
      nextListings = [];
      this.getProduct(page, true, sort);
      handleReset();
    }
    if (page !== prevProps.page && !loading) {
      setLoading(true);
      this.getProduct(page + 1, false, sort);
    }
  }
  
  render(){
    const {loading} = this.props;
    const { isLastItem, productList } = this.state;
    return(
      <>
      <div className="product" >
        <div className="container">
          <div className="product-grid">
            {
              productList.map((product, index) => {
                if (product === "last") {
                  return <p key={index}>~ end of catalogue ~</p>;
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
          {loading && !isLastItem && <LoadingIcon />}
        </div>
      </div>
    </>
    );
  }
}

export default AsciiFacesPage;
