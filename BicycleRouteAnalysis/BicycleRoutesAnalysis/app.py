from flask import Flask, render_template, jsonify
from flask_cors import CORS
import pandas as pd
import json

app = Flask(__name__)
CORS(app)
data = pd.read_csv('./data/RTADataset.csv')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/graphList')
def getGraphList():
    return ['Gender','Accident Severity']

@app.route('/getGender')
def getGender():
    cat =  ['Women', 'Men', 'Children']
    count= [50,80,30]
    return jsonify({
       "category" : cat,
       "count" : count 
    })

@app.route('/getAccidentSeverity', methods=["GET"])
def getAccidentSeverity():
    accidentSeverity =data.groupby(['Number_of_vehicles_involved', 'Accident_severity']).size().reset_index(name='Count').to_json(orient='records')
    return jsonify(accidentSeverity=accidentSeverity)

@app.route('/getAgeBand' ,methods=["GET"])
def getAgeBand():
    ageBandDriver = data['Age_band_of_driver'].value_counts().sort_index().to_dict()
    ageBandCasuality = data['Age_band_of_casualty'].value_counts().sort_index().to_dict()
    return jsonify({
        "Age_band_of_driver" : ageBandDriver,
        "Age_band_of_casualty" : ageBandCasuality
    })

@app.route('/getAccidentsByWeek')
def getAccidentsByWeek():
    return jsonify(accidentsByWeek=data.groupby('Day_of_week').size().reset_index(name='Count').to_json(orient='records'))


@app.route('/getDriversEducationLevel')
def getDriversEducationLevel():
    return jsonify(driversEducationLevel=data.groupby('Educational_level').size().reset_index(name='count').to_json(orient='records'))