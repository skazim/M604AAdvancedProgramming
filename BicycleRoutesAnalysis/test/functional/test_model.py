import pandas as pd
from sklearn.linear_model import LogisticRegression
from app import modelAnalysis,findModelAccuracy,shortText


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