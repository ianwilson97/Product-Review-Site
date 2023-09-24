import { useEffect, useState } from "react";
import Product from "../components/Product";
import { CircularProgress } from "@mui/material";
import Head from "next/head";
import Header from "../components/Header";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

function Dashboard() {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await fetch(`https://${process.env.NEXT_PUBLIC_BROWSER_URL}:8000/products/`);
        if (productsResponse.ok) {
          const productsList = await productsResponse.json();
          // ... (rest of your code)
          // for each product, get the feedback details of that product from the database
          for (let i = 0; i < productsList.length; i++) {
            let prodId = productsList[i].id;

            const feedbackResponse = await fetch(`https://${process.env.NEXT_PUBLIC_BROWSER_URL}:8000/products/${prodId}/feedback`);
            const productFeedback = await feedbackResponse.json();

            // add the feedback details to the product object
            productsList[i].feedback = productFeedback;
          }

          setProductsData(productsList);
          setLoading(false);
        } else {
          console.error(`Failed to fetch products: ${productsResponse.statusText}`);
        }
      } catch (error) {
        console.error(`An error occurred: ${error}`);
      }
    };
    fetchProducts();
  }, []);
  

  // compute and set the chart labels and chartData
  useEffect(() => {
    if (productsData.length !== 0) {
      let labels = [];
      let data = [];
      productsData.forEach((product) => {
        labels.push(product.title);
        data.push(
          product.feedback.reduce((a, b) => a + b.rating, 0) / product.feedback.length
        );
      });

      setChartLabels(labels);
      setChartData(data);
    }
  }, [productsData]);

  function avgRating(product) {
    let rating = product.feedback.reduce((a, b) => a + b.rating, 0) / product.feedback.length;
    
    return rating.toFixed(1);
  }


  return (
    <div>
      <Head>
        <title>Product Review and Feedback System</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css"/>
      </Head>

      <Header />

      <h1>Dashboard</h1>
      <p>
        This dashboard shows the top 3 products with the most reviews, the average rating of each product, and the average rating of all products.
        It also shows a bar chart of the average rating of each product.
      </p>
      
      {
        loading ? (
        <div className="progressBarDashboard" >
          <CircularProgress />
        </div>
      ) : (
        <>
          <h2>Top 3 reviewed products</h2>
          <div className="products-results-grid">
            {
              productsData.sort((a, b) => b.feedback.length - a.feedback.length).slice(0, 3).map((product, key) => (
                <div key={key} style={{padding: "20px"}}>
                  <Product key={product.id} product={product} page={"dashboard"} />
                </div>
              ))
            }
          </div>

          <h2>Average ratings of each product</h2>
          <div className="averageRatingCard">
            {
              productsData.map((product, key) => {
                if (product.feedback.length !== 0) {
                  return (
                    <div key={key} className="averageRatingProduct">
                      <h3>{product.title}</h3>
                      <img className="productImg" src={product.image} alt={product.title}/>
                      <p>Average rating: {avgRating(product)}</p>
                    </div>
                  )
                }
              })
            }
          </div>

          <h3>Average Ratings Graph</h3>
          <div className="chart">
            <Bar
              data={{
                labels: chartLabels,
                datasets: [{
                  label: 'Average Rating',
                  data: chartData,
                  
                  borderWidth: 1
                }]
              }}
              options={{
                maintainAspectRatio: false
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;