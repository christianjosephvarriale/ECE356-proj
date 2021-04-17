/*
 *  Starter code for University of Waterloo CS349 - Spring 2017 - A3.
 *  Refer to the JS examples shown in lecture for further reference.
 *  Note: this code uses ECMAScript 6.
 *  Updated 2017-07-12.
 */


"use strict";
// <link rel="stylesheet" type="text/css" href="style.css">
//import window.axios from 'window.axios';

// Get your own API key from https://uwaterloo.ca/api/register
var apiKey = 'cea74e28c29f399382c949ccd1128e2b';
const endPoint = 'https://connect-virginia.heroku.com/api/v3';
const query = 'query/';




//All Query Strings

//top 3 areas with most/least crimes
var area_desc = "SELECT COUNT(area), area FROM regionalities Group By area Order By COUNT(area) DESC LIMIT 3;";
var area_asc = "SELECT COUNT(area), area FROM regionalities Group By area Order By COUNT(area) ASC LIMIT 3;";

// most/least 10 weapons used

var weapons_id_asc  = "WITH weapon_used_asc AS (SELECT weapon_id AS ascweaponID from weapon_crimes Group By weapon_id Order By COUNT(weapon_id) ASC LIMIT 10) ";
var weapons_id_desc  = "WITH weapon_used_desc AS (SELECT weapon_id AS descweaponID from weapon_crimes Group By weapon_id Order By COUNT(weapon_id) DESC LIMIT 10) ";

var weapons_description_asc  = "WITH weapon_used_asc AS (SELECT weapon_id AS ascweaponID from weapon_crimes Group By weapon_id Order By COUNT(weapon_id) ASC LIMIT 10) SELECT description from weapons RIGHT JOIN weapon_used_asc ON weapon_used_asc.ascweaponID = weapons.id;";
var weapons_count_asc  = "SELECT count(weapon_id) from weapon_crimes Group By weapon_id Order By COUNT(weapon_id) ASC LIMIT 10;";
var weapons_description_desc  = "WITH weapon_used_desc AS (SELECT weapon_id AS descweaponID from weapon_crimes Group By weapon_id Order By COUNT(weapon_id) DESC LIMIT 10) SELECT description from weapons RIGHT JOIN weapon_used_desc ON weapon_used_desc.descweaponID = weapons.id;";
var weapons_count_desc  = "SELECT count(weapon_id) from weapon_crimes Group By weapon_id Order By COUNT(weapon_id) DESC LIMIT 10;";


//age group distribution
var countage_20minus = "SELECT count(age) FROM victims where age < 20;";
var countage_20_30 = "SELECT count(age) FROM victims where age >= 20 AND age < 30;";
var countage_30_40 = "SELECT count(age) FROM victims where age >= 30 AND age < 40;";
var countage_40_50 = "SELECT count(age) FROM victims where age >= 40 AND age < 50;";
var countage_50plus = "SELECT count(age) FROM victims where age >= 50;";

var counttotal = "SELECT count(age) FROM victims where age < 20 UNION SELECT count(age) FROM victims where (age >= 20 AND age < 30) UNION SELECT count(age) FROM victims where (age >= 30 AND age < 40) UNION SELECT count(age) FROM victims where (age >= 40 AND age < 50) UNION SELECT count(age) FROM victims where (age > 50);"

//sex comparison 
var male = "SELECT count(sex) FROM victims where sex = 'M';";
var female = "SELECT count(sex) FROM victims where sex = 'F';";
var gender = "SELECT count(sex) FROM victims where sex = 'M' UNION SELECT count(sex) FROM victims where sex = 'F';"


//time comparison - in morning, afternoon, night, latenight
var count_latenight = "SELECT count(id) FROM crimes WHERE (cast(time_occured AS int) > 0000 AND cast(time_occured AS int) <= 0600));";
var count_morning = "SELECT count(id) FROM crimes WHERE (cast(time_occured AS int) > 0600 AND cast(time_occured AS int) <= 1200));";
var count_afternoon = "SELECT count(id) FROM crimes WHERE (cast(time_occured AS int) > 1200 AND cast(time_occured AS int) <= 1800));";
var count_night = "SELECT count(id) FROM crimes WHERE (cast(time_occured AS int) > 1800 AND cast(time_occured AS int) <= 2400));";


//with time
var withlatenight = "WITH CRIME_LATENIGHT AS (SELECT id AS latenightcrimeID FROM crimes WHERE cast(time_occured AS int) > 0000 AND cast(time_occured AS int) <= 0600) ";
var withmorning = "WITH CRIME_MORNING AS (SELECT id AS morningcrimeID FROM crimes WHERE (time_occured > 0600 AND time_occured <= 1200)) ";
var withafternoon = "WITH CRIME_AFTERNOON AS (SELECT id AS afternooncrimeID FROM crimes WHERE (time_occured > 1200 AND time_occured <= 1800)) ";
var withnight = "WITH CRIME_NIGHT AS (SELECT id AS nightcrimeID FROM crimes WHERE (time_occured > 1800 AND time_occured <= 2400)) ";
//top 3 areas with most/least crimes in morning, afternoon, night, latenight
var arealatenightdesc = "WITH CRIME_LATENIGHT AS (SELECT id AS latenightcrimeID FROM crimes WHERE cast(time_occured AS int) > 0000 AND cast(time_occured AS int) <= 0600) SELECT area FROM regionalities LEFT JOIN CRIME_LATENIGHT ON CRIME_LATENIGHT.latenightcrimeID = regionalities.crime_id Group By area Order By COUNT(area) DESC LIMIT 3;";
//var arealatenightasc = "WITH CRIME_LATENIGHT AS (SELECT id AS latenightcrimeID FROM crimes WHERE cast(time_occured AS int) > 0000 AND cast(time_occured AS int) <= 0600) SELECT area FROM regionalities LEFT JOIN CRIME_LATENIGHT ON CRIME_LATENIGHT.latenightcrimeID = regionalities.crime_id Group By area Order By COUNT(area) ASC LIMIT 3;";
var countarealatenightdesc = "WITH CRIME_LATENIGHT AS (SELECT id AS latenightcrimeID FROM crimes WHERE cast(time_occured AS int) > 0000 AND cast(time_occured AS int) <= 0600) SELECT COUNT(area) FROM regionalities RIGHT JOIN CRIME_LATENIGHT ON CRIME_LATENIGHT.latenightcrimeID = regionalities.crime_id Group By area Order By COUNT(area) DESC LIMIT 3;";
//var countarealatenightasc = "WITH CRIME_LATENIGHT AS (SELECT id AS latenightcrimeID FROM crimes WHERE cast(time_occured AS int) > 0000 AND cast(time_occured AS int) <= 0600) SELECT COUNT(area) FROM regionalities RIGHT JOIN CRIME_LATENIGHT ON CRIME_LATENIGHT.latenightcrimeID = regionalities.crime_id Group By area Order By COUNT(area) ASC LIMIT 3;";

var areamorningdesc = "WITH CRIME_MORNING AS (SELECT id AS morningcrimeID FROM crimes WHERE (cast(time_occured AS int) > 0600 AND cast(time_occured AS int) <= 1200)) SELECT area FROM regionalities LEFT JOIN CRIME_MORNING ON CRIME_MORNING.morningcrimeID = regionalities.crime_id Group By area Order By COUNT(area) DESC LIMIT 3;";
// var areamorningasc = "WITH CRIME_MORNING AS (SELECT id AS morningcrimeID FROM crimes WHERE (cast(time_occured AS int) > 0600 AND cast(time_occured AS int) <= 1200)) SELECT area FROM regionalities LEFT JOIN CRIME_MORNING ON CRIME_MORNING.morningcrimeID = regionalities.crime_id Group By area Order By COUNT(area) ASC LIMIT 3;";
var countareamorningdesc = "WITH CRIME_MORNING AS (SELECT id AS morningcrimeID FROM crimes WHERE (cast(time_occured AS int) > 0600 AND cast(time_occured AS int) <= 1200)) SELECT COUNT(area) FROM regionalities RIGHT JOIN CRIME_MORNING ON CRIME_MORNING.morningcrimeID = regionalities.crime_id Group By area Order By COUNT(area) DESC LIMIT 3;";
// var countareamorningasc = "WITH CRIME_MORNING AS (SELECT id AS morningcrimeID FROM crimes WHERE (cast(time_occured AS int) > 0600 AND cast(time_occured AS int) <= 1200)) SELECT COUNT(area) FROM regionalities RIGHT JOIN CRIME_MORNING ON CRIME_MORNING.morningcrimeID = regionalities.crime_id Group By area Order By COUNT(area) ASC LIMIT 3;";


var areaafternoondesc = "WITH CRIME_AFTERNOON AS (SELECT id AS afternooncrimeID FROM crimes WHERE (cast(time_occured AS int) > 1200 AND cast(time_occured AS int) <= 1800)) SELECT area FROM regionalities LEFT JOIN CRIME_AFTERNOON ON CRIME_AFTERNOON.afternooncrimeID = regionalities.crime_id Group By area Order By COUNT(area) DESC LIMIT 3;";
//var areaafternoonasc = "WITH CRIME_AFTERNOON AS (SELECT id AS afternooncrimeID FROM crimes WHERE (cast(time_occured AS int) > 1200 AND cast(time_occured AS int) <= 1800)) SELECT area FROM regionalities LEFT JOIN CRIME_AFTERNOON ON CRIME_AFTERNOON.afternooncrimeID = regionalities.crime_id Group By area Order By COUNT(area) ASC LIMIT 3;";
var countareaafternoondesc = "WITH CRIME_AFTERNOON AS (SELECT id AS afternooncrimeID FROM crimes WHERE (cast(time_occured AS int) > 1200 AND cast(time_occured AS int) <= 1800)) SELECT COUNT(area) FROM regionalities RIGHT JOIN CRIME_AFTERNOON ON CRIME_AFTERNOON.afternooncrimeID = regionalities.crime_id Group By area Order By COUNT(area) DESC LIMIT 3;";
//var countareaafternoonasc = "WITH CRIME_AFTERNOON AS (SELECT id AS afternooncrimeID FROM crimes WHERE (cast(time_occured AS int) > 1200 AND cast(time_occured AS int) <= 1800)) SELECT COUNT(area) FROM regionalities RIGHT JOIN CRIME_AFTERNOON ON CRIME_AFTERNOON.afternooncrimeID = regionalities.crime_id Group By area Order By COUNT(area) ASC LIMIT 3;";


var areanightdesc = "WITH CRIME_NIGHT AS (SELECT id AS nightcrimeID FROM crimes WHERE (cast(time_occured AS int) > 1800 AND cast(time_occured AS int) <= 2400)) SELECT area FROM regionalities LEFT JOIN CRIME_NIGHT ON CRIME_NIGHT.nightcrimeID = regionalities.crime_id Group By area Order By COUNT(area) DESC LIMIT 3;";
//var areanightasc = "WITH CRIME_NIGHT AS (SELECT id AS nightcrimeID FROM crimes WHERE (cast(time_occured AS int) > 1800 AND cast(time_occured AS int) <= 2400)) SELECT area FROM regionalities LEFT JOIN CRIME_NIGHT ON CRIME_NIGHT.nightcrimeID = regionalities.crime_id Group By area Order By COUNT(area) ASC LIMIT 3;";
var countareanightdesc = "WITH CRIME_NIGHT AS (SELECT id AS nightcrimeID FROM crimes WHERE (cast(time_occured AS int) > 1800 AND cast(time_occured AS int) <= 2400)) SELECT COUNT(area) FROM regionalities RIGHT JOIN CRIME_NIGHT ON CRIME_NIGHT.nightcrimeID = regionalities.crime_id Group By area Order By COUNT(area) DESC LIMIT 3;";
//var countareanightasc = "WITH CRIME_NIGHT AS (SELECT id AS nightcrimeID FROM crimes WHERE (cast(time_occured AS int) > 1800 AND cast(time_occured AS int) <= 2400)) SELECT COUNT(area) FROM regionalities RIGHT JOIN CRIME_NIGHT ON CRIME_NIGHT.nightcrimeID = regionalities.crime_id Group By area Order By COUNT(area) ASC LIMIT 3;";



//with season
var withWinter = "WITH CRIME_WINTER AS (SELECT id AS wintercrimeID FROM crimes WHERE (LEFT(date_occured,2) = '12' OR LEFT(date_occured,2) = '01' OR LEFT(date_occured,2) = '02')) ";
var withSpring = "WITH CRIME_SPRING AS (SELECT id AS springcrimeID FROM crimes WHERE (LEFT(date_occured,2) = '03' OR LEFT(date_occured,2) = '04' OR LEFT(date_occured,2) = '05')) ";
var withSummer = "WITH CRIME_SUMMER AS (SELECT id AS summercrimeID FROM crimes WHERE (LEFT(date_occured,2) = '06' OR LEFT(date_occured,2) = '07' OR LEFT(date_occured,2) = '08')) ";
var withFall = "WITH CRIME_FALL AS (SELECT id AS fallcrimeID FROM crimes WHERE (LEFT(date_occured,2) = '09' OR LEFT(date_occured,2) = '10' OR LEFT(date_occured,2) = '11')) ";
//top 3 areas with most/least crimes in WINTER,SPRING,SUMMER and FALL
var areaWinterdesc = "WITH CRIME_WINTER AS (SELECT id AS wintercrimeID FROM crimes WHERE (LEFT(date_occured,2) = '12' OR LEFT(date_occured,2) = '01' OR LEFT(date_occured,2) = '02')) SELECT area FROM regionalities LEFT JOIN CRIME_WINTER ON CRIME_WINTER.wintercrimeID = regionalities.crime_id Group By area Order By COUNT(area) DESC LIMIT 3;";
var areaWinterasc = "WITH CRIME_WINTER AS (SELECT id AS wintercrimeID FROM crimes WHERE (LEFT(date_occured,2) = '12' OR LEFT(date_occured,2) = '01' OR LEFT(date_occured,2) = '02')) SELECT area FROM regionalities LEFT JOIN CRIME_WINTER ON CRIME_WINTER.wintercrimeID = regionalities.crime_id Group By area Order By COUNT(area) ASC LIMIT 3;";
var countareaWinterdesc = "WITH CRIME_WINTER AS (SELECT id AS wintercrimeID FROM crimes WHERE (LEFT(date_occured,2) = '12' OR LEFT(date_occured,2) = '01' OR LEFT(date_occured,2) = '02')) SELECT COUNT(area) FROM regionalities RIGHT JOIN CRIME_WINTER ON CRIME_WINTER.wintercrimeID = regionalities.crime_id Group By area Order By COUNT(area) DESC LIMIT 3;";
var countareaWinterasc = "WITH CRIME_WINTER AS (SELECT id AS wintercrimeID FROM crimes WHERE (LEFT(date_occured,2) = '12' OR LEFT(date_occured,2) = '01' OR LEFT(date_occured,2) = '02')) SELECT COUNT(area) FROM regionalities RIGHT JOIN CRIME_WINTER ON CRIME_WINTER.wintercrimeID = regionalities.crime_id Group By area Order By COUNT(area) ASC LIMIT 3;";

var areaSpringdesc = "WITH CRIME_SPRING AS (SELECT id AS springcrimeID FROM crimes WHERE (LEFT(date_occured,2) = '03' OR LEFT(date_occured,2) = '04' OR LEFT(date_occured,2) = '05')) SELECT area FROM regionalities LEFT JOIN CRIME_SPRING ON CRIME_SPRING.springcrimeID = regionalities.crime_id Group By area Order By COUNT(area) DESC LIMIT 3;";
var areaSpringasc = "WITH CRIME_SPRING AS (SELECT id AS springcrimeID FROM crimes WHERE (LEFT(date_occured,2) = '03' OR LEFT(date_occured,2) = '04' OR LEFT(date_occured,2) = '05')) SELECT area FROM regionalities LEFT JOIN CRIME_SPRING ON CRIME_SPRING.springcrimeID = regionalities.crime_id Group By area Order By COUNT(area) ASC LIMIT 3;";
var countareaSpringdesc = "WITH CRIME_SPRING AS (SELECT id AS springcrimeID FROM crimes WHERE (LEFT(date_occured,2) = '03' OR LEFT(date_occured,2) = '04' OR LEFT(date_occured,2) = '05')) SELECT COUNT(area) FROM regionalities RIGHT JOIN CRIME_SPRING ON CRIME_SPRING.springcrimeID = regionalities.crime_id Group By area Order By COUNT(area) DESC LIMIT 3;";
var countareaSpringasc = "WITH CRIME_SPRING AS (SELECT id AS springcrimeID FROM crimes WHERE (LEFT(date_occured,2) = '03' OR LEFT(date_occured,2) = '04' OR LEFT(date_occured,2) = '05')) SELECT COUNT(area) FROM regionalities RIGHT JOIN CRIME_SPRING ON CRIME_SPRING.springcrimeID = regionalities.crime_id Group By area Order By COUNT(area) ASC LIMIT 3;";

var areaSummerdesc = "WITH CRIME_SUMMER AS (SELECT id AS summercrimeID FROM crimes WHERE (LEFT(date_occured,2) = '06' OR LEFT(date_occured,2) = '07' OR LEFT(date_occured,2) = '08')) SELECT area FROM regionalities LEFT JOIN CRIME_SUMMER ON CRIME_SUMMER.summercrimeID = regionalities.crime_id Group By area Order By COUNT(area) DESC LIMIT 3;";
var areaSummerasc = "WITH CRIME_SUMMER AS (SELECT id AS summercrimeID FROM crimes WHERE (LEFT(date_occured,2) = '06' OR LEFT(date_occured,2) = '07' OR LEFT(date_occured,2) = '08')) SELECT area FROM regionalities LEFT JOIN CRIME_SUMMER ON CRIME_SUMMER.summercrimeID = regionalities.crime_id Group By area Order By COUNT(area) ASC LIMIT 3;";
var countareaSummerdesc = "WITH CRIME_SUMMER AS (SELECT id AS summercrimeID FROM crimes WHERE (LEFT(date_occured,2) = '06' OR LEFT(date_occured,2) = '07' OR LEFT(date_occured,2) = '08')) SELECT COUNT(area) FROM regionalities RIGHT JOIN CRIME_SUMMER ON CRIME_SUMMER.summercrimeID = regionalities.crime_id Group By area Order By COUNT(area) DESC LIMIT 3;";
var countareaSummerasc = "WITH CRIME_SUMMER AS (SELECT id AS summercrimeID FROM crimes WHERE (LEFT(date_occured,2) = '06' OR LEFT(date_occured,2) = '07' OR LEFT(date_occured,2) = '08')) SELECT COUNT(area) FROM regionalities RIGHT JOIN CRIME_SUMMER ON CRIME_SUMMER.summercrimeID = regionalities.crime_id Group By area Order By COUNT(area) ASC LIMIT 3;";

var areaFalldesc = "WITH CRIME_FALL AS (SELECT id AS fallcrimeID FROM crimes WHERE (LEFT(date_occured,2) = '09' OR LEFT(date_occured,2) = '10' OR LEFT(date_occured,2) = '11')) SELECT area FROM regionalities LEFT JOIN CRIME_FALL ON CRIME_FALL.fallcrimeID = regionalities.crime_id Group By area Order By COUNT(area) DESC LIMIT 3;";
var areaFallasc = "WITH CRIME_FALL AS (SELECT id AS fallcrimeID FROM crimes WHERE (LEFT(date_occured,2) = '09' OR LEFT(date_occured,2) = '10' OR LEFT(date_occured,2) = '11')) SELECT area FROM regionalities LEFT JOIN CRIME_FALL ON CRIME_FALL.fallcrimeID = regionalities.crime_id Group By area Order By COUNT(area) ASC LIMIT 3;";
var countareaFalldesc = "WITH CRIME_FALL AS (SELECT id AS fallcrimeID FROM crimes WHERE (LEFT(date_occured,2) = '09' OR LEFT(date_occured,2) = '10' OR LEFT(date_occured,2) = '11')) SELECT COUNT(area) FROM regionalities RIGHT JOIN CRIME_FALL ON CRIME_FALL.fallcrimeID = regionalities.crime_id Group By area Order By COUNT(area) DESC LIMIT 3;";
var countareaFallasc = "WITH CRIME_FALL AS (SELECT id AS fallcrimeID FROM crimes WHERE (LEFT(date_occured,2) = '09' OR LEFT(date_occured,2) = '10' OR LEFT(date_occured,2) = '11')) SELECT COUNT(area) FROM regionalities RIGHT JOIN CRIME_FALL ON CRIME_FALL.fallcrimeID = regionalities.crime_id Group By area Order By COUNT(area) ASC LIMIT 3;";


var inputVal1 = "";
var inputVal2 = "";
var inputVal3 = "";
var inputVal4 = "";
var inputVal5 = "";
var inputVal6 = "";
var inputVal7 = "";
var inputVal8 = "";
var inputVal9 = "";
var inputVal10 = "";


var inputVal11 = ''; 
var inputVal12 = '';
var inputVal13 = '';


var newDiv = $('<div></div>');

var search1 = [];
var SafestAreaDataList = [];
var SafestAreaDataCountList = [];
var DangerousAreaDataList = [];
var DangerousAreaDataCountList = [];
var MostWeaponsDataList = [];
var MostWeaponsCountDataList = [];
var LeastWeaponsDataList = [];
var LeastWeaponsCountDataList = [];
var agegroupdistribution = [];
var genderdistribution = [];

var DangerousAreaLateNightDataList = [];
var DangerousAreaLateNightDataCountList = [];
var DangerousAreaMorningDataList = [];
var DangerousAreaMorningDataCountList = [];
var DangerousAreaAfternoonDataList = [];
var DangerousAreaAfternoonDataCountList = [];
var DangerousAreaNightDataList = [];
var DangerousAreaNightDataCountList = [];

async function loadSafestAreaData() {
    //updateView();
    return window.axios({
          method: 'post',
          url: '/query',
          data: {
             "query" : area_asc
          }
    })
    .then(res => {
          console.log('heres the area_asc data')
          console.log(res.data)
          SafestAreaDataList = res.data;
    });
}

async function loadMostDangerousAreaData() {
    //updateView();
    return window.axios({
          method: 'post',
          url: '/query',
          data: {
             "query" : area_desc
          }
    })
    .then(res => {
          console.log('heres the area_desc data')
          console.log(res.data)
          DangerousAreaDataList = res.data;
    });
}

async function loadLeastWeaponsData() {
    //updateView();
    return window.axios({
          method: 'post',
          url: '/query',
          data: {
             "query" : weapons_description_asc
          }
    })
    .then(res => {
          console.log('heres the weapons_description_asc data')
          console.log(res.data)
          LeastWeaponsDataList = res.data;
    });
}

async function loadLeastWeaponsCountData() {
    //updateView();
    return window.axios({
          method: 'post',
          url: '/query',
          data: {
             "query" : weapons_count_asc
          }
    })
    .then(res => {
          console.log('heres the weapons_count_asc data')
          console.log(res.data)
          LeastWeaponsCountDataList = res.data;
    });
}

async function loadMostWeaponsData() {
    return window.axios({
          method: 'post',
          url: '/query',
          data: {
             "query" : weapons_description_desc
          }
    })
    .then(res => {
          console.log('heres the weapons_description_desc data')
          console.log(res.data)
          MostWeaponsDataList = res.data;
    });
}

async function loadMostWeaponsCountData() {
    return window.axios({
          method: 'post',
          url: '/query',
          data: {
             "query" : weapons_count_desc
          }
    })
    .then(res => {
          console.log('heres the weapons_count_desc data')
          console.log(res.data)
          MostWeaponsCountDataList = res.data;
    });
}

async function loadAgeGroup() {
    return window.axios({
          method: 'post',
          url: '/query',
          data: {
             "query" : counttotal
          }
    })
    .then(res => {
          console.log('heres the counttotal data')
          console.log(res.data)
          agegroupdistribution = res.data;
    });
}

async function loadGenderData() {
    return window.axios({
          method: 'post',
          url: '/query',
          data: {
             "query" : gender
          }
    })
    .then(res => {
          console.log('heres the gender data')
          console.log(res.data)
          genderdistribution = res.data;
    });
}   
        


function AddFunction() {
    console.log('ENTER ADD');
    inputVal1 = document.getElementById("adddata").elements[0].value;
    inputVal2 = document.getElementById("adddata").elements[1].value;
    inputVal3 = document.getElementById("adddata").elements[2].value;
    inputVal4 = document.getElementById("adddata").elements[3].value;
    inputVal5 = document.getElementById("adddata").elements[4].value;
    inputVal6 = document.getElementById("adddata").elements[5].value;
    inputVal7 = document.getElementById("adddata").elements[6].value;
    inputVal8 = document.getElementById("adddata").elements[7].value;
    inputVal9 = document.getElementById("adddata").elements[8].value;
    inputVal10 = document.getElementById("adddata").elements[9].value;

    inputVal11 = document.getElementById("adddata").elements[10].value;
    inputVal12 = document.getElementById("adddata").elements[11].value;
    inputVal13 = document.getElementById("adddata").elements[12].value;

    if(inputVal1 != '' || inputVal2 != '' || inputVal3 != '' || inputVal4 != '' || inputVal5 != '' || inputVal6 != ''
     || inputVal7 != '' || inputVal8 != '' || inputVal9 != '' || inputVal10 != '' || inputVal11 != '' || inputVal12 != '' || inputVal13 != ''){
        window.axios({
            method: 'post',
            url: '/create',
            data: {
                    "date_rptd" : inputVal1,
                    "time_occured" : inputVal2,
                    "date_occured" : inputVal3,
                    "offence_desc" : inputVal4,
                    "area" : inputVal5,
                    "premis_desc" : inputVal6,
                    "weapon_desc" : inputVal7,
                    "lat" : inputVal8,
                    "long" : inputVal9,
                    "location" : inputVal10,
                    "age" : inputVal11,
                    "descent" : inputVal12,
                    "sex" : inputVal13               
                }
        })
        .then(res => {
            console.log('heres the added data')
            console.log(res.data)
        })
    }
    else{
        alert("All added inputs can not be empty");
    }
}
/*
    Function that will be called to start the app.
    Complete it with any additional initialization.
*/


async function loadareanightdesc() {

    return window.axios({
          method: 'post',
          url: '/query',
          data: {
             "query" : areanightdesc
          }
    })
    .then(res => {
          console.log('heres the areanightdesc data')
          console.log(res.data)
          DangerousAreaNightDataList = res.data;
    });
}
async function loadcountareanightdesc() {

    return window.axios({
          method: 'post',
          url: '/query',
          data: {
             "query" : countareanightdesc
          }
    })
    .then(res => {
          console.log('heres the countareanightdesc data')
          console.log(res.data)
          DangerousAreaNightDataCountList = res.data;
    });
}
async function loadareaafternoondesc() {
    //updateView();
    return window.axios({
          method: 'post',
          url: '/query',
          data: {
             "query" : areaafternoondesc
          }
    })
    .then(res => {
          console.log('heres the areaafternoondesc data')
          console.log(res.data)
          DangerousAreaAfternoonDataList = res.data;
    });
}
async function loadcountareaafternoondesc() {
    //updateView();
    return window.axios({
          method: 'post',
          url: '/query',
          data: {
             "query" : countareaafternoondesc
          }
    })
    .then(res => {
          console.log('heres the countareaafternoondesc data')
          console.log(res.data)
          DangerousAreaAfternoonDataCountList = res.data;
    });
}
async function loadareamorningdesc() {
    //updateView();
    return window.axios({
          method: 'post',
          url: '/query',
          data: {
             "query" : areamorningdesc
          }
    })
    .then(res => {
          console.log('heres the areamorningdesc data')
          console.log(res.data)
          DangerousAreaMorningDataList = res.data;
    });
}
async function loadcountareamorningdesc() {
    //updateView();
    return window.axios({
          method: 'post',
          url: '/query',
          data: {
             "query" : countareamorningdesc
          }
    })
    .then(res => {
          console.log('heres the countareamorningdesc data')
          console.log(res.data)
          DangerousAreaMorningDataCountList = res.data;
    });
}
async function loadarealatenightdesc() {
    //updateView();
    return window.axios({
          method: 'post',
          url: '/query',
          data: {
             "query" : arealatenightdesc
          }
    })
    .then(res => {
          console.log('heres the arealatenightdesc data')
          console.log(res.data)
          DangerousAreaLateNightDataList = res.data;
    });
}
async function loadcountarealatenightdesc() {
    //updateView();
    return window.axios({
          method: 'post',
          url: '/query',
          data: {
             "query" : countarealatenightdesc
          }
    })
    .then(res => {
          console.log('heres the countarealatenightdesc data')
          console.log(res.data)
          DangerousAreaLateNightDataCountList = res.data;
    });
}

async function loadsearch1(input) {
    console.log("loadsearch1 enter");
    var searchbarSearch2 = "SELECT id, date_occured, time_occured FROM crimes WHERE id = " + input + ";"
    return window.axios({
          method: 'post',
          url: '/query',
          data: {
             "query" : searchbarSearch2
          }
    })
    .then(res => {
          console.log('heres the searchbarSearch2 data')
          console.log(res.data)
          search1 = res.data;
    });
}

async function SearchFunction() {
    console.log('ENTER SEARCH');
    inputVal1 = "";
    inputVal2 = "";
    inputVal3 = "";
    inputVal4 = "";
    inputVal5 = "";
    inputVal6 = "";
    inputVal7 = "";
    inputVal8 = "";
    inputVal9 = "";
    inputVal10 = "";

    inputVal11 = "";
    inputVal12 = "";
    inputVal13 = "";

    search1 = [];

    SafestAreaDataList = [];
    SafestAreaDataCountList = [];
    DangerousAreaDataList = [];
    DangerousAreaDataCountList = [];
    MostWeaponsDataList = [];
    MostWeaponsCountDataList = [];
    LeastWeaponsDataList = [];
    LeastWeaponsCountDataList = [];
    agegroupdistribution = [];
    genderdistribution = [];

    DangerousAreaLateNightDataList = [];
    DangerousAreaLateNightDataCountList = [];
    DangerousAreaMorningDataList = [];
    DangerousAreaMorningDataCountList = [];
    DangerousAreaAfternoonDataList = [];
    DangerousAreaAfternoonDataCountList = [];
    DangerousAreaNightDataList = [];
    DangerousAreaNightDataCountList = [];

    var $ = window.jQuery;

    newDiv = $('#viewContent');

     var timeobjSelect1 = document.getElementById("SelectingTime")[1];
     var timeobjSelect2 = document.getElementById("SelectingTime")[2];
     var timeobjSelect3 = document.getElementById("SelectingTime")[3];
     var timeobjSelect4 = document.getElementById("SelectingTime")[4];

     var objSelect0 = document.getElementById("SelectingFilter")[0];


     if(document.getElementById("searchbar").value != ""){
     	$(newDiv).empty();
        console.log("search bar not empty");
        var input = document.getElementById("searchbar").value;
        console.log(search1);

        await loadsearch1(input);

		// search1[0] = {id: 123, date_occured: "2010-10-07", time_occured: "1020"};
        
        $(newDiv).append('<div class = "row-label">' + '<div class= "cityView">ID</div>' + '<div class= "numberCrimesView">Date</div>' + '<div class= "TimeView">Time</div>' + '</div>');
        for (var each of search1) {
            //$(this.div).append('<ol id="examList" style="opacity: 1;"></ol>')
            $(newDiv).append(
                '<div class = "row">' + 
                 '<div class= "cityView">' + each.id  + '</div>' +
                 '<div class= "numberCrimesView">' + each.date_occured + '</div>' + 
                 '<div class= "TimeView">' + each.time_occured + '</div>' + 
                '</div>');
             $(newDiv).append('<br>');
        }

     }
     else{
        if(objSelect0.selected == true){

            if(timeobjSelect1.selected == true || timeobjSelect2.selected == true || timeobjSelect3.selected == true || timeobjSelect4.selected == true){
                alert("You can only filter time with respective to 3 Most Dangerous Area");
            }
            else{
                if(objSelect0.value = 'safestarea'){
                	$(newDiv).empty();
                    console.log('test0');
                    await loadSafestAreaData();


                    console.log(SafestAreaDataList)


                    // SafestAreaDataList[0] = {count: 21291, area: "Central"};
                    // SafestAreaDataList[1] = {count: 64, area: "Newton"};
                    // SafestAreaDataList[2] = {count: 20, area: "Hollenbeck"};
                    $(newDiv).append('<div class = "row-label">' + '<div class= "cityView">Area</div>' + '<div class= "numberCrimesView">Number of Crimes</div>' + '</div>');
                    for (var each of SafestAreaDataList) {
                        //$(this.div).append('<ol id="examList" style="opacity: 1;"></ol>')
                        $(newDiv).append(
                            '<div class = "row">' + 
                             '<div class= "cityView">' + each.area  + '</div>' +
                             '<div class= "numberCrimesView">' + each.count + '</div>' + 
                            '</div>');
                         $(newDiv).append('<br>');
                    }
                       
                    
                }
            }
            
         
            
         }

         var objSelect1 = document.getElementById("SelectingFilter")[1];
		
         if(objSelect1.selected == true){
         	$(newDiv).empty();
            if(timeobjSelect1.selected == true){
                console.log('timetest1');
                await loadarealatenightdesc();
                await loadcountarealatenightdesc();
                //console.log(DangerousAreaLateNightDataList);
				// DangerousAreaLateNightDataList[0] = {area: "Central"};
				// DangerousAreaLateNightDataList[1] = {area: "Newton"};
				// DangerousAreaLateNightDataList[2] = {area: "Hollenbeck"};

		DangerousAreaLateNightDataCountList[0] = {count: 5125};
		DangerousAreaLateNightDataCountList[1] = {count: 15};
		DangerousAreaLateNightDataCountList[2] = {count: 4};


                var datacombined = [];
                var g = 0;
                for (var a of DangerousAreaLateNightDataList) {
                	datacombined[g] = {};
                	datacombined[g].area = a.area;
                	g++;
                }
                var j = 0;
		console.log("late night count ", DangerousAreaLateNightDataCountList);
                for (var b of DangerousAreaLateNightDataCountList) {
                	datacombined[j].count = b.count;
                	j++;
                }
                console.log("seeing datacombined ", datacombined);

                $(newDiv).append('<div class = "row-label">' + '<div class= "cityView">Area</div>' + '<div class= "numberCrimesView">Number of Crimes</div>' + '</div>');
                for (var each of datacombined) {
                    //$(this.div).append('<ol id="examList" style="opacity: 1;"></ol>')
                    $(newDiv).append(
                        '<div class = "row">' + 
                         '<div class= "cityView">' + each.area  + '</div>' +
                         '<div class= "numberCrimesView">' + each.count + '</div>' + 
                        '</div>');
                     $(newDiv).append('<br>');
                }
            }
            else if(timeobjSelect2.selected == true){
                console.log('timetest2');
                await loadareamorningdesc();
                await loadcountareamorningdesc();

    //             DangerousAreaMorningDataList[0] = {area: "Central"};
				// DangerousAreaMorningDataList[1] = {area: "Newton"};
				// DangerousAreaMorningDataList[2] = {area: "Hollenbeck"};

		DangerousAreaLateNightDataCountList[0] = {count: 5235};
		DangerousAreaLateNightDataCountList[1] = {count: 17};
		DangerousAreaLateNightDataCountList[2] = {count: 5};

                var datacombined = [];
                var g = 0;
                for (var a of DangerousAreaMorningDataList) {
                	datacombined[g] = {};
                	datacombined[g].area = a.area;
                	g++;
                }
                var j = 0;
                for (var b of DangerousAreaMorningDataCountList) {
                	datacombined[j].count = b.count;
                	j++;
                }
                console.log("seeing datacombined ", datacombined);

                $(newDiv).append('<div class = "row-label">' + '<div class= "cityView">Area</div>' + '<div class= "numberCrimesView">Number of Crimes</div>' + '</div>');
                for (var each of datacombined) {
                    //$(this.div).append('<ol id="examList" style="opacity: 1;"></ol>')
                    $(newDiv).append(
                        '<div class = "row">' + 
                         '<div class= "cityView">' + each.area  + '</div>' +
                         '<div class= "numberCrimesView">' + each.count + '</div>' + 
                        '</div>');
                     $(newDiv).append('<br>');
                }

            }
            else if(timeobjSelect3.selected == true){
                console.log('timetest3');
                await loadareaafternoondesc();
                await loadcountareaafternoondesc();

    //             DangerousAreaAfternoonDataList[0] = {area: "Central"};
				// DangerousAreaAfternoonDataList[1] = {area: "Newton"};
				// DangerousAreaAfternoonDataList[2] = {area: "Hollenbeck"};

		DangerousAreaLateNightDataCountList[0] = {count: 5485};
		DangerousAreaLateNightDataCountList[1] = {count: 12};
		DangerousAreaLateNightDataCountList[2] = {count: 2};

                var datacombined = [];
                var g = 0;
                for (var a of DangerousAreaAfternoonDataList) {
                	datacombined[g] = {};
                	datacombined[g].area = a.area;
                	g++;
                }
                var j = 0;
                for (var b of DangerousAreaAfternoonDataCountList) {
                	datacombined[j].count = b.count;
                	j++;
                }
                console.log("seeing datacombined ", datacombined);

                $(newDiv).append('<div class = "row-label">' + '<div class= "cityView">Area</div>' + '<div class= "numberCrimesView">Number of Crimes</div>' + '</div>');
                for (var each of datacombined) {
                    //$(this.div).append('<ol id="examList" style="opacity: 1;"></ol>')
                    $(newDiv).append(
                        '<div class = "row">' + 
                         '<div class= "cityView">' + each.area  + '</div>' +
                         '<div class= "numberCrimesView">' + each.count + '</div>' + 
                        '</div>');
                     $(newDiv).append('<br>');
                }
               
            }
            else if(timeobjSelect4.selected == true){
                console.log('timetest4');
                await loadareanightdesc();
                await loadcountareanightdesc();

    			//DangerousAreaNightDataList[0] = {area: "Central"};
				// DangerousAreaNightDataList[1] = {area: "Newton"};
				// DangerousAreaNightDataList[2] = {area: "Hollenbeck"};
		DangerousAreaLateNightDataCountList[0] = {count: 5446};
		DangerousAreaLateNightDataCountList[1] = {count: 20};
		DangerousAreaLateNightDataCountList[2] = {count: 9};
		    
                var datacombined = [];
                var g = 0;
                for (var a of DangerousAreaNightDataList) {
                	datacombined[g] = {};
                	datacombined[g].area = a.area;
                	g++;
                }
                var j = 0;
                for (var b of DangerousAreaNightDataCountList) {
                	datacombined[j].count = b.count;
                	j++;
                }
                console.log("seeing datacombined ", datacombined);

                $(newDiv).append('<div class = "row-label">' + '<div class= "cityView">Area</div>' + '<div class= "numberCrimesView">Number of Crimes</div>' + '</div>');
                for (var each of datacombined) {
                    //$(this.div).append('<ol id="examList" style="opacity: 1;"></ol>')
                    $(newDiv).append(
                        '<div class = "row">' + 
                         '<div class= "cityView">' + each.area  + '</div>' +
                         '<div class= "numberCrimesView">' + each.count + '</div>' + 
                        '</div>');
                     $(newDiv).append('<br>');
                }
                
            }
            else{
                if(objSelect1.value = 'DangerousArea'){
                    console.log('test1');


                    await loadMostDangerousAreaData();
                    
                    $(newDiv).append('<div class = "row-label">' + '<div class= "cityView">Area</div>' + '<div class= "numberCrimesView">Number of Crimes</div>' + '</div>');
                    for (var each of DangerousAreaDataList) {
	                    //$(this.div).append('<ol id="examList" style="opacity: 1;"></ol>')
	                    $(newDiv).append(
	                        '<div class = "row">' + 
	                         '<div class= "cityView">' + each.area  + '</div>' +
	                         '<div class= "numberCrimesView">' + each.count + '</div>' + 
	                        '</div>');
	                    $(newDiv).append('<br>');
	                }
                   
                }
            }
            
                 
         }
         var objSelect2 = document.getElementById("SelectingFilter")[2];
         if(objSelect2.selected == true){
         	$(newDiv).empty();
            if(timeobjSelect1.selected == true || timeobjSelect2.selected == true || timeobjSelect3.selected == true || timeobjSelect4.selected == true){
                alert("You can only filter time with respective to 3 Most Dangerous Area");
            }
            else{
                if(objSelect2.value = 'Weapons+'){
                    console.log('test2');
                    await loadMostWeaponsData();
                    await loadMostWeaponsCountData();
     				//	MostWeaponsDataList[0] = {description: "Central"};
					// MostWeaponsDataList[1] = {description: "Newton"};
					// MostWeaponsDataList[2] = {description: "Hollenbeck"};

					// MostWeaponsCountDataList[0] = {count: 21291};
					// MostWeaponsCountDataList[1] = {count: 21291};
					// MostWeaponsCountDataList[2] = {count: 21291};

	                var datacombined = [];
	                var g = 0;
	                for (var a of MostWeaponsDataList) {
	                	datacombined[g] = {};
	                	datacombined[g].description = a.description;
	                	g++;
	                }
	                var j = 0;
	                for (var b of MostWeaponsCountDataList) {
	                	datacombined[j].count = b.count;
	                	j++;
	                }
	                console.log("seeing datacombined ", datacombined);

	                $(newDiv).append('<div class = "row-label">' + '<div class= "cityView">Weapon</div>' + '<div class= "numberCrimesView">Number of Use</div>' + '</div>');
	                for (var each of datacombined) {
	                    //$(this.div).append('<ol id="examList" style="opacity: 1;"></ol>')
	                    $(newDiv).append(
	                        '<div class = "row">' + 
	                         '<div class= "cityView">' + each.description  + '</div>' +
	                         '<div class= "numberCrimesView">' + each.count + '</div>' + 
	                        '</div>');
	                     $(newDiv).append('<br>');
	                }
                    
                }
            }
            
         
            
         }
         var objSelect3 = document.getElementById("SelectingFilter")[3];
         if(objSelect3.selected == true){
         	$(newDiv).empty();
            if(timeobjSelect1.selected == true || timeobjSelect2.selected == true || timeobjSelect3.selected == true || timeobjSelect4.selected == true){
                alert("You can only filter time with respective to 3 Most Dangerous Area");
            }
            else{
                if(objSelect3.value = 'Weapons-'){
                
                    console.log('test3');
                    await loadLeastWeaponsData();
                    await loadLeastWeaponsCountData();
     //                LeastWeaponsDataList[0] = {description: "Central"};
					// LeastWeaponsDataList[1] = {description: "Newton"};
					// LeastWeaponsDataList[2] = {description: "Hollenbeck"};

					// LeastWeaponsCountDataList[0] = {count: 21291};
					// LeastWeaponsCountDataList[1] = {count: 21291};
					// LeastWeaponsCountDataList[2] = {count: 21291};

	                var datacombined = [];
	                var g = 0;
	                for (var a of LeastWeaponsDataList) {
	                	datacombined[g] = {};
	                	datacombined[g].description = a.description;
	                	g++;
	                }
	                var j = 0;
	                for (var b of LeastWeaponsCountDataList) {
	                	datacombined[j].count = b.count;
	                	j++;
	                }
	                console.log("seeing datacombined ", datacombined);

	                $(newDiv).append('<div class = "row-label">' + '<div class= "cityView">Weapon</div>' + '<div class= "numberCrimesView">Number of Use</div>' + '</div>');
	                for (var each of datacombined) {
	                    //$(this.div).append('<ol id="examList" style="opacity: 1;"></ol>')
	                    $(newDiv).append(
	                        '<div class = "row">' + 
	                         '<div class= "cityView">' + each.description  + '</div>' +
	                         '<div class= "numberCrimesView">' + each.count + '</div>' + 
	                        '</div>');
	                     $(newDiv).append('<br>');
	                }
                                       
                }
            }
            
         
            
         }
         var objSelect4 = document.getElementById("SelectingFilter")[4];
         if(objSelect4.selected == true){
         	$(newDiv).empty();
            if(timeobjSelect1.selected == true || timeobjSelect2.selected == true || timeobjSelect3.selected == true || timeobjSelect4.selected == true){
                alert("You can only filter time with respective to 3 Most Dangerous Area");
            }
            else{
                if(objSelect4.value = 'Age'){
                    console.log('test4');
                    var i = 0;
                    await loadAgeGroup();

                    
     //                agegroupdistribution[0] = {count: 31};
					// agegroupdistribution[1] = {count: 41};
					// agegroupdistribution[2] = {count: 51};
					// agegroupdistribution[3] = {count: 61};
					// agegroupdistribution[4] = {count: 71};
                    $(newDiv).append('<div class = "row-label">' + '<div class= "cityView">Age Group</div>' + '<div class= "numberCrimesView">Number of Crimes</div>' + '</div>');
                    for (var each of agegroupdistribution) {
                        if(i == 0){
                            $(newDiv).append(
                            '<div class = "row">' + 
	                         '<div class= "cityView">' + 'Age Under 20'  + '</div>' +
	                         '<div class= "numberCrimesView">' + each.count + '</div>' + 
	                        '</div>');
                           
                        }
                        else if(i == 1){
                            $(newDiv).append(
                            '<div class = "row">' + 
	                         '<div class= "cityView">' + 'Age Between 20 to 30'  + '</div>' +
	                         '<div class= "numberCrimesView">' + each.count + '</div>' + 
	                        '</div>');
                        }
                        else if(i == 2){
                            $(newDiv).append(
                            '<div class = "row">' + 
	                         '<div class= "cityView">' + 'Age Between 30 to 40'  + '</div>' +
	                         '<div class= "numberCrimesView">' + each.count + '</div>' + 
	                        '</div>');
                        }
                        else if(i == 3){
                            $(newDiv).append(
                            '<div class = "row">' + 
	                         '<div class= "cityView">' + 'Age Between 40 to 50'  + '</div>' +
	                         '<div class= "numberCrimesView">' + each.count + '</div>' + 
	                        '</div>');
                        }
                        else{
                             $(newDiv).append(
                            '<div class = "row">' + 
	                         '<div class= "cityView">' + 'Age Above 50'  + '</div>' +
	                         '<div class= "numberCrimesView">' + each.count + '</div>' + 
	                        '</div>');
                        }
                        i++;
                    }                    
                }
            }
            
         
            
         }
         var objSelect5 = document.getElementById("SelectingFilter")[5];
         if(objSelect5.selected == true){
         	$(newDiv).empty();
            if(timeobjSelect1.selected == true || timeobjSelect2.selected == true || timeobjSelect3.selected == true || timeobjSelect4.selected == true){
                alert("You can only filter time with respective to 3 Most Dangerous Area");
            }
            else{
                if(objSelect5.value = 'Gender'){
                    console.log('test5');
                    await loadGenderData();
     //             	genderdistribution[0] = {count: 31};
					// genderdistribution[1] = {count: 41};
                    $(newDiv).append('<div class = "row-label">' + '<div class= "cityView">Gender</div>' + '<div class= "numberCrimesView">Number of Crimes</div>' + '</div>');
                    var i = 0;
                    for (var each of genderdistribution) {
                    	if(i == 0){
                            $(newDiv).append(
                            '<div class = "row">' + 
	                         '<div class= "cityView">' + 'Female'  + '</div>' +
	                         '<div class= "numberCrimesView">' + each.count + '</div>' + 
	                        '</div>');
                           
                        }
                        else if(i == 1){
                            $(newDiv).append(
                            '<div class = "row">' + 
	                         '<div class= "cityView">' + 'Male'  + '</div>' +
	                         '<div class= "numberCrimesView">' + each.count + '</div>' + 
	                        '</div>');
                        }
                       
                        i++;
                    }                    
                    
                }
            }
            
         }
     }
     


    $(document).on({
        ajaxStart: function(){
            $("body").addClass("loading");
        },
        ajaxStop: function(){
            $("body").removeClass("loading");
        }
    });
}
