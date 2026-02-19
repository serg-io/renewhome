"""add_price_tracking_tables

Revision ID: 36a2493288a8
Revises: 0ba008ea4090
Create Date: 2025-02-03 15:59:08.820698

"""
# pylint: skip-file

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '36a2493288a8'
down_revision = '0ba008ea4090'
branch_labels = None
depends_on = None


def upgrade():
    op.execute("""
        CREATE TABLE IF NOT EXISTS product (
            product_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            name VARCHAR(128) NOT NULL,
            type VARCHAR(32) NOT NULL,
            created_dttm TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_dttm TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY(product_id),
            UNIQUE KEY `name` (`name`)
        )
    """)

    op.execute("""
        CREATE TABLE IF NOT EXISTS price (
            price_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            product_id INT UNSIGNED NOT NULL,
            price INT NOT NULL,
            price_dttm TIMESTAMP NOT NULL,
            created_dttm TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_dttm TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY(price_id)
        )
    """)


def downgrade():
    op.execute("DROP TABLE IF EXISTS price")
    op.execute("DROP TABLE IF EXISTS product")
