// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () 
{
  new TicTacToe(4,4,KeyboardInputManager, HTMLActuator,LocalStorageManager,"./Images/Haes.jpeg");
});
