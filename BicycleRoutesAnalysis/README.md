# BicycleRoutesAnalysis
The goal is to promote safer and more efficient cycling routes by analyzing infrastructure.


- BicycleRoutesAnalysis works as server which is build over flask app
  ### version 
   - Flask 3.0.3
   - Python 3.10.12
   - Werkzeug 3.0.3
   - Flask-Cors 4.0.1
   - scikit-learn 1.5.1
   - pandas 2.2.0
   - pytest 8.2.2

## Install dependencies and requirements
- pip install -r requirements.txt


To run the application, make sure `export FLASK_APP=app` is already provided
- flask run --host=127.0.0.1 --port=5000


## Unit test Cases
Unit testing is done using python pytest version platform linux -- Python 3.10.12, pytest-8.2.2, pluggy-1.5.0.
To run test case, switch to BicycleRoutesAnalysis on root directory run below command
- python -m pytest -v
