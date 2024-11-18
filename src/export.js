import building from "../src/assets/building.svg";
import construction from "../src/assets/construction.svg";
import design from "../src/assets/design.svg";
import document from "../src/assets/document.svg";
import paint from "../src/assets/paint.svg";
import support from "../src/assets/support.svg";

import { IoDocumentTextSharp } from "react-icons/io5";
import { MdOutlineDesignServices } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { FaSitemap } from "react-icons/fa";

import client1 from "../src/assets/client1.png";
import client2 from "../src/assets/client2.png";
import client3 from "../src/assets/client3.png";

export const allservices = [
  {
    icon: building,
    title: "Building Renovation",
    about:
      "Transforming existing structures with modern upgrades, improving aesthetics, functionality, and safety while preserving the core design.",
  },
  {
    icon: construction,
    title: "Construction Services",
    about:
      "Comprehensive construction solutions, from residential projects to commercial developments, ensuring quality and timely delivery.",
  },
  {
    icon: design,
    title: "Design & Planning",
    about:
      "Expert design and planning services that blend creativity and practicality, delivering tailored solutions for every project’s unique needs.",
  },
  {
    icon: document,
    title: "Documentation",
    about:
      "Accurate and thorough project documentation, including permits, blueprints, and compliance reports, to streamline the construction process.",
  },
  {
    icon: paint,
    title: "Interior Design",
    about:
      "Creating beautiful, functional interiors that reflect your style, combining aesthetics with ergonomics for comfortable and inspiring spaces.",
  },
  {
    icon: support,
    title: "Customer Support",
    about:
      "Dedicated customer support, offering guidance and assistance throughout the project lifecycle to ensure client satisfaction and smooth execution.",
  },
];

export const planning = [
  {
    icon: IoDocumentTextSharp,
    title: "Planning",
    about:
      "Detailed project planning that outlines every stage, setting clear timelines, goals, and resources to ensure seamless project execution.",
  },
  {
    icon: MdOutlineDesignServices,
    title: "Design",
    about:
      "Creative and innovative design services that incorporate your vision, industry standards, and functionality for exceptional results.",
  },
  {
    icon: FaRegBuilding,
    title: "Building",
    about:
      "Efficient and sustainable building practices, using quality materials and advanced techniques to bring your vision to life.",
  },
  {
    icon: FaSitemap,
    title: "Finishing",
    about:
      "High-quality finishing services that add the final touches, enhancing the appearance and durability of the completed structure.",
  },
];

export const clients = [
  {
    image: client1,
    name: "John Doe",
    about:
      "Working with this team was a fantastic experience. They understood our needs perfectly and delivered beyond our expectations. Highly recommend!",
    post: "Constructor",
  },
  {
    image: client2,
    name: "Jack Smith",
    about:
      "As an architect, I value precision and creativity. This company brought my designs to life with great attention to detail and craftsmanship.",
    post: "Architect",
  },
  {
    image: client3,
    name: "Michael Brown",
    about:
      "The project was completed on time and within budget. The quality of work and professionalism exceeded my expectations.",
    post: "Builder",
  },
];
