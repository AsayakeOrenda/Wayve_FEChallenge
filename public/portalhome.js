  $(document).ready(() => {
    //Set up page - hide inactive sections
    $('#view-chart-content').hide();

    //Stub out basic btn functionality
    $('#view-map-btn').click((event)=>{
        alert('clicked map btn');
    });

    $('#view-chart-btn').click((event)=>{
        alert('clicked chart btn');
    });

  });