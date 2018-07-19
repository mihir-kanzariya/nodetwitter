
function unlike (obj) {
  let unlike = obj.id;
  let name = parseInt(obj.name) - 1;
  $.ajax({
    method: 'POST',
    url: '/unLike',
    data: { _id: unlike }
  })
    .done(function (data) {
      $('#' + unlike).attr({src: '/images/twitterLike.png', onclick: 'like(this)'});
      $('#cnt' + unlike).text(data.likercount);
    });
}
