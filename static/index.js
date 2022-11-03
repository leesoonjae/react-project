$(document).ready(function () {
            show_study()
        });

        function show_study() {
            $.ajax({
                type: "GET",
                url: "/study",
                data: {},
                success: function (response) {
                    console.log('성공')
                    let rows = response['good']
                    for (let i = 0; i < rows.length; i++) {
                        let name = rows[i]['name']
                        let comment = rows[i]['comment']
                        let num = rows[i]['num']
                        let done = rows[i]['done']
                        let teamName = rows[i]['teamName']

                        let temp_html = ``
                        if (teamName == document.getElementById('teamName').innerText && done == 0) {
                            temp_html = `<li>
                                    <h2>${name}</h2>
                                    <h2>✅ ${comment}</h2>
                                    <button onclick="done_study(${num})" type="button" class="btn btn-outline-primary">제거</button>
                                </li>`
                        }
                        $('#comment-list').append(temp_html)
                    }
                }
            });
        }

        function save_study() {
            let name = $('#name').val()
            let comment = $('#comment').val()
            let teamName = document.getElementById('teamName').innerText

            $.ajax({
                type: "POST",
                url: "/study",
                data: {name_give: name, comment_give: comment, teamName_give : teamName},
                success: function (response) {
                    alert(response["msg"])
                    window.location.reload()
                }
            });
        }

        function done_study(num) {
            $.ajax({
                type: "POST",
                url: "/study/done",
                data: {num_give: num},
                success: function (response) {
                    alert(response["msg"])
                    window.location.reload()
                }
            });
        }