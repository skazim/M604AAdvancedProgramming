from flask import Flask, render_template, jsonify
from flask_cors import CORS
import pandas as pd


app = Flask(__name__)
CORS(app)
data = pd.read_csv('./data/RTADataset.csv')
data.columns = ["Year", "Age", "Gender","City","Position","Years of experience","Germany Experience","Seniority level","Tech program language",
                       "Other Language","Yearly salary","Yearly bonus and stocks", "Salary one year ago","Bonus and stocks last year","Vacation days",
                       "Employment_status","Сontract_duration","Language","Company size","Company type","Job loss COVID","Kurzarbeit","Monetary Support"]
data.columns = data.columns.str.replace(' ','_') 
data=data.dropna(subset=['Age','Gender','Position','Years_of_experience','Seniority_level','Salary_one_year_ago','Language']) 
data=data.drop_duplicates()


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/getColumns')
def getColumns():
    columns = data.columns.tolist()
    return jsonify(columns)

@app.route('/getAgeAndExperienceWiseChart')
def getAgeAndExperienceWiseChart():
    yoE = data['Years_of_experience'].tolist()
    age = data['Age'].tolist()
    gender = data['Gender'].tolist()
    chart = {
        "yearsOfExperience": yoE,
        "age": age,
        "gender": gender
    }
    return jsonify(chart)
