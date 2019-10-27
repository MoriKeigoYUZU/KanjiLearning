<?php
header("Access-Control-Allow-Origin: *");
echo json_encode([
    'kanji' => ['この漢字を書け? りんご', '二', '三', '四', '五'],
    'num' => [1, 2, 3, 4, 5],
]);
