from flask import Flask, render_template, request, jsonify
import matplotlib
matplotlib.use('Agg')  # Set the backend before importing pyplot
import matplotlib.pyplot as plt

import openai
import numpy as np
from sklearn.linear_model import LinearRegression
import io
import base64
from openai import OpenAI

client = openai.Client(api_key='<YOUR-API-KEY>')
my_assistant = client.beta.assistants.retrieve("<YOUR-AGENT-KEY>")
assistant_id = "<YOUR-AGENT-KEY>"

def thread_creation():
    my_thread = client.beta.threads.create()
    return(my_thread)
    
my_thread = thread_creation()

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/check-status', methods=['GET'])
def check_status():
    global my_thread, my_run  # Ensure these variables are declared globally
    try:
        run_status = client.beta.threads.runs.retrieve(thread_id=my_thread.id, run_id=my_run.id)
        if run_status.status == "completed":
            all_messages = client.beta.threads.messages.list(thread_id=my_thread.id)
            return jsonify({'status': 'completed', 'response': all_messages.data[0].content[0].text.value})
        elif run_status.status in ["queued", "in_progress"]:
            return jsonify({'status': 'in_progress'})
        else:
            return jsonify({'status': 'error'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

def ask_message(user_question):
    my_thread_message = client.beta.threads.messages.create(
        my_thread.id,
        role="user",
        content=user_question,
    )
    global my_run
    my_run = client.beta.threads.runs.create(
        thread_id=my_thread.id,
        assistant_id=assistant_id,
    )
    return check_status()


@app.route('/get-response', methods=['POST'])
def get_response():
    user_message = request.json['message']
    response = ask_message(user_message)
    return response

@app.route('/plot-graph', methods=['POST'])
def plot_graph():
    requestData = request.json
    data = requestData['data']
    title = requestData.get('title', '')
    xlabel = requestData.get('xlabel', '')
    ylabel = requestData.get('ylabel', '')
    includeLinearRegression = requestData.get('includeLinearRegression', False)

    x_values = [item['x'] for item in data]
    y_values = [item['y'] for item in data]

    
    plt.figure()
    plt.title(title)
    plt.xlabel(xlabel)
    plt.ylabel(ylabel)

    plt.scatter(x_values, y_values, color='blue')

    if includeLinearRegression:
        x = np.array(x_values).reshape(-1, 1)
        y = np.array(y_values)
        model = LinearRegression().fit(x, y)
        y_pred = model.predict(x)
        plt.plot(x, y_pred, color='red')

        # Calculating R² value
        r_squared = model.score(x, y)

        # Getting slope (m) and intercept (c)
        slope = model.coef_[0]
        intercept = model.intercept_

        # Formatting the equation
        equation = f"y = {slope:.2f}x + {intercept:.2f}"

        # Adding R² and the equation to the plot
        plt.text(0.05, 0.95, f'R² = {r_squared:.2f}\n{equation}', 
             transform=plt.gca().transAxes, 
             fontsize=10, verticalalignment='top')


    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    plt.close()
    buf.seek(0)
    image_base64 = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()

    return jsonify({'imageUrl': 'data:image/png;base64,' + image_base64})


if __name__ == '__main__':
    app.run(debug=False)  # Set debug to False in production