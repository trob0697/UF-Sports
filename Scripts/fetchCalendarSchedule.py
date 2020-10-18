
import requests
import json
import re
from datetime import datetime
import pyrebase

# get all events
r = requests.get("https://ufl.lwcal.com/live/calendar/view/seo?user_tz=America%2FDetroit&syntax=%3Cwidget%20type%3D%22events_calendar%22%3E%3Carg%20id%3D%22modular%22%3Etrue%3C%2Farg%3E%3Carg%20id%3D%22default_view%22%3Eweek%3C%2Farg%3E%3Carg%20id%3D%22month_view_day_limit%22%3E3%3C%2Farg%3E%3Carg%20id%3D%22show_sidebar%22%3Efalse%3C%2Farg%3E%3Carg%20id%3D%22mini_cal_heat_map%22%3Etrue%3C%2Farg%3E%3Carg%20id%3D%22thumb_width%22%3E160%3C%2Farg%3E%3Carg%20id%3D%22thumb_height%22%3E160%3C%2Farg%3E%3Carg%20id%3D%22show_groups%22%3Etrue%3C%2Farg%3E%3Carg%20id%3D%22exclude_tag%22%3Eclosed%20event%3C%2Farg%3E%3Carg%20id%3D%22development%22%3Etrue%3C%2Farg%3E%3C%2Fwidget%3E")
allEvents = r.json()

def dateFormatter(dateString):
    # if date is a range, only list beginning date
    if('-' in dateString):
        dateString = re.sub('\ -(.+?)\d', '', dateString)
    return (str(datetime.strptime(dateString, '%B %d, %Y').date()))

eventList =[]

for event in allEvents:
    # if sporting event
    if("Florida Gators " in event['title']):
        # get additional info
        infoReq = requests.get("https://ufl.lwcal.com/live/calendar/view/event/event_id/" + event['id'] + "?user_tz=America%2FDetroit&syntax=%3Cwidget%20type%3D%22events_calendar%22%3E%3Carg%20id%3D%22modular%22%3Etrue%3C%2Farg%3E%3Carg%20id%3D%22default_view%22%3Eweek%3C%2Farg%3E%3Carg%20id%3D%22month_view_day_limit%22%3E3%3C%2Farg%3E%3Carg%20id%3D%22show_sidebar%22%3Efalse%3C%2Farg%3E%3Carg%20id%3D%22mini_cal_heat_map%22%3Etrue%3C%2Farg%3E%3Carg%20id%3D%22thumb_width%22%3E160%3C%2Farg%3E%3Carg%20id%3D%22thumb_height%22%3E160%3C%2Farg%3E%3Carg%20id%3D%22show_groups%22%3Etrue%3C%2Farg%3E%3Carg%20id%3D%22exclude_tag%22%3Eclosed%20event%3C%2Farg%3E%3Carg%20id%3D%22development%22%3Etrue%3C%2Farg%3E%3C%2Fwidget%3E")
        eventJSON = json.loads(infoReq.text)
        print(json.dumps(eventJSON, indent=1))
        eventInfo = {
            'id': eventJSON['event']['id'],
            'title': eventJSON['event']['title'],
            'date': dateFormatter(eventJSON['title']),
            'time': eventJSON['event']['date_time'].replace('<span class="lw_date_separator">-</span>', '-'),
            'location': eventJSON['event']['location'],
        }
        eventList.append(eventInfo)

print(json.dumps(eventList, indent=1))

firebaseConfig = {
  "apiKey": "AIzaSyCwORSWUNWpBSwA3cSVXnngqDNSAFuromM",
  "authDomain": "uf-sports.firebaseapp.com",
  "databaseURL": "https://uf-sports.firebaseio.com",
  "storageBucket": "uf-sports.appspot.com",
}
firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()
db.child("calendarEvents").set(eventList)