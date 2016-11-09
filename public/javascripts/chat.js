var socket = io();
$(window).load(()=>{

  // socket.emit('change room', 'main')
  $('form').submit(() => {
    console.log($('.inputSend').val());
      socket.emit('msg',$('.inputSend').val());
    $('.inputSend').val('');
    return false;
  });
  socket.on('msg', (data) => {
    var t = "";
    t += `<div class="chatValue">
      <div class="chatProfile">
        <div class="chatProfileImg">
          <div class="img">

          </div>
        </div>
        <div class="chatProfileName">
          조성운
        </div>
      </div>
      <div class="chatIndex">
        <div class="chatBox">
          ${data}
        </div>
      </div>
    </div>`


    $('.chatView').append(t);
    $(".chatView").scrollTop($(".chatView")[0].scrollHeight);
  });
  // $('#roomList').on('click',(view) => {
  //   console.log(view.target.classList[1]);
  //   socket.emit('change room', view.target.classList[1]);
  // });
});
