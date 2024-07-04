import pytest
from app import app

@pytest.fixture
def client():
    """
    Test for flask client
    """
    with app.test_client() as client:
        yield client