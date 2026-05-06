<script>
  let requests = [];
  let driver = null;

  if (typeof window !== "undefined") {
    requests = JSON.parse(localStorage.getItem("requests") || "[]");
    driver = JSON.parse(localStorage.getItem("driver") || "null");
  }

  function acceptRequest(index) {
    if (!driver || driver.status !== "Verified") {
      alert("Only verified drivers can accept ride requests.");
      return;
    }

    let data = JSON.parse(localStorage.getItem("requests") || "[]");

    data[index].status = "Accepted";
    data[index].driver = driver.name || "Driver";

    localStorage.setItem("requests", JSON.stringify(data));

    alert("Ride accepted!");
    location.reload();
  }
</script>