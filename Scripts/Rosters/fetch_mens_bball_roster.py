import requests
import pprint
import re
from bs4 import BeautifulSoup as bs
import json
import pyrebase

URL = "https://floridagators.com/sports/mens-basketball/roster"


page = requests.get(URL)
soup = bs(page.content, features="html.parser")

first_names = []
last_names = []
positions = []
heights = []
weights = []
numbers = []
year = []
hometown = []
images = []

for element in soup.find_all('span', {'class': 'sidearm-roster-player-first-name'}):
    first_names.append(element.text)

for element in soup.find_all('span', {'class': 'sidearm-roster-player-last-name'}):
    last_names.append(element.text)

for element in soup.find_all('span', {'class': 'sidearm-roster-player-position-long-short hide-on-medium'}):
    positions.append(element.text.strip())

for element in soup.find_all('span', {'class': 'sidearm-roster-player-height'}):
    heights.append(element.text.strip())

for element in soup.find_all('span', {'class': 'sidearm-roster-player-weight'}):
    weights.append(element.text.strip())

for element in soup.find_all('span', {'class': 'sidearm-roster-player-jersey-number'}):
    numbers.append(element.text.strip())

for element in soup.find_all('span', {'class': 'sidearm-roster-player-academic-year'}):
    year.append(element.text.strip())

for element in soup.find_all('span', {'class': 'sidearm-roster-player-hometown'}):
    hometown.append(element.text.strip())

for element in soup.find_all('img', {'data-src': re.compile('width=80')}):
    link ='https://floridagators.com/' + element['data-src']
    strippedLink = link.replace('?width=80', '')
    images.append(strippedLink)

names = []
for i in range(0, len(first_names)):
    names.append(first_names[i] + " " + last_names[i])


dictionaryList = []
for i in range(0, len(positions)):
    dictionary  = {}
    dictionary['number'] = numbers[i]
    dictionary['year'] = year[i*2]
    dictionary['hometown'] = hometown[i*2]
    dictionary['position'] = positions[i]
    dictionary['name'] = names[i]
    dictionary['weight'] = weights[i]
    dictionary['height'] = heights[i]
    dictionary['image'] = images[i]
    dictionaryList.append(dictionary)
    #print(number[i] + ' ' + year[i*2] + ' ' + hometown[i*2]+ ' ' + positions[i] + ' ' + names[i] + ' ' + heights[i] + ' ' + weights[i])

# pprint.pprint(dictionaryList)

# firebaseConfig = {
#   "apiKey": "AIzaSyCwORSWUNWpBSwA3cSVXnngqDNSAFuromM",
#   "authDomain": "uf-sports.firebaseapp.com",
#   "databaseURL": "https://uf-sports.firebaseio.com",
#   "storageBucket": "uf-sports.appspot.com",
# }
# firebase = pyrebase.initialize_app(firebaseConfig)
# db = firebase.database()
# db.child("rosters").child('mens_basketball').set(dictionaryList)