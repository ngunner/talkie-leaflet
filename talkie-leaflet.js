/* Generic Talkie/Leaflet integration. Requires Talkie 1.3 or better. */

(function() {
    // Set the map view, even if a map animation is currently in progress.
    //
    // This is dependent on Leaflet internals, and must be reconsidered
    // when Leaflet is upgraded.
    function setMapView(map, center, zoom, reset) {
        console.log("setMapView", center, zoom, reset);
        if (map._animatingZoom) {
            console.log("Attempting to interrupt map zoom animation");

            var container = map.getContainer();
            container.className = container.className.replace(/\bslow-zoom\b/, "");

            map._animateToCenter = center;
            map._animateToZoom = zoom;
            map._onZoomTransitionEnd();

            map.setView(center, zoom, {"reset": true}); // Belt and braces
        }
        else {
            map.setView(center, zoom, {"reset": reset});
        }
    }

    // Constructor
    function _TalkieLeaflet(map) {
        this.map = map;
        var tl = this;
    }

    // Set the map view
    _TalkieLeaflet.prototype.setView = function(center, zoom) {
        var map = this.map;
        return function() {
            // Record the current map position
            var prev_center = map.getCenter(),
                prev_zoom = map.getZoom();

            // Update the map view
            setMapView(map, center, zoom);

            // Revert the view when the user scrubs back
            this.setUndo(function() {
                setMapView(map, prev_center, prev_zoom);
            });
        };
    };

    _TalkieLeaflet.prototype.undoViewChanges = function(timeline) {
        var tl = this,
            map = tl.map;

        map.on("movestart", function() {
            // If this move is initiated by the user, pause the timeline.
            if (!timeline.running) timeline.pause();
        });

        function rememberPosition() {
            // Record the current map position, and revert to it
            // when the user presses play again.
            var center = map.getCenter(),
                zoom = map.getZoom();
            console.log("Creating undoInteraction:", center, zoom);
            timeline.undoInteraction(function() {
                console.log("Running undoInteraction:", center, zoom);
                map.setView(center, zoom);
            });
        }

        // Remember the position whenever the timeline is paused
        timeline.onPause(rememberPosition);

        // Also call rememberPosition immediately, so that if the user moves the map before
        // initially pressing play, we move it back. We need to explicitly pause the timeline
        // in order to prevent the undo handler from firing immediately, at least in Chrome.
        timeline.pause();
        rememberPosition();
    }

    window.TalkieLeaflet = function TalkieLeaflet(map) {
        return new _TalkieLeaflet(map);
    };
})();
