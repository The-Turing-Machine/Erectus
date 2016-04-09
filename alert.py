import urllib

params = {
    'api_key': 'c59837ab',
    'api_secret': '4ff06601e5826199',
    'to':  917838968853,
    'from': 918588926652,
    'text': 'Earthquake Aaa gyiii!!!'
}

url = 'https://rest.nexmo.com/sms/json?' + urllib.urlencode(params)

response = urllib.urlopen(url)
print response.read()