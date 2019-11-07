<?php
header("Access-Control-Allow-Origin: *");
echo json_encode([
    'kanji' => ['’おお’きないえにすんでいる。', '二', '三', '四', '五'],
    'num' => [1, 2, 3, 4, 5],
]);
