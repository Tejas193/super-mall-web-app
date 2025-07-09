import { app } from '/super-mall-app/firebase-config.js';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


const toggleBtn = document.getElementById("toggleShopForm");
const shopFormContainer = document.getElementById("shopFormContainer");

toggleBtn.addEventListener("click", () => {
  shopFormContainer.classList.toggle("hidden");
});


const db = getFirestore(app);

const shopForm = document.getElementById("shopForm");
const shopMsg = document.getElementById("shopMsg");
const shopList = document.getElementById("shopList");

shopForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const shopName = document.getElementById("shopName").value;
  const contact = document.getElementById("contact").value;
  const category = document.getElementById("category").value;
  const floor = document.getElementById("floor").value;

  try {
    await addDoc(collection(db, "shops"), {
      shopName,
      contact,
      category,
      floor,
      createdAt: new Date()
    });

    shopMsg.textContent = " Shop added successfully!";
    shopForm.reset();
  } catch (err) {
    console.error("Shop error:", err);
    shopMsg.textContent = " Failed to add shop.";
  }
});

const q = query(collection(db, "shops"), orderBy("createdAt", "desc"));
onSnapshot(q, (snapshot) => {
  shopList.innerHTML = "";

  snapshot.forEach((doc) => {
    const shop = doc.data();

   const card = document.createElement("div");
card.className = "shop-card";

card.innerHTML = `
  <div class="shop-header">
    <h3> ${shop.shopName}</h3>
    <span class="shop-floor">${shop.floor} Floor</span>
  </div>
  <p><strong>Contact:</strong> ${shop.contact}</p>
  <p><strong> Category:</strong> ${shop.category}</p>
`;

    shopList.appendChild(card);
  });
});
