$(document).ready(function () {
            show_comment()
        });

        function show_comment() {
            $.ajax({
                type: "GET",
                url: "/comment",
                data: {},
                success: function (response) {
                    console.log('성공')
                    let rows = response['comments']
                    for (let i = 0; i < rows.length; i++) {
                        let comment = rows[i]['comment']
                        let num = rows[i]['num']
                        let del = rows[i]['del']
                        let writer = rows[i]['writer']
                        let teamName = rows[i]['teamName']

                        let temp_html = ``
                        if (teamName == document.getElementById('soonjae').innerText && del == 0) {
                            temp_html = `<li>
                                    <h2>${writer}</h2>
                                    <h2>✅ ${comment}</h2>
                                    <button onclick="del_comment(${num})" type="button" class="btn btn-outline-primary">제거</button>
                                </li>`
                        }
                        $('#comment-list').append(temp_html)
                    }
                }
            });
        }

        function save_comment() {
            let writer = $('#writer').val()
            let comment = $('#comment').val()
            let teamName = document.getElementById('soonjae').innerText

            $.ajax({
                type: "POST",
                url: "/comment",
                data: {writer_give: writer, comment_give: comment, teamName_give : teamName},
                success: function (response) {
                    alert(response["msg"])
                    window.location.reload()
                }
            });
        }

        function del_comment(num) {
            $.ajax({
                type: "POST",
                url: "/comment/del",
                data: {num_give: num},
                success: function (response) {
                    alert(response["msg"])
                    window.location.reload()
                }
            });
        }