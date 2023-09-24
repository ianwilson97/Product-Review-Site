from pydantic import BaseModel

from typing import Optional


# For User
class UserBase(BaseModel):
    name: str
    email: str
    address: Optional[str] = None


class UserCreate(UserBase):
    email: str


class UserResult(UserBase):
    id: int

    class Config:
        orm_mode = True


# For Product
class ProductBase(BaseModel):
    title: str
    description: str
    price: str
    image: str


class ProductCreate(ProductBase):
    pass


class ProductResult(ProductBase):
    id: int

    class Config:
        orm_mode = True


# For Feedback
class FeedbackBase(BaseModel):
    user_id: int
    product_id: int
    rating: int
    comment: str


class FeedbackCreate(FeedbackBase):
    pass


class FeedbackResult(FeedbackBase):
    id: int
    product_id: int

    class Config:
        orm_mode = True
