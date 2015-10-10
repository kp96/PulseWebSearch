/**
 * Created by Krishna Kalubandi on 10-Oct-15.
 */
//This page scrapes the data from a music website and returns json data

var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var surl = 'http://emp3world.to/search/';
var router = express.Router();

router.get('/',function(req,res){

    var str = req.query['qstring'] + " mp3 download.html";
    str = str.split(' ').join('_');
    str = surl + str;
    console.log(str);
    request.get({
        url : str
    }, function(err, response, html){

        var $ = cheerio.load(html);
        //console.log(html);
        var songNames = [];
        var dUrls = [];
        var status = "ok";
        try {

            $('.song_item #song_title').each(function(i,elem){
                songNames[i] = $(this).text().trim();
            });
            var count = 0;
            $('.song_item .play_link a').each(function(i,ele){
                if($(this).text().trim() == 'Download'){
                    dUrls[count++] = $(this).attr('href');
                }
            });
            var songSizes = [];
            $('.song_item .song_size').each(function (i, ele) {
                songSizes[i] = $(this).text().trim();
            });

        }catch(err){
            status = "nok";
        }
        if(songNames.length == 0) status = "nok";
        var json = {reply: status, data : [] };
        if(status == 'ok') {

            for(i = 0; i < songNames.length; i++)
            {
                json.data.push({
                    "name" : songNames[i],
                    "size" : songSizes[i],
                    "link" : dUrls[i]
                })
            }
        }
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify(json));
        res.end();

    });
});
module.exports = router;