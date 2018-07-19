// // $('#tweetForm').submit(function () {
// // 	let tweet = document.getElementById('tweetArea').value;
// // 	let img = $('#img').prop('files')[0];
// // 	console.log(img);
// // 	let data = {
// // 		img:img,
// // 		tweet: tweet
// // 	}

// 	$('#Tweet').click( function() {
//     $.ajax({
//         url: '/createTweet',
//         type: 'post',
//         dataType: 'json',
//         data: $('#tweetForm').serialize(),
//         success: function(data) {
//                    // ... do something with the data...
//                  }
//     });
// });

// 	// 	.done(function (data) {
// 	// 		$('#tweetsFromFollowing')
// 	// 			.prepend('<div class="well twtdiv row"><div class="col-md-2"><img src="' +
//  //    data.getUserProfileCard.img + '" class="img-circle" width="48" height="48"/></div><div><strong> ' +
//  //    data.getUserProfileCard.name + ' </strong>&nbsp;@ ' +
//  //    data.getUserProfileCard.username + ' &nbsp;&nbsp;&nbsp; Just now<br/>' +
//  //    data.tweet + '</div></div>');
// 	// 			$('#Tweet').hide();

// 	// 			$('#Tweet').prop("disabled", true);

// 	// 	});
// // });
