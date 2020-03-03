let lastNumber = 0;

const randomNumber = function () {
  let getRandomNumber = Math.floor(Math.random() * 40);  
  if(getRandomNumber !== lastNumber){
      lastNumber = getRandomNumber;
      return {
        ad: "ads",
        adsUrl: `http://localhost:3000/api/ads?r=${getRandomNumber}`
      }
  }else{
      randomNumber();
  }
};

export default randomNumber;
