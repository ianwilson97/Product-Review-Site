""" Feedback Model """

from masoniteorm.models import Model


class Feedback(Model):
    """Feedback Model"""

    __fillable__ = ['rating', 'comment', 'product_id', 'user_id']
