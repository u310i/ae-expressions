const getMarkers = (marker, name) => {
  const length = marker.numKeys;
  const markerList = [];
  if (length) {
    Array(length)
      .fill(0)
      .forEach((_, i) => {
        if (name === undefined) {
          markerList.push(marker.key(i + 1));
        } else {
          if (marker.key(i + 1).comment === name) {
            markerList.push(marker.key(i + 1));
          }
        }
      });
  }
  return markerList;
};

const getNearestIndex = (target, list) => {
  if (list.length === 0) return -1;
  const nearestValue = list.reduce((prev, curr) => {
    return Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev;
  });
  return list.indexOf(nearestValue);
};

const getCurrentRange = (target, list) => {
  let currentValue;
  list.forEach((v, i) => {
    if (target >= v && (i === list.length - 1 || target < list[i + 1])) {
      currentValue = v;
    }
  });
  return list.indexOf(currentValue);
};

const getTimeList = markers => {
  return markers.map(m => {
    return m.time;
  });
};

const getNearestMarkerIndexfromNamed = (marker, name, t) => {
  const markers = getMarkers(marker, name);
  const timeList = getTimeList(markers);

  const currentIndex = getNearestIndex(t, timeList);
  return currentIndex === -1 ? 0 : markers[currentIndex].index;
};

const getActiveMarkerIndexfromNamed = (marker, name, t) => {
  const markers = getMarkers(marker, name);
  const timeList = getTimeList(markers);
  const currentIndex = getCurrentRange(t, timeList);
  return currentIndex === -1 ? 0 : markers[currentIndex].index;
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
