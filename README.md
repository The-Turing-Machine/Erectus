# Erectus :volcano:

A Disaster management service, alerting people of upcoming natural disaster and showing them way to nearest relief camps via mobile app.

![Dashboard](https://github.com/The-Turing-Machine/Erectus/blob/master/common/Dashboard.png)

###Disaster Detection 
The disaster detection extracts live RSS feeds from Global Disaster Alert and Coordination System (GDACS).

###Information Sent to Government Panel
The live rss feed is updated on the government panel (dashboard) from where the officials set the locations of Relief Camps and broadcast alert to all people.

###Alert Citizens
The sent message by the panel is used to extract relief camp coordinates from the message and is plotted on the map. Citizens can immediately head to relief centres set  by the government.

###Mobile App
<img src="https://github.com/The-Turing-Machine/Erectus/blob/master/common/app.jpg" alt="app" style="width: 200px;"/>

The user opens the app when sms alert arrives. The app auto detects the coordinates from the text message of the relief camps. The coordinates fetched are plotted on the map and the routes to direction of the relief/shelter camps from the user’s current location are plotted.

**A project made by [TheTuringMachine](https://github.com/The-Turing-Machine/Erectus/graphs/contributors) during HACK@NSIT 16'**




