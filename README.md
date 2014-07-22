Talkie Leaflet/Mapbox example
===========

A simple Leaflet example using Talkie, an open source library by http://kiln.it. Full Talkie library and documentation here: Talkie info - http://kiln.it/talkie/

To see our example live, visit http://nicholasgunner.com/talkie-leaflet

## Usage:

* Include Leaflet. For this example, we'll use mapbox.js which includes Leaflet

	`<script src='mapbox-dist/mapbox.js'></script>`
	`<link href='mapbox-dist/mapbox.css' rel='stylesheet' />`

* Include the Talkie library

	`<link rel="stylesheet" type="text/css" href="http://kiln.it/talkie/ui/1.0/talkie.css">`
	`<script src="http://kiln.it/talkie-1.3.min.js"></script>`

* Include leaflet-talkie

	`<script src="talkie-leaflet.js"></script>`

* Build your timeline

	`/* Hook up the Talkie integration to our map */
      	var tl = TalkieLeaflet(map);

      /* Talkie timeline config. Note: #soundtrack should be replaces with your audio element*/
      var timeline = Talkie.timeline("#soundtrack", {
        "00:18": tl.setView([40.7298, -74.0027], 13), // New York city
        "00:22": tl.setView([42.8963, -78.8822], 12), // Buffalo
        "00:26": tl.setView([-41.112, -188.767], 6),  // New Zealand
        "00:29": tl.setView([42.8963, -78.8822], 12), // Buffalo
        "00:32": tl.setView([42.44, -79.33], 17)      // Fredonia
      });

      // Tell TalkieLeaflet that we want to revert user changes to the map view
      //
      // If we don’t call this, then the scripted setViews will still work but
      // user changes will not pause the timeline or be reverted.
       tl.undoViewChanges(timeline);`

## Now go tell amazing stories on maps!

Here's an amazing example usage!! - http://www.theguardian.com/world/ng-interactive/2014/aviation-100-years

Music credit: "Sidewalk Chalk" by Broke For Free (http://brokeforfree.com/)
