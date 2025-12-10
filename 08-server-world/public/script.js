const output = document.getElementById("output");

document.getElementById("load").onclick = async () => {
  const res = await fetch("/world");
  const data = await res.json();
  output.textContent = JSON.stringify(data, null, 2);
};

document.getElementById("form").onsubmit = async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));

  const res = await fetch("/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  output.textContent = JSON.stringify(result, null, 2);
};