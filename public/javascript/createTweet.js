$('#Tweet').click(function () {
	let tweet = document.getElementById('tweetArea').value;
	document.getElementById('tweetArea').value = '';
	$.ajax({
		method: 'POST',
		url: '/createTweet',
		data: { tweet: tweet }
	})
		.done(function (data) {
			$('#tweetsFromFollowing')
				.prepend('<div class="well twtdiv row"><div class="col-md-2"><img src="' +
    data.getUserProfileCard.img + '" class="img-circle" width="48" height="48"/></div><div><strong> ' +
    data.getUserProfileCard.name + ' </strong>&nbsp;@ ' +
    data.getUserProfileCard.username + ' &nbsp;&nbsp;&nbsp; Just now<br/>' +
    data.tweet + '</div></div>');
		});
});
