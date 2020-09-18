$(function(){
  $('#torusmailinglist-form').submit(function(e){
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "https://vlxqzwsctf.execute-api.us-east-1.amazonaws.com/DeploymentStage/",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify( { "id": "","email": $('#email').val() } ),
      beforeSend: function(data) {
          $('#torusmailinglist-btn').prop('disabled', true);
          $('#torusmailinglist-form :input').prop('disabled', true);
          $('#torusmailinglist-status').html('Sending...').show();
      },
      success: function(data, status, jqXHR) {
        console.log(data);
        if(status === 'success'){
          $('#torusmailinglist-status').text("We'll get back to you soon").show();
          $('#torusmailinglist-form :input').removeProp('disabled');
          $('#torusmailinglist-btn').removeProp('disabled');
        }
        else {
          $('#torusmailinglist-status').text('Error. Please try again.').show();
          $('#torusmailinglist-form :input').removeProp('disabled');
          $('#torusmailinglist-btn').removeProp('disabled');
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        $('#torusmailinglist-status').text('Error. Please check your network connection and try again.').show();
        $('#torusmailinglist-form :input').removeProp('disabled');
        $('#torusmailinglist-btn').removeProp('disabled');
      }
    });
  }); 				
});