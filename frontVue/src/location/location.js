var num = 0;
var watch_id;

function test() {
    watch_id = navigator.geolocation.watchPosition(test2, function(e) { alert(e.message); }, {"enableHighAccuracy": true, "timeout": 20000, "maximumAge": 2000});
}

function clear() {
    navigator.geolocation.clearWatch(watch_id);
}

function test2(position) {

    var geo_text = "緯度:" + position.coords.latitude + "\n";
    geo_text += "経度:" + position.coords.longitude + "\n";
    geo_text += "高度:" + position.coords.altitude + "\n";
    geo_text += "位置精度:" + position.coords.accuracy + "\n";
    geo_text += "高度精度:" + position.coords.altitudeAccuracy  + "\n";
    geo_text += "移動方向:" + position.coords.heading + "\n";
    geo_text += "速度:" + position.coords.speed + "\n";

    var date = new Date(position.timestamp);

    geo_text += "取得時刻:" + date.toLocaleString() + "\n";
    geo_text += "取得回数:" + (++num) + "\n";

    document.getElementById('position_view').innerHTML = geo_text;

}