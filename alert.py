import urllib

params = {
    'api_key': 'c59837ab',
    'api_secret': '4ff06601e5826199',
    'to':  917838968853,
    'from': 918588926652,
    'text': 'WARNING! Your area may experience Earthquake after shocks. Kindly move to the government setted relief camps for your saftey. Nearest Relief Camp : [77.227420,28.656295]'
}

url = 'https://rest.nexmo.com/sms/json?' + urllib.urlencode(params)

response = urllib.urlopen(url)
print response.read()