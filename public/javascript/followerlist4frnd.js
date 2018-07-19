$('#followercount').click(function () {
	$('#tweetAreaHome').hide();
	$('#followingA').show();
	$('#followingA').empty();
	let friendUsername = document.getElementById('friendUsername').value;
	// $( "#following" ).load( "p.ejs" );
	$.ajax({
		method: 'POST',
		url: '/follower',
		data: { friendUsername: friendUsername }
	})
		.done(function (data) {
			for (let i = data.followerList.length - 1; i >= 1; i--) {
				$('#followingA')
					.prepend(' <div class="twPc-div col-md-4 col-sm-4 col-xm-4"><a class="twPc-bg twPc-block" style="width=100%;background : url(\'/images/cover.jpg\')"></a><div><div class="twPc-button" ><a href="" class="twitter-follow-button" data-show-count="false" data-size="large" data-show-screen-name="false" data-dnt="true">' +
            data.followerList[i].username + '</a></div><a title="Mert Salih Kaplan" href="/showFriendProfile?id=' +
            data.followerList[i].username + '" class="twPc-avatarLink"><img alt="Mert Salih Kaplan" src="' +
            data.followerList[i].img + '" class="twPc-avatarImg"></a><div class="twPc-divUser"><div class="twPc-divName"><a href="/showFriendProfile/' + data.followerList[i].username + '?id=' +
            data.followerList[i].username + '">' + data.followerList[i].name + '</a></div><span><a href="/showFriendProfile/' + data.followerList[i].username + '?id=' +
            data.followerList[i].username + '"><span>' + data.followerList[i].username + '</span></a></span><input type="hidden" value="' +
            data.followerList[i].username + '" id="friendUsername' + data.followerList[i]._id + '" name="friendUsername"><button class="btn btn-primary pull-right" onclick="' +
            data.followerList[i].statusbtn + '(this)" name="' + data.followerList[i].statusbtn + '" id="' + data.followerList[i].username + '" style="width : 80px;height:30px;border-radius: 50px;border-color:#29a1f2;color:#29a1f2;background-color: #fff;line-height: 10px">' +
            data.followerList[i].statusbtn + '</button></div></div></div>');
			}
		});
});
