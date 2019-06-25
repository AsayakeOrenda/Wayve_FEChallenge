  $(document).ready(() => {
    //Set up page - hide inactive sections
    $('#view-chart-content').hide();
    $('#map-key-reasons').hide();
    $('#map-area-reason').hide();


    //Top menu button actions:
    $('#view-map-btn').click((event)=>{
        $('#view-chart-content').hide();
        $('#view-map-content').show();
        //update styling: //TODO: make class removal general
        $('#view-chart-btn').removeClass('active');
        $('#view-map-btn').removeClass('active');
        $('#view-map-btn').addClass('active');
    });

    $('#view-chart-btn').click((event)=>{
        $('#view-map-content').hide();
        $('#view-chart-content').show();
        //update styling: //TODO: make class removal general
        $('#view-map-btn').removeClass('active');
        $('#view-chart-btn').removeClass('active');
        $('#view-chart-btn').addClass('active');
        bindGetExampleData();
    });

    function bindGetExampleData (){
        let req=new XMLHttpRequest();
        req.open("GET",'/data-example',true);
        req.send();
        req.onload=function(){
            let container = $('.list-chart-data');
            let jsondata=JSON.parse(req.response);
            let workingdata = Object.keys(jsondata);
            let html = '<tr><th>Count:</th>';
            for(let i=0; i< workingdata.length; i++){
                html+= '<td>' + jsondata[workingdata[i]] + '</td>';
            }
            html+= '</tr>';
            container.html(html);
        }
    }


    //Map Options button actions:
    $('#map-show-actions').click((event)=>{
        //update map:
        $('#map-area-action').show();
        $('#map-area-reason').hide();
        //update key:
        $('#map-key-actions').show();
        $('#map-key-reasons').hide();
        //update styling:
        $('#map-btn-options').find('button').removeClass('active');
        $('#map-show-actions').addClass('active');
    });

    $('#map-show-reasons').click((event)=>{
        //update map:
        $('#map-area-action').hide();
        $('#map-area-reason').show();
        //update key:
        $('#map-key-actions').hide();
        $('#map-key-reasons').show();
        //update styling:
        $('#map-btn-options').find('button').removeClass('active');
        $('#map-show-reasons').addClass('active');
    });


  });