import pytest
from flask import Flask
from flask.testing import FlaskClient
from app import app


@pytest.fixture
def client() -> FlaskClient:
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def testClient(client: FlaskClient):
    response = client.get('/')
    assert response.status_code == 200

def testGetGraphList(client: FlaskClient):
    response = client.get('/graphList')
    assert response.status_code == 200
    assert response.json == ['Gender', 'Accident Severity']

def testGetGender(client: FlaskClient):
    response = client.get('/getGender')
    assert response.status_code == 200
    assert response.json == {
        "category": ['Women', 'Men', 'Children'],
        "count": [50, 80, 30]
    }

def testGetAccidentSeverity(client: FlaskClient):
    response = client.get('/getAccidentSeverity')
    assert response.status_code == 200
    assert 'accidentSeverity' in response.json

def testGetAgeBand(client: FlaskClient):
    response = client.get('/getAgeBand')
    assert response.status_code == 200
    # Assuming the data format
    assert 'Age_band_of_driver' in response.json
    assert 'Age_band_of_casualty' in response.json

def testGetAccidentsByWeek(client: FlaskClient):
    response = client.get('/getAccidentsByWeek')
    assert response.status_code == 200
    assert 'accidentsByWeek' in response.json

def testGetPedestrianMovement(client: FlaskClient):
    response = client.get('/getPedestrianMovement')
    assert response.status_code == 200
    assert 'pedestrianMovement' in response.json

def testGetDriversEducationLevel(client: FlaskClient):
    response = client.get('/getDriversEducationLevel')
    assert response.status_code == 200
    assert 'driversEducationLevel' in response.json

def testGetCasualitieslist(client: FlaskClient):
    response = client.get('/getCasualitieslist')
    assert response.status_code == 200
    assert 'casualitieslist' in response.json

def testGetTypeOfJunctions(client: FlaskClient):
    response = client.get('/getTypeOfJunctions')
    assert response.status_code == 200
    assert 'typeOfJunctions' in response.json

def testGetNumberOfCasualites(client: FlaskClient):
    response = client.get('/getNumberOfCasualites')
    assert response.status_code == 200
    assert 'numberOfCasualites' in response.json

def testGetPairPlotCasualities(client: FlaskClient):
    response = client.get('/getPairPlotCasualities')
    assert response.status_code == 200
    assert 'pairPlotCasualities' in response.json

def testGetModelAnalysis(client: FlaskClient):
    response = client.get('/getModelAnalysis')
    assert response.status_code == 200
    assert isinstance(response.json, dict)
