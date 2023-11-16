"""added first time signin

Revision ID: b90c02f224a2
Revises: 59fc0c676a7d
Create Date: 2023-11-16 10:05:01.410161

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b90c02f224a2'
down_revision = '59fc0c676a7d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('first_sign_in', sa.Boolean(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('first_sign_in')

    # ### end Alembic commands ###
