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

export const scheduleData = [
  {
    time: "2:00 PM",
    title: "Guest Check-in",
    desc: "Welcomin with photo sessions and cultural dances.",
  },
  {
    time: "3:00 PM",
    title: "The main event",
    desc: "Live performance by The Artist and other entertainers.",
  },
  {
    time: "5:30 PM",
    title: "Live Performance & Networking",
    desc: "Good Music, Drinks and live performance.",
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
