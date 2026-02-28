const companyList = document.getElementById("companyList");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");

async function loadCompanies() {
    try {
        const response = await fetch("companies.json");
        const data = await response.json();
        renderCards(data);
    } catch (error) {
        console.error("Error:", error);
        companyList.innerHTML = "<p>ไม่สามารถโหลดข้อมูลได้ กรุณาตรวจสอบการรัน Live Server</p>";
    }
}

function renderCards(data) {
    companyList.innerHTML = ""; 
    data.forEach(company => {
        const article = document.createElement("article");
        article.className = "card";
        article.innerHTML = `
            <img src="${company.img}" alt="${company.name}"> 
            <h2>${company.name}</h2>
            <p style="color:#64748b; font-size:14px;">${company.desc.substring(0, 50)}...</p>
            <button class="open-btn">รายละเอียด</button>
        `;

        article.querySelector(".open-btn").onclick = () => {
            document.getElementById("overlaylogo").src = company.img;
            document.getElementById("overlaytitle").textContent = company.name;
            document.getElementById("overlayDesc").textContent = company.desc;
            document.getElementById("overlayLink").href = company.url;
            overlay.style.display = "flex";
        };

        companyList.appendChild(article);
    });
}

closeBtn.onclick = () => overlay.style.display = "none";

// ปิดเมื่อคลิกพื้นหลังดำ
window.onclick = (event) => {
    if (event.target == overlay) overlay.style.display = "none";
};

loadCompanies();