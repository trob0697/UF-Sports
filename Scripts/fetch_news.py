import requests
import re
import json
from bs4 import BeautifulSoup as bs
import pyrebase

HEADERS = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36",}
url = "https://floridagators.com"
r = requests.get(url, timeout=5, headers=HEADERS)
soup = bs(r.content, features="html.parser")

news_script = soup.find(id="stories").find("script").string
news_string = re.findall("var obj = (.*?);", news_script)[0]
news_data = json.loads(news_string)["data"]

data = []

for story in news_data:
  news_data_reduced = json.dumps({
    "title" : story["content_title"],
    "image" : story["content_image_url"],
    "url" : story["content_url"],
    "date" : story["content_date"][0:10]
  })
  data.append(json.loads(news_data_reduced))

firebaseConfig = {
  "apiKey": "AIzaSyCwORSWUNWpBSwA3cSVXnngqDNSAFuromM",
  "authDomain": "uf-sports.firebaseapp.com",
  "databaseURL": "https://uf-sports.firebaseio.com",
  "storageBucket": "uf-sports.appspot.com",
}

firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()
db.child("news").set(data)