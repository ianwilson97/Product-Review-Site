import Head from 'next/head'
import {useEffect, useState} from 'react'
import Product from '../components/Product'
import Header from '../components/Header'

export default function Home() {
  const [products, setProducts] = useState([]);

  // Make a fetch call to the API and retrieve the data
  useEffect(()=>{
    async function fetchProducts() {
      try {
        const res = await fetch(`http://${process.env.NEXT_PUBLIC_BROWSER_URL}:3000/products/`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }    
    fetchProducts();
  }, [])

  return (
    <div className='container'>
      <Head>
        <title>Product Review and Feedback System</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css"/>
      </Head>

      <Header />

      <h1>Feedback App</h1>

      <div className="products-results-grid">
        {products.map((prod, index) => {
          return(
            <div key={index} style={{padding: "20px"}}>
              <Product product={prod}/>
            </div>
          )
        })}
      </div>
    </div>
  )
}