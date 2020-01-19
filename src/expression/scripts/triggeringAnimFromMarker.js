import { isNumber } from "../../utils/checkType";

export const getActiveMarkerIndex = (marker, t) => {
  let index = 0;
  if (marker.numKeys > 0) {
    index = marker.nearestKey(t).index;
    if (marker.key(index).time > t) {
      index--;
    }
  }
  return index;
};

export const triggeringCompAnimFromMarker = (triggerLayer, sourceLayer, t) => {
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

export const triggeringLayerAnimFromMarker = (triggerLayer, propList, t) => {
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
