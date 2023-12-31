"""MigForUser Migration."""

from masoniteorm.migrations import Migration


class MigForUser(Migration):
    def up(self):
        """
        Run the migrations.
        """
        with self.schema.create("users") as table:
            table.increments("id")
            table.string("name")
            table.string("email").unique()
            table.text("address").nullable()
            table.timestamps()

    def down(self):
        """
        Revert the migrations.
        """
        self.schema.drop("users")
