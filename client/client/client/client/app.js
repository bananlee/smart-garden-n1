const cropForm = document.getElementById("cropForm");
const cropList = document.getElementById("cropList");
const cropCount = document.getElementById("cropCount");
const message = document.getElementById("message");

async function loadCrops() {
    try {
        const response = await fetch("/api/crops");
        const crops = await response.json();
        showCrops(crops);
    } catch (error) {
        message.textContent = "Server bilan aloqa yo'q.";
    }
}

cropForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("cropName").value.trim();
    const area = Number(document.getElementById("cropArea").value);

    if (!name || !Number.isFinite(area) || area <= 0) {
        alert("Ma'lumotlarni to'g'ri kiriting!");
        return;
    }

    try {
        const response = await fetch("/api/crops", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, area })
        });

        if (!response.ok) {
            throw new Error("Ma'lumot saqlanmadi");
        }

        cropForm.reset();
        await loadCrops();
    } catch (error) {
        message.textContent = "Ma'lumot yuborishda xatolik!";
    }
});

function showCrops(crops) {
    cropList.innerHTML = "";

    crops.forEach((crop, index) => {
        const row = document.createElement("tr");

        [index + 1, crop.name, crop.area + " gektar"].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        cropList.appendChild(row);
    });

    cropCount.textContent = crops.length;
    message.textContent = crops.length
        ? "Jami " + crops.length + " ta ekin mavjud."
        : "Hozircha ekinlar mavjud emas.";
}

loadCrops();
