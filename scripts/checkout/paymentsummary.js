import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getdeliveryOption } from "../../data/deliveryoptions.js";
import { formatCurrency } from "../utils/money.js";
export function renderpaymentsummary(){
  let productpriceCents=0;
  let shippingpriceCents=0;



cart.forEach((cartItem)=>{
  const product= getProduct(cartItem.productId);
 productpriceCents+= product.priceCents*cartItem.quantity;
 const deliveryOption =getdeliveryOption(cartItem.deliveryOptionId);
 

  shippingpriceCents+=deliveryOption.priceCents;

 

  
});

const totalbeforeTaxCents=productpriceCents+shippingpriceCents;
const taxCents=totalbeforeTaxCents*0.1;
const totalCents=totalbeforeTaxCents+taxCents;

const paymentsummaryHTML=` <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productpriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingpriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalbeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;


 document.querySelector('.js-payment-summary').innerHTML=paymentsummaryHTML;         
}