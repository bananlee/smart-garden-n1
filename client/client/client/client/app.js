const cropForm = document.getElementById("cropForm");
const cropList = document.getElementById("cropList");
const cropCount = document.getElementById("cropCount");
const message = document.getElementById("message");

let crops = [];

cropForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("cropName").value;
    const area = Number(document.getElementById("cropArea").value);

    if (name.trim() === "" || area <= 0) {
        alert("Ma'lumotlarni to'g'ri kiriting!");
        return;
    }

    const crop = {
        name: name,
        area: area
    };

    crops.push(crop);

    showCrops();

    cropForm.reset();
});

function showCrops() {
    cropList.innerHTML = "";

    crops.forEach(function(crop, index) {
        const row = document.createElement("tr");

        const numberCell = document.createElement("td");
        numberCell.textContent = index + 1;

        const nameCell = document.createElement("td");
        nameCell.textContent = crop.name;

        const areaCell = document.createElement("td");
        areaCell.textContent = crop.area + " gektar";

        row.append(numberCell, nameCell, areaCell);
        cropList.appendChild(row);
    });

    cropCount.textContent = crops.length;

    message.textContent = crops.length === 0
        ? "Hozircha ekinlar mavjud emas."
        : "Jami " + crops.length + " ta ekin mavjud.";
}
