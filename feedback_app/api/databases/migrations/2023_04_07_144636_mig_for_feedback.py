"""MigForFeedback Migration."""

from masoniteorm.migrations import Migration


class MigForFeedback(Migration):
    def up(self):
        """
        Run the migrations.
        """
        with self.schema.create("feedbacks") as table:
            table.increments("id")
            table.integer("user_id").unsigned()
            table.foreign("user_id").references("id").on("users")
            table.integer("product_id").unsigned()
            table.foreign("product_id").references("id").on("products")
            table.float("rating")
            table.string("comment")
            table.timestamps()

    def down(self):
        """
        Revert the migrations.
        """
        self.schema.drop("feedbacks")
