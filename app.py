from flask import Flask, request, session, g, redirect, url_for, render_template, jsonify
import feedparser
from flask.ext.cors import CORS
import requests
import json
import os

data = {}
camps = []
types = {'CW':'Cold Wave',
        'CE':'Complex Emergency',
        'DR':'Drought',
        'EQ':'Earthquake',
        'EP':'Epidemic',
        'EC':'Extratropical Cyclone',
        'ET':'Extreme Temperature',
        'FA':'Famine',
        'FR':'Fire',
        'FF':'Flash Floods',
        'FL':'Flood',
        'HT':'Heat Wave',
        'IN':'Insect Infesation',
        'LS':'Land Slide',
        'MS':'Mud Slide',
        'OT':'Others',
        'ST':'Severe Local Storm',
        'SL':'Slide',
        'AV':'Snow Avalanche',
        'SS':'Storm Surge',
        'AC':'Tech Disaster',
        'TO':'Tornado',
        'TC':'Tropical Cyclone',
        'TS':'Tsunami',
        'VW':'Violent Wind',
        'WV':'Wave Surge',
        'WF':'Wild Fire',
        }

tips = {
    'Earthquake' : " Quick Tip : If you're indoors, stand against a wall near the center of the building, stand in a doorway, or crawl under heavy furniture (a desk or table). Stay away from windows and outside doors.If you're outdoors, stay in the open away from power lines or anything that might fall. Stay away from buildings (stuff might fall off the building or the building could fall on you)."
}

app = Flask(__name__)
CORS(app)

@app.route("/",methods=['GET','POST'])
def hello():
    temp_json = {}
    for item in data['items']:
        temp_json_item = {}
        temp_json_item['coordinates'] = item['where']
        try:
            temp_json_item['event_type'] = types[item['gdacs_eventtype']]
        except:
            temp_json_item['event_type'] = item['gdacs_eventtype']
        try:
            temp_json_item['tip'] = tips[types[item['gdacs_eventtype']]]
        except:
            pass
        temp_json_item['event_name'] = item['gdacs_eventname']
        temp_json_item['population'] = item['gdacs_population']
        temp_json_item['alert_level'] = item['gdacs_alertlevel']
        temp_json_item['from_date'] = item['gdacs_fromdate']
        temp_json_item['to_date'] = item['gdacs_todate']
        temp_json_item['severity'] = item['gdacs_severity'] #edit, m = magnitude
        temp_json_item['summary'] = item['summary']
        temp_json_item['link'] = item['link']
        temp_json_item['tags'] = item['tags']
        temp_json_item['title'] = item['title']
        temp_json_item['calc'] = item['gdacs_calculationtype']


        # print item['gdacs_severity']

        temp_json[item['id']] = temp_json_item


    # print temp_json

    return jsonify({'data':temp_json})
    @app.after_request
    def after_request(response):
      response.headers.add('Access-Control-Allow-Origin', '*')
      response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
      response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
      return response

@app.route("/post",methods=['GET','POST'])
def get():
    global camps

    if request.method == 'POST':
        tempdata = json.loads(request.data)
        camps.append(tempdata)
        print tempdata

    return 'a'
    @app.after_request
    def after_request(response):
      response.headers.add('Access-Control-Allow-Origin', '*')
      response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
      response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
      return response

@app.route("/camp",methods=['GET','POST'])
def camp():
    global camps

    return jsonify({'data':camps})



if __name__ == "__main__":
    global data

    # data = feedparser.parse('http://www.gdacs.org/rss.aspx?profile=ARCHIVE&from=2012-04-09&to=2016-04-09&alertlevel=orange&country=india&eventtype=')
    data = feedparser.parse(r'rss2.aspx')

    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True,host='0.0.0.0',port=port)
