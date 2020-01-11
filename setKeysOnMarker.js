const sourceL = thisComp.layer("source");

const getMarkers = (targetMarker, targetName = "") => {
  const length = targetMarker.numKeys;
  const markerList = [];
  if (length) {
    Array(length)
      .fill(0)
      .forEach((_, i) => {
        if (targetName === "") {
          markerList.push(targetMarker.key(i + 1));
        } else {
          if (targetMarker.key(i + 1).comment === targetName) {
            markerList.push(targetMarker.key(i + 1));
          }
        }
      });
  }
  return markerList;
};

const getNearestIndex = (targetValue, list) => {
  const nearestValue = list.reduce((prev, curr) => {
    return Math.abs(curr - targetValue) < Math.abs(prev - targetValue)
      ? curr
      : prev;
  });
  return list.indexOf(nearestValue);
};

const getCurrentRange = (targetValue, list) => {
  let currentValue;
  list.forEach((v, i) => {
    if (
      targetValue >= v &&
      (i === list.length - 1 || targetValue < list[i + 1])
    )
      currentValue = v;
  });
  return list.indexOf(currentValue);
};

const getNamedNearestKey = (targetMarker, targetName = "", t) => {
  const markers = getMarkers(targetMarker, targetName);
  if (markers.length === 0) return undefined;

  const timeList = markers.map(m => {
    return m.time;
  });

  const nearestIndex = getNearestIndex(t, timeList);
  if (nearestIndex === -1) return undefined;

  return markers[nearestIndex];
};

const setKeysOnMarker = (targetValue, name, t) => {
  const targetMarker = targetValue.marker;
  const nearest = targetValue.marker.nearestKey(t);

  let currentIndex;
  if (t < nearest.time) {
    if (nearest.index === 1) {
      currentIndex = 0;
    } else {
      currentIndex = nearest.index - 1;
    }
  } else {
    currentIndex = nearest.index;
  }
  let aaa = 0;
  let addValue = 0;
  if (currentIndex > 0) {
    const currentMarker = marker.key(currentIndex);
    const currentMarkerTime = t - currentMarker.time;
    addValue = sourceL.transform.opacity.valueAtTime(currentMarkerTime);
  }
};

value + addValue;
