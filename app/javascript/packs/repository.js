$(document).ready(function(){
  var table = $('#repository-table').DataTable({
    searching: false, 
    info: false,
    paging: false,
    "bFilter": true,
    "bLengthChange": false 
  });

  $('#search').keypress(function (e) {
    if (e.code == 13) {
      $(this).trigger(".repo-search");
      return false;
    }
  });

  $("#search-btn").click(function(){
    term = $('#search').val()
    $.ajax({
      url: '/api/v1/repository/search',
      dataType: 'json',
      type: 'GET',
      data: {
        search: term
      },
      success: function(response) {
        table = $('#repository-table').DataTable({
          destroy: true,
          "deferRender": true,
          data: response["data"],
          searching: false, 
          info: false,
          "bLengthChange": false,
          "bPaginate": true,
          "pagingType": "full_numbers",
          columns: [
            {
              'data': 'name'
            }
          ]
        });
      },
      error: function(failure) {
        toastr.error("Unable to process the request");
      }

    });
  });

  $(document).ajaxStart(function() {
    $(".spinner").fadeIn('slow');
  }).ajaxStop(function() {
      $(".spinner").hide();
  });
});