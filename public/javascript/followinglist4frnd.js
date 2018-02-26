
$('#followingcount').click(function () {
  $('#tweetAreaHome').hide();
  $('#followingA').show();
  $('#followingA').empty();
  let friendUsername = document.getElementById('friendUsername').value;
  $.ajax({
    method: 'POST',
    url: '/following',
    data: { friendUsername: friendUsername }
  })
    .done(function (data) {
      console.log(data.followingList[1].following)
      for (let i = data.followingList.length - 1; i >= 1; i--) {
        $('#followingA')
          .prepend(`<div class="twPc-div col-md-4 col-sm-6 col-xm-12">
           <a class="twPc-bg twPc-block" style="width=100%;background : url('/images/cover.jpg')"></a><div>
             <div class="twPc-button" >
              <a href="" class="twitter-follow-button" data-show-count="false" data-size="large" data-show-screen-name="false" data-dnt="true">@` + data.followingList[i].following + `</a>
             </div>
             <a title="Mert Salih Kaplan" href="/showFriendProfile/` + data.followingList[i].following + `?id=` + data.followingList[i].following + `" class="twPc-avatarLink">
              <img alt="Mert Salih Kaplan" src="` + data.followingList[i].img + `" class="twPc-avatarImg">
             </a>
             <div class="twPc-divUser">
              <div class="twPc-divName">
               <a href="/showFriendProfile/` + data.followingList[i].following + `?id=` + data.followingList[i].following + `">` + data.followingList[i].name + `</a>
              </div>
              <span>
               <a href="/showFriendProfile/` + data.followingList[i].following + `?id=` + data.followingList[i].following + `">
                <span>@` + data.followingList[i].following + `</span>
               </a>
              </span>
              <input type="hidden" value="` + data.followingList[i].following + `" id="friendUsername` + data.followingList[i]._id + `" name="friendUsername">
              <button class="btn btn-primary pull-right" onclick="` + data.followingList[i].statusbtn + `(this)" name="` + data.followingList[i].statusbtn + `" id="` + data.followingList[i].following + `" style="width : 80px;height:30px;border-radius: 50px;border-color:#29a1f2;color:#29a1f2;background-color: #fff;line-height: 10px">` + data.followingList[i].statusbtn + `</button>
             </div>
            </div>
          </div>`);
      }
    });
});
