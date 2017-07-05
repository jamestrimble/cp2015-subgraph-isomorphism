var all_d = <DATA_PLACEHOLDER>;

//all_d = [all_d[0]];

all_d.forEach(function(d) {
  var num_vars = d.length;
  var dom_size = d[0].domains.length;

  var w = dom_size*3;
  var h = num_vars*3;


  var dist_between_rows = [];
  for (var i=0; i<num_vars; i++) {
    dist_between_rows.push([]);
    for (var j=0; j<num_vars; j++) {
      var dist = 0;
      for (var k=0; k<dom_size; k++) {
        if (d[i].domains[k] != d[j].domains[k]) {
          dist++;
        }
      }
      dist_between_rows[i].push(dist);
    }
  }

  var row_order = [];
  var candidate_row_nums = [];
  for (var i=0; i<num_vars; i++) {
    candidate_row_nums.push(i);
  }

  var row_popcounts = d.map(function(element) {
    var popcount = 0;
    element.domains.forEach(function(x) {popcount += x});
    return popcount;
  });

  candidate_row_nums.sort(function(a, b) {
    if (row_popcounts[a] < row_popcounts[b]) return -1;
    if (row_popcounts[a] > row_popcounts[b]) return 1;
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  if (candidate_row_nums.length) {
    row_order.push(candidate_row_nums[0]);
    candidate_row_nums.splice(0, 1);
  }

  while (candidate_row_nums.length) {
    var best_dist = 999999999;
    var best_row_num = -1;
    var prev_row_num = row_order[row_order.length-1];
    candidate_row_nums.forEach(function(row_num) {
      if (dist_between_rows[prev_row_num][row_num] < best_dist) {
        best_dist = dist_between_rows[prev_row_num][row_num];
        best_row_num = row_num;
      }
    });
    row_order.push(best_row_num);
    for (var i=0; ; i++) {
      if (candidate_row_nums[i] == best_row_num) {
        candidate_row_nums.splice(i, 1);
        break;
      }
    }
  }


  var dist_between_cols = [];
  for (var i=0; i<dom_size; i++) {
    dist_between_cols.push([]);
    for (var j=0; j<dom_size; j++) {
      var dist = 0;
      for (var k=0; k<num_vars; k++) {
        if (d[k].domains[i] != d[k].domains[j]) {
          dist++;
        }
      }
      dist_between_cols[i].push(dist);
    }
  }

  var col_order = [0];
  var candidate_col_nums = [];
  for (var i=1; i<dom_size; i++) {
    candidate_col_nums.push(i);
  }
  while (candidate_col_nums.length) {
    var best_dist = 999999999;
    var best_col_num = -1;
    var prev_col_num = col_order[col_order.length-1];
    candidate_col_nums.forEach(function(col_num) {
      if (dist_between_cols[prev_col_num][col_num] < best_dist) {
        best_dist = dist_between_cols[prev_col_num][col_num];
        best_col_num = col_num;
      }
    });
    col_order.push(best_col_num);
    for (var i=0; ; i++) {
      if (candidate_col_nums[i] == best_col_num) {
        candidate_col_nums.splice(i, 1);
        break;
      }
    }
  }


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
    var row_num = row_order[i];
    for (var j=0; j<dom_size; j++) {
      var col_num = col_order[j];
      var x = d[row_num].domains[col_num];
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
  hr.style.borderTop = '1px solid #cc8822';
  canv_div.appendChild(hr);
});
