import requests
import re
import json
from bs4 import BeautifulSoup as bs
import pyrebase

HEADERS = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36",}
url = "https://floridagators.com"
r = requests.get(url, timeout=5, headers=HEADERS)
soup = bs(r.content, features="html.parser")

events_script = soup.find(id="events").find("script").string
events_string = re.findall("var obj = (.*?);", events_script)[0]
events_data = json.loads(events_string)["data"]

def getGender(input):
  sex = ""
  
  if input == "m":
    sex = "Mens"
  else:
    sex = "Womens"

  return sex

data= []

for event in events_data:
  event_data_reduced = json.dumps({
    "date" : event["date"][0:10],
    "time" : event["time"],
    "location" : event["location_indicator"],
    "sport" : getGender(event["sport"]["gender"]) + " " + event["sport"]["title"],
    "opponent" : event["opponent"]["title"]
  })
  data.append(json.loads(event_data_reduced))

firebaseConfig = {
  "apiKey": "AIzaSyCwORSWUNWpBSwA3cSVXnngqDNSAFuromM",
  "authDomain": "uf-sports.firebaseapp.com",
  "databaseURL": "https://uf-sports.firebaseio.com",
  "storageBucket": "uf-sports.appspot.com",
}

firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()
db.child("events").set(data)