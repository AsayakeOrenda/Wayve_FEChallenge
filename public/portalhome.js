  $(document).ready(() => {
    //Set up page - hide inactive sections
    $('#view-chart-content').hide();


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
    });

    //Map Options button actions:
    $('#map-show-actions').click((event)=>{
        //update styling:
        $('#map-show-reasons').removeClass('active');
        $('#map-show-actions').removeClass('active');
        $('#map-show-actions').addClass('active');
    });

    $('#map-show-reasons').click((event)=>{
        //update styling:
        $('#map-show-actions').removeClass('active');
        $('#map-show-reasons').removeClass('active');
        $('#map-show-reasons').addClass('active');
    });


  });