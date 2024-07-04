from flask import Flask, render_template, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier,AdaBoostClassifier,GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler,LabelEncoder
from sklearn.pipeline import Pipeline
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

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


@app.route('/getPedestrianMovement')
def getpedestrianMovement():
    data['Pedestrian_movement'] = data['Pedestrian_movement'].apply(shortText)
    return jsonify(pedestrianMovement=data.groupby('Pedestrian_movement').size().reset_index(name='count').to_json(orient='records'))

@app.route('/getDriversEducationLevel')
def getDriversEducationLevel():
    return jsonify(driversEducationLevel=data.groupby('Educational_level').size().reset_index(name='count').to_json(orient='records'))


@app.route('/getCasualitieslist')
def getCasualitieslist():
    return jsonify(casualitieslist=data.groupby('Work_of_casuality').size().reset_index(name='count').to_json(orient='records'))


@app.route('/getTypeOfJunctions')
def getTypeOfJunctions():
    return jsonify(typeOfJunctions=data.groupby('Types_of_Junction').size().reset_index(name='count').to_json(orient='records'))

@app.route('/getNumberOfCasualites')
def getNumberOfCasualites():
    return jsonify(numberOfCasualites=data.groupby('Number_of_casualties').size().reset_index(name='count').to_json(orient='records'))

@app.route('/getPairPlotCasualities')
def getPairPlotCasualities():
    return jsonify(pairPlotCasualities=data.groupby(['Number_of_vehicles_involved', 'Number_of_casualties']).size().reset_index(name='count').to_json(orient='records'))


@app.route('/getModelAnalysis')
def getModelAnalysis():
    return jsonify(modelAnalysis(data))    

def modelAnalysis(data):
    le= LabelEncoder()
    data = data.apply(le.fit_transform)

    x= data.drop('Accident_severity', axis=1)
    y= data['Accident_severity']

    models={"LogisticRegression":LogisticRegression(),
        "DecisionTreeClassifier":DecisionTreeClassifier(),
        "SVM":SVC(),
        "KNeighborsClassifier":KNeighborsClassifier(),
        "GNB":GaussianNB(),
       "RandomForestClassifier":RandomForestClassifier(),
        "AdaBoostClassifier":AdaBoostClassifier(),
        "GradientBoostingClassifier":GradientBoostingClassifier(),
        }
    return findModelAccuracy(models,x,y)
    
def findModelAccuracy(models,x,y):
    xtr,xte,ytr,yte=train_test_split(x,y,test_size=0.2,random_state=0)
    res = {}
    for name,model in models.items():
        pL=Pipeline([('StandardScaler',StandardScaler()),('model',model)])
        fit =pL.fit(xtr,ytr)
        ypd = fit.predict(xte)
        ac=accuracy_score(yte,ypd)
        res[name]=ac
    return res  

def shortText(text):
    short = {
        'Not a Pedestrian': 'Not Pedestrain',
        'Crossing from driver\'s nearside' : 'Crossing',
        'Crossing from nearside - masked by parked or statioNot a Pedestrianry vehicle' : 'CNF',
        'Crossing from offside - masked by  parked or statioNot a Pedestrianry vehicle': 'COF',
        'Walking along in carriageway, back to traffic': 'WBT',
        'Walking along in carriageway, facing traffic': 'WFT',
        'In carriageway, statioNot a Pedestrianry - not crossing  (standing or playing)': 'Not Crossing',
        'In carriageway, statioNot a Pedestrianry - not crossing  (standing or playing) - masked by parked or statioNot a Pedestrianry vehicle': 'Not Crossing Parked'
    }
    return short.get(text, text)
