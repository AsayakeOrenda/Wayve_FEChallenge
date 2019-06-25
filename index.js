const express = require('express');
const fs = require('fs');
const app = express();
const exphbs = require('express-handlebars');
const parse = require('csv-parse');
const promise = require('bluebird');


//Setup Handlebars:
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use('/', express.static('./public'));

//Render Home Page:
app.get('/', function(req,res){
  res.render('home');
});

var contents = []; //define var for contents from file
//Read contents of data file:
fs.readFile('frontend_puzzle_data.json','utf8',(err, data) => {
  if (!err) {
      contents = JSON.parse(data);
      console.log(contents);
      createActionCount(contents);
  }
  else {
      console.error(err);
      throw err;
  }
});

//Algorithm for creating data sets - used for charts:
//--------------------------------------------------
//  SPEC:
// It may be of interest to know the cause and number of occurances of a particular action.
// For example the total number of emergency maneuvers and the main reason for their cause.

// For each Action (9 of them)
// Count number of times of each concurrent reason (8)
// So end up with 9 'action' arrays with 8 'reason' counts each
//----------------------------------------------------
//  COURSE CHOOSEN:
// There are over 72 counts that could be made.
// Lets just try one as proof of concept.

//Define variables:
const ACTION_TYPE = [
  'stop',
  'giveway',
  'follow',
  'overtake',
  'undertake',
  'join',
  'negotiation',
  'park',
  'emergencymaneuver'
];
const REASON_TYPE = [
  'vehicle',
  'signal',
  'cyclist',
  'pedestrian',
  'parkedvehicle',
  'roadworks',
  'otherstatic',
  'otherdynamic'
];
var actionEmergencyManeuverCounts = {}; //declare array to pass to client

//Determine count for action 'EmergencyManeuver'
var countEmergencyManeuverVehicle = 0;
var countEmergencyManeuverSignal = 0;
var countEmergencyManeuverCyclist = 0;
var countEmergencyManeuverPedestrian = 0;
var countEmergencyManeuverParkedVehicle = 0;
var countEmergencyManeuverRoadworks = 0;
var countEmergencyManeuverOtherStatic = 0;
var countEmergencyManeuverOtherDynamic = 0;

function createActionCount (contents){
  for (let i= 0; i < contents.length; i++){
    let itemAction = ((contents[i].action).toLowerCase()).trim();
    let itemReason = ((contents[i].reason).toLowerCase()).trim();
    //console.log('itemAction ' + itemAction);
    //console.log('itemReason ' + itemReason);
    if(itemAction === ACTION_TYPE[8]){
      //CheckState
      switch (itemReason) {
        case REASON_TYPE[0]:
            countEmergencyManeuverVehicle += 1;
            break;
        case REASON_TYPE[1]:
            countEmergencyManeuverSignal += 1;
            break;
        case REASON_TYPE[2]:
            countEmergencyManeuverCyclist += 1;
            break;
        case REASON_TYPE[3]:
            countEmergencyManeuverPedestrian += 1;
            break;
        case REASON_TYPE[4]:
            countEmergencyManeuverParkedVehicle += 1;
            break;
        case REASON_TYPE[5]:
            countEmergencyManeuverRoadworks += 1;
            break;
        case REASON_TYPE[6]:
            countEmergencyManeuverOtherStatic += 1;
            break;
        case REASON_TYPE[7]:
            countEmergencyManeuverOtherDynamic += 1;
            break;
      }
    }
  }

  //c

  var actionEmergencyManeuverCounts = {
    "vehicle": countEmergencyManeuverVehicle,
    "signal": countEmergencyManeuverSignal,
    "cyclist": countEmergencyManeuverCyclist,
    "pedestrian": countEmergencyManeuverPedestrian,
    "parkedvehicle": countEmergencyManeuverParkedVehicle,
    "roadworks": countEmergencyManeuverRoadworks,
    "otherstatic": countEmergencyManeuverOtherStatic,
    "otherdynamic": countEmergencyManeuverOtherDynamic
  };

  console.log(actionEmergencyManeuverCounts);

  //API for reading data to page:
  app.get('/data-example', function (req, res) {
    res.json(actionEmergencyManeuverCounts);
  })

  app.listen(4250, function () {
    console.log('Example app listening on port 4250.');
  });
}

///--unused--
//var collectedReasonArray: [];
//var collectedCountArrays: { [action]: {collectedReasonArray: []}} = {};
//initialise. Then populate with double loop.
//collectedCountArrays[(enum)] = collectedCountArrays[(enum)] || {collectedReasonArray: []};
//collectedCountArrays[(enum)].collectedReasonArray.push(count);
//--
