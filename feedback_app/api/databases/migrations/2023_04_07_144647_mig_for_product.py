"""MigForProduct Migration."""

from masoniteorm.migrations import Migration


class MigForProduct(Migration):
    def up(self):
        """
        Run the migrations.
        """
        with self.schema.create("products") as table:
            table.increments("id")
            table.string("title")
            table.string("description")
            table.string("price")
            table.string("image")
            table.timestamps()

    def down(self):
        """
        Revert the migrations.
        """
        self.schema.drop("products")
