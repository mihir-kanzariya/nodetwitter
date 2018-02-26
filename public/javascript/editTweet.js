function EditTweet () {
	let EditedTweet = document.getElementById('EditTweet').value;
	let id = document.getElementById('id').value;
	$.ajax({
		method: 'POST',
		url: '/editTweet',
		data: {EditedTweet: EditedTweet, id: id}
	})
		.done(function (data) {
			$('#tweet' + id).text('');
			$('#tweet' + id).append(data[0].tweet);
			$('#hidetweet' + id).val(data[0].tweet);
			$('#hideid' + id).val(data[0]._id);
			$('#myModal').modal('hide');
		});
}
