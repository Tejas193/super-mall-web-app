import { app } from '../firebase-config.js';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const db = getFirestore(app);
const shopDropdown = document.getElementById("shopDropdown");
const filterShop = document.getElementById("filterShop");
const filterFloor = document.getElementById("filterFloor");
const offerList = document.getElementById("offerList");
const offerForm = document.getElementById("offerForm");
const offerMsg = document.getElementById("offerMsg");

const tabAdd = document.getElementById("tabAdd");
const tabFilter = document.getElementById("tabFilter");
const addOfferSection = document.getElementById("addOfferSection");
const filterOfferSection = document.getElementById("filterOfferSection");

tabAdd.addEventListener("click", () => {
  tabAdd.classList.add("active");
  tabFilter.classList.remove("active");
  addOfferSection.classList.remove("hidden");
  filterOfferSection.classList.add("hidden");
  loadOffers(); 
});

tabFilter.addEventListener("click", () => {
  tabFilter.classList.add("active");
  tabAdd.classList.remove("active");
  filterOfferSection.classList.remove("hidden");
  addOfferSection.classList.add("hidden");
  offerList.innerHTML = "";
});

const shopMap = {};
const shopSnap = await getDocs(collection(db, "shops"));
shopSnap.forEach(doc => {
  const shop = doc.data();
  shopMap[doc.id] = shop;

  const option1 = document.createElement("option");
  option1.value = doc.id;
  option1.textContent = shop.shopName;
  shopDropdown.appendChild(option1);

  const option2 = document.createElement("option");
  option2.value = doc.id;
  option2.textContent = shop.shopName;
  filterShop.appendChild(option2);
});

offerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    shopId: shopDropdown.value,
    productName: document.getElementById("productName").value,
    price: parseFloat(document.getElementById("price").value),
    discount: document.getElementById("discount").value,
    validTill: document.getElementById("validTill").value,
    createdAt: new Date()
  };

  try {
    await addDoc(collection(db, "offers"), data);
    offerMsg.textContent = " Offer added!";
    offerForm.reset();
  } catch (err) {
    console.error("Offer error:", err);
    offerMsg.textContent = " Failed to add offer.";
  }
});

document.getElementById("applyFilters").addEventListener("click", async () => {
  const shopId = filterShop.value;
  const floor = filterFloor.value.toLowerCase();

  const offerSnap = await getDocs(collection(db, "offers"));
  offerList.innerHTML = "";

  offerSnap.forEach(doc => {
    const offer = doc.data();
    const shop = shopMap[offer.shopId];

    const matchShop = !shopId || offer.shopId === shopId;
    const matchFloor = !floor || (shop && shop.floor.toLowerCase() === floor);

    if (matchShop && matchFloor) {
      const card = document.createElement("div");
      card.className = "offer-card";
      card.innerHTML = `
        <h3>${offer.productName}</h3>
        <p><strong>Shop:</strong> ${shop ? shop.shopName : "Unknown"}</p>
        <p><strong>₹ Price:</strong> ${offer.price}</p>
        <p><strong>Discount:</strong> ${offer.discount}</p>
        <p><strong>Valid Till:</strong> ${offer.validTill}</p>
      `;
      offerList.appendChild(card);
    }
  });

  if (offerList.innerHTML === "") {
    offerList.innerHTML = "<p> No matching offers found.</p>";
  }
});

function loadOffers() {
  const q = query(collection(db, "offers"), orderBy("createdAt", "desc"));
  onSnapshot(q, (snapshot) => {
    offerList.innerHTML = "";
    snapshot.forEach((doc) => {
      const data = doc.data();
      const card = document.createElement("div");
      card.className = "offer-card";
      card.innerHTML = `
        <h3>${data.productName}</h3>
        <p><strong>Shop:</strong> ${shopMap[data.shopId]}</p>
        <p><strong>₹ Price:</strong> ${data.price}</p>
        <p><strong>Discount:</strong> ${data.discount}</p>
        <p><strong>Valid Till:</strong> ${data.validTill}</p>
      `;
      offerList.appendChild(card);
    });
  });
}

loadOffers();
