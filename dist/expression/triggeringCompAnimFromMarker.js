var triggeringCompAnimFromMarker = (function () {
  'use strict';

  const getActiveMarkerIndex = (marker, t) => {
    let index = 0;
    if (marker.numKeys > 0) {
      index = marker.nearestKey(t).index;
      if (marker.key(index).time > t) {
        index--;
      }
    }
    return index;
  };

  const triggeringCompAnimFromMarker = (triggerLayer, sourceLayer, t) => {
    const index = getActiveMarkerIndex(triggerLayer.marker, t);
    if (index === 0) {
      return 0;
    } else {
      const trigger = triggerLayer.marker.key(index);
      const triggerComment = trigger.comment;
      const triggerTime = t - trigger.time;
      try {
        let tMax;
        actMarker = sourceLayer.marker.key(triggerComment);
        if (sourceLayer.marker.numKeys > actMarker.index) {
          tMax =
            sourceLayer.marker.key(actMarker.index + 1).time - actMarker.time;
        } else {
          tMax = sourceLayer.outPoint - actMarker.time - framesToTime(1);
        }
        return actMarker.time + Math.min(triggerTime, tMax);
      } catch (err) {
        return 0;
      }
    }
  };

  return triggeringCompAnimFromMarker;

}());
