// src/data/content.js
import Hats from "../../assets/hats.jpg";
import WhiteTee from "../../assets/whitetee.jpg";
import BlackTee from "../../assets/blacktee.jpg";

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Schedule", href: "#schedule" },
  { name: "Gallery", href: "#gallery" },
  { name: "Store", href: "#store" },
  { name: "Contact", href: "#contact" },
];

// src/components/data/scheduleData.js

export const scheduleData = [
  {
    time: "1:00 PM",
    title: "Guests Check-In",
    desc: "Red carpet arrival, photo sessions, and cultural welcome.",
  },
  {
    time: "2:00 PM",
    title: "Opening Performance",
    desc: "Festival opening performance and welcoming by The Artist.",
  },
  {
    time: "2:30 PM",
    title: "Host/Co-Host Unveil (Rendi)",
    desc: "Official unveiling and introductions.",
  },
  {
    time: "3:00 PM",
    title: "History & Heritage",
    desc: "Narration on Art, Abia culture, and heritage by Mazi Peterson.",
  },
  {
    time: "4:00 PM",
    title: "Receiving the NDI EZEs",
    desc: "Welcoming and honoring the esteemed NDI EZEs.",
  },
  {
    time: "4:30 PM",
    title: "Ohafia War Dance",
    desc: "Traditional cultural performance by Ohafia warriors.",
  },
  {
    time: "5:00 PM",
    title: "Partners & Sponsors",
    desc: "Introducing official partners and event sponsors.",
  },
  {
    time: "5:30 PM",
    title: "Drama Performance",
    desc: "Stage performance highlighting culture and storytelling.",
  },
  {
    time: "6:00 PM",
    title: "Quiz on Culture",
    desc: "Interactive quiz on Abia culture and history.",
  },
  {
    time: "7:00 PM",
    title: "Other Performances",
    desc: "Live cultural music and entertainment acts.",
  },
  {
    time: "8:00 PM",
    title: "Dance & Vibes",
    desc: "Enjoy music and vibes with DJ Cue and Chidoski.",
  },
];

export const products = [
  {
    id: 1,
    name: "Premium Hat",
    price: "₦10,000",
    img: Hats,
  },
  {
    id: 2,
    name: "Premium White Tee",
    price: "₦15,000",
    img: WhiteTee,
  },
  {
    id: 3,
    name: "Premium Black Tee",
    price: "₦15,000",
    img: BlackTee,
  },
];
