import pandas as pd
import numpy as np
import json

def getColumns(data):
    return data.columns

def createHistByValue(value):
    counts, bin_edges = np.histogram(data[value], bins=30)
    return json.dumps({
        'counts': counts.tolist(),
        'bin_edges': bin_edges.tolist()})

def loadData():
    data = pd.read_csv('./salarySurvey.csv')
    data.columns = ["Year", "Age", "Gender","City","Position","Years of experience","Germany Experience","Seniority level","Tech program language",
                       "Other Language","Yearly salary","Yearly bonus and stocks", "Salary one year ago","Bonus and stocks last year","Vacation days",
                       "Employment_status","Сontract_duration","Language","Company size","Company type","Job loss COVID","Kurzarbeit","Monetary Support"]
    data.columns = data.columns.str.replace(' ','_') 
    data=data.dropna(subset=['Age','Gender','Position','Years_of_experience','Seniority_level','Salary_one_year_ago','Language']) 
    data=data.drop_duplicates()
    return data

if __name__ == "__main__":
    data = loadData()
    print(getColumns(data))
    print(createHistByValue('Yearly_salary'))