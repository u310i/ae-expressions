var triggeringLayerAnimFromMarker = (function () {
  'use strict';

  const posinf = Number.POSITIVE_INFINITY;
  const neginf = Number.NEGATIVE_INFINITY;

  const isNumber = data => {
    return typeof data === "number" && data > neginf && data < posinf;
  };

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

  const triggeringLayerAnimFromMarker = (triggerLayer, propList, t) => {
    const index = getActiveMarkerIndex(triggerLayer.marker, t);

    const isArray = !isNumber(value) && Array.isArray(value);
    const dimension = isArray && value.length;

    const returnZero = () => (isNumber(value) ? 0 : Array(dimension).fill(0));

    let addValue;
    if (index === 0) {
      addValue = returnZero();
    } else {
      const trigger = triggerLayer.marker.key(index);
      const triggerComment = trigger.comment;
      const triggerTime = t - trigger.time;
      let actProp;
      try {
        propList.forEach((v, i) => {
          if (v.name === triggerComment) {
            actProp = v.prop;
          }
        });
        addValue = actProp.valueAtTime(triggerTime);
      } catch (err) {
        addValue = returnZero();
      }
    }

    return isNumber(value)
      ? value + addValue
      : isArray
      ? add(value, addValue)
      : returnZero();
  };

  return triggeringLayerAnimFromMarker;

}());
