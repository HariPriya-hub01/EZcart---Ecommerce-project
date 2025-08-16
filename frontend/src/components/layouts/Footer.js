export  default function Footer (){
    return (
        <footer className="footer">
      <div className="footer-columns">
        {/* Column 1 */}
        <div className="footer-column">
          <h2 className="logo">EZCart</h2>
          <p>123 Market Street,<br />Chennai, India 600001</p>
        </div>

        {/* Column 2 */}
        <div className="footer-column">
          <h3>Quick Menu</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-column">
          <h3>Policy</h3>
          <ul>
            <li><a href="/shipping">Shipping & Returns</a></li>
            <li><a href="/store-policy">Store Policy</a></li>
            <li><a href="/payment-methods">Payment Methods</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} EZCart. All rights reserved.
      </div>
    </footer>
    )
}