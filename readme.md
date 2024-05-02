# Home Page

Welcome to the site!

<script>
document.addEventListener('keydown', function(event) {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let currentCodeIndex = 0;
  
  if (event.key === konamiCode[currentCodeIndex]) {
    currentCodeIndex++;
    
    if (currentCodeIndex === konamiCode.length) {
      document.body.style.backgroundColor = 'purple';
      currentCodeIndex = 0;
    }
  } else {
    currentCodeIndex = 0;
  }
});
</script>
