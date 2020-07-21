export var getActiveMarkerIndex = function(marker, t) {
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

export const triggeringCompAnimFromMarker = (triggerLayer, animLayer, t) => {
  var index = getActiveMarkerIndex(triggerLayer.marker, t);

  var resultTime;
  if (index == 0) {
    resultTime = returnZero();
  } else {
    var currentMarker = triggerLayer.marker.key(index);
    var name = currentMarker.comment;
    var offsetTime = t - currentMarker.time;
    try {
      var actMarker = animLayer.marker.key(name);
      var maxTime;
      if (animLayer.marker.numKeys > actMarker.index) {
        maxTime =
          animLayer.marker.key(actMarker.index + 1).time - actMarker.time;
      } else {
        maxTime = framesToTime(
          timeToFrames(animLayer.outPoint - actMarker.time) - 1
        );
      }
      var addTime = Math.min(offsetTime, maxTime);
      resultTime = actMarker.time + addTime;
    } catch (err) {
      resultTime = returnZero();
    }
  }

  return resultTime;
};

export var triggeringLayerAnimFromMarker = function(triggerLayer, propList, t) {
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
