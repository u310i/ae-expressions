t = time * 1 + Math.sin(time * 2) * 0.3;
f = 1 / 6;
cx = this_comp.width / 2;
cy = this_comp.height / 2;
x = Math.sin(t * 2 * Math.PI * f) * 400;
y = -Math.cos(t * 2 * Math.PI * f) * 300;
add([cx, cy], [x, y]);
