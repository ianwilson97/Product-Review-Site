""" Product Model """

from masoniteorm.models import Model
from masoniteorm.relationships import has_many

class Product(Model):
    """Product Model"""
    @has_many("id", "user_id")
    def feedback(self):
        from .Feedback import Feedback
        return Feedback
