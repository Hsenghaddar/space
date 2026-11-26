import React, {useEffect, useRef, useState} from 'react';
import {ArrowRight, ShoppingBag, Check, Plus, Minus} from './Icons.jsx';
import {departmentLabel} from './departments.js';
import {deliveryFee, formatUsd} from './pricing.js';

const whishNumber = '+961 79 114 223';

export default function Checkout({items, onQuantity, onShop, onPlaced}) {
  const [payment, setPayment] = useState('cash');
  const [review, setReview] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [copyStatus, setCopyStatus] = useState('');
  const reviewDialog = useRef(null);
  const confirmationHeading = useRef(null);
  const count = items.reduce((n, item) => n + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
  const total = subtotal + deliveryFee;
  const paymentLabel = payment === 'whish' ? 'Whish Money' : 'Cash on delivery';

  useEffect(() => {
    if (review && !reviewDialog.current?.open) reviewDialog.current?.showModal();
  }, [review]);

  useEffect(() => {
    if (confirmation) confirmationHeading.current?.focus();
  }, [confirmation]);

  function reviewOrder(event) {
    event.preventDefault();
    const details = new FormData(event.currentTarget);
    setReview({address: details.get('address'), city: details.get('city')});
  }

  function confirmOrder() {
    if (!reviewDialog.current?.open || !items.length) return;
    const [number] = crypto.getRandomValues(new Uint32Array(1));
    const reference = 'SPACE-' + number.toString(16).toUpperCase().padStart(8, '0');
    reviewDialog.current.close();
    setReview(null);
    setConfirmation({reference, total, payment, paymentLabel});
    onPlaced(items);
  }

  async function copyDetails(value, label) {
    setCopyStatus('');
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus(label + ' copied.');
    } catch {
      setCopyStatus('Select the ' + label.toLowerCase() + ' above to copy it manually.');
    }
  }

  if (confirmation) return (
    <section className="empty checkout-empty checkout-confirmation">
      <Check size={38} aria-hidden="true"/>
      <h1 ref={confirmationHeading} tabIndex={-1}>Order confirmed</h1>
      <p>Thank you for shopping with Space.</p>
      <p>Order total <strong>{formatUsd(confirmation.total)}</strong> including delivery</p>
      {confirmation.payment === 'whish' ? (
        <section className="whish-details" aria-labelledby="whish-details-title">
          <h2 id="whish-details-title">Whish Money</h2>
          <dl>
            <div>
              <dt>Whish number</dt>
              <dd><strong>{whishNumber}</strong></dd>
              <dd><button type="button" className="button outline" onClick={() => copyDetails(whishNumber.replaceAll(' ', ''), 'Whish number')}>Copy number</button></dd>
            </div>
            <div>
              <dt>Order ID</dt>
              <dd><strong>{confirmation.reference}</strong></dd>
              <dd><button type="button" className="button outline" onClick={() => copyDetails(confirmation.reference, 'Order ID')}>Copy order ID</button></dd>
            </div>
          </dl>
          <p>Use the order ID as the payment reference.</p>
          <p className="whish-copy-status" role="status">{copyStatus}</p>
        </section>
      ) : (
        <>
          <p>Order reference <strong className="checkout-reference">{confirmation.reference}</strong></p>
          <p>{confirmation.paymentLabel}</p>
        </>
      )}
      <button className="button dark" onClick={onShop}>Continue shopping</button>
    </section>
  );

  if (!items.length) return (
    <section className="empty checkout-empty">
      <ShoppingBag size={38}/>
      <h1>Your bag is waiting.</h1>
      <button className="button dark" onClick={onShop}>Explore the collection <ArrowRight size={18}/></button>
    </section>
  );

  return (
    <section className="checkout-page">
      <div className="checkout-heading">
        <a href="#/shop">Back to shop</a>
        <h1>Checkout</h1>
      </div>
      <div className="checkout-grid">
        <form id="checkout-form" onSubmit={reviewOrder}>
          <fieldset className="checkout-fields">
            <legend className="checkout-legend">Order details</legend>
            <section className="checkout-panel">
              <h2>Delivery details</h2>
              <div className="form-grid">
                <label className="field full-field">Full name<input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Your full name"/></label>
                <label className="field">Phone number<input name="phone" type="tel" autoComplete="tel" inputMode="tel" required pattern={String.raw`[+0-9\s\(\)\-]{7,20}`} minLength={7} maxLength={20} placeholder="03 123 456"/></label>
                <label className="field">City / area<input name="city" autoComplete="address-level2" required maxLength={100} placeholder="Ghazieh"/></label>
                <label className="field full-field">Delivery address<textarea name="address" autoComplete="street-address" required maxLength={500} rows={3} placeholder="Street, building, floor, and a nearby landmark"/></label>
                <label className="field full-field">Order notes <span className="optional">(optional)</span><textarea name="notes" maxLength={1000} rows={2} placeholder="Anything we should know about your order"/></label>
              </div>
            </section>
            <section className="checkout-panel payment-panel">
              <h2>Payment</h2>
              <label className={'payment-option ' + (payment === 'cash' ? 'chosen' : '')}>
                <input type="radio" name="payment" value="cash" checked={payment === 'cash'} onChange={() => setPayment('cash')}/>
                <span className="payment-copy"><b>Cash on delivery</b><small>Pay when your order arrives</small></span>
                <span className="cash-mark">USD</span>
              </label>
              <label className={'payment-option ' + (payment === 'whish' ? 'chosen' : '')}>
                <input type="radio" name="payment" value="whish" checked={payment === 'whish'} onChange={() => setPayment('whish')}/>
                <span className="payment-copy"><b>Whish Money</b><small>Pay by wallet transfer</small></span>
                <span className="whish-mark" aria-hidden="true">whish</span>
              </label>
            </section>
            <button className="button dark checkout-submit" type="submit">Place order</button>
          </fieldset>
        </form>
        <aside className="order-summary">
          <div className="order-summary-heading"><h2>Your bag</h2><span>{count} {count === 1 ? 'piece' : 'pieces'}</span></div>
          <div className="checkout-items">
            {items.map(item => {
              const option = [item.name, item.color, item.size].filter(Boolean).join(' ');
              return (
                <article className="checkout-item" key={item.id}>
                  <img src={item.image} alt={item.name}/>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{departmentLabel(item)} · {item.color}{item.size ? ' · Size ' + item.size : ''}</p>
                    <div className="quantity">
                      <button type="button" aria-label={'Remove one ' + option} onClick={() => onQuantity(item.id, item.quantity - 1)}><Minus size={13}/></button>
                      <span>{item.quantity}</span>
                      <button type="button" disabled={item.quantity >= 99} aria-label={'Add one ' + option} onClick={() => onQuantity(item.id, item.quantity + 1)}><Plus size={13}/></button>
                    </div>
                  </div>
                  <strong>{formatUsd((item.price || 0) * item.quantity)}</strong>
                </article>
              );
            })}
          </div>
          <div className="summary-line"><span>Subtotal</span><span>{formatUsd(subtotal)}</span></div>
          <div className="summary-line"><span>Delivery</span><span>{formatUsd(deliveryFee)}</span></div>
          <div className="summary-total"><span>Total</span><strong>{formatUsd(total)}</strong></div>
          <a href="#/shop" className="continue-shopping">Continue shopping <ArrowRight size={15}/></a>
        </aside>
      </div>
      <dialog ref={reviewDialog} className="checkout-review" aria-labelledby="checkout-review-title" onClose={() => setReview(null)}>
        <h2 id="checkout-review-title">Review your order</h2>
        <dl>
          <div><dt>Items</dt><dd>{count}</dd></div>
          <div><dt>Deliver to</dt><dd>{review?.address}, {review?.city}</dd></div>
          <div><dt>Payment</dt><dd>{paymentLabel}</dd></div>
          <div><dt>Subtotal</dt><dd>{formatUsd(subtotal)}</dd></div>
          <div><dt>Delivery</dt><dd>{formatUsd(deliveryFee)}</dd></div>
          <div className="checkout-review-total"><dt>Total</dt><dd>{formatUsd(total)}</dd></div>
        </dl>
        <div className="checkout-review-actions">
          <button type="button" className="button outline" autoFocus onClick={() => reviewDialog.current.close()}>Back to checkout</button>
          <button type="button" className="button dark" onClick={confirmOrder}>Confirm order</button>
        </div>
      </dialog>
    </section>
  );
}
