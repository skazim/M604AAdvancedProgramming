import tkinter as tk
from tkinter import ttk
import requests
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

# Function to fetch data from Flask backend
def fetch_data():
    response = requests.get('http://127.0.0.1:5000/routes')
    data = response.json()
    # print(data)
    return pd.DataFrame(data)

# Function to create visualizations
def create_charts(df):
    window = tk.Tk()
    window.title("Bicycle Route Analysis")

    # Example: Plotting the count of routes by city
    figure = plt.Figure(figsize=(6, 5), dpi=100)
    ax = figure.add_subplot(111)
    df['Sex_of_casualty'].value_counts().plot(kind='bar', ax=ax)
    ax.set_title('Count of Routes by City')
    ax.set_xlabel('City')
    ax.set_ylabel('Number of Routes')

    canvas = FigureCanvasTkAgg(figure, window)
    canvas.get_tk_widget().pack(side=tk.TOP, fill=tk.BOTH, expand=True)

    window.mainloop()

if __name__ == '__main__':
    df = fetch_data()
    create_charts(df)
