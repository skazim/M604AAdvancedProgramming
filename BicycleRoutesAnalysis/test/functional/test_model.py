import pandas as pd
from sklearn.linear_model import LogisticRegression
from app import modelAnalysis,findModelAccuracy,shortText

# def test_modelAnalysis_with_valid_data():
#     bicycleRoutefile = pd.read_csv('././data/sampledata.csv')
#     result = modelAnalysis(bicycleRoutefile)
#     assert isinstance(result, dict)

#     expected_keys = ["LogisticRegression", "DecisionTreeClassifier", "SVM",
#                       "KNeighborsClassifier", "GNB", "RandomForestClassifier",
#                         "AdaBoostClassifier", "GradientBoostingClassifier"]
#     assert set(result.keys()) == set(expected_keys)

# def test_modelAnalysis_with_none_data():
#     result = modelAnalysis(None)
#     assert isinstance(result, tuple)
#     assert len(result) == 2
#     assert result[1] == 500
#     assert result[0]['File not found, please contact admin'] == 'Error while extraction data file, either file does not exist or corrupted.'

def test_findModelAccuracy():
    x = pd.DataFrame({'A': [1, 2, 3, 4, 5], 'B': [2, 3, 4, 5, 6]})
    y = pd.Series([0, 0, 1, 1, 1])

    models = {"LogisticRegression": LogisticRegression()}

    result = findModelAccuracy(models, x, y)
    assert isinstance(result, dict)
    assert "LogisticRegression" in result

def test_shortText():
    assert shortText('Not a Pedestrian') == 'Not Pedestrain'
    assert shortText('Unknown') == 'Unknown'