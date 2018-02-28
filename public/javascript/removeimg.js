
    		$('#dvPreview').on('click', '.remove_img_preview',function () {
				console.log("called");
				$("#dvPreview").empty();
				document.getElementById("img").value=""
				let text = document.getElementById("tweetArea").value
				// console.log(document.getElementById("img").value)
				if (text === "") {
					$("#Tweet").prop("disabled",true);
				}
	});

