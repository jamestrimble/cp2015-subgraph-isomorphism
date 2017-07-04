var all_d = <DATA_PLACEHOLDER>;

all_d.forEach(function(d) {
  var num_vars = d.length;
  var dom_size = d[0].domains.length;

  var w = dom_size*3;
  var h = num_vars*3;

  var canv_div = document.createElement('div');
  canv_div.style.margin = '20px';
  canv_div.style.float = 'left';
  canv_div.style.clear = 'both';

  var canv = document.createElement('canvas');
  document.getElementById('viz').appendChild(canv_div);
  canv_div.appendChild(canv);
  canv.width = w;
  canv.height = h;
  var ctx = canv.getContext('2d');

  var id = ctx.getImageData(0, 0, w, h);
  console.log(id);

  for (var i=0; i<num_vars; i++) {
    for (var j=0; j<dom_size; j++) {
      var x = d[i].domains[j];
      if (x) {
        for (var k=0; k<2; k++) {
          for (var l=0; l<2; l++) {
            id.data[4 * (w*(i*3+k) + j*3+l)] = 0;
            id.data[4 * (w*(i*3+k) + j*3+l) + 1] = 0;
            id.data[4 * (w*(i*3+k) + j*3+l) + 2] = 0;
            id.data[4 * (w*(i*3+k) + j*3+l) + 3] = 255;
          }
        }
      }
    }
  }
  ctx.putImageData(id, 0, 0);
  
  var hr = document.createElement('hr');
  canv_div.appendChild(hr);
});
