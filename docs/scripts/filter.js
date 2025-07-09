import { app } from '../firebase-config.js';
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const db = getFirestore(app);

const filterShop = document.getElementById("filterShop");
const filterFloor = document.getElementById("filterFloor");
const applyFilters = document.getElementById("applyFilters");
const filteredOffers = document.getElementById("filteredOffers");

const shopMap = {};
const shopSnap = await getDocs(collection(db, "shops"));
shopSnap.forEach(doc => {
  const shop = doc.data();
  shopMap[doc.id] = shop;

  const option = document.createElement("option");
  option.value = doc.id;
  option.textContent = shop.shopName;
  filterShop.appendChild(option);
});

applyFilters.addEventListener("click", async () => {
  const selectedShopId = filterShop.value;
  const selectedFloor = filterFloor.value.toLowerCase();

  const offersSnap = await getDocs(collection(db, "offers"));
  filteredOffers.innerHTML = "";

  offersSnap.forEach(doc => {
    const offer = doc.data();
    const shop = shopMap[offer.shopId];

    const matchShop = !selectedShopId || offer.shopId === selectedShopId;
    const matchFloor = !selectedFloor || (shop && shop.floor.toLowerCase() === selectedFloor);

    if (matchShop && matchFloor) {
      const card = document.createElement("div");
      card.className = "offer-card";
      card.innerHTML = `
        <h3> ${offer.productName}</h3>
        <p><strong>Shop:</strong> ${shop ? shop.shopName : "Unknown"}</p>
        <p><strong>₹ Price:</strong> ${offer.price}</p>
        <p><strong>Discount:</strong> ${offer.discount}</p>
        <p><strong>Valid Till:</strong> ${offer.validTill}</p>
      `;
      filteredOffers.appendChild(card);
    }
  });
  

  if (filteredOffers.innerHTML === "") {
    filteredOffers.innerHTML = "<p>No offers found for selected filters.</p>";
  }
});
