"""add hoagie_partner table

Revision ID: 0ba008ea4090
Revises: 51d9b5323d01
Create Date: 2024-06-12 18:31:32.548926

"""
# pylint: skip-file

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0ba008ea4090'
down_revision = '51d9b5323d01'
branch_labels = None
depends_on = None


def upgrade():
    op.execute("""
        CREATE TABLE IF NOT EXISTS hoagie_partner (
               hoagie_partner_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
               hoagie_partner_name VARCHAR(255) NOT NULL UNIQUE, 
               price_per_request DECIMAL(10, 4) COMMENT 'the price, in united states dollars, per API request made to Hoagie Haven',
               client_token CHAR(32) DEFAULT NULL,
               client_secret CHAR(32) DEFAULT NULL,
               created_dttm TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
               updated_dttm TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
               PRIMARY KEY(hoagie_partner_id)
            )
    """)

    op.execute("""
               INSERT INTO hoagie_partner (hoagie_partner_name, price_per_request, client_token, client_secret) VALUES 
               ("Hoagie Haven Test", 0.00, 'fGIgKVnj9RSZkMOlE6pY1nwT_oEMWbjg', 'BE1hu8Vv0WO6DlYgQvlpF5xCdQxNqqj9'), 
               ("Hoagie's Heros", 10.1787, '-UalX1ujR6MIkczQGUMu9zuCyyNW0H-t', 'sxK3NaYyW34aW0V2JFRrr2crW5oAdASA'), 
               ("SuperGyro Hoagies", 9.99, 'qc7_lYsibso-mZXImsDR7S6vFggarCx7', 'pgc9WZI0nnq6u6JzYc3_HAp32uRGSHF7'), 
               ("Hometown International, Inc.", 325.23, 'nrOCjV88XsBcU0XCsVr7VbqJown4NhT0', 'y6-hA64d8AXaCA4Wae0xE5W3fwlZnH2E')
    """)


def downgrade():
    op.execute("""DROP TABLE hoagie_partner""")
