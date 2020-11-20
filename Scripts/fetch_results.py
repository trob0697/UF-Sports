import requests
import re
import json
from bs4 import BeautifulSoup as bs
import pyrebase

HEADERS = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36",}
url = "https://floridagators.com"
r = requests.get(url, timeout=5, headers=HEADERS)
soup = bs(r.content, features="html.parser")

results_script = soup.find(id="results").find("script").string
results_string = re.findall("var obj = (.*?);", results_script)[0]
results_data = json.loads(results_string)["data"]

data = []

def get_opponent_short_name(res):
  if(res["result"]["line_scores"]["home_short_name"] != "UF"):
    return res["result"]["line_scores"]["home_short_name"]
  else:
    return res["result"]["line_scores"]["away_short_name"]

for result in results_data:
  if result["result"]["status"] != "N":
    result_data_reduced = json.dumps({
      "date" : result["date"][0:10],
      "opponent_image" : "http://floridagators.com" + result["opponent"]["image"],
      "opponent_score" : result["result"]["opponent_score"],
      "opponent_short_name" : get_opponent_short_name(result),
      "sport": result["sport"]["title"],
      "team_score" : result["result"]["team_score"]
    })
    data.append(json.loads(result_data_reduced))

firebaseConfig = {
  "apiKey": "AIzaSyCwORSWUNWpBSwA3cSVXnngqDNSAFuromM",
  "authDomain": "uf-sports.firebaseapp.com",
  "databaseURL": "https://uf-sports.firebaseio.com",
  "storageBucket": "uf-sports.appspot.com",
}

firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()
data = data + db.child("results").get().val()

##### Remove duplicates #####
data_condensed = []
seen = set()
for d in data:
  if frozenset(d) not in seen:
    data_condensed.append(d)
    seen.add(frozenset(d))
#############################

db.child("results").set(data_condensed)