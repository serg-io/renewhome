"""add orders and order items

Revision ID: 8a934ab26218
Revises: 22c55722fc04
Create Date: 2022-01-25 00:24:24.104103

"""
# pylint: skip-file
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8a934ab26218'
down_revision = '22c55722fc04'
branch_labels = None
depends_on = None


def upgrade():
    op.execute('''
CREATE TABLE IF NOT EXISTS `order` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `customer_phone_number` varchar(16) DEFAULT NULL,
  `created_dttm` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_dttm` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` enum('OPEN','SUBMITTED','FULFILLED') DEFAULT NULL,
  PRIMARY KEY (`order_id`)
);
    ''')

    op.execute('''
CREATE TABLE IF NOT EXISTS `order_item` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `sandwich_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `created_dttm` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_dttm` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_item_id`),
  INDEX `ix_order_id` (`order_id`),
  INDEX `ix_sandwich_id` (`sandwich_id`)
);
''')



def downgrade():
    op.execute('''
    DROP TABLE IF EXISTS `order_item`;
    ''')
    op.execute('''
    DROP TABLE IF EXISTS `order`;
    ''')
