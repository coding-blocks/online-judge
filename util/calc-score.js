var parse = require('csv-parse/lib/sync');
var fs = require('fs');

var exports = module.exports = {};

function score_calc_util(lab_true, lab_pred) {
    // check if the arrays have same length
    if (lab_true.length == lab_pred.length) {
        
        score = 0;

        for (var ix=0; ix<lab_true.length; ix++) {
            score += Math.pow(lab_true[ix] - lab_pred[ix], 2);
        }
        score = score / lab_true.length;
        return score;
    } else {
        // return a negative score for wrong arrays
        return -10;
    }
}

function get_csv_array(file_loc) {
	console.log("file contents = " + fs.readFileSync(file_loc).toString());
	var records = parse(fs.readFileSync(file_loc).toString(), {delimiter: ','});
	// Use the writable stream api
	return records[0];
}

function get_student_csv_array(file_loc) {
	var to_return = [];
	var records = parse(fs.readFileSync(file_loc).toString(), {delimiter: ','});
	for (var i = 0; i < records.length; ++i) {
		to_return.push(records[i][0]);
	}
	return to_return;
}

exports.get_score = function(question_id, submission_id) {
	var sample_arr = get_csv_array('./public/data/' + question_id + '_sample.txt');
	// console.log("Sample array = " + JSON.stringify(sample_arr));
	var student_array = get_student_csv_array('./public/submissions/' + submission_id);
	// console.log("student array = " + JSON.stringify(student_array));
	return score_calc_util(sample_arr, student_array);
}
