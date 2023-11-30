"""empty message

Revision ID: 2c11dc598014
Revises: b90c02f224a2
Create Date: 2023-11-29 18:15:50.262986

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2c11dc598014'
down_revision = 'b90c02f224a2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('completed_quiz', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('completed_quiz')

    # ### end Alembic commands ###
