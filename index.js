const products = [
    {name:'Moon Dust', price: 16, desc:'Maximum Texture Powder'},
    {name:'Solar Wind', price: 18, desc:'Sea Salt Spray 2.0'},
    {name:'Star Dew', price: 18, desc:'Hybrid Grooming Cream'}
]






const root = document.querySelector('#root');

function Header() {
    return (
        <div className='header'>
            <h1>FLYGUY HAIR</h1>
            <p>Celebrate what makes you human.</p>
        </div>
    )
}

function ProductsBox({products, cart, cartUpdater}) {
    console.log(products);
    const listItems = products.map(product => {
        return <li key={product.name}><ProductCard product={product} cart={cart} cartUpdater={cartUpdater} /></li>
    })
    console.log(listItems);
    return (
        <div className='products-box'>
            <h2>Products</h2>
            <ul>
                {listItems}
            </ul>
        </div>
    )
}


function ProductCard({product, cart, cartUpdater}) {
    function handleClick() {
        if (product.name in cart) {
            cart[product.name].quantity++;
            cartUpdater({...cart})
        } else {
            cartUpdater({...cart, [product.name]: {product: {...product}, quantity: 1}});
        }
    }
    return (
        <div className='product-card'>
            <p>{product.name}</p>
            <p>${product.price}</p>
            <p>{product.desc}</p>
            <button onClick={handleClick}>Add To Cart</button>
        </div>
    )
}

function Cart({cart}) {

    function handleCheckout(event) {
        console.log(`Clicked ${event.target.textContent}`);
    }


    console.log(cart);
    if (Object.keys(cart).length === 0) {
        return (
            <div className='cart'>
                <h2>Cart</h2>
                <ul>
                    <li>Your cart is empty!</li>
                </ul>
            </div>
        )
    }
    let total = 0;
    const cartItems = Object.keys(cart).map(item => {
        total += cart[item].quantity * cart[item].product.price;
        return <li key={item}>{item} x{cart[item].quantity}</li>
    });
    return (
        <div className='cart'>
            <h2>Cart</h2>
            <ul>
                {cartItems}
            </ul>
            <p>Total: ${total}</p>
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    )


}


function Main() {
    const [cart, setCart] = React.useState({});
    return (
        <div>
            <Header />
            <ProductsBox products={products} cart={cart} cartUpdater={setCart} />
            <Cart cart={cart} />
        </div>
    )
}

ReactDOM.render(<Main />, root);