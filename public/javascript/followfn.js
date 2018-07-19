function follow (obj) {
  $.ajax({
    method: 'POST',
    url: '/follow',
    data: {friendUsername: obj.id}
  })
    .done(function (data) {
      $('#' + obj.id).attr({onclick: 'unfollow(this)', name: 'unfollow'});
      obj.innerHTML = 'unfollow';
      $('#followingcountSpan').text(data.followingcount - 1);
    });
}
