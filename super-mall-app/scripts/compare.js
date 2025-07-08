import { app } from '../firebase-config.js';
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const db = getFirestore(app);

const shop1 = document.getElementById("shop1");
const shop2 = document.getElementById("shop2");
const compareBtn = document.getElementById("compareBtn");
const shop1Offers = document.getElementById("shop1Offers");
const shop2Offers = document.getElementById("shop2Offers");
const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");

const shopMap = {};
const shopSnap = await getDocs(collection(db, "shops"));
shopSnap.forEach(doc => {
  const shop = doc.data();
  shopMap[doc.id] = shop;

  const opt1 = document.createElement("option");
  opt1.value = doc.id;
  opt1.textContent = shop.shopName;
  shop1.appendChild(opt1);

  const opt2 = document.createElement("option");
  opt2.value = doc.id;
  opt2.textContent = shop.shopName;
  shop2.appendChild(opt2);
});

compareBtn.addEventListener("click", async () => {
  const id1 = shop1.value;
  const id2 = shop2.value;

  if (!id1 || !id2 || id1 === id2) {
    alert("Please select two different shops");
    return;
  }

  name1.textContent = shopMap[id1].shopName;
  name2.textContent = shopMap[id2].shopName;

  shop1Offers.innerHTML = "";
  shop2Offers.innerHTML = "";

  const offerSnap = await getDocs(collection(db, "offers"));

  offerSnap.forEach(doc => {
    const offer = doc.data();
    const card = document.createElement("div");
    card.className = "offer-card";
    card.innerHTML = `
      <h4>${offer.productName}</h4>
      <p>₹ ${offer.price} | ${offer.discount}</p>
      <p>Valid Till: ${offer.validTill}</p>
    `;

    if (offer.shopId === id1) {
      shop1Offers.appendChild(card);
    } else if (offer.shopId === id2) {
      shop2Offers.appendChild(card);
    }
  });
});
