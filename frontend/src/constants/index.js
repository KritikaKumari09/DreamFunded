import {
     benefitImage2,
     discordBlack,
    facebook,
     file02,
     homeSmile,
    instagram,
    notification2,
    notification3,
    notification4,
    plusSquare,
    searchMd,
    telegram,
    twitter,
    
  } from "../assets";
  
  export const navigation = [
    {
      id: "0",
      title: "About Us",
      url: "#about-us",
    },
    {
      id: "1",
      title: "Start a Project",
      url: "/addProject",
    },
    {
      id: "2",
      title: "Fund Projects",
      url: "#fundProjects",
    },
    {
      id: "3",
      title: "Contact us ",
      url: "#contact",
    },
    {
      id: "4",
      title: "New account",
      url: "/register",
      onlyMobile: true,
    },
    {
      id: "5",
      title: "Sign in",
      url: "/login",
      onlyMobile: true,
    },
    {
      id: "6",
      title: "My Account",
      url: "/myprofile",
      onlyMobile: true,
    },
    {
      id: "7",
      title: "Sign out",
      // url: "/",
      onlyMobile: true,
    },
   
  ];
  
  export const heroIcons = [homeSmile, file02, searchMd, plusSquare];
  
  export const notificationImages = [notification4, notification3, notification2];
     
  export const aboutus = [
    {
      id: "0",
      title: "Empowering Visionaries",
      text: "At DreamFunded, we believe that groundbreaking ideas can come from anywhere. Our platform is dedicated to bridging the gap between visionary thinkers and the resources they need to bring their innovations to life.",
      backgroundUrl: "./src/assets/aboutus/card-1.svg",
      imageUrl: benefitImage2,
    },
    {
      id: "1",
      title: "Connecting Ideas with Resources",
      text: "We've created a space where creators, inventors, and dreamers can showcase their projects to a global community of supporters. Our mission is to fuel innovation by connecting bold ideas with the funding they deserve.",
      backgroundUrl: "./src/assets/aboutus/card-2.svg",
      imageUrl: benefitImage2,
      light: true,
    },
    {
      id: "2",
      title: "Proven Track Record of Success",
      text: "Since our inception in 2020, we've helped launch over 10,000 successful projects across diverse fields including technology, sustainable energy, healthcare, and beyond. These innovations have gone on to impact millions of lives worldwide.",
      backgroundUrl: "./src/assets/aboutus/card-3.svg",
      imageUrl: benefitImage2,
    },
    {
      id: "3",
      title: "Diverse Expertise, Unified Vision",
      text: "Our team is composed of passionate individuals from various backgrounds – engineers, entrepreneurs, designers, and financial experts. This diversity allows us to provide comprehensive support to project creators at every stage of their journey.",
      backgroundUrl: "./src/assets/aboutus/card-4.svg",
      imageUrl: benefitImage2,
      light: true,
    },
    {
      id: "4",
      title: "Beyond Funding: Comprehensive Support",
      text: "We're more than just a funding platform. We offer mentorship, resources, and a network of industry experts to ensure that great ideas have the best chance of succeeding in the real world.",
      backgroundUrl: "./src/assets/aboutus/card-5.svg",
      imageUrl: benefitImage2,
    },
    {
      id: "5",
      title: "Join the Innovation Movement",
      text: "By choosing to support a project on DreamFunded, you're not just backing an idea – you're becoming part of a global movement to shape the future. Join us in turning today's visions into tomorrow's realities.",
      backgroundUrl: "./src/assets/aboutus/card-6.svg",
      imageUrl: benefitImage2,
    },
  ];
  
  export const socials = [
    {
      id: "0",
      title: "Discord",
      iconUrl: discordBlack,
      url: "#",
    },
    {
      id: "1",
      title: "Twitter",
      iconUrl: twitter,
      url: "#",
    },
    {
      id: "2",
      title: "Instagram",
      iconUrl: instagram,
      url: "#",
    },
    {
      id: "3",
      title: "Telegram",
      iconUrl: telegram,
      url: "#",
    },
    {
      id: "4",
      title: "Facebook",
      iconUrl: facebook,
      url: "#",
    },
  ];