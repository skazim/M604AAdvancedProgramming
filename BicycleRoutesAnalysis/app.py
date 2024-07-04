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


app = Flask(__name__)
CORS(app)
try:
    bicycleRoutefile = pd.read_csv('./data/RTADataset.csv')
except FileNotFoundError:
    print("File not found")
    bicycleRoutefile = None

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
    try:
        if(bicycleRoutefile is not None):
            accidentSeverity =bicycleRoutefile.groupby(['Number_of_vehicles_involved', 'Accident_severity']).size().reset_index(name='Count').to_json(orient='records')
            return jsonify(accidentSeverity=accidentSeverity)
        else:
            raise ValueError("Error while extraction data file, either file does not exist or corrupted.")
    except Exception as e:
        return jsonify({"File not found, please contact admin": str(e)}), 500

@app.route('/getAgeBand' ,methods=["GET"])
def getAgeBand():
    try:
        if(bicycleRoutefile is not None):
            ageBandDriver = bicycleRoutefile['Age_band_of_driver'].value_counts().sort_index().to_dict()
            ageBandCasuality = bicycleRoutefile['Age_band_of_casualty'].value_counts().sort_index().to_dict()
            return jsonify({"Age_band_of_driver" : ageBandDriver,"Age_band_of_casualty" : ageBandCasuality})
        else:
            raise ValueError("Error while extraction data file, either file does not exist or corrupted.")
    except Exception as e:
        return jsonify({"File not found, please contact admin": str(e)}), 500

@app.route('/getAccidentsByWeek')
def getAccidentsByWeek():
    try:
        if(bicycleRoutefile is not None):
            return jsonify(accidentsByWeek=bicycleRoutefile.groupby('Day_of_week').size().reset_index(name='Count').to_json(orient='records'))
        else:
            raise ValueError("Error while extraction data file, either file does not exist or corrupted.")
    except Exception as e:
        return jsonify({"File not found, please contact admin": str(e)}), 500


@app.route('/getPedestrianMovement')
def getpedestrianMovement():
    try:
        if(bicycleRoutefile is not None):
            bicycleRoutefile['Pedestrian_movement'] = bicycleRoutefile['Pedestrian_movement'].apply(shortText)
            return jsonify(pedestrianMovement=bicycleRoutefile.groupby('Pedestrian_movement').size().reset_index(name='count').to_json(orient='records'))
        else:
            raise ValueError("Error while extraction data file, either file does not exist or corrupted.")
    except Exception as e:
        return jsonify({"File not found, please contact admin": str(e)}), 500


@app.route('/getDriversEducationLevel')
def getDriversEducationLevel():
    try:
        if(bicycleRoutefile is not None):
            return jsonify(driversEducationLevel=bicycleRoutefile.groupby('Educational_level').size().reset_index(name='count').to_json(orient='records'))
        else:
            raise ValueError("Error while extraction data file, either file does not exist or corrupted.")
    except Exception as e:
        return jsonify({"File not found, please contact admin": str(e)}), 500

@app.route('/getCasualitieslist')
def getCasualitieslist():
    try:
        if(bicycleRoutefile is not None):
            return jsonify(casualitieslist=bicycleRoutefile.groupby('Work_of_casuality').size().reset_index(name='count').to_json(orient='records'))
        else:
            raise ValueError("Error while extraction data file, either file does not exist or corrupted.")
    except Exception as e:
        return jsonify({"File not found, please contact admin": str(e)}), 500

@app.route('/getTypeOfJunctions')
def getTypeOfJunctions():
    try:
        if(bicycleRoutefile is not None):
            return jsonify(typeOfJunctions=bicycleRoutefile.groupby('Types_of_Junction').size().reset_index(name='count').to_json(orient='records'))
        else:
            raise ValueError("Error while extraction data file, either file does not exist or corrupted.")
    except Exception as e:
        return jsonify({"File not found, please contact admin": str(e)}), 500

@app.route('/getNumberOfCasualites')
def getNumberOfCasualites():
    try:
        if(bicycleRoutefile is not None):
            return jsonify(numberOfCasualites=bicycleRoutefile.groupby('Number_of_casualties').size().reset_index(name='count').to_json(orient='records'))
        else:
            raise ValueError("Error while extraction data file, either file does not exist or corrupted.")
    except Exception as e:
        return jsonify({"File not found, please contact admin": str(e)}), 500
    
@app.route('/getPairPlotCasualities')
def getPairPlotCasualities():
    try:
        if(bicycleRoutefile is not None):
            return jsonify(pairPlotCasualities=bicycleRoutefile.groupby(['Number_of_vehicles_involved', 'Number_of_casualties']).size().reset_index(name='count').to_json(orient='records'))
        else:
            raise ValueError("Error while extraction data file, either file does not exist or corrupted.")
    except Exception as e:
        return jsonify({"File not found, please contact admin": str(e)}), 500

@app.route('/getModelAnalysis')
def getModelAnalysis():
    try:
        if(bicycleRoutefile is not None):
            return jsonify(modelAnalysis(bicycleRoutefile))  
        else:
            raise ValueError("Error while extraction data file, either file does not exist or corrupted.")
    except Exception as e:
        return jsonify({"File not found, please contact admin": str(e)}), 500


def modelAnalysis(bicycleRoutefile):
    try:
        if bicycleRoutefile is None:
            raise ValueError("Error while extraction data file, either file does not exist or corrupted.")
        else:
            le= LabelEncoder()
            bicycleRoutefile = bicycleRoutefile.apply(le.fit_transform)

            x= bicycleRoutefile.drop('Accident_severity', axis=1)
            y= bicycleRoutefile['Accident_severity']

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
    except Exception as e:
        return jsonify({"File not found, please contact admin": str(e)}), 500


    
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
