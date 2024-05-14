/* ファイルの変更を監視 */
$("#file_input").change(function() {
    var input_files = $(this).prop('files'); // 入力ファイル取得
    var files = []; //コールバック関数用変数

    // ファイル情報からファイル名を抽出
    for (var i=0; i < input_files.length; i++) {
        files.push(input_files[i].name);
    }

    // 入力値初期化
    this.value = '';

    // 命名規則チェック関数へ
    check(files);
})

/* 命名規則チェック関数 */
function check(files) {
    var task_num = $("#task_name").val(); //課題No取得

    // 命名規則判定用変数
    var elem = ``;
    var result = "";
    var result_true = '<span class="ok">命名規則適合</span>';
    var result_false = '<span class="ng">命名規則違反</span>';

    // 結果出力html内初期化
    document.querySelector("#result_box").innerHTML = "<h2>検証結果</h2>";

    // 命名規則判定部
    for (var i=0; i < files.length; i++) {
        var file_ext = files[i].split(".");

        // 課題1
        if (task_num == "01") {
            var sample_name = "氏名.jpg";

            if (file_ext[file_ext.length - 1] == "jpg" && !/[０-９ 0-9]/.test(files[i])) {
                result = result_true;
            } else {
                result = result_false;
            }

            elem = `<div class="result_item"><div>No.${i + 1}</div><div><div>命名規則 : ${sample_name}<br>検証対象 : ${files[i]}<br>検証結果 : ${result}</div></div></div>`;
        }

        // 課題2
        if (task_num == "02") {
            var sample_name = "氏名1.jpg or 氏名2.jpg";

            if (file_ext[file_ext.length - 1] == "jpg" && !files[i].includes(' ') && !files[i].includes('　') && !/[０-９ 0 3-9]/.test(files[i])) {
                result = result_true;
            } else {
                result = result_false;
            }

            elem = `<div class="result_item"><div>No.${i + 1}</div><div><div>命名規則 : ${sample_name}<br>検証対象 : ${files[i]}<br>検証結果 : ${result}</div></div></div>`;
        }

        // 課題3
        if (task_num == "03") {
            var sample_name = "課題No,03_問題01_苗字名前.png";

            var temp = files[i].split("_");

            if (file_ext[file_ext.length - 1] == "png" && temp.length == 3 && temp[0] == "課題No,03" && !files[i].includes(' ') && !files[i].includes('　') && /問題0[1-9]/.test(temp[1])) {
                result = result_true;
            } else {
                result = result_false;
            }

            elem = `<div class="result_item"><div>No.${i + 1}</div><div><div>命名規則 : ${sample_name}<br>検証対象 : ${files[i]}<br>検証結果 : ${result}</div></div></div>`;
        }

        document.querySelector("#result_box").insertAdjacentHTML("beforeend", elem);
    }
    $("#result_box").show();
    document.querySelector("#result_box").insertAdjacentHTML("beforeend", "<p>本ツールの検証結果は，命名規則への適合を保証するものではありません．<br>最終提出時は，提出者が自身の責任により判断を行ってください．</p>");
}