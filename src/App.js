import React, { Component } from 'react';
import Calculator from './components/Calculator';
import DiscountList from './components/DiscountList';
import AddHomePopup from './components/AddHomePopup';
import { isIos, isInStandaloneMode } from './lib/appleDeviceDetector';

class App extends Component {
  constructor(props){
    super(props);
    this.priceInputRef = React.createRef();
    this.focusPriceInput = this.focusPriceInput.bind(this);

    this.state = {
      discounts: this.getDiscountList(),
      price: '',
      discount: 40,
      description: '',
      showInstallMessage: this.isAppleDevice() && !this.getInstallMessage()
    }
  }

  getInstallMessage = () => {
    const item = localStorage.getItem('@discount/installMessage');
    if(item === 'true') {
      return true
    }
    return false;
  }

  storeInstallMessage = () => {
    localStorage.setItem('@discount/installMessage', true);
  }

  isAppleDevice = () => isIos() && !isInStandaloneMode()

  onChangeInput = (event) => {
    var field = event.target;
    /* console.log(`<${field.name}>: `, field;.value); */

    this.setState({ [field.name]: field.value });
  }

  onAddDiscount = (price, discount, salePrice, saving, description) => {
    var discountRow = {
      id: Date.now(),
      price: Number(price),
      discount: discount,
      saving: saving,
      salePrice: Number(salePrice),
      description: description
    }

    this.setState({
      discounts: [ discountRow, ...this.state.discounts ],
      price: '',
      description: '',
    }, () => {
               this.focusPriceInput();
               this.storeDiscountList();
             }
    );
  }

  onDeleteDiscount = (itemId) => {
    this.setState({
      discounts: this.state.discounts.filter(item => item.id !== itemId)
    }, () => {
               this.focusPriceInput();
               this.storeDiscountList();
             }
    );
  }

  focusPriceInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.priceInputRef.current.focus();
  }

  storeDiscountList() {
    localStorage.setItem('@discount/discountList', JSON.stringify(this.state.discounts));
  }

  getDiscountList() {
    try{
      return JSON.parse(localStorage.getItem('@discount/discountList') || []);
    } catch (e) {
      return [];
    }
  }

  onPopupPress = (e) => {
    this.setState({
      showInstallMessage: false
    }, () => {
      this.storeInstallMessage();
    })
  }

  render() {
    return (
      <>
        <header className="App-header flex items-center justify-center">
          <h1 className="App-title">Discount Calculator</h1>
        </header>
        <div className="App-body">
          <div className="container">
          <Calculator
            price={this.state.price}
            description={this.state.description}
            priceInputRef={this.priceInputRef}
            discount={this.state.discount}
            onAddDiscount={this.onAddDiscount}
            onChangeInput={this.onChangeInput}/>
          <DiscountList
            discounts={this.state.discounts}
            onDeleteDiscount={this.onDeleteDiscount}/>
          </div>
          {
            this.state.showInstallMessage ? <AddHomePopup onPress={this.onPopupPress} /> : null
          }
        </div>
      </>
    );
  }
}

export default App;
