var triggeringLayerAnimFromMarker = (function () {
  'use strict';

  var getActiveMarkerIndex = function(marker, t) {
    var index = 0;
    if (marker.numKeys > 0) {
      index = marker.nearestKey(t).index;
      if (marker.key(index).time > t) {
        index--;
      }
    }
    return index;
  };

  var returnZero = function() {
    return 0;
  };

  var triggeringLayerAnimFromMarker = function(triggerLayer, propList, t) {
    var index = getActiveMarkerIndex(triggerLayer.marker, t);

    var addValue;
    if (index === 0) {
      addValue = returnZero();
    } else {
      var trigger = triggerLayer.marker.key(index);
      var triggerComment = trigger.comment;
      var triggerTime = t - trigger.time;
      var actProp;
      try {
        for (var i = 0; i < propList.length; i = i + 1) {
          if (propList[i].name === triggerComment) {
            actProp = propList[i].prop;
          }
        }
        addValue = actProp.valueAtTime(triggerTime);
      } catch (err) {
        addValue = returnZero();
      }
    }

    return value + addValue;
  };

  return triggeringLayerAnimFromMarker;

}());
