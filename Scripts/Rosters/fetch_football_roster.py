import requests
import pprint
import re
from bs4 import BeautifulSoup as bs
import json
import pyrebase

URL = "https://floridagators.com/sports/football/roster"


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

for element in soup.find_all('td', {'class': 'rp_position_short'}):
    positions.append(element.text.strip())

for element in soup.find_all('td', {'class': 'roster_jerseynum'}):
    numbers.append(element.text.strip())

for element in soup.find_all('td', {'class': 'roster_class'}):
    year.append(element.text.strip())

for element in soup.find_all('td', {'class': 'hometownhighschool'}):
    element2 = element.text.split('/')[0].strip()
    hometown.append(element2)
    # print(element.text.strip().index('/'))

# for element in soup.find_all('img', {'data-src': re.compile('width=80')}):
#     link ='https://floridagators.com/' + element['data-src']
#     strippedLink = link.replace('?width=80', '')
#     images.append(strippedLink)

names = []
for i in range(0, len(positions)):
    names.append(first_names[i] + " " + last_names[i])


dictionaryList = []
for i in range(0, len(positions)):
    dictionary  = {}
    dictionary['number'] = numbers[i]
    dictionary['year'] = year[i]
    dictionary['hometown'] = hometown[i]
    dictionary['position'] = positions[i]
    dictionary['name'] = names[i]
    dictionary['image'] = 'https://via.placeholder.com/872x1199?text=?'
    dictionaryList.append(dictionary)
3
pprint.pprint(dictionaryList)

firebaseConfig = {
  "apiKey": "AIzaSyCwORSWUNWpBSwA3cSVXnngqDNSAFuromM",
  "authDomain": "uf-sports.firebaseapp.com",
  "databaseURL": "https://uf-sports.firebaseio.com",
  "storageBucket": "uf-sports.appspot.com",
}
firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()
db.child("rosters").child('football').set(dictionaryList)