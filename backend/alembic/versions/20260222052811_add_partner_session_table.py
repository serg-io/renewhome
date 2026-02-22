"""Add partner session table

Revision ID: f1f5cb5972e4
Revises: 36a2493288a8
Create Date: 2026-02-22 05:28:11.519962

"""
# pylint: skip-file

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f1f5cb5972e4'
down_revision = '36a2493288a8'
branch_labels = None
depends_on = None


def upgrade():
    op.execute("""
        CREATE TABLE IF NOT EXISTS partner_session (
                access_token CHAR(32) NOT NULL,
                hoagie_partner_id INT UNSIGNED NOT NULL,
                created_dttm TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                duration INT UNSIGNED NOT NULL DEFAULT 7200,
               PRIMARY KEY(access_token)
            )
    """)


def downgrade():
    op.execute("""DROP TABLE partner_session""")