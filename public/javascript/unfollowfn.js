function unfollow (obj) {
  $.ajax({
    method: 'POST',
    url: '/unfollow',
    data: {friendUsername: obj.id}
  })
    .done(function (data) {
      $('#' + obj.id).attr({onclick: 'follow(this)', name: 'follow'});
      obj.innerHTML = 'follow';
      $('#followingcountSpan').text(data.followingcount - 1);
    });
}
