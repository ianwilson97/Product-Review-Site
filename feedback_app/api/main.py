from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models.User import User
from models.Feedback import Feedback
from models.Product import Product
from typing import List
import schema
from fastapi.responses import RedirectResponse

app = FastAPI()


# This is a test to see if the database is up and actually running upon starting
# This is actually working, so I need to find where else the error is coming from
@app.on_event("startup")
async def startup_event():
    try:
        records = Product.all()
        print("Database is up and running.")
    except Exception as e:
        print(f"Failed to connect to the database. Error: {e}")


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# App code for creating routes here

@app.get("/")
async def docs_redirect():
    response = RedirectResponse(url='/docs')
    return response


# add a route to get all products from the database
@app.get("/products/", response_model=List[schema.ProductResult])
def get_all_products():
    products = Product.all()
    return products.all()


# get a single product by id
@app.get("/products/{product_id}", response_model=schema.ProductResult)
def get_single_product(product_id: int):
    product = Product.find(product_id)
    if not product:
        raise HTTPException(status_code=400, detail="Product not Found")
    return product


# get all feedbacks for a product by id
@app.get("/products/{product_id}/feedback", response_model=List[schema.FeedbackResult])
def get_product_feedbacks(product_id):
    product = Product.find(product_id)
    if not product:
        raise HTTPException(status_code=400, detail="Product not Found")
    return product.feedback.all()


# add a post route to add a new feedback for a product
@app.get("/products/{product_id}/feedback", response_model=List[schema.FeedbackResult])
def get_product_feedbacks(product_id):
    product = Product.find(product_id)
    if not product:
        raise HTTPException(status_code=400, detail="Product not Found")
    return product.feedback.all()


# add a post route to add a new feedback for a product
@app.post("/products/{product_id}/feedback", response_model=schema.FeedbackResult)
def add_new_feedback(feedback_data: schema.FeedbackCreate):
    product = Product.find(feedback_data.product_id)
    if not product:
        raise HTTPException(status_code=400, detail="Product not found")

    # Validate rating as an integer
    if not isinstance(feedback_data.rating, int):
        raise HTTPException(status_code=400, detail="Rating should be an integer")

    feedback = Feedback()
    feedback.rating = feedback_data.rating
    feedback.comment = feedback_data.comment
    feedback.product_id = feedback_data.product_id
    feedback.user_id = feedback_data.user_id
    feedback.save()

    product.attach("feedback", feedback)
    return feedback