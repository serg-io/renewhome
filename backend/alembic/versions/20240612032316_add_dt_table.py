"""add dt table

Revision ID: 51d9b5323d01
Revises: 8a934ab26218
Create Date: 2024-06-12 03:23:16.247115

"""
# pylint: skip-file

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '51d9b5323d01'
down_revision = '8a934ab26218'
branch_labels = None
depends_on = None


def upgrade():
    # Bootstrap the dt table 
  op.execute("""CREATE TABLE IF NOT EXISTS dt (dt DATE NOT NULL, PRIMARY KEY(dt))""")
  op.execute("""INSERT IGNORE INTO dt VALUES ('2023-01-01')""")
  for _ in range(9):  # 2 ^ 9 > 365 > 2 ^ 8
    op.execute("""INSERT IGNORE INTO dt (dt) SELECT dt + INTERVAL DATEDIFF((SELECT MAX(dt) FROM dt), (SELECT MIN(dt) FROM dt)) + 1 DAY AS new_dt FROM dt HAVING new_dt <= '2023-12-31'""")



def downgrade():
    op.execute("""DROP TABLE dt""")
