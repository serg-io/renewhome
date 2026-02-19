"""add sandwich table

Revision ID: 22c55722fc04
Revises: 
Create Date: 2022-01-24 23:45:34.773410

"""
# pylint: skip-file
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '22c55722fc04'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.execute("""
CREATE TABLE IF NOT EXISTS `sandwich` (
  `sandwich_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(2048) DEFAULT NULL,
  `price` int DEFAULT NULL,
  PRIMARY KEY (`sandwich_id`),
  UNIQUE KEY `name` (`name`)
)
""")

    op.execute("""
INSERT INTO `sandwich` (`sandwich_id`, `name`, `description`, `price`) VALUES
(1, 'The King', 'Elvis\\' beloved hoagie, with peanut butter and bananas', 1199),
(2, 'Salty Sally', 'Salted cod with a soy sauce glaze, topped with salt preserved veggies and salted vinegar chips', 1049),
(3, 'An Offer You Can\\'t Refuse', 'Classic Italian cold cut, served \\"swimming with the fishes\\" (covered in fish sauce)', 1149),
(4, 'PB&J', 'The comfort of home, served on a scooped-out loaf shaped like a baseball bat.', 1699);
    """)
    


def downgrade():
    op.execute("""
    DROP TABLE IF EXISTS `sandwich`;
    """)
    
