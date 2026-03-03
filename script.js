function showGoal() {
  const el = document.getElementById("goalText");
  el.textContent =
    "test orninben";
}

function toggleBlock(id){
  const el = document.getElementById(id);
  const isHidden = el.style.display === "none";
  el.style.display = isHidden ? "block" : "none";
}