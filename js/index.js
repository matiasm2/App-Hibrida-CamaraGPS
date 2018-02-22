/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var lat = 0;
var lng = 0;

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        $('#pic').hide();
        $('.materialboxed').materialbox();
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        $('#takePic').click(function(){
            if($('#savePic')[0].checked){
                navigator.camera.getPicture(cam.onSuccess, cam.onError, cam.options);
            } else {
                navigator.camera.getPicture(cam.onSuccess, cam.onError);
            }

        });

        $('#takeLoc').click(function(){
            navigator.geolocation.getCurrentPosition(nav.onSuccess, nav.onError);
        });
    }
};

var nav = {
    // onSuccess Callback
    // This method accepts a Position object, which contains the
    // current GPS coordinates
    //
    onSuccess: function(position) {
        /*alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
              */
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        nav.addScriptTag();
        $('#takeLoc').hide();

    },

    // onError Callback receives a PositionError object
    //
    onError: function(error) {
        alert('Codigo de Error: '    + error.code    + '\n' +
              'Mensaje: ' + error.message + '\n');
    },

    initMap: function() {
        var loc = {lat: lat, lng: lng};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: loc
        });
        var marker = new google.maps.Marker({
          position: loc,
          map: map
        });
    },

    addScriptTag: function() {
        script = document.createElement('script');
        script.setAttribute("type","text/javascript");
        script.setAttribute("src","https://maps.googleapis.com/maps/api/js?key=AIzaSyB_Fq_H03limrwMh8xlpofRKQ2fdg5vHAo&callback=nav.initMap");
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script);
    }

};

var cam = {
    onSuccess: function(imageData) {
        $('#pic').show();
        var image = document.getElementById('pic');
        image.src = imageData;
    },

    onError: function(message) {
        alert('Mensaje de error: ' + message);
    },

    options: {
      saveToPhotoAlbum: true
    }

};

app.initialize();
